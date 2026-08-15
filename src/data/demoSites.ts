import bellaCucinaImg from "@/assets/demos/bella-cucina.webp";
import morettiLawImg from "@/assets/demos/moretti-law.webp";
import meridianRealtyImg from "@/assets/demos/meridian-realty.webp";
import fabiHairImg from "@/assets/demos/fabi/hero.webp";
import bellaLogo from "@/assets/demos/logos/bella-cucina-logo.webp";
import morettiLogo from "@/assets/demos/logos/moretti-law-logo.webp";
import meridianLogo from "@/assets/demos/logos/meridian-realty-logo.webp";
import fabiLogo from "@/assets/demos/logos/fabi-hair-logo.webp";

export const DEMO_LOGOS: Record<string, string> = {
  "bella-cucina": bellaLogo,
  "moretti-law": morettiLogo,
  "meridian-realty": meridianLogo,
  "fabi-hair-studio": fabiLogo,
};

export interface DemoSite {
  slug: string;
  industry: string;
  brand: string;
  tagline: string;
  headline: string;
  subheadline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  primary: string;
  accent: string;
  bg: string;
  heroImage: string;
  services: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  testimonials: { name: string; role: string; text: string }[];
  faqs: { q: string; a: string }[];
  ctaLabel: string;
  cta2Label: string;
}

export const DEMO_SITES: DemoSite[] = [
  {
    slug: "bella-cucina",
    industry: "Restaurante Italiano",
    brand: "Bella Cucina",
    tagline: "Autêntica cozinha italiana",
    headline: "Sabores da Itália no coração de Boston",
    subheadline: "Massas artesanais, molhos da casa e vinhos selecionados. Uma experiência gastronômica que vai transportar você direto para Roma.",
    phone: "(617) 555-0142",
    whatsapp: "16175550142",
    email: "reservas@bellacucina.com",
    address: "218 Hanover Street",
    city: "Boston, MA",
    primary: "#C1272D",
    accent: "#F5A623",
    bg: "#0e0806",
    heroImage: bellaCucinaImg,
    services: [
      { title: "Massas Artesanais", desc: "Feitas diariamente com farinha 00 importada da Itália." },
      { title: "Forno a Lenha", desc: "Pizzas napolitanas com massa fermentada 48 horas." },
      { title: "Carta de Vinhos", desc: "Mais de 120 rótulos italianos selecionados pelo sommelier." },
      { title: "Eventos Privados", desc: "Salão reservado para até 60 pessoas com menu personalizado." },
    ],
    features: [
      { title: "Reservas Online", desc: "Garanta sua mesa em segundos." },
      { title: "Delivery Premium", desc: "Entrega em embalagem térmica em toda Boston." },
      { title: "Chef Executivo", desc: "27 anos de experiência em Roma e Nova York." },
    ],
    testimonials: [
      { name: "Ana Ribeiro", role: "North End", text: "A melhor carbonara que já comi fora da Itália. Ambiente impecável." },
      { name: "Marco Silva", role: "Somerville", text: "Voltamos toda semana. O tiramisu é obrigatório." },
      { name: "Jenna Klein", role: "Cambridge", text: "Serviço atencioso e vinhos incríveis. Nosso favorito." },
    ],
    faqs: [
      { q: "Precisa reservar?", a: "Recomendamos reservar, especialmente sextas e sábados." },
      { q: "Tem opções vegetarianas?", a: "Sim, temos um menu vegetariano completo e opções vegan." },
      { q: "Aceitam eventos?", a: "Sim, salão privado para até 60 pessoas." },
    ],
    ctaLabel: "Reservar Mesa",
    cta2Label: "Ver Cardápio",
  },
  {
    slug: "moretti-law",
    industry: "Advocacia",
    brand: "Moretti & Associates",
    tagline: "Advocacia empresarial de alto padrão",
    headline: "Proteção jurídica que fortalece seu negócio",
    subheadline: "Mais de 20 anos defendendo empresas e empreendedores nos Estados Unidos e no Brasil. Estratégia, discrição e resultados.",
    phone: "(212) 555-0198",
    whatsapp: "12125550198",
    email: "contato@morettilaw.com",
    address: "450 Park Avenue, Suite 2200",
    city: "New York, NY",
    primary: "#B8945F",
    accent: "#D4B896",
    bg: "#0a0a0a",
    heroImage: morettiLawImg,
    services: [
      { title: "Direito Empresarial", desc: "Constituição de empresas, contratos e M&A." },
      { title: "Imigração", desc: "Vistos de investidor, EB-2 NIW, O-1 e residência." },
      { title: "Tributário Internacional", desc: "Estruturação fiscal EUA/Brasil e compliance." },
      { title: "Litígios Comerciais", desc: "Representação em disputas contratuais e arbitragem." },
    ],
    features: [
      { title: "Atendimento Bilíngue", desc: "Português, inglês e espanhol." },
      { title: "Rede Internacional", desc: "Escritórios parceiros em 12 países." },
      { title: "Consulta Estratégica", desc: "Primeira reunião de diagnóstico sem custo." },
    ],
    testimonials: [
      { name: "Ricardo Almeida", role: "CEO, Tech Startup", text: "Resolveram nossa estrutura societária em tempo recorde. Profissionais impecáveis." },
      { name: "Luiza Fernandes", role: "Investidora", text: "Meu visto EB-5 aprovado em 8 meses. Recomendo sem hesitar." },
      { name: "Carlos Meireles", role: "Empresário", text: "Estratégia jurídica que economizou milhões em impostos." },
    ],
    faqs: [
      { q: "Atendem casos internacionais?", a: "Sim, especialmente EUA-Brasil e Europa." },
      { q: "Como funciona a primeira consulta?", a: "Reunião estratégica de 45 minutos, gratuita e confidencial." },
      { q: "Cobram por hora ou por caso?", a: "Depende do serviço. Muitos casos têm valor fechado." },
    ],
    ctaLabel: "Agendar Consulta",
    cta2Label: "Nossos Serviços",
  },
  {
    slug: "meridian-realty",
    industry: "Imobiliária de Luxo",
    brand: "Meridian Realty",
    tagline: "Imóveis de alto padrão em Miami",
    headline: "Sua próxima casa em Miami começa aqui",
    subheadline: "Curadoria exclusiva de mansões, penthouses e investimentos imobiliários em South Florida. Consultoria de A a Z para brasileiros.",
    phone: "(786) 555-0233",
    whatsapp: "17865550233",
    email: "sales@meridianrealty.com",
    address: "2600 SW 3rd Avenue",
    city: "Miami, FL",
    primary: "#D4AF37",
    accent: "#F4E4BC",
    bg: "#08090b",
    heroImage: meridianRealtyImg,
    services: [
      { title: "Casas de Luxo", desc: "Portfólio exclusivo de $1M a $30M em Miami." },
      { title: "Investimento Imobiliário", desc: "Aluguéis de temporada com ROI 8-14% ao ano." },
      { title: "Consultoria de Mudança", desc: "Escola, banco, LLC, tudo resolvido para você." },
      { title: "Property Management", desc: "Cuidamos do seu imóvel enquanto você vive no Brasil." },
    ],
    features: [
      { title: "Tour Virtual 4K", desc: "Conheça cada imóvel sem sair de casa." },
      { title: "Financiamento Foreign", desc: "Aprovação até 70% do valor, sem SSN." },
      { title: "Equipe Bilíngue", desc: "Corretores licenciados que falam português." },
    ],
    testimonials: [
      { name: "Fernando Costa", role: "Comprador SP → Miami", text: "Compramos nosso apartamento no Brickell em 30 dias. Suporte impecável." },
      { name: "Renata Vieira", role: "Investidora RJ", text: "Meus 3 imóveis rendem $18k/mês. Meridian gerencia tudo." },
      { name: "Paulo Nogueira", role: "Empresário BH", text: "Mudança da família tranquila. Achei escola, banco e casa em 2 meses." },
    ],
    faqs: [
      { q: "Preciso de green card para comprar?", a: "Não. Estrangeiros compram imóveis nos EUA livremente." },
      { q: "Como funciona o financiamento?", a: "Bancos financiam até 70% para não-residentes." },
      { q: "Tem imposto sobre imóvel?", a: "Sim, property tax anual de aprox. 1-2% do valor." },
    ],
    ctaLabel: "Falar com Corretor",
    cta2Label: "Ver Portfólio",
  },
  {
    slug: "fabi-hair-studio",
    industry: "Salão de Beleza Premium",
    brand: "Fabi Hair Studio",
    tagline: "Where beauty meets confidence",
    headline: "Where Beauty Meets Confidence",
    subheadline: "Personalized hair transformations designed to reveal your best version — because your hair deserves artistry, care, and love.",
    phone: "(424) 603-1916",
    whatsapp: "14246031916",
    email: "hello@fabihairstudio.com",
    address: "12211 Regency Village Dr, Suite 7",
    city: "Orlando, FL",
    primary: "#C9A26B",
    accent: "#E6C79A",
    bg: "#0b0908",
    heroImage: fabiHairImg,
    services: [
      { title: "Haircut & Style", desc: "Precision cuts and modern styling designed to enhance your unique beauty and confidence." },
      { title: "Balayage & Color", desc: "Sun-kissed highlights and natural blends tailored to your skin tone and lifestyle." },
      { title: "Keratin & Treatments", desc: "Frizz-free, silky, manageable hair — deep repair that lasts for months." },
      { title: "Color Correction", desc: "Expert restoration for over-processed or uneven color — shine and balance restored." },
      { title: "Grey Coverage", desc: "Soft, natural-looking color that blends seamlessly while keeping hair healthy and shiny." },
      { title: "Cut & Blowout", desc: "A fresh cut paired with a polished blowout — movement, shape and effortless finish." },
    ],
    features: [
      { title: "Certified since 2015", desc: "Professionally trained hairstylist in the United States." },
      { title: "Private studio", desc: "Cozy, one-on-one atmosphere where every detail is about you." },
      { title: "Premium products", desc: "High-quality lines chosen to protect the health of your hair." },
    ],
    testimonials: [
      { name: "Isabella M.", role: "Orlando, FL", text: "Fabi truly listens. My balayage looks natural and my hair has never felt healthier." },
      { name: "Camila R.", role: "Winter Park, FL", text: "The keratin treatment changed my mornings. Smooth, glossy hair for months." },
      { name: "Sophia L.", role: "Kissimmee, FL", text: "She fixed a color correction another salon ruined. Life-saver, honestly." },
    ],
    faqs: [
      { q: "How do I book an appointment?", a: "The easiest way is through WhatsApp — you get an instant reply and a confirmed time slot." },
      { q: "Do you speak Portuguese?", a: "Yes — Fabi is a Brazilian hair artist and fluent in both English and Portuguese." },
      { q: "What products do you use?", a: "Only premium, professional-grade lines chosen to protect the health of your hair." },
      { q: "How long does a color session take?", a: "Between 2 and 4 hours depending on service — balayage and correction take the longest." },
    ],
    ctaLabel: "Book Your Appointment",
    cta2Label: "View Services",
  },
];

export const getDemoBySlug = (slug: string) => DEMO_SITES.find((d) => d.slug === slug);
