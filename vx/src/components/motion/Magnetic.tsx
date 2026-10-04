"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Efeito magnético leve. Só em ponteiro fino e sem movimento reduzido.
 * O alvo de clique não muda de tamanho — só o conteúdo desliza.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const xTo = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ padding: "1.25rem", margin: "-1.25rem" }}>
      {children}
    </div>
  );
}
