import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "sklyra.cookie.consent.v1";

type Consent = "accepted" | "essential" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Consent;
      setConsent(saved ?? null);
    } catch {
      setConsent(null);
    }
    const t = setTimeout(() => setMounted(true), 7000);

    const sync = () => setLeadOpen(document.body.hasAttribute("data-lead-open"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-lead-open"] });

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  const save = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* noop */
    }
    setConsent(value);
  };

  if (!mounted || consent !== null || leadOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-4 left-4 right-4 z-[60] md:bottom-0 md:left-0 md:right-0"
      >
        <div className="relative md:rounded-none rounded-xl p-[1.5px] md:p-0 overflow-hidden md:max-w-none mx-auto">
          {/* Rotating neon conic border — Framer style (mobile only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-150%] animate-[spin_5s_linear_infinite] md:hidden"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.9) 40deg, hsl(var(--primary-glow)) 90deg, transparent 160deg, transparent 360deg)",
            }}
          />
          {/* Top glow line — desktop */}
          <div
            aria-hidden
            className="hidden md:block absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10"
          />
          <div
            className="relative overflow-hidden rounded-[10px] md:rounded-none px-4 py-3.5 md:px-10 md:py-5 flex items-center gap-3 md:gap-6 backdrop-blur-xl w-full"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(16,20,18,0.94) 0%, rgba(10,12,10,0.92) 50%, rgba(8,14,11,0.94) 100%)",
            }}
          >
          {/* soft emerald glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(120% 80% at 0% 0%, hsl(var(--primary) / 0.10), transparent 60%), radial-gradient(120% 80% at 100% 100%, hsl(var(--primary) / 0.06), transparent 60%)",
            }}
          />
          {/* grain texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />

          <p className="relative flex-1 text-xs md:text-sm text-muted-foreground leading-snug md:leading-relaxed">
            <span className="hidden md:inline font-semibold text-foreground mr-2">Cookies.</span>
            Usamos cookies para melhorar sua experiência.{" "}
            <Link to="/privacy" className="text-foreground hover:text-primary transition-colors underline underline-offset-2 decoration-white/20">
              Saiba mais
            </Link>
          </p>

          <button
            onClick={() => save("essential")}
            className="relative shrink-0 h-8 md:h-11 px-3 md:px-5 rounded-md text-[11px] md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={() => save("accepted")}
            className="btn-framer btn-framer--ring shrink-0 !h-8 md:!h-11 !px-3.5 md:!px-6 !py-0 !rounded-md !text-[11px] md:!text-sm"
          >
            Aceitar
          </button>

          <button
            onClick={() => save("essential")}
            aria-label="Fechar"
            className="relative shrink-0 p-1 md:p-1.5 rounded-md text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}

