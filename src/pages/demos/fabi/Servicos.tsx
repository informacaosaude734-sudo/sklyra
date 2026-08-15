import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { F, FabiLayout } from "./_layout";
import { FABI_EXTRAS } from "@/data/demoExtras";

const Servicos = ({ site }: { site: DemoSite }) => {
  const [pos, setPos] = useState<Record<number, number>>({});
  return (
    <FabiLayout site={site} active="servicos">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p style={{ color: F.gold }} className="text-[11px] uppercase tracking-[0.4em] mb-4">Services & pricing</p>
        <h1 style={{ fontFamily: F.serif, color: F.goldLight }} className="text-5xl md:text-8xl italic font-light leading-[0.95]">
          Every service, <br />designed <em style={{ color: F.gold }} className="italic">for you</em>.
        </h1>
        <p style={{ color: F.ink2 }} className="mt-6 text-lg max-w-xl font-light">
          Move the slider below on each card to see before → after. Prices in USD, duration is average.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-6">
        {FABI_EXTRAS.services.map((s, i) => {
          const p = pos[i] ?? 50;
          return (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.1 }}
              className="border overflow-hidden group" style={{ borderColor: F.line, background: "#0e0b09" }}
            >
              {/* Before / After */}
              <div className="relative aspect-[16/10] overflow-hidden select-none"
                style={{ background: `linear-gradient(135deg, #2a1f16, #1a1108)` }}
              >
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(135deg, #3a2a1e, ${F.gold}30)`,
                  clipPath: `inset(0 ${100 - p}% 0 0)`,
                }} />
                <div className="absolute inset-0 flex items-center justify-between px-6 text-[10px] uppercase tracking-[0.3em] pointer-events-none">
                  <span style={{ color: F.ink2 }}>Before</span>
                  <span style={{ color: F.gold }}>After</span>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-full pointer-events-none" style={{ left: `${p}%`, background: F.gold }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: F.gold }}>
                    <ChevronRight className="w-4 h-4 rotate-180" style={{ color: F.bg }} />
                    <ChevronRight className="w-4 h-4" style={{ color: F.bg }} />
                  </div>
                </div>
                <input type="range" min={0} max={100} value={p} onChange={(e) => setPos((prev) => ({ ...prev, [i]: +e.target.value }))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
              </div>

              <div className="p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 style={{ fontFamily: F.serif, color: F.goldLight }} className="text-3xl italic font-light">{s.title}</h3>
                  <div style={{ fontFamily: F.serif, color: F.gold }} className="text-3xl italic font-light">{s.price}</div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]" style={{ color: F.ink2 }}>
                  <Clock className="w-3.5 h-3.5" /> {s.duration}
                </div>
                <p className="mt-5 text-base leading-relaxed" style={{ color: F.ink2 }}>{s.desc}</p>
                <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Book ${s.title}`)}`} target="_blank" rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em]" style={{ color: F.gold }}>
                  Book this service <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </section>
    </FabiLayout>
  );
};

export default Servicos;
