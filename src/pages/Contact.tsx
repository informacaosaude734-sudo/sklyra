import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Mail, MessageCircle, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useT } from "@/i18n";
import { useSeo } from "@/hooks/useSeo";

const Contact = () => {
  const { lang } = useT();
  const isPt = lang === "pt";

  useSeo({
    title: isPt ? "Contato | Sklyra" : "Contact | Sklyra",
    description: isPt
      ? "Fale com a equipe Sklyra por WhatsApp, email ou redes sociais para solicitar proposta, tirar duvidas e iniciar seu projeto."
      : "Talk to the Sklyra team by WhatsApp, email or social channels to request a proposal and start your project.",
    canonical: "/contact",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: isPt ? "Contato Sklyra" : "Sklyra Contact",
      url: "/contact",
    },
  });

  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+1 (718) 249-0931",
      href: "https://wa.me/17182490931",
      desc: isPt ? "Resposta em minutos" : "Reply within minutes",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: isPt ? "Enviar mensagem" : "Send a message",
      href: "mailto:equipe@sklyra.com",
      desc: isPt ? "Para propostas e duvidas" : "For proposals and questions",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@sklyra",
      href: "https://www.instagram.com/sklyraweb/",
      desc: isPt ? "Bastidores e cases" : "Behind the scenes and case studies",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Sklyra",
      href: "https://www.facebook.com/profile.php?id=61583545784016",
      desc: isPt ? "Comunidade e novidades" : "Community and updates",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-40 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {isPt ? "Voltar" : "Back"}
        </Link>

        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {isPt ? "Contato" : "Contact"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
            {isPt ? "Fale com a " : "Get in touch "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Sklyra
            </span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
            {isPt
              ? "Escolha o canal mais confortavel. Respondemos rapido sem chatbot e sem enrolacao."
              : "Pick the channel that suits you best. We reply fast with no chatbot and no runaround."}
          </p>
        </div>

        <div className="border-t border-white/[0.06]">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex items-center gap-5 py-7 border-b border-white/[0.06] transition-all"
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-11 h-11 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <c.icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-1">
                  {c.label}
                </p>
                <p className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {c.value}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{c.desc}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </motion.a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
