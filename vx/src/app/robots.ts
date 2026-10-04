import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/brand";
import { asset } from "@/lib/base";

// Gerado no build (também funciona na exportação estática).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: [asset("/lab")] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
