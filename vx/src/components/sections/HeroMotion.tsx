"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { heroState } from "@/three/heroState";

/**
 * Saída do hero: as linhas do título se afastam da linha de corte em
 * velocidades diferentes; as metades do monograma se abrem.
 */
export function HeroMotion() {
  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          heroState.progress = self.progress;
        },
      });

      if (reduce) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to("[data-hero-line='1']", { yPercent: -45 }, 0)
        .to("[data-hero-line='2']", { yPercent: 18 }, 0)
        .to("[data-hero-cut]", { opacity: 0.25 }, 0)
        .to("[data-hero-half='top']", { yPercent: -6 }, 0)
        .to("[data-hero-half='bottom']", { yPercent: 6 }, 0)
        .to("[data-hero-mark]", { yPercent: 12, opacity: 0.3 }, 0)
        .to("[data-hero-fade]", { opacity: 0, y: -32 }, 0);

      return () => st.kill();
    }, hero);

    return () => ctx.revert();
  }, []);

  return null;
}
