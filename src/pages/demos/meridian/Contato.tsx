import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, TrendingUp, Palmtree, Phone, Mail, MapPin } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { MR, MeridianLayout } from "./_layout";
import { MapEmbed } from "../_realism";

const INTENTIONS = [
  { key: "buy", label: "Comprar para morar", icon: Home, sub: "Mudança para Miami, imóvel principal" },
  { key: "invest", label: "Investir", icon: TrendingUp, sub: "Renda em dólar, valorização, portfolio" },
  { key: "rent", label: "Aluguel de temporada", icon: Palmtree, sub: "Segunda residência com rendimento" },
];

const Contato = ({ site }: { site: DemoSite }) => {
  const [step, setStep] = useState<"pick" | "form">("pick");
  const [intent, setIntent] = useState<typeof INTENTIONS[number] | null>(null);

  const questionsFor = (k: string) => {
    if (k === "buy") return ["Quantas pessoas na família?", "Prazo de mudança?", "Escola bilíngue é prioridade?"];
    if (k === "invest") return ["Ticket disponível (USD)?", "Retorno buscado (aluguel, valorização ou ambos)?", "Estrutura via LLC / trust?"];
    return ["Quantos meses/ano de uso próprio?", "Aceita administração terceirizada?", "Faixa de investimento (USD)?"];
  };

  return (
    <MeridianLayout site={site} active="contato">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: MR.gold }}>Concierge Meridian</p>
        <h1 style={{ fontFamily: MR.serif }} className="text-5xl md:text-8xl font-light leading-[1.02]">
          Comece pela <em className="italic" style={{ color: MR.gold }}>intenção.</em>
        </h1>
        <p className="mt-6 text-lg font-light max-w-xl" style={{ color: MR.ink2 }}>
          Cada objetivo pede um caminho diferente. Escolha o seu — as próximas perguntas são feitas sob medida.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === "pick" && (
            <motion.div key="pick" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-4"
            >
              {INTENTIONS.map((it, i) => {
                const Icon = it.icon;
                return (
                  <motion.button key={it.key}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    onClick={() => { setIntent(it); setStep("form"); }}
                    className="text-left p-10 border hover:border-[color:var(--gold)] transition group"
                    style={{ borderColor: MR.line, background: "#fff", ["--gold" as any]: MR.gold }}
                  >
                    <Icon className="w-8 h-8 mb-8" strokeWidth={1} style={{ color: MR.gold }} />
                    <h3 style={{ fontFamily: MR.serif }} className="text-3xl italic font-light leading-tight">{it.label}</h3>
                    <p className="mt-3 text-sm" style={{ color: MR.ink2 }}>{it.sub}</p>
                    <div className="mt-10 text-[11px] uppercase tracking-[0.3em] group-hover:gap-3 inline-flex items-center gap-2 transition-all" style={{ color: MR.gold }}>
                      Continuar →
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {step === "form" && intent && (
            <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              onSubmit={(e) => { e.preventDefault(); window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(intent.label)}`); }}
              className="grid md:grid-cols-[1fr_320px] gap-14 border p-10 md:p-14" style={{ borderColor: MR.line, background: "#fff" }}
            >
              <div>
                <button type="button" onClick={() => setStep("pick")} className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: MR.gold }}>
                  ← Trocar intenção
                </button>
                <div style={{ fontFamily: MR.serif }} className="text-2xl italic mb-8">Perfeito. Para <em style={{ color: MR.gold }}>{intent.label.toLowerCase()}</em>, preciso saber:</div>

                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <label>
                      <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MR.gold }}>Nome</span>
                      <input className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: MR.line, fontFamily: MR.serif, fontSize: 20 }} />
                    </label>
                    <label>
                      <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MR.gold }}>WhatsApp</span>
                      <input className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: MR.line, fontFamily: MR.serif, fontSize: 20 }} />
                    </label>
                    <label>
                      <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MR.gold }}>Cidade atual</span>
                      <input className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: MR.line, fontFamily: MR.serif, fontSize: 20 }} />
                    </label>
                    <label>
                      <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MR.gold }}>E-mail</span>
                      <input type="email" className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: MR.line, fontFamily: MR.serif, fontSize: 20 }} />
                    </label>
                  </div>

                  {questionsFor(intent.key).map((q, i) => (
                    <label key={q} className="block">
                      <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MR.gold }}>{String(i + 1).padStart(2, "0")}. {q}</span>
                      <input className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: MR.line, fontFamily: MR.serif, fontSize: 20 }} />
                    </label>
                  ))}

                  <button type="submit" style={{ background: MR.gold, color: MR.bg }}
                    className="mt-4 inline-flex items-center gap-2 px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition">
                    Enviar ao concierge →
                  </button>
                </div>
              </div>

              <aside className="space-y-8 border-l pl-8" style={{ borderColor: MR.line }}>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: MR.gold }}>Escritório</div>
                  <div style={{ fontFamily: MR.serif }} className="text-lg leading-snug">{site.address}<br />{site.city}</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: MR.gold }}>Direto</div>
                  <a href={`tel:${site.phone}`} className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" style={{ color: MR.gold }} /> {site.phone}</a>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-2 mt-2"><Mail className="w-3.5 h-3.5" style={{ color: MR.gold }} /> {site.email}</a>
                </div>
                <div className="text-xs italic pt-6 border-t" style={{ color: MR.ink2, borderColor: MR.line, fontFamily: MR.serif }}>
                  "Nunca uma resposta padronizada. Você fala com o corretor, não com o robô."
                </div>
              </aside>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t" style={{ borderColor: MR.line }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: MR.gold }}>Nosso escritório</p>
          <h2 style={{ fontFamily: MR.serif }} className="text-3xl md:text-5xl italic font-light mb-8">
            {site.address}, <em style={{ color: MR.gold }}>{site.city}</em>
          </h2>
          <MapEmbed site={site} height={480} className="border" />
        </div>
      </section>
    </MeridianLayout>
  );
};

export default Contato;
