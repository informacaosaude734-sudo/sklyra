import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Phone, Calculator } from "lucide-react";
import { DemoSite } from "@/data/demoSites";

/* ────────── DATA (per-brand realism content) ────────── */

interface GReview {
  name: string;
  initials: string;
  color: string;
  reviews: number;
  localGuide?: boolean;
  months: string; // "2 months ago"
  stars: 5;
  text: string;
  photos?: number;
}

const REVIEWS_BY_SLUG: Record<string, { count: number; rating: string; items: GReview[] }> = {
  "bella-cucina": {
    count: 2847,
    rating: "4.9",
    items: [
      { name: "Ana Ribeiro", initials: "AR", color: "#5b8def", reviews: 42, localGuide: true, months: "2 weeks ago", stars: 5, photos: 3,
        text: "Absolutely the best carbonara outside of Rome. We came for our anniversary and the staff made it unforgettable — Alessandro even came out to say hi. The truffle tagliatelle is worth every dollar." },
      { name: "Marco Silva", initials: "MS", color: "#f2a94f", reviews: 128, localGuide: true, months: "1 month ago", stars: 5,
        text: "Been coming here every Friday for two years. Never disappoints. The wine list is deep and the sommelier actually listens to what you like before recommending." },
      { name: "Jenna Klein", initials: "JK", color: "#a97ff4", reviews: 17, months: "3 weeks ago", stars: 5, photos: 5,
        text: "The tiramisu is a religious experience. Reserve at least a week ahead on weekends, but weekday dinner is easier. North End's hidden gem." },
    ],
  },
  "moretti-law": {
    count: 186,
    rating: "5.0",
    items: [
      { name: "Ricardo Almeida", initials: "RA", color: "#0f5c4a", reviews: 8, months: "1 month ago", stars: 5,
        text: "Moretti's team restructured our US-Brazil holding in 6 weeks. Every partner is a subject-matter expert — no juniors handling strategic decisions. Worth every dollar of the retainer." },
      { name: "Luiza Fernandes", initials: "LF", color: "#7d3a6c", reviews: 3, months: "2 months ago", stars: 5,
        text: "EB-5 approved in 8 months. They flagged issues our previous firm missed and got us across the finish line. Bilingual, precise, and never a surprise invoice." },
      { name: "Carlos Meireles", initials: "CM", color: "#8b4a1f", reviews: 12, localGuide: true, months: "4 months ago", stars: 5,
        text: "Their international tax structuring saved us $2.3M in the first year alone. They think three moves ahead. Highly recommend for any founder with US-Brazil exposure." },
    ],
  },
  "meridian-realty": {
    count: 412,
    rating: "4.9",
    items: [
      { name: "Fernando Costa", initials: "FC", color: "#a8813e", reviews: 24, months: "3 weeks ago", stars: 5, photos: 8,
        text: "We closed on our Brickell penthouse in 32 days from São Paulo — remotely. Ricardo handled the LLC formation, wire compliance, and even set us up with a private banker. Truly white-glove." },
      { name: "Renata Vieira", initials: "RV", color: "#5b8def", reviews: 61, localGuide: true, months: "2 months ago", stars: 5,
        text: "My three investment properties in Miami cash-flow $18k/month combined. Meridian manages everything — I live in Rio and haven't visited in 18 months. Zero issues." },
      { name: "Paulo Nogueira", initials: "PN", color: "#4a7c59", reviews: 9, months: "6 weeks ago", stars: 5, photos: 4,
        text: "Moved the whole family from BH to Sunny Isles. Meridian found the house, the school, opened the bank account, and got the LLC done. Ridiculously smooth." },
    ],
  },
  "fabi-hair-studio": {
    count: 328,
    rating: "5.0",
    items: [
      { name: "Isabella M.", initials: "IM", color: "#b57bc9", reviews: 11, months: "1 week ago", stars: 5, photos: 2,
        text: "Fabi actually listens. I brought references and she told me honestly what would work with my hair type — my balayage has never looked so natural. Salon is calm, private, and she takes her time." },
      { name: "Camila R.", initials: "CR", color: "#d4a373", reviews: 34, localGuide: true, months: "3 weeks ago", stars: 5, photos: 4,
        text: "The keratin treatment is life-changing. I've had it done at four other salons and Fabi's is the only one that lasted a full 5 months. Worth the drive from Kissimmee." },
      { name: "Sophia L.", initials: "SL", color: "#7fb069", reviews: 6, months: "2 months ago", stars: 5,
        text: "Another salon absolutely destroyed my color. Fabi did a full correction in one session — no damage, no brass, real blonde. She's a magician." },
    ],
  },
};

const PRESS_BY_SLUG: Record<string, string[]> = {
  "bella-cucina": ["Eater Boston", "Boston Magazine", "The Boston Globe", "Bon Appétit", "Zagat"],
  "moretti-law": ["Chambers USA", "Super Lawyers", "Best Lawyers", "The American Lawyer", "Latin Lawyer"],
  "meridian-realty": ["Miami Herald", "Mansion Global", "Robb Report", "Forbes", "The Real Deal"],
  "fabi-hair-studio": ["Allure", "Refinery29", "Orlando Magazine", "Behind The Chair", "Modern Salon"],
};

const HOURS_BY_SLUG: Record<string, { open: number; close: number; days: number[] }> = {
  // hours in 24h, days = 0=Sun...6=Sat
  "bella-cucina": { open: 17.5, close: 23, days: [2, 3, 4, 5, 6, 0] },      // Tue–Sun 5:30pm–11pm
  "moretti-law": { open: 9, close: 19, days: [1, 2, 3, 4, 5] },              // Mon–Fri 9–7
  "meridian-realty": { open: 9, close: 20, days: [0, 1, 2, 3, 4, 5, 6] },    // 7 days
  "fabi-hair-studio": { open: 10, close: 20, days: [2, 3, 4, 5, 6] },        // Tue–Sat
};

/* ────────── LIVE HOURS BADGE ────────── */

export const LiveHours = ({ slug, accent, ink2 }: { slug: string; accent: string; ink2: string }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  const cfg = HOURS_BY_SLUG[slug];
  if (!cfg) return null;

  const hour = now.getHours() + now.getMinutes() / 60;
  const day = now.getDay();
  const isDayOpen = cfg.days.includes(day);
  const isOpen = isDayOpen && hour >= cfg.open && hour < cfg.close;
  const closeH = Math.floor(cfg.close);
  const closeM = Math.round((cfg.close - closeH) * 60);
  const closeStr = `${closeH > 12 ? closeH - 12 : closeH}${closeM ? ":" + String(closeM).padStart(2, "0") : ""}${closeH >= 12 ? "pm" : "am"}`;
  const openH = Math.floor(cfg.open);
  const openM = Math.round((cfg.open - openH) * 60);
  const openStr = `${openH > 12 ? openH - 12 : openH}${openM ? ":" + String(openM).padStart(2, "0") : ""}${openH >= 12 ? "pm" : "am"}`;

  return (
    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]" style={{ color: ink2 }}>
      <span className="relative flex h-2 w-2">
        <motion.span
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inline-flex h-full w-full rounded-full"
          style={{ background: isOpen ? "#22c55e" : "#ef4444" }}
        />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: isOpen ? "#22c55e" : "#ef4444" }} />
      </span>
      <span style={{ color: isOpen ? "#22c55e" : accent }}>
        {isOpen ? `Open now · closes ${closeStr}` : `Closed · opens ${openStr}`}
      </span>
    </div>
  );
};

/* ────────── GOOGLE REVIEWS ────────── */

const GoogleG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.7 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.3l6.2 5.2C41.7 34.5 44 29.6 44 24c0-1.2-.1-2.4-.4-3.5z"/>
  </svg>
);

export const GoogleReviews = ({ slug, theme }: { slug: string; theme: { bg: string; ink: string; ink2: string; accent: string; panel: string; line: string; serif: string; sans: string } }) => {
  const data = REVIEWS_BY_SLUG[slug];
  if (!data) return null;
  const stars = Number(data.rating);
  return (
    <section id="reviews" style={{ background: theme.panel }} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header — Google-style rating strip */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-3 mb-4">
            <GoogleG size={28} />
            <span style={{ fontFamily: theme.sans }} className="text-lg font-medium" >Google Reviews</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span style={{ fontFamily: theme.serif, color: theme.accent }} className="text-6xl font-black">{data.rating}</span>
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map((i) => (
                <Star key={i} className="w-5 h-5" fill={i < Math.floor(stars) ? theme.accent : "transparent"} style={{ color: theme.accent }} />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm" style={{ color: theme.ink2 }}>
            Based on <span className="font-bold" style={{ color: theme.ink }}>{data.count.toLocaleString()}</span> verified reviews
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.items.map((r, i) => (
            <motion.figure key={r.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ background: theme.bg, borderColor: theme.line }}
              className="p-7 border flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ background: r.color, fontFamily: theme.sans }}
                >
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: theme.ink }}>{r.name}</div>
                  <div className="text-[11px]" style={{ color: theme.ink2 }}>
                    {r.localGuide && <span style={{ color: theme.accent }}>Local Guide · </span>}
                    {r.reviews} review{r.reviews === 1 ? "" : "s"}
                    {r.photos ? ` · ${r.photos} photos` : ""}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {[0,1,2,3,4].map((k) => (
                    <Star key={k} className="w-3.5 h-3.5 fill-current" style={{ color: theme.accent }} />
                  ))}
                </div>
                <span className="text-[11px]" style={{ color: theme.ink2 }}>{r.months}</span>
              </div>
              <blockquote className="text-sm leading-relaxed flex-1" style={{ color: theme.ink }}>
                {r.text}
              </blockquote>
            </motion.figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" onClick={(e) => e.preventDefault()}
            style={{ borderColor: theme.line, color: theme.ink2 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.2em] border hover:opacity-70 transition">
            <GoogleG size={14} /> See all {data.count.toLocaleString()} reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

/* ────────── AS SEEN ON ────────── */

export const AsSeenOn = ({ slug, theme }: { slug: string; theme: { ink2: string; line: string; sans: string; serif: string; accent: string } }) => {
  const list = PRESS_BY_SLUG[slug];
  if (!list) return null;
  return (
    <section className="border-y py-10 px-6" style={{ borderColor: theme.line }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[10px] uppercase tracking-[0.5em] mb-6" style={{ color: theme.accent }}>
          As featured in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {list.map((name) => (
            <div key={name}
              style={{ fontFamily: theme.serif, color: theme.ink2 }}
              className="text-lg md:text-xl italic tracking-tight opacity-60 hover:opacity-100 transition"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ────────── MAP EMBED (no API key needed) ────────── */

export const MapEmbed = ({ site, height = 380, className = "" }: { site: DemoSite; height?: number; className?: string }) => {
  const q = encodeURIComponent(`${site.address}, ${site.city}`);
  const src = `https://www.google.com/maps?q=${q}&output=embed&z=15`;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      <iframe
        title={`Map of ${site.brand}`}
        src={src}
        width="100%" height="100%"
        style={{ border: 0, filter: "grayscale(0.2) contrast(0.95)" }}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

/* ────────── MORTGAGE CALCULATOR (Meridian) ────────── */

export const MortgageCalc = ({ theme, defaultPrice = 1500000 }: { theme: { bg: string; ink: string; ink2: string; accent: string; line: string; serif: string; sans: string }; defaultPrice?: number }) => {
  const [price, setPrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(30);
  const [rate, setRate] = useState(6.75);
  const [years, setYears] = useState(30);

  const monthly = useMemo(() => {
    const loan = price * (1 - downPct / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return loan / n;
    return (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [price, downPct, rate, years]);

  const loanAmount = price * (1 - downPct / 100);
  const dp = price * (downPct / 100);

  return (
    <div style={{ background: theme.bg, borderColor: theme.line }} className="border p-8 md:p-10">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-4 h-4" style={{ color: theme.accent }} />
        <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
          Foreign national mortgage estimator
        </span>
      </div>
      <div style={{ fontFamily: theme.serif, color: theme.ink }} className="text-3xl md:text-4xl italic font-light leading-tight mb-8">
        Uma estimativa em <em style={{ color: theme.accent }}>2 minutos.</em>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <label className="block">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.25em] mb-2" style={{ color: theme.ink2 }}>
              <span>Property price</span>
              <span style={{ color: theme.accent }}>${price.toLocaleString()}</span>
            </div>
            <input type="range" min={500000} max={10000000} step={50000} value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-current" style={{ color: theme.accent }} />
          </label>
          <label className="block">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.25em] mb-2" style={{ color: theme.ink2 }}>
              <span>Down payment</span>
              <span style={{ color: theme.accent }}>{downPct}% · ${dp.toLocaleString()}</span>
            </div>
            <input type="range" min={20} max={60} step={5} value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="w-full" style={{ color: theme.accent }} />
          </label>
          <label className="block">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.25em] mb-2" style={{ color: theme.ink2 }}>
              <span>Interest rate</span>
              <span style={{ color: theme.accent }}>{rate.toFixed(2)}%</span>
            </div>
            <input type="range" min={5} max={9} step={0.05} value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full" style={{ color: theme.accent }} />
          </label>
          <label className="block">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.25em] mb-2" style={{ color: theme.ink2 }}>
              <span>Loan term</span>
              <span style={{ color: theme.accent }}>{years} years</span>
            </div>
            <div className="flex gap-2">
              {[15, 20, 30].map((y) => (
                <button key={y} onClick={() => setYears(y)}
                  className="flex-1 py-2 border text-xs transition"
                  style={{
                    borderColor: years === y ? theme.accent : theme.line,
                    color: years === y ? theme.accent : theme.ink2,
                    background: years === y ? `${theme.accent}12` : "transparent",
                  }}>{y} yr</button>
              ))}
            </div>
          </label>
        </div>

        <div className="border-l pl-8 flex flex-col justify-between" style={{ borderColor: theme.line }}>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] mb-2" style={{ color: theme.ink2 }}>Estimated monthly</div>
            <div style={{ fontFamily: theme.serif, color: theme.accent }} className="text-5xl md:text-6xl font-light">
              ${Math.round(monthly).toLocaleString()}
            </div>
            <div className="text-[11px] mt-2" style={{ color: theme.ink2 }}>principal + interest only</div>
          </div>
          <div className="space-y-2 mt-8 text-sm" style={{ color: theme.ink2 }}>
            <div className="flex justify-between"><span>Loan amount</span><span style={{ color: theme.ink }}>${Math.round(loanAmount).toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Down payment</span><span style={{ color: theme.ink }}>${dp.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Total interest</span><span style={{ color: theme.ink }}>${Math.round(monthly * years * 12 - loanAmount).toLocaleString()}</span></div>
          </div>
          <p className="mt-6 text-[10px] italic leading-relaxed" style={{ color: theme.ink2 }}>
            Estimated for foreign national buyers, non-owner-occupied. Actual rates depend on lender, LTV and reserves.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ────────── RECENTLY SOLD TICKER (Meridian) ────────── */

const RECENT_SALES = [
  { nb: "Brickell", price: "$4.2M", days: 18, sqft: 2840 },
  { nb: "Sunny Isles", price: "$8.9M", days: 24, sqft: 3910 },
  { nb: "Coconut Grove", price: "$3.6M", days: 12, sqft: 3220 },
  { nb: "Bal Harbour", price: "$12.4M", days: 41, sqft: 4560 },
  { nb: "Edgewater", price: "$2.1M", days: 9, sqft: 1980 },
  { nb: "Key Biscayne", price: "$6.8M", days: 27, sqft: 3450 },
];

export const RecentlySoldTicker = ({ theme }: { theme: { ink: string; ink2: string; accent: string; line: string; serif: string; bg: string } }) => (
  <div className="border-y overflow-hidden" style={{ borderColor: theme.line, background: theme.bg }}>
    <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-2 w-2">
          <motion.span animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
            className="absolute inline-flex h-full w-full rounded-full bg-green-500" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Recently sold</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex gap-10 whitespace-nowrap"
        >
          {[...RECENT_SALES, ...RECENT_SALES].map((s, i) => (
            <div key={i} className="flex items-baseline gap-2 text-sm">
              <span style={{ fontFamily: theme.serif, color: theme.ink }} className="italic">{s.nb}</span>
              <span style={{ color: theme.accent }}>{s.price}</span>
              <span style={{ color: theme.ink2 }}>· {s.sqft.toLocaleString()} sqft</span>
              <span style={{ color: theme.ink2 }}>· sold in {s.days} days</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
);

/* ────────── ACCOLADES BADGE STRIP (Moretti) ────────── */

export const AccoladesStrip = ({ theme }: { theme: { bg: string; ink: string; ink2: string; accent: string; line: string; mono: string; serif: string } }) => {
  const items = [
    { title: "Chambers USA", sub: "Ranked · Corporate M&A", year: "2024" },
    { title: "Super Lawyers", sub: "Rising Stars · Immigration", year: "2023" },
    { title: "Best Lawyers", sub: '"Ones to Watch" · Tax Law', year: "2024" },
    { title: "Latin Lawyer 250", sub: "Elite Brazil desk", year: "2024" },
  ];
  return (
    <section className="border-y py-16 px-6" style={{ borderColor: theme.line, background: theme.bg }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.4em] mb-10 text-center" style={{ color: theme.accent, fontFamily: theme.mono }}>
          Accolades · Peer-reviewed rankings
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: theme.line }}>
          {items.map((it, i) => (
            <motion.div key={it.title}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-8 flex flex-col items-center text-center gap-3"
              style={{ background: theme.bg }}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke={theme.accent} strokeWidth="1" opacity="0.4" />
                <circle cx="22" cy="22" r="14" stroke={theme.accent} strokeWidth="0.5" opacity="0.6" />
                <path d="M15 22l5 5 9-10" stroke={theme.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ fontFamily: theme.serif, color: theme.ink }} className="text-xl font-light">{it.title}</div>
              <div className="text-[11px]" style={{ color: theme.ink2, fontFamily: theme.mono }}>{it.sub}</div>
              <div className="text-[10px] tracking-[0.3em]" style={{ color: theme.accent, fontFamily: theme.mono }}>{it.year}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ────────── NEWSLETTER (per-brand, mock subscribe) ────────── */

const NEWSLETTER_BY_SLUG: Record<string, { subs: number; title: string; sub: string; placeholder: string; cta: string; note: string }> = {
  "bella-cucina": {
    subs: 4218,
    title: "La Famiglia — nossa newsletter",
    sub: "Menus sazonais, harmonizações e mesas reservadas antes do público. Um e-mail a cada duas semanas.",
    placeholder: "seu@email.com",
    cta: "Entrar na lista",
    note: "Sem spam. Cancelar em um clique.",
  },
  "moretti-law": {
    subs: 1932,
    title: "Moretti Briefing",
    sub: "Análises mensais de tributação US-BR, imigração e estruturas de holding. Escrito pelos sócios.",
    placeholder: "email corporativo",
    cta: "Assinar briefing",
    note: "Confidencial. Somente análises jurídicas.",
  },
  "meridian-realty": {
    subs: 6104,
    title: "Diário Meridian",
    sub: "Pocket listings antes do MLS, análises de bairro e negociações fechadas. Um e-mail por mês.",
    placeholder: "seu@email.com",
    cta: "Assinar sem custo",
    note: "Off-market first. Cancelar quando quiser.",
  },
  "fabi-hair-studio": {
    subs: 2871,
    title: "Notes from the studio",
    sub: "Novos horários, tendências de cor e vagas em cancelamentos de última hora — para quem já é da casa.",
    placeholder: "seu@email.com",
    cta: "Entrar na lista",
    note: "Só quando vale. Prometido.",
  },
};

export const NewsletterBlock = ({
  slug,
  theme,
}: {
  slug: string;
  theme: { bg: string; ink: string; ink2: string; line: string; accent: string; serif: string; sans: string; mode: "light" | "dark" };
}) => {
  const data = NEWSLETTER_BY_SLUG[slug];
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (!data) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSent(true);
  };

  const formatted = data.subs.toLocaleString("en-US");

  return (
    <section style={{ borderColor: theme.line, background: theme.bg }} className="border-t">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: theme.accent }}>Newsletter</p>
          <h2 style={{ fontFamily: theme.serif, color: theme.ink }} className="text-3xl md:text-5xl font-black leading-[1.05] tracking-tight">
            {data.title}
          </h2>
          <p style={{ color: theme.ink2, fontFamily: theme.serif }} className="mt-5 text-lg md:text-xl leading-snug max-w-xl">
            {data.sub}
          </p>
          <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]" style={{ color: theme.ink2 }}>
            <div className="flex -space-x-2">
              {["#5b8def", "#f2a94f", "#a97ff4", "#e56b7d", "#4fbf9f"].map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2" style={{ background: c, borderColor: theme.bg }} />
              ))}
            </div>
            <span>Junte-se a <b style={{ color: theme.ink }}>{formatted}</b> assinantes</span>
          </div>
        </div>

        <div>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ borderColor: theme.accent, color: theme.ink }}
              className="border px-6 py-6"
            >
              <div className="text-[11px] uppercase tracking-[0.3em] mb-2" style={{ color: theme.accent }}>Confirmado</div>
              <p style={{ fontFamily: theme.serif }} className="text-xl leading-snug">
                Obrigado. Você está na lista — o próximo e-mail chega em breve.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.placeholder}
                  style={{ borderColor: theme.line, color: theme.ink, background: "transparent", fontFamily: theme.sans }}
                  className="flex-1 px-4 py-3.5 border text-sm focus:outline-none focus:border-current"
                />
                <button
                  type="submit"
                  style={{ background: theme.accent, color: theme.mode === "dark" ? "#000" : "#fff" }}
                  className="px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 transition whitespace-nowrap"
                >
                  {data.cta}
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: theme.ink2 }}>{data.note}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
