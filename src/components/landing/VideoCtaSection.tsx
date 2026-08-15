import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useT } from "@/i18n";


const copy = {
  pt: {
    eyebrow: "Marketing que gera resultado",
    title1: "Chega de site",
    title2: "que não vende",
    desc1: "A ",
    brand: "Sklyra",
    desc2: " constrói a estrutura que traz cliente. Enquanto você pensa, seu concorrente fecha.",
    cta: "Quero vender mais",
  },
  en: {
    eyebrow: "Marketing that drives results",
    title1: "Stop having a site",
    title2: "that doesn't sell",
    desc1: "",
    brand: "Sklyra",
    desc2: " builds the structure that brings clients. While you think, your competitor closes.",
    cta: "I want more sales",
  },
};

const VIDEO_URL = "https://i.imgur.com/6WrEpXC.mp4";

interface Props {
  onOpenForm?: () => void;
}

const VideoCtaSection = ({ onOpenForm }: Props) => {
  const { lang } = useT();
  const c = copy[lang] ?? copy.pt;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  // container storytelling
  const scale = useTransform(p, [0, 0.42, 1], [0.86, 1, 0.94]);
  const y = useTransform(p, [0, 0.42, 1], [90, 0, -50]);
  const opacity = useTransform(p, [0, 0.18, 0.85, 1], [0, 1, 1, 0.55]);
  const blur = useTransform(p, [0, 0.25], ["10px", "0px"]);
  // video parallax inside container
  const videoY = useTransform(p, [0, 1], ["-9%", "9%"]);
  const videoScale = useTransform(p, [0, 0.5, 1], [1.22, 1.08, 1.22]);
  // content
  const contentY = useTransform(p, [0, 1], [60, -40]);


  return (
    <section ref={sectionRef} className="relative isolate flex items-center justify-center overflow-hidden px-4 py-14 md:px-6 md:py-28">

      <motion.div
        style={{ scale, y, opacity, filter: blur, willChange: "transform, opacity" }}
        className="relative w-full max-w-[1180px]"
      >
        {/* soft white framer light around container */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10"
          animate={{ opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.3), rgba(255,255,255,0) 70%)",
            filter: "blur(22px)",
          }}
        />

        {/* rotating emerald line — corners only */}
        <div className="relative isolate overflow-hidden p-[1.5px]">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[-150%] animate-[spin_7s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.9) 30deg, hsl(var(--primary-glow)) 60deg, transparent 120deg, transparent 360deg)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: "hsl(210 45% 4%)",
              maskImage:
                "radial-gradient(circle 90px at 0% 0%, transparent 40%, #000 100%), radial-gradient(circle 90px at 100% 0%, transparent 40%, #000 100%), radial-gradient(circle 90px at 0% 100%, transparent 40%, #000 100%), radial-gradient(circle 90px at 100% 100%, transparent 40%, #000 100%)",
              WebkitMaskImage:
                "radial-gradient(circle 90px at 0% 0%, transparent 40%, #000 100%), radial-gradient(circle 90px at 100% 0%, transparent 40%, #000 100%), radial-gradient(circle 90px at 0% 100%, transparent 40%, #000 100%), radial-gradient(circle 90px at 100% 100%, transparent 40%, #000 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />

        <motion.div
          className="relative isolate z-[2] overflow-hidden border"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            background: "linear-gradient(145deg, hsl(210 40% 8%), hsl(210 45% 4%))",
          }}
        >
          <motion.video
            ref={(el) => {
              if (el) el.playbackRate = 0.5;
            }}
            className="absolute inset-0 -z-40 size-full object-cover object-center"
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              y: videoY,
              scale: videoScale,
              filter: "saturate(0.8) contrast(1.06) brightness(0.66)",
              willChange: "transform",
            }}
          />

          {/* overlay */}
          <span
            aria-hidden
            className="absolute inset-0 -z-30"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--background) / 0.12) 0%, hsl(var(--background) / 0.34) 35%, hsl(var(--background) / 0.85) 76%, hsl(var(--background) / 0.98) 100%)",
            }}
          />

          {/* glow */}
          <motion.span
            aria-hidden
            className="absolute left-1/2 top-[-270px] -z-20 size-[650px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: "hsl(var(--primary) / 0.18)" }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* framer grid */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07]"
            style={{
              backgroundSize: "56px 56px",
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
            }}
          />

          {/* grain over video */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.5] mix-blend-overlay"
            style={{
              backgroundSize: "110px 110px",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 110 110' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.22] mix-blend-soft-light"
            style={{
              backgroundSize: "240px 240px",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />


          {/* content */}
          <motion.div style={{ y: contentY }} className="relative z-[5] flex min-h-[440px] flex-col items-center justify-end px-5 pb-10 pt-40 text-center sm:px-10 sm:min-h-[560px] md:min-h-[620px] md:px-14 md:pb-16 md:pt-[280px]">
            <motion.h2
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[900px] text-balance text-[clamp(28px,7vw,68px)] font-extrabold leading-[1.05] tracking-[-0.05em] text-foreground"
              style={{ textShadow: "0 6px 25px rgba(0,0,0,0.5)" }}
            >
              {c.title1}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--primary)))",
                }}
              >
                {c.title2}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-[600px] text-balance text-[15px] font-medium leading-relaxed text-white/70 md:mt-5 md:text-[17px]"
            >
              {c.desc1}
              <strong className="font-bold text-primary-glow">{c.brand}</strong>
              {c.desc2}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-7 overflow-hidden rounded-full p-[1.5px]"
              style={{ boxShadow: "0 0 34px hsl(var(--primary) / 0.28)" }}
            >
              {/* rotating emerald neon border */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-[-150%] animate-[spin_5s_linear_infinite]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.9) 40deg, hsl(var(--primary-glow)) 90deg, transparent 160deg, transparent 360deg)",
                }}
              />
              <motion.button
                type="button"
                onClick={onOpenForm}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className="btn-framer btn-framer--ring group relative inline-flex items-center gap-2.5 !rounded-full px-5 py-3 text-[14px] font-bold tracking-[-0.01em] md:px-6 md:py-3.5 md:text-[15px]"
              >
                {c.cta}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
              </motion.button>
            </motion.div>

          </motion.div>
        </motion.div>
        </div>
      </motion.div>
    </section>
  );

};

export default VideoCtaSection;
