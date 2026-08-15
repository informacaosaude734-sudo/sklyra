import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { F, FabiLayout } from "./_layout";
import { FABI_EXTRAS } from "@/data/demoExtras";

const DATES = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});
const HOURS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];

const ProgressRing = ({ step }: { step: number }) => {
  const total = 3;
  const p = ((step + 1) / total) * 100;
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke={F.line} strokeWidth="4" />
      <motion.circle cx="50" cy="50" r={r} fill="none" stroke={F.gold} strokeWidth="4"
        strokeDasharray={c} strokeDashoffset={c - (p / 100) * c} strokeLinecap="round"
        transform="rotate(-90 50 50)"
        animate={{ strokeDashoffset: c - (p / 100) * c }}
        transition={{ type: "spring", damping: 20 }}
      />
      <text x="50" y="55" textAnchor="middle" fontFamily={F.serif} fontSize="22" fill={F.goldLight} fontStyle="italic">{step + 1}/3</text>
    </svg>
  );
};

const Book = ({ site }: { site: DemoSite }) => {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const canNext = (step === 0 && service) || (step === 1 && date && hour) || (step === 2 && name && phone);

  return (
    <FabiLayout site={site} active="book">
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-14">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p style={{ color: F.gold }} className="text-[11px] uppercase tracking-[0.4em] mb-4">Book your appointment</p>
            <h1 style={{ fontFamily: F.serif, color: F.goldLight }} className="text-5xl md:text-7xl italic font-light leading-[0.95]">
              Three steps. That's <em style={{ color: F.gold }}>it</em>.
            </h1>
          </div>
          <ProgressRing step={step} />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 30, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}>
              <p style={{ fontFamily: F.serif, color: F.goldLight }} className="text-2xl italic mb-8">01. Which service?</p>
              <div className="grid md:grid-cols-2 gap-3">
                {FABI_EXTRAS.services.map((s) => (
                  <button key={s.title} onClick={() => setService(s.title)}
                    className="text-left p-6 border transition"
                    style={{
                      borderColor: service === s.title ? F.gold : F.line,
                      background: service === s.title ? "#14100b" : "transparent",
                    }}>
                    <div className="flex items-baseline justify-between">
                      <div style={{ fontFamily: F.serif, color: F.goldLight }} className="text-2xl italic">{s.title}</div>
                      <div style={{ fontFamily: F.serif, color: F.gold }} className="text-xl italic">{s.price}</div>
                    </div>
                    <p className="mt-2 text-sm" style={{ color: F.ink2 }}>{s.duration} · {s.desc.slice(0, 60)}…</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}>
              <p style={{ fontFamily: F.serif, color: F.goldLight }} className="text-2xl italic mb-8">02. Pick date & time.</p>
              <div className="flex flex-wrap gap-3 mb-10">
                {DATES.map((d, i) => (
                  <button key={i} onClick={() => setDate(d)}
                    className="p-4 border text-center min-w-[80px] transition"
                    style={{
                      borderColor: date?.getTime() === d.getTime() ? F.gold : F.line,
                      background: date?.getTime() === d.getTime() ? "#14100b" : "transparent",
                    }}>
                    <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: F.ink2 }}>{d.toLocaleDateString("en", { weekday: "short" })}</div>
                    <div style={{ fontFamily: F.serif, color: F.goldLight }} className="text-3xl italic mt-1">{d.getDate()}</div>
                    <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: F.ink2 }}>{d.toLocaleDateString("en", { month: "short" })}</div>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {HOURS.map((h) => (
                  <button key={h} onClick={() => setHour(h)}
                    style={{
                      borderColor: hour === h ? F.gold : F.line, color: hour === h ? F.bg : F.ink,
                      background: hour === h ? F.gold : "transparent",
                      fontFamily: F.serif,
                    }}
                    className="px-5 py-3 border italic text-lg transition"
                  >{h}</button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}>
              <p style={{ fontFamily: F.serif, color: F.goldLight }} className="text-2xl italic mb-8">03. Your details.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <label>
                  <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: F.gold }}>Name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: F.line, fontFamily: F.serif, fontSize: 22, color: F.ink }} />
                </label>
                <label>
                  <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: F.gold }}>WhatsApp</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full bg-transparent border-b py-2 focus:outline-none" style={{ borderColor: F.line, fontFamily: F.serif, fontSize: 22, color: F.ink }} />
                </label>
              </div>

              <div className="mt-12 border p-8" style={{ borderColor: F.line, background: "#14100b" }}>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: F.gold }}>Summary</p>
                <div className="space-y-3" style={{ fontFamily: F.serif, color: F.goldLight }}>
                  <div className="text-2xl italic flex justify-between"><span>Service</span><span style={{ color: F.gold }}>{service}</span></div>
                  <div className="text-2xl italic flex justify-between"><span>Date</span><span style={{ color: F.gold }}>{date?.toLocaleDateString("en", { day: "numeric", month: "long" })}</span></div>
                  <div className="text-2xl italic flex justify-between"><span>Time</span><span style={{ color: F.gold }}>{hour}</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between border-t pt-6" style={{ borderColor: F.line }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className="text-[11px] uppercase tracking-[0.3em] disabled:opacity-30" style={{ color: F.ink2 }}>
            ← Back
          </button>
          {step < 2 ? (
            <button onClick={() => canNext && setStep(step + 1)} disabled={!canNext}
              style={{ background: canNext ? F.gold : F.line, color: canNext ? F.bg : F.ink2 }}
              className="px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] transition disabled:cursor-not-allowed"
            >Continue →</button>
          ) : (
            <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Booking: ${service} · ${date?.toLocaleDateString("en")} · ${hour} · ${name} · ${phone}`)}`}
              target="_blank" rel="noreferrer"
              style={{ background: canNext ? F.gold : F.line, color: canNext ? F.bg : F.ink2 }}
              className={`inline-flex items-center gap-2 px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] ${canNext ? "" : "pointer-events-none"}`}
            ><Check className="w-4 h-4" /> Confirm via WhatsApp</a>
          )}
        </div>
      </section>
    </FabiLayout>
  );
};

export default Book;
