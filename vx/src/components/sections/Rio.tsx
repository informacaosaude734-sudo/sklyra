import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { CITY, STATE } from "@/config/brand";

/** O Rio urbano — asfalto molhado, luz de sódio, rua. Sem cartão-postal. */
export function Rio() {
  return (
    <section aria-labelledby="rio-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Parallax amount={14} scale={1.16} className="h-full">
          <Image
          src="/media/textures/asphalt.webp"
          alt=""
          fill
          sizes="100vw"
          quality={82}
            className="object-cover"
          />
        </Parallax>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-vx-black via-vx-black/35 to-vx-black" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-vx-black/80 via-transparent to-transparent" />

      <div className="vx-grid min-h-[max(88svh,40rem)] content-end gap-y-10 py-[var(--section-y)]">
        <div className="col-span-4 md:col-span-7 lg:col-span-8">
          <RevealLines
            id="rio-title"
            className="t-display t-xl"
            lines={["No Rio,", "todo mundo", "repara."]}
          />
        </div>
        <Reveal variant="fade" delay={200} className="col-span-4 md:col-span-5 lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="t-lead text-vx-white/85">
            Calor, umidade, praia, ônibus cheio, noite que vira dia. O corte precisa aguentar a
            cidade inteira — e continuar no lugar.
          </p>
          <p className="t-caps mt-8 flex items-center gap-3 text-vx-white">
            <span className="lit" aria-hidden />
            {CITY} — {STATE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
