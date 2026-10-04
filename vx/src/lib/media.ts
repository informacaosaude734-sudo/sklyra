/**
 * Referência de mídia usada em todo o site.
 *
 * Sem `src`, o quadro vira um placeholder de direção de arte: textura gerada
 * da VX + a pauta da foto (`brief`) que deve ocupar aquele lugar.
 */

export type Ratio = "4/5" | "3/4" | "2/3" | "1/1" | "3/2" | "16/9" | "21/9";

/** Texturas geradas para a VX (public/media/textures). */
export type Texture =
  | "fade"
  | "texture"
  | "line"
  | "blade"
  | "steel"
  | "strips"
  | "concrete"
  | "asphalt"
  | "mirror";

export type MediaRef = {
  /** Caminho em /public, ex.: "/media/fotos/corte-01.jpg". */
  src?: string;
  /** Texto alternativo da foto real. */
  alt: string;
  /** Pauta fotográfica mostrada enquanto não houver foto. */
  brief: string;
  ratio: Ratio;
  /** Textura de fundo do placeholder. */
  texture?: Texture;
  /** Enquadramento (object-position) da foto real. */
  position?: string;
};

export const TEXTURE_SRC: Record<Texture, string> = {
  fade: "/media/textures/fade.webp",
  texture: "/media/textures/texture.webp",
  line: "/media/textures/line.webp",
  blade: "/media/textures/blade.webp",
  steel: "/media/textures/steel.webp",
  strips: "/media/textures/strips.webp",
  concrete: "/media/textures/concrete.webp",
  asphalt: "/media/textures/asphalt.webp",
  mirror: "/media/textures/mirror.webp",
};

export const ratioToNumber = (r: Ratio) => {
  const [w, h] = r.split("/").map(Number);
  return w / h;
};
