import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DemoSite } from "@/data/demoSites";
import { BELLA, BellaLayout } from "./_layout";
import { BELLA_EXTRAS } from "@/data/demoExtras";

const bentoSpan = [
  "md:col-span-2 md:row-span-2 aspect-square",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "md:col-span-2 aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[4/5]",
];
const swatches = [
  "linear-gradient(135deg, #8a2f2f 0%, #1a0f08 100%)",
  "linear-gradient(135deg, #e8a951 0%, #8a2f2f 100%)",
  "linear-gradient(135deg, #1a0f08 0%, #3a1f10 100%)",
  "linear-gradient(135deg, #ede4d3 0%, #e8a951 100%)",
  "linear-gradient(135deg, #8a2f2f 0%, #e8a951 100%)",
  "linear-gradient(135deg, #1a0f08 0%, #8a2f2f 100%)",
];

const Card = ({ i, item }: { i: number; item: { title: string; cap: string } }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
      className={`relative overflow-hidden group ${bentoSpan[i % bentoSpan.length]}`}
      style={{ background: swatches[i % swatches.length] }}
    >
      <motion.div style={{ y }} className="absolute inset-0 flex flex-col justify-end p-6">
        <p style={{ fontFamily: BELLA.script }} className="italic text-xl text-white/80">{item.title}</p>
      </motion.div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition p-6 flex items-end">
        <p style={{ fontFamily: BELLA.script }} className="italic text-lg text-white leading-snug">{item.cap}</p>
      </div>
    </motion.div>
  );
};

const Galeria = ({ site }: { site: DemoSite }) => (
  <BellaLayout site={site} active="galeria">
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
      <p style={{ fontFamily: BELLA.script, color: BELLA.red }} className="italic text-lg mb-4">— Galleria della cucina</p>
      <h1 style={{ fontFamily: BELLA.serif }} className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tight">
        A cozinha de <em className="italic text-[#8a2f2f]">dentro</em>.
      </h1>
      <p style={{ fontFamily: BELLA.script }} className="mt-6 text-xl text-black/60 max-w-2xl">
        Sem filtro, sem produção. O que acontece antes do prato chegar à sua mesa.
      </p>
    </section>

    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(0,1fr)] gap-3">
        {BELLA_EXTRAS.gallery.map((g, i) => <Card key={i} i={i} item={g} />)}
      </div>
    </section>

    <section style={{ background: BELLA.ink, color: BELLA.bg }} className="py-24 px-6 text-center">
      <p style={{ fontFamily: BELLA.serif }} className="italic text-3xl md:text-5xl max-w-3xl mx-auto leading-tight">
        "A melhor foto do prato é aquela que você tira antes de comer. A segunda melhor, é a lembrança."
      </p>
    </section>
  </BellaLayout>
);

export default Galeria;
