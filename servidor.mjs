// Servidor local simples para visualizar o site gerado em dist/
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.xml': 'application/xml', '.txt': 'text/plain', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

createServer((req, res) => {
  let caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let arquivo = join(dist, caminho);
  if (existsSync(arquivo) && statSync(arquivo).isDirectory()) arquivo = join(arquivo, 'index.html');
  if (!existsSync(arquivo)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('404 - página não encontrada');
  }
  res.writeHead(200, { 'Content-Type': tipos[extname(arquivo)] || 'application/octet-stream' });
  res.end(readFileSync(arquivo));
}).listen(4180, () => console.log('Site da Nuxem no ar em http://localhost:4180'));
