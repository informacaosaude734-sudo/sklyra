"use client";

import { useEffect, useRef, useState } from "react";
import { BookLink, useBooking } from "@/components/booking/BookingProvider";
import { Media } from "@/components/media/Media";
import { gsap } from "@/components/motion/gsap";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { useMediaQuery } from "@/components/motion/useMediaQuery";
import { SERVICES } from "@/config/brand";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice } from "@/lib/format";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Lista editorial de serviços. Desktop: ao passar o mouse (ou focar), a linha
 * acende, o nome se expande, preço e duração aparecem e uma foto flutua junto
 * ao cursor. Mobile: toque abre a linha com foto, descrição e agendamento.
 */
export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState(0);
  const [hovering, setHovering] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { open: openBooking } = useBooking();

  // Foto flutuante que segue o cursor (só ponteiro fino).
  useEffect(() => {
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float || !isFinePointer()) return;
    const reduce = prefersReducedMotion();
    const xTo = gsap.quickTo(float, "x", { duration: reduce ? 0 : 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(float, "y", { duration: reduce ? 0 : 0.7, ease: "power3.out" });
    const rTo = gsap.quickTo(float, "rotate", { duration: reduce ? 0 : 0.9, ease: "power3.out" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      xTo(x);
      yTo(y);
      if (!reduce) rTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    };
    list.addEventListener("pointermove", move);
    return () => list.removeEventListener("pointermove", move);
  }, []);

  return (
    <section id="cortes" aria-labelledby="servicos-title" className="vx-section relative">
      <div className="vx-grid gap-y-10">
        <div className="col-span-4 md:col-span-6 lg:col-span-7">
          <p className="t-caps mb-6 text-vx-muted">Serviços</p>
          <RevealLines
            id="servicos-title"
            className="t-display t-l"
            lines={["Cinco jeitos", "de sair diferente."]}
          />
        </div>
        <Reveal
          variant="fade"
          className="col-span-4 self-end md:col-span-2 lg:col-span-3 lg:col-start-10"
        >
          <p className="t-small max-w-[34ch] text-vx-muted">
            Valor e tempo de cadeira de cada serviço. Escolha aqui e agende direto.
          </p>
        </Reveal>
      </div>

      <div
        ref={listRef}
        className="vx-container relative mt-14 lg:mt-20"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => {
          setHovering(false);
          setActive(null);
        }}
      >
        <ol className="services relative border-t border-vx-line">
          {SERVICES.map((s, i) => {
            const on = active === i;
            const isOpen = open === i;
            const price = formatPrice(s.price);
            const duration = formatDuration(s.durationMin);
            return (
              <li
                key={s.id}
                className={cn("services__row group relative border-b border-vx-line", on && "is-active", isOpen && "is-open")}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor={desktop ? "book" : undefined}
              >
                <span aria-hidden className="services__wash" />
                <h3 className="relative">
                  <button
                    type="button"
                    className="services__head grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-6 text-left md:grid-cols-[3.5rem_1fr_auto] lg:grid-cols-12 lg:gap-x-[var(--gutter)] lg:py-8"
                    aria-expanded={desktop ? undefined : isOpen}
                    aria-controls={desktop ? undefined : `servico-${s.id}`}
                    aria-label={desktop ? `${s.name}: ${price}, ${duration}. Agendar` : undefined}
                    onClick={() => (desktop ? openBooking({ serviceId: s.id }) : setOpen(isOpen ? -1 : i))}
                  >
                    <span className="t-num t-small text-vx-muted lg:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="services__name t-display t-m lg:col-span-5">{s.name}</span>
                    <span className="services__desc hidden text-vx-muted lg:col-span-3 lg:block">
                      {s.description}
                    </span>
                    <span className="services__meta t-num text-right lg:col-span-2 lg:col-start-10">
                      <span className={cn("block font-semibold", s.price == null && "is-ph font-normal")}>{price}</span>
                      <span className={cn("t-small block text-vx-muted", s.durationMin == null && "is-ph")}>{duration}</span>
                    </span>
                  </button>
                </h3>

                {/* Painel (mobile/tablet). No desktop, o agendamento fica na própria linha. */}
                <div id={`servico-${s.id}`} className="services__panel lg:hidden" aria-hidden={!isOpen}>
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 pb-8 md:grid-cols-[3.5rem_1fr]">
                      <div className="col-start-2 space-y-5">
                        <p className="max-w-[44ch] text-vx-white/80">{s.description}</p>
                        <Media media={s.media} sizes="(min-width: 768px) 60vw, 85vw" ratio="3/2" className="max-w-xl" showBrief={false} />
                        <BookLink serviceId={s.id} className="btn btn-primary" tabIndex={isOpen ? 0 : -1}>
                          Agendar {s.name.toLowerCase()}
                        </BookLink>
                      </div>
                    </div>
                  </div>
                </div>

                <span aria-hidden className="services__book t-caps pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-vx-white lg:inline-flex">
                  <span className="lit" />
                  Agendar
                </span>
              </li>
            );
          })}
        </ol>

        {/* Foto que acompanha o cursor (desktop). */}
          <div
            ref={floatRef}
            aria-hidden
            className={cn("services__float pointer-events-none absolute left-0 top-0 z-20 hidden lg:block", hovering && active !== null && "is-on")}
          >
            <div className="services__float-inner">
              {SERVICES.map((s, i) => (
                <div key={s.id} className={cn("services__float-img absolute inset-0", active === i && "is-current")}>
                  <Media media={s.media} sizes="22vw" ratio={false} showBrief={false} />
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
