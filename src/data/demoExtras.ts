// Extended per-site content used by the new internal pages.
// Everything here is optional data (no images beyond the existing hero + CSS/SVG).

export const BELLA_EXTRAS = {
  timeline: [
    { year: "1987", title: "A cozinha da nonna", body: "Alessandro cresce em Trastevere aprendendo a fazer massa com a nonna Rosa. A receita da carbonara nasce ali." },
    { year: "1998", title: "Primeira brigada em Roma", body: "Passa pelo lendário Piperno. Aprende que respeitar o ingrediente é o único caminho." },
    { year: "2007", title: "Travessia para Nova York", body: "Trabalha três anos ao lado de Mario Batali. Descobre que a mesa italiana pode falar em qualquer idioma." },
    { year: "2014", title: "Boston chama", body: "Chega ao North End com um sonho: uma cozinha pequena, produtos honestos, sem atalhos." },
    { year: "2019", title: "Bella Cucina abre as portas", body: "12 mesas. Massa feita à vista. A carta muda toda semana. O bairro adota." },
    { year: "2026", title: "Uma família que cabe à mesa", body: "Três chefs, dois sommeliers, uma nonna consultora. E você — sempre bem-vindo." },
  ],
  menu: [
    {
      category: "Antipasti",
      italian: "Para começar",
      items: [
        { name: "Burrata di Puglia", desc: "Burrata cremosa, tomate San Marzano, manjericão, azeite Frantoia.", price: "18" },
        { name: "Carpaccio di Manzo", desc: "Filé cru, rúcula selvagem, parmigiano 24 meses, limão siciliano.", price: "22" },
        { name: "Vitello Tonnato", desc: "Vitelo rosado, maionese de atum, alcaparras de Pantelleria.", price: "24" },
        { name: "Fritto Misto", desc: "Frutos do mar do dia, farinha 00, limão amalfitano.", price: "26" },
      ],
    },
    {
      category: "Primi",
      italian: "Massas artesanais",
      items: [
        { name: "Cacio e Pepe", desc: "Tonnarelli fresco, pecorino romano DOP, pimenta preta Sarawak.", price: "24" },
        { name: "Carbonara della Nonna", desc: "Guanciale artesanal, gema de galinha caipira, pecorino, pimenta.", price: "26" },
        { name: "Tagliatelle al Tartufo", desc: "Manteiga francesa, trufa negra do Piemonte, parmigiano.", price: "42" },
        { name: "Ravioli di Zucca", desc: "Recheio de abóbora Delica, amaretti, sálvia queimada.", price: "28" },
        { name: "Pappardelle al Cinghiale", desc: "Ragu de javali cozido 8 horas, chianti, alecrim.", price: "34" },
      ],
    },
    {
      category: "Secondi",
      italian: "Pratos principais",
      items: [
        { name: "Bistecca alla Fiorentina", desc: "T-bone dry-aged 40 dias, azeite, sal Maldon, rúcula. 900g para dois.", price: "125" },
        { name: "Branzino al Sale", desc: "Robalo inteiro em crosta de sal marinho, ervas do jardim, limão.", price: "48" },
        { name: "Ossobuco Milanese", desc: "Vitelo braseado 6 horas, gremolata, risoto de açafrão.", price: "44" },
      ],
    },
    {
      category: "Dolci",
      italian: "Sobremesas",
      items: [
        { name: "Tiramisu della Casa", desc: "Mascarpone italiano, café expresso, cacau amaro, marsala.", price: "14" },
        { name: "Panna Cotta ai Frutti", desc: "Baunilha Madagascar, calda de frutas vermelhas do verão.", price: "12" },
        { name: "Cannoli Siciliani", desc: "Massa crocante, ricota fresca, pistache de Bronte, chocolate 70%.", price: "13" },
      ],
    },
  ],
  gallery: [
    { title: "La pasta fatta a mano", cap: "Tagliatelle sendo enrolada às 6h da manhã. Todos os dias. Sem exceção." },
    { title: "Il forno a legna", cap: "Forno napolitano a 480°C. A crosta que só a lenha entrega." },
    { title: "La cantina", cap: "Mais de 400 rótulos italianos escolhidos garrafa por garrafa." },
    { title: "Chef Alessandro", cap: "Provando o molho pomodoro. Ritual sagrado, três vezes ao dia." },
    { title: "L'orto", cap: "Manjericão, sálvia, alecrim — direto do jardim atrás da cozinha." },
    { title: "La famiglia", cap: "Domingo à noite, mesa dos fundos, jantar da brigada. Onde tudo começa." },
  ],
};

export const MORETTI_EXTRAS = {
  partners: [
    { name: "Alessandro Moretti", role: "Managing Partner", bar: "NY, NJ, CA", focus: "M&A · Cross-border", years: "24 anos", education: "Columbia Law · Bocconi", quote: "Bom advogado antecipa. Excelente advogado previne." },
    { name: "Catarina Bellini", role: "Partner", bar: "NY, FL, DC", focus: "Imigração de investidor · EB-5", years: "18 anos", education: "NYU Law · USP", quote: "Cada visto é uma história pessoal antes de ser um caso." },
    { name: "Rafael Serra", role: "Partner", bar: "NY, MA", focus: "Tributário internacional", years: "16 anos", education: "Harvard Law · FGV", quote: "A estrutura fiscal certa vale mais que o melhor investimento." },
    { name: "Julia Andreotti", role: "Partner", bar: "NY, IL", focus: "Litígios comerciais · Arbitragem", years: "14 anos", education: "Yale Law", quote: "Só entramos em julgamento quando já ganhamos no papel." },
  ],
  cases: [
    { num: "MA-2024-0187", jurisdiction: "S.D.N.Y.", industry: "Fintech LatAm", value: "$142M", result: "Aquisição concluída", tag: "M&A" },
    { num: "IMG-2024-0421", jurisdiction: "USCIS", industry: "Family office BR", value: "8 vistos EB-5", result: "Aprovados em 11 meses", tag: "Imigração" },
    { num: "TAX-2023-0912", jurisdiction: "IRS · Receita Federal", industry: "Grupo industrial", value: "$28M economia anual", result: "Estrutura aprovada", tag: "Tributário" },
    { num: "LIT-2023-0654", jurisdiction: "ICC Paris", industry: "Commodities agrícolas", value: "$67M recuperados", result: "Sentença arbitral favorável", tag: "Litígio" },
    { num: "MA-2023-0301", jurisdiction: "Delaware Chancery", industry: "SaaS enterprise", value: "$310M", result: "Venda estratégica", tag: "M&A" },
    { num: "IMG-2022-1122", jurisdiction: "USCIS", industry: "CEO fundador", value: "O-1A aprovado", result: "18 dias", tag: "Imigração" },
  ],
  practiceDetails: [
    { title: "Direito Empresarial & M&A", body: "Estruturamos operações de fusão, aquisição e joint venture com foco em due diligence forense, negociação de earn-outs e proteção pós-fechamento. Nossos deals somam mais de $3B em valor transacionado.", stats: [["$3B+", "transacionado"], ["120+", "deals fechados"], ["11", "jurisdições"]] },
    { title: "Imigração de Investidor", body: "EB-5, E-2, L-1, O-1 e residência por talento extraordinário. Coordenamos processo migratório, estrutura societária, imposto de saída no Brasil e planejamento familiar. 96% de aprovação nos últimos 5 anos.", stats: [["96%", "aprovação"], ["500+", "vistos concedidos"], ["11 meses", "prazo médio EB-5"]] },
    { title: "Tributário Internacional", body: "Otimização fiscal EUA/Brasil, holdings offshore compliant, tratados para evitar bitributação, FATCA/CRS, planejamento sucessório transnacional. Trabalhamos com Big Four sob privilégio advocatício.", stats: [["$120M+", "economia gerada"], ["50+", "estruturas ativas"], ["0", "auditorias perdidas"]] },
    { title: "Litígios & Arbitragem", body: "Representação em disputas contratuais, arbitragem comercial internacional (ICC, LCIA, CAM-CCBC) e execução de sentenças estrangeiras. Preferimos evitar tribunal — mas ganhamos quando é preciso ir.", stats: [["87%", "vitórias/acordos"], ["$450M+", "recuperados"], ["6 câmaras", "arbitrais atuantes"]] },
  ],
};

export const MERIDIAN_EXTRAS = {
  listings: [
    { code: "BRK-401", neighborhood: "Brickell", type: "Penthouse", beds: 4, baths: 5, sqft: 3800, price: "$4.9M", tag: "Estreia" },
    { code: "SUN-118", neighborhood: "Sunny Isles", type: "Oceanfront", beds: 3, baths: 4, sqft: 2900, price: "$3.2M", tag: "Oceanview" },
    { code: "BAL-27", neighborhood: "Bal Harbour", type: "Condo", beds: 3, baths: 3, sqft: 2400, price: "$2.7M", tag: "Investimento" },
    { code: "COC-92", neighborhood: "Coconut Grove", type: "Villa", beds: 5, baths: 6, sqft: 5600, price: "$6.4M", tag: "Off-market" },
    { code: "MID-55", neighborhood: "Midtown Miami", type: "Loft", beds: 2, baths: 2, sqft: 1600, price: "$1.3M", tag: "Aluguel + revenda" },
    { code: "KEY-9", neighborhood: "Key Biscayne", type: "Bayfront", beds: 4, baths: 5, sqft: 4200, price: "$5.1M", tag: "Escritório" },
    { code: "EDG-233", neighborhood: "Edgewater", type: "Condo", beds: 2, baths: 3, sqft: 1800, price: "$1.6M", tag: "Novo" },
    { code: "AVE-77", neighborhood: "Aventura", type: "Family home", beds: 5, baths: 4, sqft: 3600, price: "$2.4M", tag: "Escola" },
  ],
  articles: [
    { title: "Por que Miami virou destino nº1 de brasileiros com patrimônio", tag: "Mercado", read: "8 min", date: "Jun 2026", excerpt: "Análise: fluxo de capital, escolas bilíngues, tributação estadual zero e valorização real acima de 7%.", featured: true },
    { title: "EB-5 em 2026: o que mudou para investidores brasileiros", tag: "Imigração", read: "6 min", date: "Mai 2026", excerpt: "Novas TEAs, cronograma realista e como coordenar com aquisição imobiliária." },
    { title: "Bal Harbour x Sunny Isles: comparativo de 5 anos", tag: "Bairros", read: "5 min", date: "Abr 2026", excerpt: "Cap rate, valorização, perfil de comprador e projeções para 2028." },
    { title: "Aluguel de temporada em Miami: cálculo real de ROI", tag: "Investimento", read: "7 min", date: "Mar 2026", excerpt: "Além do gross yield: taxas, HOA, property tax, gestão e vacância honesta." },
    { title: "LLC, holding ou trust: como estruturar sua compra", tag: "Estrutura", read: "9 min", date: "Fev 2026", excerpt: "Guia prático em parceria com Moretti & Associates — vantagens fiscais e proteção patrimonial." },
  ],
  neighborhoods: [
    { name: "Brickell", label: "Manhattan do sul", stat: "+9,2% a.a." },
    { name: "Bal Harbour", label: "Reserva ultra-luxo", stat: "+6,8% a.a." },
    { name: "Sunny Isles", label: "Oceanfront premium", stat: "+7,4% a.a." },
    { name: "Coconut Grove", label: "Bosque histórico", stat: "+8,1% a.a." },
    { name: "Key Biscayne", label: "Ilha privativa", stat: "+5,9% a.a." },
    { name: "Aventura", label: "Famílias & escolas", stat: "+7,0% a.a." },
  ],
};

export const FABI_EXTRAS = {
  bio: {
    story: [
      "Fabi nasceu em Belo Horizonte e cresceu ouvindo sua mãe dizer que 'cabelo bem cuidado é o primeiro sinal de que uma mulher se ama'. Aos 19 anos, entrou no primeiro salão profissional. Aos 22, já era referência local em coloração.",
      "Em 2015, mudou-se para Los Angeles para se especializar em técnicas de balayage e color correction com mestres da indústria. Foram três anos entre Beverly Hills e West Hollywood — atendendo atrizes, jornalistas e mulheres comuns que carregavam histórias enormes na cadeira.",
      "Em 2020, escolheu Orlando para plantar raízes. Abriu o studio privado com uma promessa simples: um serviço por vez, uma cliente por vez, atenção total.",
    ],
    principles: [
      { title: "Saúde antes de estética", body: "Nenhuma técnica compensa cabelo danificado. Trabalho sempre parte da integridade da fibra." },
      { title: "Consulta é serviço", body: "Antes de qualquer química, sento com você por 20 minutos. É onde tudo começa a dar certo." },
      { title: "Produto que respeita", body: "Uso apenas linhas profissionais sem sulfato agressivo. Se não usaria no meu cabelo, não uso no seu." },
      { title: "Tempo é luxo", body: "Só atendo uma cliente por vez. Sem correria, sem overbook, sem 'só um retoquezinho'." },
    ],
  },
  services: [
    { title: "Signature Balayage", duration: "4h", price: "$280", desc: "Iluminação natural pintada à mão, personalizada para seu tom de pele. Inclui hidratação e finalização." },
    { title: "Color Correction", duration: "5-6h", price: "$450+", desc: "Restauração de coloração comprometida. Diagnóstico prévio obrigatório via WhatsApp." },
    { title: "Keratin Treatment", duration: "3h", price: "$220", desc: "Alisamento sem formol, dura de 4 a 6 meses. Reduz frizz, mantém movimento." },
    { title: "Precision Haircut", duration: "1h30", price: "$95", desc: "Corte estruturado sob medida para seu rosto, textura e rotina." },
    { title: "Grey Blending", duration: "2h30", price: "$180", desc: "Camuflagem natural de fios brancos sem retoque agressivo — resultado suave e crescimento discreto." },
    { title: "Bridal Package", duration: "3h+trial", price: "$550", desc: "Prova + dia. Cabelo desenhado especialmente para o seu vestido, seu véu, sua luz." },
  ],
  gallery: [
    { title: "Warm Balayage", tech: "Balayage · Toner 9NB" },
    { title: "Color Correction", tech: "Remoção + tonalização em 6h" },
    { title: "Copper Dimension", tech: "Foilyage + gloss cobre" },
    { title: "Soft Money Piece", tech: "Face-frame + raiz preservada" },
    { title: "Bridal Waves", tech: "Corte em camadas + escova modelada" },
    { title: "Grey Blending", tech: "Sem retoque agressivo, transição suave" },
    { title: "Textured Bob", tech: "Corte estruturado + gloss" },
    { title: "Bronde Natural", tech: "Balayage com base equilibrada" },
  ],
  bookingSteps: [
    { key: "service", label: "Escolha o serviço" },
    { key: "date", label: "Data & horário" },
    { key: "details", label: "Seus dados" },
  ],
};
