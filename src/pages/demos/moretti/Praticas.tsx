import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { M, MorettiLayout } from "./_layout";
import { MORETTI_EXTRAS } from "@/data/demoExtras";

const Praticas = ({ site }: { site: DemoSite }) => {
  const [open, setOpen] = useState(0);
  return (
    <MorettiLayout site={site} active="praticas">
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <p style={{ fontFamily: M.mono, color: M.gold }} className="text-[10px] tracking-[0.4em] mb-6">II. PRÁTICAS</p>
        <h1 style={{ fontFamily: M.serif }} className="text-5xl md:text-8xl font-light leading-[1.02] tracking-tight max-w-4xl">
          Quatro áreas. <em className="italic" style={{ color: M.gold }}>Zero dispersão.</em>
        </h1>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        {MORETTI_EXTRAS.practiceDetails.map((p, i) => {
          const isOpen = open === i;
          return (
            <div key={p.title} className="border-t" style={{ borderColor: M.line }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full py-10 grid grid-cols-[80px_1fr_auto] gap-6 items-baseline text-left">
                <div style={{ fontFamily: M.serif, color: M.gold }} className="text-5xl italic font-light">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 style={{ fontFamily: M.serif }} className="text-3xl md:text-5xl font-light">{p.title}</h2>
                <div style={{ color: M.gold }}>
                  {isOpen ? <Minus className="w-6 h-6" strokeWidth={1} /> : <Plus className="w-6 h-6" strokeWidth={1} />}
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-[104px] pb-14 grid md:grid-cols-[1fr_280px] gap-10">
                      <p style={{ color: M.ink2 }} className="text-lg leading-relaxed font-light max-w-2xl">
                        {p.body}
                      </p>
                      <div className="border-l pl-8 space-y-5" style={{ borderColor: M.line }}>
                        {p.stats.map(([n, l]) => (
                          <div key={l}>
                            <div style={{ fontFamily: M.serif, color: M.gold }} className="text-4xl font-light">{n}</div>
                            <div style={{ fontFamily: M.mono }} className="text-[10px] uppercase tracking-[0.3em] mt-1" >{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>

      <section className="border-t py-24 px-6 text-center" style={{ borderColor: M.line }}>
        <p style={{ fontFamily: M.serif }} className="text-2xl md:text-4xl italic font-light max-w-3xl mx-auto leading-tight">
          Não fazemos tudo. Fazemos o que sabemos fazer melhor que qualquer escritório do nosso porte.
        </p>
      </section>
    </MorettiLayout>
  );
};

export default Praticas;
