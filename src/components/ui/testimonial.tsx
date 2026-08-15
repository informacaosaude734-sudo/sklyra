import { useRef } from "react";
import { User } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
}

interface ClientFeedbackProps {
  testimonials: [
    Testimonial, Testimonial, Testimonial, Testimonial,
    Testimonial, Testimonial, Testimonial,
  ];
}

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

const gridOverlay =
  "!absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.10)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.10)_1px,transparent_1px)] bg-[size:40px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]";

function Avatar({ size = "md", tone = "dark" }: { size?: "md" | "lg"; tone?: "dark" | "light" }) {
  return (
    <User
      className={cn(
        "shrink-0",
        size === "lg" ? "w-9 h-9" : "lg:w-9 lg:h-9 w-7 h-7",
        tone === "light" ? "text-primary-foreground/70" : "text-white/40",
      )}
      strokeWidth={1.5}
    />
  );
}

function ClientFeedback({ testimonials }: ClientFeedbackProps) {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [t0, t1, t2, t3, t4, t5, t6] = testimonials;

  return (
    <div
      className="lg:grid lg:grid-cols-3 gap-4 flex flex-col w-full min-w-0"
      ref={testimonialRef}
    >
      <div className="flex flex-col w-full min-w-0 lg:space-y-4 h-full gap-4">
        <TimelineContent
          animationNum={0}
          customVariants={revealVariants}
          timelineRef={testimonialRef}
          className="card-grain lg:flex-[7] flex-[6] flex flex-col justify-between relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-b from-primary/[0.08] to-white/[0.02] p-5 w-full min-w-0"
        >
          <div className={gridOverlay} />
          <article className="relative mt-auto min-w-0">
            <p className="text-white/80 break-words">"{t0.quote}"</p>
            <div className="flex justify-between items-center gap-3 pt-5">
              <div className="min-w-0">
                <h2 className="font-semibold lg:text-xl text-sm text-white truncate">{t0.name}</h2>
              </div>
              <Avatar size="lg" />
            </div>
          </article>
        </TimelineContent>

        <TimelineContent
          animationNum={1}
          customVariants={revealVariants}
          timelineRef={testimonialRef}
          className="card-grain lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-gradient-to-br from-primary to-primary-glow text-primary-foreground overflow-hidden rounded-lg border border-primary/20 p-5 w-full min-w-0"
        >
          <article className="mt-auto min-w-0">
            <p className="break-words">"{t1.quote}"</p>
            <div className="flex justify-between items-center gap-3 pt-5">
              <div className="min-w-0">
                <h2 className="font-semibold text-xl truncate">{t1.name}</h2>
              </div>
              <Avatar size="lg" tone="light" />
            </div>
          </article>
        </TimelineContent>
      </div>

      <div className="flex flex-col w-full min-w-0 lg:h-full h-fit lg:space-y-4 gap-4">
        {[t2, t3, t4].map((tst, idx) => (
          <TimelineContent
            key={tst.name}
            animationNum={idx + 2}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            className="card-grain flex flex-col justify-between relative bg-white/[0.03] text-white overflow-hidden rounded-lg border border-white/10 p-5 w-full min-w-0"
          >
            <article className="mt-auto min-w-0">
              <p className="2xl:text-base text-sm text-white/80 break-words">"{tst.quote}"</p>
              <div className="flex justify-between items-end gap-3 pt-5">
                <div className="min-w-0">
                  <h2 className="font-semibold lg:text-xl text-lg truncate">{tst.name}</h2>
                </div>
                <Avatar />
              </div>
            </article>
          </TimelineContent>
        ))}
      </div>

      <div className="flex flex-col w-full min-w-0 h-full lg:space-y-4 gap-4">
        <TimelineContent
          animationNum={5}
          customVariants={revealVariants}
          timelineRef={testimonialRef}
          className="card-grain lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-gradient-to-br from-primary to-primary-glow text-primary-foreground overflow-hidden rounded-lg border border-primary/20 p-5 w-full min-w-0"
        >
          <article className="mt-auto min-w-0">
            <p className="break-words">"{t5.quote}"</p>
            <div className="flex justify-between items-center gap-3 pt-5">
              <div className="min-w-0">
                <h2 className="font-semibold text-xl truncate">{t5.name}</h2>
              </div>
              <Avatar size="lg" tone="light" />
            </div>
          </article>
        </TimelineContent>

        <TimelineContent
          animationNum={6}
          customVariants={revealVariants}
          timelineRef={testimonialRef}
          className="card-grain lg:flex-[7] flex-[6] flex flex-col justify-between relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-b from-primary/[0.08] to-white/[0.02] p-5 w-full min-w-0"
        >
          <div className={gridOverlay} />
          <article className="relative mt-auto min-w-0">
            <p className="text-white/80 break-words">"{t6.quote}"</p>
            <div className="flex justify-between items-center gap-3 pt-5">
              <div className="min-w-0">
                <h2 className="font-semibold text-xl text-white truncate">{t6.name}</h2>
              </div>
              <Avatar size="lg" />
            </div>
          </article>
        </TimelineContent>
      </div>
    </div>
  );
}

export default ClientFeedback;
