import { motion } from "framer-motion";
import { PhoneCall, Navigation, CalendarCheck, ShieldCheck, Timer } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import { FeatureCard, AnimatedContainer, dashedGridClass } from "@/components/ui/grid-feature-cards";

const nicheIcons = [PhoneCall, Navigation, CalendarCheck];
const guaranteeIcons = [Timer, ShieldCheck];

const ExpectationsSection = () => {
  const { t } = useT();

  const niches = [1, 2, 3].map((n, i) => ({
    icon: nicheIcons[i],
    niche: t(`exp.${n}.niche`),
    sub: t(`exp.${n}.sub`),
    metric: t(`exp.${n}.metric`),
    unit: t(`exp.${n}.unit`),
    note: t(`exp.${n}.note`),
  }));

  const guarantees = [1, 2].map((n, i) => ({
    icon: guaranteeIcons[i],
    title: t(`exp.g.${n}.title`),
    description: t(`exp.g.${n}.desc`),
  }));

  return (
    <section id="expectativas" className="bg-transparent py-16 md:py-32 px-6">
      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        <SectionHeader
          eyebrow={t("exp.eyebrow")}
          title={<>{t("exp.title.1")} <span className="text-primary">{t("exp.title.2")}</span></>}
          description={t("exp.desc")}
          className="mb-16"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {niches.map(({ icon: Icon, niche, sub, metric, unit, note }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-primary/30"
            >
              <div className="flex items-center gap-3">
                <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
                <h3 className="text-base font-medium leading-tight text-white">{niche}</h3>
              </div>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-white/40">{sub}</p>

              <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-4xl font-semibold leading-none text-white">{metric}</span>
                <span className="text-[11px] tracking-wide text-primary/80">{unit}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{note}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 border-l border-white/10 pl-4 text-xs leading-relaxed text-white/40"
        >
          {t("exp.disclaimer")}
        </motion.p>

        <AnimatedContainer delay={0.4} className={cn(dashedGridClass, "mt-20 sm:grid-cols-2")}>
          {guarantees.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>

      </div>
    </section>
  );
};

export default ExpectationsSection;
