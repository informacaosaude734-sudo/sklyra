import { motion } from "motion/react";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";
import { BrandGradient } from "@/components/ui/brand-gradient";
import { stats } from "@/content";

const EASE = [0.19, 1, 0.22, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-32"
    >
      <BrandGradient />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_35%,#000_25%,transparent_72%)]"
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="eyebrow">Digital media &amp; content studio</span>
          </motion.div>

          {/*
            No overflow-hidden mask here: at this leading the glyphs overflow
            their line box, so clipping ate the descenders and shredded the
            gradient fill. A blur/rise reveal gives the same lift, unclipped.
          */}
          <h1 className="display mt-7 text-[clamp(2.6rem,7.4vw,5.6rem)]">
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="block"
            >
              Short-form content
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
              className="grad-text block pb-[0.08em]"
            >
              that actually converts.
            </motion.span>
          </h1>

          <div className="mt-7">
            <MaskedTextReveal
              as="p"
              splitBy="lines"
              stagger={0.06}
              className="mx-auto max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg [&_strong]:font-semibold [&_strong]:text-white/90"
            >
              We turn founders and creators into scroll-stopping brands.
              Strategy, scripting, production and analytics — engineered for{" "}
              <strong>reach, retention and revenue</strong>.
            </MaskedTextReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#contact">
              <Button size="lg" className="group">
                Book a strategy call
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#work">
              <Button size="lg" variant="outline" className="group">
                <Play className="size-3.5 fill-current" />
                See the work
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-white/40"
          >
            <span className="flex items-center gap-0.5 text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span>
              Built by a team native to the platforms you&apos;re trying to win
              on.
            </span>
          </motion.div>
        </div>

        {/* stat strip */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="surface mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden bg-white/[0.06] md:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-ink/70 px-5 py-6 text-center backdrop-blur-sm"
            >
              <dt className="display text-2xl text-white sm:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1.5 text-[12px] leading-snug text-white/45">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

export default Hero;
