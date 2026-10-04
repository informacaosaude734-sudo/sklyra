import type { MetadataRoute } from "next";
import { asset } from "@/lib/base";

// Gerado no build (também funciona na exportação estática).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VX Barbearia — Rio de Janeiro",
    short_name: "VX",
    description: "Barbearia no Rio de Janeiro. Corte, barba e acabamento com hora marcada.",
    start_url: asset("/"),
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    lang: "pt-BR",
    icons: [
      { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: asset("/icon-512-maskable.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
