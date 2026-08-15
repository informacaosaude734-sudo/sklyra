import { Marquee } from "@/components/ui/marquee";
import { ticker } from "@/content";

/**
 * Quiet SaaS trust strip — muted pills drifting past, not a shouting banner.
 */
export function Ticker({
  reverse = false,
  speed = 42,
}: {
  reverse?: boolean;
  speed?: number;
}) {
  return (
    <div className="border-y border-white/[0.07] bg-white/[0.015] py-5">
      <Marquee speed={speed} reverse={reverse}>
        {ticker.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-white/50">
              {t}
            </span>
            <span className="size-1 rounded-full bg-brand/60" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export default Ticker;
