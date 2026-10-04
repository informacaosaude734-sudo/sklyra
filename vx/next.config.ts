import path from "node:path";
import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 gera um site 100% estático em out/ (GitHub Pages, qualquer
 * hospedagem de arquivos). NEXT_PUBLIC_BASE_PATH define a subpasta, ex.: /sklyra.
 * Sem essas variáveis, o build é o normal do Next (Vercel / Node).
 */
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // O repositório tem outro package-lock na raiz: fixa a raiz deste projeto.
  turbopack: { root: path.join(__dirname) },
  basePath,
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  images: {
    unoptimized: isExport,
    formats: ["image/avif", "image/webp"],
    qualities: [70, 82, 90],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
