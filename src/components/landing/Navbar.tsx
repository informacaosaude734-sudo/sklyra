import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Phone, PhoneCall } from "lucide-react";

import { useT, LanguageSwitcher } from "@/i18n";
import { SklyraLogo } from "./SklyraLogo";

const SECTION_PATHS = ["servicos", "metodo", "precos", "faq"];

const useNavLinks = () => {
  const { t } = useT();
  return [
    { href: "/servicos", label: t("nav.services") },
    { href: "/metodo", label: t("nav.method") },
    { href: "/precos", label: t("nav.pricing") },

    { href: "/insights", label: t("nav.insights") },
    { href: "/faq", label: t("nav.faq") },
  ];
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang } = useT();
  const navLinks = useNavLinks();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace(/^\//, "");
    if (!SECTION_PATHS.includes(id)) return; // e.g. /insights — normal navigation

    e.preventDefault();
    const onLanding = location.pathname === "/" || SECTION_PATHS.includes(location.pathname.replace(/^\//, ""));

    if (onLanding) {
      window.history.pushState(null, "", href);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(href);
    }
  };

  // Lock scrolling on <html>, not <body>: body has `overflow-x: hidden` in the
  // global stylesheet, so a body-level lock never reaches the viewport scrollbar.
  // With the scrollbar still there, the `fixed inset-0` menu below sizes to
  // innerWidth (viewport + scrollbar gutter) and spills past the visible area.
  useEffect(() => {
    if (!mobileOpen) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    // Signals "an overlay is already on screen" so timed popups (e.g. the lead
    // form on the landing page) don't open on top of the menu.
    html.dataset.mobileMenuOpen = "true";

    return () => {
      html.style.overflow = previousOverflow;
      delete html.dataset.mobileMenuOpen;
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="relative mx-auto flex items-center justify-between w-full px-4 md:px-8 py-3 border-b border-white/10 bg-background/70 backdrop-blur-xl">
          {/* Brand */}
          <a href="/" className="flex items-center group flex-shrink-0">
            <SklyraLogo className="w-12 h-12" width={48} height={48} />
          </a>

          {/* Centered Nav Links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground/70 hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language Switcher + US Phone */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {lang === "en" && (
              <a
                href="tel:+17625786358"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground/80 hover:text-primary transition-colors"
                aria-label="Call us for a free quote"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="tracking-tight">(762) 578-6358</span>
              </a>
            )}
            <LanguageSwitcher compact />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-foreground relative z-[60]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-background flex flex-col overflow-y-auto"
          >
            {/* Top bar: logo left */}
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center gap-2">
                <SklyraLogo className="w-8 h-8" width={32} height={32} />
                <span className="text-foreground font-semibold text-lg tracking-tight">Sklyra</span>
              </div>
            </div>


            {/* Links left-aligned */}
            <nav className="flex flex-col px-6 pt-10 pb-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileOpen(false);
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(1.75rem,9vw,3rem)] leading-[1.1] font-semibold text-foreground hover:text-primary transition-colors py-1"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* US free-quote phone — English only */}
            {lang === "en" && (
              <motion.a
                href="tel:+17625786358"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mx-6 mb-6 flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <PhoneCall className="w-4 h-4" strokeWidth={2} />
                <span>(762) 578-6358</span>
              </motion.a>
            )}


            {/* Social icons — minimal framer style */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 pb-6 flex items-center gap-6"
            >
              <a
                href="https://www.instagram.com/sklyraweb/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground/70 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61583545784016"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground/70 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.tiktok.com/@sklyra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-muted-foreground/70 hover:text-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52V6.94a4.85 4.85 0 0 1-1.84-.25z" />
                </svg>
              </a>
            </motion.div>


            {/* Bottom info */}
            <div className="mt-auto border-t border-white/10 px-6 py-6 flex items-center justify-between">
              <p className="text-xs text-muted-foreground/60">© 2026 Sklyra</p>
              <LanguageSwitcher compact />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
