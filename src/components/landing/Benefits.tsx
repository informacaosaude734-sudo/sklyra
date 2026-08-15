import * as React from "react";
import { useT } from "@/i18n";
import {
  IntegrationCard,
  IntegrationsSection,
} from "@/components/ui/integrations-component";
import SectionHeader from "./SectionHeader";

import chromeLogo from "@/assets/logos/brands/chrome.svg";
import facebookLogo from "@/assets/logos/brands/facebook.svg";
import gmailLogo from "@/assets/logos/brands/gmail.svg";
import googleLogo from "@/assets/logos/brands/google.svg";
import googleMapsLogo from "@/assets/logos/brands/google-maps.svg";
import instagramLogo from "@/assets/logos/brands/instagram.svg";
import whatsappLogo from "@/assets/logos/brands/whatsapp.svg";

/**
 * The cluster shows the platforms we put the client on — same idea as the
 * reference block's GitHub/Slack/Notion row.
 *
 * Marks are the official files from svgl.app, in src/assets/logos/brands, and
 * are rendered as plain <img>. Swapping one for a PNG is just changing the
 * import to a .png of the same name — nothing else needs to change.
 */
type Platform = {
  name: string;
  src: string;
  featured?: boolean;
};

/** Order matters — the array is sliced into the 2 / 3 / 2 cluster below. */
const PLATFORMS: Platform[] = [
  // row 1
  { name: "Instagram", src: instagramLogo },
  { name: "Facebook", src: facebookLogo },
  // row 2 — Google Maps dead centre, it's the one that drives local calls
  { name: "Google", src: googleLogo },
  { name: "Google Maps", src: googleMapsLogo, featured: true },
  { name: "WhatsApp", src: whatsappLogo },
  // row 3
  { name: "Gmail", src: gmailLogo },
  { name: "Google Chrome", src: chromeLogo },
];

/** Tiles per row — 2/3/2 over 7 platforms, same shape as the reference block. */
const ROW_SIZES = [2, 3, 2];

const Benefits = () => {
  const { t } = useT();

  // Slice the flat list into the 2/3/2 cluster the section expects.
  const rows: React.ReactNode[][] = [];
  let cursor = 0;
  for (const size of ROW_SIZES) {
    rows.push(
      PLATFORMS.slice(cursor, cursor + size).map((platform) => (
        <IntegrationCard
          key={platform.name}
          label={platform.name}
          borderClassName={
            platform.featured
              ? "border-primary/50 shadow-xl shadow-primary/10"
              : undefined
          }
          className={platform.featured ? "bg-white/[0.06]" : undefined}
        >
          <img
            alt=""
            aria-hidden
            className="pointer-events-none select-none object-contain"
            loading="lazy"
            src={platform.src}
          />
        </IntegrationCard>
      ))
    );
    cursor += size;
  }

  return (
    <IntegrationsSection
      rows={rows}
      header={
        <SectionHeader
          eyebrow={t("marquee.title")}
          title={t("marquee.headline")}
          description={t("marquee.desc")}
          className="mb-12"
        />
      }
    />
  );
};

export default Benefits;
