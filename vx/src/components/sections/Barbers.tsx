"use client";

import { useState } from "react";
import { BookLink } from "@/components/booking/BookingProvider";
import { Media } from "@/components/media/Media";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { IconInstagram, IconOut } from "@/components/ui/icons";
import { BARBERS, PLACEHOLDER_BARBER_SLOTS, type Barber } from "@/config/brand";
import { cn } from "@/lib/cn";
import { formatInstagram, PH } from "@/lib/format";
import type { MediaRef, Texture } from "@/lib/media";

const PH_TEXTURES: Texture[] = ["steel", "mirror", "strips", "blade"];

type Seat = Barber & { placeholder: boolean; media: MediaRef };

function seats(): Seat[] {
  if (BARBERS.length) {
    return BARBERS.map((b, i) => ({
      ...b,
      placeholder: false,
      media: b.photo ?? {
        alt: `Retrato de ${b.name}`,
        brief: "Retrato meio corpo na cadeira, flash direto, olhar na câmera.",
        ratio: "4/5",
        texture: PH_TEXTURES[i % PH_TEXTURES.length],
      },
    }));
  }
  return Array.from({ length: PLACEHOLDER_BARBER_SLOTS }, (_, i) => ({
    id: `cadeira-${i + 1}`,
    name: "",
    specialty: "",
    placeholder: true,
    media: {
      alt: "Retrato do barbeiro",
      brief: "Retrato meio corpo na cadeira, flash direto, olhar na câmera. Ferramenta na mão.",
      ratio: "4/5",
      texture: PH_TEXTURES[i % PH_TEXTURES.length],
    },
  }));
}

/** "Quem assina o corte." — a equipe. */
export function Barbers() {
  const list = seats();
  const [sel, setSel] = useState(0);

  return (
    <section id="barbeiros" aria-labelledby="barbeiros-title" className="vx-section relative bg-vx-surface">
      <div className="vx-grid gap-y-10">
        <div className="col-span-4 md:col-span-6 lg:col-span-7">
          <p className="t-caps mb-6 text-vx-muted">Barbeiros</p>
          <RevealLines id="barbeiros-title" className="t-display t-l" lines={["Quem assina", "o corte."]} />
        </div>
        <Reveal variant="fade" className="col-span-4 self-end md:col-span-2 lg:col-span-3 lg:col-start-10">
          <p className="t-small max-w-[34ch] text-vx-muted">
            Cada cadeira tem uma mão. Escolha a sua — ou deixe a VX indicar.
          </p>
        </Reveal>
      </div>

      {/* Desktop: retrato grande que troca + lista */}
      <div className="vx-grid mt-16 hidden lg:grid">
        <div className="relative col-span-6">
          <span className="crop-marks" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden">
            {list.map((b, i) => (
              <div
                key={b.id}
                className={cn("barbers__photo absolute inset-0", sel === i && "is-current")}
                aria-hidden={sel !== i}
              >
                <Media media={b.media} sizes="45vw" ratio={false} shift={i + 2} />
              </div>
            ))}
          </div>
        </div>

        <ul className="col-span-5 col-start-8 self-end border-t border-vx-line" aria-label="Equipe">
          {list.map((b, i) => (
            <li key={b.id} className="border-b border-vx-line">
              <div
                className={cn("barbers__row group grid grid-cols-[3rem_1fr] gap-x-4 py-6", sel === i && "is-on")}
                onPointerEnter={() => setSel(i)}
                onFocusCapture={() => setSel(i)}
              >
                <span className="t-num t-small pt-2 text-vx-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    aria-pressed={sel === i}
                    className="block text-left"
                  >
                    <span className={cn("barbers__name t-display t-m block", b.placeholder && "barbers__name--ph")}>
                      {b.name || PH.barberName}
                    </span>
                  </button>
                  <p className={cn("mt-2 text-vx-muted", !b.specialty && "is-ph")}>{b.specialty || PH.specialty}</p>
                  <BarberActions b={b} className="barbers__actions mt-4" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile/tablet: cartões com rolagem lateral */}
      <ul
        className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-[var(--gutter)] overflow-x-auto px-[var(--margin)] pb-4 lg:hidden"
        aria-label="Equipe"
      >
        {list.map((b, i) => (
          <li key={b.id} className="w-[78vw] max-w-sm shrink-0 snap-start md:w-[42vw]">
            <div className="relative">
              <Media media={b.media} sizes="(min-width: 768px) 42vw, 78vw" shift={i + 2} />
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="t-num t-small text-vx-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={cn("t-display t-s", b.placeholder && "text-vx-white/70")}>{b.name || PH.barberName}</h3>
            </div>
            <p className={cn("mt-1 pl-8 text-vx-muted", !b.specialty && "is-ph")}>{b.specialty || PH.specialty}</p>
            <BarberActions b={b} className="mt-4 pl-8" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function BarberActions({ b, className }: { b: Seat; className?: string }) {
  return (
    <div className={cn("t-small flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      {b.bookingUrl ? (
        <a href={b.bookingUrl} target="_blank" rel="noopener noreferrer" className="link-cut is-static inline-flex items-center gap-1 text-vx-white">
          Agenda <IconOut className="size-3.5" />
        </a>
      ) : (
        <BookLink barberId={b.placeholder ? undefined : b.id} className="link-cut is-static text-vx-white">
          {b.placeholder ? "Agendar" : `Agendar com ${b.name.split(" ")[0]}`}
        </BookLink>
      )}
      {b.instagram ? (
        <a
          href={`https://instagram.com/${b.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-vx-muted transition-colors hover:text-vx-white"
        >
          <IconInstagram className="size-4" /> {formatInstagram(b.instagram)}
        </a>
      ) : b.placeholder ? (
        <span className="is-ph inline-flex items-center gap-2">
          <IconInstagram className="size-4" /> {PH.instagram}
        </span>
      ) : null}
    </div>
  );
}
