/**
 * Geometria do monograma VX.
 *
 * Um X de hastes grossas, partido por uma linha horizontal no meio.
 * Metade de cima = V. Metade de baixo = o reflexo do V (Λ). Juntas = X.
 *
 * Unidades: caixa W × H. Usado pelo SVG (2D) e pela extrusão 3D.
 */

export const MARK = {
  W: 88,
  H: 100,
  /** espessura horizontal da haste */
  t: 24,
  /** abertura da linha de corte */
  gap: 4,
} as const;

export type Pt = readonly [number, number];

export function markHalves(gap: number = MARK.gap) {
  const { W, H, t } = MARK;
  // altura onde as bordas internas das hastes se encontram (fundo do "V")
  const yi = (H * (W - 2 * t)) / (2 * (W - t));
  const yc = H / 2 - gap / 2;
  const xl = ((W - t) * yc) / H;
  const top: Pt[] = [
    [0, 0],
    [t, 0],
    [t + ((W - t) * yi) / H, yi],
    [W - t, 0],
    [W, 0],
    [W - xl, yc],
    [xl, yc],
  ];
  const bottom: Pt[] = top.map(([x, y]) => [x, H - y] as const);
  return { top, bottom };
}

export const toPoints = (pts: Pt[]) =>
  pts.map(([x, y]) => `${+x.toFixed(2)},${+y.toFixed(2)}`).join(" ");
