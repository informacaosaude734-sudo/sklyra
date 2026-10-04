import Image from "next/image";
import { BookLink } from "@/components/booking/BookingProvider";
import { HeroMark } from "@/components/sections/HeroMark";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { COUNTRY, CITY, HERO_MEDIA } from "@/config/brand";

/**
 * Primeiro viewport. A linha de corte atravessa a tela: "Seu corte." nasce
 * para cima dela, "Sua presença." para baixo — como o V e o seu reflexo.
 * O monograma cromado cruza a mesma linha.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="VX — barbearia no Rio de Janeiro"
      className="hero relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-clip pt-[var(--nav-h)] lg:min-h-[max(100svh,46rem)]"
    >
      {/* Fundo: luz de estúdio + concreto quase invisível */}
      <div aria-hidden className="hero__bg absolute inset-0 -z-20">
        <Image
          src="/media/textures/concrete.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_72%_45%,rgb(241_239_234/0.07),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-vx-black/60 via-transparent to-vx-black" />
      </div>

      {HERO_MEDIA && (
        <div aria-hidden={HERO_MEDIA.type === "video"} className="absolute inset-0 -z-10">
          {HERO_MEDIA.type === "video" ? (
            <video
              className="h-full w-full object-cover opacity-50"
              src={HERO_MEDIA.src}
              poster={HERO_MEDIA.poster}
              autoPlay
              muted
              loop
              playsInline
              data-hero-video
            />
          ) : (
            <Image
              src={HERO_MEDIA.src}
              alt={HERO_MEDIA.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-vx-black via-vx-black/60 to-vx-black/20" />
        </div>
      )}

      <div className="vx-grid relative flex-1 grid-rows-[1fr_auto_1fr]">
        <div className="col-span-4 row-start-1 self-start pt-6 md:col-span-4 lg:pt-10" data-hero-fade>
          <p className="hero-fade t-caps text-vx-white/80" style={{ "--d": "900ms" } as React.CSSProperties}>
            {CITY} — {COUNTRY}
          </p>
        </div>

        {/* Linha de corte + título */}
        <div className="relative col-span-full row-start-2" data-hero-stage>
          <HeroMark />

          <h1 className="hero-title t-display t-hero relative z-10 text-vx-white">
            <span className="hero-line hero-line--up" data-hero-line="1">
              <span>Seu corte.</span>
            </span>
            <span aria-hidden className="hero-cut" data-hero-cut />
            <span className="hero-line hero-line--down" data-hero-line="2">
              <span>Sua presença.</span>
            </span>
          </h1>
        </div>

        <div
          className="col-span-full row-start-3 flex flex-col justify-end gap-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-10 md:flex-row md:items-end md:justify-between lg:pb-12"
          data-hero-fade
        >
          <p
            className="hero-fade t-lead max-w-[30ch] text-vx-white/80"
            style={{ "--d": "1000ms" } as React.CSSProperties}
          >
            Barbearia no Rio de Janeiro. Corte, barba e acabamento — com hora marcada e sem pressa.
          </p>
          <div
            className="hero-fade flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ "--d": "1100ms" } as React.CSSProperties}
          >
            <BookLink className="btn btn-primary">Agendar horário</BookLink>
            <a href="#a-vx" className="link-cut t-caps text-vx-white">
              Conhecer a VX
            </a>
          </div>
        </div>
      </div>

      <HeroMotion />
    </section>
  );
}
