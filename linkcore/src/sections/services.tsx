import { BarChart3, Check, Clapperboard, Compass } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/aurora-bento-grid";
import { services } from "@/content";

const ICONS = [Compass, Clapperboard, BarChart3];

/** md:col-span per card, so the bento reads 4 / 2 / 6. */
const SPANS = ["md:col-span-4", "md:col-span-2", "md:col-span-6"];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">Services</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
              Everything you need,{" "}
              <span className="grad-text">end to end.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-white/50">
              One studio for strategy, production and the reporting that tells
              you what to do next month. No handoffs, no finger-pointing.
            </p>
          </Reveal>
        </div>

        {/* 21st.dev Aurora Bento Grid — staggered entrance + hover shine */}
        <div className="-mx-6 mt-12">
          <BentoGrid>
            {services.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <BentoGridItem
                  key={s.n}
                  className={`${SPANS[i]} border border-white/[0.08] backdrop-blur-sm`}
                  gradientFrom="from-white/[0.07]"
                  gradientTo="to-white/[0.015]"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-[12px] font-medium text-white/25">
                        {s.n}
                      </span>
                    </div>

                    <h3 className="display mt-6 text-xl sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
                      {s.body}
                    </p>

                    <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-1.5 text-[12px] text-white/45"
                        >
                          <Check className="size-3.5 text-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </BentoGridItem>
              );
            })}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}

export default Services;
