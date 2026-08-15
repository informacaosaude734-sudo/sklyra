import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // -1..1 — negative = moves up faster than scroll
  className?: string;
}

/**
 * Multi-layer parallax on scroll — velocity-damped with spring.
 */
const Parallax = ({ children, speed = 0.15, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [200 * speed, -200 * speed]);
  const sy = useSpring(y, { stiffness: 80, damping: 22, mass: 0.4 });

  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : sy }} className={className}>
      {children}
    </motion.div>
  );
};

export default Parallax;
