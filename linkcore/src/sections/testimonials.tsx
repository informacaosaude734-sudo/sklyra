import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/content";

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">Clients</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
              They stopped <span className="grad-text">guessing.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="surface flex h-full flex-col justify-between p-7 sm:p-8">
                <div>
                  <div className="flex items-center gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-[15px] leading-relaxed text-white/75">
                    “{t.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-b from-brand-soft to-brand text-sm font-semibold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">
                      {t.name}
                    </span>
                    <span className="block truncate text-[12px] text-white/40">
                      {t.handle} · {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-[12px] text-white/25">
            Placeholder quotes — replace with approved client testimonials
            before launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Testimonials;
