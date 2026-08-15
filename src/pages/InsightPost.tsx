import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { articles } from "@/data/devtone-articles";
import { useSeo } from "@/hooks/useSeo";
import { ArrowLeft } from "lucide-react";

export default function InsightPost() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => String(a.id) === id);

  if (!article) return <Navigate to="/insights" replace />;

  const canonical = `/insights/${article.id}`;

  useSeo({
    title: `${article.title} — Sklyra Insights`,
    description: article.summary,
    canonical,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.summary,
        articleSection: article.category,
        url: canonical,
        inLanguage: "pt-BR",
        author: { "@type": "Organization", name: "Sklyra" },
        publisher: { "@type": "Organization", name: "Sklyra" },
        mainEntityOfPage: canonical,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Insights", item: "/insights" },
          { "@type": "ListItem", position: 2, name: article.title, item: canonical },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24 px-5 md:px-10">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase mb-5">
              <span className="text-primary font-semibold">{article.category}</span>
              <span className="text-muted-foreground/70">·</span>
              <span className="text-muted-foreground">{article.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.1]">
              {article.title}
            </h1>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {article.summary}
            </p>

            <div className="mt-10 h-px bg-white/[0.08]" />

            <div className="mt-10 prose prose-invert prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary prose-li:text-muted-foreground">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            <div className="relative mt-14 rounded-2xl p-8 md:p-10 border border-white/[0.08] overflow-hidden bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.18),transparent_60%),linear-gradient(135deg,hsl(var(--primary)/0.08),transparent_70%),linear-gradient(180deg,hsl(210_38%_11%/0.9),hsl(210_45%_6%/0.9))] backdrop-blur-sm">
              <div className="absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none" />
              <h2 className="relative text-2xl md:text-3xl font-bold tracking-tight leading-[1.1] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-3">
                Vamos estruturar o digital do seu negócio.
              </h2>
              <p className="relative text-sm text-white/60 leading-relaxed mb-6 max-w-md">
                Diagnóstico gratuito, resposta em 24h e um plano objetivo do que precisa ser feito.
              </p>
              <Link to="/" className="btn-framer relative">
                Solicitar diagnóstico
              </Link>
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
