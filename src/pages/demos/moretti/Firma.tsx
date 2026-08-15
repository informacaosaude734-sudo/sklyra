import { motion } from "framer-motion";
import { DemoSite } from "@/data/demoSites";
import { M, MorettiLayout } from "./_layout";
import { MORETTI_EXTRAS } from "@/data/demoExtras";
import { AccoladesStrip } from "../_realism";

const Stamp = ({ label }: { label: string }) => (
  <motion.svg initial={{ opacity: 0, scale: 0.6, rotate: -20 }} whileInView={{ opacity: 1, scale: 1, rotate: -12 }} viewport={{ once: true }}
    transition={{ type: "spring", damping: 12 }}
    width="110" height="110" viewBox="0 0 110 110" className="absolute -top-4 -right-4">
    <circle cx="55" cy="55" r="50" fill="none" stroke={M.gold} strokeWidth="1.5" opacity="0.7" />
    <circle cx="55" cy="55" r="42" fill="none" stroke={M.gold} strokeWidth="0.5" opacity="0.5" />
    <text x="55" y="53" textAnchor="middle" fontFamily={M.mono} fontSize="9" fill={M.gold} letterSpacing="2">{label}</text>
    <text x="55" y="66" textAnchor="middle" fontFamily={M.mono} fontSize="7" fill={M.gold} letterSpacing="2" opacity="0.7">CONFIDENTIAL</text>
  </motion.svg>
);

const Firma = ({ site }: { site: DemoSite }) => (
  <MorettiLayout site={site} active="firma">
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
      <p style={{ fontFamily: M.mono, color: M.gold }} className="text-[10px] tracking-[0.4em] mb-6">I. FIRMA · SÓCIOS</p>
      <h1 style={{ fontFamily: M.serif }} className="text-5xl md:text-8xl font-light leading-[1.02] tracking-tight max-w-4xl">
        Quatro sócios. Uma disciplina: <em className="italic" style={{ color: M.gold }}>estratégia antes de tudo.</em>
      </h1>
      <p style={{ color: M.ink2 }} className="mt-8 text-lg max-w-2xl leading-relaxed font-light">
        A Moretti & Associates é intencionalmente pequena. Não crescemos por volume — crescemos por caso. Cada sócio assume pessoalmente cada mandato relevante.
      </p>
    </section>

    <section className="border-t" style={{ borderColor: M.line }}>
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-px" style={{ background: M.line }}>
        {MORETTI_EXTRAS.partners.map((p, i) => (
          <motion.article key={p.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative p-10 md:p-12"
            style={{ background: M.bg }}
          >
            <Stamp label={p.bar.replace(/, /g, " · ")} />
            <div style={{ fontFamily: M.mono, color: M.gold }} className="text-[10px] tracking-[0.35em] mb-4">DOSSIER · {String(i + 1).padStart(2, "0")}</div>
            <h2 style={{ fontFamily: M.serif }} className="text-4xl md:text-5xl font-light leading-tight">{p.name}</h2>
            <p style={{ color: M.gold }} className="text-sm mt-2 uppercase tracking-[0.25em]">{p.role}</p>

            <div className="mt-8 grid grid-cols-2 gap-y-4 text-sm" style={{ fontFamily: M.mono }}>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.ink2 }}>Bar admissions</div>
                <div className="mt-1">{p.bar}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.ink2 }}>Anos</div>
                <div className="mt-1">{p.years}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.ink2 }}>Foco</div>
                <div className="mt-1">{p.focus}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: M.ink2 }}>Formação</div>
                <div className="mt-1">{p.education}</div>
              </div>
            </div>

            <blockquote style={{ fontFamily: M.serif }} className="mt-10 text-2xl italic font-light leading-snug border-l pl-6" >
              "{p.quote}"
            </blockquote>
          </motion.article>
        ))}
      </div>
    </section>

    <AccoladesStrip theme={{ bg: M.bg, ink: M.ink, ink2: M.ink2, accent: M.gold, line: M.line, mono: M.mono, serif: M.serif }} />

    <section className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h2 style={{ fontFamily: M.serif }} className="text-3xl md:text-5xl font-light italic leading-tight">
        Um caso, um sócio, uma responsabilidade.
      </h2>
      <p style={{ color: M.ink2 }} className="mt-6 leading-relaxed max-w-2xl mx-auto">
        Não terceirizamos decisões estratégicas para associates. O sócio que abre o caso é o mesmo que negocia, redige e assina.
      </p>
    </section>
  </MorettiLayout>
);

export default Firma;
