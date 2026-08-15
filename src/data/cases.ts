export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  location: string;
  summary: string;
  challenge: string;
  solution: string;
  before: { label: string; value: string }[];
  after: { label: string; value: string }[];
  metrics: { label: string; value: string; delta: string }[];
  quote: { text: string; author: string };
  publishedAt: string;
}

export const cases: CaseStudy[] = [
  {
    slug: "marcelo-ribeiro",
    client: "Marcelo Ribeiro",
    industry: "Construção residencial",
    location: "Boston, MA",
    summary: "Empresa de reformas passou de 3 orçamentos/mês para 47 leads qualificados com site + automação de WhatsApp.",
    challenge:
      "Marcelo dependia 100% de indicação. Não tinha site próprio e perdia clientes para concorrentes com presença digital estruturada. Levava até 48h para responder novos contatos.",
    solution:
      "Site institucional focado em conversão local (SEO Boston + arredores), formulário multi-etapa integrado a WhatsApp Business API e sequência automática de nutrição por e-mail.",
    before: [
      { label: "Leads/mês", value: "3" },
      { label: "Tempo de resposta", value: "48h" },
      { label: "Presença Google", value: "Inexistente" },
    ],
    after: [
      { label: "Leads/mês", value: "47" },
      { label: "Tempo de resposta", value: "3min" },
      { label: "Presença Google", value: "Top 3 local" },
    ],
    metrics: [
      { label: "Leads qualificados", value: "47/mês", delta: "+1.466%" },
      { label: "Tempo médio de resposta", value: "3 min", delta: "-99%" },
      { label: "Ticket médio", value: "$8.400", delta: "+38%" },
    ],
    quote: {
      text: "Em 45 dias fechei mais contratos do que no ano inteiro anterior. O site trabalha por mim enquanto durmo.",
      author: "Marcelo Ribeiro, Boston MA",
    },
    publishedAt: "2026-03-14",
  },
  {
    slug: "camila-torres",
    client: "Camila Torres",
    industry: "Estética e beleza",
    location: "Orlando, FL",
    summary: "Estúdio de beleza multiplicou agendamentos em 6x com landing page + booking automatizado.",
    challenge:
      "Camila anotava agendamentos em caderno e perdia clientes por confusão de horários. O Instagram gerava interesse mas não convertia em agenda.",
    solution:
      "Landing page focada em conversão + integração com sistema de booking online + confirmação automática por SMS e WhatsApp 24h antes.",
    before: [
      { label: "Agendamentos/mês", value: "22" },
      { label: "No-show", value: "31%" },
      { label: "Gestão", value: "Caderno" },
    ],
    after: [
      { label: "Agendamentos/mês", value: "138" },
      { label: "No-show", value: "6%" },
      { label: "Gestão", value: "Automática" },
    ],
    metrics: [
      { label: "Agendamentos", value: "138/mês", delta: "+527%" },
      { label: "No-show", value: "6%", delta: "-80%" },
      { label: "Receita mensal", value: "$18.200", delta: "+412%" },
    ],
    quote: {
      text: "Não faço mais nada manual. A Sklyra montou tudo e hoje minha agenda lota sozinha.",
      author: "Camila Torres, Orlando FL",
    },
    publishedAt: "2026-05-02",
  },
  {
    slug: "rafael-mendes",
    client: "Rafael Mendes",
    industry: "Consultoria financeira",
    location: "Newark, NJ",
    summary: "Consultor financeiro estruturou funil digital e passou de $12k/mês para $54k/mês em 90 dias.",
    challenge:
      "Rafael tinha autoridade no Instagram mas nenhum funil. Todo lead entrava manualmente e ele mesmo respondia — não escalava.",
    solution:
      "Site com captura de leads segmentada, automação de e-mails (Brevo) com 7 dias de nutrição e integração com CRM para pipeline automático.",
    before: [
      { label: "Receita/mês", value: "$12k" },
      { label: "Leads/mês", value: "18" },
      { label: "Conversão", value: "8%" },
    ],
    after: [
      { label: "Receita/mês", value: "$54k" },
      { label: "Leads/mês", value: "220" },
      { label: "Conversão", value: "23%" },
    ],
    metrics: [
      { label: "Receita mensal", value: "$54k", delta: "+350%" },
      { label: "Leads/mês", value: "220", delta: "+1.122%" },
      { label: "Conversão", value: "23%", delta: "+188%" },
    ],
    quote: {
      text: "Deixei de operar. Hoje só assino contratos — o sistema faz o resto.",
      author: "Rafael Mendes, Newark NJ",
    },
    publishedAt: "2026-06-10",
  },
];
