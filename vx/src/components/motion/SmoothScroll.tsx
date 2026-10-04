"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "@/lib/motion";

type ScrollApi = {
  scrollTo: (target: string | HTMLElement | number, opts?: { immediate?: boolean }) => void;
  lock: () => void;
  unlock: () => void;
};

const ScrollContext = createContext<ScrollApi>({
  scrollTo: () => {},
  lock: () => {},
  unlock: () => {},
});

export const useScroll = () => useContext(ScrollContext);

/**
 * Scroll suave (Lenis) ligado ao ticker do GSAP — um único loop de RAF.
 * Desligado com prefers-reduced-motion e em telas de toque (scroll nativo).
 * Links âncora da mesma página são tratados aqui, com ou sem Lenis.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(0);
  const [, force] = useState(0);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion() || coarse) return;

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    force((n) => n + 1);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  const scrollTo = useCallback<ScrollApi["scrollTo"]>((target, opts) => {
    const el =
      typeof target === "string"
        ? document.getElementById(target.replace(/^.*#/, ""))
        : target;
    if (el == null) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement | number, {
        immediate: opts?.immediate,
        duration: 1.3,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }
    const smooth = !opts?.immediate && !prefersReducedMotion();
    if (typeof el === "number") window.scrollTo({ top: el, behavior: smooth ? "smooth" : "auto" });
    else el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  }, []);

  const lock = useCallback(() => {
    locks.current += 1;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlock = useCallback(() => {
    locks.current = Math.max(0, locks.current - 1);
    if (locks.current > 0) return;
    lenisRef.current?.start();
    document.documentElement.style.overflow = "";
  }, []);

  // Âncoras da mesma página: "#id" ou "/#id" estando em "/".
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname)
        return;
      const id = decodeURIComponent(url.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      scrollTo(el);
      history.pushState(null, "", `#${id}`);
      // Move o foco para a seção (acessibilidade), sem pular a rolagem.
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  return (
    <ScrollContext.Provider value={{ scrollTo, lock, unlock }}>{children}</ScrollContext.Provider>
  );
}
