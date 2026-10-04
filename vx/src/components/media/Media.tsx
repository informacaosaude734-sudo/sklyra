import Image from "next/image";
import { SHOW_PHOTO_BRIEFS } from "@/config/brand";
import { cn } from "@/lib/cn";
import { TEXTURE_SRC, type MediaRef } from "@/lib/media";

type Props = {
  media: MediaRef;
  sizes: string;
  className?: string;
  /** Proporção do quadro. Padrão: a da mídia. `false` = preenche o pai. */
  ratio?: false | string;
  priority?: boolean;
  /** Número do quadro (folha de contato). */
  frame?: string;
  /** Variação de enquadramento da textura, para quadros vizinhos não repetirem. */
  shift?: number;
  imgClassName?: string;
  showBrief?: boolean;
};

/**
 * Quadro de foto. Com `src`, mostra a foto real otimizada.
 * Sem `src`, mostra a textura da marca + a pauta da foto que deve entrar ali.
 */
export function Media({
  media,
  sizes,
  className,
  ratio,
  priority,
  frame,
  shift = 0,
  imgClassName,
  showBrief = true,
}: Props) {
  const aspect = ratio === false ? undefined : (ratio ?? media.ratio);
  const isReal = Boolean(media.src);
  const positions = ["50% 50%", "20% 30%", "80% 70%", "35% 85%", "70% 15%", "10% 60%"];

  return (
    <div
      className={cn("relative overflow-hidden bg-vx-surface", ratio === false && "h-full", className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {isReal ? (
        <Image
          src={media.src!}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={82}
          className={cn("object-cover", imgClassName)}
          style={media.position ? { objectPosition: media.position } : undefined}
        />
      ) : (
        <>
          <Image
            src={TEXTURE_SRC[media.texture ?? "concrete"]}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            quality={70}
            className={cn("object-cover", imgClassName)}
            style={{
              objectPosition: positions[shift % positions.length],
              transform: shift % 2 ? "scaleX(-1)" : undefined,
            }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-vx-black/80 via-vx-black/10 to-transparent" />
          {SHOW_PHOTO_BRIEFS && showBrief && (
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
              <p className="t-small max-w-[34ch] text-vx-white/75">
                <span className="t-caps mb-1.5 block text-vx-metal">Foto a produzir</span>
                {media.brief}
              </p>
            </div>
          )}
          <span className="sr-only">{`Imagem ilustrativa: ${media.alt}`}</span>
        </>
      )}
      {frame && (
        <span aria-hidden className="t-caps t-num absolute left-3 top-3 text-[0.625rem] text-vx-white/70 mix-blend-difference">
          {frame}
        </span>
      )}
    </div>
  );
}
