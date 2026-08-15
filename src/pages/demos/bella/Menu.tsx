import { useState } from "react";
import { motion } from "framer-motion";
import { DemoSite } from "@/data/demoSites";
import { BELLA, BellaLayout } from "./_layout";
import { BELLA_EXTRAS } from "@/data/demoExtras";

const Menu = ({ site }: { site: DemoSite }) => {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <BellaLayout site={site} active="menu">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p style={{ fontFamily: BELLA.script, color: BELLA.red }} className="italic text-lg mb-4">— Il menu della casa</p>
        <h1 style={{ fontFamily: BELLA.serif }} className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tight">
          A carta que <em className="italic text-[#8a2f2f]">muda</em> toda semana.
        </h1>
        <p style={{ fontFamily: BELLA.script }} className="mt-6 text-xl text-black/60 max-w-2xl">
          O que está aqui é o que chegou fresco. O que não está, chegará amanhã. Preços em USD.
        </p>
      </section>

      {BELLA_EXTRAS.menu.map((cat, ci) => (
        <section key={cat.category} className={ci % 2 === 1 ? "" : "border-y border-black/10"}
          style={{ background: ci % 2 === 1 ? BELLA.cream : BELLA.bg }}>
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="mb-10 flex items-baseline justify-between">
              <div>
                <p style={{ fontFamily: BELLA.script }} className="italic text-lg text-[#8a2f2f]">{cat.italian}</p>
                <h2 style={{ fontFamily: BELLA.serif }} className="text-4xl md:text-6xl font-black">{cat.category}</h2>
              </div>
              <div style={{ fontFamily: BELLA.serif }} className="text-6xl italic text-black/10">0{ci + 1}</div>
            </div>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {cat.items.map((it, i) => {
                const active = hover === `${ci}-${i}`;
                return (
                  <motion.div key={it.name}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    onMouseEnter={() => setHover(`${ci}-${i}`)} onMouseLeave={() => setHover(null)}
                    className="py-6 grid grid-cols-[1fr_auto] gap-6 items-baseline cursor-default group"
                  >
                    <div className="flex items-baseline gap-4 min-w-0">
                      <h3 style={{ fontFamily: BELLA.serif }} className="text-2xl md:text-3xl font-bold shrink-0">
                        {it.name}
                      </h3>
                      <div className="flex-1 border-b border-dotted border-black/40 mb-1.5" />
                      <span style={{ fontFamily: BELLA.serif, color: BELLA.red }} className="text-2xl italic shrink-0">${it.price}</span>
                    </div>
                    <motion.p
                      animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
                      style={{ fontFamily: BELLA.script }}
                      className="col-span-2 text-lg text-black/60 leading-snug overflow-hidden">
                      {it.desc}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p style={{ fontFamily: BELLA.script }} className="italic text-2xl text-black/70">
          O menu completo, com carta de vinhos e sobremesas do dia, é entregue à sua mesa. Este é apenas o convite.
        </p>
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
          style={{ background: BELLA.red, color: BELLA.bg }}
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition">
          Reservar mesa
        </a>
      </section>
    </BellaLayout>
  );
};

export default Menu;
