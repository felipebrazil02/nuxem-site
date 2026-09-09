import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, randomUUID } from 'node:crypto';
import { createBridge, verifySignature, validateArticle, responsesURL, BODY_LIMIT } from '../netlify/studio/bridge-core.mjs';
import { MemoryStore, sample } from './fixtures.mjs';
const time = 1788868800000;
const secret = 'test-only-shared-bridge-secret-1234567890';
const env = { STUDIO_BRIDGE_SECRET: secret, STUDIO_BUILD_HOOK: 'https://api.netlify.com/build_hooks/test123', OPENAI_BASE_URL: 'https://ai-gateway.netlify.com/v1', OPENAI_API_KEY: 'fake-runtime-key' };
function request(payload, options = {}) {
  const raw = JSON.stringify(payload);
  const signed = String(options.time ?? time);
  return new Request('https://nuxemoil.com.br/.netlify/functions/studio-seo', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-studio-time': signed, 'x-studio-signature': createHmac('sha256', secret).update(`${signed}.${raw}`).digest('hex'), ...options.headers }, body: raw });
}
const setup = (options = {}) => {
  const store = options.store ?? new MemoryStore();
  let calls = 0;
  const fetchImpl = options.fetchImpl ?? (async () => { calls++; return new Response('{}', { status: 200 }); });
  return { store, calls: () => calls, run: createBridge({ getStore: () => store, env, now: () => time, legacySlugs: ['legacy-existing'], fetchImpl, ...options }) };
};

test('authentication binds timestamp and exact raw body with five-minute limit', () => {
  const raw = '{"action":"status"}';
  const signature = createHmac('sha256', secret).update(`${time}.${raw}`).digest('hex');
  assert.doesNotThrow(() => verifySignature(raw, String(time), signature, secret, time + 300000));
  assert.throws(() => verifySignature(raw + ' ', String(time), signature, secret, time), /authentication/);
  assert.throws(() => verifySignature(raw, String(time), signature, secret, time + 300001), /authentication/);
  assert.throws(() => verifySignature(raw, String(time), 'garbage', secret, time), /authentication/);
});

test('unauthenticated and oversized requests never access storage or the hook', async () => {
  let accesses = 0;
  const { run, calls } = setup({ getStore: () => { accesses++; return new MemoryStore(); } });
  assert.equal((await run(request({ action: 'status' }, { headers: { 'x-studio-signature': '0'.repeat(64) } }))).status, 401);
  assert.equal((await run(request({ action: 'status', padding: 'a'.repeat(BODY_LIMIT) }))).status, 413);
  assert.equal(accesses, 0); assert.equal(calls(), 0);
});

test('publishing identical ID and content concurrently stores one approval and sends one hook', async () => {
  const { run, calls, store } = setup();
  const payload = { action: 'publish', articleId: randomUUID(), article: sample() };
  const results = await Promise.all(Array.from({ length: 8 }, () => run(request(payload))));
  for (const result of results) assert.equal((await result.json()).accepted, true);
  assert.equal(calls(), 1);
  assert.equal([...store.records.keys()].filter((key) => key.startsWith('approved/')).length, 1);
});

test('legacy slugs, same-ID edits, and different IDs claiming a URL are rejected', async () => {
  const { run, calls } = setup();
  assert.equal((await run(request({ action: 'publish', articleId: randomUUID(), article: sample('legacy-existing') }))).status, 409);
  const articleId = randomUUID();
  assert.equal((await run(request({ action: 'publish', articleId, article: sample() }))).status, 200);
  assert.equal((await run(request({ action: 'publish', articleId, article: { ...sample(), title: 'Changed title' } }))).status, 409);
  assert.equal((await run(request({ action: 'publish', articleId: randomUUID(), article: sample() }))).status, 409);
  assert.equal(calls(), 1);
});

test('concurrent different IDs cannot publish the same slug', async () => {
  const { run, calls, store } = setup();
  const results = await Promise.all(Array.from({ length: 8 }, () => run(request({ action: 'publish', articleId: randomUUID(), article: sample() }))));
  assert.equal(results.filter((result) => result.status === 200).length, 1);
  assert.equal(results.filter((result) => result.status === 409).length, 7);
  assert.equal(calls(), 1);
  assert.equal([...store.records.keys()].filter((key) => key.startsWith('approved/')).length, 1);
});

test('slug conflict creates no publication identity and the same draft ID can choose another slug', async () => {
  const { run, store } = setup();
  const firstId = randomUUID();
  const secondId = randomUUID();
  await run(request({ action: 'publish', articleId: firstId, article: sample() }));
  const conflict = await (await run(request({ action: 'publish', articleId: secondId, article: sample() }))).json();
  assert.equal(conflict.code, 'slug_conflict');
  assert.equal(conflict.publicationCreated, false);
  assert.equal(await store.get(`publication/${secondId}`), null);
  const resolved = await run(request({ action: 'publish', articleId: secondId, article: sample('outro-artigo-tecnico') }));
  assert.equal(resolved.status, 200);
});

test('an uncertain hook response is never silently sent twice', async () => {
  let calls = 0;
  const { run } = setup({ fetchImpl: async () => { calls++; throw new Error('response lost'); } });
  const payload = { action: 'publish', articleId: randomUUID(), article: sample() };
  const first = await (await run(request(payload))).json();
  const second = await (await run(request(payload))).json();
  assert.equal(first.buildStatus, 'uncertain'); assert.equal(second.buildStatus, 'uncertain'); assert.equal(calls, 1);
});

test('generation cache prevents duplicate AI calls, and never publishes', async () => {
  let calls = 0;
  const store = new MemoryStore();
  const { run } = setup({ store, fetchImpl: async (url, options) => {
    calls++;
    assert.equal(url, 'https://ai-gateway.netlify.com/v1/responses');
    const payload = JSON.parse(options.body);
    assert.equal(payload.model, 'gpt-5.4-mini'); assert.equal(payload.text.format.type, 'json_schema');
    return Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(sample()) }] }] });
  } });
  const payload = { action: 'generate', requestId: randomUUID(), topic: 'Planejamento industrial', brief: 'Escreva em português.' };
  const first = await (await run(request(payload))).json();
  const second = await (await run(request(payload))).json();
  assert.deepEqual(first.article, second.article); assert.equal(calls, 1);
  assert.equal([...store.records.keys()].some((key) => key.startsWith('approved/')), false);
  assert.equal((await run(request({ ...payload, topic: 'Another topic' }))).status, 409);
});

test('recover returns completed generation without another AI call or storage write', async () => {
  let calls = 0;
  const store = new MemoryStore();
  const { run } = setup({ store, fetchImpl: async () => {
    calls++;
    return Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(sample()) }] }] });
  } });
  const requestId = randomUUID();
  const generated = await (await run(request({ action: 'generate', requestId, topic: 'Planejamento industrial', brief: '' }))).json();
  const revision = store.revision;
  const snapshot = structuredClone([...store.records]);
  // Recovery does not require provider configuration, because it reads only the completed cache.
  const { run: recover } = setup({ store, env: { STUDIO_BRIDGE_SECRET: secret }, fetchImpl: async () => { calls++; throw new Error('Must not call AI'); } });
  const response = await recover(request({ action: 'recover', requestId }));
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).article, generated.article);
  assert.equal(calls, 1);
  assert.equal(store.revision, revision);
  assert.deepEqual([...store.records], snapshot);
});

test('recover rejects absent, incomplete and invalid IDs without generation or writes', async () => {
  const { run, store, calls } = setup();
  for (const state of [null, 'running', 'failed']) {
    const requestId = randomUUID();
    if (state) await store.setJSON(`generation/${requestId}`, { state });
    const revision = store.revision;
    const response = await run(request({ action: 'recover', requestId }));
    assert.equal(response.status, 409);
    assert.equal((await response.json()).code, 'generation_incomplete');
    assert.equal(store.revision, revision);
  }
  const revision = store.revision;
  assert.equal((await run(request({ action: 'recover', requestId: '../invalid' }))).status, 400);
  assert.equal((await run(request({ action: 'recover', requestId: randomUUID() }, { headers: { 'x-studio-signature': '0'.repeat(64) } }))).status, 401);
  assert.equal(store.revision, revision);
  assert.equal(calls(), 0);
});

test('lost generation response does not cause another provider call', async () => {
  let calls = 0;
  const { run } = setup({ fetchImpl: async () => { calls++; throw new Error('timeout'); } });
  const payload = { action: 'generate', requestId: randomUUID(), topic: 'Planejamento industrial', brief: '' };
  assert.equal((await run(request(payload))).status, 502);
  assert.equal((await run(request(payload))).status, 409);
  assert.equal(calls, 1);
});

test('HTML, unsafe URL schemes, encoded attribute escapes and path traversal are rejected', () => {
  for (const bad of ['<script>alert(1)</script>', '[x](javascript:alert(1))', '[x](//evil.example/)', '[x](/path"onmouseover="x)', '[x](https://safe.example/&#34;onclick=x)']) {
    assert.throws(() => validateArticle({ ...sample(), body: sample().body + bad }));
  }
  assert.throws(() => validateArticle({ ...sample(), slug: '../other' }));
  assert.throws(() => validateArticle({ ...sample(), description: 'x'.repeat(181) }));
  assert.doesNotThrow(() => validateArticle({ ...sample(), body: sample().body + '[A source](https://example.org/source?a=1&b=2)' }));
  assert.equal(responsesURL('https://api.openai.com/v1'), null);
  assert.equal(responsesURL('https://nuxemoil.com.br/.netlify/ai'), 'https://nuxemoil.com.br/.netlify/ai/v1/responses');
  assert.equal(responsesURL('https://nuxemoil.com.br/.netlify/ai/openai'), 'https://nuxemoil.com.br/.netlify/ai/openai/v1/responses');
  assert.equal(responsesURL('https://ai-gateway.netlify.com'), 'https://ai-gateway.netlify.com/v1/responses');
});
