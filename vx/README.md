# VX — Barbearia · Rio de Janeiro

Site da VX: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
GSAP + ScrollTrigger · Lenis · Motion · Three.js / React Three Fiber.

Direção criativa, tokens e regras de movimento: [`DIRECTION.md`](DIRECTION.md).

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de produção (Vercel / Node)
npm start
npm run lint
```

## Publicar

### Vercel (recomendado)

1. vercel.com/new → importe o repositório.
2. **Root Directory: `vx`**. O framework (Next.js) é detectado sozinho.
3. Deploy.

Variáveis de ambiente (opcionais):

| Variável | Exemplo | Para quê |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5521999999999` | Botões e agendamento pelo WhatsApp. Só números, com DDI + DDD. |
| `NEXT_PUBLIC_SITE_URL` | `https://www.seudominio.com.br` | URL canônica, sitemap, Open Graph. Sem ela, usa o domínio de produção da Vercel. |

### Hospedagem estática grátis (GitHub Pages ou qualquer servidor de arquivos)

```bash
NEXT_PUBLIC_BASE_PATH=/sklyra \
NEXT_PUBLIC_SITE_URL=https://<usuario>.github.io/sklyra \
npm run build:static   # gera out/
```

Publique o conteúdo de `out/` no branch `gh-pages` (GitHub Pages → Deploy from
branch → `gh-pages` / root). `NEXT_PUBLIC_BASE_PATH` é a subpasta onde o site
fica; deixe vazio num domínio próprio. Na versão estática as imagens não passam
pelo otimizador do Next. O resto funciona igual.

## O que o proprietário precisa preencher

Tudo que não foi informado aparece no site **entre colchetes**, por exemplo
`[ENDEREÇO REAL A INSERIR]`. Nada foi inventado. Quase tudo fica em um arquivo
só: [`src/config/brand.ts`](src/config/brand.ts).

- [ ] **WhatsApp** — `WHATSAPP_NUMBER` (ou a variável `NEXT_PUBLIC_WHATSAPP_NUMBER`). Sem ele, o envio do agendamento fica desativado.
- [ ] **Endereço** — `ADDRESS`, e `ADDRESS_PARTS` (rua, bairro, CEP). Com o endereço preenchido, o site passa a publicar os dados estruturados de negócio local para o Google.
- [ ] **Link do mapa** — `MAP_URL`.
- [ ] **Instagram** — `INSTAGRAM` (sem @).
- [ ] **Horário** — `OPENING_HOURS` (estruturado; há exemplo no arquivo). Também bloqueia os dias fechados na agenda.
- [ ] **Ano de fundação** — `FOUNDED_YEAR`.
- [ ] **Preços e durações** — `SERVICES[].price` e `SERVICES[].durationMin`.
- [ ] **Descrições dos serviços** — texto de marca para revisar com a equipe.
- [ ] **Barbeiros** — `BARBERS` (nome, especialidade, Instagram, foto). Vazio = 3 cadeiras-placeholder.
- [ ] **Agenda externa** (opcional) — `BOOKING.externalUrl` (Trinks, AppBarber, Booksy...).
- [ ] **Telefone / e-mail** (opcionais) — `PHONE`, `EMAIL`.
- [ ] **Domínio** — `NEXT_PUBLIC_SITE_URL` no deploy.
- [ ] **Política de privacidade** — [`src/app/privacidade/page.tsx`](src/app/privacidade/page.tsx) é um texto-base. Revisar com assessoria jurídica (LGPD).
- [ ] **Textos de marca** — manifesto, VX Cut, espaço, Rio. Revisar o tom com a equipe.

### Fotos

Não havia fotos reais. Cada quadro mostra uma **textura gerada para a VX** e a
**pauta da foto** que deve ocupar aquele lugar (direção: flash direto, sombra
dura, contraste alto, pele e fio com textura, metal, espelho, noite).

1. Coloque os arquivos em `public/media/fotos/`.
2. Preencha `src` no item correspondente, por exemplo `src: "/media/fotos/fade-01.jpg"`.
3. Mantenha a proporção (`ratio`) próxima da original.

| Onde | Arquivo |
| --- | --- |
| Serviços (foto do hover) | `src/config/brand.ts` → `SERVICES[].media` |
| The VX Cut (6 detalhes) | `src/data/details.ts` |
| Galeria | `src/data/gallery.ts` |
| Espaço | `src/data/space.ts` |
| Barbeiros | `src/config/brand.ts` → `BARBERS[].photo` |
| Vídeo/foto do hero (opcional) | `src/config/brand.ts` → `HERO_MEDIA` |

Para publicar antes das fotos, sem as pautas visíveis, mude
`SHOW_PHOTO_BRIEFS` para `false`. Os quadros mostram só as texturas.

## Estrutura

```
src/
  app/            rotas: / · /agendar · /privacidade · sitemap · robots · manifest · OG
  config/brand.ts dados do negócio (o único arquivo obrigatório de editar)
  data/           conteúdo editorial (detalhes, galeria, espaço, navegação)
  components/
    sections/     Hero, Manifesto, Services, VXCut, Gallery, Barbers, Space, Rio, FinalCTA
    layout/       Navbar, Footer, StickyBooking
    booking/      fluxo de agendamento (dialog + /agendar)
    motion/       scroll suave, revelações, parallax, magnético, cursor
    brand/        monograma VX (SVG)
  three/          monograma 3D (geometria, material cromo, estúdio de luz)
  lib/            formatação, horários, agenda, SEO, WhatsApp, tokens de movimento
  fonts/          Mona Sans + Schibsted Grotesk (OFL, locais)
public/media/     texturas, pôster do monograma
```

`/lab/poster` e `/lab/og` só existem em desenvolvimento. Use-os para regenerar o
pôster cromado (`public/media/vx-chrome.webp`) e a imagem de compartilhamento.

## Acessibilidade e movimento

- Com `prefers-reduced-motion`: sem scroll suave, sem seções fixas e sem parallax. O 3D vira imagem estática; ficam só as transições de opacidade.
- Menu, agendamento e galeria usam `<dialog>` nativo: foco preso, Esc fecha e o foco volta ao botão que abriu.
- O foco do teclado aparece sempre, na cor sódio.
- O 3D só carrega em telas a partir de 768px, com WebGL e sem economia de dados. No resto, aparece o pôster estático.
