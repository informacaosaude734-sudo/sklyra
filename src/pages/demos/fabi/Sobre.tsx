import { motion } from "framer-motion";
import { DemoSite } from "@/data/demoSites";
import { F, FabiLayout } from "./_layout";
import { FABI_EXTRAS } from "@/data/demoExtras";
import fabiAbout from "@/assets/demos/fabi/about.webp";

const Seal = ({ label, sub }: { label: string; sub: string }) => (
  <motion.svg initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
    transition={{ type: "spring", damping: 12 }}
    viewBox="0 0 120 120" className="w-24 h-24">
    <circle cx="60" cy="60" r="56" fill="none" stroke={F.gold} strokeWidth="1" />
    <circle cx="60" cy="60" r="48" fill="none" stroke={F.gold} strokeWidth="0.5" opacity="0.5" />
    <text x="60" y="58" textAnchor="middle" fontFamily={F.serif} fontSize="12" fill={F.goldLight} fontStyle="italic">{label}</text>
    <text x="60" y="72" textAnchor="middle" fontFamily={F.sans} fontSize="7" fill={F.gold} letterSpacing="2">{sub}</text>
  </motion.svg>
);

const Sobre = ({ site }: { site: DemoSite }) => (
  <FabiLayout site={site} active="sobre">
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-[1fr_1.2fr] gap-12 items-end">
      <motion.div initial={{ opacity: 0, filter: "blur(20px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative aspect-[3/4] overflow-hidden"
      >
        <img src={fabiAbout} alt="Fabi" className="w-full h-full object-cover" />
        <div className="absolute -inset-3 border pointer-events-none" style={{ borderColor: F.gold }} />
      </motion.div>
      <div>
        <p style={{ color: F.gold }} className="text-[11px] uppercase tracking-[0.4em] mb-4">About the artist</p>
        <h1 style={{ fontFamily: F.serif, color: F.goldLight }} className="text-5xl md:text-8xl font-light leading-[0.95] italic">
          Meet Fabi.
        </h1>
        <p style={{ color: F.ink2 }} className="mt-8 text-xl leading-relaxed max-w-lg font-light">
          A Brazilian hair artist who moved to Los Angeles for the craft — and to Orlando for the life she wanted to build around it.
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="space-y-8">
        {FABI_EXTRAS.bio.story.map((p, i) => (
          <motion.p key={i}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
            style={{ fontFamily: F.serif, color: F.ink }}
            className="text-2xl md:text-3xl font-light italic leading-snug"
          >
            {p}
          </motion.p>
        ))}
      </div>
    </section>

    {/* Principles */}
    <section className="border-t border-b py-24 px-6" style={{ borderColor: F.line, background: "#0e0b09" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p style={{ color: F.gold }} className="text-[11px] uppercase tracking-[0.4em] mb-4">My four principles</p>
          <h2 style={{ fontFamily: F.serif, color: F.goldLight }} className="text-4xl md:text-6xl italic font-light">The way I work.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {FABI_EXTRAS.bio.principles.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border p-8 md:p-10 flex gap-6" style={{ borderColor: F.line, background: F.bg }}
            >
              <div style={{ fontFamily: F.serif, color: F.gold }} className="text-6xl italic font-light shrink-0 leading-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 style={{ fontFamily: F.serif, color: F.goldLight }} className="text-2xl italic font-light mb-3">{p.title}</h3>
                <p style={{ color: F.ink2 }} className="leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Seals */}
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <p style={{ color: F.gold }} className="text-[11px] uppercase tracking-[0.4em]">Certifications & training</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-14">
        <Seal label="Certified" sub="SINCE 2015" />
        <Seal label="Balayage" sub="L.A. TRAINED" />
        <Seal label="Keratin" sub="FORMOL-FREE" />
        <Seal label="Bilingual" sub="EN · PT" />
      </div>
    </section>

    <section style={{ background: "#0e0b09" }} className="py-24 px-6">
      <p style={{ fontFamily: F.serif, color: F.goldLight }} className="italic text-3xl md:text-6xl leading-tight text-center max-w-4xl mx-auto font-light">
        "I don't do fast. I do <em style={{ color: F.gold }}>right</em>."
      </p>
      <p className="text-center text-[11px] uppercase tracking-[0.4em] mt-8" style={{ color: F.gold }}>— Fabi</p>
    </section>
  </FabiLayout>
);

export default Sobre;
