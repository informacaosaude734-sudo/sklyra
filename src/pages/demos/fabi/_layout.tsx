import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BackRibbon, SklyraCredit, useFonts } from "../_shared";
import { DemoSite } from "@/data/demoSites";

export const FABI_FONTS = [
  "Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,700",
  "Inter:wght@300;400;500;600",
];

export const F = {
  bg: "#0b0908",
  ink: "#f2ead8",
  ink2: "rgba(242,234,216,0.65)",
  gold: "#C9A26B",
  goldLight: "#E6C79A",
  line: "rgba(242,234,216,0.12)",
  serif: "'Cormorant Garamond', serif",
  sans: "'Inter', sans-serif",
};

const links = [
  { to: "", label: "Home", preview: "The studio" },
  { to: "sobre", label: "About Fabi", preview: "The artist behind the craft" },
  { to: "servicos", label: "Services", preview: "Balayage · Color · Keratin · Cuts" },
  { to: "galeria", label: "Gallery", preview: "Real transformations, real women" },
  { to: "book", label: "Book Now", preview: "3 steps · WhatsApp confirmation" },
];

export const FabiLayout = ({ site, children, active }: { site: DemoSite; children: ReactNode; active: string }) => {
  useFonts(FABI_FONTS);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(links.find((l) => l.to === active)?.label ?? null);

  return (
    <div style={{ fontFamily: F.sans, background: F.bg, color: F.ink }} className="min-h-screen antialiased">
      <BackRibbon tone="dark" />

      {/* Discreet top bar */}
      <header className="border-b" style={{ borderColor: F.line }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to={`/demo/${site.slug}`} style={{ fontFamily: F.serif, color: F.gold }} className="text-3xl italic font-medium tracking-tight">
            fabi<span className="text-[10px] not-italic uppercase tracking-[0.3em] ml-2" style={{ color: F.ink2 }}>Hair Studio</span>
          </Link>
          <button onClick={() => setOpen(true)}
            style={{ color: F.gold }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]">
            <span className="hidden md:inline">Menu</span>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Golden curtain */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid md:grid-cols-[1fr_1.2fr]"
            style={{ background: "linear-gradient(135deg, #0b0908, #14100b)" }}
          >
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 md:p-16 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div style={{ fontFamily: F.serif, color: F.gold }} className="text-2xl italic">fabi</div>
                <button onClick={() => setOpen(false)}><X className="w-6 h-6" style={{ color: F.gold }} /></button>
              </div>
              <nav className="space-y-6">
                {links.map((l, i) => (
                  <motion.div key={l.label}
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <Link to={`/demo/${site.slug}${l.to ? "/" + l.to : ""}`}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setHover(l.label)}
                      style={{ fontFamily: F.serif, color: active === l.to ? F.gold : F.goldLight }}
                      className="block text-5xl md:text-7xl italic font-light hover:opacity-80 transition"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="text-[11px] uppercase tracking-[0.3em]" style={{ color: F.ink2 }}>
                Orlando, FL · By appointment
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center justify-center p-12 relative overflow-hidden"
              style={{ background: `radial-gradient(circle at center, ${F.gold}20, transparent 70%)` }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={hover}
                  initial={{ opacity: 0, filter: "blur(20px)", scale: 0.98 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(20px)" }}
                  transition={{ duration: 0.5 }}
                  className="text-center max-w-md"
                >
                  <p style={{ fontFamily: F.serif, color: F.goldLight }} className="text-5xl italic font-light leading-tight">
                    {links.find((l) => l.label === hover)?.preview ?? "The studio"}
                  </p>
                  <div className="w-16 h-px mx-auto mt-8" style={{ background: F.gold }} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="border-t py-10 px-6 mt-16" style={{ borderColor: F.line }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div style={{ fontFamily: F.serif, color: F.gold }} className="text-xl italic">© 2026 {site.brand}</div>
          <SklyraCredit tone="dark" />
        </div>
      </footer>
    </div>
  );
};
