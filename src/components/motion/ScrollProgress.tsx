import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  });

  return (
    <>
      {/* Glow underlay */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[99] h-[3px] origin-left"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 50%, hsl(var(--primary)) 100%)",
            filter: "blur(6px)",
            opacity: 0.75,
          }}
        />
      </motion.div>
      {/* Solid progress line */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left rounded-full"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 50%, hsl(var(--primary)) 100%)",
            boxShadow: "0 0 12px hsl(var(--primary) / 0.6)",
          }}
        />
      </motion.div>
    </>
  );
};

export default ScrollProgress;
