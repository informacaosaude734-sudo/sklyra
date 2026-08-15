import { motion } from "framer-motion";
import { Check, ShieldCheck, Clock, MessageSquare, Search } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import { FeatureCard, AnimatedContainer, dashedGridClass } from "@/components/ui/grid-feature-cards";
import { BorderTrail } from "@/components/ui/border-trail";

interface PricingSectionProps {
  onOpenForm?: () => void;
}

const guaranteeIcons = [Clock, MessageSquare, ShieldCheck, Search];

const PricingSection = ({ onOpenForm }: PricingSectionProps) => {
  const { t } = useT();

  const plans = [
    {
      name: t("pri.1.name"),
      desc: t("pri.1.desc"),
      price: "$997",
      note: t("pri.or"),
      monthly: "$79",
      features: [1, 2, 3, 4, 5].map((n) => t(`pri.1.f.${n}`)),
      popular: false,
    },
    {
      name: t("pri.2.name"),
      desc: t("pri.2.desc"),
      price: "$1,850",
      note: t("pri.or.2"),
      monthly: "$129",
      plus: t("pri.plus"),
      features: [1, 2, 3, 4, 5].map((n) => t(`pri.2.f.${n}`)),
      popular: true,
    },
  ];

  const guarantees = [1, 2, 3, 4].map((n, i) => ({
    icon: guaranteeIcons[i],
    title: t(`pri.g.${n}.title`),
    description: t(`pri.g.${n}.desc`),
  }));

  return (
    <section id="precos" className="bg-transparent py-16 md:py-32 px-6">
      <div className="mx-auto max-w-3xl lg:max-w-6xl">
        <SectionHeader
          eyebrow={t("pri.eyebrow")}
          title={<>{t("pri.title.1")} <span className="text-primary">{t("pri.title.2")}</span></>}
          description={t("pri.desc")}
          className="mb-16"
        />

        <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative flex flex-col rounded-lg border p-6 md:p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-primary/30 bg-primary/[0.03] hover:border-primary/50"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular ? (
                <BorderTrail size={90} />
              ) : (
                <span className="absolute left-6 right-6 top-0 h-px bg-primary opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              )}

              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="text-lg font-medium text-white">{plan.name}</h3>
                {plan.popular && (
                  <span className="text-[10px] uppercase tracking-[0.28em] text-primary">
                    {t("pri.popular")}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>

              <div className="mb-6">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight text-white">{plan.price}</span>
                  <span className="pb-1 text-xs text-white/50">{t("pri.setup")}</span>
                </div>
                {plan.note && <p className="mt-1 text-xs text-white/40">{plan.note}</p>}
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="text-white font-medium">{plan.monthly}</span>
                  {t("pri.month")}
                </p>
              </div>

              {plan.plus && (
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-primary">{plan.plus}</p>
              )}

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary flex-shrink-0" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenForm}
                className={`mt-auto w-full !px-6 !py-3 !text-sm ${
                  plan.popular ? "btn-framer" : "btn-grain-outline"
                }`}
              >
                {t("pri.cta")}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/50 mb-8">
            {t("pri.g.title")}
          </p>
          <AnimatedContainer delay={0.4} className={cn(dashedGridClass, "sm:grid-cols-2")}>
            {guarantees.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
