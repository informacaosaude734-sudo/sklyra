import { useState } from "react";
import { motion } from "framer-motion";
import { DemoSite } from "@/data/demoSites";
import { M, MorettiLayout } from "./_layout";
import { MORETTI_EXTRAS } from "@/data/demoExtras";

const TAGS = ["Todos", "M&A", "Imigração", "Tributário", "Litígio"];

const Casos = ({ site }: { site: DemoSite }) => {
  const [tag, setTag] = useState("Todos");
  const items = MORETTI_EXTRAS.cases.filter((c) => tag === "Todos" || c.tag === tag);
  return (
    <MorettiLayout site={site} active="casos">
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <p style={{ fontFamily: M.mono, color: M.gold }} className="text-[10px] tracking-[0.4em] mb-6">III. CASOS · SELEÇÃO PÚBLICA</p>
        <h1 style={{ fontFamily: M.serif }} className="text-5xl md:text-8xl font-light leading-[1.02] tracking-tight">
          Vitórias que <em className="italic" style={{ color: M.gold }}>podemos citar.</em>
        </h1>
        <p style={{ color: M.ink2 }} className="mt-8 text-lg font-light max-w-2xl">
          A maior parte do nosso trabalho é confidencial por natureza. O que segue são casos com autorização expressa dos clientes — a ponta visível.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-6 flex flex-wrap gap-2 border-b" style={{ borderColor: M.line }}>
        {TAGS.map((t) => (
          <button key={t} onClick={() => setTag(t)}
            style={{ color: tag === t ? M.bg : M.ink, background: tag === t ? M.gold : "transparent", borderColor: M.line, fontFamily: M.mono }}
            className="px-4 py-2 text-[11px] uppercase tracking-[0.25em] border transition"
          >
            {t}
          </button>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
        {items.map((c, i) => (
          <motion.article key={c.num}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative border p-8"
            style={{ borderColor: M.line, background: "linear-gradient(135deg, rgba(184,148,95,0.03), transparent)" }}
          >
            <div className="absolute top-4 right-4 text-[9px] tracking-[0.4em] px-2 py-1 border"
              style={{ color: M.gold, borderColor: M.gold, fontFamily: M.mono }}>
              CONFIDENTIAL · CITADO
            </div>
            <div style={{ fontFamily: M.mono, color: M.gold }} className="text-[11px] tracking-[0.3em] mb-4">
              CASE Nº {c.num}
            </div>
            <div style={{ fontFamily: M.serif }} className="text-3xl md:text-4xl italic font-light leading-tight mb-6">
              {c.result}
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-sm border-t pt-6" style={{ borderColor: M.line, fontFamily: M.mono }}>
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em]" style={{ color: M.ink2 }}>Jurisdição</div>
                <div className="mt-1">{c.jurisdiction}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em]" style={{ color: M.ink2 }}>Setor</div>
                <div className="mt-1">{c.industry}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em]" style={{ color: M.ink2 }}>Valor</div>
                <div className="mt-1" style={{ color: M.gold }}>{c.value}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em]" style={{ color: M.ink2 }}>Prática</div>
                <div className="mt-1">{c.tag}</div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </MorettiLayout>
  );
};

export default Casos;
