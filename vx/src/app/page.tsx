import { Barbers } from "@/components/sections/Barbers";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Rio } from "@/components/sections/Rio";
import { Services } from "@/components/sections/Services";
import { Space } from "@/components/sections/Space";
import { VXCut } from "@/components/sections/VXCut";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";

export default function Home() {
  const business = localBusinessJsonLd();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business ?? websiteJsonLd()) }}
      />
      <Hero />
      <Manifesto />
      <Services />
      <VXCut />
      <Gallery />
      <Barbers />
      <Space />
      <Rio />
      <FinalCTA />
    </>
  );
}
