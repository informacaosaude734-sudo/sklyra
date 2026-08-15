import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { cases } from "@/data/cases";
import { useSeo } from "@/hooks/useSeo";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const c = cases.find((x) => x.slug === slug);
  if (!c) return <Navigate to="/cases" replace />;

  const canonical = `/cases/${c.slug}`;

  useSeo({
    title: `${c.client} — Case Sklyra | ${c.industry}`,
    description: c.summary,
    canonical,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": "Organization",
          name: "Sklyra",
          url: "/",
        },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: c.quote.author },
        reviewBody: c.quote.text,
        publisher: { "@type": "Organization", name: "Sklyra" },
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${c.client} — ${c.industry}`,
        description: c.summary,
        url: canonical,
        datePublished: c.publishedAt,
        author: { "@type": "Organization", name: "Sklyra" },
        publisher: { "@type": "Organization", name: "Sklyra" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Cases", item: "/cases" },
          { "@type": "ListItem", position: 2, name: c.client, item: canonical },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24 px-5 md:px-10">
        <article className="max-w-4xl mx-auto">
          <Link
            to="/cases"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para Cases
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase mb-5">
              <span className="text-primary font-semibold">{c.industry}</span>
              <span className="text-muted-foreground/70">·</span>
              <span className="text-muted-foreground">{c.location}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.1]">
              {c.client}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {c.summary}
            </p>
          </motion.header>

          {/* Métricas destaque */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {c.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-5 border border-white/[0.06]"
                style={{ background: "linear-gradient(180deg, rgba(18,20,18,0.95), rgba(8,10,8,0.98))" }}
              >
                <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                  {m.label}
                </div>
                <div className="text-2xl font-semibold text-foreground">{m.value}</div>
                <div className="text-xs font-semibold text-primary mt-1">{m.delta}</div>
              </motion.div>
            ))}
          </div>

          {/* Antes / Depois */}
          <section className="mt-16 grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6 border border-white/[0.06] bg-white/[0.02]">
              <h2 className="text-[10px] tracking-[0.28em] text-muted-foreground font-semibold mb-4">
                ANTES
              </h2>
              <ul className="space-y-3">
                {c.before.map((b) => (
                  <li key={b.label} className="flex items-baseline justify-between text-sm">
                    <span className="text-muted-foreground">{b.label}</span>
                    <span className="text-foreground font-semibold">{b.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-6 border border-primary/25"
              style={{ background: "linear-gradient(180deg, hsl(var(--primary) / 0.08), transparent)" }}
            >
              <h2 className="text-[10px] tracking-[0.28em] text-primary font-semibold mb-4">
                DEPOIS
              </h2>
              <ul className="space-y-3">
                {c.after.map((a) => (
                  <li key={a.label} className="flex items-baseline justify-between text-sm">
                    <span className="text-muted-foreground">{a.label}</span>
                    <span className="text-foreground font-semibold">{a.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Desafio / Solução */}
          <section className="mt-16 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-[10px] tracking-[0.28em] text-primary font-semibold mb-3">
                O DESAFIO
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">{c.challenge}</p>
            </div>
            <div>
              <h2 className="text-[10px] tracking-[0.28em] text-primary font-semibold mb-3">
                A SOLUÇÃO
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">{c.solution}</p>
            </div>
          </section>

          {/* Depoimento */}
          <blockquote className="mt-16 rounded-2xl p-8 md:p-10 border border-white/[0.06] bg-white/[0.02]">
            <p className="text-xl md:text-2xl font-semibold leading-snug text-foreground">
              “{c.quote.text}”
            </p>
            <footer className="mt-5 text-xs tracking-widest uppercase text-muted-foreground">
              — {c.quote.author}
            </footer>
          </blockquote>

          {/* CTA final */}
          <div className="mt-16 rounded-2xl p-6 md:p-8 border border-primary/20 bg-primary/[0.04]">
            <p className="text-[10px] tracking-[0.28em] text-primary font-semibold mb-2">
              QUER O MESMO RESULTADO?
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              Estruture sua operação digital com a Sklyra.
            </h2>
            <Link
              to="/"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
            >
              Solicitar diagnóstico
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
