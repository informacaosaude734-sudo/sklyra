import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { BackRibbon, SklyraCredit, useFonts } from "./_shared";
import ContactVariant, { ContactVariantKey } from "./_contactVariants";
import { GoogleReviews, AsSeenOn, LiveHours, MapEmbed, NewsletterBlock } from "./_realism";

export interface EditorialTheme {
  bg: string;         // page bg
  ink: string;        // text
  ink2: string;       // muted text
  line: string;       // border/hairline
  accent: string;     // brand accent color
  panel: string;      // secondary panel bg
  serif: string;      // css font-family value for headings
  sans: string;       // css font-family value for body
  eyebrow: string;    // eyebrow uppercase label color
  quotePanel?: string;// dark quote strip bg (optional)
  quoteInk?: string;  // dark quote strip color
  mode: "light" | "dark";
}

interface Props {
  site: DemoSite;
  theme: EditorialTheme;
  fonts: string[];
  storyQuote: string;
  storyAuthor: string;
  sectionLabels?: { services?: string; reviews?: string; visit?: string };
  finalTag?: string;
  contactVariant?: ContactVariantKey;
}

const EditorialSite = ({ site, theme, fonts, storyQuote, storyAuthor, sectionLabels, finalTag, contactVariant }: Props) => {
  useFonts(fonts);
  const navigate = useNavigate();
  const labels = {
    services: sectionLabels?.services ?? "Nossos serviços",
    reviews: sectionLabels?.reviews ?? "Depoimentos",
    visit: sectionLabels?.visit ?? "Visite-nos",
  };

  const hasShop = false;

  return (
    <div style={{ fontFamily: theme.sans, background: theme.bg, color: theme.ink }} className="min-h-screen antialiased">
      <BackRibbon tone={theme.mode} />

      {/* NAV — wordmark only, no logo */}
      <header style={{ borderColor: theme.line }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div style={{ fontFamily: theme.serif }} className="text-xl md:text-2xl font-black tracking-tight">
              {site.brand}
            </div>
            <div className="hidden md:block">
              <LiveHours slug={site.slug} accent={theme.accent} ink2={theme.ink2} />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.25em]" style={{ color: theme.ink2 }}>
            <a href="#services">{labels.services}</a>
            {hasShop && <Link to={`/demo/${site.slug}/shop`}>Loja</Link>}
            <a href="#reviews">Reviews</a>
            <a href="#visit">Contato</a>
          </nav>
          <a href={`tel:${site.phone}`} style={{ borderColor: theme.ink, color: theme.ink }}
            className="text-[11px] uppercase tracking-[0.2em] border px-4 py-2 hover:bg-current hover:text-[color:var(--bg)] transition"
          >
            {site.ctaLabel.split(" ")[0]}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p style={{ fontFamily: theme.serif, color: theme.accent }} className="italic text-lg mb-4">
              — {site.tagline}
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
              style={{ fontFamily: theme.serif }}
              className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-black"
            >
              {site.headline.split(" ").slice(0, -3).join(" ")}{" "}
              <em style={{ color: theme.accent }} className="italic font-normal">
                {site.headline.split(" ").slice(-3).join(" ")}
              </em>
            </motion.h1>
            <p style={{ fontFamily: theme.serif, color: theme.ink2 }} className="mt-8 text-2xl leading-snug max-w-xl">
              {site.subheadline}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
                style={{ background: theme.accent, color: theme.mode === "dark" ? "#000" : "#fff" }}
                className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition">
                {site.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => hasShop ? navigate(`/demo/${site.slug}/shop`) : document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                style={{ borderColor: theme.ink, color: theme.ink }}
                className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.2em] border hover:opacity-80 transition">
                {site.cta2Label}
              </button>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="absolute -top-6 -left-6 w-full h-full border-2" style={{ borderColor: theme.accent }} />
            <img src={site.heroImage} alt={site.brand} width={1600} height={1200}
              className="relative w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </section>

      {/* AS SEEN ON */}
      <AsSeenOn slug={site.slug} theme={{ ink2: theme.ink2, line: theme.line, sans: theme.sans, serif: theme.serif, accent: theme.accent }} />

      {/* STORY */}
      <section style={{ background: theme.quotePanel ?? "#0a0a0a", color: theme.quoteInk ?? "#f2f2f0" }} className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-10 h-px mx-auto mb-8" style={{ background: theme.accent }} />
          <p style={{ fontFamily: theme.serif }} className="italic text-3xl md:text-5xl leading-tight font-light">
            "{storyQuote}"
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.35em]" style={{ color: theme.accent }}>— {storyAuthor}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto py-24 px-6">
        <div className="mb-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-3" style={{ color: theme.accent }}>{labels.services}</p>
          <h2 style={{ fontFamily: theme.serif }} className="text-4xl md:text-6xl font-black">
            O que fazemos
          </h2>
        </div>
        <div className="divide-y border-y" style={{ borderColor: theme.line }}>
          {site.services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="grid md:grid-cols-[80px_1fr_auto] gap-6 py-8 items-baseline group cursor-default"
              style={{ borderColor: theme.line }}
            >
              <div style={{ fontFamily: theme.serif, color: theme.accent, opacity: 0.7 }} className="text-4xl italic">
                0{i + 1}
              </div>
              <div>
                <h3 style={{ fontFamily: theme.serif }} className="text-2xl md:text-3xl font-bold mb-2 group-hover:opacity-80 transition">
                  {s.title}
                </h3>
                <p style={{ fontFamily: theme.serif, color: theme.ink2 }} className="text-xl leading-snug max-w-2xl">{s.desc}</p>
              </div>
              <ChevronRight className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition" style={{ color: theme.accent }} />
            </motion.div>
          ))}
        </div>
      </section>




      {/* GOOGLE REVIEWS */}
      <GoogleReviews slug={site.slug} theme={theme} />

      {/* CONTACT — unique variant per industry */}
      <ContactVariant variant={contactVariant} site={site} theme={theme} labels={labels} finalTag={finalTag} />


      {/* FAQ */}
      <section style={{ borderColor: theme.line }} className="border-t max-w-4xl mx-auto py-20 px-6">
        <p className="text-[11px] uppercase tracking-[0.4em] mb-3 text-center" style={{ color: theme.accent }}>FAQ</p>
        <h2 style={{ fontFamily: theme.serif }} className="text-3xl md:text-5xl font-black text-center mb-12">Perguntas frequentes</h2>
        <div className="divide-y" style={{ borderColor: theme.line }}>
          {site.faqs.map((f) => (
            <div key={f.q} className="py-6 border-t" style={{ borderColor: theme.line }}>
              <h3 style={{ fontFamily: theme.serif }} className="text-xl font-bold mb-2">{f.q}</h3>
              <p style={{ color: theme.ink2 }} className="leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      {/* NEWSLETTER */}
      <NewsletterBlock slug={site.slug} theme={theme} />

      {/* FOOTER */}
      <footer style={{ borderColor: theme.line }} className="border-t py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div style={{ fontFamily: theme.serif }} className="italic text-lg">© 2026 {site.brand}</div>
          <SklyraCredit tone={theme.mode} />
        </div>
      </footer>
    </div>
  );
};

export default EditorialSite;
