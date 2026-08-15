import { useRef, useCallback, type MouseEvent } from "react";

/**
 * Framer-style cursor follow glow.
 * Attach spread props to a container to make a radial glow follow the mouse.
 * Pair with a child element using: bg-[radial-gradient(400px_circle_at_var(--mx)_var(--my),hsl(var(--primary)/0.18),transparent_60%)]
 */
export const useMouseGlow = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }, []);

  return { ref, onMouseMove };
};
