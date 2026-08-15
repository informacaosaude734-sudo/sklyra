import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;    // max rotation in deg
  glare?: boolean; // add moving highlight
}

/**
 * 3D perspective tilt — mouse tracking with spring physics.
 * Adds soft glare that follows the cursor. Desktop only.
 */
const TiltCard = ({ children, className, max = 8, glare = true }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(50); // % for glare
  const py = useMotionValue(50);

  const sRx = useSpring(rx, { stiffness: 180, damping: 18, mass: 0.5 });
  const sRy = useSpring(ry, { stiffness: 180, damping: 18, mass: 0.5 });
  const sPx = useSpring(px, { stiffness: 120, damping: 20 });
  const sPy = useSpring(py, { stiffness: 120, damping: 20 });

  const glareBg = useTransform(
    [sPx, sPy] as any,
    ([x, y]: number[]) =>
      `radial-gradient(400px circle at ${x}% ${y}%, hsl(var(--primary) / 0.18), transparent 55%)`
  );

  const isCoarse =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || isCoarse || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    ry.set((nx - 0.5) * max * 2);
    rx.set(-(ny - 0.5) * max * 2);
    px.set(nx * 100);
    py.set(ny * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    px.set(50);
    py.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: sRx, rotateY: sRy, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {glare && !reduce && !isCoarse && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
          style={{ background: glareBg as any }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
