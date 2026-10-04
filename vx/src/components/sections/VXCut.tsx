"use client";

import { useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { useScroll } from "@/components/motion/SmoothScroll";
import { useMediaQuery } from "@/components/motion/useMediaQuery";
import { DETAILS } from "@/data/details";
import { cn } from "@/lib/cn";

const FROM = ["left", "bottom", "right", "top", "center", "left"] as const;

/**
 * "The VX Cut" — seis detalhes contados pelo scroll.
 * Desktop: a seção fixa e as fotos entram uma a uma, cada uma de um lado.
 * Mobile e movimento reduzido: sequência vertical, sem fixar.
 */
export function VXCut() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [idx, setIdx] = useState(0);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pinned = desktop && !reduce;
  const { scrollTo } = useScroll();
  const n = DETAILS.length;

  useGSAP(
    () => {
      if (!pinned || !pin.current) return;
      stRef.current = ScrollTrigger.create({
        trigger: pin.current,
        start: "top top",
        end: () => `+=${window.innerHeight * n * 0.7}`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => setIdx(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
      });
      return () => {
        stRef.current = null;
      };
    },
    { dependencies: [pinned], scope: root, revertOnUpdate: true },
  );

  const jump = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    scrollTo(st.start + ((i + 0.5) / n) * (st.end - st.start));
  };

  return (
    <section ref={root} aria-labelledby="vxcut-title" className="relative">
      {pinned ? (
        <div ref={pin} className="relative h-[100svh] overflow-hidden">
          <div className="vx-grid h-full pb-10 pt-[calc(var(--nav-h-compact)+2.5rem)]">
            <div className="col-span-5 flex h-full flex-col justify-between">
              <div>
                <p className="t-caps mb-6 text-vx-muted">The VX Cut</p>
                <RevealLines id="vxcut-title" className="t-display t-l" lines={["Precisão", "nos detalhes."]} />
              </div>

              <div className="grid grid-cols-5 gap-x-[var(--gutter)]">
                <ol className="col-span-2 space-y-1" aria-label="Detalhes do corte">
                  {DETAILS.map((d, i) => (
                    <li key={d.id}>
                      <button
                        type="button"
                        onClick={() => jump(i)}
                        aria-current={idx === i ? "step" : undefined}
                        className={cn(
                          "group flex w-full items-center gap-3 py-1 text-left transition-colors duration-[var(--dur-ui)]",
                          idx === i ? "text-vx-white" : "text-vx-muted hover:text-vx-white",
                        )}
                      >
                        <span className="t-num t-small w-6">{String(i + 1).padStart(2, "0")}</span>
                        <span className="t-display t-s">{d.name}</span>
                        <span aria-hidden className={cn("lit ml-auto transition-opacity", idx === i ? "opacity-100" : "opacity-0")} />
                      </button>
                    </li>
                  ))}
                </ol>
                <div className="col-span-3 grid self-end" aria-live="polite">
                  {DETAILS.map((d, i) => (
                    <p
                      key={d.id}
                      className={cn(
                        "t-lead col-start-1 row-start-1 max-w-[28ch] text-vx-white/85 transition-[opacity,filter] duration-[var(--dur-ui)]",
                        idx === i ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-[3px]",
                      )}
                      aria-hidden={idx !== i}
                    >
                      {d.caption}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative col-span-7 col-start-6 h-full">
              <span className="crop-marks" aria-hidden />
              <div className="relative h-full overflow-hidden">
                {DETAILS.map((d, i) => (
                  <div
                    key={d.id}
                    className="vxcut__frame absolute inset-0"
                    data-from={FROM[i % FROM.length]}
                    data-state={i < idx ? "past" : i === idx ? "active" : "future"}
                    style={{ zIndex: i + 1 }}
                  >
                    <div className="vxcut__img h-full">
                      <Media media={d.media} sizes="58vw" ratio={false} shift={i} frame={`${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div aria-hidden className="absolute -left-6 top-0 h-full w-px bg-vx-line">
                <div
                  className="w-px bg-vx-white transition-[height] duration-500 ease-[var(--ease-vx)]"
                  style={{ height: `${((idx + 1) / n) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="vx-section">
          <div className="vx-grid">
            <div className="col-span-4 md:col-span-6">
              <p className="t-caps mb-6 text-vx-muted">The VX Cut</p>
              <RevealLines id="vxcut-title" className="t-display t-l" lines={["Precisão", "nos detalhes."]} />
            </div>
          </div>
          <ol className="vx-grid mt-14 gap-y-14 md:mt-20">
            {DETAILS.map((d, i) => (
              <li
                key={d.id}
                className={cn(
                  "col-span-4 md:col-span-4",
                  i % 2 === 1 ? "ml-[18%] md:ml-0 md:mt-24" : "mr-[8%] md:mr-0",
                )}
              >
                <Reveal variant="cut" className="relative">
                  <Media media={d.media} sizes="(min-width: 768px) 45vw, 85vw" shift={i} frame={`${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`} />
                </Reveal>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="t-num t-small text-vx-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="t-display t-s">{d.name}</h3>
                </div>
                <p className="mt-2 max-w-[36ch] pl-9 text-vx-muted">{d.caption}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
