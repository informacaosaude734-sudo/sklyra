"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "./gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

const LABELS: Record<string, string> = { view: "View", book: "Book", plus: "+" };

/**
 * Cursor auxiliar — só desktop com mouse. O cursor nativo continua visível;
 * este é apenas um ponto que segue e vira etiqueta sobre alvos marcados com
 * `data-cursor="view|book|plus"`.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !isFinePointer()) return;
    const reduce = prefersReducedMotion();
    const dur = reduce ? 0 : 0.45;
    const xTo = gsap.quickTo(el, "x", { duration: dur, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: dur, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.dataset.visible = "true";
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(t ? (t.getAttribute("data-cursor") ?? null) : null);
    };
    const leave = () => {
      el.dataset.visible = "false";
      shown = false;
    };
    const down = () => (el.dataset.pressed = "true");
    const up = () => (el.dataset.pressed = "false");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  const text = label ? LABELS[label] : null;

  return (
    <div
      ref={ref}
      aria-hidden
      data-visible="false"
      data-active={text ? "true" : "false"}
      className="vx-cursor pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)]"
    >
      <div className="vx-cursor__body">
        <span className="vx-cursor__label">{text}</span>
      </div>
    </div>
  );
}
