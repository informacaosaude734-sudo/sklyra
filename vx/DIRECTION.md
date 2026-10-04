# VX — Direção criativa

Documento curto de referência. Tudo o que está no código deriva daqui.

## Tese

**O X é o V diante do espelho.**

O monograma VX é um X cortado ao meio por uma linha horizontal. A metade de cima é
um V. A de baixo é o reflexo dele. Juntas, formam o X.

- **V** — a lâmina, a direção, quem entra na cadeira.
- **Linha** — o corte. A borda do espelho. A navalha.
- **X** — o encontro do V com o próprio reflexo: quem sai.

"Quando você entra, existe uma versão sua. Quando você sai, existe outra." vira
geometria, não slogan. A mesma linha horizontal atravessa o hero, separa os
títulos e conduz as transições.

O que a VX recusa: poste de barbeiro, bigode, tesoura cruzada, madeira, dourado,
caveira, brasão, letra retrô. Nada de nostalgia.

## Mundo

| Papel | Token | Valor | Uso |
| --- | --- | --- | --- |
| Noite | `--vx-black` | `#080808` | fundo base |
| Concreto | `--vx-surface` / `--vx-surface-2` | `#0E0E0E` / `#151515` | elevação por luminosidade |
| Papel | `--vx-white` | `#F1EFEA` | texto principal |
| Aço frio | `--vx-muted` | `#8E9298` | texto secundário |
| Cromo | `--vx-metal` | `#BFC4CA` + gradiente | detalhes, linhas, 3D |
| Sódio | `--vx-sodium` | `#FF8A2B` | **só o que está aceso** |

O acento é a luz de sódio dos túneis e postes do Rio à noite (Rebouças, Santa
Bárbara, Aterro). Regra: só leva sódio o que está "ligado" — foco de teclado,
horário selecionado, status de agenda, luz de borda no 3D. Nunca decoração.

## Tipo

- **Display — Mona Sans (variável).** Grotesca industrial com eixo de largura
  75–125. Condensada (75) para títulos empilhados; expandida (125) para o VX
  gigante do rodapé. A largura é parte da identidade: nomes de serviço se
  expandem no hover; o VX do rodapé abre até ocupar a largura.
- **Texto — Schibsted Grotesk.** Grotesca editorial nascida em redação de jornal.
  Legível, compacta, com personalidade sem ruído. Números tabulares para preço,
  duração e horário.

Sem Inter, sem monoespaçada decorativa, sem serifa "de luxo".

## Grid

12 colunas (≥1024) · 8 colunas (768) · 4 colunas (<768). Margem fluida.
Assimetria controlada: títulos alinhados à esquerda; imagens quebram o grid de
propósito (sangram para a margem, cruzam colunas). Nada centralizado por padrão.

## Material

Cromo, concreto, vidro preto, asfalto molhado, luz de sódio. Cantos retos (raio
máximo 2px). Linhas de 1px em cromo translúcido. Marcas de corte (crop marks) nos
quadros de foto, como uma folha de contato de editorial.

## Movimento

| Camada | Duração | Uso |
| --- | --- | --- |
| Interação rápida | 120–220ms | hover, press, foco |
| Transição de UI | 250–450ms | menu, passos do agendamento |
| Revelação editorial | 500–900ms | títulos, imagens |
| Sequência cinematográfica | 800–1400ms | abertura do hero |

Gramática: **o corte**. Imagens e títulos se abrem a partir de uma linha
horizontal central (clip-path), como as duas metades do monograma se separando.
Linhas se desenham da esquerda para a direita, como uma lâmina passando.
Curva padrão `cubic-bezier(0.22, 1, 0.36, 1)`. Sem bounce, sem fade-up genérico
em tudo, sem loop infinito sem motivo. `prefers-reduced-motion` remove todo
movimento espacial e mantém só opacidade.

## Interação assinatura

O monograma 3D em cromo, partido em duas metades (V e reflexo). O cursor move a
metade de cima; a de baixo responde espelhada. Luz de sódio de um lado, luz de
estúdio fria do outro. No mobile e em aparelhos fracos, vira imagem estática.

## Primeiro viewport

Título em duas linhas — `SEU CORTE.` acima da linha, `SUA PRESENÇA.` abaixo dela.
O monograma cromado atravessa a mesma linha à direita. Embaixo: cidade, uma frase
de serviço e o CTA de agendamento.

## Fotografia (a produzir)

Flash direto, sombra dura, contraste alto, pele e fio com textura, metal e
espelho, interiores escuros, influência de rua. Nenhuma foto de banco de imagem
corporativa. Enquanto as fotos reais não chegam, cada quadro mostra a pauta da
foto que deve ocupar aquele lugar (ver `src/data/*` e o README).
