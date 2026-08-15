import { useEffect } from "react";

/**
 * Lenis smooth scrolling — desktop only.
 * Mobile browsers already scroll smoothly with hardware; running Lenis there
 * only adds JS work on every frame and hurts INP/TBT.
 */
const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference), (pointer: fine)");
    if (!mq.matches) return;

    let rafId: number;
    let destroy: (() => void) | undefined;

    // Lazy-import so Lenis is not in the initial bundle
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      destroy = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });

    return () => {
      if (destroy) destroy();
      else if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
};

export default SmoothScroll;
