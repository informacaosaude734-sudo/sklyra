import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DemoSite } from "@/data/demoSites";
import { MR, MeridianLayout } from "./_layout";
import { MERIDIAN_EXTRAS } from "@/data/demoExtras";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / 1400);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
};

const Sobre = ({ site }: { site: DemoSite }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yImg = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), { damping: 30 });

  return (
    <MeridianLayout site={site} active="sobre">
      {/* Fullscreen dark hero */}
      <section ref={heroRef} className="relative h-[85vh] overflow-hidden" style={{ background: MR.dark }}>
        <motion.div style={{ y: yImg }} className="absolute inset-0 opacity-40">
          <img src={site.heroImage} alt="" className="w-full h-full object-cover scale-110" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${MR.dark}70, ${MR.dark})` }} />
        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-24" style={{ color: MR.bg }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="text-[10px] tracking-[0.5em] mb-6" style={{ color: MR.goldLight }}>SOBRE A MERIDIAN</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
            style={{ fontFamily: MR.serif }} className="text-5xl md:text-8xl font-light leading-[0.98] tracking-tight">
            15 anos comprando <em className="italic" style={{ color: MR.goldLight }}>Miami</em> para brasileiros que sabem o que querem.
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14">
          <p style={{ fontFamily: MR.serif }} className="text-3xl md:text-4xl italic font-light leading-tight">
            "Fundamos a Meridian em 2011 porque a maioria dos brasileiros comprava em Miami no escuro. Sem estrutura tributária, sem análise de yield, sem gestor. A gente resolveu isso."
          </p>
          <div className="space-y-6 text-lg leading-relaxed font-light" style={{ color: MR.ink2 }}>
            <p>Trabalhamos exclusivamente com portfólios entre $1M e $30M. Curadoria significa: escolhemos os imóveis antes de mostrar. Se não compraríamos, não indicamos.</p>
            <p>Cada corretor da Meridian é bilíngue, licenciado na Flórida e tem no mínimo oito anos de mercado local. Nada de "network de indicações": você fala direto com quem negocia.</p>
            <p>Somos os corretores de referência para famílias brasileiras que também são clientes da Moretti & Associates — coordenamos a compra, a estrutura e a mudança em bloco.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: MR.dark, color: MR.bg }} className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
          {[
            { n: 15, s: "+", l: "Anos em Miami" },
            { n: 480, s: "M+", l: "USD em transações" },
            { n: 96, s: "%", l: "Clientes vindos de indicação" },
            { n: 12, s: "", l: "Bairros de cobertura" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontFamily: MR.serif, color: MR.goldLight }} className="text-6xl md:text-7xl font-light">
                <Counter value={s.n} suffix={s.s} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.35em] mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: MR.gold }}>Por que Miami</p>
          <h2 style={{ fontFamily: MR.serif }} className="text-4xl md:text-6xl font-light">Os bairros que <em className="italic" style={{ color: MR.gold }}>trabalhamos</em>.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: MR.line }}>
          {MERIDIAN_EXTRAS.neighborhoods.map((n, i) => (
            <motion.div key={n.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{ background: MR.bg }}
              className="p-10 hover:bg-white/60 transition group cursor-default">
              <div style={{ fontFamily: MR.serif }} className="text-3xl italic font-light mb-2">{n.name}</div>
              <p className="text-sm" style={{ color: MR.ink2 }}>{n.label}</p>
              <div className="mt-8 pt-6 border-t flex items-baseline justify-between" style={{ borderColor: MR.line }}>
                <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MR.ink2 }}>Valorização</span>
                <span style={{ fontFamily: MR.serif, color: MR.gold }} className="text-2xl">{n.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </MeridianLayout>
  );
};

export default Sobre;
