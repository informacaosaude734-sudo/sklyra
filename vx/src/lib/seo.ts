import {
  ADDRESS,
  ADDRESS_PARTS,
  BARBERSHOP_NAME,
  CITY,
  EMAIL,
  INSTAGRAM,
  MAP_URL,
  PHONE,
  SERVICES,
  SITE_URL,
  STATE,
  WHATSAPP_NUMBER,
} from "@/config/brand";
import { hasHours, schemaOpeningHours } from "@/lib/hours";

export const SEO = {
  title: "VX — Barbearia no Rio de Janeiro | Corte masculino e barba",
  description:
    "VX é uma barbearia no Rio de Janeiro: corte masculino, barba e acabamento com hora marcada. Agende online ou pelo WhatsApp.",
};

/**
 * Dados estruturados de negócio local. Só é publicado quando o endereço real
 * existir — nada de endereço, telefone ou horário inventado.
 */
export function localBusinessJsonLd() {
  if (!ADDRESS) return null;
  const sameAs = [INSTAGRAM && `https://instagram.com/${INSTAGRAM}`].filter(Boolean);
  const telephone = PHONE || (WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : undefined);
  const offers = SERVICES.filter((s) => s.price != null).map((s) => ({
    "@type": "Offer",
    name: s.name,
    price: s.price,
    priceCurrency: "BRL",
  }));
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${SITE_URL}/#vx`,
    name: `${BARBERSHOP_NAME} Barbearia`,
    description: SEO.description,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    ...(telephone ? { telephone } : {}),
    ...(EMAIL ? { email: EMAIL } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_PARTS.street || ADDRESS,
      ...(ADDRESS_PARTS.neighborhood ? { addressNeighborhood: ADDRESS_PARTS.neighborhood } : {}),
      addressLocality: CITY,
      addressRegion: STATE,
      ...(ADDRESS_PARTS.postalCode ? { postalCode: ADDRESS_PARTS.postalCode } : {}),
      addressCountry: "BR",
    },
    ...(MAP_URL ? { hasMap: MAP_URL } : {}),
    ...(hasHours ? { openingHoursSpecification: schemaOpeningHours() } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(offers.length ? { makesOffer: offers } : {}),
    areaServed: { "@type": "City", name: CITY },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${BARBERSHOP_NAME} Barbearia`,
    url: SITE_URL,
    inLanguage: "pt-BR",
  };
}
