import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const SITE = 'https://nuxemoil.com.br';
export const STORE_NAME = 'nuxem-studio-seo-v1';
export const BODY_LIMIT = 60 * 1024;
export const GENERATION_LEASE_MS = 20 * 60 * 1000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class BridgeError extends Error {
  constructor(status, code, message, details = {}) { super(message); this.status = status; this.code = code; this.details = details; }
}
const invalid = (message) => { throw new BridgeError(400, 'invalid_input', message); };
const canonical = (value) => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])])) : value;
export const hash = (value) => createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');
export const articleURL = (slug) => `${SITE}/blog/${slug}/`;

export function validateUUID(value, field) {
  if (typeof value !== 'string' || !UUID.test(value)) invalid(`${field} must be a UUID.`);
  return value.toLowerCase();
}

function text(value, field, min, max, multiline = false) {
  if (typeof value !== 'string') invalid(`${field} must be text.`);
  const result = value.replace(/\r\n/g, '\n').trim();
  if (result.length < min || result.length > max) invalid(`${field} must contain ${min} to ${max} characters.`);
  if (/[<>\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(result)) invalid(`${field} contains HTML or control characters.`);
  if (!multiline && /[\r\n\t]/.test(result)) invalid(`${field} must be a single line.`);
  return result;
}

export function validateMarkdown(body) {
  if (/!\[|^\s*\[[^\]]+\]:/m.test(body)) invalid('Use inline text links, without images or reference links.');
  // Match the exact inline-link syntax consumed by the existing build.mjs renderer.
  for (const match of body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const target = match[2];
    if (/[\s"'`<>\\]/.test(target) || /&(?:#|[a-z][a-z0-9]*;)/i.test(target)) invalid('A Markdown link has an unsafe destination.');
    let url;
    try { url = new URL(target, SITE); } catch { invalid('A Markdown link is not a valid URL.'); }
    const ownPath = target.startsWith('/') && !target.startsWith('//') && url.origin === SITE;
    const secureURL = target.startsWith('https://') && url.protocol === 'https:';
    if ((!ownPath && !secureURL) || url.username || url.password) invalid('Links must use a site-relative path or HTTPS.');
  }
  return body;
}

export function validateArticle(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) invalid('article is required.');
  const title = text(input.title, 'title', 10, 120);
  const slug = text(input.slug, 'slug', 3, 100);
  if (!SLUG.test(slug)) invalid('slug must use lowercase letters, digits and single hyphens.');
  const description = text(input.description, 'description', 20, 180);
  const keyword = text(input.keyword, 'keyword', 2, 160);
  const body = validateMarkdown(text(input.body, 'body', 500, 24000, true));
  if (!['en', 'es', 'pt'].includes(input.language)) invalid('language must be en, es or pt.');
  return { title, slug, description, keyword, body, language: input.language };
}

export function verifySignature(rawBody, time, signature, secret, now = Date.now()) {
  if (!secret || secret.length < 32) throw new BridgeError(503, 'bridge_not_configured', 'Bridge authentication is not configured.');
  if (typeof time !== 'string' || !/^\d{13}$/.test(time) || Math.abs(now - Number(time)) > 300000) {
    throw new BridgeError(401, 'unauthorized', 'Invalid request authentication.');
  }
  if (typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature)) {
    throw new BridgeError(401, 'unauthorized', 'Invalid request authentication.');
  }
  const expected = createHmac('sha256', secret).update(`${time}.${rawBody}`).digest();
  if (!timingSafeEqual(expected, Buffer.from(signature, 'hex'))) {
    throw new BridgeError(401, 'unauthorized', 'Invalid request authentication.');
  }
}

export async function readBody(request) {
  if (Number(request.headers.get('content-length')) > BODY_LIMIT) throw new BridgeError(413, 'body_too_large', 'Request exceeds 60 KB.');
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > BODY_LIMIT) { await reader.cancel(); throw new BridgeError(413, 'body_too_large', 'Request exceeds 60 KB.'); }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export function buildHookURL(value) {
  try {
    const url = new URL(value);
    if (url.origin !== 'https://api.netlify.com' || !/^\/build_hooks\/[a-zA-Z0-9]+$/.test(url.pathname) || url.search || url.hash || url.username || url.password) return null;
    return url.href;
  } catch { return null; }
}

export function createBridge({ getStore, env = process.env, fetchImpl = fetch, now = Date.now, legacySlugs = [] }) {
  const reserved = new Set(legacySlugs);
  const json = (value, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  return async function bridge(request) {
    try {
      if (request.method !== 'POST') return json({ error: 'Use POST.', code: 'method_not_allowed' }, 405);
      const raw = await readBody(request);
      verifySignature(raw, request.headers.get('x-studio-time'), request.headers.get('x-studio-signature'), env.STUDIO_BRIDGE_SECRET, now());
      let input;
      try { input = JSON.parse(raw); } catch { invalid('Request must contain JSON.'); }
      if (!input || typeof input !== 'object' || Array.isArray(input)) invalid('Request must be an object.');
      const store = getStore({ name: STORE_NAME, consistency: 'strong' });
      if (input.action === 'status') {
        // Read a harmless key to detect an unconfigured Blobs environment without mutating it.
        await store.get('healthcheck', { type: 'json' });
        return json({ generationReady: true, generationMode: 'codex_queue', publishingReady: Boolean(buildHookURL(env.STUDIO_BUILD_HOOK)), site: SITE });
      }
      if (input.action === 'recover') {
        const requestId = validateUUID(input.requestId, 'requestId');
        const saved = await store.get(`generation/${requestId}`, { type: 'json' });
        if (saved?.state === 'complete') return json({ article: saved.article });
        if (saved?.state === 'queued' || saved?.state === 'working') return json({ queued: true, state: saved.state }, 202);
        throw new BridgeError(409, 'generation_incomplete', 'No queued or completed generation is available for this request ID.');
      }
      if (input.action === 'generate') {
        const requestId = validateUUID(input.requestId, 'requestId');
        const topic = text(input.topic, 'topic', 3, 240);
        const brief = input.brief == null ? '' : text(input.brief, 'brief', 0, 12000, true);
        const requestHash = hash({ topic, brief });
        const key = `generation/${requestId}`;
        const claim = await store.setJSON(key, { requestId, requestHash, topic, brief, state: 'queued', queuedAt: now() }, { onlyIfNew: true });
        if (!claim.modified) {
          const old = await store.get(key, { type: 'json' });
          if (!old || old.requestHash !== requestHash) throw new BridgeError(409, 'request_id_conflict', 'This request ID belongs to different content.');
          if (old.state === 'complete') return json({ article: old.article });
          if (old.state !== 'queued' && old.state !== 'working') throw new BridgeError(409, 'generation_not_retried', 'This previous generation cannot be queued again. Use a new request ID.');
        }
        return json({ queued: true }, 202);
      }
      if (input.action === 'claimNext') {
        for await (const page of store.list({ prefix: 'generation/', paginate: true })) {
          for (const { key } of page.blobs) {
            const requestId = key.slice('generation/'.length);
            if (!UUID.test(requestId)) continue;
            const entry = await store.getWithMetadata(key, { type: 'json' });
            const saved = entry?.data;
            const claimedAt = now();
            const expired = saved?.state === 'working' && Number.isFinite(saved.leaseExpiresAt) && saved.leaseExpiresAt <= claimedAt;
            if (!saved || (saved.state !== 'queued' && !expired) || typeof saved.topic !== 'string' || typeof saved.brief !== 'string') continue;
            if (!entry.etag) throw new BridgeError(503, 'queue_unavailable', 'Generation storage did not provide a version for the lease.');
            const leaseToken = randomBytes(32).toString('hex');
            const leaseExpiresAt = claimedAt + GENERATION_LEASE_MS;
            const claim = await store.setJSON(key, { ...saved, state: 'working', leaseToken, leaseExpiresAt, claimedAt }, { onlyIfMatch: entry.etag });
            if (claim.modified) return json({ job: { requestId, topic: saved.topic, brief: saved.brief, leaseToken, leaseExpiresAt } });
          }
        }
        return json({ job: null });
      }
      if (input.action === 'completeGeneration') {
        const requestId = validateUUID(input.requestId, 'requestId');
        const leaseToken = input.leaseToken;
        if (typeof leaseToken !== 'string' || !/^[a-f0-9]{64}$/.test(leaseToken)) invalid('leaseToken must be the token returned by claimNext.');
        const article = validateArticle(input.article);
        const contentHash = hash(article);
        const key = `generation/${requestId}`;
        const entry = await store.getWithMetadata(key, { type: 'json' });
        const saved = entry?.data;
        if (!saved || saved.leaseToken !== leaseToken) throw new BridgeError(409, 'generation_lease_conflict', 'This worker does not hold the generation lease.');
        if (saved.state === 'complete') {
          if (saved.contentHash !== contentHash) throw new BridgeError(409, 'generation_result_conflict', 'This request already has a different completed article.');
          return json({ article: saved.article });
        }
        if (saved.state !== 'working' || !Number.isFinite(saved.leaseExpiresAt) || saved.leaseExpiresAt <= now()) throw new BridgeError(409, 'generation_lease_expired', 'The generation lease is no longer active.');
        if (!entry.etag) throw new BridgeError(503, 'queue_unavailable', 'Generation storage did not provide a version for completion.');
        const completed = {
          ...saved, state: 'complete', article, contentHash, completedAt: now(),
          // Worker attestation for this editorial workflow; not provider-verified model telemetry.
          generator: { model: 'gpt-6-astra', effort: 'ultra', source: 'codex' },
        };
        const result = await store.setJSON(key, completed, { onlyIfMatch: entry.etag });
        if (!result.modified) {
          const current = await store.get(key, { type: 'json' });
          if (current?.state === 'complete' && current.leaseToken === leaseToken && current.contentHash === contentHash) return json({ article: current.article });
          throw new BridgeError(409, 'generation_result_conflict', 'The generation lease or result changed before completion.');
        }
        return json({ article });
      }
      if (input.action === 'publish') {
        const articleId = validateUUID(input.articleId, 'articleId');
        const article = validateArticle(input.article);
        if (reserved.has(article.slug)) throw new BridgeError(409, 'legacy_slug', 'This URL belongs to an existing article.', { publicationCreated: false });
        const hookURL = buildHookURL(env.STUDIO_BUILD_HOOK);
        if (!hookURL) throw new BridgeError(503, 'publishing_not_configured', 'The publishing build hook is not configured.');
        const contentHash = hash(article);
        const identityKey = `publication/${articleId}`;
        const identity = { articleId, contentHash, article, approvedAt: new Date(now()).toISOString() };
        const existingIdentity = await store.get(identityKey, { type: 'json' });
        if (existingIdentity && (existingIdentity.contentHash !== contentHash || existingIdentity.article.slug !== article.slug)) throw new BridgeError(409, 'article_id_conflict', 'This article ID is already associated with different content.');
        const slugKey = `slug/${article.slug}`;
        const slugClaim = await store.setJSON(slugKey, { articleId, contentHash }, { onlyIfNew: true });
        if (!slugClaim.modified) {
          const old = await store.get(slugKey, { type: 'json' });
          if (!old || old.articleId !== articleId || old.contentHash !== contentHash) throw new BridgeError(409, 'slug_conflict', 'This URL is already reserved by another article.', { publicationCreated: Boolean(existingIdentity) });
        }
        // Claim the URL before the publication identity, so a conflicting URL leaves an unattempted draft editable.
        const claim = await store.setJSON(identityKey, identity, { onlyIfNew: true });
        const saved = claim.modified ? identity : await store.get(identityKey, { type: 'json' });
        if (!saved || saved.contentHash !== contentHash || saved.article.slug !== article.slug) throw new BridgeError(409, 'article_id_conflict', 'This article ID is already associated with different content.');
        const approvedClaim = await store.setJSON(`approved/${articleId}`, saved, { onlyIfNew: true });
        if (!approvedClaim.modified) {
          const old = await store.get(`approved/${articleId}`, { type: 'json' });
          if (!old || old.contentHash !== contentHash || old.articleId !== articleId) throw new BridgeError(409, 'approval_conflict', 'Approved content differs from this request.');
        }
        // The dispatch record is written before any network request. Crashes and lost responses cannot cause duplicate hook POSTs.
        const hookKey = `hook/${articleId}`;
        const hookClaim = await store.setJSON(hookKey, { state: 'pending', startedAt: now() }, { onlyIfNew: true });
        let buildStatus;
        if (hookClaim.modified) {
          buildStatus = 'uncertain';
          try {
            const hookResult = await fetchImpl(hookURL, { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(8000), headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ articleId }) });
            if (hookResult.ok) buildStatus = 'triggered';
          } catch { /* An uncertain request must not automatically trigger another build. */ }
          await store.setJSON(hookKey, { state: buildStatus, finishedAt: now() }, { onlyIfMatch: hookClaim.etag }).catch(() => {});
        } else {
          const old = await store.get(hookKey, { type: 'json' });
          buildStatus = old?.state ?? 'uncertain';
        }
        return json({ url: articleURL(article.slug), accepted: true, buildStatus });
      }
      throw new BridgeError(400, 'unknown_action', 'Unknown bridge action.');
    } catch (error) {
      if (error instanceof BridgeError) return json({ error: error.message, code: error.code, ...error.details }, error.status);
      return json({ error: 'The publishing service is temporarily unavailable.', code: 'bridge_unavailable' }, 503);
    }
  };
}
