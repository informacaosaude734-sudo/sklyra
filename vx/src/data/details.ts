import type { MediaRef } from "@/lib/media";

/** Seção "The VX Cut" — os seis detalhes. */
export type Detail = { id: string; name: string; caption: string; media: MediaRef };

export const DETAILS: Detail[] = [
  {
    id: "fade",
    name: "Fade",
    caption: "Do zero ao comprimento sem degrau. Uma transição só, contínua.",
    media: {
      alt: "Degradê visto de perto na lateral da cabeça",
      brief: "Macro lateral do degradê, da pele ao fio. Flash direto, foco no meio da transição.",
      ratio: "4/5",
      texture: "fade",
    },
  },
  {
    id: "textura",
    name: "Textura",
    caption: "Fio trabalhado para cair natural. Movimento, não capacete.",
    media: {
      alt: "Topo do cabelo com textura e movimento",
      brief: "Topo da cabeça de cima, fios texturizados, luz rasante revelando volume.",
      ratio: "4/5",
      texture: "texture",
    },
  },
  {
    id: "linha",
    name: "Linha",
    caption: "Contorno na navalha. A borda que separa arrumado de bem feito.",
    media: {
      alt: "Linha de contorno marcada na testa",
      brief: "Close da linha frontal recém-marcada. Navalha entrando no quadro pela direita.",
      ratio: "4/5",
      texture: "line",
    },
  },
  {
    id: "acabamento",
    name: "Acabamento",
    caption: "Nuca, orelha, pescoço. O que você não vê de frente e todo mundo vê.",
    media: {
      alt: "Acabamento da nuca com máquina de detalhe",
      brief: "Nuca de costas, máquina de acabamento, pele limpa. Sombra dura vinda de cima.",
      ratio: "4/5",
      texture: "steel",
    },
  },
  {
    id: "barba",
    name: "Barba",
    caption: "Desenho a partir do maxilar. Densidade onde precisa, limpa onde não.",
    media: {
      alt: "Barba desenhada com contorno definido",
      brief: "Perfil do maxilar com barba desenhada, navalha apoiada. Pele com textura real.",
      ratio: "4/5",
      texture: "blade",
    },
  },
  {
    id: "styling",
    name: "Styling",
    caption: "Você sai sabendo repetir em casa. Produto certo, na quantidade certa.",
    media: {
      alt: "Mãos finalizando o cabelo com pomada",
      brief: "Mãos do barbeiro finalizando com pomada, brilho no fio. Fundo escuro, rim light.",
      ratio: "4/5",
      texture: "mirror",
    },
  },
];
