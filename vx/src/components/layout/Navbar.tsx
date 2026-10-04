"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BookLink } from "@/components/booking/BookingProvider";
import { VXLockup } from "@/components/brand/VXMark";
import { useScroll } from "@/components/motion/SmoothScroll";
import { IconInstagram, IconWhatsapp } from "@/components/ui/icons";
import { ADDRESS, CITY, INSTAGRAM, STATE } from "@/config/brand";
import { NAV } from "@/data/nav";
import { cn } from "@/lib/cn";
import { formatInstagram, PH } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import { asset } from "@/lib/base";

export function Navbar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const { lock, unlock } = useScroll();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Seção ativa = a que cruza o meio da tela.
  useEffect(() => {
    if (pathname !== "/") return;
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.id;
          setActive((cur) => (e.isIntersecting ? id : cur === id ? null : cur));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const openMenu = () => {
    menuRef.current?.showModal();
    setMenuOpen(true);
    lock();
  };
  const closeMenu = () => menuRef.current?.close();

  useEffect(() => {
    const d = menuRef.current;
    if (!d) return;
    const onClose = () => {
      setMenuOpen(false);
      unlock();
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [unlock]);

  const wa = whatsappUrl();
  const current = pathname === "/" ? active : null;

  return (
    <>
      <a
        href="#conteudo"
        className="t-caps fixed left-3 top-3 z-[var(--z-modal)] -translate-y-24 bg-vx-white px-4 py-3 text-vx-black focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <header
        className="vx-nav fixed inset-x-0 top-0 z-[var(--z-nav)]"
        data-state={compact ? "compact" : "top"}
      >
        <div className="vx-nav__bg" aria-hidden />
        <div className="vx-nav__inner vx-container flex h-[var(--nav-h-compact)] items-center gap-6">
          <Link
            href="/#inicio"
            aria-label="VX — início"
            className="text-vx-white transition-opacity duration-[var(--dur-fast)] hover:opacity-80"
          >
            <VXLockup className="text-[1.15rem]" />
          </Link>

          <nav aria-label="Principal" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => {
                const on = current === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={asset(item.href)}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "link-cut t-caps inline-flex items-center gap-2 transition-colors duration-[var(--dur-fast)]",
                        on ? "text-vx-white" : "text-vx-white/70 hover:text-vx-white",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn("lit transition-[opacity,transform] duration-[var(--dur-ui)]", on ? "opacity-100" : "scale-0 opacity-0")}
                      />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <BookLink className="btn btn-primary ml-auto min-h-11 px-5 text-[0.75rem] lg:ml-0">
            Agendar
          </BookLink>

          <button
            type="button"
            onClick={openMenu}
            className="vx-burger -mr-2 grid size-11 place-items-center lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            <span aria-hidden className="vx-burger__lines" />
          </button>
        </div>
      </header>

      <dialog
        ref={menuRef}
        id="menu-mobile"
        className="vx-menu"
        aria-label="Menu"
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t.closest("a")) closeMenu();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="vx-container flex h-[var(--nav-h-compact)] shrink-0 items-center justify-between">
            <Link href="/#inicio" aria-label="VX — início" className="text-vx-white">
              <VXLockup className="text-[1.15rem]" />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="vx-burger is-open -mr-2 grid size-11 place-items-center"
              aria-label="Fechar menu"
            >
              <span aria-hidden className="vx-burger__lines" />
            </button>
          </div>

          <nav aria-label="Menu" className="vx-container flex flex-1 flex-col justify-center py-8">
            <ul className="vx-menu__list">
              {NAV.map((item, i) => (
                <li key={item.id} style={{ "--i": i } as React.CSSProperties} className="border-b border-vx-line">
                  <a
                    href={asset(item.href)}
                    className="t-display flex items-baseline justify-between py-3 text-[clamp(2.6rem,11vw,4.5rem)] text-vx-white"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden className={cn("lit", current === item.id ? "" : "opacity-0")} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="vx-container shrink-0 space-y-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <BookLink className="btn btn-primary w-full">Agendar horário</BookLink>
            <div className="t-small flex flex-wrap items-center gap-x-6 gap-y-2 text-vx-muted">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-vx-white">
                  <IconWhatsapp className="size-4" /> WhatsApp
                </a>
              ) : (
                <span className="is-ph inline-flex items-center gap-2">
                  <IconWhatsapp className="size-4" /> {PH.whatsapp}
                </span>
              )}
              {INSTAGRAM ? (
                <a
                  href={`https://instagram.com/${INSTAGRAM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-vx-white"
                >
                  <IconInstagram className="size-4" /> {formatInstagram(INSTAGRAM)}
                </a>
              ) : (
                <span className="is-ph inline-flex items-center gap-2">
                  <IconInstagram className="size-4" /> {PH.instagram}
                </span>
              )}
            </div>
            <p className="t-small text-vx-muted">
              <span className={ADDRESS ? "" : "is-ph"}>{ADDRESS || PH.address}</span>
              <br />
              {CITY} — {STATE}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
