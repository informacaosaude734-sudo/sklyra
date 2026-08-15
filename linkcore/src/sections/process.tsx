import {
  ContainerScroll,
  ContainerSticky,
  ProcessCard,
  ProcessCardBody,
  ProcessCardTitle,
} from "@/components/blocks/process-timeline";
import { process } from "@/content";

export function Process() {
  return (
    <section id="process" className="relative">
      <ContainerScroll className="mx-auto h-[260vh] max-w-[1320px] px-5 py-24 sm:px-8">
        <span className="eyebrow">Process</span>
        <h2 className="display mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)]">
          A clear four-step <span className="grad-text">system.</span>
        </h2>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-white/50">
          No mystery retainer. You know exactly what happens, in what order, and
          what lands on your desk at the end of each month.
        </p>

        <ContainerSticky className="top-[24vh] mt-14 flex flex-nowrap gap-4">
          {process.map((phase, index) => (
            <ProcessCard
              key={phase.n}
              itemsLength={process.length}
              index={index}
              variant="light"
              className="min-w-[85%] max-w-[85%] overflow-hidden rounded-2xl border-white/[0.08] bg-white/[0.03] shadow-lift backdrop-blur-lg md:min-w-[58%] md:max-w-[58%]"
            >
              <ProcessCardTitle className="flex shrink-0 items-start border-r border-white/10 p-6 md:p-8">
                <span className="font-display text-4xl leading-none text-brand md:text-6xl">
                  {phase.n}
                </span>
              </ProcessCardTitle>
              <ProcessCardBody className="gap-5 p-6 md:p-10">
                <h3 className="display text-[clamp(1.6rem,3.4vw,2.8rem)]">
                  {phase.title}
                </h3>
                <p className="max-w-[46ch] text-sm leading-relaxed text-white/55 md:text-base">
                  {phase.body}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-4">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-[12px] font-medium tracking-wide text-white/30">
                    Step {index + 1} / {process.length}
                  </span>
                </div>
              </ProcessCardBody>
            </ProcessCard>
          ))}
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}

export default Process;
