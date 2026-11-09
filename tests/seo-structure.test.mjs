import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, cpSync, readFileSync, readdirSync, existsSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { COBERTURA, SOLUCOES } from '../src/dados.mjs';

function construir() {
  const repository = fileURLToPath(new URL('../', import.meta.url));
  const scratch = join(repository, 'work');
  mkdirSync(scratch, { recursive: true });
  const root = mkdtempSync(join(scratch, 'seo-structure-'));
  for (const path of ['build.mjs', 'src', 'conteudo']) cpSync(join(repository, path), join(root, path), { recursive: true });
  execFileSync(process.execPath, ['build.mjs'], { cwd: root });
  return root;
}

function paginasHtml(dir, base = dir, saida = []) {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) paginasHtml(caminho, base, saida);
    else if (nome === 'index.html') saida.push(caminho);
  }
  return saida;
}

const blocosLd = html => [...html.matchAll(/<script type="application\/ld\+json">([^]*?)<\/script>/g)].map(m => JSON.parse(m[1]));

test('structured data, breadcrumbs, regional pages and solution pages are generated consistently', () => {
  const root = construir();
  try {
    const dist = join(root, 'dist');
    const read = path => readFileSync(join(dist, path), 'utf8');

    // Todo JSON-LD é válido; páginas internas têm BreadcrumbList; a home não.
    for (const arquivo of paginasHtml(dist)) {
      const html = readFileSync(arquivo, 'utf8');
      const relativo = arquivo.slice(dist.length + 1).replace(/\\/g, '/');
      const blocos = blocosLd(html);
      const trilha = blocos.find(b => b['@type'] === 'BreadcrumbList');
      if (relativo === 'index.html') assert.equal(trilha, undefined);
      else {
        assert.ok(trilha, `Sem BreadcrumbList: ${relativo}`);
        assert.equal(trilha.itemListElement[0].name, 'Início');
        trilha.itemListElement.forEach((item, i) => assert.equal(item.position, i + 1));
      }
    }

    // Home: sem priceRange, com horário 24h e identificador da organização.
    const home = blocosLd(read('index.html'));
    const negocio = home.find(b => b['@type'] === 'LocalBusiness');
    assert.equal(negocio.priceRange, undefined);
    assert.equal(negocio['@id'], 'https://nuxemoil.com.br/#organizacao');
    assert.equal(negocio.openingHoursSpecification.opens, '00:00');
    assert.ok(home.some(b => b['@type'] === 'WebSite'));

    // Páginas regionais: uma por estado, com FAQ, Service e links para soluções e artigos.
    for (const estado of COBERTURA) {
      const html = read(`cobertura/${estado.slug}/index.html`);
      const blocos = blocosLd(html);
      assert.equal(blocos[0]['@type'], 'Service');
      assert.equal(blocos[0].areaServed.name, estado.nome);
      assert.ok(blocos.some(b => b['@type'] === 'FAQPage' && b.mainEntity.length === estado.faq.length));
      assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
      assert.ok(html.includes(`<link rel="canonical" href="https://nuxemoil.com.br/cobertura/${estado.slug}/">`));
      for (const slug of estado.aplicacoes) assert.ok(html.includes(`href="/solucoes/${slug}/"`), slug);
      for (const artigo of estado.artigos) assert.ok(html.includes(`href="/blog/${artigo}/"`), artigo);
      assert.ok(read('cobertura/index.html').includes(`href="/cobertura/${estado.slug}/"`));
      assert.ok(read('index.html').includes(`href="/cobertura/${estado.slug}/"`));
      assert.ok(read('sitemap.xml').includes(`<loc>https://nuxemoil.com.br/cobertura/${estado.slug}/</loc>`));
    }

    // Soluções: Service + FAQPage, conteúdo extra e link para as regiões.
    assert.ok(SOLUCOES.some(s => s.slug === 'fornos-e-secadores'));
    for (const solucao of SOLUCOES) {
      const html = read(`solucoes/${solucao.slug}/index.html`);
      const blocos = blocosLd(html);
      assert.equal(blocos[0]['@type'], 'Service');
      assert.ok(blocos.some(b => b['@type'] === 'FAQPage'));
      for (const estado of COBERTURA) assert.ok(html.includes(`href="/cobertura/${estado.slug}/"`));
      assert.ok(read('solucoes/index.html').includes(`href="/solucoes/${solucao.slug}/"`));
    }

    // Links internos de páginas novas apontam para páginas que existem.
    for (const arquivo of paginasHtml(join(dist, 'cobertura')).concat(paginasHtml(join(dist, 'solucoes')))) {
      const html = readFileSync(arquivo, 'utf8');
      for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
        if (/\.[a-z0-9]+$/i.test(href)) continue;
        assert.ok(existsSync(join(dist, href, 'index.html')), `${href} em ${arquivo}`);
      }
    }

    // Títulos de blog longos perdem o sufixo, mas mantêm o H1 completo.
    const fluidez = read('blog/ponto-de-fluidez-oleo-combustivel-armazenamento-bombeamento/index.html');
    assert.ok(fluidez.match(/<title>([^<]*)<\/title>/)[1].length <= 66);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
