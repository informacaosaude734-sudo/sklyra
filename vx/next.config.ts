import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // O repositório tem outro package-lock na raiz: fixa a raiz deste projeto.
  turbopack: { root: path.join(__dirname) },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 82, 90],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
