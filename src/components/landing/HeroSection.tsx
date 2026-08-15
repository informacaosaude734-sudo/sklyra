import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Calendar, MessageCircle, ArrowRight, User, Wrench, Layers, Gauge, type LucideIcon } from "lucide-react";
import { useT } from "@/i18n";
import Magnetic from "@/components/motion/Magnetic";
import TiltCard from "@/components/motion/TiltCard";


interface HeroSectionProps {
  onOpenForm: () => void;
}

const HeroSection = ({ onOpenForm }: HeroSectionProps) => {
  const { t } = useT();
  const rotatingWords = [0, 1, 2, 3, 4, 5].map((i) => t(`hero.words.${i}`));
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((p) => (p + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(id);
  }, [rotatingWords.length]);

  const bullets: { text: string; Icon: LucideIcon }[] = [
    { text: t("hero.card.b1"), Icon: User },
    { text: t("hero.card.b2"), Icon: Wrench },
    { text: t("hero.card.b3"), Icon: Layers },
    { text: t("hero.card.b4"), Icon: Gauge },
  ];
  const stats: { value: string; label: string }[] = [
    { value: "5d", label: t("hero.stats.4") },
    { value: "EN/PT", label: t("hero.stats.1") },
    { value: "SEO", label: t("hero.stats.2") },
    { value: "0", label: t("hero.stats.3") },
  ];

  return (
    <section className="relative pt-32 md:pt-40 pb-0 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.14) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary-glow) / 0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          {/* LEFT — headline column */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              
              <span className="text-[11px] tracking-[0.28em] text-primary font-semibold">
                {t("hero.eyebrow")}
              </span>
            </motion.div>

            <h1
              className="text-[2.4rem] sm:text-5xl lg:text-[4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            >
              {t("hero.prefix")}{" "}
              <span className="inline-block relative overflow-hidden align-baseline">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-primary"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </span>
              <br />
              {t("hero.middle")}{" "}
              <span className="text-primary">{t("hero.underlined")}</span>
            </h1>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-7 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              {t("hero.sub.1")}{" "}
              <span className="text-foreground/90 font-semibold">{t("hero.sub.2")}</span>{" "}
              {t("hero.sub.3")}
            </motion.p>

          </div>

          {/* RIGHT — capture card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
          <TiltCard max={6} glare={false} className="relative rounded-[22px]">
            <div
              className="relative rounded-[22px] p-6 md:p-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,22,20,0.95) 0%, rgba(8,10,8,0.98) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* top glow line */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* Static soft mesh glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[22px] overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.3] mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(45% 40% at 30% 20%, hsl(var(--primary) / 0.4), transparent 70%), radial-gradient(40% 35% at 75% 70%, hsl(var(--primary-glow) / 0.3), transparent 75%)",
                    filter: "blur(40px)",
                  }}
                />
              </div>


              {/* SaaS grain texture — contained */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[22px] opacity-[0.09] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>")`,
                  backgroundSize: "180px 180px",
                }}
              />


              <p className="text-[10px] tracking-[0.28em] text-primary font-semibold mb-3">
                {t("hero.card.eyebrow")}
              </p>

              <h2 className="text-2xl md:text-[1.7rem] font-extrabold tracking-tight leading-tight text-foreground mb-6">
                {t("hero.card.title")}
              </h2>

              <ul className="space-y-3.5 mb-7">
                <svg width="0" height="0" className="absolute" aria-hidden>
                  <defs>
                    <linearGradient id="emeraldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary) / 0.9)" />
                      <stop offset="100%" stopColor="hsl(var(--primary) / 0.45)" />
                    </linearGradient>
                  </defs>
                </svg>
                {bullets.map(({ text, Icon }, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-foreground/85 leading-snug"
                  >
                    <span className="mt-0.5 shrink-0">
                      <Icon
                        className="w-4 h-4"
                        strokeWidth={1.75}
                        style={{
                          stroke: "url(#emeraldStroke)",
                        }}
                      />
                    </span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>

              <Magnetic strength={10} radius={140}>
                <button
                  onClick={onOpenForm}
                  className="btn-framer btn-framer--ring w-full !py-3.5 !text-sm flex items-center justify-center gap-2 group"
                >
                  {t("hero.card.cta")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
              <p className="text-[11px] text-muted-foreground/70 text-center mt-3">
                {t("hero.card.note")}
              </p>






            </div>
          </TiltCard>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
          }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="group relative px-5 py-6 md:px-7 md:py-7 border-t border-white/[0.07] [&:nth-child(2)]:border-l md:border-l md:[&:first-child]:border-l-0 [&:nth-child(4)]:border-l border-white/[0.07]"
            >
              {/* animated top accent */}
              <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-700 ease-out group-hover:w-full" />
              {/* hover wash */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(80% 60% at 50% 0%, hsl(var(--primary) / 0.10), transparent 70%)",
                }}
              />

              <div className="relative flex items-baseline gap-1">
                <span className="text-3xl md:text-[2.6rem] font-semibold tracking-[-0.04em] text-foreground leading-none">
                  {s.value}
                </span>
              </div>
              <span className="relative mt-3 block text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80 leading-snug">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
