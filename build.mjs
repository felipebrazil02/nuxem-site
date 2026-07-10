// Montador do site da Nuxem — gera HTML estático em dist/
// Sem dependências externas: rápido, previsível e fácil de manter.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EMPRESA, PRODUTOS, SOLUCOES, HOME, CONTATO } from './src/dados.mjs';

const raiz = dirname(fileURLToPath(import.meta.url));
const dirBlog = join(raiz, 'conteudo', 'blog');
const dist = join(raiz, 'dist');

// preserva blog existente ANTES de limpar dist — sempre
let blogBackup = null;
const blogDir = join(dist, 'blog');
if (existsSync(blogDir)) {
  blogBackup = join(raiz, '.blogbak');
  mkdirSync(blogBackup, { recursive: true });
  cpSync(blogDir, blogBackup, { recursive: true });
}
if (existsSync(dist)) rmSync(dist, { recursive: true });
mkdirSync(dist, { recursive: true });
cpSync(join(raiz, 'src', 'estilo.css'), join(dist, 'estilo.css'));
cpSync(join(raiz, 'src', 'imagens'), join(dist, 'imagens'), { recursive: true });

const ZAP = `https://wa.me/${EMPRESA.whatsappPrincipal}?text=${encodeURIComponent('Olá! Gostaria de uma cotação de óleo combustível.')}`;

// ---------- utilidades ----------
const paginas = []; // para sitemap

function salvar(caminho, html) {
  const dir = join(dist, caminho);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');
  paginas.push(caminho === '.' ? '/' : `/${caminho.replace(/\\/g, '/')}/`);
}

function mdParaHtml(md) {
  let s = md;
  const linhas = s.split('\n');
  const out = [];
  let emLista = false;
  for (const linha of linhas) {
    const l = linha.trim();
    if (l.startsWith('- ')) {
      if (!emLista) { out.push('<ul>'); emLista = true; }
      out.push(`<li>${inline(l.slice(2))}</li>`);
      continue;
    }
    if (emLista) { out.push('</ul>'); emLista = false; }
    if (l.startsWith('#### ')) out.push(`<h4>${inline(l.slice(5))}</h4>`);
    else if (l.startsWith('### ')) out.push(`<h3>${inline(l.slice(4))}</h3>`);
    else if (l.startsWith('## ')) out.push(`<h2>${inline(l.slice(3))}</h2>`);
    else if (l !== '') out.push(`<p>${inline(l)}</p>`);
  }
  if (emLista) out.push('</ul>');
  return out.join('\n');
}

function inline(t) {
  return t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function lerFrontmatter(texto) {
  const m = texto.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  if (m) {
    for (const linha of m[1].split('\n')) {
      const i = linha.indexOf(':');
      if (i > 0) meta[linha.slice(0, i).trim()] = linha.slice(i + 1).trim().replace(/^"|"$/g, '');
    }
  }
  return { meta, corpo: texto.slice(m ? m[0].length : 0) };
}

function dataBr(iso) {
  if (!iso) return '';
  const [a, m, d] = iso.split('-');
  const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  return `${Number(d)} de ${meses[Number(m) - 1]} de ${a}`;
}

// ---------- layout ----------
function layout({ title, description, caminho, conteudo, ogImage, jsonLd, preloadHero }) {
  const url = `${EMPRESA.dominio}${caminho === '.' ? '/' : `/${caminho.replace(/\\/g, '/')}/`}`;
  const nav = [
    ['/', 'Início'],
    ['/produtos/', 'Produtos'],
    ['/solucoes/', 'Soluções'],
    ['/blog/', 'Blog'],
  ];
  const atual = caminho === '.' ? '/' : `/${caminho.replace(/\\/g, '/')}/`;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="${EMPRESA.dominio}${ogImage || '/imagens/hero-usina-asfalto.jpg'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="/imagens/icone-nuxem.png">
${preloadHero ? '<link rel="preload" as="image" href="/imagens/hero-usina-asfalto.jpg">' : ''}
<link rel="stylesheet" href="/estilo.css">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body>
<header>
  <div class="header-inner">
    <a class="logo" href="/"><img src="/imagens/logo-chama.png" alt="Nuxem" height="58"></a>
    <button class="menu-toggle" aria-label="Abrir menu" onclick="document.querySelector('nav').classList.toggle('aberto')">☰</button>
    <nav>
      ${nav.map(([h, t]) => `<a href="${h}"${atual === h ? ' aria-current="page"' : ''}>${t}</a>`).join('\n      ')}
      <a href="/contato/" class="cta">Solicitar cotação</a>
    </nav>
  </div>
</header>
<main>
${conteudo}
</main>
<div class="faixa-cta">
  <div class="container">
    <h2>Precisa de combustível industrial com entrega rápida?</h2>
    <a class="btn" href="${ZAP}">Chamar no WhatsApp agora</a>
  </div>
</div>
<footer>
  <div class="container">
    <div class="grid grid-4">
      <div>
        <h4>Nuxem</h4>
        <p style="font-size:.9rem">Óleo BPF e combustíveis industriais para ${EMPRESA.regiao}. CNPJ: ${EMPRESA.cnpj}</p>
      </div>
      <div>
        <h4>Produtos</h4>
        ${PRODUTOS.map(p => `<a href="/produtos/${p.slug}/">${p.nome}</a>`).join('\n        ')}
      </div>
      <div>
        <h4>Soluções</h4>
        ${SOLUCOES.map(s => `<a href="/solucoes/${s.slug}/">${s.nome}</a>`).join('\n        ')}
      </div>
      <div>
        <h4>Contato</h4>
        <a href="${ZAP}">WhatsApp: (11) 91501-1527</a>
        <a href="tel:+5511974620945">Telefone: ${EMPRESA.telefone}</a>
        <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a>
      </div>
    </div>
    <div class="creditos">© ${new Date().getFullYear()} Nuxem Comércio e Transporte de Óleos LTDA — ${EMPRESA.endereco}</div>
  </div>
</footer>
<a class="zap-flutuante" href="${ZAP}" aria-label="Conversar no WhatsApp">
  <svg viewBox="0 0 32 32"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.5c1.2.5 2.5.7 3.8.7 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22.2c-1.2 0-2.4-.2-3.5-.7l-.7-.3-4.9.9 1-4.7-.3-.7c-.9-1.5-1.4-3.2-1.4-4.9 0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.4-9.8 9.4zm5.4-7.1c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/></svg>
</a>
</body>
</html>`;
}

// ---------- páginas ----------

// HOME
salvar('.', layout({
  title: HOME.title, description: HOME.description, caminho: '.',
  preloadHero: true,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Nuxem',
    description: HOME.description,
    url: `${EMPRESA.dominio}/`,
    logo: `${EMPRESA.dominio}/imagens/icone-nuxem.png`,
    image: `${EMPRESA.dominio}/imagens/hero-usina-asfalto.jpg`,
    telephone: '+55-11-91501-1527',
    email: EMPRESA.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Av Brasília, 2242', addressLocality: 'Salto', addressRegion: 'SP', postalCode: '13327-896', addressCountry: 'BR' },
    areaServed: { '@type': 'State', name: 'São Paulo' },
    priceRange: '$$',
    vatID: EMPRESA.cnpj,
  },
  conteudo: `
<div class="hero hero-img"><div class="container">
  <h1>${HOME.heroTitulo}</h1>
  <p>${HOME.heroTexto}</p>
  <div class="botoes">
    <a class="btn btn-laranja" href="${ZAP}">Solicitar cotação no WhatsApp</a>
    <a class="btn btn-vazado" href="/produtos/">Conhecer os produtos</a>
  </div>
</div></div>
<section><div class="container">
  <h2 class="secao">Soluções por segmento</h2>
  <p class="secao-sub">Cada operação térmica tem uma exigência diferente. Atendemos as três mais críticas da indústria:</p>
  <div class="grid grid-3">
    ${SOLUCOES.map(s => `<div class="card card-foto"><img src="/imagens/${s.imagem}" alt="${s.imagemAlt}" loading="lazy"><h3>${s.nome}</h3><p>${s.resumo}</p><a class="saiba" href="/solucoes/${s.slug}/">Saiba mais →</a></div>`).join('\n    ')}
  </div>
</div></section>
<section class="alt"><div class="container">
  <h2 class="secao">Nossos produtos</h2>
  <p class="secao-sub">Combustíveis industriais com produção sob demanda e padrão constante de qualidade:</p>
  <div class="grid grid-3">
    ${PRODUTOS.map(p => `<div class="card card-foto"><img src="/imagens/${p.imagem}" alt="${p.imagemAlt}" loading="lazy"><h3>${p.nome}</h3><p>${p.resumo}</p><a class="saiba" href="/produtos/${p.slug}/">Ver especificações →</a></div>`).join('\n    ')}
  </div>
</div></section>
<section><div class="container">
  <h2 class="secao">Por que a Nuxem</h2>
  <p class="secao-sub">Uma planta térmica parada custa muito mais do que o combustível. Nosso trabalho é garantir que isso nunca aconteça:</p>
  <div class="grid grid-4">
    ${EMPRESA.diferenciais.map(d => `<div class="card"><h3>${d.titulo}</h3><p>${d.texto}</p></div>`).join('\n    ')}
  </div>
</div></section>
<section class="alt"><div class="container">
  <h2 class="secao">Atendemos todo o estado de São Paulo</h2>
  <p class="secao-sub">Entrega com frota própria na ${EMPRESA.cidades} — e em todas as demais regiões do estado.</p>
</div></section>`,
}));

// PRODUTOS (índice)
salvar('produtos', layout({
  title: 'Produtos | Óleo BPF, APF e Alternativos | Nuxem São Paulo',
  description: 'Conheça os combustíveis industriais da Nuxem: óleo BPF, óleo APF e óleos alternativos com viscosidades variadas. Especificações completas e cotação rápida.',
  caminho: 'produtos',
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>Combustíveis industriais Nuxem</h1>
  <p class="resumo">Produção sob demanda, padrão constante de qualidade e suporte técnico para escolher o produto certo para o seu equipamento.</p>
</div></div>
<section><div class="container">
  <div class="grid grid-3">
    ${PRODUTOS.map(p => `<div class="card card-foto"><img src="/imagens/${p.imagem}" alt="${p.imagemAlt}" loading="lazy"><h3>${p.nome}</h3><p>${p.resumo}</p><a class="saiba" href="/produtos/${p.slug}/">Ver especificações →</a></div>`).join('\n    ')}
  </div>
</div></section>`,
}));

// PRODUTOS (páginas individuais)
for (const p of PRODUTOS) {
  salvar(join('produtos', p.slug), layout({
    title: p.title, description: p.description, caminho: `produtos/${p.slug}`,
    conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>${p.nome}</h1>
  <p class="resumo">${p.resumo}</p>
</div></div>
<div class="container"><div class="conteudo">
  <img class="foto-pagina" src="/imagens/${p.imagem}" alt="${p.imagemAlt}">
  ${p.corpo.map(par => `<p>${par}</p>`).join('\n  ')}
  <h2>Especificações</h2>
  <table class="specs">
    ${p.specs.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('\n    ')}
  </table>
  <p><strong>Aplicações:</strong> ${p.aplicacoes}</p>
  <p><a class="btn btn-laranja" href="${ZAP}">Solicitar cotação de ${p.nome}</a></p>
</div></div>`,
  }));
}

// SOLUÇÕES (índice)
salvar('solucoes', layout({
  title: 'Soluções por Segmento | Caldeiras, Asfalto e Fundições | Nuxem',
  description: 'Fornecimento de combustível industrial sob medida para usinas de asfalto, caldeiras industriais e fundições em todo o estado de São Paulo.',
  caminho: 'solucoes',
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>Soluções por segmento</h1>
  <p class="resumo">Fornecimento pensado para a realidade de cada operação térmica.</p>
</div></div>
<section><div class="container">
  <div class="grid grid-3">
    ${SOLUCOES.map(s => `<div class="card card-foto"><img src="/imagens/${s.imagem}" alt="${s.imagemAlt}" loading="lazy"><h3>${s.nome}</h3><p>${s.resumo}</p><a class="saiba" href="/solucoes/${s.slug}/">Saiba mais →</a></div>`).join('\n    ')}
  </div>
</div></section>`,
}));

// SOLUÇÕES (páginas individuais)
for (const s of SOLUCOES) {
  const rel = PRODUTOS.filter(p => s.produtosRelacionados.includes(p.slug));
  salvar(join('solucoes', s.slug), layout({
    title: s.title, description: s.description, caminho: `solucoes/${s.slug}`,
    conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>${s.title.split('|')[0].trim()}</h1>
  <p class="resumo">${s.resumo}</p>
</div></div>
<div class="container"><div class="conteudo">
  <img class="foto-pagina" src="/imagens/${s.imagem}" alt="${s.imagemAlt}">
  ${s.corpo.map(par => `<p>${par}</p>`).join('\n  ')}
  <h2>Produtos indicados</h2>
  <ul>
    ${rel.map(p => `<li><a href="/produtos/${p.slug}/">${p.nome}</a> — ${p.resumo}</li>`).join('\n    ')}
  </ul>
  <h2>Conteúdo técnico relacionado</h2>
  <ul>
    ${s.artigosRelacionados.map(a => `<li><a href="/blog/${a}/">${a.replace(/-/g, ' ')}</a></li>`).join('\n    ')}
  </ul>
  <p><a class="btn btn-laranja" href="${ZAP}">Solicitar cotação para ${s.nome.toLowerCase()}</a></p>
</div></div>`,
  }));
}

// BLOG
const posts = [];
const arquivosBlog = existsSync(dirBlog) ? readdirSync(dirBlog).filter(f => f.endsWith('.md')) : [];
for (const f of arquivosBlog) {
  const { meta, corpo } = lerFrontmatter(readFileSync(join(dirBlog, f), 'utf8'));
  // remove o cabeçalho repetido do Wix (título + autor + data + tempo de leitura)
  let corpoLimpo = corpo
    .replace(/^[\s\S]*?min de leitura\s*\n/, '')
    .trim();
  posts.push({
    slug: f.replace(/\.md$/, ''),
    slugOriginal: meta.slugOriginal || '',
    title: meta.title, description: meta.description, date: meta.date,
    html: mdParaHtml(corpoLimpo),
  });
}
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

const titulosPorSlug = Object.fromEntries(posts.map(p => [p.slug, p.title]));

salvar('blog', layout({
  title: 'Blog Nuxem | Conteúdo Técnico sobre Óleo Combustível Industrial',
  description: 'Artigos técnicos sobre óleo BPF, caldeiras, usinas de asfalto, fundições e logística de combustível industrial. Conteúdo da equipe Nuxem.',
  caminho: 'blog',
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>Blog Nuxem</h1>
  <p class="resumo">Conteúdo técnico sobre combustível industrial, para você decidir com segurança.</p>
</div></div>
<section><div class="container lista-posts">
  ${posts.map(p => { const c = existsSync(join(raiz, 'src', 'imagens', 'blog', `${p.slug}.jpg`)); return `<div class="card${c ? ' card-post' : ''}">${c ? `<img src="/imagens/blog/${p.slug}.jpg" alt="" loading="lazy">` : ''}<div><h3><a href="/blog/${p.slug}/">${p.title}</a></h3><p class="post-meta">${dataBr(p.date)}</p><p>${p.description}</p></div></div>`; }).join('\n  ')}
</div></section>`,
}));

function relacionados(post, todos, n = 3) {
  const palavras = t => new Set(t.toLowerCase().split(/[^a-zà-ú0-9]+/).filter(w => w.length > 3));
  const base = palavras(post.title);
  return todos
    .filter(o => o.slug !== post.slug)
    .map(o => ({ o, pontos: [...palavras(o.title)].filter(w => base.has(w)).length }))
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, n)
    .map(r => r.o);
}

for (const p of posts) {
  const capa = existsSync(join(raiz, 'src', 'imagens', 'blog', `${p.slug}.jpg`)) ? `/imagens/blog/${p.slug}.jpg` : null;
  const rel = relacionados(p, posts);
  salvar(join('blog', p.slug), layout({
    title: `${p.title} | Blog Nuxem`, description: p.description, caminho: `blog/${p.slug}`,
    ogImage: capa,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      inLanguage: 'pt-BR',
      ...(capa ? { image: `${EMPRESA.dominio}${capa}` } : {}),
      author: { '@type': 'Organization', name: 'Nuxem' },
      publisher: { '@type': 'Organization', name: 'Nuxem', logo: { '@type': 'ImageObject', url: `${EMPRESA.dominio}/imagens/icone-nuxem.png` } },
      mainEntityOfPage: `${EMPRESA.dominio}/blog/${p.slug}/`,
    },
    conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>${p.title}</h1>
</div></div>
<div class="container"><div class="conteudo">
  <p class="post-meta">Publicado em ${dataBr(p.date)} — Equipe Nuxem</p>
  ${capa ? `<img class="foto-pagina" src="${capa}" alt="${p.title}">` : ''}
  ${p.html}
  <h2>Leia também</h2>
  <ul>
    ${rel.map(r => `<li><a href="/blog/${r.slug}/">${r.title}</a></li>`).join('\n    ')}
  </ul>
  <p style="margin-top:32px"><a class="btn btn-laranja" href="${ZAP}">Falar com a Nuxem no WhatsApp</a></p>
</div></div>`,
  }));
}

// corrige links de artigos relacionados nas soluções (títulos legíveis)
for (const s of SOLUCOES) {
  const caminho = join(dist, 'solucoes', s.slug, 'index.html');
  let html = readFileSync(caminho, 'utf8');
  for (const a of s.artigosRelacionados) {
    if (titulosPorSlug[a]) html = html.replace(`>${a.replace(/-/g, ' ')}<`, `>${titulosPorSlug[a]}<`);
  }
  writeFileSync(caminho, html, 'utf8');
}

// CONTATO
salvar('contato', layout({
  title: CONTATO.title, description: CONTATO.description, caminho: 'contato',
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>Fale com a Nuxem</h1>
  <p class="resumo">Atendimento 24 horas. Resposta rápida pelo WhatsApp.</p>
</div></div>
<div class="container"><div class="conteudo">
  <form onsubmit="enviarZap(event)">
    <div><label>Nome*<input required name="nome"></label></div>
    <div><label>Empresa*<input required name="empresa"></label></div>
    <div><label>Telefone/WhatsApp*<input required name="fone"></label></div>
    <div><label>Segmento*<select name="segmento"><option>Usina de asfalto</option><option>Caldeira</option><option>Fundição</option><option>Forno industrial</option><option>Outro</option></select></label></div>
    <div><label>Tipo de demanda*<select name="demanda"><option>Cotação pontual</option><option>Fornecimento recorrente</option><option>Solução sob demanda</option></select></label></div>
    <div><label>Mensagem<textarea name="msg"></textarea></label></div>
    <button class="btn btn-laranja" type="submit">Enviar pelo WhatsApp</button>
  </form>
  <script>
  function enviarZap(e) {
    e.preventDefault();
    const f = e.target;
    const texto = 'Olá! Meu nome é ' + f.nome.value + ', da empresa ' + f.empresa.value +
      '. Segmento: ' + f.segmento.value + '. Demanda: ' + f.demanda.value +
      '. Contato: ' + f.fone.value + (f.msg.value ? '. ' + f.msg.value : '');
    window.open('https://wa.me/${EMPRESA.whatsappPrincipal}?text=' + encodeURIComponent(texto), '_blank');
  }
  </script>
  <div class="contato-direto">
    <h2>Contato direto</h2>
    <p><strong>WhatsApp:</strong> <a href="${ZAP}">(11) 91501-1527</a></p>
    <p><strong>Telefone:</strong> <a href="tel:+5511974620945">${EMPRESA.telefone}</a></p>
    <p><strong>E-mail:</strong> <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></p>
    <p><strong>Endereço:</strong> ${EMPRESA.endereco}</p>
    <p><strong>CNPJ:</strong> ${EMPRESA.cnpj}</p>
</div></div>`,
}));

// ---------- redirecionamentos (links antigos do Wix → páginas novas) ----------
const redirects = posts
  .filter(p => p.slugOriginal)
  .map(p => `/post/${encodeURI(p.slugOriginal)} /blog/${p.slug}/ 301`)
  .join('\n');
writeFileSync(join(dist, '_redirects'), redirects + '\n/post/* /blog/ 301\n', 'utf8');

// ---------- sitemap e robots ----------
const datasPorPagina = Object.fromEntries(posts.map(p => [`/blog/${p.slug}/`, p.date]));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map(p => `  <url><loc>${EMPRESA.dominio}${p}</loc>${datasPorPagina[p] ? `<lastmod>${datasPorPagina[p]}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${EMPRESA.dominio}/sitemap.xml\n`, 'utf8');

console.log(`Site gerado: ${paginas.length} páginas em dist/`);

// restaura blog existente se não foi regenerado
// mescla blog backup com o recém-gerado: só entra o que não foi regenerado
if (blogBackup && existsSync(blogBackup)) {
  for (const entry of readdirSync(blogBackup)) {
    const src = join(blogBackup, entry);
    const dst = join(blogDir, entry);
    if (!existsSync(dst)) cpSync(src, dst, { recursive: true });
  }
  rmSync(blogBackup, { recursive: true });
  // re-escaneia dist/blog/ para incluir posts restaurados na listagem
  const todosSlugs = readdirSync(blogDir).filter(e => statSync(join(blogDir, e)).isDirectory());
  for (const slug of todosSlugs) {
    const idx = join(blogDir, slug, 'index.html');
    if (existsSync(idx) && !posts.find(p => p.slug === slug)) {
      const html = readFileSync(idx, 'utf8');
      const tm = html.match(/<h1>([^<]+)<\/h1>/);
      const dm = html.match(/Publicado em (\d+ de [^<]+)/);
      const mm = html.match(/<meta name="description" content="([^"]+)"/);
      posts.push({
        slug,
        slugOriginal: '',
        title: tm ? tm[1] : slug,
        description: mm ? mm[1] : '',
        date: dm ? dm[1] : '',
      });
    }
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  // regera a listagem do blog com todos os posts
  const blogHtml = `<div class="pagina-topo"><div class="container">
  <h1>Blog Nuxem</h1>
  <p class="resumo">Conteúdo técnico sobre combustível industrial, para você decidir com segurança.</p>
</div></div>
<section><div class="container lista-posts">
  ${posts.map(p => `<div class="card"><h3><a href="/blog/${p.slug}/">${p.title}</a></h3><p class="post-meta">${typeof p.date === 'string' && p.date.includes('de') ? p.date : ''}</p><p>${p.description}</p></div>`).join('\n  ')}
</div></section>`;
  writeFileSync(join(blogDir, 'index.html'), layout({ title: 'Blog Nuxem | Conteúdo Técnico sobre Óleo Combustível Industrial', description: 'Artigos técnicos sobre óleo BPF, caldeiras, usinas de asfalto, fundições e logística de combustível industrial.', caminho: 'blog', conteudo: blogHtml }), 'utf8');
  // atualiza sitemap com blog posts
  const datasPorPagina = Object.fromEntries(posts.map(p => [`/blog/${p.slug}/`, new Date().toISOString().slice(0, 10)]));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map(p => `  <url><loc>${EMPRESA.dominio}${p}</loc>${datasPorPagina[p] ? `<lastmod>${datasPorPagina[p]}</lastmod>` : ''}</url>`).join('\n')}
${posts.map(p => `  <url><loc>${EMPRESA.dominio}/blog/${p.slug}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join('\n')}
</urlset>`;
  writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`  + ${todosSlugs.length - arquivosBlog.length} posts restaurados do backup`);
}
