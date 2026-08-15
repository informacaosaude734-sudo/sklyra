import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    // 21st components ship imports for both `motion/react` and `framer-motion`.
    // Same runtime, but loading both yields two motion contexts and React
    // throws "Invalid hook call" — every import is normalised to `motion/react`.
    dedupe: ["react", "react-dom", "motion"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "motion", "motion/react"],
  },
  server: { port: 5188, host: true },
});
