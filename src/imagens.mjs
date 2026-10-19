import { readFileSync } from 'node:fs';

const manifesto = JSON.parse(readFileSync(new URL('./imagens/manifesto.json', import.meta.url)));
const heroAvif = JSON.parse(readFileSync(new URL('./imagens/hero-avif.json', import.meta.url)));
const candidatosAvif = heroAvif.map(v => `${v.url} ${v.width}w`).join(', ');
const fotosAvif = {
  '/imagens/hero-usina-asfalto.webp': heroAvif,
  ...Object.fromEntries(['caldeira', 'fundicao'].map(nome => [`/imagens/${nome}.webp`, JSON.parse(readFileSync(new URL(`./imagens/${nome}-avif.json`, import.meta.url)))])),
};
export const tamanhosHero = '(max-width: 560px) calc(100vw - 44px), (max-width: 860px) calc(100vw - 40px), (max-width: 1240px) 48vw, 562px';
const tamanhosCard = '(max-width: 560px) calc(100vw - 44px), (max-width: 860px) calc((100vw - 62px) / 2), (max-width: 1240px) calc((100vw - 84px) / 3), 385px';

function candidatos(src, meta) {
  const variantes = [...meta.variants];
  if (!variantes.some(v => v.width === meta.width)) variantes.push({url: src, width: meta.width});
  return variantes.map(v => `${v.url} ${v.width}w`).join(', ');
}

export function preloadHero() {
  return `<link rel="preload" as="image" type="image/avif" href="${heroAvif.at(-1).url}" imagesrcset="${candidatosAvif}" imagesizes="${tamanhosHero}" fetchpriority="high">`;
}

// Mantém src e alt existentes; adiciona alternativas sem mudar as URLs de conteúdo.
export function otimizarImagens(html) {
  return html.replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    const meta = manifesto[src];
    if (!meta) return tag;
    let resultado = tag.replace(/\s(?:width|height)="[^"]*"/g, '').replace(/>$/, ` width="${meta.width}" height="${meta.height}">`);
    if (meta.variants.length && !/\bsrcset=/.test(tag)) {
      const sizes = tag.match(/\bsizes="([^"]+)"/)?.[1]
        || (src.endsWith('logo-chama.png') ? '(max-width: 860px) 83px, 94px'
          : /fetchpriority="high"/.test(tag) ? tamanhosHero
          : /class="foto-pagina"/.test(tag) ? '(max-width: 830px) calc(100vw - 44px), 790px'
          : tamanhosCard);
      resultado = resultado.replace(/\s sizes="[^"]*"/, '').replace(/>$/, ` srcset="${candidatos(src, meta)}" sizes="${sizes}">`);
    }
    if (src === '/imagens/hero-usina-asfalto.webp' && /fetchpriority="high"/.test(tag)) {
      return `<picture class="hero-picture"><source type="image/avif" srcset="${candidatosAvif}" sizes="${tamanhosHero}">${resultado}</picture>`;
    }
    if (fotosAvif[src] && /loading="lazy"/.test(tag)) {
      const srcset = fotosAvif[src].map(v => `${v.url} ${v.width}w`).join(', ');
      const sizes = resultado.match(/\bsizes="([^"]+)"/)[1];
      return `<picture><source type="image/avif" srcset="${srcset}" sizes="${sizes}">${resultado}</picture>`;
    }
    return resultado;
  });
}
