import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Framer-style ambient background.
 * On mobile / reduced-motion: static blobs (no infinite animation, smaller blur)
 * to keep the GPU idle and LCP fast.
 */
const FramerBackground = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    setAnimate(mq.matches);
    const handler = (e: MediaQueryListEvent) => setAnimate(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const blur = animate ? 120 : 70;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[140vh] z-0 overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,hsl(var(--primary)/0.05),transparent_60%)]" />

      {/* Grid with radial fade mask - desktop only, heavy to composite */}
      {animate && (
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(0 0% 100% / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
          }}
        />
      )}

      {animate ? (
        <>
          <motion.div
            className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full"
            style={{ background: "hsl(var(--primary) / 0.10)", filter: `blur(${blur}px)` }}
            animate={{ x: [0, 60, -20, 0], y: [0, 40, 10, 0], scale: [1, 1.06, 0.96, 1] }}
            transition={{ duration: 22, ease: [0.45, 0.05, 0.55, 0.95], repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full"
            style={{ background: "hsl(var(--primary) / 0.07)", filter: `blur(${blur + 20}px)` }}
            animate={{ x: [0, -40, 20, 0], y: [0, -30, 30, 0], scale: [1, 1.08, 0.94, 1] }}
            transition={{ duration: 28, ease: [0.45, 0.05, 0.55, 0.95], repeat: Infinity }}
          />
          {/* Slow rotating conic light */}
          <motion.div
            className="absolute top-[30%] left-1/2 w-[900px] h-[900px] rounded-full opacity-[0.05]"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary) / 0.9) 90deg, transparent 180deg, hsl(var(--primary-glow) / 0.7) 270deg, transparent 360deg)",
              filter: "blur(80px)",
              translate: "-50% -50%",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute -top-40 -left-32 w-[380px] h-[380px] rounded-full"
            style={{ background: "hsl(var(--primary) / 0.08)", filter: `blur(${blur}px)` }}
          />
          <div
            className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full"
            style={{ background: "hsl(var(--primary) / 0.05)", filter: `blur(${blur}px)` }}
          />
        </>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background))_100%)]" />
    </div>
  );
};

export default FramerBackground;
