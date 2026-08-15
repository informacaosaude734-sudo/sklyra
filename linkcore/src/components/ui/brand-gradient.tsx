"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Adapted from the 21st.dev "Floating Gradient" component — the same drifting
 * blurred blobs, recolored to the brand red and turned into a full-bleed
 * background layer instead of a self-contained card.
 */
export function BrandGradient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute h-[36rem] w-[36rem] rounded-full bg-gradient-to-r from-brand to-brand-deep opacity-[0.18] blur-3xl"
        animate={{ x: [0, 120, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-14%", left: "-8%" }}
      />
      <motion.div
        className="absolute h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-brand-soft to-brand opacity-[0.13] blur-3xl"
        animate={{ x: [0, -110, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-16%", right: "-6%" }}
      />
      <motion.div
        className="absolute h-[26rem] w-[26rem] rounded-full bg-gradient-to-r from-brand-deep to-brand opacity-[0.10] blur-3xl"
        animate={{ x: [0, 70, 0], y: [0, -90, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "40%", left: "45%" }}
      />
    </div>
  );
}

export default BrandGradient;
