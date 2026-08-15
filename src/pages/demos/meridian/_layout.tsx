import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BackRibbon, SklyraCredit, useFonts } from "../_shared";
import { DemoSite } from "@/data/demoSites";

export const MERIDIAN_FONTS = [
  "Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,400",
  "Inter:wght@200;300;400;500;600",
];

export const MR = {
  bg: "#f6f3ec",
  ink: "#08090b",
  ink2: "rgba(8,9,11,0.55)",
  gold: "#a8813e",
  goldLight: "#d4af37",
  dark: "#08090b",
  line: "rgba(8,9,11,0.1)",
  serif: "'Cormorant Garamond', serif",
  sans: "'Inter', sans-serif",
};

const leftLinks = [
  { to: "listings", label: "Portfolio" },
  { to: "sobre", label: "Serviços" },
];
const rightLinks = [
  { to: "diario", label: "Diário" },
  { to: "contato", label: "Contato" },
];

export const MeridianLayout = ({ site, children, active }: { site: DemoSite; children: ReactNode; active: string }) => {
  useFonts(MERIDIAN_FONTS);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"PT" | "EN">("PT");

  const NavLinks = ({ items }: { items: typeof leftLinks }) => (
    <>{items.map((l) => (
      <Link key={l.label} to={`/demo/${site.slug}/${l.to}`}
        style={{ color: active === l.to ? MR.gold : MR.ink }}
        className="text-[11px] uppercase tracking-[0.3em] hover:opacity-60 transition">{l.label}</Link>
    ))}</>
  );

  return (
    <div style={{ fontFamily: MR.sans, background: MR.bg, color: MR.ink }} className="min-h-screen antialiased">
      <BackRibbon tone="light" />
      <header className="border-b" style={{ borderColor: MR.line }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <nav className="hidden md:flex items-center gap-8"><NavLinks items={leftLinks} /></nav>
          <Link to={`/demo/${site.slug}`} className="text-center whitespace-nowrap">
            <div style={{ fontFamily: MR.serif }} className="text-3xl md:text-4xl italic font-light tracking-wide">Meridian</div>
            <div className="text-[9px] tracking-[0.5em] mt-1" style={{ color: MR.gold }}>REALTY · MIAMI · EST. 2011</div>
          </Link>
          <div className="hidden md:flex items-center justify-end gap-6">
            <NavLinks items={rightLinks} />
            <div className="flex text-[10px] tracking-[0.2em] border" style={{ borderColor: MR.line }}>
              {(["PT","EN"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ background: lang === l ? MR.ink : "transparent", color: lang === l ? MR.bg : MR.ink }}
                  className="px-2 py-1 transition">{l}</button>
              ))}
            </div>
          </div>
          <button className="md:hidden justify-self-end" onClick={() => setOpen(true)}><Menu className="w-5 h-5" /></button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: MR.bg }}
            className="fixed inset-0 z-50 p-8">
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
            <div className="mt-24 space-y-8">
              {[...leftLinks, ...rightLinks].map((l, i) => (
                <motion.div key={l.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
                  <Link to={`/demo/${site.slug}/${l.to}`} onClick={() => setOpen(false)}
                    style={{ fontFamily: MR.serif }} className="block text-5xl italic font-light">{l.label}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="border-t py-10 px-6 mt-16" style={{ borderColor: MR.line }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: MR.ink2 }}>
          <div style={{ fontFamily: MR.serif }} className="italic text-lg">© 2026 Meridian Realty · Licensed FL</div>
          <SklyraCredit tone="light" />
        </div>
      </footer>
    </div>
  );
};
