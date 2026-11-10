// Avisa o IndexNow (Bing e parceiros) das páginas que mudaram em cada publicação de produção.
// Nunca derruba o deploy: qualquer falha vira apenas um aviso no log.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const SITE = 'https://nuxemoil.com.br';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// URLs novas ou com conteúdo diferente do manifesto publicado. Sem manifesto anterior, envia todas.
export function urlsAlteradas(anterior, atual) {
  return Object.keys(atual).filter(url => url.startsWith(`${SITE}/`) && (!anterior || anterior[url] !== atual[url]));
}

export function criarPlugin({ fetchImpl = globalThis.fetch, env = process.env, log = console.log } = {}) {
  let anterior = null;
  const producao = () => env.CONTEXT === 'production';
  return {
    // Antes do build o site no ar ainda é a versão anterior: guarda o manifesto dela.
    async onPreBuild() {
      if (!producao()) return;
      try {
        const resposta = await fetchImpl(`${SITE}/indexnow-manifest.json`, { signal: AbortSignal.timeout(10000) });
        if (resposta.ok) anterior = await resposta.json();
      } catch (erro) {
        log(`IndexNow: sem manifesto anterior (${erro.message}).`);
      }
    },
    // Depois que o deploy entrou no ar.
    async onSuccess({ constants } = {}) {
      if (!producao()) return log('IndexNow: ignorado fora da produção.');
      try {
        const dist = constants?.PUBLISH_DIR || 'dist';
        const atual = JSON.parse(await readFile(join(dist, 'indexnow-manifest.json'), 'utf8'));
        const chave = await lerChave(dist);
        const urlList = urlsAlteradas(anterior, atual);
        if (!chave || !urlList.length) return log('IndexNow: nenhuma URL alterada.');
        const resposta = await fetchImpl(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ host: new URL(SITE).host, key: chave, keyLocation: `${SITE}/${chave}.txt`, urlList }),
          signal: AbortSignal.timeout(15000),
        });
        log(`IndexNow: ${urlList.length} URL(s) enviadas, resposta ${resposta.status}.`);
      } catch (erro) {
        log(`IndexNow: envio não realizado (${erro.message}).`);
      }
    },
  };
}

async function lerChave(dist) {
  const { EMPRESA } = await import('../../../src/dados.mjs');
  const chave = EMPRESA.indexNowKey;
  return (await readFile(join(dist, `${chave}.txt`), 'utf8')).trim() === chave ? chave : '';
}
