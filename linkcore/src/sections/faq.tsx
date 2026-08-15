import { Reveal } from "@/components/reveal";
import { Accordion } from "@/components/ui/accordion";
import { faqs } from "@/content";

export function Faq() {
  const items = faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: <span className="display text-lg sm:text-xl">{f.q}</span>,
    content: (
      <p className="max-w-2xl text-sm leading-relaxed text-white/55">{f.a}</p>
    ),
    meta: (
      <span className="text-[12px] font-semibold text-brand">
        {String(i + 1).padStart(2, "0")}
      </span>
    ),
  }));

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow">Objections</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(2.3rem,7vw,5rem)]">
                Ask the <span className="text-brand">hard one.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/50">
                Still not answered? Put it in the form below — we&apos;ll give
                you a straight answer, not a pitch deck.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <Accordion
              items={items}
              type="single"
              defaultOpen={["faq-0"]}
              maxPanelHeight={260}
              className="rounded-none border-white/10 bg-white/[0.02] shadow-none dark:border-white/10 dark:bg-white/[0.02] dark:shadow-none"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Faq;
