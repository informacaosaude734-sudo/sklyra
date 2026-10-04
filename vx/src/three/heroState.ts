/**
 * Estado compartilhado entre o DOM e a cena 3D, sem re-render do React.
 * Escrito pelo scroll/ponteiro, lido a cada quadro pelo useFrame.
 */
export const heroState = {
  /** 0 = hero inteiro na tela, 1 = hero saiu */
  progress: 0,
  /** ponteiro normalizado (-1..1) */
  px: 0,
  py: 0,
  /** 0 → 1 durante a montagem inicial */
  intro: 0,
};
