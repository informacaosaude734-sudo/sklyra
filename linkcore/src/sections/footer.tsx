import { Instagram } from "lucide-react";
import { nav, site } from "@/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center bg-brand font-display text-sm text-ink">
                L
              </span>
              <span className="font-display text-xl tracking-tight">
                {site.wordmark}
                <span className="text-brand">.</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
              A strategic, data-informed studio for high-quality short-form
              content. We work with founders, creators and small businesses
              building durable brands.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow mb-1 w-fit">Navigate</span>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/50 transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow mb-1 w-fit">Reach us</span>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-brand"
            >
              <Instagram className="size-4" />
              {site.handle}
            </a>
            {site.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/[^+\d]/g, "")}`}
                className="text-sm text-white/50 transition-colors hover:text-brand"
              >
                {p}
              </a>
            ))}
          </div>
        </div>

        {/* oversized wordmark */}
        <div
          aria-hidden
          className="display select-none overflow-hidden text-center text-[clamp(3.5rem,18vw,15rem)] leading-[0.8] text-white/[0.055]"
        >
          {site.wordmark} MEDIA
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] py-7 text-[12px] text-white/25">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Strategy first · Quality over volume</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
