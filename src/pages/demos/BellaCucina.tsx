import { motion } from "framer-motion";
import { Phone, MapPin, Mail, MessageCircle, Wine, Utensils, Flame, Users, Star, ChevronRight } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { BackRibbon, SklyraCredit, useFonts } from "./_shared";

const BellaCucina = ({ site }: { site: DemoSite }) => {
  useFonts(["Playfair+Display:ital,wght@0,400;0,700;0,900;1,400", "Cormorant+Garamond:wght@300;400", "Manrope:wght@300;400;600"]);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: "#f5efe6", color: "#1a0f08" }} className="min-h-screen antialiased">
      <BackRibbon tone="light" />

      {/* NAV */}
      <header className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl italic font-black tracking-tight">
            {site.brand}
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.25em]">
            <a href="#menu">Menu</a>
            <a href="#story">Nossa história</a>
            <a href="#reviews">Reviews</a>
            <a href="#visit">Visite</a>
          </nav>
          <a
            href={`tel:${site.phone}`}
            className="text-xs uppercase tracking-[0.2em] border border-black px-4 py-2 hover:bg-black hover:text-[#f5efe6] transition"
          >
            Reservar
          </a>
        </div>
      </header>

      {/* HERO — Editorial magazine */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic text-lg text-[#8a2f2f] mb-4">
              — {site.tagline}
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-black"
            >
              {site.headline.split(" ").slice(0, -3).join(" ")}{" "}
              <em className="italic text-[#8a2f2f] font-normal">
                {site.headline.split(" ").slice(-3).join(" ")}
              </em>
            </motion.h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="mt-8 text-2xl leading-snug max-w-xl text-black/70">
              {site.subheadline}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#8a2f2f] text-[#f5efe6] px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-black transition">
                <Utensils className="w-4 h-4" /> {site.ctaLabel}
              </a>
              <a href="#menu" className="inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-[0.2em] border border-black hover:bg-black hover:text-[#f5efe6] transition">
                {site.cta2Label}
              </a>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#8a2f2f]" />
            <img src={site.heroImage} alt={site.brand} width={1600} height={1200}
              className="relative w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </section>

      {/* STORY strip */}
      <section id="story" className="bg-[#1a0f08] text-[#f5efe6] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Flame className="w-8 h-8 mx-auto mb-6 text-[#e8a951]" />
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="italic text-3xl md:text-5xl leading-tight">
            "Cozinhamos como se cada prato fosse servido para a família. Porque, na nossa cozinha, ele é."
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-[#e8a951]">— Chef Alessandro Moretti</p>
        </div>
      </section>

      {/* MENU / SERVICES — column layout */}
      <section id="menu" className="max-w-6xl mx-auto py-24 px-6">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8a2f2f] mb-3">Il nostro menu</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-6xl font-black">
            O que fazemos
          </h2>
        </div>
        <div className="divide-y divide-black/15 border-y border-black/15">
          {site.services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="grid md:grid-cols-[80px_1fr_auto] gap-6 py-8 items-baseline group">
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl italic text-[#8a2f2f]/60">
                0{i + 1}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-[#8a2f2f] transition">
                  {s.title}
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl text-black/70 leading-snug max-w-2xl">{s.desc}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-black/40 group-hover:text-[#8a2f2f] group-hover:translate-x-1 transition" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-[#ede4d3] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#8a2f2f] mb-3">Recensioni</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-6xl font-black">
              O que dizem à nossa mesa
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {site.testimonials.map((t, i) => (
              <motion.figure key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f5efe6] p-8 border border-black/10">
                <div className="flex gap-0.5 mb-4">{[0,1,2,3,4].map(k => <Star key={k} className="w-4 h-4 fill-[#e8a951] text-[#e8a951]" />)}</div>
                <blockquote style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl leading-snug italic mb-6">"{t.text}"</blockquote>
                <figcaption className="text-xs uppercase tracking-[0.2em]">
                  <div className="font-bold">{t.name}</div>
                  <div className="text-black/50 mt-1">{t.role}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="max-w-3xl mx-auto py-24 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#8a2f2f] mb-3">Vieni a trovarci</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-6xl font-black mb-10">
          Sua mesa te espera
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-lg text-left">
          <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-[#8a2f2f] transition">
            <Phone className="w-5 h-5 text-[#8a2f2f]" /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-[#8a2f2f] transition">
            <Mail className="w-5 h-5 text-[#8a2f2f]" /> {site.email}
          </a>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#8a2f2f]" /> {site.address}, {site.city}
          </div>
          <div className="flex items-center gap-3 text-black/60">
            <Users className="w-5 h-5 text-[#8a2f2f]" /> Ter–Dom · 17h30–23h
          </div>
        </div>
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
          className="mt-12 inline-flex items-center gap-2 bg-[#8a2f2f] text-[#f5efe6] px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-black transition">
          <MessageCircle className="w-4 h-4" /> {site.ctaLabel}
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div style={{ fontFamily: "'Playfair Display', serif" }} className="italic text-lg">© 2026 {site.brand}</div>
          <SklyraCredit tone="light" />
        </div>
      </footer>
    </div>
  );
};

export default BellaCucina;
