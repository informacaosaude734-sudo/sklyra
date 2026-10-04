"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookLink } from "@/components/booking/BookingProvider";
import { IconWhatsapp } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * CTA fixo no rodapé da tela — só no celular/tablet, só depois do hero e
 * some quando o CTA final ou o rodapé já estão na tela.
 */
export function StickyBooking() {
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const wa = whatsappUrl();

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = ["agendar-final", "contato"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setBlocked(seen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;
  const show = past && !blocked;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-vx-line bg-vx-black/85 px-[var(--margin)] pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-[var(--dur-ui)] ease-[var(--ease-vx)] lg:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex items-center gap-3">
        <BookLink className="btn btn-primary min-h-12 flex-1">Agendar horário</BookLink>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost size-12 min-h-12 px-0"
            aria-label="Agendar pelo WhatsApp"
          >
            <IconWhatsapp className="size-5" />
          </a>
        )}
      </div>
    </div>
  );
}
