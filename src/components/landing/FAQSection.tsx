import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT } from "@/i18n";
import SectionHeader from "./SectionHeader";

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useT();
  const faqs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({ q: t(`faq.${n}.q`), a: t(`faq.${n}.a`) }));

  return (
    <section id="faq" className="py-32 px-6 bg-secondary/30">
      <div ref={ref} className="max-w-2xl mx-auto">
        <SectionHeader
          eyebrow={t("faq.eyebrow")}
          title={t("faq.title")}
          className="mb-16"
        />


        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-white/10"
            >

              <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-primary transition-colors py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>



      </div>
    </section>
  );
};

export default FAQSection;
