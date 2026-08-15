import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Scale, Shield, Landmark, Award, ChevronRight, ArrowRight } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { BackRibbon, SklyraCredit, useFonts } from "./_shared";

const MorettiLaw = ({ site }: { site: DemoSite }) => {
  useFonts(["Cormorant+Garamond:wght@300;400;500;700", "Inter:wght@300;400;500;600"]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0a", color: "#e8e6e0" }} className="min-h-screen antialiased">
      <BackRibbon tone="dark" />

      {/* NAV — centered, formal */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 items-center">
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] text-white/60">
            <a href="#practice">Áreas</a>
            <a href="#firm">Firma</a>
            <a href="#insights">Insights</a>
          </nav>
          <div className="text-center">
            <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-medium tracking-wider">
              MORETTI
            </div>
            <div className="text-[9px] tracking-[0.4em] text-[#b8945f] mt-0.5">& ASSOCIATES · EST. 2002</div>
          </div>
          <div className="flex justify-end">
            <a href={`tel:${site.phone}`}
              className="text-[11px] uppercase tracking-[0.25em] text-[#b8945f] hover:text-white transition">
              {site.phone}
            </a>
          </div>
        </div>
      </header>

      {/* HERO — Centered classical */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={site.heroImage} alt="" width={1600} height={1200} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-40 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="text-[11px] uppercase tracking-[0.5em] text-[#b8945f] mb-8">
            {site.tagline}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.05] tracking-tight">
            {site.headline}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
            {site.subheadline}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="mt-12 flex flex-wrap justify-center gap-4">
            <a href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 bg-[#b8945f] text-black px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white transition">
              {site.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a href="#practice"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] hover:border-[#b8945f] hover:text-[#b8945f] transition">
              {site.cta2Label}
            </a>
          </motion.div>

          {/* trust bar */}
          <div className="mt-24 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "20+", l: "Anos de atuação" },
              { n: "$3B+", l: "Em transações" },
              { n: "500+", l: "Clientes atendidos" },
              { n: "12", l: "Escritórios parceiros" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-[#b8945f]">{s.n}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section id="practice" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#b8945f] mb-4">Áreas de atuação</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-6xl font-light">
              Estratégia jurídica de precisão
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {site.services.map((s, i) => {
              const Icons = [Scale, Landmark, Shield, Award];
              const Icon = Icons[i] || Scale;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0a0a0a] p-10 hover:bg-[#0f0f0f] transition group cursor-pointer">
                  <Icon className="w-8 h-8 text-[#b8945f] mb-6" strokeWidth={1.2} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl mb-3 group-hover:text-[#b8945f] transition">
                    {s.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed mb-6">{s.desc}</p>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[#b8945f] flex items-center gap-2">
                    Saiba mais <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLIENT SAY */}
      <section id="insights" className="py-32 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-4xl mx-auto">
          {site.testimonials.map((t, i) => (
            <motion.figure key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-12 border-b border-white/10 last:border-0">
              <blockquote style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl md:text-4xl leading-tight font-light italic">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <div className="w-10 h-px bg-[#b8945f]" />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* FIRM / CONTACT */}
      <section id="firm" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#b8945f] mb-4">Agende uma reunião</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Consulta estratégica confidencial — 45 minutos, sem custo.
            </h2>
            <a href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 bg-[#b8945f] text-black px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white transition">
              {site.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="space-y-6 text-sm border-l border-white/10 pl-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#b8945f] mb-2">Escritório</div>
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-white/40" /> <span>{site.address}<br />{site.city}</span></div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#b8945f] mb-2">Contato direto</div>
              <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-[#b8945f]"><Phone className="w-4 h-4 text-white/40" /> {site.phone}</a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-[#b8945f] mt-2"><Mail className="w-4 h-4 text-white/40" /> {site.email}</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div>© 2026 Moretti & Associates. Attorney advertising.</div>
          <SklyraCredit tone="dark" />
        </div>
      </footer>
    </div>
  );
};

export default MorettiLaw;
