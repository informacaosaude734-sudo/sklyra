"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Desloca o conteúdo em velocidade diferente do scroll.
 * `amount` em % da altura do próprio elemento. Desligado com movimento reduzido.
 */
export function Parallax({
  children,
  amount = 10,
  scale = 1.12,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  scale?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !inner.current) return;
      gsap.fromTo(
        inner.current,
        { yPercent: -amount / 2, scale },
        {
          yPercent: amount / 2,
          scale,
          ease: "none",
          scrollTrigger: { trigger: outer.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: outer },
  );

  return (
    <div ref={outer} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
