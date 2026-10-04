import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/brand";

// Gerado no build (também funciona na exportação estática).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/agendar`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
