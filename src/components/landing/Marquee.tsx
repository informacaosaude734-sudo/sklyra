import { motion } from "framer-motion";
import {
  Globe,
  PhoneCall,
  Gauge,
  Smartphone,
  Quote,
  Lock,
  LifeBuoy,
} from "lucide-react";
import { useT } from "@/i18n";
import SectionHeader from "./SectionHeader";
import { GoogleLogo, WhatsAppLogo } from "./BrandLogos";

const LucideIcon = (Icon: typeof Globe) => ({ className }: { className?: string }) => (
  <Icon className={`${className} text-primary`} strokeWidth={1.5} />
);

const icons = [
  LucideIcon(Globe),
  GoogleLogo,
  LucideIcon(PhoneCall),
  GoogleLogo,
  WhatsAppLogo,
  LucideIcon(Gauge),
  LucideIcon(Smartphone),
  LucideIcon(Quote),
  LucideIcon(Lock),
  LucideIcon(LifeBuoy),
];

const Marquee = () => {
  const { t } = useT();
  const benefits = icons.map((icon, i) => ({ icon, label: t(`marquee.i.${i + 1}`) }));
  const items = [...benefits, ...benefits];


  return (
    <section className="py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow={t("marquee.title")}
          title={t("marquee.headline")}
          description={t("marquee.desc")}
          className="mb-12"
        />

        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-10 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          >
            {items.map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 select-none flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <Icon className="size-4" />
                <span className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
