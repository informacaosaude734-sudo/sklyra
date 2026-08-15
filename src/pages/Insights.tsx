import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { articles } from "@/data/devtone-articles";
import { useSeo } from "@/hooks/useSeo";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Insights() {
  useSeo({
    title: "Insights — Sklyra | Estratégia digital, automação e crescimento",
    description:
      "Artigos e análises sobre sites que convertem, automação de vendas, estratégia digital e crescimento de negócios para brasileiros nos EUA.",
    canonical: "/insights",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Sklyra Insights",
      url: "/insights",
      blogPost: articles.map((a) => ({
        "@type": "BlogPosting",
        headline: a.title,
        description: a.summary,
        url: `/insights/${a.id}`,
        articleSection: a.category,
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
            className="mb-14 md:mb-20"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-primary transition-colors mb-10 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Voltar para o início
            </Link>

            <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
              <span className="text-[11px] tracking-[0.28em] text-primary font-semibold">
                INSIGHTS
              </span>
              <span className="text-[11px] tracking-[0.24em] text-white/40 tabular-nums">
                {String(articles.length).padStart(2, "0")} ARTIGOS
              </span>
            </div>

            <h1 className="mt-8 text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground max-w-3xl leading-[1.05]">
              Estratégia digital para negócios que escalam.
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Análises práticas sobre sites, funis, automações e a estrutura por trás de negócios digitais que crescem de forma previsível.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {articles.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/insights/${a.id}`}
                  className="group block"
                >
                  <span className="text-[10px] tracking-[0.24em] uppercase text-primary/80 font-medium">
                    {a.category}
                  </span>

                  <h2 className="mt-3 text-lg md:text-xl font-semibold text-foreground leading-snug tracking-tight group-hover:text-primary transition-colors">
                    {a.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed line-clamp-2">
                    {a.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                    <span>
                      {new Date(2026, 6, 15 - i * 5).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="tabular-nums">{a.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="inline-flex items-center gap-1 group-hover:text-primary transition-colors">
                      Ler
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
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
