import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { MR, MeridianLayout } from "./_layout";
import { MERIDIAN_EXTRAS } from "@/data/demoExtras";
import { RecentlySoldTicker, MortgageCalc } from "../_realism";

const HOODS = ["Todos", "Brickell", "Sunny Isles", "Bal Harbour", "Coconut Grove", "Midtown Miami", "Key Biscayne", "Edgewater", "Aventura"];

const Listings = ({ site }: { site: DemoSite }) => {
  const [hood, setHood] = useState("Todos");
  const [expanded, setExpanded] = useState<string | null>(null);
  const items = MERIDIAN_EXTRAS.listings.filter((l) => hood === "Todos" || l.neighborhood === hood);

  return (
    <MeridianLayout site={site} active="listings">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: MR.gold }}>Portfolio · atualizado semanalmente</p>
        <h1 style={{ fontFamily: MR.serif }} className="text-5xl md:text-8xl font-light leading-[1.02]">
          Os imóveis que <em className="italic" style={{ color: MR.gold }}>indicaríamos à família.</em>
        </h1>
      </section>

      <RecentlySoldTicker theme={{ ink: MR.ink, ink2: MR.ink2, accent: MR.gold, line: MR.line, serif: MR.serif, bg: MR.bg }} />

      <section className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap gap-2 border-y" style={{ borderColor: MR.line }}>
        {HOODS.map((h) => (
          <button key={h} onClick={() => setHood(h)}
            style={{ background: hood === h ? MR.ink : "transparent", color: hood === h ? MR.bg : MR.ink, borderColor: MR.line }}
            className="rounded-full px-4 py-2 border text-[11px] uppercase tracking-[0.2em] transition"
          >{h}</button>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((l, i) => {
            const isOpen = expanded === l.code;
            return (
              <motion.article key={l.code} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ delay: (i % 4) * 0.05 }}
                onClick={() => setExpanded(isOpen ? null : l.code)}
                className="cursor-pointer border overflow-hidden group" style={{ borderColor: MR.line, background: "#fff" }}
              >
                <div className="aspect-[16/10] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${MR.gold}20, ${MR.dark}70)` }}>
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${site.heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase px-2 py-1"
                    style={{ background: MR.bg, color: MR.gold }}>{l.tag}</div>
                  <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.25em] uppercase px-2 py-1"
                    style={{ background: MR.dark, color: MR.bg }}>Ref. {l.code}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div style={{ fontFamily: MR.serif }} className="text-3xl italic font-light">{l.neighborhood}</div>
                      <div className="text-[11px] uppercase tracking-[0.25em] mt-1" style={{ color: MR.ink2 }}>{l.type} · Miami, FL</div>
                    </div>
                    <div style={{ fontFamily: MR.serif, color: MR.gold }} className="text-3xl font-light">{l.price}</div>
                  </div>
                  <div className="flex gap-6 mt-6 text-sm" style={{ color: MR.ink2 }}>
                    <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {l.beds}</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {l.baths}</span>
                    <span className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4" /> {l.sqft.toLocaleString()} sqft</span>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden">
                        <div className="mt-6 pt-6 border-t space-y-3 text-sm" style={{ borderColor: MR.line, color: MR.ink2 }}>
                          <p style={{ fontFamily: MR.serif }} className="text-lg italic text-black">
                            Imóvel {l.tag.toLowerCase()} em {l.neighborhood}. Curadoria feita pessoalmente pelo sócio-fundador Ricardo Meridian.
                          </p>
                          <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Coordenadas confidenciais — reveladas em consulta</div>
                          <a href={`https://wa.me/${site.whatsapp}?text=Interesse%20${l.code}`} target="_blank" rel="noreferrer"
                            style={{ background: MR.gold, color: MR.bg }}
                            className="inline-flex items-center gap-2 mt-4 px-6 py-3 text-[11px] uppercase tracking-[0.25em]">
                            Agendar tour virtual
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </section>

      <section className="border-t" style={{ borderColor: MR.line }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <MortgageCalc
            theme={{ bg: "#fff", ink: MR.ink, ink2: MR.ink2, accent: MR.gold, line: MR.line, serif: MR.serif, sans: MR.sans }}
            defaultPrice={2400000}
          />
        </div>
      </section>

      <section className="border-t py-16 px-6 text-center" style={{ borderColor: MR.line }}>
        <p style={{ color: MR.ink2 }} className="text-sm">
          Portfolio adicional off-market disponível apenas em consulta privativa. <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" style={{ color: MR.gold }} className="underline">Solicite acesso →</a>
        </p>
      </section>
    </MeridianLayout>
  );
};

export default Listings;
