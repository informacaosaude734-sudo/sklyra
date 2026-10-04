/** Espelho em JS dos tokens de movimento do CSS (para GSAP). */
export const DUR = {
  fast: 0.16,
  ui: 0.32,
  reveal: 0.8,
  cinema: 1.2,
} as const;

/** cubic-bezier(0.22, 1, 0.36, 1) */
export const EASE_VX = "vx";
export const EASE_VX_BEZIER = "0.22,1,0.36,1";
export const EASE_VX_IN_OUT = "power3.inOut";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
