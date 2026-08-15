import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/**
 * Project-wide default for the 21st ScrollReveal primitive:
 * rise + un-blur, fired once, slightly before the element is fully on screen.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <ScrollReveal
      once
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] }}
      viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </ScrollReveal>
  );
}

export default Reveal;
