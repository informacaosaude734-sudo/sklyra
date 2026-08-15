import { Lock, CircleUser, Compass, Gauge, Box } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import { FeatureCard, AnimatedContainer, dashedGridClass } from "@/components/ui/grid-feature-cards";

const icons = [Compass, Lock, Gauge, Box, CircleUser];

const ServicesSection = () => {
  const { t } = useT();
  const items = [1, 2, 3, 4, 5].map((n, i) => ({
    icon: icons[i],
    title: t(`svc.${n}.title`),
    description: t(`svc.${n}.desc`),
  }));

  return (
    <section id="servicos" className="bg-transparent py-16 md:py-32 px-6">
      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        <SectionHeader
          eyebrow={t("svc.eyebrow")}
          title={<>{t("svc.title.1")} <span className="text-primary">{t("svc.title.2")}</span></>}
          description={t("svc.desc")}
          className="mb-16"
        />

        <AnimatedContainer delay={0.4} className={cn(dashedGridClass, "sm:grid-cols-2 lg:grid-cols-3")}>
          {items.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default ServicesSection;
