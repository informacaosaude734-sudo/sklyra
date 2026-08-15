import { NotebookPen, Globe2, PenTool, Search, Send } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import { FeatureCard, AnimatedContainer, dashedGridClass } from "@/components/ui/grid-feature-cards";

const stepIcons = [NotebookPen, Globe2, PenTool, Search, Send];

const DeliverySection = () => {
  const { t } = useT();

  const features = [1, 2, 3, 4, 5].map((n, i) => ({
    title: t(`del.${n}.title`),
    description: t(`del.${n}.desc`),
    icon: stepIcons[i],
  }));

  return (
    <section id="metodo" className="bg-transparent py-16 md:py-32 px-6">
      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        <SectionHeader
          eyebrow={t("del.eyebrow")}
          title={<>{t("del.title.1")} <span className="text-primary">{t("del.title.2")}</span></>}
          description={t("del.desc")}
          className="mb-16"
        />

        <AnimatedContainer delay={0.4} className={cn(dashedGridClass, "sm:grid-cols-2 lg:grid-cols-3")}>
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default DeliverySection;
