import type { MediaRef } from "@/lib/media";

/**
 * Galeria editorial. Proporções variadas de propósito (retrato, paisagem,
 * close-up). Ao trocar por fotos reais, preencha `src` e mantenha o `ratio`
 * próximo do original para não desmontar a composição.
 *
 * NÃO adicione nomes de clientes sem autorização por escrito.
 */
export type GalleryItem = {
  id: string;
  category: string;
  title: string;
  barber?: string;
  media: MediaRef;
  /** Posição no grid de 12 colunas (desktop). */
  span: "tall" | "wide" | "square" | "small";
};

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    category: "Corte",
    title: "Fade baixo",
    span: "tall",
    media: {
      alt: "Corte degradê baixo finalizado",
      brief: "Resultado final, perfil, flash direto. Fundo preto.",
      ratio: "3/4",
      texture: "fade",
    },
  },
  {
    id: "g2",
    category: "Ambiente",
    title: "Bancada",
    span: "wide",
    media: {
      alt: "Bancada de trabalho com ferramentas alinhadas",
      brief: "Bancada de cima, ferramentas alinhadas, luz fria. Composição geométrica.",
      ratio: "3/2",
      texture: "steel",
    },
  },
  {
    id: "g3",
    category: "Detalhe",
    title: "Navalha",
    span: "small",
    media: {
      alt: "Navalha aberta sobre superfície escura",
      brief: "Navalha aberta, reflexo da luz no aço. Macro.",
      ratio: "1/1",
      texture: "blade",
    },
  },
  {
    id: "g4",
    category: "Barba",
    title: "Contorno",
    span: "square",
    media: {
      alt: "Barba com contorno marcado",
      brief: "Close do contorno da barba, pele com textura, sombra dura.",
      ratio: "4/5",
      texture: "line",
    },
  },
  {
    id: "g5",
    category: "Bastidor",
    title: "Na cadeira",
    span: "wide",
    media: {
      alt: "Barbeiro trabalhando com cliente na cadeira",
      brief: "Plano médio do barbeiro trabalhando, movimento das mãos, leve desfoque.",
      ratio: "16/9",
      texture: "strips",
    },
  },
  {
    id: "g6",
    category: "Corte",
    title: "Textura",
    span: "tall",
    media: {
      alt: "Cabelo com textura no topo",
      brief: "Retrato frontal com textura no topo, olhar direto. Luz de sódio lateral.",
      ratio: "2/3",
      texture: "texture",
    },
  },
  {
    id: "g7",
    category: "Rua",
    title: "Saída",
    span: "square",
    media: {
      alt: "Cliente saindo da barbearia à noite",
      brief: "Cliente na calçada à noite, luz de poste, asfalto molhado. Clima de campanha.",
      ratio: "4/5",
      texture: "asphalt",
    },
  },
  {
    id: "g8",
    category: "Detalhe",
    title: "Espelho",
    span: "small",
    media: {
      alt: "Reflexo no espelho da barbearia",
      brief: "Reflexo parcial no espelho, enquadramento cortado, luz de bancada.",
      ratio: "1/1",
      texture: "mirror",
    },
  },
];
