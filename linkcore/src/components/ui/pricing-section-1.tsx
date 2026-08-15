import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { pricing } from "@/content";

/**
 * Adapted from the 21st.dev "Pricing Section 1" component:
 * same Card/Badge/Button composition, restyled for the LinkCore theme and
 * driven by src/content.ts.
 */
const PricingSection1 = () => {
  return (
    <section className="py-24 sm:py-32" id="pricing">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <header className="mb-14">
          <Reveal>
            <span className="eyebrow">Pricing</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display max-w-4xl text-[clamp(2.3rem,7vw,5.5rem)]">
              Pick your <span className="text-brand">output.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/50">
              Straightforward monthly retainers built around output, strategy
              and reporting. No setup fees. No twelve-month lock-in.
            </p>
          </Reveal>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
          {pricing.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.08}>
              <Card
                className={cn(
                  "flex h-full flex-col overflow-hidden py-6 transition-colors duration-300",
                  tier.popular
                    ? "border-brand bg-brand/[0.04] lg:-mt-4 lg:pb-10 lg:pt-10"
                    : "hover:border-white/25"
                )}
              >
                <CardHeader className="px-7">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-2xl lg:text-3xl">
                      {tier.name}
                    </CardTitle>
                    {tier.popular ? <Badge>Best value</Badge> : null}
                  </div>
                  <p className="pt-1 text-sm text-white/45">
                    {tier.description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col px-7">
                  <div className="mb-7 flex items-baseline gap-2 border-b border-white/10 pb-7">
                    <span className="text-[12px] font-medium tracking-wide text-white/35">
                      {tier.prefix}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl leading-none lg:text-[2.75rem]",
                        tier.popular && "text-brand"
                      )}
                    >
                      {tier.price}
                    </span>
                    <span className="text-sm text-white/40">
                      {tier.frequency}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-3.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                        <span className="text-sm leading-relaxed text-white/60">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-8 border-0 bg-transparent px-7 pb-0">
                  <a href="#contact" className="w-full">
                    <Button
                      className="group w-full gap-2"
                      size="lg"
                      variant={tier.popular ? "default" : "outline"}
                      aria-label={`Apply for the ${tier.name} package`}
                    >
                      Apply for this package
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-brand/25 bg-brand/[0.06] px-6 py-5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
            </span>
            <p className="text-[13px] text-white/70">
              Only 3 client slots open this month — we cap the roster so output
              never slips.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export { PricingSection1 };
export default PricingSection1;
