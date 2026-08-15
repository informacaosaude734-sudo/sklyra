import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";
import { Reveal } from "@/components/reveal";

const GUARANTEES = [
  "Month-to-month. Cancel whenever it stops working.",
  "Every script written for retention, not for your ego.",
  "A real human on the other end of the DM.",
  "Reporting you can read in ninety seconds.",
];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(214,255,63,0.16),transparent_55%)]"
      />

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <MaskedTextReveal
          as="h2"
          splitBy="lines"
          stagger={0.09}
          className="display text-[clamp(2.6rem,10vw,9rem)]"
        >
          Your competitor posts tomorrow. Do you?
        </MaskedTextReveal>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <ul className="grid gap-3 sm:grid-cols-2">
            {GUARANTEES.map((g, i) => (
              <Reveal key={g} delay={i * 0.06}>
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-white/55">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  {g}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <a href="#contact">
              <Button size="lg" className="group h-16 px-10 text-base">
                Claim a slot
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default FinalCta;
