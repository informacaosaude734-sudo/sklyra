import { ReactNode, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BackRibbon, SklyraCredit, useFonts } from "../_shared";
import { DemoSite } from "@/data/demoSites";

export const MORETTI_FONTS = [
  "Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,400",
  "IBM+Plex+Mono:wght@300;400;500",
  "Inter:wght@300;400;500",
];

export const M = {
  bg: "#0a0a0a",
  ink: "#e8e6e0",
  ink2: "rgba(232,230,224,0.6)",
  gold: "#b8945f",
  line: "rgba(255,255,255,0.08)",
  serif: "'Cormorant Garamond', serif",
  mono: "'IBM Plex Mono', monospace",
  sans: "'Inter', sans-serif",
};

const links = [
  { to: "", label: "Home", roman: "" },
  { to: "firma", label: "Firma", roman: "I" },
  { to: "praticas", label: "Práticas", roman: "II" },
  { to: "casos", label: "Casos", roman: "III" },
  { to: "contato", label: "Contato", roman: "IV" },
];

export const MorettiLayout = ({ site, children, active }: { site: DemoSite; children: ReactNode; active: string }) => {
  useFonts(MORETTI_FONTS);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    // set to active link initially
    const el = navRef.current?.querySelector<HTMLAnchorElement>(`a[data-active="true"]`);
    if (el && navRef.current) {
      const nb = navRef.current.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setUnderline({ left: b.left - nb.left, width: b.width, opacity: 1 });
    }
  }, [location.pathname]);

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navRef.current) return;
    const nb = navRef.current.getBoundingClientRect();
    const b = e.currentTarget.getBoundingClientRect();
    setUnderline({ left: b.left - nb.left, width: b.width, opacity: 1 });
  };
  const handleLeave = () => {
    const el = navRef.current?.querySelector<HTMLAnchorElement>(`a[data-active="true"]`);
    if (el && navRef.current) {
      const nb = navRef.current.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setUnderline({ left: b.left - nb.left, width: b.width, opacity: 1 });
    } else {
      setUnderline((u) => ({ ...u, opacity: 0 }));
    }
  };

  return (
    <div style={{ fontFamily: M.sans, background: M.bg, color: M.ink }} className="min-h-screen antialiased">
      <BackRibbon tone="dark" />
      <header className="border-b" style={{ borderColor: M.line }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 items-center">
          <div className="text-[10px] tracking-[0.4em]" style={{ color: M.gold }}>NEW YORK · SÃO PAULO · MIAMI</div>
          <Link to={`/demo/${site.slug}`} className="text-center">
            <div style={{ fontFamily: M.serif }} className="text-2xl font-medium tracking-wider">MORETTI</div>
            <div className="text-[9px] tracking-[0.4em] mt-0.5" style={{ color: M.gold }}>& ASSOCIATES · EST. 2002</div>
          </Link>
          <div className="flex justify-end">
            <a href={`tel:${site.phone}`} style={{ fontFamily: M.mono, color: M.gold }} className="text-[11px] tracking-[0.15em] hover:text-white transition">
              {site.phone}
            </a>
          </div>
        </div>
        <div ref={navRef} onMouseLeave={handleLeave}
          className="relative max-w-7xl mx-auto px-6 pb-4 flex justify-center gap-10 text-[11px] tracking-[0.35em]">
          {links.map((l) => (
            <Link key={l.label} to={`/demo/${site.slug}${l.to ? "/" + l.to : ""}`}
              data-active={active === l.to}
              onMouseEnter={handleEnter}
              className="uppercase transition"
              style={{ color: active === l.to ? M.gold : M.ink2 }}
            >
              {l.roman && <span style={{ fontFamily: M.serif }} className="not-italic mr-2 italic">{l.roman}.</span>}
              {l.label}
            </Link>
          ))}
          <motion.div
            animate={underline}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="absolute bottom-3 h-px"
            style={{ background: M.gold }}
          />
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t py-8 px-6" style={{ borderColor: M.line }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: M.ink2 }}>
          <div>© 2026 Moretti & Associates. Attorney advertising. Confidential & privileged.</div>
          <SklyraCredit tone="dark" />
        </div>
      </footer>
    </div>
  );
};
