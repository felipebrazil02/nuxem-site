import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, cpSync, readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { CATEGORIAS_BLOG, LEITURAS } from '../src/leituras.mjs';
import { PRODUTOS } from '../src/dados.mjs';

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
    // A imagem pré-carregada deve ser a mesma escolhida pelo navegador no HTML.
    const home = read('index.html');
    const hero = home.match(/<img[^>]+fetchpriority="high"[^>]*>/)[0];
    const preload = home.match(/<link rel="preload"[^>]*>/)[0];
    assert.equal(preload.match(/imagesrcset="([^"]+)"/)[1], hero.match(/srcset="([^"]+)"/)[1]);
    assert.equal(preload.match(/imagesizes="([^"]+)"/)[1], hero.match(/sizes="([^"]+)"/)[1]);
    assert.match(preload, /fetchpriority="high"/);
    for (const page of ['produtos/oleo-bpf/index.html', 'guia-oleo-bpf/index.html']) {
      assert.match(read(page), /href="\/guia-oleo-bpf\/faq\/"/);
    }
    for (const url of cleanURLs) {
      const html = read(new URL(url).pathname.slice(1) + 'index.html');
      let lastHeading = 0;
      for (const [, level] of html.matchAll(/<h([1-6])\b/g)) {
        assert.ok(!lastHeading || Number(level) <= lastHeading + 1, `Heading order: ${url}`);
        lastHeading = Number(level);
      }
      assert.doesNotMatch(html.split('<footer>')[1], /<h4>/);
      assert.match(html, /googletagmanager.com\/gtag\/js\?id=G-H0XF8SXJ4B/);
      const consentDefault = html.indexOf("gtag('consent', 'default'");
      const analyticsConfig = html.indexOf("gtag('config', 'G-H0XF8SXJ4B'");
      const tagLoad = html.indexOf('googletagmanager.com/gtag/js?id=G-H0XF8SXJ4B');
      assert.ok(consentDefault > -1 && consentDefault < analyticsConfig && analyticsConfig < tagLoad, `Consent order: ${url}`);
      assert.match(html, /data-consent="denied"/);
      assert.match(html, /data-consent="granted"/);
      assert.match(html, /data-open-consent/);
      for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
        assert.match(tag, /width="[1-9]\d*"/);
        assert.match(tag, /height="[1-9]\d*"/);
        for (const candidate of (tag.match(/srcset="([^"]+)"/)?.[1] || '').split(',').filter(Boolean)) {
          const asset = candidate.trim().split(' ')[0];
          assert.ok(existsSync(join(root, 'dist', asset)), `${url}: ${asset}`);
        }
      }
    }
    const apfDocument = readFileSync(join(repository, 'src/documentos/laudo-oleo-apf.pdf'));
    assert.deepEqual(readFileSync(join(root, 'dist/documentos/laudo-oleo-apf.pdf')), apfDocument);
    const consumptionPath = 'blog/como-calcular-consumo-de-oleo-combustivel-em-caldeiras/index.html';
    const article = JSON.parse(read(consumptionPath).match(/<script type="application\/ld\+json">([^]*?)<\/script>/)[1]);
    assert.equal(article.datePublished, '2026-07-16');
    assert.equal(article.dateModified, '2026-10-09');
    assert.match(read(consumptionPath), /Atualizado em 9 de outubro de 2026/);
    const curatedLinks = read('produtos/oleo-bpf/index.html').match(/<aside class="leituras"[^]*?<\/aside>/)[0];
    assert.equal([...curatedLinks.matchAll(/href=/g)].length, 3);
    assert.match(read('blog/index.html'), /Guias para escolher e comprar combustível/);
    const assertBlogGroups = () => {
      const blog = read('blog/index.html');
      for (const category of CATEGORIAS_BLOG) {
        assert.ok(blog.includes(`href="#${category.slug}"`));
        assert.ok(blog.includes(`id="${category.slug}"`));
      }
      const articleCards = [...blog.matchAll(/<h3><a href="(\/blog\/[^" ]+)"/g)].map(m => m[1]);
      assert.equal(new Set(articleCards).size, articleCards.length);
      for (const url of cleanURLs.filter(url => url.includes('/blog/') && !url.endsWith('/blog/'))) {
        assert.ok(articleCards.includes(new URL(url).pathname), url);
      }
    };
    assertBlogGroups();
    assert.equal(cleanURLs.length, new Set(cleanURLs).size);
    const legacyDir = join(root, 'dist', 'blog', 'legacy-test');
    mkdirSync(legacyDir, { recursive: true });
    writeFileSync(join(legacyDir, 'index.html'), '<html><head><title>Legado | Blog Nuxem</title></head><body><h1>Legado</h1></body></html>');
    build();
    const incrementalURLs = sitemapURLs();
    assert.deepEqual(readFileSync(join(root, 'dist/documentos/laudo-oleo-apf.pdf')), apfDocument);
    assertBlogGroups();
    assert.match(read('blog/index.html'), /href="\/blog\/legacy-test\/"/);
    assert.match(read('blog/index.html'), /Guias para escolher e comprar combustível/);
    for (const url of cleanURLs.filter(url => url.includes('/blog/') && !url.endsWith('/blog/'))) {
      const html = read(new URL(url).pathname.slice(1) + 'index.html');
      const bodyLinks = [...html.split('<h2>Leia também</h2>')[0].matchAll(/href="(\/blog\/[^" ]+)"/g)].map(m => m[1]);
      const relatedLinks = [...html.split('<h2>Leia também</h2>')[1].split('</ul>')[0].matchAll(/href="(\/blog\/[^" ]+)"/g)].map(m => m[1]);
      assert.equal(new Set(relatedLinks).size, relatedLinks.length);
      assert.ok(relatedLinks.every(link => !bodyLinks.includes(link)), url);
    }
    assert.equal(incrementalURLs.length, cleanURLs.length + 1);
    assert.equal(incrementalURLs.length, new Set(incrementalURLs).size);
    assert.ok(incrementalURLs.includes('https://nuxemoil.com.br/blog/legacy-test/'));
    assert.doesNotMatch(read('sitemap.xml'), /<lastmod>/);
    for (const url of incrementalURLs) {
      assert.ok(existsSync(join(root, 'dist', new URL(url).pathname, 'index.html')), url);
    }
    for (const {slug} of PRODUTOS) {
      const html = read(`produtos/${slug}/index.html`);
      const product = JSON.parse(html.match(/<script type="application\/ld\+json">([^]*?)<\/script>/)[1]);
      assert.equal(product['@type'], 'WebPage');
      assert.equal(product.offers, undefined);
      assert.equal(product.review, undefined);
      assert.equal(product.aggregateRating, undefined);
      assert.equal(product.url, `https://nuxemoil.com.br/produtos/${slug}/`);
      assert.equal(product.isPartOf['@type'], 'WebSite');
      if(slug !== 'oleos-alternativos') assert.match(html, /<title>[^<]*SP, MG e PR/);
      assert.match(html, /ficha técnica/);
      assert.match(html, /ficha de dados de segurança/);
      assert.match(html, /Como solicitar sua cotação/);
      assert.match(html, /<h2>Perguntas sobre/);
      const curated = html.match(/<aside class="leituras"[^]*?<\/aside>/)[0];
      for(const [articleSlug] of LEITURAS[`produtos/${slug}`]) assert.ok(curated.includes(`/blog/${articleSlug}/`));
      assert.equal(product.additionalProperty, undefined, 'Consultation guidance is not a certified product property');
    }
    assert.match(read('produtos/oleo-bpf/index.html'), /PCS ou PCI em kcal\/kg ou MJ\/kg/);
    assert.doesNotMatch(read('produtos/oleo-apf/index.html'), /baixa viscosidade, que dispensa/);
    assert.doesNotMatch(read('produtos/oleo-a1/index.html'), /2,5%/);
    assert.doesNotMatch(read('produtos/oleo-b1/index.html'), /atende os limites da Resolução CONAMA 491/);
    assert.doesNotMatch(read('produtos/oleo-de-xisto/index.html'), /dispensando totalmente|dispensa pré-aquecimento/);
    const rules = read('_redirects').trim().split('\n');
    assert.ok(rules.length > 8);
    assert.equal(new Set(rules.map(rule => rule.split(' ')[0])).size, rules.length);
    assert.doesNotMatch(read('_redirects'), /\/post\/\*/);
    assert.ok(rules.includes('/oleo-bpf /produtos/oleo-bpf/ 301'));
    for (const [from, to] of [
      ['como-armazenar-oleo-bpf-com-seguranca', '/blog/manutencao-preventiva-em-sistemas-de-armazenamento-de-oleo-bpf/'],
      ['controle-de-temperatura-oleo-usina-de-asfalto', '/blog/impacto-da-viscosidade-do-oleo-bpf-na-eficiencia-da-queima/'],
      ['oleo-bpf-vida-util-de-equipamentos', '/blog/manutencao-preventiva-em-sistemas-de-armazenamento-de-oleo-bpf/'],
      ['oleo-bpf-a1-conformidade-tecnica-e-aplicacoes', '/produtos/oleo-a1/'],
      ['oleo-combustivel-b1-especificacoes-e-aplicacoes', '/produtos/oleo-b1/'],
    ]) {
      assert.ok(rules.includes(`/blog/${from}/ ${to} 301`));
      assert.ok(rules.includes(`/blog/${from} ${to} 301`));
    }
    assert.ok(rules.includes('/post/como-especificar-%C3%B3leo-para-caldeira /blog/como-especificar-o-oleo-combustivel-certo-para-seu-queimador/ 301'));
    assert.ok(rules.includes('/blog/como-validar-a-viscosidade-do-combustivel/ /blog/impacto-da-viscosidade-do-oleo-bpf-na-eficiencia-da-queima/ 301'));
    assert.doesNotMatch(read('solucoes/caldeiras/index.html'), /href="\/blog\/como-especificar-oleo-para-caldeira\//);
    for (const rule of rules) {
      const [from, to, status] = rule.split(' ');
      assert.notEqual(from, to);
      assert.notEqual(to, '/blog/');
      assert.equal(status, '301');
      assert.ok(existsSync(join(root, 'dist', to, 'index.html')), rule);
    }
    function checkInternalLinks(directory) {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const file = join(directory, entry.name);
        if (entry.isDirectory()) checkInternalLinks(file);
        else if (entry.name.endsWith('.html')) {
          const html = readFileSync(file, 'utf8');
          for (const match of html.matchAll(/href="(\/[^"?#]*)"/g)) {
            assert.ok(existsSync(join(root, 'dist', match[1])), `${file}: ${match[1]}`);
          }
        }
      }
    }
    checkInternalLinks(join(root, 'dist'));
    build();
    assert.deepEqual(sitemapURLs(), incrementalURLs);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
