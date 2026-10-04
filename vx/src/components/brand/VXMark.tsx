import { MARK, markHalves, toPoints } from "@/lib/mark";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Cor da metade de baixo (o reflexo). Padrão: a mesma do V. */
  reflection?: "same" | "metal" | "dim";
  /** Abertura da linha de corte, em unidades da caixa (0–10). */
  gap?: number;
  title?: string;
};

/**
 * Monograma VX em SVG. O V em cima, o reflexo embaixo, a linha de corte entre eles.
 * Classes `.vx-top` / `.vx-bottom` permitem animar as metades separadamente.
 */
export function VXMark({ className, reflection = "same", gap = MARK.gap, title }: Props) {
  const { top, bottom } = markHalves(gap);
  const pad = 1;
  const bottomFill =
    reflection === "metal"
      ? "var(--color-vx-metal)"
      : reflection === "dim"
        ? "var(--color-vx-dim)"
        : "currentColor";
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${MARK.W + pad * 2} ${MARK.H + pad * 2}`}
      className={cn("vx-mark", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      <polygon className="vx-top" points={toPoints(top)} />
      <polygon className="vx-bottom" points={toPoints(bottom)} fill={bottomFill} />
    </svg>
  );
}

/** Lockup: monograma + "VX" em Mona Sans expandida. */
export function VXLockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <VXMark className="h-[1.6em] w-auto" reflection="metal" />
      <span className="font-display text-[1.05em] font-[860] leading-none tracking-[-0.01em] [font-stretch:125%]">
        VX
      </span>
    </span>
  );
}
