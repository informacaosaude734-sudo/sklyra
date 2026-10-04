"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroState } from "@/three/heroState";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const VXScene = dynamic(() => import("@/three/VXScene"), { ssr: false });

/** 3D só onde vale a pena: tela média+, sem movimento reduzido, sem economia de dados, com WebGL. */
function canUse3D() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (!window.matchMedia("(min-width: 768px)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 4 || (navigator.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Monograma do hero. Pôster estático (cromo pré-renderizado, em duas metades)
 * sempre presente; a cena 3D entra por cima depois do conteúdo essencial.
 */
export function HeroMark() {
  const ref = useRef<HTMLDivElement>(null);
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!canUse3D()) return;
    // carrega depois do primeiro paint e do idle — o texto vem primeiro
    const start = () => setUse3D(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, []);

  // pausa a renderização fora da tela
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ponteiro → estado da cena
  useEffect(() => {
    if (!use3D) return;
    const move = (e: PointerEvent) => {
      heroState.px = (e.clientX / window.innerWidth) * 2 - 1;
      heroState.py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [use3D]);

  return (
    <div ref={ref} aria-hidden className="hero-mark pointer-events-none absolute z-0">
      <div className="absolute inset-0" data-hero-mark>
        <div className={cn("absolute inset-0 transition-opacity duration-700", ready && "opacity-0")}>
          <div className="absolute inset-0" data-hero-half="top">
            <div className="hero-mark__half--top absolute inset-0">
              <Image src="/media/vx-chrome.webp" alt="" fill priority sizes="(min-width: 768px) 50vw, 90vw" className="object-contain" />
            </div>
          </div>
          <div className="absolute inset-0" data-hero-half="bottom">
            <div className="hero-mark__half--bottom absolute inset-0">
              <Image src="/media/vx-chrome.webp" alt="" fill priority sizes="(min-width: 768px) 50vw, 90vw" className="object-contain" />
            </div>
          </div>
        </div>
        {use3D && (
          <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
            <VXScene active={visible} onReady={() => setReady(true)} />
          </div>
        )}
      </div>
    </div>
  );
}
