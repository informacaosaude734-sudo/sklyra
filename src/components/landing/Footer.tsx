import { Instagram, Facebook } from "lucide-react";
import { useT } from "@/i18n";
import { Footer as FooterSection, type FooterSection as FooterSectionType } from "@/components/ui/footer-section";

const Footer = () => {
  const { t, lang } = useT();

  const sections: FooterSectionType[] = [
    {
      label: t("foot.nav"),
      links: [
        { title: t("nav.services"), href: "/servicos" },
        { title: t("nav.method"), href: "/metodo" },
        { title: t("nav.pricing"), href: "/precos" },
        { title: t("nav.faq"), href: "/faq" },
      ],
    },
    {
      label: t("foot.company"),
      links: [
        { title: t("nav.cases"), href: "/cases" },
        { title: t("nav.insights"), href: "/insights" },
        { title: t("foot.terms"), href: "/terms" },
        { title: t("foot.privacy"), href: "/privacy" },
        { title: t("foot.contact"), href: "/contact" },
      ],
    },
    {
      label: t("foot.social"),
      links: [
        { title: "Instagram", href: "https://www.instagram.com/sklyraweb/", icon: Instagram, external: true },
        { title: "Facebook", href: "https://www.facebook.com/profile.php?id=61583545784016", icon: Facebook, external: true },
        ...(lang === "en"
          ? [{ title: "(762) 578-6358", href: "tel:+17625786358" }]
          : []),
      ],
    },
  ];

  return (
    <FooterSection
      sections={sections}
      copyright={t("foot.rights")}
    />
  );
};

export default Footer;
