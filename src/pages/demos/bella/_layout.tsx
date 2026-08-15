import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { BackRibbon, SklyraCredit, useFonts } from "../_shared";
import { DemoSite } from "@/data/demoSites";

export const BELLA_FONTS = [
  "Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700",
  "Cormorant+Garamond:ital,wght@0,300;0,400;1,400",
  "Manrope:wght@300;400;600",
];

export const BELLA = {
  bg: "#f5efe6",
  ink: "#1a0f08",
  red: "#8a2f2f",
  gold: "#e8a951",
  cream: "#ede4d3",
  serif: "'Playfair Display', serif",
  script: "'Cormorant Garamond', serif",
  sans: "'Manrope', sans-serif",
};

const links = [
  { to: "", label: "La casa" },
  { to: "sobre", label: "Nostra storia" },
  { to: "menu", label: "Il menu" },
  { to: "galeria", label: "Galleria" },
  { to: "contato", label: "Prenota" },
];

export const BellaLayout = ({ site, children, active }: { site: DemoSite; children: ReactNode; active: string }) => {
  useFonts(BELLA_FONTS);
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: BELLA.sans, background: BELLA.bg, color: BELLA.ink }} className="min-h-screen antialiased">
      <BackRibbon tone="light" />
      <header className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to={`/demo/${site.slug}`} style={{ fontFamily: BELLA.serif }} className="text-2xl italic font-black tracking-tight">
            {site.brand}
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.25em]">
            {links.map((l) => (
              <Link key={l.label} to={`/demo/${site.slug}${l.to ? "/" + l.to : ""}`}
                className={active === l.to ? "text-[#8a2f2f]" : "hover:text-[#8a2f2f] transition"}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${site.phone}`} style={{ borderColor: BELLA.ink }} className="hidden md:inline-flex text-[11px] uppercase tracking-[0.2em] border px-4 py-2 hover:bg-black hover:text-[#f5efe6] transition">
              <Phone className="w-3.5 h-3.5 mr-2" /> Riservare
            </a>
            <button onClick={() => setOpen(true)} className="md:hidden p-2 border border-black/20"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      {/* WAITER DRAWER — right side */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              style={{ background: BELLA.cream, color: BELLA.ink }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-md z-50 p-8 border-l-4"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p style={{ fontFamily: BELLA.script, color: BELLA.red }} className="italic text-lg">— la carta</p>
                  <p style={{ fontFamily: BELLA.serif }} className="text-3xl italic">Buonasera</p>
                </div>
                <button onClick={() => setOpen(false)} className="p-2"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-6">
                {links.map((l, i) => (
                  <motion.div key={l.label}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}>
                    <Link to={`/demo/${site.slug}${l.to ? "/" + l.to : ""}`}
                      onClick={() => setOpen(false)}
                      style={{ fontFamily: BELLA.serif }}
                      className="block text-4xl italic font-black hover:text-[#8a2f2f] transition">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="absolute bottom-8 left-8 right-8 border-t border-black/20 pt-6 text-xs">
                <p style={{ fontFamily: BELLA.script }} className="italic text-base">{site.phone}</p>
                <p className="mt-1 text-black/60">{site.address} · {site.city}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="border-t border-black/10 py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div style={{ fontFamily: BELLA.serif }} className="italic text-lg">© 2026 {site.brand}</div>
          <SklyraCredit tone="light" />
        </div>
      </footer>
    </div>
  );
};
