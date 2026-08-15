import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nav, site } from "@/content";

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:h-18 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center bg-brand font-display text-sm text-ink">
            L
          </span>
          <span className="font-display text-lg tracking-tight sm:text-xl">
            {site.wordmark}
            <span className="text-brand">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium tracking-wide text-white/60 transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phones[0].replace(/[^+\d]/g, "")}`}
            className="hidden items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-brand md:flex"
          >
            <Phone className="size-3.5" />
            {site.phones[0]}
          </a>
          <a href="#contact">
            <Button size="sm" className="text-[11px]">
              Book a call
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Nav;
