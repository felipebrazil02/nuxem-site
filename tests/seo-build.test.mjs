import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, cpSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

test('SEO output stays consistent across clean and incremental builds, including legacy posts', () => {
  const repository = fileURLToPath(new URL('../', import.meta.url));
  const scratch = join(repository, 'work');
  mkdirSync(scratch, { recursive: true });
  const root = mkdtempSync(join(scratch, 'seo-build-'));
  try {
    for (const path of ['build.mjs', 'src', 'conteudo']) {
      cpSync(join(repository, path), join(root, path), { recursive: true });
    }
    const build = () => execFileSync(process.execPath, ['build.mjs'], { cwd: root });
    const read = path => readFileSync(join(root, 'dist', path), 'utf8');
    const sitemapURLs = () => [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    build();
    const cleanURLs = sitemapURLs();
    assert.equal(cleanURLs.length, new Set(cleanURLs).size);
    const legacyDir = join(root, 'dist', 'blog', 'legacy-test');
    mkdirSync(legacyDir, { recursive: true });
    writeFileSync(join(legacyDir, 'index.html'), '<html><head><title>Legado | Blog Nuxem</title></head><body><h1>Legado</h1></body></html>');
    build();
    const incrementalURLs = sitemapURLs();
    assert.equal(incrementalURLs.length, cleanURLs.length + 1);
    assert.equal(incrementalURLs.length, new Set(incrementalURLs).size);
    assert.ok(incrementalURLs.includes('https://nuxemoil.com.br/blog/legacy-test/'));
    assert.doesNotMatch(read('sitemap.xml'), /<lastmod>/);
    for (const url of incrementalURLs) {
      assert.ok(existsSync(join(root, 'dist', new URL(url).pathname, 'index.html')), url);
    }
    for (const slug of ['oleo-bpf', 'oleo-de-xisto']) {
      const html = read(`produtos/${slug}/index.html`);
      const product = JSON.parse(html.match(/<script type="application\/ld\+json">([^]*?)<\/script>/)[1]);
      assert.equal(product['@type'], 'Product');
      assert.equal(product.offers, undefined);
      assert.match(html, /<title>[^<]*SP, MG e PR/);
      assert.match(html, /ficha técnica/);
      assert.match(html, /ficha de dados de segurança/);
      assert.match(html, /Como solicitar sua cotação/);
    }
    assert.match(read('produtos/oleo-bpf/index.html'), /10\.400 kcal\/kg/);
    assert.doesNotMatch(read('produtos/oleo-de-xisto/index.html'), /dispensando totalmente|dispensa pré-aquecimento/);
    const rules = read('_redirects').trim().split('\n').filter(line => line.startsWith('/blog/'));
    assert.equal(rules.length, 8);
    for (const rule of rules) {
      const [from, to, status] = rule.split(' ');
      assert.notEqual(from, to);
      assert.equal(status, '301');
      assert.ok(existsSync(join(root, 'dist', to, 'index.html')), rule);
    }
    build();
    assert.deepEqual(sitemapURLs(), incrementalURLs);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
