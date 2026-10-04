import { BookLink } from "@/components/booking/BookingProvider";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { IconWhatsapp } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/whatsapp";

/** Fechamento: a mesma linha de corte do hero, agora com o CTA em cima dela. */
export function FinalCTA() {
  const wa = whatsappUrl();
  return (
    <section
      id="agendar-final"
      aria-labelledby="cta-title"
      className="relative flex min-h-[max(92svh,38rem)] flex-col justify-center overflow-clip py-[var(--section-y)]"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgb(255_138_43/0.07),transparent_70%)]" />
      <div className="vx-grid">
        <h2 id="cta-title" className="t-display t-hero col-span-full">
          <Reveal as="span" variant="none" className="block">
            <span className="reveal-line">
              <span>Pronto pro</span>
            </span>
          </Reveal>
          <Reveal as="span" variant="draw" aria-hidden className="relative my-[0.22em] block">
            <span className="cut-line block w-screen" style={{ marginLeft: "calc(50% - 50vw)" }} />
          </Reveal>
          <Reveal as="span" variant="none" className="block lg:pl-[16.66%]">
            <span className="reveal-line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>próximo corte?</span>
            </span>
          </Reveal>
        </h2>

        <div className="col-span-full mt-14 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between lg:mt-20">
          <Magnetic strength={0.22}>
            <BookLink className="btn btn-primary btn-lg">Agendar na VX</BookLink>
          </Magnetic>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="link-cut t-caps inline-flex items-center gap-2.5 text-vx-white"
            >
              <IconWhatsapp className="size-4" /> Agendar pelo WhatsApp
            </a>
          ) : (
            <span className="t-caps is-ph inline-flex items-center gap-2.5">
              <IconWhatsapp className="size-4" /> Agendar pelo WhatsApp — [NÚMERO]
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
