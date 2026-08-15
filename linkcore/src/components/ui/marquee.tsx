import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  /** Fade the left/right edges. */
  mask?: boolean;
}

/**
 * Seamless infinite ticker. Children are rendered twice and the track is
 * translated -50%, so the loop has no visible seam at any content width.
 */
export function Marquee({
  children,
  className,
  speed = 28,
  reverse = false,
  mask = true,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        reverse && "marquee-reverse",
        mask && "marquee-mask",
        className
      )}
      {...props}
    >
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
