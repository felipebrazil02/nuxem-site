import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, cpSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { EMPRESA, PRODUTOS, COBERTURA } from '../src/dados.mjs';
import { criarPlugin, urlsAlteradas } from '../netlify/plugins/indexnow/core.mjs';

const repository = fileURLToPath(new URL('../', import.meta.url));

test('build publishes llms.txt, robots for AI crawlers, sameAs and the IndexNow key and manifest', () => {
  const scratch = join(repository, 'work');
  mkdirSync(scratch, { recursive: true });
  const root = mkdtempSync(join(scratch, 'bing-ia-'));
  try {
    for (const path of ['build.mjs', 'src', 'conteudo']) cpSync(join(repository, path), join(root, path), { recursive: true });
    execFileSync(process.execPath, ['build.mjs'], { cwd: root });
    const dist = join(root, 'dist');
    const read = path => readFileSync(join(dist, path), 'utf8');

    const robots = read('robots.txt');
    for (const robo of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Bingbot']) assert.match(robots, new RegExp(`User-agent: ${robo}\\b`));
    assert.doesNotMatch(robots, /Disallow/);
    assert.match(robots, /Sitemap: https:\/\/nuxemoil\.com\.br\/sitemap\.xml/);

    const llms = read('llms.txt');
    assert.match(llms, /^# Nuxem\n\n> /);
    for (const p of PRODUTOS) assert.ok(llms.includes(`(https://nuxemoil.com.br/produtos/${p.slug}/)`), p.slug);
    for (const e of COBERTURA) assert.ok(llms.includes(`(https://nuxemoil.com.br/cobertura/${e.slug}/)`), e.slug);
    assert.doesNotMatch(llms, /<[a-z]/i);
    for (const [, url] of llms.matchAll(/\]\((https:\/\/nuxemoil\.com\.br[^)]*)\)/g)) {
      assert.ok(existsSync(join(dist, url.slice(EMPRESA.dominio.length), 'index.html')), url);
    }

    const negocio = [...read('index.html').matchAll(/<script type="application\/ld\+json">([^]*?)<\/script>/g)].map(m => JSON.parse(m[1])).find(b => b['@type'] === 'LocalBusiness');
    assert.deepEqual(negocio.sameAs, EMPRESA.perfis);

    assert.match(EMPRESA.indexNowKey, /^[0-9a-f]{32}$/);
    assert.equal(read(`${EMPRESA.indexNowKey}.txt`), EMPRESA.indexNowKey);
    const manifesto = JSON.parse(read('indexnow-manifest.json'));
    const urlsSitemap = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    assert.deepEqual(Object.keys(manifesto).sort(), [...urlsSitemap].sort());
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('IndexNow plugin submits only changed URLs, only in production, and never throws', async () => {
  assert.deepEqual(urlsAlteradas({ 'https://nuxemoil.com.br/': 'a', 'https://nuxemoil.com.br/x/': 'b' }, { 'https://nuxemoil.com.br/': 'a', 'https://nuxemoil.com.br/x/': 'c', 'https://nuxemoil.com.br/y/': 'd' }), ['https://nuxemoil.com.br/x/', 'https://nuxemoil.com.br/y/']);
  assert.equal(urlsAlteradas(null, { 'https://nuxemoil.com.br/': 'a' }).length, 1);

  const dist = mkdtempSync(join(repository, 'work', 'indexnow-'));
  try {
    const { writeFileSync } = await import('node:fs');
    writeFileSync(join(dist, 'robots.txt'), 'x');
    writeFileSync(join(dist, `${EMPRESA.indexNowKey}.txt`), EMPRESA.indexNowKey);
    writeFileSync(join(dist, 'indexnow-manifest.json'), JSON.stringify({ 'https://nuxemoil.com.br/': 'a', 'https://nuxemoil.com.br/x/': 'novo' }));

    const chamadas = [];
    const fetchImpl = async (url, opcoes) => {
      chamadas.push({ url, opcoes });
      if (url.endsWith('indexnow-manifest.json')) return { ok: true, json: async () => ({ 'https://nuxemoil.com.br/': 'a', 'https://nuxemoil.com.br/x/': 'velho' }) };
      return { ok: true, status: 200 };
    };
    const producao = criarPlugin({ fetchImpl, env: { CONTEXT: 'production' }, log: () => {} });
    await producao.onPreBuild();
    await producao.onSuccess({ constants: { PUBLISH_DIR: dist } });
    const envio = chamadas.find(c => c.url === 'https://api.indexnow.org/indexnow');
    const corpo = JSON.parse(envio.opcoes.body);
    assert.deepEqual(corpo.urlList, ['https://nuxemoil.com.br/x/']);
    assert.equal(corpo.host, 'nuxemoil.com.br');
    assert.equal(corpo.keyLocation, `https://nuxemoil.com.br/${EMPRESA.indexNowKey}.txt`);

    const previa = [];
    const pluginPrevia = criarPlugin({ fetchImpl: async url => { previa.push(url); return { ok: true }; }, env: { CONTEXT: 'deploy-preview' }, log: () => {} });
    await pluginPrevia.onPreBuild();
    await pluginPrevia.onSuccess({ constants: { PUBLISH_DIR: dist } });
    assert.equal(previa.length, 0);

    const falha = criarPlugin({ fetchImpl: async () => { throw new Error('rede'); }, env: { CONTEXT: 'production' }, log: () => {} });
    await falha.onPreBuild();
    await falha.onSuccess({ constants: { PUBLISH_DIR: dist } });
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});
