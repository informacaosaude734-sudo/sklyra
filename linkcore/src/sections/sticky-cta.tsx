import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      // visible after the hero, hidden once the contact form is on screen
      setShow(y > window.innerHeight * 1.2 && y < max - window.innerHeight * 1.1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-brand/25 bg-ink/90 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
            <p className="hidden text-[13px] font-medium text-white/55 sm:block">
              3 slots left this month
            </p>
            <p className="display text-[15px] sm:text-base">
              Stop posting into the void.
            </p>
            <a href="#contact">
              <Button size="sm" className="group shrink-0">
                Book a call
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyCta;
