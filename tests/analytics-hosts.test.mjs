import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';

const repository = fileURLToPath(new URL('../', import.meta.url));
const scratch = join(repository, 'work');
let root, bootstrap, home, legacy;
const legacyCanonical = '<link rel="canonical" href="https://nuxemoil.com.br/blog/legacy-analytics/">';
const legacySchema = '<script type="application/ld+json">{"@type":"Article","headline":"Legado"}</script>';

before(() => {
  mkdirSync(scratch, { recursive: true });
  root = mkdtempSync(join(scratch, 'analytics-hosts-'));
  for (const file of ['build.mjs', 'src', 'conteudo']) cpSync(join(repository, file), join(root, file), { recursive: true });
  mkdirSync(join(root, 'dist/blog/legacy-analytics'), { recursive: true });
  writeFileSync(join(root, 'dist/blog/legacy-analytics/index.html'), `<!doctype html><html><head><title>Legado | Blog Nuxem</title>${legacyCanonical}${legacySchema}
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('config', 'G-H0XF8SXJ4B');</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-H0XF8SXJ4B"></script>
</head><body><h1>Legado</h1><p id="original">Conteúdo preservado.</p></body></html>`);
  execFileSync(process.execPath, ['build.mjs'], { cwd: root });
  home = readFileSync(join(root, 'dist/index.html'), 'utf8');
  legacy = readFileSync(join(root, 'dist/blog/legacy-analytics/index.html'), 'utf8');
  bootstrap = [...home.matchAll(/<script>([^]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes("gtag('config', 'G-H0XF8SXJ4B')"));
  assert.ok(bootstrap);
});

after(() => {
  if (!root) return;
  const path = relative(scratch, root);
  assert.ok(path.startsWith('analytics-hosts-') && !path.includes('..'));
  rmSync(root, { recursive: true, force: true });
});

function run(script, hostname, consent, existingQueue = []) {
  const loads = [];
  let storageReads = 0;
  const window = { dataLayer: existingQueue };
  const context = { window, location: { hostname }, localStorage: { getItem(key) {
    storageReads++;
    assert.equal(key, 'nuxem_consent_v1');
    if (consent === 'throws') throw new Error('Storage unavailable');
    return consent;
  } }, document: { createElement(name) { assert.equal(name, 'script'); return {}; }, head: { appendChild(node) {
    loads.push({ ...node, queue: JSON.parse(JSON.stringify(window.dataLayer.map(args => Array.from(args)))) });
  } } } };
  runInNewContext(script, context);
  return { window, loads, storageReads, events: JSON.parse(JSON.stringify(window.dataLayer.map(args => Array.from(args)))) };
}

for (const hostname of ['nuxemoil.com.br', 'www.nuxemoil.com.br']) {
  for (const consent of [null, 'denied', 'granted', 'throws']) {
    test(`production ${hostname}: preserves consent ${consent}`, () => {
      const result = run(bootstrap, hostname, consent);
      assert.equal(result.loads.length, 1);
      assert.equal(result.loads[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-H0XF8SXJ4B');
      assert.equal(result.loads[0].async, true);
      assert.equal(result.storageReads, 1);
      assert.deepEqual(result.events[0], ['consent', 'default', {
        ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied',
      }]);
      if (consent === 'granted') assert.deepEqual(result.events[1], ['consent', 'update', {
        ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted',
      }]);
      assert.equal(result.events.length, consent === 'granted' ? 4 : 3);
      assert.equal(result.events.at(-2)[0], 'js');
      assert.deepEqual(result.events.at(-1), ['config', 'G-H0XF8SXJ4B']);
      assert.deepEqual(result.loads[0].queue, result.events, 'consent and config must be queued before loading Google');
      // The existing banner and contact handlers call window.gtag after bootstrap.
      result.window.gtag('consent', 'update', { analytics_storage: 'denied' });
      assert.equal(result.window.dataLayer.at(-1)[0], 'consent');
    });
  }
}

for (const hostname of ['localhost', '127.0.0.1', '[::1]', '', 'deploy-preview-46--mellifluous-dasik-1c2b7c.netlify.app',
  'fix-analytics--mellifluous-dasik-1c2b7c.netlify.app', 'mellifluous-dasik-1c2b7c.netlify.app',
  'preview.nuxemoil.com.br', 'nuxemoil.com.br.evil.test']) {
  test(`blocked host ${hostname || '(file)'} never initializes or loads Analytics, including remembered consent`, () => {
    for (const consent of [null, 'denied', 'granted']) {
      const f = run(bootstrap, hostname, consent);
      assert.deepEqual(f.loads, []);
      assert.deepEqual(f.events, []);
      assert.equal(f.window.gtag, undefined);
      assert.equal(f.storageReads, 0);
    }
  });
}

test('bootstrap reuses an existing queue and no static Google loader bypasses the host check', () => {
  const queue = [['existing']];
  const f = run(bootstrap, 'nuxemoil.com.br', null, queue);
  assert.equal(f.window.dataLayer, queue);
  assert.deepEqual(f.events[0], ['existing']);
  assert.doesNotMatch(home, /<script\b[^>]*\bsrc=["'][^"']*googletagmanager\.com\/gtag\/js/i);
});

test('incremental build migrates the old static tag and preserves legacy SEO/content', () => {
  assert.ok(legacy.includes(legacyCanonical));
  assert.ok(legacy.includes(legacySchema));
  assert.ok(legacy.includes('<p id="original">Conteúdo preservado.</p>'));
  assert.equal([...legacy.matchAll(/googletagmanager\.com\/gtag\/js/g)].length, 1);
  assert.doesNotMatch(legacy, /<script\b[^>]*\bsrc=["'][^"']*googletagmanager\.com\/gtag\/js/i);
  const script = [...legacy.matchAll(/<script>([^]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes("gtag('config', 'G-H0XF8SXJ4B')"));
  assert.deepEqual(run(script, 'localhost', 'granted').loads, []);
  assert.equal(run(script, 'nuxemoil.com.br', 'granted').loads.length, 1);
  const first = legacy;
  execFileSync(process.execPath, ['build.mjs'], { cwd: root });
  assert.equal(readFileSync(join(root, 'dist/blog/legacy-analytics/index.html'), 'utf8'), first, 'migration must be idempotent');
});
