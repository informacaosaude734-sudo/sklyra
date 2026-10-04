"use client";

import { useRef } from "react";
import { Media } from "@/components/media/Media";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { useMediaQuery } from "@/components/motion/useMediaQuery";
import { SPACE } from "@/data/space";
import { cn } from "@/lib/cn";

const OFFSET = ["lg:mt-0", "lg:mt-[14vh]", "lg:mt-[4vh]", "lg:mt-[18vh]", "lg:mt-[8vh]"];
const HEIGHT = ["lg:h-[62vh]", "lg:h-[54vh]", "lg:h-[64vh]", "lg:h-[50vh]", "lg:h-[60vh]"];

/**
 * "Entra. Senta. Deixa com a gente." — a unidade física.
 * Desktop: sequência horizontal conduzida pelo scroll vertical.
 * Mobile / movimento reduzido: faixa com rolagem lateral nativa (swipe).
 */
export function Space() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pinned = desktop && !reduce;

  useGSAP(
    () => {
      const el = track.current;
      if (!pinned || !el || !root.current) return;
      const distance = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    },
    { dependencies: [pinned], scope: root, revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      aria-labelledby="espaco-title"
      className={cn("relative overflow-hidden", pinned ? "h-[100svh]" : "vx-section")}
    >
      <div
        ref={track}
        className={cn(
          "flex gap-[var(--gutter)]",
          pinned
            ? "h-full w-max items-start pl-[var(--margin)] pr-[18vw] pt-[calc(var(--nav-h-compact)+3rem)]"
            : "flex-col",
        )}
      >
        <div className={cn("shrink-0", pinned ? "flex h-[78vh] w-[34vw] flex-col justify-between pr-[4vw]" : "vx-container")}>
          <div>
            <p className="t-caps mb-6 text-vx-muted">O espaço</p>
            <h2 id="espaco-title" className="t-display t-xl">
              Entra.
              <br />
              Senta.
              <br />
              Deixa com
              <br />
              a gente.
            </h2>
          </div>
          <p className={cn("max-w-[32ch] text-vx-muted", !pinned && "mt-8")}>
            Concreto, aço, vidro escuro e luz no lugar certo. Um lugar feito para você sentar,
            confiar e sair outro.
          </p>
        </div>

        <ol
          className={cn(
            "flex gap-[var(--gutter)]",
            pinned
              ? "items-start"
              : "scrollbar-none mt-12 snap-x snap-mandatory overflow-x-auto px-[var(--margin)] pb-4 [scroll-padding-inline:var(--margin)]",
          )}
          aria-label="Detalhes do espaço"
        >
          {SPACE.map((p, i) => (
            <li
              key={p.id}
              className={cn(
                "shrink-0 snap-start",
                pinned ? cn("w-[30vw]", OFFSET[i % OFFSET.length]) : "w-[72vw] max-w-sm md:w-[44vw]",
              )}
            >
              <div className={cn("relative", pinned && HEIGHT[i % HEIGHT.length])}>
                <span className="crop-marks hidden lg:block" aria-hidden />
                <Media
                  media={p.media}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 44vw, 72vw"
                  ratio={pinned ? false : p.media.ratio}
                  shift={i + 1}
                  frame={String(i + 1).padStart(2, "0")}
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="t-display t-s">{p.name}</h3>
              </div>
              <p className="mt-1 max-w-[30ch] text-vx-muted">{p.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
