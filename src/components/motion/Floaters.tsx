import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

/**
 * Ambient floating orbs — each with its own duration, phase and easing.
 * Desynchronized on purpose (no shared loop). Cheap: 4 blurred divs.
 */
const Floaters = () => {
  const reduce = useReducedMotion();
  const orbs = useMemo(
    () => [
      { top: "8%", left: "6%", size: 260, dur: 18, dx: 40, dy: 30, opacity: 0.10 },
      { top: "40%", left: "82%", size: 320, dur: 26, dx: -60, dy: 50, opacity: 0.08 },
      { top: "72%", left: "12%", size: 220, dur: 22, dx: 50, dy: -40, opacity: 0.09 },
      { top: "18%", left: "62%", size: 180, dur: 14, dx: -30, dy: 20, opacity: 0.11 },
    ],
    []
  );

  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: o.top,
            left: o.left,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, hsl(var(--primary) / ${o.opacity}) 0%, transparent 65%)`,
            filter: "blur(50px)",
          }}
          animate={{
            x: [0, o.dx, -o.dx * 0.4, 0],
            y: [0, o.dy, -o.dy * 0.6, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{ duration: o.dur, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
        />
      ))}
    </div>
  );
};

export default Floaters;
