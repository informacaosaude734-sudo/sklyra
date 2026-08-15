import { AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { problems } from "@/content";

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">The problem</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
              Posting more was{" "}
              <span className="grad-text">never the answer.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-white/50">
              Most brands don&apos;t have a content problem. They have a
              strategy problem wearing a content costume. Here&apos;s where it
              usually breaks.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {problems.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.07}>
              <div className="surface group h-full p-7 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-brand/20 bg-brand/[0.08] text-brand transition-colors duration-300 group-hover:bg-brand/15">
                    <AlertTriangle className="size-[18px]" />
                  </span>
                  <span className="text-[12px] font-medium text-white/20">
                    {p.n}
                  </span>
                </div>
                <h3 className="display mt-5 text-lg sm:text-xl">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/50">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="surface mt-8 p-8 sm:p-10">
            <p className="display text-[clamp(1.3rem,2.8vw,2rem)]">
              We don&apos;t chase virality.
            </p>
            <p className="display text-[clamp(1.3rem,2.8vw,2rem)]">
              <span className="grad-text">
                We build content systems that compound.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Problem;
