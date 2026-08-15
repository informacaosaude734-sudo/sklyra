import { useT } from "@/i18n";
import SectionHeader from "./SectionHeader";
import ClientFeedback, { Testimonial } from "@/components/ui/testimonial";

const TestimonialsSection = () => {
  const { t } = useT();

  const testimonials = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    quote: t(`test.${n}.quote`),
    name: t(`test.${n}.name`),
  })) as [Testimonial, Testimonial, Testimonial, Testimonial, Testimonial, Testimonial, Testimonial];

  return (
    <section id="depoimentos" className="bg-transparent py-16 md:py-32 px-6">
      <div className="mx-auto max-w-3xl lg:max-w-6xl">
        <SectionHeader
          eyebrow={t("test.eyebrow")}
          title={<>{t("test.title.1")} <span className="text-primary">{t("test.title.2")}</span></>}
          description={t("test.desc")}
          className="mb-16"
        />

        <ClientFeedback testimonials={testimonials} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
