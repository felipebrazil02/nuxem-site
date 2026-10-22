// Montador do site da Nuxem — gera HTML estático em dist/
// Sem dependências externas: rápido, previsível e fácil de manter.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EMPRESA, PRODUTOS, SOLUCOES, HOME, CONTATO, PILAR, COBERTURA } from './src/dados.mjs';
import { redirecionamentosLegados, destinoLegado } from './src/redirecionamentos.mjs';
import { LEITURAS, CATEGORIAS_BLOG } from './src/leituras.mjs';
import { otimizarImagens, preloadHero as preloadImagemPrincipal } from './src/imagens.mjs';
import { comercialBpf } from './src/comercial-bpf.mjs';
import { comercialXisto } from './src/comercial-xisto.mjs';
import { GUIA_XISTO, conteudoGuiaXisto } from './src/guia-xisto.mjs';
import { conteudoPrivacidade } from './src/privacidade.mjs';

const raiz = dirname(fileURLToPath(import.meta.url));
const dirBlog = join(raiz, 'conteudo', 'blog');
const dist = join(raiz, 'dist');
// A home, os produtos e os artigos entregam o mesmo CSS no HTML antes do primeiro desenho.
// As demais páginas reutilizam a folha externa; nenhuma regra visual é removida.
const estiloHome = readFileSync(join(raiz, 'src', 'estilo.css'), 'utf8');
const usaEstiloInline = caminho => /^(produtos|blog)\/.+/.test(caminho.replace(/\\/g, '/'));
const analyticsMarkup = EMPRESA.gaId ? `<!-- Google tag (gtag.js) -->
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
try {
  if (localStorage.getItem('nuxem_consent_v1') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (error) {}
gtag('js', new Date());
gtag('config', '${EMPRESA.gaId}');
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${EMPRESA.gaId}"></script>` : '';
const consentBannerMarkup = `<section class="consent-banner" aria-labelledby="consent-title" aria-describedby="consent-description" hidden>
  <div class="consent-copy">
    <h2 id="consent-title">Privacidade e medição</h2>
    <p id="consent-description">Usamos o Google Analytics para entender o uso do site. Com sua autorização, o Google pode armazenar cookies de medição e publicidade. Se você recusar, a medição será limitada e sem cookies.</p>
  </div>
  <div class="consent-actions">
    <button type="button" class="btn consent-reject" data-consent="denied">Recusar cookies</button>
    <button type="button" class="btn consent-accept" data-consent="granted">Aceitar todos</button>
  </div>
</section>`;

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
cpSync(join(raiz, 'src', 'interface.js'), join(dist, 'interface.js'));
cpSync(join(raiz, 'src', 'imagens'), join(dist, 'imagens'), { recursive: true });
if (existsSync(join(raiz, 'src', 'documentos'))) cpSync(join(raiz, 'src', 'documentos'), join(dist, 'documentos'), { recursive: true });

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
  return t
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function lerFrontmatter(texto) {
  texto = texto.replace(/\r\n/g, "\n");
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

function leituras(caminho) {
  const itens = LEITURAS[caminho];
  if (!itens) return '';
  const links = itens.map(([slug, titulo]) => {
    if (!existsSync(join(dirBlog, slug + '.md'))) throw new Error('Artigo de leitura ausente: ' + slug);
    return '<li><a href="/blog/' + slug + '/">' + titulo + '</a></li>';
  }).join('');
  return '<aside class="leituras" aria-label="Guias para escolher e comprar combustível"><h2>Guias para escolher e comprar combustível</h2><ul>' + links + '</ul></aside>';
}

// ---------- layout ----------
function layout({ title, description, caminho, conteudo, ogImage, jsonLd, preloadHero, studioArticleId, studioContentHash, language = 'pt' }) {
  const url = `${EMPRESA.dominio}${caminho === '.' ? '/' : `/${caminho.replace(/\\/g, '/')}/`}`;
  const nav = [
    ['/', 'Início'],
    ['/produtos/', 'Produtos'],
    ['/solucoes/', 'Soluções'],
    ['/cobertura/', 'Regiões'],
    ['/blog/', 'Blog'],
  ];
  const atual = caminho === '.' ? '/' : `/${caminho.replace(/\\/g, '/')}/`;
  const tipoPagina = caminho === '.' ? 'site-home' : caminho.startsWith('produtos/') ? 'site-product' : 'site-inner';
  const rotulo = caminho.startsWith('produtos') ? 'COMBUSTÍVEIS INDUSTRIAIS' : caminho.startsWith('blog') ? 'CONHECIMENTO NUXEM' : caminho.startsWith('solucoes') ? 'APLICAÇÕES INDUSTRIAIS' : caminho === 'cobertura' ? 'LOGÍSTICA E FORNECIMENTO' : caminho === 'contato' ? 'VAMOS CONVERSAR' : caminho === 'politicadeprivacidade' ? 'PRIVACIDADE' : 'GUIA TÉCNICO';
  conteudo = conteudo.replace('<div class="pagina-topo"><div class="container">', '<div class="pagina-topo"><div class="container"><div class="breadcrumb"><a href="/">Início</a><span>/</span>' + rotulo + '</div>');
  return otimizarImagens(`<!DOCTYPE html>
<html lang="${({pt:'pt-BR',en:'en',es:'es'})[language] || 'pt-BR'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
${studioArticleId && /^[0-9a-f-]{36}$/.test(studioArticleId) ? `<meta name="studio-seo-article" content="${studioArticleId}">` : ''}
${studioContentHash && /^[0-9a-f]{64}$/.test(studioContentHash) ? `<meta name="studio-seo-content" content="${studioContentHash}">` : ''}
<link rel="canonical" href="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="${EMPRESA.dominio}${ogImage || '/imagens/hero-usina-asfalto.webp'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="/imagens/icone-nuxem.png">
${preloadHero ? preloadImagemPrincipal() : ''}
${caminho === '.' ? `<style data-home-css>${estiloHome}</style>` : usaEstiloInline(caminho) ? `<style data-product-css>${estiloHome}</style>` : '<link rel="stylesheet" href="/estilo.css">'}
${analyticsMarkup}
<script src="/interface.js" defer></script>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body class="${tipoPagina}">
<a class="skip-link" href="#principal">Ir ao conteúdo</a>
<header>
  <div class="header-inner">
    <a class="logo" href="/"><img src="/imagens/logo-chama.png" alt="Nuxem" height="58"></a>
    <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-principal">☰</button>
    <nav id="menu-principal" aria-label="Menu principal">
      ${nav.map(([h, t]) => `<a href="${h}"${atual === h ? ' aria-current="page"' : ''}>${t}</a>`).join('\n      ')}
      <a href="/contato/" class="cta">Solicitar cotação</a>
    </nav>
  </div>
</header>
<main id="principal">
${conteudo}
</main>
<div class="faixa-cta">
  <div class="container">
    <h2>Planeje o abastecimento de combustível da sua indústria</h2>
    <a class="btn" href="${ZAP}">Consultar fornecimento pelo WhatsApp</a>
  </div>
</div>
<footer>
  <div class="container">
    <div class="grid grid-4">
      <div>
        <h2>Nuxem</h2>
        <p style="font-size:.9rem">Óleo BPF e combustíveis industriais para ${EMPRESA.regiao}. CNPJ: ${EMPRESA.cnpj}</p>
      </div>
      <div>
        <h2>Produtos</h2>
        ${PRODUTOS.map(p => `<a href="/produtos/${p.slug}/">${p.nome}</a>`).join('\n        ')}
      </div>
      <div>
        <h2>Soluções</h2>
        ${SOLUCOES.map(s => `<a href="/solucoes/${s.slug}/">${s.nome}</a>`).join('\n        ')}
      </div>
      <div>
        <h2>Contato</h2>
        <a href="${ZAP}">WhatsApp: (11) 91501-1527</a>
        <a href="${EMPRESA.telefoneLink}">Telefone: ${EMPRESA.telefone}</a>
        <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a>
        <a href="/politicadeprivacidade/">Política de privacidade</a>
        <button type="button" class="privacy-settings" data-open-consent>Preferências de privacidade</button>
      </div>
    </div>
    <div class="creditos">© ${new Date().getFullYear()} Nuxem Comércio e Transporte de Óleos LTDA — ${EMPRESA.endereco}</div>
  </div>
</footer>
${consentBannerMarkup}
<a class="zap-flutuante" href="${ZAP}" aria-label="Conversar no WhatsApp">
  <svg viewBox="0 0 32 32"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.5c1.2.5 2.5.7 3.8.7 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22.2c-1.2 0-2.4-.2-3.5-.7l-.7-.3-4.9.9 1-4.7-.3-.7c-.9-1.5-1.4-3.2-1.4-4.9 0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.4-9.8 9.4zm5.4-7.1c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/></svg>
</a>
</body>
</html>`);
}

// ---------- páginas ----------

// Mantém o endereço da política existente no antigo site Wix.
salvar('politicadeprivacidade', layout({
  title: 'Política de Privacidade e Cookies | Nuxem',
  description: 'Entenda os contatos iniciados no site da Nuxem, o uso do Google Analytics e como aceitar, recusar ou rever suas preferências de cookies.',
  caminho: 'politicadeprivacidade',
  conteudo: conteudoPrivacidade(EMPRESA),
}));

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
    image: `${EMPRESA.dominio}/imagens/hero-usina-asfalto.webp`,
    telephone: '+55-11-91501-1527',
    email: EMPRESA.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Av Brasília, 2242', addressLocality: 'Salto', addressRegion: 'SP', postalCode: '13327-896', addressCountry: 'BR' },
    areaServed: [
      { '@type': 'State', name: 'São Paulo' },
      { '@type': 'State', name: 'Minas Gerais' },
      { '@type': 'State', name: 'Paraná' },
    ],
    priceRange: '$$',
    vatID: EMPRESA.cnpj,
  },
  conteudo: `
<section class="site-hero"><div class="container hero-layout"><div class="hero-copy">
  <div class="section-kicker">ENERGIA PARA A INDÚSTRIA</div>
  <h1>${HOME.heroTitulo.replace('não parar', '<em>não parar</em>')}</h1>
  <p>${HOME.heroTexto}</p>
  <div class="botoes">
    <a class="btn btn-laranja" href="${ZAP}">Solicitar cotação no WhatsApp</a>
    <a class="btn btn-vazado" href="/produtos/">Conhecer os produtos</a>
  </div>
</div><div class="hero-visual"><img src="/imagens/hero-usina-asfalto.webp" alt="Usina de asfalto — imagem ilustrativa de aplicação industrial" fetchpriority="high"><div class="visual-label"><span>CONTINUIDADE OPERACIONAL</span><strong>O combustível certo.<br>No ritmo da sua indústria.</strong></div><div class="photo-caption">Aplicação industrial · imagem ilustrativa</div></div></div></section>
<div class="trust-band"><div class="container"><div><b>24h</b><span>Atendimento e suporte</span></div><div><b>Frota própria</b><span>Logística de fornecimento</span></div><div><b>SP · MG · PR</b><span>Regiões atendidas</span></div><a href="/cobertura/">Conheça nossa cobertura ↗</a></div></div>
<section><div class="container">
  <div class="section-kicker">APLICAÇÕES INDUSTRIAIS</div><h2 class="secao">Soluções por segmento</h2>
  <p class="secao-sub">Cada operação térmica tem uma exigência diferente. Atendemos as três mais críticas da indústria:</p>
  <div class="grid grid-3">
    ${SOLUCOES.map(s => `<div class="card card-foto"><img src="/imagens/${s.imagem}" alt="${s.imagemAlt}" loading="lazy"><h3>${s.nome}</h3><p>${s.resumo}</p><a class="saiba" href="/solucoes/${s.slug}/">Saiba mais →</a></div>`).join('\n    ')}
  </div>
</div></section>
<section class="alt"><div class="container">
  <div class="section-kicker">PORTFÓLIO NUXEM</div><h2 class="secao">Nossos produtos</h2>
  <p class="secao-sub">Combustíveis industriais com produção sob demanda e padrão constante de qualidade:</p>
  <div class="grid grid-3">
    ${PRODUTOS.map(p => `<div class="card card-foto"><img src="/imagens/${p.imagem}" alt="${p.imagemAlt}" loading="lazy" sizes="64px"><h3>${p.nome}</h3><p>${p.resumo}</p><a class="saiba" href="/produtos/${p.slug}/">Ver especificações →</a></div>`).join('\n    ')}
  </div>
</div></section>
<section><div class="container">
  <div class="section-kicker">PARCERIA QUE MOVE</div><h2 class="secao">Por que a Nuxem</h2>
  <p class="secao-sub">Planejamos o abastecimento conforme o consumo e a programação da sua indústria. Consulte a disponibilidade, a especificação e as condições de entrega para sua operação.</p>
  <div class="grid grid-4">
    ${EMPRESA.diferenciais.map(d => `<div class="card"><h3>${d.titulo}</h3><p>${d.texto}</p></div>`).join('\n    ')}
  </div>
</div></section>
<section class="alt"><div class="container">
  <h2 class="secao">Atendemos São Paulo, Minas Gerais e Paraná</h2>
  <p class="secao-sub">Entrega com frota própria em ${EMPRESA.cidades} — e em todas as demais regiões dos três estados.</p>
  <p style="margin-top:8px"><a class="saiba" href="/cobertura/">Ver todas as regiões atendidas →</a></p>
</div></section>
<section class="site-editorial"><div class="container"><div class="section-kicker">CONHECIMENTO QUE AJUDA A DECIDIR</div><h2 class="secao">Da especificação à compra.</h2><p class="secao-sub">Conteúdo técnico para quem precisa escolher bem e manter a operação em movimento.</p><div class="grid grid-3"><a class="editorial-card" href="/guia-oleo-bpf/"><span>GUIA TÉCNICO</span><h3>Entenda o óleo BPF.</h3><p>Classificações, aplicações e critérios para a sua operação.</p><b>Explorar o guia ↗</b></a><a class="editorial-card" href="/guia-oleo-de-xisto/"><span>GUIA TÉCNICO</span><h3>Conheça o óleo de xisto.</h3><p>Origem, aplicações e critérios para avaliar o OTE na indústria.</p><b>Explorar o guia ↗</b></a><a class="editorial-card" href="/blog/"><span>BLOG NUXEM</span><h3>Respostas para a indústria.</h3><p>Artigos sobre compra, aplicações, operação e logística.</p><b>Acessar todos os artigos ↗</b></a></div></div></section>`,
}));

// PRODUTOS (índice) — com schema ItemList para rich snippet
salvar('produtos', layout({
  title: 'Óleo BPF, Xisto, BTE e Combustíveis Industriais | Nuxem',
  description: 'Compare óleo BPF, xisto OTE, APF, A1, B1, BTE e alternativas. Consulte especificação e fornecimento em SP, MG e PR. Solicite cotação à Nuxem.',
  caminho: 'produtos',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Combustíveis industriais Nuxem',
    itemListElement: PRODUTOS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${EMPRESA.dominio}/produtos/${p.slug}/`,
      name: p.nome,
    })),
  },
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>Combustíveis industriais Nuxem</h1>
  <p class="resumo">Óleo BPF, xisto OTE, APF, A1, B1, BTE e alternativas para processos térmicos. Atendimento em São Paulo, Minas Gerais e Paraná.</p>
</div></div>
<section><div class="container">
  <div class="grid grid-3">
    ${PRODUTOS.map(p => `<div class="card card-foto card-produto"><img src="/imagens/${p.imagem}" alt="${p.imagemAlt}" loading="lazy"><h2>${p.nome}</h2><p>${p.resumo}</p><a class="saiba" href="/produtos/${p.slug}/">Conhecer ${p.nome} →</a></div>`).join('\n    ')}
  </div>
</div></section>
<section class="alt"><div class="container"><div class="conteudo">
  <h2>Como comparar os combustíveis</h2>
  <p>A escolha começa pelos limites do equipamento e pelos requisitos da instalação. Os nomes comerciais não substituem a ficha técnica do produto ofertado.</p>
  <table class="specs"><thead><tr><th scope="col">Produto</th><th scope="col">O que conferir na proposta</th></tr></thead><tbody>
    ${PRODUTOS.map(p => `<tr><td><a href="/produtos/${p.slug}/">${p.nome}</a></td><td>${p.criterio}</td></tr>`).join('\n    ')}
  </tbody></table>
  <p>Compare valores na mesma unidade, distinguindo litros e massa, PCS e PCI. Inclua frete, rendimento, aquecimento e custos de adaptação. Veja a <a href="/blog/comparacao-tecnica-oleo-de-xisto-bte-bpf-e-oleos-alternativos/">comparação técnica entre combustíveis</a> e o <a href="/blog/como-especificar-o-oleo-combustivel-certo-para-seu-queimador/">guia de especificação para o queimador</a>.</p>
  <h2>Dados para solicitar uma cotação</h2>
  <p>Informe cidade, volume, consumo, combustível atual, equipamento e restrições da operação. Solicite ficha técnica, ficha de dados de segurança, condições de entrega e identificação do produto. Consulte o <a href="/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/">roteiro de cotação</a> e as <a href="/cobertura/">regiões atendidas</a>.</p>
  <p><a class="btn btn-laranja" href="${ZAP}">Solicitar cotação de combustível</a></p>
</div></div></section>`,
}));

// Catálogo sob cotação: WebPage, sem oferta ou avaliações públicas elegíveis para Product snippets.
for (const p of PRODUTOS) {
  const comercial = p.slug === 'oleo-bpf' ? comercialBpf(EMPRESA)
    : p.slug === 'oleo-de-xisto' ? comercialXisto(EMPRESA) : null;
  salvar(join('produtos', p.slug), layout({
    title: p.title, description: p.description, caminho: `produtos/${p.slug}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: p.nome,
      description: p.description,
      inLanguage: 'pt-BR',
      isPartOf: { '@type': 'WebSite', name: 'Nuxem', url: `${EMPRESA.dominio}/` },
      // A página continua indexável; não criar preços ou avaliações para obter rich results.
      url: `${EMPRESA.dominio}/produtos/${p.slug}/`,
    },
    conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>${p.h1 || p.nome}</h1>
  <p class="resumo">${comercial?.resumo || p.resumo}</p>
  ${comercial?.abertura || ''}
</div></div>
<div class="container product-layout"><div class="conteudo">
  ${comercial?.fornecimento || ''}
  ${p.corpo.map(par => `<p>${par}</p>`).join('\n  ')}
  <h2 id="dados-tecnicos">${p.tituloSpecs || 'Dados para especificação'}</h2>
  <p>${p.notaSpecs}</p>
  <table class="specs">
    ${p.specs.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('\n    ')}
  </table>
  ${p.observacaoSpecs ? `<p class="nota-tecnica">${p.observacaoSpecs}</p>` : ''}
  ${p.documentos?.length ? `<aside class="documentos-produto" aria-label="Fontes e documentos técnicos"><h3>Fontes e documentos técnicos</h3><ul>${p.documentos.map(d => `<li><a href="${d.url}">${d.titulo}</a></li>`).join('')}</ul></aside>` : ''}
  <p><strong>Aplicações:</strong> ${p.aplicacoes}</p>
${comercial?.cotacao || ''}
${p.orientacao ? `  <h2>${comercial ? 'Documentação para confirmar a compra' : 'Como solicitar sua cotação'}</h2><p>${p.orientacao}</p>` : ''}
  <h2>Perguntas sobre ${p.nome}</h2>
  ${comercial?.perguntas || ''}
  ${p.faq.map(({p: pergunta, r}) => `<h3>${pergunta}</h3><p>${r}</p>`).join('\n  ')}
  ${p.slug === 'oleo-bpf' ? '<p>Para outras dúvidas sobre armazenamento, aquecimento e especificação, consulte as <a href="/guia-oleo-bpf/faq/">perguntas frequentes sobre óleo BPF</a>.</p>' : ''}
${leituras(`produtos/${p.slug}`)}
  <p><a class="btn btn-laranja" href="${comercial?.whatsapp || ZAP}">Solicitar cotação de ${p.nome}</a></p>
</div><aside class="quote-panel"><div class="section-kicker">SUA PRÓXIMA ENTREGA</div><h2>${comercial?.painelTitulo || 'Vamos encontrar a melhor opção?'}</h2><p>${comercial?.painelTexto || 'Informe o produto, o volume e sua cidade. Nossa equipe orienta sua cotação.'}</p><a class="btn btn-laranja" href="/contato/">${comercial?.painelBotao || 'Solicitar uma cotação ↗'}</a><a class="panel-link" href="#dados-tecnicos">Consultar dados técnicos ↓</a><hr><div class="panel-detail"><b>Atendimento 24h</b><span>SP, MG e PR · Frota própria</span></div><a class="panel-link" href="/produtos/">← Todos os produtos</a></aside></div>`,
  }));
}

// PILAR — página pilar "Guia Completo do Óleo BPF"
salvar(PILAR.slug, layout({
  title: PILAR.title, description: PILAR.description, caminho: PILAR.slug,
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>${PILAR.h1}</h1>
  <p class="resumo">${PILAR.resumo}</p>
  <p>Está procurando um fornecedor? Confira pedido mínimo, região atendida e condições para abastecer sua operação.</p>
  <div class="botoes"><a class="btn btn-laranja" href="/produtos/oleo-bpf/">Consultar fornecimento de óleo BPF</a></div>
</div></div>
<div class="container"><div class="conteudo">
  ${PILAR.secoes.map(s => s.ehFaq ? `
    <h2>${s.titulo}</h2>
    ${s.perguntas.map(q => `<h3>${q.p}</h3><p>${q.r}</p>`).join('')}
  ` : `
    <h2>${s.titulo}</h2>
    ${(s.paragrafos || []).map(p => `<p>${p}</p>`).join('\n')}
    ${s.lista ? `<ul>${s.lista.map(i => i.link ? `<li><a href="${i.link}">${i.texto}</a></li>` : `<li>${i.texto}</li>`).join('')}</ul>` : ''}
  `).join('\n')}
  ${leituras(PILAR.slug)}
  <p>Consulte também as <a href="/guia-oleo-bpf/faq/">perguntas frequentes sobre óleo BPF</a>, reunidas em uma página para facilitar a consulta.</p>
  <h2>Da especificação à cotação de óleo BPF</h2>
  <p>Já sabe o consumo da sua operação? A Nuxem fornece BPF a partir de 5.000 litros por entrega, sob demanda e com planejamento mensal. Informe cidade, volume e equipamento para consultar as condições.</p>
  <p><a href="/produtos/oleo-bpf/#cotacao-bpf">Veja como solicitar preço e programação de entrega de BPF</a>.</p>
  <p style="margin-top:32px"><a class="btn btn-laranja" href="${ZAP}">Iniciar cotação de óleo BPF no WhatsApp</a></p>
</div></div>`}));
salvar(PILAR.slug + '/faq', layout({
  title: 'Perguntas Frequentes sobre Óleo BPF | Nuxem',
  description: 'FAQ sobre óleo BPF: diferenças entre tipos, armazenamento, aquecimento, poder calorífico e mais. Tire suas dúvidas técnicas.',
  caminho: PILAR.slug + '/faq',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (PILAR.secoes.find(s => s.ehFaq)?.perguntas || []).map(q => ({
      '@type': 'Question',
      name: q.p,
      acceptedAnswer: { '@type': 'Answer', text: q.r },
    })),
  },
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>Perguntas Frequentes sobre Óleo BPF</h1>
  <p class="resumo">Respostas técnicas para as dúvidas mais comentes sobre óleo combustível industrial.</p>
</div></div>
<div class="container"><div class="conteudo">
  ${PILAR.secoes.filter(s => s.ehFaq)[0]?.perguntas.map(q => `<h2>${q.p}</h2><p>${q.r}</p>`).join('') || ''}
  <p><a class="btn btn-laranja" href="/${PILAR.slug}/">← Voltar ao guia completo</a></p>
</div></div>`}));

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
    ${SOLUCOES.map(s => `<div class="card card-foto"><img src="/imagens/${s.imagem}" alt="${s.imagemAlt}" loading="lazy"><h2>${s.nome}</h2><p>${s.resumo}</p><a class="saiba" href="/solucoes/${s.slug}/">Saiba mais →</a></div>`).join('\n    ')}
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
// Gera título legível a partir do slug p/ posts antigos sem metadados (herança Wix)
function tituloDoSlug(slug) {
  const siglas = new Set(['bpf', 'a1', 'a2', 'b1', 'bte', 'ocbv', 'anp', 'sp', 'api', 'cnp', 'cst']);
  const lig = new Set(['de', 'para', 'em', 'e', 'com', 'na', 'no', 'da', 'do', 'por', 'o', 'a', 'os', 'as', 'um', 'uma', 'ao', 'aos']);
  return slug.split('-').map((w, i) => {
    if (siglas.has(w)) return w.toUpperCase();
    if (lig.has(w)) return w;
    if (w === 'oleo') return 'Óleo';
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}
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
    title: meta.title, description: meta.description, date: meta.date, updated: meta.updated, category: meta.category,
    studioArticleId: meta.studioArticleId, studioContentHash: meta.studioContentHash,
    language: ['pt','en','es'].includes(meta.language) ? meta.language : 'pt',
    html: mdParaHtml(corpoLimpo),
  });
}
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

// Página informativa central de xisto, com diretório dos artigos existentes.
const artigosXisto = posts.filter(p => p.slug.includes('xisto') && p.language === 'pt');
salvar(GUIA_XISTO.slug, layout({
  title: GUIA_XISTO.title, description: GUIA_XISTO.description, caminho: GUIA_XISTO.slug,
  jsonLd: {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: GUIA_XISTO.h1, description: GUIA_XISTO.description,
    datePublished: '2026-10-19', dateModified: '2026-10-19', inLanguage: 'pt-BR',
    author: { '@type': 'Organization', name: EMPRESA.nome },
    publisher: { '@type': 'Organization', name: EMPRESA.nome },
    mainEntityOfPage: `${EMPRESA.dominio}/${GUIA_XISTO.slug}/`,
  },
  conteudo: `<div class="pagina-topo"><div class="container">
    <h1>${GUIA_XISTO.h1}</h1><p class="resumo">${GUIA_XISTO.resumo}</p>
    <p>Para comprar na Nuxem: consumo a partir de 200 mil litros por mês, planejamento mensal e disponibilidade sob consulta.</p>
    <div class="botoes"><a class="btn btn-laranja" href="/produtos/oleo-de-xisto/">Consultar fornecimento de óleo de xisto</a></div>
  </div></div><div class="container"><div class="conteudo">
    <p class="post-meta">Publicado em 19 de outubro de 2026 — Equipe Nuxem</p>
    ${conteudoGuiaXisto()}
    <h2 id="artigos-xisto">Artigos para aprofundar a avaliação do óleo de xisto</h2>
    <p>Escolha o assunto relacionado à sua aplicação ou etapa de compra. Os artigos detalham os critérios apresentados neste guia.</p>
    <ul>${artigosXisto.map(p => `<li><a href="/blog/${p.slug}/">${p.title}</a></li>`).join('')}</ul>
  </div></div>`,
}));

const titulosPorSlug = Object.fromEntries(posts.map(p => [p.slug, p.title]));

function listagemBlog(todos) {
  const grupos = CATEGORIAS_BLOG.map(c => ({ ...c, posts: todos.filter(p => (p.category || 'operacao') === c.slug) })).filter(c => c.posts.length);
  return `<div class="pagina-topo"><div class="container">
  <h1>Blog Nuxem</h1>
  <p class="resumo">Guias sobre óleo BPF, óleo de xisto e combustíveis industriais. Encontre orientações para comprar, operar e planejar o abastecimento.</p>
</div></div>
<section><div class="container lista-posts">
  <div class="blog-search" hidden><label for="buscar-artigos">O que você precisa saber?</label><input id="buscar-artigos" type="search" placeholder="Busque por produto, aplicação ou dúvida…"><p id="busca-status" role="status"></p></div>
  <aside class="leituras" aria-label="Assuntos do blog"><h2>Encontre artigos por assunto</h2><ul>
    ${grupos.map(c => `<li><a href="#${c.slug}">${c.titulo} (${c.posts.length})</a></li>`).join('')}
  </ul></aside>
  ${leituras('blog')}
  <p>Comece pelos guias: <a href="/guia-oleo-bpf/">óleo BPF: significado e aplicações</a> ou <a href="/guia-oleo-de-xisto/">óleo de xisto: o que é e para que serve</a>.</p>
  ${grupos.map(c => `<div class="grupo-blog" id="${c.slug}"><h2>${c.titulo}</h2>${c.posts.map(p => `<div class="card"><h3><a href="/blog/${p.slug}/">${p.title}</a></h3><p class="post-meta">${p.updated ? 'Atualizado em ' + dataBr(p.updated) : p.dataExibicao || dataBr(p.date)}</p><p>${p.description}</p></div>`).join('')}</div>`).join('')}
</div></section>`;
}

salvar('blog', layout({
  title: 'Blog Nuxem | Óleo BPF, Xisto e Combustíveis Industriais',
  description: 'Guias de compra, operação e aplicações de óleo BPF e óleo de xisto. Compare combustíveis e planeje o abastecimento em SP, MG e PR.',
  caminho: 'blog',
  conteudo: listagemBlog(posts),
}));

function relacionados(post, todos, n = 3) {
  const ignorar = new Set(['oleo', 'para', 'como', 'entre', 'industrial', 'industriais']);
  const palavras = t => new Set(t.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').split(/[^a-z0-9]+/).filter(w => w.length >= 3 && !ignorar.has(w)));
  const base = palavras(post.title);
  return todos
    .filter(o => o.slug !== post.slug && o.language === post.language && !post.html.includes(`href="/blog/${o.slug}/"`))
    .map(o => ({ o, pontos: [...palavras(o.title)].filter(w => base.has(w)).length }))
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, n)
    .map(r => r.o);
}

for (const p of posts) {
  const capa = existsSync(join(raiz, 'src', 'imagens', 'blog', `${p.slug}.webp`)) ? `/imagens/blog/${p.slug}.webp` : null;
  const rel = relacionados(p, posts);
  salvar(join('blog', p.slug), layout({
    title: `${p.title} | Blog Nuxem`, description: p.description, caminho: `blog/${p.slug}`,
    studioArticleId: p.studioArticleId, studioContentHash: p.studioContentHash, language: p.language,
    ogImage: capa,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      ...(p.updated ? { dateModified: p.updated } : {}),
      inLanguage: p.language === 'pt' ? 'pt-BR' : p.language,
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
${p.updated ? `<p class="post-meta">Atualizado em ${dataBr(p.updated)}</p>` : ''}
  ${capa ? `<img class="foto-pagina" src="${capa}" alt="${p.title}">` : ''}
  ${p.html}
  ${p.slug.includes('xisto') && p.language === 'pt' ? '<aside class="leituras" aria-label="Guia de óleo de xisto"><h2>Entenda o combustível antes de aprofundar a aplicação</h2><p>Consulte o <a href="/guia-oleo-de-xisto/">guia de óleo de xisto: o que é, para que serve e aplicações</a>. Para comprar, veja as <a href="/produtos/oleo-de-xisto/">condições de fornecimento de óleo de xisto OTE</a>.</p></aside>' : ''}
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

// CONTATO — com schema Organization (NAP completo)
salvar('contato', layout({
  title: CONTATO.title, description: CONTATO.description, caminho: 'contato',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nuxem',
    url: `${EMPRESA.dominio}/`,
    logo: `${EMPRESA.dominio}/imagens/icone-nuxem.png`,
    telephone: '+55-11-91501-1527',
    email: EMPRESA.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Av Brasília, 2242', addressLocality: 'Salto', addressRegion: 'SP', postalCode: '13327-896', addressCountry: 'BR' },
    vatID: EMPRESA.cnpj,
  },
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>Fale com a Nuxem</h1>
  <p class="resumo">Cotação de óleo combustível em SP, MG e PR. Informe produto, cidade e consumo para consultar disponibilidade e programar o fornecimento.</p>
</div></div>
<div class="container"><div class="conteudo">
  <h2>Prepare sua solicitação de cotação</h2>
  <p id="cotacao-ajuda">Os campos com * são obrigatórios. Ao continuar, o WhatsApp abrirá com os dados preenchidos. Revise a mensagem e toque em enviar para falar com a Nuxem. O formulário não envia um pedido automaticamente.</p>
  <form class="quote-form" onsubmit="enviarZap(event)" aria-describedby="cotacao-ajuda">
    <div><label>Produto*<select required name="produto"><option value="">Selecione o produto</option>${PRODUTOS.map(p => `<option data-product-slug="${p.slug}">${p.nome}</option>`).join('')}<option>Preciso de orientação</option></select></label></div>
    <div><label>Cidade de entrega*<input required name="cidade" autocomplete="address-level2" maxlength="100"></label></div>
    <div><label>Estado de entrega*<select required name="uf" autocomplete="address-level1"><option value="">Selecione o estado</option><option>São Paulo</option><option>Minas Gerais</option><option>Paraná</option><option>Outro estado — consultar atendimento</option></select></label></div>
    <div><label>Consumo mensal estimado (opcional)<input name="consumo" placeholder="Ex.: 30.000 L/mês ou ainda não sei" maxlength="100"></label></div>
    <div><label>Volume por entrega (opcional)<input name="volume" placeholder="Ex.: 5.000 L — informe a unidade" maxlength="100"></label></div>
    <div><label>Aplicação (opcional)<select name="segmento"><option value="">Selecione ou informe na mensagem</option><option>Usina de asfalto</option><option>Caldeira</option><option>Fundição</option><option>Forno industrial</option><option>Outro</option></select></label></div>
    <div><label>Nome*<input required name="nome" autocomplete="name" maxlength="100"></label></div>
    <div><label>Empresa*<input required name="empresa" autocomplete="organization" maxlength="150"></label></div>
    <div><label>Telefone/WhatsApp (opcional)<input type="tel" name="fone" autocomplete="tel" maxlength="30"></label></div>
    <div><label>Tipo de demanda (opcional)<select name="demanda"><option value="">Selecione a demanda</option><option>Cotação pontual</option><option>Fornecimento recorrente</option><option>Preciso de orientação</option></select></label></div>
    <div class="quote-wide"><label>Mensagem (opcional)<textarea name="msg" maxlength="2000" placeholder="Informe combustível atual, equipamento e data desejada, se souber."></textarea></label></div>
    <div class="quote-conditions quote-wide"><strong>Condições de fornecimento</strong><p><a href="/produtos/oleo-bpf/">Óleo BPF</a>: a partir de 5.000 litros por entrega, sob demanda e com planejamento mensal. Até 200 km de Salto/SP, entrega no mesmo dia ou em até 1 dia útil, mediante confirmação da programação.</p><p><a href="/produtos/oleo-de-xisto/">Óleo de xisto OTE</a>: consumo a partir de 200 mil litros por mês, planejamento mensal obrigatório e disponibilidade sob consulta. Os prazos do BPF não se aplicam automaticamente ao xisto.</p><p>Outros produtos e localidades: consulte volume, disponibilidade e prazo com a equipe.</p></div>
    <button class="btn btn-laranja" type="submit">Continuar cotação no WhatsApp</button>
    <p class="quote-wide quote-help">Prefere outro canal? <a href="mailto:${EMPRESA.email}">Envie sua solicitação por e-mail</a> ou <a href="${EMPRESA.telefoneLink}">fale por telefone</a>. Nenhuma compra é confirmada nesta etapa.</p>
  </form>
  <script>
  function enviarZap(e) {
    e.preventDefault();
    const f = e.target;
    if (!f.reportValidity()) return;
    const valor = name => f.elements.namedItem(name).value.trim();
    const linhas = ['Olá! Gostaria de solicitar uma cotação à Nuxem.'];
    for (const [campo, rotulo] of [['produto','Produto'],['cidade','Cidade'],['uf','Estado'],['consumo','Consumo mensal'],['volume','Volume por entrega'],['segmento','Aplicação'],['nome','Nome'],['empresa','Empresa'],['fone','Contato'],['demanda','Demanda'],['msg','Mensagem']]) {
      if (valor(campo)) linhas.push(rotulo + ': ' + valor(campo));
    }
    window.open('https://wa.me/${EMPRESA.whatsappPrincipal}?text=' + encodeURIComponent(linhas.join('\\n')), '_blank', 'noopener,noreferrer');
  }
  </script>
  <div class="contato-direto">
    <h2>Contato direto</h2>
    <p><strong>WhatsApp:</strong> <a href="${ZAP}">(11) 91501-1527</a></p>
    <p><strong>Telefone:</strong> <a href="${EMPRESA.telefoneLink}">${EMPRESA.telefone}</a></p>
    <p><strong>E-mail:</strong> <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></p>
    <p><strong>Endereço:</strong> ${EMPRESA.endereco}</p>
    <p><strong>CNPJ:</strong> ${EMPRESA.cnpj}</p>
</div></div></div>`}));

// COBERTURA — página com os estados atendidos (SEO local MG/PR)
salvar('cobertura', layout({
  title: 'Regiões Atendidas | Óleo BPF em SP, MG e PR | Nuxem',
  description: 'A Nuxem entrega óleo BPF e combustíveis industriais com frota própria em São Paulo, Minas Gerais e Paraná. Belo Horizonte, Curitiba, Uberlândia e mais. Peça cotação.',
  caminho: 'cobertura',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Nuxem',
    url: `${EMPRESA.dominio}/cobertura/`,
    telephone: '+55-11-91501-1527',
    email: EMPRESA.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Av Brasília, 2242', addressLocality: 'Salto', addressRegion: 'SP', postalCode: '13327-896', addressCountry: 'BR' },
    areaServed: COBERTURA.map(e => ({ '@type': 'State', name: e.nome })),
  },
  conteudo: `
<div class="pagina-topo"><div class="container">
  <h1>Regiões atendidas pela Nuxem</h1>
  <p class="resumo">Entrega de óleo BPF e combustíveis industriais com frota própria e atendimento 24h em São Paulo, Minas Gerais e Paraná.</p>
</div></div>
<section><div class="container">
  <div class="grid grid-3">
    ${COBERTURA.map(e => `
    <div class="card">
      <h2>${e.nome} (${e.uf})</h2>
      <p>${e.chamada}</p>
      <p><strong>Cidades:</strong> ${e.cidades}</p>
      <p style="margin-top:12px"><a class="btn btn-laranja" href="${ZAP}">Cotação para ${e.nome}</a></p>
    </div>`).join('\n    ')}
  </div>
</div></section>
<section class="alt"><div class="container">
  <h2 class="secao">Atendemos onde sua operação precisa</h2>
  <p class="secao-sub">Frota própria, produção sob demanda e padrão constante de qualidade — do interior de SP ao polo metalúrgico de MG e às caldeiras do PR.</p>
  <p><a class="btn" href="${ZAP}">Falar com a Nuxem agora</a></p>
</div></section>`}));

// ---------- redirecionamentos (links antigos do Wix → páginas novas) ----------
const mapaRedirects = new Map(redirecionamentosLegados);
for (const p of posts.filter(p => p.slugOriginal)) {
  mapaRedirects.set(`/post/${p.slugOriginal.replace(/\/$/, '')}/`, `/blog/${p.slug}/`);
}
const regras = [];
for (const [origem, destino] of mapaRedirects) {
  if (existsSync(join(dist, origem, 'index.html'))) continue;
  if (!existsSync(join(dist, destino, 'index.html'))) throw new Error(`Destino de redirecionamento ausente: ${destino}`);
  for (const variante of [origem, origem.slice(0, -1)]) {
    regras.push(`${encodeURI(variante)} ${destino} 301`);
  }
}
writeFileSync(join(dist, '_redirects'), [...new Set(regras)].join('\n') + '\n', 'utf8');

// ---------- sitemap e robots ----------
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(paginas)].map(p => `  <url><loc>${EMPRESA.dominio}${p}</loc></url>`).join('\n')}
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
      let html = readFileSync(idx, 'utf8');
      // injeta snippet GA4 nos posts restaurados (HTML antigo não tem)
      let mudouGtag = false;
      if (EMPRESA.gaId && !html.includes('googletagmanager.com/gtag/js')) {
        html = html.replace('</head>', `${analyticsMarkup}\n</head>`);
        mudouGtag = true;
      }
      if (!html.includes('src="/interface.js"')) {
        html = html.replace('</head>', '<script src="/interface.js" defer></script>\n</head>');
        mudouGtag = true;
      }
      if (!html.includes('class="consent-banner"')) {
        html = html.replace('</body>', `${consentBannerMarkup}\n</body>`);
        mudouGtag = true;
      }
      // migra refs .jpg -> .webp nos posts restaurados (quando o webp existe)
      const htmlAntes = html;
      html = html.replace(/(["'])([^"']*?)([a-z0-9-]+)\.jpg\1/g, (m, q, pre, nome) => {
        const webp = join(raiz, 'src', 'imagens', `${nome}.webp`);
        const webpBlog = join(raiz, 'src', 'imagens', 'blog', `${nome}.webp`);
        return (existsSync(webp) || existsSync(webpBlog)) ? `${q}${pre}${nome}.webp${q}` : m;
      });
      const mudouWebp = html !== htmlAntes;
      const tm = html.match(/<h1>([^<]+)<\/h1>/);
      const jd = html.match(/"datePublished":"([^"]+)"/);
      const dm = html.match(/Publicado em (\d+) de (\w+) de (\d+)/);
      const mm = html.match(/<meta name="description" content="([^"]+)"/);
      // posts antigos (herança Wix) podem ter title/H1 vazios — deriva título do slug
      // ou da meta description (que começa com o título real, ex: "Óleo B1: ... Aotimização")
      let titulo = (tm && tm[1].trim()) ? tm[1].trim() : '';
      const tituloSlug = tituloDoSlug(slug);
      let tituloDesc = '';
      if (mm && mm[1].trim().startsWith('Óleo')) {
        const corte = mm[1].match(/[a-zà-ú][A-ZÀ-Ú]/);
        if (corte && corte.index < 90) tituloDesc = mm[1].slice(0, corte.index + 1).trim();
      }
      const novo = tituloDesc || titulo || tituloSlug;
      const titleAtual = html.match(/<title>([^<]*)<\/title>/);
      const esperado = `${novo} | Blog Nuxem`;
      const mudouTitulo = novo !== titulo || !titleAtual || titleAtual[1].trim() !== esperado;
      if (mudouTitulo) {
        titulo = novo;
        html = html
          .replace(/<title>[^<]*\| Blog Nuxem<\/title>/, `<title>${titulo} | Blog Nuxem</title>`)
          .replace(/<h1>[^<]*<\/h1>/, `<h1>${titulo}</h1>`)
          .replace(/"headline":"[^"]*"/, `"headline":"${titulo}"`);
      }
      if (mudouTitulo || mudouWebp || mudouGtag) writeFileSync(idx, html, 'utf8');
      // converte data pt-BR para ISO para ordenação correta
      const meses = { janeiro:'01',fevereiro:'02',março:'03',abril:'04',maio:'05',junho:'06',julho:'07',agosto:'08',setembro:'09',outubro:'10',novembro:'11',dezembro:'12' };
      let dataIso = jd ? jd[1] : '';
      if (!dataIso && dm) dataIso = `${dm[3]}-${meses[dm[2]]||'00'}-${dm[1].padStart(2,'0')}`;
      posts.push({
        slug,
        slugOriginal: '',
        title: titulo,
        description: mm ? mm[1] : '',
        date: dataIso,
        dataExibicao: dm ? `${dm[1]} de ${dm[2]} de ${dm[3]}` : (jd ? dataBr(jd[1]) : ''),
      });
    }
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  // regera a listagem do blog com todos os posts
  writeFileSync(join(blogDir, 'index.html'), layout({ title: 'Blog Nuxem | Óleo BPF, Xisto e Combustíveis Industriais', description: 'Guias de compra, operação e aplicações de óleo BPF e óleo de xisto. Compare combustíveis e planeje o abastecimento em SP, MG e PR.', caminho: 'blog', conteudo: listagemBlog(posts) }), 'utf8');
  // atualiza sitemap com blog posts
  // Uma URL por página. Não usar a data do build como atualização de conteúdo.
  const paginasUnicas = [...new Set([...paginas, ...posts.map(p => `/blog/${p.slug}/`)])];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginasUnicas.map(p => `  <url><loc>${EMPRESA.dominio}${p}</loc></url>`).join('\n')}
</urlset>`;
  writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`  + ${todosSlugs.length - arquivosBlog.length} posts restaurados do backup`);
}

// Links internos apontam ao conteúdo final, inclusive nos HTMLs legados preservados.
function atualizarLinksLegados(diretorio) {
  for (const entry of readdirSync(diretorio, { withFileTypes: true })) {
    const arquivo = join(diretorio, entry.name);
    if (entry.isDirectory()) atualizarLinksLegados(arquivo);
    else if (entry.name.endsWith('.html')) {
      const html = readFileSync(arquivo, 'utf8');
      const atualizado = html.replace(/href="(\/(?:blog|post)\/[^"?#]+)"/g, (match, url) => {
        if (existsSync(join(dist, url, 'index.html'))) return match;
        return `href="${destinoLegado(url)}"`;
      });
      if (atualizado !== html) writeFileSync(arquivo, atualizado, 'utf8');
    }
  }
}
atualizarLinksLegados(dist);
