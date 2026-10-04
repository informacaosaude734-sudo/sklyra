import type { MediaRef } from "@/lib/media";

/** Seção "Entra. Senta. Deixa com a gente." — a unidade física. */
export type SpacePanel = { id: string; name: string; line: string; media: MediaRef };

export const SPACE: SpacePanel[] = [
  {
    id: "cadeira",
    name: "Cadeira",
    line: "Onde a conversa começa. O resto da sala se organiza em volta dela.",
    media: {
      alt: "Cadeira de barbeiro sob luz baixa",
      brief: "Cadeira vazia, plano frontal, luz de cima. Simetria.",
      ratio: "4/5",
      texture: "strips",
    },
  },
  {
    id: "espelho",
    name: "Espelho",
    line: "Você vê o que a gente vê, enquanto a gente faz.",
    media: {
      alt: "Espelho com reflexo da barbearia",
      brief: "Espelho grande refletindo a sala, cliente fora de foco.",
      ratio: "3/4",
      texture: "mirror",
    },
  },
  {
    id: "bancada",
    name: "Bancada",
    line: "Ferramenta limpa, no lugar certo, antes de você sentar.",
    media: {
      alt: "Bancada com ferramentas de barbeiro",
      brief: "Bancada em plano zenital, ferramentas alinhadas, aço e preto.",
      ratio: "4/5",
      texture: "steel",
    },
  },
  {
    id: "luz",
    name: "Luz",
    line: "Pensada para o rosto, não para o teto.",
    media: {
      alt: "Luminárias lineares refletidas no vidro",
      brief: "Detalhe das luminárias e do reflexo no vidro escuro. Noite.",
      ratio: "3/4",
      texture: "strips",
    },
  },
  {
    id: "detalhe",
    name: "Detalhe",
    line: "Concreto, aço e vidro preto. Nada sobrando.",
    media: {
      alt: "Parede de concreto com sombra dura",
      brief: "Textura de parede/piso com sombra dura de janela. Abstrato.",
      ratio: "4/5",
      texture: "concrete",
    },
  },
];
