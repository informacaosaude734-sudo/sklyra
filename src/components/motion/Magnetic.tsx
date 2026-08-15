import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number; // px of max translation
  radius?: number;   // activation radius
}

/**
 * Magnetic cursor attraction — desktop only (pointer:fine).
 * Interpolates translate towards cursor within radius, releases with soft spring.
 */
const Magnetic = ({ children, className, strength = 18, radius = 120 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const isCoarse =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || isCoarse || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    const falloff = 1 - dist / radius;
    x.set((dx / radius) * strength * falloff * 2);
    y.set((dy / radius) * strength * falloff * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
