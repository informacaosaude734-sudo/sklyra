import { motion, useInView, Variants } from "framer-motion";
import { ComponentType, ElementType, ReactNode, RefObject } from "react";

interface TimelineContentProps {
  children: ReactNode;
  as?: ElementType;
  animationNum: number;
  timelineRef: RefObject<HTMLElement>;
  customVariants?: Variants;
  className?: string;
  [key: string]: unknown;
}

const defaultVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
  hidden: { y: 20, opacity: 0 },
};

export function TimelineContent({
  children,
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  ...props
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const MotionComponent = motion(
    as as ComponentType<Record<string, unknown>>
  ) as ComponentType<Record<string, unknown>>;

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={customVariants ?? defaultVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
