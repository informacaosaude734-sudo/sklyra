import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Users } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { BELLA, BellaLayout } from "./_layout";
import { MapEmbed } from "../_realism";

const TIMES = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const PARTY = [2, 3, 4, 5, 6, 8];

const Contato = ({ site }: { site: DemoSite }) => {
  const [time, setTime] = useState("19:00");
  const [party, setParty] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <BellaLayout site={site} active="contato">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p style={{ fontFamily: BELLA.script, color: BELLA.red }} className="italic text-lg mb-4">— Prenota il tuo tavolo</p>
        <h1 style={{ fontFamily: BELLA.serif }} className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tight">
          Reservar é o <em className="italic text-[#8a2f2f]">primeiro gesto</em>.
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-[1.2fr_1fr] gap-14">
        {/* FORM */}
        <div style={{ background: BELLA.cream }} className="p-8 md:p-12 border-2 border-black/10">
          <p style={{ fontFamily: BELLA.script }} className="italic text-xl mb-8 text-black/60">Uma reserva, uma noite, sua mesa.</p>

          <label className="block mb-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8a2f2f]">Data</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              style={{ fontFamily: BELLA.serif }}
              className="mt-2 w-full bg-transparent border-b-2 border-black/30 py-2 text-2xl focus:outline-none focus:border-[#8a2f2f]" />
          </label>

          <div className="mb-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8a2f2f]">Horário</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {TIMES.map((t) => (
                <button key={t} onClick={() => setTime(t)}
                  style={{ fontFamily: BELLA.serif, background: time === t ? BELLA.red : "transparent", color: time === t ? BELLA.bg : BELLA.ink, borderColor: BELLA.ink }}
                  className="px-4 py-2 border text-sm italic transition">
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8a2f2f]">Pessoas</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {PARTY.map((p) => (
                <button key={p} onClick={() => setParty(p)}
                  style={{ background: party === p ? BELLA.ink : "transparent", color: party === p ? BELLA.bg : BELLA.ink, borderColor: BELLA.ink }}
                  className="w-12 h-12 border transition font-bold">
                  {p}
                </button>
              ))}
            </div>
          </div>

          <input placeholder="Seu nome" className="w-full bg-transparent border-b-2 border-black/30 py-2 mb-4 focus:outline-none focus:border-[#8a2f2f] text-lg" style={{ fontFamily: BELLA.serif }} />
          <input placeholder="Telefone / WhatsApp" className="w-full bg-transparent border-b-2 border-black/30 py-2 mb-8 focus:outline-none focus:border-[#8a2f2f] text-lg" style={{ fontFamily: BELLA.serif }} />

          <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Reservar ${party}p ${date} ${time}`)}`} target="_blank" rel="noreferrer"
            style={{ background: BELLA.red, color: BELLA.bg }}
            className="inline-flex items-center gap-2 w-full justify-center px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition">
            Confirmar reserva via WhatsApp
          </a>
        </div>

        {/* MAP + INFO */}
        <div>
          <div className="relative aspect-square border-2 border-[#8a2f2f] bg-[#1a0f08] overflow-hidden">
            {/* Hand-drawn North End map (SVG) */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="paper" width="10" height="10" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#1a0f08" />
                  <circle cx="1" cy="1" r="0.3" fill="#e8a951" opacity="0.15" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#paper)" />
              <motion.path
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }}
                d="M 30 200 Q 100 100 180 150 T 320 130 L 370 100 M 180 150 L 200 250 Q 220 300 300 320 L 360 340"
                stroke="#e8a951" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="1 4"
              />
              <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3 }}
                cx="200" cy="220" r="10" fill="#8a2f2f" />
              <motion.circle initial={{ scale: 0 }} animate={{ scale: [1, 1.6, 1] }} transition={{ delay: 3, duration: 2, repeat: Infinity }}
                cx="200" cy="220" r="18" fill="none" stroke="#8a2f2f" strokeWidth="1" />
              <text x="220" y="215" fill="#e8a951" fontSize="12" fontStyle="italic" fontFamily="serif">Hanover St.</text>
              <text x="30" y="380" fill="#e8a951" fontSize="10" fontFamily="serif" opacity="0.6">— North End, Boston</text>
            </svg>
          </div>

          <div className="mt-8 space-y-3 text-base">
            <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-[#8a2f2f]"><Phone className="w-4 h-4 text-[#8a2f2f]" /> {site.phone}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-[#8a2f2f]"><Mail className="w-4 h-4 text-[#8a2f2f]" /> {site.email}</a>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#8a2f2f]" /> {site.address}, {site.city}</div>
            <div className="flex items-center gap-3 text-black/60"><Users className="w-4 h-4 text-[#8a2f2f]" /> Ter–Dom · 17h30–23h</div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p style={{ fontFamily: BELLA.script, color: BELLA.red }} className="italic text-lg mb-4">— Nos encontre</p>
        <h2 style={{ fontFamily: BELLA.serif }} className="text-3xl md:text-5xl font-black mb-8">
          No coração do <em className="italic text-[#8a2f2f]">North End</em>.
        </h2>
        <MapEmbed site={site} height={440} className="border-2 border-black/10" />
      </section>
    </BellaLayout>
  );
};

export default Contato;
