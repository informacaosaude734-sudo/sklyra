/**
 * Formatação + placeholders.
 * Todo dado não informado vira um texto entre colchetes, visível e fácil de achar.
 */

export const PH = {
  price: "R$ [PREÇO]",
  duration: "[XX] MIN",
  address: "[ENDEREÇO REAL A INSERIR]",
  whatsapp: "[NÚMERO]",
  instagram: "[@USUARIO]",
  hours: "[HORÁRIOS]",
  year: "[ANO]",
  barberName: "[NOME DO BARBEIRO]",
  specialty: "[ESPECIALIDADE]",
} as const;

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export const formatPrice = (price: number | null) =>
  price == null ? PH.price : brl.format(price).replace(/ /g, " ");

export const formatDuration = (min: number | null) =>
  min == null ? PH.duration : `${min} MIN`;

/** "5521999999999" → "+55 21 99999-9999" */
export function formatWhatsapp(n: string) {
  if (!n) return PH.whatsapp;
  const m = n.match(/^(55)(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `+${m[1]} ${m[2]} ${m[3]}-${m[4]}` : `+${n}`;
}

export const formatInstagram = (user: string) =>
  user ? `@${user.replace(/^@/, "")}` : PH.instagram;

export const isPlaceholder = (text: string) => /^\[.*\]$|\[[A-ZÀ-Ú@ ]+\]/.test(text);
