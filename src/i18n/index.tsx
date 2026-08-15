import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";


export type Lang = "pt" | "en";

type Dict = Record<string, string>;

const pt: Dict = {
  // Announcement bar
  "ann.1": "ÚLTIMAS VAGAS PARA CONSULTORIA GRATUITA — AGENDE AGORA!",
  "ann.2": "SEU SITE PODE VENDER 10X MAIS — DESCUBRA COMO",

  // Navbar
  "nav.services": "Serviços",
  "nav.method": "Método",
  "nav.results": "Resultados",
  "nav.pricing": "Preços",
  "nav.cases": "Cases",
  "nav.insights": "Insights",
  "nav.faq": "FAQ",

  // Hero
  "hero.prefix": "Seu negócio precisa de um site que",
  "hero.middle": "Nós cuidamos de tudo,",
  "hero.underlined": "do zero ao ar.",
  "hero.words.0": "traz clientes.",
  "hero.words.1": "gera contatos.",
  "hero.words.2": "vende mais.",
  "hero.words.3": "converte.",
  "hero.words.4": "aparece no Google.",
  "hero.words.5": "cresce com você.",
  "hero.sub.1": "Site bilíngue no ar em 5 dias +",
  "hero.sub.2": "Google Maps",
  "hero.sub.3": "para seu cliente encontrar você e entrar em contato — nós cuidamos de tudo.",
  "hero.cta": "Quero meu diagnóstico grátis",

  "hero.video.fallback": "Seu navegador não suporta o elemento de vídeo.",
  "hero.video.title": "Quer trazer mais leads?",
  "hero.video.sub": "Sites escaláveis e automações que fecham negócios para brasileiros nos EUA.",
  "hero.video.cta": "Quero saber mais",
  "hero.video.keep": "Continuar assistindo",

  // Marquee
  "marquee.title": "O que você recebe",
  "marquee.headline": "Tudo pronto para o cliente te achar e te ligar",
  "marquee.desc": "Sem termos técnicos. Você recebe um site que carrega rápido, aparece no Google e transforma visita em ligação.",
  "marquee.i.1": "Site próprio no seu nome",
  "marquee.i.2": "Aparece no Google local",
  "marquee.i.3": "Botão de ligar em 1 toque",
  "marquee.i.4": "Perfil do Google otimizado",
  "marquee.i.5": "Formulário que chega no seu WhatsApp",
  "marquee.i.6": "Carrega em menos de 2 segundos",
  "marquee.i.7": "Funciona perfeito no celular",
  "marquee.i.8": "Avaliações de clientes em destaque",
  "marquee.i.9": "Site seguro com cadeado",
  "marquee.i.10": "Manutenção e suporte inclusos",

  // Services
  "svc.eyebrow": "Serviços",
  "svc.title.1": "O que",
  "svc.title.2": "executamos",
  "svc.desc": "Soluções sob medida para estruturar, automatizar e escalar a presença digital do seu negócio com performance real.",
  "svc.1.title": "Sites institucionais e comerciais",
  "svc.1.desc": "Criação ou reconstrução completa, focada em conversão e velocidade",
  "svc.2.title": "Funis de conversão",
  "svc.2.desc": "Estruturação de funis simples, objetivos e com métricas claras",
  "svc.3.title": "Automação de atendimento",
  "svc.3.desc": "WhatsApp, e-mail e formulários integrados e automatizados",
  "svc.4.title": "Integração de sistemas",
  "svc.4.desc": "Conexão entre site, CRM e processos internos da empresa",
  "svc.5.title": "Otimização e performance",
  "svc.5.desc": "Velocidade, SEO técnico e estrutura para escalar",

  // Problem / Manifesto
  "prob.eyebrow": "O Problema",
  "prob.title.1": "O problema não é marketing.",
  "prob.title.2": "É estrutura.",
  "prob.desc": "A maioria das empresas gasta dinheiro em anúncios, redes sociais e agências sem resolver o que realmente trava o crescimento: a ausência de uma operação digital funcional.",
  "prob.1": "Site que não gera leads apenas existe",
  "prob.2": "Dependência total de indicação boca a boca",
  "prob.3": "Horas perdidas com processos manuais e retrabalho",
  "prob.4": "Sem dados, sem funil, sem previsibilidade",


  // Results
  "res.eyebrow": "Resultados",
  "res.title": "O que você pode esperar",
  "res.desc": "Não prometemos faturamento. Entregamos estrutura, clareza e uma operação que funciona.",
  "res.1": "Organização real dos processos digitais",
  "res.2": "Clareza sobre o que funciona e o que desperdiça dinheiro",
  "res.3": "Previsibilidade de leads e atendimento",
  "res.4": "Estrutura pronta para crescer com segurança",
  "res.5": "Menos dependência de indicação e mais controle",
  "res.6": "Redução de custos com retrabalho e processos manuais",

  "nich.1.title": "Home Services",
  "nich.1.desc": "Limpeza, handyman, construção, landscaping, pintura e HVAC.",
  "nich.2.title": "Alimentação",
  "nich.2.desc": "Restaurantes, lanchonetes, food trucks e catering.",
  "nich.3.title": "Saúde & Profissionais",
  "nich.3.desc": "Clínicas de estética, contadores, consultores e serviços especializados.",
  "nich.regions": "Regiões-chave",
  "nich.r.1": "Flórida — Orlando e Miami",
  "nich.r.2": "Massachusetts — Boston",
  "nich.r.3": "New Jersey — Newark",

  // Entrega
  "del.eyebrow": "Método",
  "del.title.1": "Sua estrutura no ar em",
  "del.title.2": "5 dias",
  "del.desc": "Um processo fixo, sem reuniões infinitas e sem prazo de dois meses como nas agências tradicionais.",
  "del.1.title": "Briefing e onboarding",
  "del.1.desc": "Um formulário inteligente. Sem calls longas.",
  "del.2.title": "Copy bilíngue",
  "del.2.desc": "Inglês e português escritos para converter no mercado americano.",
  "del.3.title": "Design e construção",
  "del.3.desc": "Estrutura rápida, mobile-first, feita para gerar chamadas.",
  "del.4.title": "SEO local e Google Maps",
  "del.4.desc": "Google Business Profile otimizado para buscas em inglês.",
  "del.5.title": "Testes e lançamento",
  "del.5.desc": "Revisão, aprovação e apontamento do domínio.",

  // Depoimentos
  "test.eyebrow": "Depoimentos",
  "test.title.1": "Clientes que já estão",
  "test.title.2": "sendo encontrados",
  "test.desc": "Veja o que donos de negócios brasileiros nos EUA têm a dizer sobre o site que construímos para eles.",
  "test.1.quote": "A Sklyra refez nosso site em cinco dias. Em duas semanas já estava recebendo ligação direto do Google Maps, se pagou no primeiro serviço.",
  "test.1.name": "Marcos Ferreira",
  "test.2.quote": "Sem reunião chata nem enrolação, foi só um formulário e o texto bilíngue já saiu pronto pra falar com cliente americano.",
  "test.2.name": "Mike Turner",
  "test.3.quote": "Só o botão do WhatsApp já mudou a velocidade que os leads chegam até mim, todo dia entra gente nova.",
  "test.3.name": "Eduardo Lima",
  "test.4.quote": "Finalmente um site tão bonito quanto o trabalho que a gente entrega, os clientes sempre comentam.",
  "test.4.name": "Patrícia Souza",
  "test.5.quote": "O suporte responde em minutos, não em dias, isso pra mim já vale o investimento.",
  "test.5.name": "Sarah Mitchell",
  "test.6.quote": "O catálogo e a galeria de fotos fizeram nosso cardápio brilhar online, as pessoas chegam já sabendo o que pedir.",
  "test.6.name": "Camila Duarte",
  "test.7.quote": "A Sklyra não fez só um site, fez um sistema que continua gerando ligação toda semana. Melhor investimento que fizemos esse ano.",
  "test.7.name": "Fernando Ribeiro",

  // Preços
  "pri.eyebrow": "Preços",
  "pri.title.1": "Preço transparente,",
  "pri.title.2": "sem letras miúdas",
  "pri.desc": "Agências americanas cobram de $3.500 a $5.000 e levam dois meses. Nós entregamos sua estrutura bilíngue em dias.",
  "pri.popular": "Mais popular",
  "pri.setup": "setup único",
  "pri.month": "/mês",
  "pri.or": "ou 2x de $550",
  "pri.or.2": "ou 2x de $975",
  "pri.plus": "Tudo do Essential, mais:",
  "pri.for": "Ideal para",
  "pri.custom": "sob consulta",
  "pri.1.name": "Essential Engine",
  "pri.1.desc": "Para negócios que precisam ser encontrados e chamados em inglês.",
  "pri.1.for": "Limpeza, handyman, pintores, estética e autônomos.",
  "pri.1.f.1": "Site bilíngue premium (1 a 3 páginas), mobile-first e focado em conversão",
  "pri.1.f.2": "Google Business Profile e SEO local para aparecer nas buscas da sua cidade",
  "pri.1.f.3": "Copywriting de vendas em inglês e português — você não escreve nada",
  "pri.1.f.4": "Botões de ação rápida: WhatsApp, ligação direta e formulário de orçamento",
  "pri.1.f.5": "Hospedagem ultrarrápida, SSL, backups e pequenos ajustes mensais inclusos",
  "pri.2.name": "Growth Engine",
  "pri.2.desc": "Para operações que precisam de catálogo, filtros e automação.",
  "pri.2.for": "Restaurantes, lojas com catálogo, reformas maiores e clínicas.",
  "pri.2.f.1": "Até 6 páginas bilíngues: institucional, áreas atendidas e projetos",
  "pri.2.f.2": "Catálogo e filtros para produtos, pratos ou galeria de serviços",
  "pri.2.f.3": "Automações de IA e pré-atendimento com triagem de leads",
  "pri.2.f.4": "SEO local avançado com mapeamento de palavras-chave da concorrência",
  "pri.2.f.5": "Suporte prioritário",
  "pri.cta": "Quero minha auditoria gratuita",
  "pri.g.title": "O que garantimos",
  "pri.g.1.title": "Entrega em 5 dias úteis",
  "pri.g.1.desc": "Processo fixo. Se atrasarmos, o primeiro mês é por nossa conta.",
  "pri.g.2.title": "Zero jargão técnico",
  "pri.g.2.desc": "Você aprova o resultado, não uma lista de termos que não precisa conhecer.",
  "pri.g.3.title": "Cancele quando quiser",
  "pri.g.3.desc": "Sem contrato de fidelidade. A mensalidade cobre hospedagem, ajustes e suporte.",
  "pri.g.4.title": "Auditoria local gratuita",
  "pri.g.4.desc": "Analisamos sua presença no Google antes de você pagar qualquer coisa.",

  // Expectativas / Volume de leads
  "exp.eyebrow": "Expectativas reais",
  "exp.title.1": "Não prometemos clientes.",
  "exp.title.2": "Entregamos volume de leads",
  "exp.desc": "O fechamento depende do seu preço e do seu atendimento. O que a estrutura garante é atração de contatos qualificados todo mês.",
  "exp.1.niche": "Serviços de casa",
  "exp.1.sub": "Cleaning, handyman, pintura, landscaping",
  "exp.1.metric": "15 a 40",
  "exp.1.unit": "pedidos de orçamento/mês",
  "exp.1.note": "Fechando 25%, são 4 a 10 novos clientes por mês. Um único contrato recorrente paga o setup no primeiro mês.",
  "exp.2.niche": "Alimentação e restaurantes",
  "exp.2.sub": "Delivery, cardápio digital, reservas",
  "exp.2.metric": "100 a 300",
  "exp.2.unit": "cliques em “Como chegar”/mês",
  "exp.2.note": "Somado às visualizações do cardápio digital e ligações diretas pelo Google Maps.",
  "exp.3.niche": "Estética, saúde e serviços profissionais",
  "exp.3.sub": "Clínicas, salões, consultorias",
  "exp.3.metric": "10 a 25",
  "exp.3.unit": "pedidos de agendamento/mês",
  "exp.3.note": "Baseado em Google Maps otimizado somado a um site bilíngue com agendamento direto.",
  "exp.disclaimer": "Médias observadas em cidades com forte presença brasileira (Orlando, Boston, Newark). Estimativas de leads, não de vendas fechadas.",
  "exp.g.1.title": "Garantia de SLA — 7 dias úteis",
  "exp.g.1.desc": "Site e Google Business Profile no ar em 7 dias úteis ou devolvemos 100% do valor.",
  "exp.g.2.title": "Garantia de desempenho — 30 dias",
  "exp.g.2.desc": "Se em 30 dias após o lançamento você não receber novos contatos via Google ou site, refazemos a otimização de palavras-chave sem custo até os contatos entrarem.",



  // Offer / CTA
  "cta.eyebrow": "Oferta limitada",
  "cta.title": "Seu site profissional",
  "cta.was": "R$ 2.500",
  "cta.discount": "-82%",
  "cta.price": "R$ 450",
  "cta.market": "Valor de mercado: R$ 2.500 – R$ 5.000",
  "cta.desc": "Criação completa do zero ou análise e otimização do seu site atual. Sem enrolação, com entrega rápida.",
  "cta.button": "Garantir meu site",
  "cta.foot": "Resposta em até 24h · Sem compromisso",

  // FAQ
  "faq.eyebrow": "Dúvidas",
  "faq.title": "Perguntas Frequentes",
  "faq.1.q": "Qual o prazo para ter o site ou sistema pronto?",
  "faq.1.a": "Seu site fica no ar em 5 dias úteis. Projetos maiores, com catálogo e automações, ficam prontos em até 10 dias úteis.",
  "faq.2.q": "Vocês trabalham com empresas de qualquer segmento?",
  "faq.2.a": "Sim. Atendemos pequenas e médias empresas de qualquer setor que precisam de estrutura digital funcional — desde comércio local até prestadores de serviço.",
  "faq.3.q": "Já tenho um site. Vocês refazem ou otimizam?",
  "faq.3.a": "Avaliamos caso a caso. Se o site atual for recuperável, otimizamos. Se não, reconstruímos do zero com foco em resultado.",
  "faq.4.q": "O que está incluso no diagnóstico?",
  "faq.4.a": "Análise do site atual, presença digital, processos de atendimento e identificação dos principais gargalos. Entregamos um parecer objetivo do que precisa ser feito.",
  "faq.5.q": "Vocês oferecem suporte após a entrega?",
  "faq.5.a": "Sim. Todos os projetos incluem um período de acompanhamento pós-entrega para ajustes e validação de resultados.",
  "faq.6.q": "Quanto custa um site profissional com vocês?",
  "faq.6.a": "Nossos planos começam em $997 (setup) + $79/mês para o Essential Engine, e $1.850 (setup) + $129/mês para o Growth Engine, que inclui catálogo, filtros e automações. Projetos com integrações complexas ou sistemas sob medida recebem orçamento personalizado após o diagnóstico.",
  "faq.7.q": "Vocês atendem clientes fora dos EUA e do Brasil?",
  "faq.7.a": "Sim. Trabalhamos 100% remoto e atendemos clientes em qualquer país. Nosso foco principal é brasileiros nos EUA, mas entregamos em português e inglês para qualquer mercado.",
  "faq.8.q": "Como funciona o processo de pagamento?",
  "faq.8.a": "Trabalhamos com 50% na aprovação do projeto e 50% na entrega final. Aceitamos Zelle, transferência bancária (US), Pix (BR) e cartão de crédito via link seguro.",
  "faq.9.q": "O site é responsivo e otimizado para mobile?",
  "faq.9.a": "Todos os sites são construídos com abordagem mobile-first, 100% responsivos, otimizados para Core Web Vitals e prontos para rankear no Google.",
  "faq.10.q": "Vocês cuidam da hospedagem e domínio?",
  "faq.10.a": "Sim. Configuramos hospedagem de alta performance, domínio, SSL, e-mails profissionais e todo o ambiente técnico. Você recebe o site 100% funcional, sem se preocupar com nada técnico.",

  // Urgency banner
  "urg.count": "+15 pessoas",
  "urg.claimed": "já garantiram",
  "urg.sub": "seu site profissional este mês",
  "urg.cta": "Garantir meu site",

  // Footer
  "foot.terms": "Termos",
  "foot.privacy": "Privacidade",
  "foot.contact": "Contato",
  "foot.rights": "© 2026 Sklyra. Todos os direitos reservados.",
  "foot.nav": "Navegação",
  "foot.company": "Empresa",
  "foot.social": "Redes sociais",
  "foot.tagline": "Operação 100% digital — atendemos clientes em todos os EUA",

  // Social proof / comparison
  "sp.status.included": "Incluído",
  "sp.status.notIncluded": "Não incluído",
  "sp.eyebrow": "Compare antes de decidir",
  "sp.title.1": "Compare suas",
  "sp.title.2": "opções",
  "sp.desc": "Três jeitos de resolver o mesmo problema. Compare o que cada um realmente entrega.",

  "sp.col.1.name": "Site pronto (Wix, Squarespace)",
  "sp.col.1.price": "$20–$50/mês, você mesmo monta",
  "sp.col.1.f.1": "SEO local configurado",
  "sp.col.1.f.1.ok": "0",
  "sp.col.1.f.2": "Copywriting de vendas em inglês e português",
  "sp.col.1.f.2.ok": "0",
  "sp.col.1.f.3": "Suporte contínuo",
  "sp.col.1.f.3.ok": "0",
  "sp.col.1.f.4": "Você atualiza e mantém tudo sozinho",
  "sp.col.1.f.4.ok": "1",

  "sp.col.2.name": "Freelancer avulso",
  "sp.col.2.price": "$300–$800, prazo e qualidade variam",
  "sp.col.2.f.1": "SEO local configurado",
  "sp.col.2.f.1.ok": "0",
  "sp.col.2.f.2": "Copywriting de vendas em inglês e português",
  "sp.col.2.f.2.ok": "0",
  "sp.col.2.f.3": "Suporte contínuo",
  "sp.col.2.f.3.ok": "0",
  "sp.col.2.f.4": "Cada ajuste é negociado à parte",
  "sp.col.2.f.4.ok": "1",

  "sp.col.3.name": "Sklyra",
  "sp.col.3.price": "$997 setup, ou 2x $550",
  "sp.col.3.f.1": "SEO local e Google Business Profile inclusos",
  "sp.col.3.f.1.ok": "1",
  "sp.col.3.f.2": "Copywriting de vendas em inglês e português",
  "sp.col.3.f.2.ok": "1",
  "sp.col.3.f.3": "Suporte e pequenos ajustes mensais inclusos",
  "sp.col.3.f.3.ok": "1",
  "sp.col.3.f.4": "Entrega em até 5 dias úteis, com garantia",
  "sp.col.3.f.4.ok": "1",
  "sp.recommended": "Recomendado",
  "sp.feature.1": "SEO local",
  "sp.feature.2": "Copywriting bilíngue",
  "sp.feature.3": "Suporte contínuo",
  "sp.feature.4": "O que você assume",

  // Hero split (Active Logic-style)
  "hero.eyebrow": "AGÊNCIA WEB PARA BRASILEIROS NOS EUA",
  
  "hero.card.eyebrow": "DIAGNÓSTICO GRATUITO EM VÍDEO",
  "hero.card.title": "Quer aparecer no Google e receber ligações?",
  "hero.card.b1": "Site bilíngue (inglês e português) no ar em 5 dias",
  "hero.card.b2": "Perfil no Google Maps otimizado para busca local",
  "hero.card.b3": "Botão de ligar e leads direto no seu WhatsApp",
  "hero.card.b4": "$997 de setup + $79/mês, sem surpresa no orçamento",
  "hero.card.cta": "Solicitar diagnóstico grátis",
  "hero.card.note": "Resposta em até 24h · Sem compromisso",
  "hero.card.already": "Já quer começar hoje?",

  "hero.card.schedule": "Falar agora",
  "hero.card.scheduleSub": "CONSULTORIA 15 MIN",
  "hero.card.callus": "WhatsApp",
  "hero.card.callusSub": "FALE COM A EQUIPE",
  // Stats bar
  "hero.stats.1": "Site bilíngue desde o início",
  "hero.stats.2": "local incluso em todo plano",
  "hero.stats.3": "contrato de fidelidade",
  "hero.stats.4": "No ar em 5 dias úteis",
};

const en: Dict = {
  "ann.1": "LAST SPOTS FOR FREE CONSULTATION — BOOK NOW!",
  "ann.2": "YOUR WEBSITE CAN SELL 10X MORE — LEARN HOW",

  "nav.services": "Services",
  "nav.method": "Method",
  "nav.results": "Results",
  "nav.pricing": "Pricing",
  "nav.cases": "Cases",
  "nav.insights": "Insights",
  "nav.faq": "FAQ",

  "hero.prefix": "Your business needs a website that",
  "hero.middle": "We handle everything,",
  "hero.underlined": "from start to finish.",
  "hero.words.0": "brings customers.",
  "hero.words.1": "gets you calls.",
  "hero.words.2": "sells more.",
  "hero.words.3": "converts.",
  "hero.words.4": "shows up on Google.",
  "hero.words.5": "grows with you.",
  "hero.sub.1": "Bilingual website live in 5 days +",
  "hero.sub.2": "Google Maps",
  "hero.sub.3": "so customers can find you and get in touch — we handle everything.",
  "hero.cta": "Get my free diagnosis",

  "hero.video.fallback": "Your browser does not support the video tag.",
  "hero.video.title": "Want to bring in more leads?",
  "hero.video.sub": "Scalable websites and automations that close deals for Brazilians in the US.",
  "hero.video.cta": "Tell me more",
  "hero.video.keep": "Keep watching",

  "marquee.title": "What you get",
  "marquee.headline": "Everything set up so customers find you and call you",
  "marquee.desc": "No tech jargon. You get a site that loads fast, shows up on Google and turns visits into calls.",
  "marquee.i.1": "A site that is truly yours",
  "marquee.i.2": "Show up in local Google searches",
  "marquee.i.3": "One-tap call button",
  "marquee.i.4": "Google Business Profile tuned",
  "marquee.i.5": "Leads sent straight to your phone",
  "marquee.i.6": "Loads in under 2 seconds",
  "marquee.i.7": "Looks perfect on mobile",
  "marquee.i.8": "Customer reviews front and center",
  "marquee.i.9": "Secure site with the padlock",
  "marquee.i.10": "Maintenance and support included",

  "svc.eyebrow": "Services",
  "svc.title.1": "What we",
  "svc.title.2": "deliver",
  "svc.desc": "Tailored solutions to structure, automate and scale your business's digital presence with real performance.",
  "svc.1.title": "Business & corporate websites",
  "svc.1.desc": "Full builds or rebuilds, focused on conversion and speed",
  "svc.2.title": "Conversion funnels",
  "svc.2.desc": "Simple, focused funnels with clear metrics",
  "svc.3.title": "Sales & support automation",
  "svc.3.desc": "WhatsApp, email and forms fully integrated and automated",
  "svc.4.title": "Systems integration",
  "svc.4.desc": "Connect your website, CRM and internal processes",
  "svc.5.title": "Performance & optimization",
  "svc.5.desc": "Speed, technical SEO and structure to scale",

  "prob.eyebrow": "The Problem",
  "prob.title.1": "The problem isn't marketing.",
  "prob.title.2": "It's structure.",
  "prob.desc": "Most companies burn money on ads, social media and agencies without solving what really blocks growth: the lack of a functional digital operation.",
  "prob.1": "A website that doesn't generate leads is just decoration",
  "prob.2": "Total dependence on word-of-mouth referrals",
  "prob.3": "Hours lost on manual processes and rework",
  "prob.4": "No data, no funnel, no predictability",

  "res.eyebrow": "Results",
  "res.title": "What you can expect",
  "res.desc": "We don't promise revenue. We deliver structure, clarity and an operation that works.",
  "res.1": "Real organization of your digital processes",
  "res.2": "Clarity on what works and what wastes money",
  "res.3": "Predictable leads and customer support",
  "res.4": "A structure ready to grow safely",
  "res.5": "Less dependence on referrals and more control",
  "res.6": "Lower costs from rework and manual processes",

  "nich.1.title": "Home Services",
  "nich.1.desc": "Cleaning, handyman, construction, landscaping, painting and HVAC.",
  "nich.2.title": "Food & Hospitality",
  "nich.2.desc": "Restaurants, cafés, food trucks and catering operations.",
  "nich.3.title": "Health & Professional",
  "nich.3.desc": "Aesthetic clinics, accountants, consultants and specialized services.",
  "nich.regions": "Key regions",
  "nich.r.1": "Florida — Orlando & Miami",
  "nich.r.2": "Massachusetts — Boston",
  "nich.r.3": "New Jersey — Newark",

  // Delivery
  "del.eyebrow": "Method",
  "del.title.1": "Your engine live in",
  "del.title.2": "5 days",
  "del.desc": "A fixed process, no endless meetings and no two-month timelines like traditional agencies.",
  "del.1.title": "Briefing & onboarding",
  "del.1.desc": "One smart form. No long calls.",
  "del.2.title": "Bilingual copy",
  "del.2.desc": "English and Portuguese written to convert in the US market.",
  "del.3.title": "Design & build",
  "del.3.desc": "Fast, mobile-first structure built to generate calls.",
  "del.4.title": "Local SEO & Google Maps",
  "del.4.desc": "Google Business Profile optimized for English local searches.",
  "del.5.title": "Testing & launch",
  "del.5.desc": "Review, approval and domain pointing.",

  // Testimonials
  "test.eyebrow": "Testimonials",
  "test.title.1": "Clients who are already",
  "test.title.2": "getting found",
  "test.desc": "See what Brazilian business owners in the US have to say about the site we built for them.",
  "test.1.quote": "Sklyra rebuilt our site in five days. Within two weeks I was getting calls straight from Google Maps, it paid for itself with the first job.",
  "test.1.name": "Marcos Ferreira",
  "test.2.quote": "No endless back and forth, just one form, and the bilingual copy came out ready to talk to American clients.",
  "test.2.name": "Mike Turner",
  "test.3.quote": "The WhatsApp button alone changed how fast leads reach me, new people every day.",
  "test.3.name": "Eduardo Lima",
  "test.4.quote": "Finally a site as good looking as the work we do, clients bring it up all the time.",
  "test.4.name": "Patrícia Souza",
  "test.5.quote": "Support answers in minutes, not days, that alone is worth it.",
  "test.5.name": "Sarah Mitchell",
  "test.6.quote": "The catalog and photo gallery made our menu shine online, people show up already knowing what to order.",
  "test.6.name": "Camila Duarte",
  "test.7.quote": "Sklyra didn't just build a site, they built a system that keeps generating calls every week. Best investment we made this year.",
  "test.7.name": "Fernando Ribeiro",

  // Pricing
  "pri.eyebrow": "Pricing",
  "pri.title.1": "Transparent pricing,",
  "pri.title.2": "no fine print",
  "pri.desc": "American agencies charge $3,500 to $5,000 and take two months. We deliver your bilingual engine in days.",
  "pri.popular": "Most popular",
  "pri.setup": "one-time setup",
  "pri.month": "/month",
  "pri.or": "or 2x $550",
  "pri.or.2": "or 2x $975",
  "pri.plus": "Everything in Essential, plus:",
  "pri.for": "Best for",
  "pri.custom": "on request",
  "pri.1.name": "Essential Engine",
  "pri.1.desc": "For businesses that need to be found and called in English.",
  "pri.1.for": "Cleaning, handyman, painters, beauty and solo pros.",
  "pri.1.f.1": "Premium bilingual site (1–3 pages), mobile-first and conversion focused",
  "pri.1.f.2": "Google Business Profile & local SEO to show up in your city's searches",
  "pri.1.f.3": "Sales copywriting in English and Portuguese — you write nothing",
  "pri.1.f.4": "Quick action buttons: WhatsApp, direct call and smart quote form",
  "pri.1.f.5": "Ultra-fast hosting, SSL, backups and monthly text/photo tweaks included",
  "pri.2.name": "Growth Engine",
  "pri.2.desc": "For operations that need catalog, filters and automation.",
  "pri.2.for": "Restaurants, catalog stores, larger remodelers and clinics.",
  "pri.2.f.1": "Up to 6 bilingual pages: about, service areas and projects",
  "pri.2.f.2": "Catalog and filters for products, dishes or service galleries",
  "pri.2.f.3": "AI automations and pre-qualification with lead triage",
  "pri.2.f.4": "Advanced local SEO with competitor keyword mapping",
  "pri.2.f.5": "Priority support",
  "pri.cta": "Get a free audit",
  "pri.g.title": "What we guarantee",
  "pri.g.1.title": "Delivery in 5 business days",
  "pri.g.1.desc": "Fixed process. If we miss the deadline, your first month is free.",
  "pri.g.2.title": "No technical jargon",
  "pri.g.3.title": "Cancel anytime",
  "pri.g.2.desc": "You approve the result, not a stack of terms you don't need to know.",
  "pri.g.3.desc": "No lock-in contract. The monthly fee covers hosting, updates and support.",
  "pri.g.4.title": "Free local audit",
  "pri.g.4.desc": "We analyze your presence on Google before you pay anything.",

  "exp.eyebrow": "Real expectations",
  "exp.title.1": "We don't promise customers.",
  "exp.title.2": "We deliver lead volume",
  "exp.desc": "Closing depends on your pricing and how you answer the phone. What the structure guarantees is a steady flow of qualified inbound contacts.",
  "exp.1.niche": "Home services",
  "exp.1.sub": "Cleaning, handyman, painting, landscaping",
  "exp.1.metric": "15 to 40",
  "exp.1.unit": "quote requests/month",
  "exp.1.note": "At a 25% close rate that's 4 to 10 new customers a month. One recurring contract pays for the setup in month one.",
  "exp.2.niche": "Food and restaurants",
  "exp.2.sub": "Delivery, digital menu, reservations",
  "exp.2.metric": "100 to 300",
  "exp.2.unit": "“Get directions” clicks/month",
  "exp.2.note": "Plus digital menu views and direct calls coming from Google Maps.",
  "exp.3.niche": "Beauty, health and professional services",
  "exp.3.sub": "Clinics, salons, consultants",
  "exp.3.metric": "10 to 25",
  "exp.3.unit": "booking requests/month",
  "exp.3.note": "Based on an optimized Google Maps profile plus a bilingual site with direct booking.",
  "exp.disclaimer": "Averages observed in cities with strong immigrant markets (Orlando, Boston, Newark). Lead estimates, not closed sales.",
  "exp.g.1.title": "SLA guarantee — 7 business days",
  "exp.g.1.desc": "Site and Google Business Profile live in 7 business days or you get 100% of your money back.",
  "exp.g.2.title": "Performance guarantee — 30 days",
  "exp.g.2.desc": "If you get no new contacts via Google or the site within 30 days of launch, we redo the keyword optimization free of charge until they start coming in.",



  "cta.eyebrow": "Limited offer",
  "cta.title": "Your professional website",
  "cta.was": "$2,500",
  "cta.discount": "-82%",
  "cta.price": "$450",
  "cta.market": "Market value: $2,500 – $5,000",
  "cta.desc": "Full build from scratch or audit and optimization of your current site. No nonsense, fast delivery.",
  "cta.button": "Get my website",
  "cta.foot": "Reply within 24h · No commitment",

  "faq.eyebrow": "Questions",
  "faq.title": "Frequently Asked Questions",
  "faq.1.q": "How long does it take to deliver the site or system?",
  "faq.1.a": "Your site goes live in 5 business days. Larger projects with catalogs and automations are done in up to 10 business days.",
  "faq.2.q": "Do you work with any business segment?",
  "faq.2.a": "Yes. We serve small and mid-sized businesses in any industry that need a functional digital structure — from local shops to service providers.",
  "faq.3.q": "I already have a site. Do you rebuild or optimize?",
  "faq.3.a": "Case by case. If your current site is salvageable we optimize. If not, we rebuild from scratch focused on results.",
  "faq.4.q": "What's included in the diagnosis?",
  "faq.4.a": "Review of the current site, digital presence, support processes and identification of the main bottlenecks. You get an objective plan of what needs to be done.",
  "faq.5.q": "Do you offer support after delivery?",
  "faq.5.a": "Yes. Every project includes a follow-up window after delivery for adjustments and results validation.",
  "faq.6.q": "How much does a professional website cost?",
  "faq.6.a": "Our plans start at $997 (setup) + $79/mo for the Essential Engine, and $1,850 (setup) + $129/mo for the Growth Engine, which adds a catalog, filters and automations. Projects with complex integrations or custom systems get a tailored quote after the diagnosis.",
  "faq.7.q": "Do you work with clients outside the US and Brazil?",
  "faq.7.a": "Yes. We're 100% remote and serve clients in any country. Our main focus is Brazilians in the US, but we deliver in Portuguese and English for any market.",
  "faq.8.q": "How does the payment process work?",
  "faq.8.a": "50% on project approval and 50% on final delivery. We accept Zelle, US bank transfer, Pix (BR) and credit card via secure link.",
  "faq.9.q": "Is the site responsive and mobile-optimized?",
  "faq.9.a": "Every site is built mobile-first, 100% responsive, optimized for Core Web Vitals and ready to rank on Google.",
  "faq.10.q": "Do you handle hosting and domain?",
  "faq.10.a": "Yes. We set up high-performance hosting, domain, SSL, professional emails and the full technical environment. You receive a fully functional site with zero technical hassle.",

  "urg.count": "+15 people",
  "urg.claimed": "already claimed",
  "urg.sub": "their professional website this month",
  "urg.cta": "Get my website",

  "foot.terms": "Terms",
  "foot.privacy": "Privacy",
  "foot.contact": "Contact",
  "foot.rights": "© 2026 Sklyra. All rights reserved.",
  "foot.nav": "Navigation",
  "foot.company": "Company",
  "foot.social": "Social",
  "foot.tagline": "100% digital operation — serving clients across the US",

  "sp.eyebrow": "Compare before you decide",
  "sp.title.1": "Compare your",
  "sp.title.2": "options",
  "sp.desc": "Three ways to solve the same problem. Compare what each one actually delivers.",

  "sp.status.included": "Included",
  "sp.status.notIncluded": "Not included",
  "sp.col.1.name": "Website builder (Wix, Squarespace)",
  "sp.col.1.price": "$20–$50/mo, you build it yourself",
  "sp.col.1.f.1": "Local SEO set up",
  "sp.col.1.f.1.ok": "0",
  "sp.col.1.f.2": "Sales copywriting in English and Portuguese",
  "sp.col.1.f.2.ok": "0",
  "sp.col.1.f.3": "Ongoing support",
  "sp.col.1.f.3.ok": "0",
  "sp.col.1.f.4": "You update and maintain everything yourself",
  "sp.col.1.f.4.ok": "1",

  "sp.col.2.name": "Solo freelancer",
  "sp.col.2.price": "$300–$800, timeline and quality vary",
  "sp.col.2.f.1": "Local SEO set up",
  "sp.col.2.f.1.ok": "0",
  "sp.col.2.f.2": "Sales copywriting in English and Portuguese",
  "sp.col.2.f.2.ok": "0",
  "sp.col.2.f.3": "Ongoing support",
  "sp.col.2.f.3.ok": "0",
  "sp.col.2.f.4": "Every tweak is negotiated separately",
  "sp.col.2.f.4.ok": "1",

  "sp.col.3.name": "Sklyra",
  "sp.col.3.price": "$997 setup, or 2x $550",
  "sp.col.3.f.1": "Local SEO and Google Business Profile included",
  "sp.col.3.f.1.ok": "1",
  "sp.col.3.f.2": "Sales copywriting in English and Portuguese",
  "sp.col.3.f.2.ok": "1",
  "sp.col.3.f.3": "Support and monthly tweaks included",
  "sp.col.3.f.3.ok": "1",
  "sp.col.3.f.4": "Delivered within 5 business days, guaranteed",
  "sp.col.3.f.4.ok": "1",
  "sp.recommended": "Recommended",
  "sp.feature.1": "Local SEO",
  "sp.feature.2": "Bilingual copywriting",
  "sp.feature.3": "Ongoing support",
  "sp.feature.4": "What you're signing up for",

  "hero.eyebrow": "WEB AGENCY FOR BRAZILIANS IN THE US",
  "hero.card.eyebrow": "FREE VIDEO DIAGNOSIS",
  "hero.card.title": "Want to show up on Google and get calls?",
  "hero.card.b1": "Bilingual website (English + Portuguese) live in 5 days",
  "hero.card.b2": "Google Maps profile optimized for local search",
  "hero.card.b3": "Tap-to-call button and leads straight to your phone",
  "hero.card.b4": "$997 setup + $79/mo, no budget surprises",
  "hero.card.cta": "Request free diagnosis",
  "hero.card.note": "Reply within 24h · No commitment",
  "hero.card.already": "Ready to start today?",

  "hero.card.schedule": "Talk now",
  "hero.card.scheduleSub": "15-MIN CONSULT",
  "hero.card.callus": "WhatsApp",
  "hero.card.callusSub": "TALK TO THE TEAM",
  "hero.stats.1": "Bilingual site from day one",
  "hero.stats.2": "local included in every plan",
  "hero.stats.3": "lock-in contract",
  "hero.stats.4": "Live in 5 business days",
};

const dicts: Record<Lang, Dict> = { pt, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LanguageContext = createContext<Ctx>({ lang: "pt", setLang: () => {}, t: (k) => k });

function detectLang(): Lang {
  if (typeof window === "undefined") return "pt";
  const saved = localStorage.getItem("lang") as Lang | null;
  if (saved === "pt" || saved === "en") return saved;
  const candidates: string[] = [];
  if (Array.isArray(navigator.languages)) candidates.push(...navigator.languages);
  if (navigator.language) candidates.push(navigator.language);
  const anyNav = navigator as unknown as { userLanguage?: string };
  if (anyNav.userLanguage) candidates.push(anyNav.userLanguage);
  const hasPt = candidates.some((l) => l?.toLowerCase().startsWith("pt"));
  return hasPt ? "pt" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectLang());

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    localStorage.setItem("lang", lang);
  }, [lang]);

  // Region-by-IP detection (works through VPNs too, since it reads the exit IP's
  // country): only runs when the visitor hasn't manually picked a language yet.
  useEffect(() => {
    if (localStorage.getItem("lang")) return;
    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        if (cancelled) return;
        const country = data?.country_code?.toUpperCase();
        if (!country) return;
        setLangState(country === "BR" ? "pt" : "en");
      })
      .catch(() => {
        // Silently keep the browser-language fallback if geo lookup fails.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const t = (k: string) => dicts[lang][k] ?? dicts.pt[k] ?? k;

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  return useContext(LanguageContext);
}

const FlagBR = () => (
  <svg viewBox="0 0 28 20" className="w-full h-full block" preserveAspectRatio="none" aria-hidden="true">
    <rect width="28" height="20" fill="#009B3A" />
    <path d="M14 3 L25 10 L14 17 L3 10 Z" fill="#FEDF00" />
    <circle cx="14" cy="10" r="3.6" fill="#002776" />
    <path d="M10.6 9.4 Q14 8.2 17.4 9.4" stroke="#fff" strokeWidth="0.5" fill="none" />
  </svg>
);

const FlagUS = () => (
  <svg viewBox="0 0 28 20" className="w-full h-full block" preserveAspectRatio="none" aria-hidden="true">
    <rect width="28" height="20" fill="#fff" />
    {[0, 2, 4, 6, 8, 10, 12].map((y) => (
      <rect key={y} y={y * 1.538} width="28" height="1.538" fill="#B22234" />
    ))}
    <rect width="12" height="10.77" fill="#3C3B6E" />
    <g fill="#fff">
      {Array.from({ length: 9 }).flatMap((_, r) =>
        Array.from({ length: r % 2 === 0 ? 6 : 5 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={1 + c * 2 + (r % 2) * 1} cy={1 + r * 1.15} r="0.4" />
        ))
      )}
    </g>
  </svg>
);

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useT();
  const btn = (target: Lang, label: string, Flag: React.FC) => {
    const active = lang === target;
    return (
      <motion.button
        onClick={() => setLang(target)}
        className="relative flex items-center justify-center w-9 h-[22px] overflow-hidden"
        aria-pressed={active}
        aria-label={`Switch language to ${label}`}
        animate={{
          scale: active ? 1.08 : 1,
          opacity: active ? 1 : 0.45,
        }}
        whileHover={{ scale: active ? 1.12 : 1.06, opacity: 1 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.6 }}
      >
        {active && (
          <motion.span
            layoutId="lang-active-ring"
            className="absolute -inset-[3px] ring-1 ring-primary/70 shadow-[0_0_14px_hsl(var(--primary)/0.45)] pointer-events-none"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        )}
        <motion.span
          className="relative w-full h-full block"
          animate={{ filter: active ? "saturate(1.15)" : "saturate(0.7)" }}
          transition={{ duration: 0.35 }}
        >
          <Flag />
        </motion.span>
        <AnimatePresence>
          {active && (
            <motion.span
              key="sheen"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.button>
    );
  };
  return (
    <div className={`flex items-center gap-2 ${compact ? "" : "ml-2"}`}>
      {btn("pt", "Português", FlagBR)}
      {btn("en", "English", FlagUS)}
    </div>
  );
}
