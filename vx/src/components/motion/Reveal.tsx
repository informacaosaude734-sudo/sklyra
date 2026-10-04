"use client";

import { useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "./useInView";

type Tag = "div" | "span" | "section" | "p" | "dl" | "ul" | "ol" | "li" | "h1" | "h2" | "h3" | "figure";

type RevealProps = {
  as?: Tag;
  /**
   * "cut" abre a partir da linha central (imagens), "fade" só opacidade,
   * "draw" desenha linhas filhas `.cut-line`, "none" só marca `.is-in`.
   */
  variant?: "cut" | "fade" | "draw" | "none";
  delay?: number;
  rootMargin?: string;
} & HTMLAttributes<HTMLElement>;

/** Adiciona `.is-in` quando entra na tela. O CSS define o movimento. */
export function Reveal({
  as = "div",
  variant = "cut",
  delay = 0,
  rootMargin,
  className,
  style,
  ...rest
}: RevealProps) {
  const Comp = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, rootMargin ? { rootMargin } : undefined);
  return (
    <Comp
      ref={ref}
      className={cn(variant !== "none" && `reveal-${variant}`, inView && "is-in", className)}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    />
  );
}

/**
 * Título com linhas reveladas por máscara. Cada item de `lines` é uma linha.
 * O texto continua sendo um heading normal para leitores de tela.
 */
export function RevealLines({
  as = "h2",
  lines,
  className,
  delay = 0,
  ...rest
}: {
  as?: Tag;
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
} & Omit<HTMLAttributes<HTMLElement>, "children">) {
  const Comp = as as "h2";
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref);
  return (
    <Comp ref={ref} className={cn(inView && "is-in", className)} {...rest}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line" style={{ "--i": i + delay } as React.CSSProperties}>
          <span>{line}</span>
        </span>
      ))}
    </Comp>
  );
}
