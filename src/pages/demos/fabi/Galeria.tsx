import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { F, FabiLayout } from "./_layout";
import { FABI_EXTRAS } from "@/data/demoExtras";
import fabiG1 from "@/assets/demos/fabi/gallery-1.webp";
import fabiG2 from "@/assets/demos/fabi/gallery-2.webp";
import fabiG3 from "@/assets/demos/fabi/gallery-3.webp";
import fabiG4 from "@/assets/demos/fabi/gallery-4.webp";
import fabiG5 from "@/assets/demos/fabi/gallery-5.webp";
import fabiG6 from "@/assets/demos/fabi/gallery-6.webp";
import fabiG7 from "@/assets/demos/fabi/gallery-7.webp";
import fabiG8 from "@/assets/demos/fabi/gallery-8.webp";

const imgs = [fabiG1, fabiG2, fabiG3, fabiG4, fabiG5, fabiG6, fabiG7, fabiG8];
const spans = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "md:row-span-2",
  "md:col-span-2",
  "",
  "",
  "",
];

const Galeria = ({ site }: { site: DemoSite }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <FabiLayout site={site} active="galeria">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p style={{ color: F.gold }} className="text-[11px] uppercase tracking-[0.4em] mb-4">Real work · real women</p>
        <h1 style={{ fontFamily: F.serif, color: F.goldLight }} className="text-5xl md:text-8xl italic font-light leading-[0.95]">
          The <em style={{ color: F.gold }}>transformations</em>.
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-3">
          {FABI_EXTRAS.gallery.map((g, i) => (
            <motion.button key={i}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.7 }}
              onClick={() => setOpen(i)}
              className={`relative overflow-hidden group ${spans[i]}`}
            >
              <img src={imgs[i % imgs.length]} alt={g.title} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition"
                style={{ background: `linear-gradient(to top, ${F.bg}ee, transparent)` }}
              >
                <p style={{ fontFamily: F.serif, color: F.goldLight }} className="italic text-xl">{g.title}</p>
                <p style={{ color: F.gold }} className="text-[10px] uppercase tracking-[0.3em] mt-1">{g.tech}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div initial={{ scale: 0.9, filter: "blur(20px)" }} animate={{ scale: 1, filter: "blur(0px)" }} exit={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button onClick={() => setOpen(null)} className="absolute -top-12 right-0" style={{ color: F.gold }}><X className="w-6 h-6" /></button>
              <img src={imgs[open % imgs.length]} alt="" className="w-full aspect-[4/5] object-cover" />
              <div className="mt-6 text-center">
                <p style={{ fontFamily: F.serif, color: F.goldLight }} className="text-3xl italic font-light">{FABI_EXTRAS.gallery[open].title}</p>
                <p className="text-[11px] uppercase tracking-[0.3em] mt-3" style={{ color: F.gold }}>{FABI_EXTRAS.gallery[open].tech}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FabiLayout>
  );
};

export default Galeria;
