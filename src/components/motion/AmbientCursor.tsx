import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Ambient cursor glow — desktop / fine pointer only.
 * Two layered halos with different spring stiffness = velocity trail.
 * Zero cost on touch devices.
 */
const AmbientCursor = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const halo = { x: useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 }), y: useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 }) };
  const trail = { x: useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 }), y: useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 }) };

  useEffect(() => {
    if (typeof window === "undefined" || reduce) return;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] mix-blend-screen"
        style={{ x: trail.x, y: trail.y, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className="w-[420px] h-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.10) 0%, transparent 60%)",
            filter: "blur(30px)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[61] mix-blend-screen"
        style={{ x: halo.x, y: halo.y, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className="w-14 h-14 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </motion.div>
    </>
  );
};

export default AmbientCursor;
