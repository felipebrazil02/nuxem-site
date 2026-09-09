import { readFile, writeFile, readdir, mkdir, unlink } from 'node:fs/promises';
import { resolve, join, relative, isAbsolute } from 'node:path';
import { STORE_NAME, hash, validateArticle, validateUUID } from '../../studio/bridge-core.mjs';
import { legacySlugs as baselineSlugs } from '../../studio/legacy-slugs.mjs';

const escapeHTML = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const readOptional = async (path) => { try { return await readFile(path, 'utf8'); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } };
const entries = async (path) => { try { return await readdir(path, { withFileTypes: true }); } catch (error) { if (error.code === 'ENOENT') return []; throw error; } };

export function articleMarkdown(record) {
  const { article, articleId, approvedAt } = record;
  // build.mjs inserts Markdown/frontmatter directly into HTML. Escape imported data before giving it to that renderer.
  return `---\ntitle: "${escapeHTML(article.title)}"\ndescription: "${escapeHTML(article.description)}"\ndate: ${approvedAt.slice(0, 10)}\nslugOriginal: ""\nstudioArticleId: "${articleId}"\n---\n\n${escapeHTML(article.body)}\n`;
}

export function createContentPlugin({ getStore, root = process.cwd(), baseline = baselineSlugs }) {
  const rootDir = resolve(root);
  const blogDir = join(rootDir, 'conteudo', 'blog');
  const created = new Map();
  let imported = [];
  const withinRoot = (path) => {
    const result = resolve(path);
    const rel = relative(rootDir, result);
    if (rel.startsWith('..') || isAbsolute(rel)) throw new Error('Studio build path is outside the site directory.');
    return result;
  };

  return {
    async onPreBuild() {
      const store = getStore({ name: STORE_NAME, consistency: 'strong' });
      const records = [];
      const approvedIDs = new Map();
      const slugs = new Set();
      for await (const page of store.list({ prefix: 'approved/', paginate: true })) {
        for (const blob of page.blobs) {
          const record = await store.get(blob.key, { type: 'json' });
          if (!record) throw new Error('Approved Studio content disappeared during the build.');
          const articleId = validateUUID(record.articleId, 'articleId');
          if (blob.key !== `approved/${articleId}`) throw new Error('Invalid approved content key.');
          const article = validateArticle(record.article);
          if (record.contentHash !== hash(article)) throw new Error(`Studio content hash does not match: ${articleId}`);
          if (typeof record.approvedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(record.approvedAt) || !Number.isFinite(Date.parse(record.approvedAt))) throw new Error('Invalid approval date.');
          if (slugs.has(article.slug)) throw new Error(`Duplicate approved Studio URL: ${article.slug}`);
          const ownership = await store.get(`slug/${article.slug}`, { type: 'json' });
          if (!ownership || ownership.articleId !== articleId || ownership.contentHash !== record.contentHash) throw new Error(`Studio URL ownership is missing: ${article.slug}`);
          const normalized = { ...record, articleId, article };
          records.push(normalized);
          approvedIDs.set(article.slug, articleId);
          slugs.add(article.slug);
        }
      }
      records.sort((a, b) => a.article.slug.localeCompare(b.article.slug));
      const reserved = new Set(baseline);
      for (const file of await entries(blogDir)) {
        if (!file.isFile() || !file.name.endsWith('.md')) continue;
        const slug = file.name.slice(0, -3);
        const content = await readFile(join(blogDir, file.name), 'utf8');
        const record = records.find((item) => item.article.slug === slug);
        // A previous interrupted build may have left the exact generated file behind. Never rewrite it.
        if (!record || content !== articleMarkdown(record)) reserved.add(slug);
        const alias = content.match(/^slugOriginal:\s*"?([^"\r\n]+)"?\s*$/m)?.[1]?.trim();
        if (alias) reserved.add(alias);
      }
      for (const dir of await entries(join(rootDir, 'dist', 'blog'))) {
        if (!dir.isDirectory()) continue;
        const existingHTML = await readOptional(join(rootDir, 'dist', 'blog', dir.name, 'index.html'));
        const id = approvedIDs.get(dir.name);
        if (!id || !existingHTML?.includes(`<meta name="studio-seo-article" content="${id}">`)) reserved.add(dir.name);
      }
      for (const record of records) {
        if (reserved.has(record.article.slug)) throw new Error(`Studio content conflicts with an existing article: ${record.article.slug}`);
      }
      // Refresh this bundled allowlist before Functions are packaged, protecting future repository-authored articles too.
      const manifestPath = join(rootDir, 'netlify', 'studio', 'legacy-slugs.mjs');
      await mkdir(resolve(manifestPath, '..'), { recursive: true });
      await writeFile(manifestPath, `// Existing source and static article URLs; regenerated by the build plugin.\nexport const legacySlugs = ${JSON.stringify([...reserved].sort(), null, 2)};\n`, 'utf8');
      await mkdir(blogDir, { recursive: true });
      for (const record of records) {
        const filename = withinRoot(join(blogDir, `${record.article.slug}.md`));
        const content = articleMarkdown(record);
        const old = await readOptional(filename);
        if (old === content) continue;
        if (old !== null) throw new Error(`Refusing to overwrite an existing Markdown file: ${record.article.slug}`);
        await writeFile(filename, content, { encoding: 'utf8', flag: 'wx' });
        created.set(filename, content);
      }
      imported = records;
    },
    async onPostBuild({ constants = {} } = {}) {
      const publishDir = withinRoot(constants.PUBLISH_DIR || join(rootDir, 'dist'));
      for (const record of imported) {
        const path = withinRoot(join(publishDir, 'blog', record.article.slug, 'index.html'));
        let html = await readFile(path, 'utf8');
        const marker = `<meta name="studio-seo-article" content="${record.articleId}">`;
        if (!html.includes('</head>')) throw new Error(`Missing generated HTML head for ${record.article.slug}`);
        if (!html.includes(marker)) html = html.replace('</head>', `${marker}\n</head>`);
        const language = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[record.article.language];
        html = html.replace('<html lang="pt-BR">', `<html lang="${language}">`)
          .replace('property="og:locale" content="pt_BR"', `property="og:locale" content="${language.replace('-', '_')}"`)
          .replace('"inLanguage":"pt-BR"', `"inLanguage":"${language}"`);
        await writeFile(path, html, 'utf8');
      }
    },
    async onEnd() {
      // Remove only files this invocation created, and only if their exact content is unchanged.
      for (const [path, expected] of created) {
        if (await readOptional(withinRoot(path)) === expected) await unlink(path);
      }
      created.clear();
    },
  };
}

let instance;
async function plugin() {
  if (!instance) {
    const { getStore } = await import('@netlify/blobs');
    instance = createContentPlugin({ getStore });
  }
  return instance;
}
export const onPreBuild = async (args) => (await plugin()).onPreBuild(args);
export const onPostBuild = async (args) => (await plugin()).onPostBuild(args);
export const onEnd = async (args) => (await plugin()).onEnd(args);
export const onError = async (args) => (await plugin()).onEnd(args);
