import { motion } from "framer-motion";

export const BorderTrail = ({ size = 80 }: { size?: number }) => (
  <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] overflow-hidden">
    <motion.div
      className="absolute aspect-square bg-primary"
      style={{
        width: size,
        offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        boxShadow: "0 0 30px 10px hsl(var(--primary) / 0.7), 0 0 60px 20px hsl(var(--primary) / 0.3)",
      }}
      animate={{ offsetDistance: ["0%", "100%"] }}
      transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
    />
  </div>
);

export default BorderTrail;
