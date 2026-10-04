"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { useScroll } from "@/components/motion/SmoothScroll";
import { IconClose } from "@/components/ui/icons";
import { GALLERY } from "@/data/gallery";
import { cn } from "@/lib/cn";

/**
 * Posições no grid editorial (mobile 4 col · tablet 8 · desktop 12).
 * Assimetria proposital: nenhum quadro alinha com o vizinho por completo.
 */
const PLACE = [
  "col-span-4 md:col-span-5 lg:col-span-5 lg:row-span-2",
  "col-span-3 col-start-2 md:col-span-3 md:col-start-6 md:mt-24 lg:col-span-6 lg:col-start-7 lg:mt-0",
  "col-span-2 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-7",
  "col-span-2 mt-16 md:col-span-4 md:col-start-1 md:mt-0 lg:col-span-3 lg:col-start-10 lg:mt-16",
  "col-span-4 md:col-span-6 md:col-start-3 lg:col-span-7 lg:col-start-2",
  "col-span-3 md:col-span-3 md:col-start-1 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:mt-24",
  "col-span-2 col-start-3 md:col-span-4 md:col-start-5 md:-mt-32 lg:col-span-4 lg:col-start-1 lg:mt-0",
  "col-span-2 col-start-1 -mt-20 md:col-span-3 md:col-start-2 md:mt-0 lg:col-span-3 lg:col-start-6 lg:mt-12",
];

const SIZES = [
  "(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw",
  "(min-width: 1024px) 48vw, (min-width: 768px) 36vw, 75vw",
  "(min-width: 1024px) 24vw, (min-width: 768px) 36vw, 50vw",
  "(min-width: 1024px) 24vw, (min-width: 768px) 48vw, 50vw",
  "(min-width: 1024px) 56vw, (min-width: 768px) 72vw, 100vw",
  "(min-width: 1024px) 24vw, (min-width: 768px) 36vw, 75vw",
  "(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 50vw",
  "(min-width: 1024px) 24vw, (min-width: 768px) 36vw, 50vw",
];

export function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { lock, unlock } = useScroll();

  const open = (i: number) => {
    setCurrent(i);
    dialogRef.current?.showModal();
    lock();
  };

  const step = useCallback((d: number) => {
    setCurrent((c) => (c == null ? c : (c + d + GALLERY.length) % GALLERY.length));
  }, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      unlock();
      setCurrent(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === dlg) dlg.close();
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("click", onClick);
    return () => {
      dlg.removeEventListener("close", onClose);
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("click", onClick);
    };
  }, [step, unlock]);

  const item = current == null ? null : GALLERY[current];

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="vx-section relative">
      <div className="vx-grid gap-y-8">
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <p className="t-caps mb-6 text-vx-muted">Galeria</p>
          <RevealLines id="galeria-title" className="t-display t-l" lines={["Do espelho", "pra rua."]} />
        </div>
        <Reveal variant="fade" className="col-span-4 self-end md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10">
          <p className="t-small max-w-[34ch] text-vx-muted">
            Cortes, barbas e bastidores da cadeira. Toque em uma foto para ampliar.
          </p>
        </Reveal>
      </div>

      <ul className="vx-grid mt-14 grid-flow-row-dense items-start gap-y-10 md:mt-20 lg:gap-y-14">
        {GALLERY.map((g, i) => (
          <li key={g.id} className={cn("gallery__item", PLACE[i % PLACE.length])}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full text-left"
              data-cursor="view"
              aria-label={`Ampliar: ${g.title} — ${g.category}`}
            >
              <Reveal variant="cut" className="relative overflow-hidden" delay={(i % 3) * 90}>
                <div className="gallery__zoom">
                  <Media media={g.media} sizes={SIZES[i % SIZES.length]} shift={i} showBrief={false} />
                </div>
              </Reveal>
              <span className="mt-3 flex items-baseline justify-between gap-4">
                <span className="t-small text-vx-white">{g.title}</span>
                <span className="t-small text-vx-muted">
                  {g.category}
                  {g.barber ? ` · ${g.barber}` : ""}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} className="vx-lightbox" aria-label="Galeria ampliada">
        {item && (
          <div className="flex h-full flex-col">
            <div className="vx-container flex h-[var(--nav-h-compact)] shrink-0 items-center justify-between">
              <p className="t-caps t-num text-vx-muted">
                {String((current ?? 0) + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="-mr-2 grid size-11 place-items-center text-vx-white"
                aria-label="Fechar galeria"
              >
                <IconClose className="size-5" />
              </button>
            </div>
            <div className="vx-container flex min-h-0 flex-1 items-center justify-center pb-4">
              <div
                key={item.id}
                className="vx-lightbox__frame relative h-full max-h-[78dvh] max-w-full"
                style={{ aspectRatio: item.media.ratio }}
              >
                <Media media={item.media} sizes="90vw" ratio={false} shift={current ?? 0} />
              </div>
            </div>
            <div className="vx-container flex shrink-0 items-center justify-between gap-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <button type="button" onClick={() => step(-1)} className="btn btn-ghost min-h-11 px-4">
                Anterior
              </button>
              <p className="t-small text-center">
                {item.title} <span className="text-vx-muted">— {item.category}</span>
              </p>
              <button type="button" onClick={() => step(1)} className="btn btn-ghost min-h-11 px-4">
                Próxima
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
