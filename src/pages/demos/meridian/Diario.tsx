import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { MR, MeridianLayout } from "./_layout";
import { MERIDIAN_EXTRAS } from "@/data/demoExtras";

const Diario = ({ site }: { site: DemoSite }) => {
  const [featured, ...rest] = MERIDIAN_EXTRAS.articles;
  return (
    <MeridianLayout site={site} active="diario">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: MR.gold }}>Diário Meridian · edição de junho</p>
        <h1 style={{ fontFamily: MR.serif }} className="text-5xl md:text-8xl font-light leading-[1.02] tracking-tight">
          Análises que <em className="italic" style={{ color: MR.gold }}>circulam</em> no nosso portfolio.
        </h1>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <motion.article
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid md:grid-cols-[1.1fr_1fr] gap-10 border-t border-b py-12 group cursor-pointer" style={{ borderColor: MR.line }}
        >
          <div className="aspect-[4/3] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${MR.gold}, ${MR.dark})` }}>
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url(${site.heroImage})`, backgroundSize: "cover" }} />
            <div className="absolute top-4 left-4 text-[10px] tracking-[0.35em] px-2 py-1 uppercase" style={{ background: MR.bg, color: MR.gold }}>Destaque</div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em]" style={{ color: MR.ink2 }}>
                <span style={{ color: MR.gold }}>{featured.tag}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.read}</span>
              </div>
              <h2 style={{ fontFamily: MR.serif }} className="text-3xl md:text-5xl font-light leading-tight mt-6 group-hover:text-[color:var(--gold)] transition" >
                {featured.title}
              </h2>
              <p style={{ color: MR.ink2 }} className="mt-6 text-lg leading-relaxed font-light">{featured.excerpt}</p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em]" style={{ color: MR.gold }}>
              Ler análise completa <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </motion.article>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-10">
        {rest.map((a, i) => (
          <motion.article key={a.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="border-t pt-8 group cursor-pointer" style={{ borderColor: MR.line }}
          >
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em]" style={{ color: MR.ink2 }}>
              <span style={{ color: MR.gold }}>{a.tag}</span>
              <span>·</span>
              <span>{a.date}</span>
              <span>·</span>
              <span>{a.read}</span>
            </div>
            <h3 style={{ fontFamily: MR.serif }} className="text-2xl md:text-3xl font-light leading-tight mt-4">{a.title}</h3>
            <p className="mt-4 text-base font-light leading-relaxed" style={{ color: MR.ink2 }}>{a.excerpt}</p>
            <div className="mt-6 text-[11px] uppercase tracking-[0.3em] inline-flex items-center gap-2" style={{ color: MR.gold }}>
              Ler <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.article>
        ))}
      </section>

      <section style={{ background: MR.dark, color: MR.bg }} className="py-20 px-6 text-center">
        <p style={{ fontFamily: MR.serif }} className="italic text-2xl md:text-4xl max-w-3xl mx-auto leading-tight">
          Assine o Diário Meridian. Um e-mail por mês. Análises que vendem imóveis antes de eles chegarem ao mercado público.
        </p>
        <a href={`mailto:${site.email}?subject=Diario`}
          style={{ background: MR.goldLight, color: MR.dark }}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition">
          Assinar sem custo
        </a>
      </section>
    </MeridianLayout>
  );
};

export default Diario;
