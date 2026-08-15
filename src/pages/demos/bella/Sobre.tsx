import { motion } from "framer-motion";
import { DemoSite } from "@/data/demoSites";
import { BELLA, BellaLayout } from "./_layout";
import { BELLA_EXTRAS } from "@/data/demoExtras";

const Sobre = ({ site }: { site: DemoSite }) => (
  <BellaLayout site={site} active="sobre">
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
      <p style={{ fontFamily: BELLA.script, color: BELLA.red }} className="italic text-lg mb-4">— La nostra storia</p>
      <h1 style={{ fontFamily: BELLA.serif }} className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tight max-w-4xl">
        Uma família, uma <em className="italic text-[#8a2f2f]">cozinha</em>, quatro décadas.
      </h1>
      <p style={{ fontFamily: BELLA.script }} className="mt-8 text-2xl text-black/70 max-w-2xl leading-snug">
        Bella Cucina não começou em Boston. Começou em Trastevere, em 1987, na cozinha da nonna Rosa. O resto é caminho.
      </p>
    </section>

    {/* TIMELINE */}
    <section className="border-t border-black/10">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {BELLA_EXTRAS.timeline.map((t, i) => (
          <motion.div
            key={t.year}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className="grid md:grid-cols-[180px_1fr] gap-8 py-10 border-b border-black/10 last:border-0"
          >
            <div>
              <div style={{ fontFamily: BELLA.serif, color: BELLA.red }} className="text-6xl md:text-7xl italic font-black leading-none">
                {t.year}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: BELLA.serif }} className="text-3xl md:text-4xl font-bold mb-3">{t.title}</h3>
              <p style={{ fontFamily: BELLA.script }} className="text-xl text-black/70 leading-snug max-w-2xl">{t.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* POLAROIDS */}
    <section style={{ background: BELLA.cream }} className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <p className="text-xs uppercase tracking-[0.4em] text-[#8a2f2f] mb-3">Album di famiglia</p>
        <h2 style={{ fontFamily: BELLA.serif }} className="text-4xl md:text-6xl font-black">Momentos que viraram receita</h2>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[-4, 3, -2].map((tilt, i) => (
          <motion.div key={i} drag dragElastic={0.15} dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
            initial={{ opacity: 0, y: 40, rotate: tilt * 2 }} whileInView={{ opacity: 1, y: 0, rotate: tilt }} viewport={{ once: true }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="bg-white p-4 pb-14 shadow-2xl cursor-grab active:cursor-grabbing"
            style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
            <div className="aspect-square bg-gradient-to-br from-[#8a2f2f]/20 via-[#e8a951]/30 to-[#1a0f08]/40 flex items-center justify-center">
              <span style={{ fontFamily: BELLA.script, color: BELLA.red }} className="italic text-4xl">
                {["Rosa", "Alessandro", "Boston"][i]}
              </span>
            </div>
            <p style={{ fontFamily: BELLA.script }} className="mt-4 text-lg italic text-center">
              {["1989 · Trastevere", "2007 · New York", "2019 · Opening night"][i]}
            </p>
          </motion.div>
        ))}
      </div>
      <p style={{ fontFamily: BELLA.script }} className="text-center italic text-base text-black/50 mt-10">
        (arraste as fotos — está tudo bem, na cozinha nada é sagrado exceto o molho)
      </p>
    </section>

    {/* QUOTE STRIP */}
    <section style={{ background: BELLA.ink, color: BELLA.bg }} className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p style={{ fontFamily: BELLA.serif }} className="italic text-3xl md:text-5xl leading-tight">
          "Cozinha italiana não é sobre técnica. É sobre memória. Se um prato não te lembra alguém, não terminou de ser feito."
        </p>
        <p className="mt-8 text-[11px] uppercase tracking-[0.35em] text-[#e8a951]">— Chef Alessandro Moretti</p>
      </div>
    </section>
  </BellaLayout>
);

export default Sobre;
