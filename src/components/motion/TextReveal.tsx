import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  wordDelay?: number;
  once?: boolean;
}

/**
 * Word-by-word premium reveal.
 * Each word animates: opacity + blur + y + scale + micro letter-spacing correction.
 * Spring physics, staggered. Respects reduced-motion.
 */
const TextReveal = ({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  wordDelay = 0.04,
  once = true,
}: TextRevealProps) => {
  const reduce = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduce ? 0 : wordDelay,
      },
    },
  };

  const word: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 22, filter: "blur(10px)", scale: 0.96, letterSpacing: "0.04em" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      letterSpacing: "0em",
      transition: { type: "spring", damping: 20, stiffness: 140, mass: 0.7 },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-15% 0px -15% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pb-[0.12em]">
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default TextReveal;
