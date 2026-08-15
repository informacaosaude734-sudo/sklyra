import { Ghost, MessagesSquare, Hourglass, CircleSlash2 } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import { FeatureCard, AnimatedContainer, dashedGridClass } from "@/components/ui/grid-feature-cards";

const problemIcons = [Ghost, MessagesSquare, Hourglass, CircleSlash2];

const ProblemSection = () => {
  const { t } = useT();
  const problems = problemIcons.map((icon, i) => ({
    icon,
    title: t(`prob.${i + 1}`),
  }));

  return (
    <section className="bg-transparent py-16 md:py-32 px-6">
      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        <SectionHeader
          eyebrow={t("prob.eyebrow")}
          title={<>{t("prob.title.1")} <span className="text-primary">{t("prob.title.2")}</span></>}
          description={t("prob.desc")}
          className="mb-16"
        />

        <AnimatedContainer delay={0.4} className={cn(dashedGridClass, "sm:grid-cols-2")}>
          {problems.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default ProblemSection;
