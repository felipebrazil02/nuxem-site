import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, randomUUID } from 'node:crypto';
import { createBridge, verifySignature, validateArticle, BODY_LIMIT, GENERATION_LEASE_MS, hash } from '../netlify/studio/bridge-core.mjs';
import { MemoryStore, sample } from './fixtures.mjs';
const time = 1788868800000;
const secret = 'test-only-shared-bridge-secret-1234567890';
const env = { STUDIO_BRIDGE_SECRET: secret, STUDIO_BUILD_HOOK: 'https://api.netlify.com/build_hooks/test123' };
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
  for (const action of ['status', 'generate', 'claimNext', 'completeGeneration', 'recover', 'publish']) {
    assert.equal((await run(request({ action }, { headers: { 'x-studio-signature': '0'.repeat(64) } }))).status, 401);
    const anonymous = new Request('https://nuxemoil.com.br/.netlify/functions/studio-seo', { method: 'POST', body: JSON.stringify({ action }) });
    assert.equal((await run(anonymous)).status, 401);
  }
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

test('status reports queue configuration without provider credentials or network calls', async () => {
  const { run, calls } = setup();
  const result = await (await run(request({ action: 'status' }))).json();
  assert.deepEqual(result, { generationReady: true, generationMode: 'codex_queue', publishingReady: true, site: 'https://nuxemoil.com.br' });
  assert.equal(calls(), 0);
  const { run: unavailable } = setup({ getStore: () => ({ get: async () => { throw new Error('No storage'); } }) });
  assert.equal((await unavailable(request({ action: 'status' }))).status, 503);
});

test('concurrent generation requests queue immutable inputs once without any model or hook call', async () => {
  let calls = 0;
  const { run, store } = setup({ fetchImpl: async () => { calls++; throw new Error('No network calls allowed'); } });
  const payload = { action: 'generate', requestId: randomUUID(), topic: 'Planejamento industrial', brief: 'Escreva em português.' };
  const results = await Promise.all(Array.from({ length: 8 }, () => run(request(payload))));
  for (const result of results) {
    assert.equal(result.status, 202);
    assert.deepEqual(await result.json(), { queued: true });
  }
  assert.equal(store.revision, 1);
  assert.equal(store.records.size, 1);
  const saved = await store.get(`generation/${payload.requestId}`);
  assert.deepEqual(saved, { requestId: payload.requestId, requestHash: hash({ topic: payload.topic, brief: payload.brief }), topic: payload.topic, brief: payload.brief, state: 'queued', queuedAt: time });
  assert.equal((await run(request({ ...payload, topic: 'Another topic' }))).status, 409);
  assert.equal((await run(request({ ...payload, brief: 'Different briefing' }))).status, 409);
  assert.deepEqual(await store.get(`generation/${payload.requestId}`), saved);
  assert.equal(calls, 0);
});

test('generation validates IDs, topic and brief before storing a queue entry', async () => {
  const { run, store, calls } = setup();
  const payload = { action: 'generate', requestId: randomUUID(), topic: 'Planejamento industrial', brief: '' };
  for (const change of [{ requestId: '../invalid' }, { topic: 'ab' }, { topic: '<script>bad</script>' }, { brief: 'x'.repeat(12001) }]) {
    assert.equal((await run(request({ ...payload, ...change }))).status, 400);
  }
  assert.equal(store.records.size, 0);
  assert.equal(calls(), 0);
});

test('concurrent workers reserve each queued job at most once', async () => {
  const { run, store, calls } = setup();
  const requestIds = Array.from({ length: 3 }, () => randomUUID());
  for (const requestId of requestIds) await run(request({ action: 'generate', requestId, topic: 'Planejamento industrial', brief: 'Português' }));
  const responses = await Promise.all(Array.from({ length: 8 }, () => run(request({ action: 'claimNext' }))));
  const jobs = [];
  for (const response of responses) {
    assert.equal(response.status, 200);
    const { job } = await response.json();
    if (job) jobs.push(job);
  }
  assert.equal(jobs.length, 3);
  assert.deepEqual(jobs.map((job) => job.requestId).sort(), requestIds.sort());
  assert.equal(new Set(jobs.map((job) => job.leaseToken)).size, 3);
  for (const job of jobs) {
    assert.match(job.leaseToken, /^[a-f0-9]{64}$/);
    assert.equal(job.leaseExpiresAt, time + GENERATION_LEASE_MS);
    assert.equal(job.topic, 'Planejamento industrial');
    assert.equal(job.brief, 'Português');
    assert.equal((await store.get(`generation/${job.requestId}`)).state, 'working');
  }
  assert.equal(store.revision, 6);
  assert.deepEqual(await (await run(request({ action: 'claimNext' }))).json(), { job: null });
  assert.equal(calls(), 0);
});

test('an expired lease can be reclaimed and its previous worker cannot complete the job', async () => {
  let currentTime = time;
  const { run, store, calls } = setup({ now: () => currentTime });
  const invoke = (payload) => run(request(payload, { time: currentTime }));
  const requestId = randomUUID();
  const payload = { action: 'generate', requestId, topic: 'Planejamento industrial', brief: '' };
  await invoke(payload);
  const { job: original } = await (await invoke({ action: 'claimNext' })).json();
  const complete = { action: 'completeGeneration', requestId, leaseToken: original.leaseToken, article: sample() };
  assert.equal((await invoke({ ...complete, leaseToken: '0'.repeat(64) })).status, 409);
  assert.equal((await invoke({ ...complete, article: { ...sample(), body: '<script>bad</script>' } })).status, 400);
  currentTime = original.leaseExpiresAt - 1;
  assert.deepEqual(await (await invoke({ action: 'claimNext' })).json(), { job: null });
  currentTime++;
  const expired = await invoke(complete);
  assert.equal(expired.status, 409);
  assert.equal((await expired.json()).code, 'generation_lease_expired');
  const { job: replacement } = await (await invoke({ action: 'claimNext' })).json();
  assert.equal(replacement.requestId, requestId);
  assert.notEqual(replacement.leaseToken, original.leaseToken);
  assert.equal(replacement.leaseExpiresAt, currentTime + GENERATION_LEASE_MS);
  const working = await store.get(`generation/${requestId}`);
  assert.deepEqual(await (await invoke(payload)).json(), { queued: true });
  assert.deepEqual(await store.get(`generation/${requestId}`), working);
  assert.equal((await invoke(complete)).status, 409);
  assert.equal((await invoke({ ...complete, leaseToken: replacement.leaseToken })).status, 200);
  const completed = await store.get(`generation/${requestId}`);
  assert.equal(completed.topic, payload.topic);
  assert.equal(completed.brief, payload.brief);
  assert.equal(completed.state, 'complete');
  assert.deepEqual(completed.generator, { model: 'gpt-6-astra', effort: 'ultra', source: 'codex' });
  assert.equal(calls(), 0);
});

test('concurrent completion and later recovery are idempotent and never publish or call a provider', async () => {
  let currentTime = time;
  let calls = 0;
  const { run, store } = setup({ now: () => currentTime, fetchImpl: async () => { calls++; throw new Error('No model or hook call allowed'); } });
  const invoke = (payload) => run(request(payload, { time: currentTime }));
  const payload = { action: 'generate', requestId: randomUUID(), topic: 'Planejamento industrial', brief: '' };
  await invoke(payload);
  const { job } = await (await invoke({ action: 'claimNext' })).json();
  const complete = { action: 'completeGeneration', requestId: job.requestId, leaseToken: job.leaseToken, article: sample() };
  const results = await Promise.all(Array.from({ length: 8 }, () => invoke(complete)));
  for (const response of results) {
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { article: sample() });
  }
  assert.equal(store.revision, 3);
  const revision = store.revision;
  const snapshot = structuredClone([...store.records]);
  currentTime = job.leaseExpiresAt + 1;
  for (const retry of [complete, payload, { action: 'recover', requestId: job.requestId }]) {
    const response = await invoke(retry);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { article: sample() });
  }
  assert.equal((await invoke({ ...complete, article: { ...sample(), title: 'Different article title' } })).status, 409);
  assert.equal((await invoke({ ...complete, leaseToken: '0'.repeat(64) })).status, 409);
  assert.equal(store.revision, revision);
  assert.deepEqual([...store.records], snapshot);
  assert.equal([...store.records.keys()].some((key) => /^(approved|publication|hook)\//.test(key)), false);
  assert.equal(calls, 0);
});

test('recover reports queued or working jobs and rejects absent or legacy failed records without writes', async () => {
  const { run, store, calls } = setup();
  for (const state of [null, 'running', 'failed', 'queued', 'working']) {
    const requestId = randomUUID();
    if (state) await store.setJSON(`generation/${requestId}`, { state });
    const revision = store.revision;
    const response = await run(request({ action: 'recover', requestId }));
    if (state === 'queued' || state === 'working') {
      assert.equal(response.status, 202);
      assert.deepEqual(await response.json(), { queued: true, state });
    } else {
      assert.equal(response.status, 409);
      assert.equal((await response.json()).code, 'generation_incomplete');
    }
    assert.equal(store.revision, revision);
  }
  const revision = store.revision;
  assert.equal((await run(request({ action: 'recover', requestId: '../invalid' }))).status, 400);
  assert.equal((await run(request({ action: 'recover', requestId: randomUUID() }, { headers: { 'x-studio-signature': '0'.repeat(64) } }))).status, 401);
  assert.equal(store.revision, revision);
  assert.equal(calls(), 0);
});

test('legacy completed results remain recoverable and failed IDs are never silently requeued', async () => {
  const { run, store, calls } = setup();
  const payload = { action: 'generate', requestId: randomUUID(), topic: 'Planejamento industrial', brief: '' };
  const requestHash = hash({ topic: payload.topic, brief: payload.brief });
  await store.setJSON(`generation/${payload.requestId}`, { requestHash, state: 'complete', article: sample() });
  assert.deepEqual(await (await run(request(payload))).json(), { article: sample() });
  assert.deepEqual(await (await run(request({ action: 'recover', requestId: payload.requestId }))).json(), { article: sample() });
  await store.setJSON(`generation/${payload.requestId}`, { requestHash, state: 'failed' });
  const revision = store.revision;
  assert.equal((await run(request(payload))).status, 409);
  assert.deepEqual(await (await run(request({ action: 'claimNext' }))).json(), { job: null });
  assert.equal(store.revision, revision);
  assert.equal(calls(), 0);
});

test('claiming and completion refuse storage entries without an ETag', async () => {
  const { run, store } = setup();
  const requestId = randomUUID();
  await run(request({ action: 'generate', requestId, topic: 'Planejamento industrial', brief: '' }));
  const getWithMetadata = store.getWithMetadata.bind(store);
  store.getWithMetadata = async (key) => ({ ...await getWithMetadata(key), etag: undefined });
  assert.equal((await run(request({ action: 'claimNext' }))).status, 503);
  assert.equal((await store.get(`generation/${requestId}`)).state, 'queued');
  store.getWithMetadata = getWithMetadata;
  const { job } = await (await run(request({ action: 'claimNext' }))).json();
  store.getWithMetadata = async (key) => ({ ...await getWithMetadata(key), etag: undefined });
  const response = await run(request({ action: 'completeGeneration', requestId, leaseToken: job.leaseToken, article: sample() }));
  assert.equal(response.status, 503);
  assert.equal((await store.get(`generation/${requestId}`)).state, 'working');
});

test('a lease changing during completion cannot be overwritten', async () => {
  const { run, store } = setup();
  const requestId = randomUUID();
  await run(request({ action: 'generate', requestId, topic: 'Planejamento industrial', brief: '' }));
  const { job } = await (await run(request({ action: 'claimNext' }))).json();
  const setJSON = store.setJSON.bind(store);
  store.setJSON = async (key, value, options) => {
    if (value.state === 'complete') {
      const current = await store.get(key);
      await setJSON(key, { ...current, leaseToken: '1'.repeat(64), leaseExpiresAt: time + 2 * GENERATION_LEASE_MS });
    }
    return setJSON(key, value, options);
  };
  assert.equal((await run(request({ action: 'completeGeneration', requestId, leaseToken: job.leaseToken, article: sample() }))).status, 409);
  const saved = await store.get(`generation/${requestId}`);
  assert.equal(saved.state, 'working');
  assert.equal(saved.leaseToken, '1'.repeat(64));
  assert.equal(saved.article, undefined);
});

test('HTML, unsafe URL schemes, encoded attribute escapes and path traversal are rejected', () => {
  for (const bad of ['<script>alert(1)</script>', '[x](javascript:alert(1))', '[x](//evil.example/)', '[x](/path"onmouseover="x)', '[x](https://safe.example/&#34;onclick=x)']) {
    assert.throws(() => validateArticle({ ...sample(), body: sample().body + bad }));
  }
  assert.throws(() => validateArticle({ ...sample(), slug: '../other' }));
  assert.throws(() => validateArticle({ ...sample(), description: 'x'.repeat(181) }));
  assert.doesNotThrow(() => validateArticle({ ...sample(), body: sample().body + '[A source](https://example.org/source?a=1&b=2)' }));
});
