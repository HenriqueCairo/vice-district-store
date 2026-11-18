# Vice District — loja virtual

Projeto com dois pacotes separados:

- **`frontend/`** — site da loja, em **Angular**. É o que o cliente vê: vitrine de produtos,
  página de cada produto, botão flutuante de WhatsApp, animações (partículas no topo, cards
  com efeito 3D ao passar o mouse, etc).
- **`backend/`** — API em **Next.js**, bem simples, guardando os produtos num arquivo
  (`backend/data/products.json`). Tem um painel em `/admin` pra você adicionar, editar e
  apagar produtos sem mexer em código.

## Pré-requisito

Ter o **Node.js** instalado (versão 18 ou mais nova). Depois é só rodar os comandos abaixo —
eu não consigo baixar pacotes do npm por aqui, então o `npm install` precisa rodar na sua
máquina (ou dentro do Claude Code/terminal que você for usar).

## Como rodar

Abra dois terminais.

**Terminal 1 — back-end:**
```
cd backend
cp .env.local.example .env.local   # depois edite o ADMIN_TOKEN nesse arquivo
npm install
npm run dev
```
Vai subir em `http://localhost:3000`. O painel de produtos fica em `http://localhost:3000/admin`
(ele vai pedir o token que você colocou em `.env.local`).

**Terminal 2 — front-end:**
```
cd frontend
npm install
npm start
```
Vai subir em `http://localhost:4200` — é o endereço que você abre no navegador pra ver a loja.

## O que trocar antes de publicar

1. **Número de WhatsApp** — em `frontend/src/environments/environment.ts` (e também em
   `environment.prod.ts`), troque `whatsappNumber` pelo número real da loja, só dígitos,
   com código do país: `55` + DDD + número. Ex: `(11) 91234-5678` vira `5511912345678`.
2. **Token do admin** — em `backend/.env.local`, troque `ADMIN_TOKEN` por uma senha só sua.
3. **Produtos de exemplo** — já deixei 8 produtos de exemplo (camiseta, moletom, boné,
   chaveiro, adesivos, pulseira, luminária, placa) com fotos de placeholder, só pra você ver
   a loja funcionando. Apague ou edite todos pelo `/admin`, ou troque direto o arquivo
   `backend/data/products.json`.
4. **Fotos** — as imagens de exemplo são só placeholders cinza com o nome do produto. No
   formulário do `/admin`, o campo "Imagens" aceita qualquer URL de imagem (cole o link de
   onde você hospedar as fotos reais).

## Sobre vender itens "estilo GTA 6"

Pra não usar logo/artes oficiais da Rockstar (o que pode dar problema de direito autoral e
marca registrada), criei os produtos de exemplo com a marca própria "Vice District" — visual
inspirado em cenário neon/gamer, mas sem copiar nome, logo ou arte do jogo. Se quiser vender
itens claramente "inspirados" num jogo específico, o mais seguro é manter assim: sua própria
marca e arte, só com a vibe do jogo — e não usar o nome/logo oficial do jogo nos produtos.
Isso é só uma observação, não uma regra — a decisão final é sua.

## Estrutura

```
vice-district-store/
├── frontend/              Angular (site da loja)
│   └── src/app/
│       ├── components/    header, footer, botão flutuante de WhatsApp, fundo de partículas,
│       │                  card de produto, grid de produtos
│       ├── pages/         home (vitrine) e product-detail (página de cada produto)
│       ├── services/      chamadas à API e montagem do link de WhatsApp
│       └── models/        tipo Product
└── backend/               Next.js (API + painel admin)
    ├── data/products.json banco de dados simples (arquivo JSON)
    ├── pages/api/products  rotas GET/POST/PUT/DELETE
    └── pages/admin         painel de edição
```

## Publicando de verdade (fora do seu computador)

- **Back-end**: como ele escreve num arquivo local (`products.json`), funciona liso rodando
  na sua própria máquina ou num servidor "de verdade" (uma VPS, Railway, Render). Em
  plataformas 100% serverless (como a Vercel) esse tipo de escrita em arquivo **não é
  permanente** — cada novo deploy apaga o que foi editado. Se for publicar na Vercel, vale a
  pena trocar o `products.json` por um bancal de dados de verdade (ex: Supabase, mas aí já é
  um passo a mais).
- **Front-end**: Angular é um site estático depois de compilado (`npm run build` gera a pasta
  `dist/`), então dá pra publicar em qualquer lugar (Vercel, Netlify, GitHub Pages etc.).
  Só lembre de apontar o `apiUrl` em `environment.prod.ts` pro endereço público do seu back-end.
