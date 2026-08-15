import { DemoSite } from "@/data/demoSites";
import EditorialSite, { EditorialTheme } from "./_editorial";

const theme: EditorialTheme = {
  mode: "dark",
  bg: "#08090b",
  ink: "#f4e4bc",
  ink2: "rgba(244,228,188,0.65)",
  line: "rgba(244,228,188,0.15)",
  accent: "#D4AF37",
  panel: "#0d0e10",
  serif: "'Cormorant Garamond', serif",
  sans: "'Inter', sans-serif",
  eyebrow: "#D4AF37",
  quotePanel: "#f4e4bc",
  quoteInk: "#08090b",
};

const MeridianRealty = ({ site }: { site: DemoSite }) => (
  <EditorialSite
    site={site}
    theme={theme}
    fonts={["Cormorant+Garamond:wght@300;400;500;700", "Inter:wght@300;400;500"]}
    storyQuote="Um imóvel em Miami é mais que endereço. É passaporte, é liberdade, é geração de renda em dólar."
    storyAuthor="Meridian Realty"
    sectionLabels={{ services: "O que fazemos", reviews: "Nossos compradores", visit: "Fale com um corretor" }}
    finalTag="Do primeiro tour à escritura. Nós conduzimos."
    contactVariant="realty"
  />
);

export default MeridianRealty;
