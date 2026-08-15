import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { cases } from "@/data/cases";
import { useSeo } from "@/hooks/useSeo";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Cases() {
  useSeo({
    title: "Cases — Sklyra | Resultados reais de clientes",
    description:
      "Cases reais de brasileiros nos EUA que estruturaram sua operação digital com a Sklyra: antes, depois e métricas verificáveis.",
    canonical: "/cases",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: cases.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/cases/${c.slug}`,
        name: `${c.client} — ${c.industry}`,
      })),
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Voltar para o início
            </Link>
            <span className="text-[11px] tracking-[0.28em] text-primary font-semibold">
              CASES
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground max-w-3xl">
              Resultados reais. Antes, depois e métricas.
            </h1>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl">
              Clientes que estruturaram sua operação digital com a Sklyra e transformaram tráfego em receita previsível.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cases.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={`/cases/${c.slug}`}
                  className="group block h-full rounded-2xl p-6 transition-all"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(18,20,18,0.95) 0%, rgba(8,10,8,0.98) 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase mb-4">
                    <span className="text-primary font-semibold">{c.industry}</span>
                    <span className="text-muted-foreground">{c.location}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                    {c.client}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                    {c.summary}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="rounded-lg border border-white/[0.06] p-2.5">
                        <div className="text-sm font-semibold text-foreground truncate">{m.value}</div>
                        <div className="text-[9px] text-primary font-semibold mt-0.5">{m.delta}</div>
                      </div>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    Ver case completo
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
