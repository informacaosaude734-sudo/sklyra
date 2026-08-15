import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  y = 28,
  className,
  once = true,
}: RevealProps) => {
  const reduce = useReducedMotion();

  const offset = {
    up: { y, x: 0 },
    down: { y: -y, x: 0 },
    left: { x: y, y: 0 },
    right: { x: -y, y: 0 },
    fade: { x: 0, y: 0 },
  }[direction];

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, ...offset, filter: "blur(10px)", scale: 0.985 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: reduce
        ? { duration: 0.3, delay }
        : {
            delay,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
          },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px -12% 0px", amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
