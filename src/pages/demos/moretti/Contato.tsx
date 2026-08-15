import { useState } from "react";
import { motion } from "framer-motion";
import { DemoSite } from "@/data/demoSites";
import { M, MorettiLayout } from "./_layout";
import { MapEmbed } from "../_realism";

const MATTERS = ["M&A / Corporativo", "Imigração / EB-5 · EB-2 · O-1", "Tributário internacional", "Litígio / Arbitragem", "Outro"];

const Contato = ({ site }: { site: DemoSite }) => {
  const [matter, setMatter] = useState(MATTERS[0]);
  return (
    <MorettiLayout site={site} active="contato">
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <p style={{ fontFamily: M.mono, color: M.gold }} className="text-[10px] tracking-[0.4em] mb-6">IV. CONTATO · PETIÇÃO INICIAL</p>
        <h1 style={{ fontFamily: M.serif }} className="text-5xl md:text-8xl font-light leading-[1.02] tracking-tight">
          Consulta <em className="italic" style={{ color: M.gold }}>estratégica.</em> 45 min. Sem custo.
        </h1>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-[1fr_320px] gap-14">
        <motion.form
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          onSubmit={(e) => { e.preventDefault(); window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Consulta: ${matter}`)}`); }}
          className="border p-8 md:p-12" style={{ borderColor: M.line, background: "linear-gradient(135deg, rgba(184,148,95,0.03), transparent)" }}
        >
          <div style={{ fontFamily: M.mono, color: M.gold }} className="text-[10px] tracking-[0.4em] mb-2">FORM · MC-001</div>
          <div style={{ fontFamily: M.serif }} className="text-2xl italic mb-10 pb-6 border-b" >Formulário de contato inicial</div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.gold, fontFamily: M.mono }}>1. Requerente (nome completo)</span>
                <input className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none focus:border-[color:var(--gold)]" style={{ borderColor: M.line, ["--gold" as any]: M.gold, fontFamily: M.serif, fontSize: 20 }} />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.gold, fontFamily: M.mono }}>2. Contato (e-mail)</span>
                <input type="email" className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: M.line, fontFamily: M.serif, fontSize: 20 }} />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.gold, fontFamily: M.mono }}>3. Telefone / WhatsApp</span>
                <input className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: M.line, fontFamily: M.serif, fontSize: 20 }} />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.gold, fontFamily: M.mono }}>4. Jurisdição de interesse</span>
                <input placeholder="EUA · Brasil · Ambos" className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: M.line, fontFamily: M.serif, fontSize: 20 }} />
              </label>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.gold, fontFamily: M.mono }}>5. Matéria</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {MATTERS.map((m) => (
                  <button key={m} type="button" onClick={() => setMatter(m)}
                    style={{ borderColor: matter === m ? M.gold : M.line, color: matter === m ? M.gold : M.ink2, fontFamily: M.mono }}
                    className="text-[11px] uppercase tracking-[0.2em] border px-3 py-2 transition"
                  >{m}</button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.gold, fontFamily: M.mono }}>6. Exposição breve do caso</span>
              <textarea rows={5} className="mt-2 w-full bg-transparent border py-3 px-4 focus:outline-none" style={{ borderColor: M.line, fontFamily: M.serif, fontSize: 18 }} />
            </label>

            <div className="text-[10px] tracking-[0.2em] pt-4 border-t" style={{ color: M.ink2, borderColor: M.line, fontFamily: M.mono }}>
              CONFIDENCIAL · SUJEITO A PRIVILÉGIO ADVOGADO-CLIENTE · Sem custo · Resposta em até 24h úteis.
            </div>

            <button type="submit" style={{ background: M.gold, color: M.bg, fontFamily: M.mono }}
              className="mt-4 inline-flex items-center gap-2 px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white transition">
              Protocolar consulta →
            </button>
          </div>
        </motion.form>

        <aside className="space-y-8" style={{ fontFamily: M.mono }}>
          <div>
            <div className="text-[10px] tracking-[0.3em] mb-2" style={{ color: M.gold }}>ESCRITÓRIO PRINCIPAL</div>
            <div style={{ fontFamily: M.serif }} className="text-xl leading-snug">{site.address}<br />{site.city}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] mb-2" style={{ color: M.gold }}>CONTATO DIRETO</div>
            <a href={`tel:${site.phone}`} className="block hover:text-[color:var(--gold)]" style={{ ["--gold" as any]: M.gold }}>{site.phone}</a>
            <a href={`mailto:${site.email}`} className="block mt-1 hover:text-[color:var(--gold)]" style={{ ["--gold" as any]: M.gold }}>{site.email}</a>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] mb-2" style={{ color: M.gold }}>OFFICE HOURS</div>
            <div style={{ fontFamily: M.serif }}>Seg–Sex · 9h–19h EST<br />Emergências 24/7 para clientes ativos</div>
          </div>
        </aside>
      </section>

      <section className="border-t" style={{ borderColor: M.line }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p style={{ fontFamily: M.mono, color: M.gold }} className="text-[10px] tracking-[0.4em] mb-6">V. LOCALIZAÇÃO</p>
          <h2 style={{ fontFamily: M.serif }} className="text-3xl md:text-5xl font-light italic mb-8">
            {site.address} · <em style={{ color: M.gold }}>{site.city}</em>
          </h2>
          <MapEmbed site={site} height={480} className="border" />
        </div>
      </section>
    </MorettiLayout>
  );
};

export default Contato;
