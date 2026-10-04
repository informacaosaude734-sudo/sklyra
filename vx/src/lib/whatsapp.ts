import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/config/brand";

export const hasWhatsapp = WHATSAPP_NUMBER.length >= 10;

/** Link wa.me com mensagem pré-preenchida. `null` se o número não foi configurado. */
export function whatsappUrl(message: string = WHATSAPP_MESSAGE) {
  if (!hasWhatsapp) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
