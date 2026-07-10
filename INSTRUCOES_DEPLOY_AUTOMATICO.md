# 🚀 Deploy Automático - Instruções

## 1️⃣ Repositório criado: https://github.com/felipebrazil02/nuxem-site

## 2️⃣ Conectar no Netlify (3 cliques)

1. Acesse https://app.netlify.com/
2. Faça login com seu GitHub
3. Clique em **"Add new site"** → **"Import an existing project"**
4. Escolha **"Deploy with GitHub"**
5. Selecione o repositório **`felipebrazil02/nuxem-site`**
6. Clique em **"Deploy site"**

⚠️ **Não precisa configurar nada** — o arquivo `netlify.toml` já está no repositório com:
- Build command: `node build.mjs`
- Publish directory: `dist`

O Netlify vai detectar automaticamente!

## 3️⃣ Como vai funcionar daqui pra frente

✅ **Você edita arquivos fonte** em `src/dados.mjs` ou adiciona posts `.md` na pasta `conteudo/blog/`
✅ **Faz git push** para o GitHub
✅ **Netlify detecta** a mudança, roda `node build.mjs` e faz deploy automático 🚀

Não precisa mais fazer upload manual de arquivos!