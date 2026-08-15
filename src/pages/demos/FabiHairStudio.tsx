import { motion } from "framer-motion";
import { Phone, MapPin, Mail, MessageCircle, Star, Instagram, Sparkles, Scissors, ChevronRight } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { BackRibbon, SklyraCredit, useFonts } from "./_shared";

const GOLD = "#C9A26B";
const GOLD_LIGHT = "#E6C79A";
const BG = "#0b0908";
const INK = "#f2ead8";
const INK2 = "rgba(242,234,216,0.65)";
const LINE = "rgba(242,234,216,0.12)";

const FabiHairStudio = ({ site }: { site: DemoSite }) => {
  useFonts([
    "Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,400",
    "Inter:wght@300;400;500;600",
  ]);

  const nav = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ];

  const serif = "'Cormorant Garamond', serif";
  const sans = "'Inter', sans-serif";

  return (
    <div style={{ fontFamily: sans, background: BG, color: INK }} className="min-h-screen antialiased">
      <BackRibbon tone="dark" />

      {/* NAV */}
      <header className="border-b" style={{ borderColor: LINE }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="#top" style={{ fontFamily: serif, color: GOLD }} className="text-3xl italic font-medium tracking-tight">
            fabi<span className="text-[10px] not-italic uppercase tracking-[0.3em] ml-2" style={{ color: INK2 }}>Hair Studio</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.25em]" style={{ color: INK2 }}>
            {nav.map((n) => <a key={n.label} href={n.href} className="hover:text-[color:var(--gold)] transition" style={{ ["--gold" as any]: GOLD }}>{n.label}</a>)}
          </nav>
          <div className="flex items-center gap-4">
            <a href={`tel:${site.phone}`} className="hidden md:flex items-center gap-2 text-xs" style={{ color: INK2 }}>
              <Phone className="w-3.5 h-3.5" style={{ color: GOLD }} />
              +1 {site.phone}
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
              style={{ background: GOLD, color: "#1a1108" }}
              className="rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium hover:opacity-90 transition">
              Book appointment
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="text-[11px] uppercase tracking-[0.4em] mb-6" style={{ color: GOLD }}>
              Orlando, Florida
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
              style={{ fontFamily: serif, color: GOLD_LIGHT }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight font-light">
              Where <em className="italic" style={{ color: GOLD }}>Beauty</em>
              <br />Meets <em className="italic" style={{ color: GOLD }}>Confidence</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
              className="mt-8 text-lg leading-relaxed max-w-md" style={{ color: INK2 }}>
              {site.subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
              className="mt-10 flex flex-wrap gap-3">
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
                style={{ background: GOLD, color: "#1a1108" }}
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition">
                <MessageCircle className="w-4 h-4" /> {site.ctaLabel}
              </a>
              <a href="#services" style={{ borderColor: `${GOLD}80`, color: INK }}
                className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition">
                {site.cta2Label}
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 px-6" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: GOLD }}>About</p>
            <h2 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-4xl md:text-6xl leading-[1.02] font-light mb-8">
              Meet <em className="italic" style={{ color: GOLD }}>Fabi</em>
            </h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: INK2 }}>
              <p>A Brazilian hair artist based in Orlando, known for natural techniques, a warm approach, and a genuine passion for helping women rediscover confidence through beauty.</p>
              <p>Professionally trained in the United States and certified since 2015. Before Orlando, Fabi refined her craft in Los Angeles — where her artistic vision truly took shape.</p>
              <p style={{ color: INK }}>The studio was born from a simple mission: premium, customized services in a cozy, private atmosphere where every detail is about <em style={{ fontFamily: serif, color: GOLD }}>you</em>.</p>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-10 text-sm">
              <div>
                <div style={{ fontFamily: serif, color: GOLD }} className="text-4xl">10+</div>
                <div className="text-[11px] uppercase tracking-[0.25em] mt-1" style={{ color: INK2 }}>Years of craft</div>
              </div>
              <div>
                <div style={{ fontFamily: serif, color: GOLD }} className="text-4xl">1:1</div>
                <div className="text-[11px] uppercase tracking-[0.25em] mt-1" style={{ color: INK2 }}>Private studio</div>
              </div>
              <div>
                <div style={{ fontFamily: serif, color: GOLD }} className="text-4xl">EN · PT</div>
                <div className="text-[11px] uppercase tracking-[0.25em] mt-1" style={{ color: INK2 }}>Bilingual service</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: GOLD }}>Featured Services</p>
            <h2 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-4xl md:text-6xl font-light leading-[1.05]">
              Comprehensive <em className="italic" style={{ color: GOLD }}>beauty treatments</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: LINE }}>
            {site.services.map((s, i) => (
              <motion.a
                key={s.title}
                href={`https://wa.me/${site.whatsapp}?text=I%20want%20to%20book%20${encodeURIComponent(s.title)}`}
                target="_blank" rel="noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                style={{ background: BG }}
                className="group p-8 md:p-10 hover:bg-white/[0.02] transition">
                <Scissors className="w-5 h-5 mb-6" style={{ color: GOLD }} strokeWidth={1.2} />
                <h3 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-2xl md:text-3xl font-light mb-3">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: INK2 }}>{s.desc}</p>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] group-hover:gap-3 transition-all" style={{ color: GOLD }}>
                  Book now <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              View all services <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* QUOTE STRIP */}
      <section className="py-20 md:py-28 px-6 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${BG}, #14100b, ${BG})` }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto text-center">
          <Sparkles className="w-6 h-6 mx-auto mb-8" style={{ color: GOLD }} />
          <p style={{ fontFamily: serif, color: GOLD_LIGHT }} className="italic text-3xl md:text-5xl leading-[1.15] font-light">
            "Every strand tells a story. My job is to make yours the most beautiful one you've ever worn."
          </p>
          <p className="mt-10 text-[11px] uppercase tracking-[0.4em]" style={{ color: GOLD }}>— Fabi</p>
        </motion.div>
      </section>

      {/* SIGNATURE */}
      <section id="gallery" className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: GOLD }}>Signature Touch</p>
          <h2 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-4xl md:text-6xl font-light leading-[1.05]">
            Ready to <em className="italic" style={{ color: GOLD }}>fall in love</em>
            <br />with your hair again?
          </h2>
          <p className="mt-6 text-base max-w-xl mx-auto" style={{ color: INK2 }}>
            Subtle changes, thoughtful details — every appointment is designed around the way you want to feel when you walk out the door.
          </p>
          <div className="mt-14 grid sm:grid-cols-3 gap-px" style={{ background: LINE }}>
            {[
              { k: "01", t: "Consultation", d: "We start by listening. Your hair story, routine and goals." },
              { k: "02", t: "Craft", d: "Precision cuts, custom color, and treatments tailored to your strands." },
              { k: "03", t: "Confidence", d: "You leave with hair that feels — and moves — exactly like you." },
            ].map((s) => (
              <div key={s.k} style={{ background: BG }} className="p-10 text-left">
                <div style={{ color: GOLD, fontFamily: serif }} className="text-3xl italic mb-4">{s.k}</div>
                <h3 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-2xl font-light mb-2">{s.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: INK2 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 md:py-32 px-6" style={{ background: "#0e0b09" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: GOLD }}>Testimonials</p>
            <h2 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-4xl md:text-6xl font-light">
              Loved by our <em className="italic" style={{ color: GOLD }}>clients</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {site.testimonials.map((t, i) => (
              <motion.figure key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border rounded-sm"
                style={{ background: BG, borderColor: LINE }}>
                <div className="flex gap-0.5 mb-5">
                  {[0,1,2,3,4].map(k => <Star key={k} className="w-4 h-4 fill-current" style={{ color: GOLD }} />)}
                </div>
                <blockquote style={{ fontFamily: serif, color: INK }} className="text-xl leading-snug italic mb-6">
                  "{t.text}"
                </blockquote>
                <figcaption className="text-[11px] uppercase tracking-[0.25em]">
                  <div style={{ color: GOLD }}>{t.name}</div>
                  <div className="mt-1" style={{ color: INK2 }}>{t.role}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto py-24 md:py-32 px-6">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: GOLD }}>FAQ</p>
          <h2 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-4xl md:text-6xl font-light">
            Frequently <em className="italic" style={{ color: GOLD }}>asked</em>
          </h2>
        </div>
        <div className="divide-y" style={{ borderColor: LINE }}>
          {site.faqs.map((f, i) => (
            <motion.div key={f.q}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="py-6 border-t" style={{ borderColor: LINE }}>
              <h3 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-2xl font-light mb-2">{f.q}</h3>
              <p style={{ color: INK2 }} className="leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT / VISIT */}
      <section id="visit" className="py-24 md:py-32 px-6 border-t" style={{ borderColor: LINE, background: "#0e0b09" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: GOLD }}>Visit the studio</p>
          <h2 style={{ fontFamily: serif, color: GOLD_LIGHT }} className="text-4xl md:text-6xl font-light leading-[1.05] mb-10">
            Let's create your <em className="italic" style={{ color: GOLD }}>transformation</em> today.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-base text-left" style={{ color: INK }}>
            <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:opacity-70 transition">
              <Phone className="w-4 h-4" style={{ color: GOLD }} /> +1 {site.phone}
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-70 transition">
              <MessageCircle className="w-4 h-4" style={{ color: GOLD }} /> WhatsApp — instant reply
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:opacity-70 transition">
              <Mail className="w-4 h-4" style={{ color: GOLD }} /> {site.email}
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1" style={{ color: GOLD }} />
              <span>{site.address} · {site.city}</span>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-70 transition">
              <Instagram className="w-4 h-4" style={{ color: GOLD }} /> @fabihairstudio
            </a>
          </div>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
            style={{ background: GOLD, color: "#1a1108" }}
            className="mt-12 inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition">
            <MessageCircle className="w-4 h-4" /> Book your appointment
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 px-6" style={{ borderColor: LINE }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div style={{ fontFamily: serif, color: GOLD }} className="text-xl italic">© 2026 {site.brand}</div>
          <SklyraCredit tone="dark" />
        </div>
      </footer>
    </div>
  );
};

export default FabiHairStudio;
