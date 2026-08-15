import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) => {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`${isCenter ? "text-center mx-auto" : "text-left"} max-w-2xl ${
        isCenter ? "" : "mr-auto"
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.04, y: -1 }}
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/[0.08] px-3.5 py-1.5 mb-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01) 55%, rgba(0,0,0,0.15))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.4), inset 0 0 14px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        {/* grain texture */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: "120px 120px",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{ left: ["-35%", "125%"] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        />

        <span className="relative w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
        <span className="relative text-[10px] uppercase tracking-[0.28em] text-white/80 font-medium">
          {eyebrow}
        </span>
      </motion.div>

      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
        style={{ filter: "drop-shadow(0 2px 24px rgba(0,0,0,0.35))" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-sm md:text-base text-white/60 mt-4 leading-relaxed ${
            isCenter ? "max-w-lg mx-auto" : "max-w-lg"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
