import Nav from "@/sections/nav";
import Hero from "@/sections/hero";
import Ticker from "@/sections/ticker";
import Problem from "@/sections/problem";
import Services from "@/sections/services";
import Process from "@/sections/process";
import Work from "@/sections/work";
import Testimonials from "@/sections/testimonials";
import PricingSection1 from "@/components/ui/pricing-section-1";
import Faq from "@/sections/faq";
import FinalCta from "@/sections/final-cta";
import Contact from "@/sections/contact";
import Footer from "@/sections/footer";
import StickyCta from "@/sections/sticky-cta";

export default function App() {
  return (
    <div className="noise relative min-h-screen bg-ink">
      <Nav />

      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Services />
        <Process />
        <Work />
        <Testimonials />
        <PricingSection1 />
        <Faq />
        <FinalCta />
        <Contact />
      </main>

      <Footer />
      <StickyCta />
    </div>
  );
}
