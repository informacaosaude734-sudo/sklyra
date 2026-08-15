import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Reveal from "@/components/motion/Reveal";
import FramerBackground from "@/components/motion/FramerBackground";
import Floaters from "@/components/motion/Floaters";
import { useSeo } from "@/hooks/useSeo";

// Below-the-fold — load after the hero paints
const ProblemSection = lazy(() => import("@/components/landing/ManifestoSection"));
const ServicesSection = lazy(() => import("@/components/landing/ContentSection"));
const VideoCtaSection = lazy(() => import("@/components/landing/VideoCtaSection"));

const DeliverySection = lazy(() => import("@/components/landing/DeliverySection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const PricingSection = lazy(() => import("@/components/landing/PricingSection"));
const ExpectationsSection = lazy(() => import("@/components/landing/ExpectationsSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const LeadFormDialog = lazy(() => import("@/components/landing/LeadFormDialog"));
const SocialProofSection = lazy(() => import("@/components/landing/SocialProofSection"));
const Benefits = lazy(() => import("@/components/landing/Benefits"));


const Index = () => {
  const [formOpen, setFormOpen] = useState(false);
  const userInteractedRef = useRef(false);

  const openForm = useCallback(() => {
    userInteractedRef.current = true;
    setFormOpen(true);
  }, []);

  const handleFormOpenChange = useCallback((open: boolean) => {
    userInteractedRef.current = true;
    setFormOpen(open);
  }, []);

  useSeo({
    title: "Sklyra | Sites, landing pages e automacoes para brasileiros nos EUA",
    description:
      "Sites profissionais, landing pages, SEO local e automacoes para empresas brasileiras nos Estados Unidos que precisam gerar leads e crescer com previsibilidade.",
    canonical: "/",
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Sklyra",
        url: "/",
        inLanguage: ["pt-BR", "en-US"],
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Sklyra",
        url: "/",
        areaServed: ["US", "BR"],
        serviceType: ["Web Development", "Landing Pages", "SEO", "Automation"],
        telephone: "+1-718-249-0931",
      },
    ],
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const schedule = (delay: number) => {
      timer = setTimeout(() => {
        if (userInteractedRef.current) return;
        // Never open on top of an interaction already in progress (the mobile
        // menu is a fullscreen overlay); wait for it to close and retry.
        if (document.documentElement.dataset.mobileMenuOpen) {
          schedule(5000);
          return;
        }
        setFormOpen(true);
      }, delay);
    };

    schedule(30000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to the section matching the current path after lazy sections mount
  // (e.g. /faq -> #faq), falling back to a legacy #hash if present.
  useEffect(() => {
    const id = window.location.pathname.replace(/^\//, "") || window.location.hash.slice(1);
    if (!id) return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts++ < 20) {
        setTimeout(tryScroll, 150);
      }
    };
    tryScroll();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <FramerBackground />
      <Floaters />
      <SmoothScroll />
      <ScrollProgress />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection onOpenForm={openForm} />

          <Suspense fallback={null}>
            <Reveal direction="fade"><Benefits /></Reveal>
            <Reveal><SocialProofSection onOpenForm={openForm} /></Reveal>
            <Reveal><ServicesSection /></Reveal>
            <VideoCtaSection onOpenForm={openForm} />
            <Reveal><ProblemSection /></Reveal>
            <Reveal><DeliverySection /></Reveal>
            <Reveal><TestimonialsSection /></Reveal>
            <Reveal><PricingSection onOpenForm={openForm} /></Reveal>
            <Reveal><ExpectationsSection /></Reveal>

            <Reveal><FAQSection /></Reveal>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
          <LeadFormDialog open={formOpen} onOpenChange={handleFormOpenChange} />

        </Suspense>
      </div>
    </div>
  );
};

export default Index;
