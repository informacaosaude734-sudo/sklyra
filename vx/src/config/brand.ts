/**
 * VX — dados do negócio.
 *
 * ESTE É O ÚNICO ARQUIVO QUE O PROPRIETÁRIO PRECISA EDITAR PARA PUBLICAR.
 *
 * Regra: nada aqui foi inventado. Todo campo vazio ("" / null / []) aparece no
 * site como um placeholder visível entre colchetes, por exemplo
 * "[ENDEREÇO REAL A INSERIR]". Preencha com dados reais e o placeholder some.
 *
 * Fotos: coloque os arquivos em /public/media/fotos/ e informe o caminho no
 * campo `src` (ex.: "/media/fotos/corte-01.jpg").
 */

import type { MediaRef } from "@/lib/media";

/* ------------------------------------------------------------------ */
/* Identidade                                                          */
/* ------------------------------------------------------------------ */

export const BARBERSHOP_NAME = "VX";
export const CITY = "Rio de Janeiro";
export const STATE = "RJ";
export const COUNTRY = "Brasil";

/** Ano de fundação, ex.: 2021. `null` mostra "EST. [ANO]". */
export const FOUNDED_YEAR: number | null = null;

/**
 * Domínio público do site (sem barra no final). Usado em canonical, sitemap,
 * Open Graph e dados estruturados. Defina NEXT_PUBLIC_SITE_URL no deploy.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/* ------------------------------------------------------------------ */
/* Contato                                                             */
/* ------------------------------------------------------------------ */

/**
 * WhatsApp com DDI + DDD, só números. Ex.: "5521999999999".
 * Também pode vir de NEXT_PUBLIC_WHATSAPP_NUMBER.
 */
export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
).replace(/\D/g, "");
/** Alias pedido no briefing. */
export const WHATSAPP = WHATSAPP_NUMBER;

/** Mensagem pré-preenchida dos botões de WhatsApp. */
export const WHATSAPP_MESSAGE =
  "Olá, vim pelo site da VX e gostaria de agendar um horário.";

/** Usuário do Instagram SEM o @. Ex.: "vxbarber". */
export const INSTAGRAM = "";

/** Endereço completo em uma linha. Ex.: "Rua Exemplo, 123 — Botafogo". */
export const ADDRESS = "";

/** Endereço estruturado (para Google / dados estruturados). Opcional. */
export const ADDRESS_PARTS: {
  street: string;
  neighborhood: string;
  postalCode: string;
} = { street: "", neighborhood: "", postalCode: "" };

/** Link do Google Maps da unidade. */
export const MAP_URL = "";

/** Telefone fixo, se houver (formato livre para exibição). */
export const PHONE = "";

/** E-mail de contato, se houver. */
export const EMAIL = "";

/* ------------------------------------------------------------------ */
/* Horário                                                             */
/* ------------------------------------------------------------------ */

export type Weekday = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export type OpeningHoursSpec = {
  days: Weekday[];
  /** "HH:MM" 24h */
  opens: string;
  /** "HH:MM" 24h */
  closes: string;
};

/**
 * Horário de funcionamento. Vazio = "[HORÁRIOS]" no site e agenda sem
 * bloqueio de dias. Exemplo (NÃO é o horário real):
 *
 *   [{ days: ["Tu", "We", "Th", "Fr"], opens: "10:00", closes: "20:00" },
 *    { days: ["Sa"], opens: "09:00", closes: "18:00" }]
 */
export const OPENING_HOURS: OpeningHoursSpec[] = [];

/* ------------------------------------------------------------------ */
/* Agendamento                                                         */
/* ------------------------------------------------------------------ */

export const BOOKING = {
  /**
   * Link de um sistema externo de agenda (Trinks, AppBarber, Booksy...).
   * Se preenchido, aparece como alternativa no fluxo de agendamento.
   */
  externalUrl: "",
  /** Intervalo entre horários sugeridos no fluxo (minutos). */
  slotIntervalMin: 45,
  /**
   * Janela usada para sugerir horários enquanto OPENING_HOURS estiver vazio.
   * Os horários aparecem como "a confirmar" — a VX confirma pelo WhatsApp.
   */
  fallbackWindow: { opens: "10:00", closes: "19:00" },
  /** Quantos dias à frente a agenda mostra. */
  daysAhead: 21,
};

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  name: string;
  /** Uma frase. Revise com a equipe. */
  description: string;
  /** Preço em reais. `null` mostra "R$ [PREÇO]". */
  price: number | null;
  /** Duração em minutos. `null` mostra "[XX] MIN". */
  durationMin: number | null;
  media: MediaRef;
};

/**
 * Nomes vindos do briefing. Descrições são texto de marca para revisão.
 * PREÇOS E DURAÇÕES NÃO FORAM INFORMADOS — preencha antes de publicar.
 */
export const SERVICES: Service[] = [
  {
    id: "corte",
    name: "Corte",
    description:
      "Tesoura, máquina ou os dois. Desenhado para o formato do seu rosto e para o jeito que você penteia em casa.",
    price: null,
    durationMin: null,
    media: {
      alt: "Barbeiro finalizando um corte degradê",
      brief: "Perfil do cliente na cadeira, máquina encostando na nuca. Flash direto, fundo preto.",
      ratio: "4/5",
      texture: "fade",
    },
  },
  {
    id: "barba",
    name: "Barba",
    description:
      "Toalha quente, navalha e contorno. Linha limpa sem perder o volume que você quer manter.",
    price: null,
    durationMin: null,
    media: {
      alt: "Contorno de barba feito na navalha",
      brief: "Macro da navalha no contorno da barba, espuma, pele com textura. Luz lateral dura.",
      ratio: "4/5",
      texture: "blade",
    },
  },
  {
    id: "corte-barba",
    name: "Corte + Barba",
    description:
      "Cabelo e barba pensados no mesmo desenho, na mesma sessão. O conjunto sai coerente.",
    price: null,
    durationMin: null,
    media: {
      alt: "Cliente com corte e barba finalizados",
      brief: "Retrato 3/4 do resultado final, olhar fora da câmera, espelho ao fundo.",
      ratio: "4/5",
      texture: "steel",
    },
  },
  {
    id: "acabamento",
    name: "Acabamento",
    description:
      "Pezinho, contorno e sobrancelha entre um corte e outro. Rápido, para manter a linha no lugar.",
    price: null,
    durationMin: null,
    media: {
      alt: "Acabamento do pezinho com máquina de detalhe",
      brief: "Close na nuca com máquina de acabamento, linha reta recém-feita. Contraste alto.",
      ratio: "4/5",
      texture: "line",
    },
  },
  {
    id: "experiencia-vx",
    name: "Experiência VX",
    description:
      "O ritual completo, sem pressa. Tempo de cadeira estendido para quem quer sair outra pessoa.",
    price: null,
    durationMin: null,
    media: {
      alt: "Cadeira da VX sob luz baixa",
      brief: "Plano aberto da cadeira vazia, espelho e luz de bancada. Noite, tons frios.",
      ratio: "4/5",
      texture: "strips",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Barbeiros                                                           */
/* ------------------------------------------------------------------ */

export type Barber = {
  id: string;
  name: string;
  specialty: string;
  /** Usuário do Instagram sem @ (opcional). */
  instagram?: string;
  /** Link de agenda individual (opcional). */
  bookingUrl?: string;
  photo?: MediaRef;
};

/**
 * Equipe. Vazio = o site mostra 3 cadeiras com placeholders.
 * Exemplo de entrada:
 *   { id: "nome", name: "Nome", specialty: "Degradê e navalha",
 *     instagram: "usuario", photo: { src: "/media/fotos/nome.jpg", alt: "...", brief: "", ratio: "4/5" } }
 */
export const BARBERS: Barber[] = [];

/** Quantas cadeiras-placeholder mostrar enquanto BARBERS estiver vazio. */
export const PLACEHOLDER_BARBER_SLOTS = 3;

/* ------------------------------------------------------------------ */
/* Fotos                                                               */
/* ------------------------------------------------------------------ */

/**
 * Enquanto as fotos reais não chegam, cada quadro mostra a pauta da foto que
 * deve ocupar aquele lugar. Para publicar sem as pautas (só as texturas da
 * marca), mude para `false`.
 */
export const SHOW_PHOTO_BRIEFS = true;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

/**
 * Vídeo/foto cinematográfico do hero. Enquanto `null`, o hero é conduzido pelo
 * monograma VX em cromo (3D). Exemplo:
 *   { type: "video", src: "/media/hero.mp4", poster: "/media/hero.jpg", alt: "..." }
 */
export const HERO_MEDIA:
  | { type: "video" | "image"; src: string; poster?: string; alt: string }
  | null = null;
