export class MemoryStore {
  records = new Map();
  revision = 0;
  async get(key) { return structuredClone(this.records.get(key)?.value ?? null); }
  async setJSON(key, value, options = {}) {
    const old = this.records.get(key);
    if (options.onlyIfNew && old) return { modified: false };
    if (options.onlyIfMatch && old?.etag !== options.onlyIfMatch) return { modified: false };
    const etag = `"${++this.revision}"`;
    this.records.set(key, { value: structuredClone(value), etag });
    return { modified: true, etag };
  }
  async *list({ prefix }) { yield { blobs: [...this.records.keys()].filter((key) => key.startsWith(prefix)).map((key) => ({ key })) }; }
}
export const sample = (slug = 'novo-artigo-tecnico') => ({ title: 'Como planejar o abastecimento industrial', slug, description: 'Critérios práticos para planejar o abastecimento de combustível industrial com segurança.', keyword: 'abastecimento industrial', language: 'pt', body: '## Planejamento\n\n' + 'Avalie a demanda da operação, o histórico de consumo e os prazos acordados com o fornecedor. '.repeat(10) + '\n\n[Conheça a Nuxem](/contato/)' });
