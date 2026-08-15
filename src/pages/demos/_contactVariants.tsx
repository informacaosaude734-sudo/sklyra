import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, ArrowRight, Calendar, Clock, Shield, Sparkles,
  Key, Home, Dumbbell, Timer, Scissors, Coffee, Car, Wrench, HardHat,
  FileText, CheckCircle2, Instagram, MessageCircle, Award, ChevronRight,
} from "lucide-react";
import { DemoSite } from "@/data/demoSites";
import { EditorialTheme } from "./_editorial";

export type ContactVariantKey =
  | "dental" | "realty" | "gym" | "salon" | "detail" | "construction";

interface Props {
  variant?: ContactVariantKey;
  site: DemoSite;
  theme: EditorialTheme;
  labels: { services: string; reviews: string; visit: string };
  finalTag?: string;
}

const Eyebrow = ({ theme, children }: any) => (
  <p className="text-[11px] uppercase tracking-[0.4em] mb-3" style={{ color: theme.accent }}>{children}</p>
);
const H2 = ({ theme, children, className = "" }: any) => (
  <h2 style={{ fontFamily: theme.serif }} className={`text-4xl md:text-6xl font-black leading-[1.02] ${className}`}>{children}</h2>
);
const PrimaryCTA = ({ theme, href, children }: any) => (
  <a href={href} target="_blank" rel="noreferrer"
    style={{ background: theme.accent, color: theme.mode === "dark" ? "#000" : "#fff" }}
    className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.2em] hover:opacity-90 transition">
    {children} <ArrowRight className="w-3.5 h-3.5" />
  </a>
);

/* ─────────────── DENTAL ─────────────── */
const DentalContact = ({ site, theme, labels }: Props) => {
  const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
  const insurances = ["Delta Dental", "Aetna", "Cigna", "MetLife", "Guardian", "BlueCross"];
  return (
    <section id="visit" className="max-w-7xl mx-auto py-28 px-6">
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-14">
        <div>
          <Eyebrow theme={theme}>{labels.visit}</Eyebrow>
          <H2 theme={theme} className="mb-6">Escolha o melhor horário<br />para o seu sorriso.</H2>
          <p style={{ color: theme.ink2 }} className="text-lg leading-relaxed max-w-xl mb-10">
            Consulta inicial gratuita de 30 minutos. Avaliação clínica, raio-X panorâmico e plano de tratamento personalizado no mesmo dia.
          </p>

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
              <Calendar className="w-4 h-4" /> Próximos horários — quinta-feira
            </div>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((s, i) => (
                <motion.a key={s} href={`https://wa.me/${site.whatsapp}?text=Quero%20agendar%20${s}`}
                  target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  style={{ borderColor: theme.line }}
                  className="border py-3 text-center text-sm hover:border-current transition"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.line)}>
                  {s}
                </motion.a>
              ))}
            </div>
          </div>

          <PrimaryCTA theme={theme} href={`https://wa.me/${site.whatsapp}`}>Agendar avaliação</PrimaryCTA>

          <div className="mt-12">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: theme.ink2 }}>Convênios aceitos</div>
            <div className="flex flex-wrap gap-2">
              {insurances.map((n) => (
                <span key={n} style={{ borderColor: theme.line }} className="border px-3 py-1.5 text-xs">{n}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: theme.panel }} className="p-10">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-5 h-5" style={{ color: theme.accent }} />
            <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Nossa clínica</span>
          </div>
          <div style={{ fontFamily: theme.serif }} className="text-3xl leading-tight mb-8">{site.address}<br />{site.city}</div>
          <div style={{ background: theme.bg }} className="p-6 mb-6">
            <div className="flex items-center gap-3 mb-3"><Clock className="w-4 h-4" style={{ color: theme.accent }} /><span className="text-[11px] uppercase tracking-[0.25em]">Horários</span></div>
            <div className="text-sm space-y-1" style={{ color: theme.ink2 }}>
              <div className="flex justify-between"><span>Seg – Sex</span><span>8h – 19h</span></div>
              <div className="flex justify-between"><span>Sábado</span><span>9h – 14h</span></div>
              <div className="flex justify-between"><span>Domingo</span><span>Emergências</span></div>
            </div>
          </div>
          <a href={`tel:${site.phone}`} className="flex items-center gap-3 mb-2 hover:opacity-70"><Phone className="w-4 h-4" style={{ color: theme.accent }} />{site.phone}</a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:opacity-70"><Mail className="w-4 h-4" style={{ color: theme.accent }} />{site.email}</a>
        </div>
      </div>
    </section>
  );
};

/* ─────────────── REALTY ─────────────── */
const RealtyContact = ({ site, theme, labels }: Props) => (
  <section id="visit" className="relative py-32 px-6 overflow-hidden" style={{ background: theme.quotePanel ?? "#0a0a0a", color: theme.quoteInk ?? "#f4e4bc" }}>
    <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
    <div className="relative max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <Eyebrow theme={theme}>{labels.visit}</Eyebrow>
        <H2 theme={theme}>Uma visita privada.<br /><em className="italic font-normal" style={{ color: theme.accent }}>Zero pressão.</em></H2>
        <p style={{ color: theme.accent }} className="mt-6 text-xs uppercase tracking-[0.4em]">Concierge disponível 7 dias por semana</p>
      </div>

      <div className="grid md:grid-cols-3 gap-px" style={{ background: theme.accent }}>
        {[
          { icon: Key, title: "Tour privado", desc: "Agendamos a visita exclusiva ao imóvel de sua preferência." },
          { icon: Home, title: "Análise de mercado", desc: "Comparativo com últimos 20 imóveis vendidos na região." },
          { icon: Award, title: "Assessoria completa", desc: "Do financiamento à escritura. Você só precisa dizer sim." },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ background: theme.quotePanel ?? "#0a0a0a" }}
              className="p-10 hover:scale-[1.02] transition-transform">
              <Icon className="w-8 h-8 mb-6" style={{ color: theme.accent }} strokeWidth={1.2} />
              <div style={{ fontFamily: theme.serif }} className="text-3xl mb-3">{s.title}</div>
              <p className="text-sm opacity-70 leading-relaxed">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t" style={{ borderColor: `${theme.accent}30` }}>
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] mb-2 opacity-60">Escritório principal</div>
          <div style={{ fontFamily: theme.serif }} className="text-2xl">{site.address} · {site.city}</div>
          <div className="mt-2 text-sm opacity-70 flex items-center gap-4">
            <a href={`tel:${site.phone}`} className="hover:opacity-100">{site.phone}</a>
            <span>·</span>
            <a href={`mailto:${site.email}`} className="hover:opacity-100">{site.email}</a>
          </div>
        </div>
        <PrimaryCTA theme={theme} href={`https://wa.me/${site.whatsapp}`}>Falar com corretor</PrimaryCTA>
      </div>
    </div>
  </section>
);

/* ─────────────── GYM ─────────────── */
const GymContact = ({ site, theme, labels }: Props) => (
  <section id="visit" className="py-24 px-6" style={{ background: theme.accent, color: theme.mode === "dark" ? "#0a0808" : "#fff" }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-16 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] mb-4 opacity-80">SEM ENROLAÇÃO · {labels.visit}</p>
          <h2 style={{ fontFamily: theme.serif }} className="text-6xl md:text-8xl leading-[0.9] uppercase mb-8">
            Chega de<br />amanhã.<br /><span className="italic">Começa hoje.</span>
          </h2>
          <p className="text-lg max-w-lg opacity-80 mb-10 leading-relaxed">
            Aula experimental grátis. Sem cadastro. Sem cartão. Sem contrato. Você aparece, treina, decide.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
              style={{ background: theme.mode === "dark" ? "#0a0808" : "#000", color: theme.accent }}
              className="inline-flex items-center gap-2 px-10 py-5 text-sm uppercase tracking-[0.25em] font-bold hover:scale-105 transition">
              <Dumbbell className="w-4 h-4" /> Reservar aula grátis
            </a>
            <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 px-10 py-5 text-sm uppercase tracking-[0.25em] border-2 border-current hover:bg-black hover:text-white transition">
              {site.phone}
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: Timer, k: "Segunda a Sexta", v: "05:00 – 23:00" },
            { icon: Timer, k: "Sábado", v: "07:00 – 20:00" },
            { icon: Timer, k: "Domingo", v: "08:00 – 14:00" },
            { icon: MapPin, k: "Onde treinamos", v: `${site.address}, ${site.city}` },
          ].map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div key={r.k}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 border-t-2 border-current pt-4">
                <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                <div className="flex-1 flex justify-between items-baseline gap-4">
                  <span className="text-xs uppercase tracking-[0.2em] opacity-80">{r.k}</span>
                  <span style={{ fontFamily: theme.serif }} className="text-xl md:text-2xl text-right">{r.v}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────── SALON ─────────────── */
const SalonContact = ({ site, theme, labels }: Props) => {
  const stylists = [
    { name: "Isabela M.", spec: "Coloração & mechas", years: "12 anos" },
    { name: "Camila R.", spec: "Cortes & acabamento", years: "8 anos" },
    { name: "Larissa P.", spec: "Tratamentos capilares", years: "10 anos" },
  ];
  return (
    <section id="visit" className="max-w-7xl mx-auto py-28 px-6">
      <div className="text-center mb-16">
        <Eyebrow theme={theme}>{labels.visit}</Eyebrow>
        <H2 theme={theme}>Escolha sua cadeira.<br /><em className="italic font-normal" style={{ color: theme.accent }}>Nós cuidamos do resto.</em></H2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {stylists.map((s, i) => (
          <motion.a key={s.name}
            href={`https://wa.me/${site.whatsapp}?text=Quero%20agendar%20com%20${s.name}`}
            target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ background: theme.panel }}
            className="p-8 group relative overflow-hidden">
            <div className="absolute top-6 right-6 flex items-center gap-1 text-[10px] uppercase tracking-[0.25em]" style={{ color: theme.accent }}>
              <Sparkles className="w-3 h-3" /> Disponível
            </div>
            <Scissors className="w-6 h-6 mb-8" style={{ color: theme.accent }} strokeWidth={1.2} />
            <div style={{ fontFamily: theme.serif }} className="text-4xl mb-1">{s.name}</div>
            <div className="text-[11px] uppercase tracking-[0.25em] mb-6" style={{ color: theme.ink2 }}>{s.years} de estúdio</div>
            <div className="text-lg italic" style={{ fontFamily: theme.serif }}>{s.spec}</div>
            <div className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] group-hover:gap-4 transition-all" style={{ color: theme.accent }}>
              Agendar com {s.name.split(" ")[0]} <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 pt-10 border-t" style={{ borderColor: theme.line }}>
        <div>
          <Coffee className="w-5 h-5 mb-3" style={{ color: theme.accent }} />
          <div className="text-[11px] uppercase tracking-[0.25em] mb-2" style={{ color: theme.ink2 }}>Bem-vinda</div>
          <p style={{ fontFamily: theme.serif }} className="text-xl leading-snug">Café, prosecco e revistas enquanto sua cor processa.</p>
        </div>
        <div>
          <MapPin className="w-5 h-5 mb-3" style={{ color: theme.accent }} />
          <div className="text-[11px] uppercase tracking-[0.25em] mb-2" style={{ color: theme.ink2 }}>Endereço</div>
          <p style={{ fontFamily: theme.serif }} className="text-xl leading-snug">{site.address}<br />{site.city}</p>
        </div>
        <div>
          <Clock className="w-5 h-5 mb-3" style={{ color: theme.accent }} />
          <div className="text-[11px] uppercase tracking-[0.25em] mb-2" style={{ color: theme.ink2 }}>Atendimento</div>
          <p style={{ fontFamily: theme.serif }} className="text-xl leading-snug">Ter – Sáb · 10h – 20h<br />Domingo · sob agendamento</p>
        </div>
      </div>

      <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <a href={`https://instagram.com/`} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 text-sm hover:opacity-70"><Instagram className="w-4 h-4" style={{ color: theme.accent }} /> @veluxe.studio</a>
        <PrimaryCTA theme={theme} href={`https://wa.me/${site.whatsapp}`}>Agendar horário</PrimaryCTA>
      </div>
    </section>
  );
};

/* ─────────────── DETAIL (auto) ─────────────── */
const DetailContact = ({ site, theme, labels }: Props) => (
  <section id="visit" className="py-28 px-6" style={{ background: theme.panel }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <Eyebrow theme={theme}>{labels.visit}</Eyebrow>
          <H2 theme={theme} className="mb-8">Deixe seu carro.<br />Buscamos, entregamos.</H2>
          <p style={{ color: theme.ink2 }} className="text-lg leading-relaxed mb-10 max-w-lg">
            Coleta e devolução gratuita em toda área metropolitana. Ou traga direto ao nosso studio — café espresso por conta da casa enquanto seu carro brilha.
          </p>

          <div className="space-y-6 mb-10">
            {[
              { icon: Car, t: "Coleta em casa", d: "Agendamos no seu horário. Você não sai do lugar." },
              { icon: Wrench, t: "Studio flagship", d: `${site.address}, ${site.city}` },
              { icon: Clock, t: "Turnaround", d: "Standard: 4h · Full detail: 8h · Correção: 1 – 2 dias" },
            ].map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div key={r.t}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-5">
                  <Icon className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: theme.accent }} strokeWidth={1.5} />
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] mb-1" style={{ color: theme.accent }}>{r.t}</div>
                    <div className="text-lg" style={{ fontFamily: theme.serif }}>{r.d}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <PrimaryCTA theme={theme} href={`https://wa.me/${site.whatsapp}`}>Agendar coleta</PrimaryCTA>
            <a href={`tel:${site.phone}`} style={{ borderColor: theme.ink }}
              className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.2em] border hover:opacity-80 transition">
              <Phone className="w-3.5 h-3.5" /> {site.phone}
            </a>
          </div>
        </div>

        <div style={{ background: theme.bg, borderColor: theme.line }} className="border p-10">
          <div className="flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
            <FileText className="w-3.5 h-3.5" /> Solicitar orçamento
          </div>
          <div style={{ fontFamily: theme.serif }} className="text-2xl leading-snug mb-8">
            Diga o modelo do carro e o resultado que você quer. Respondemos em até 20 minutos, com orçamento fixo.
          </div>
          <form className="space-y-4">
            <input placeholder="Modelo & ano (ex: BMW M3 2022)" style={{ borderColor: theme.line, background: "transparent", color: theme.ink }} className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-current" />
            <input placeholder="WhatsApp" style={{ borderColor: theme.line, background: "transparent", color: theme.ink }} className="w-full border px-4 py-3 text-sm focus:outline-none" />
            <textarea placeholder="O que você quer resolver?" rows={3} style={{ borderColor: theme.line, background: "transparent", color: theme.ink }} className="w-full border px-4 py-3 text-sm focus:outline-none resize-none" />
            <button type="button" onClick={() => window.open(`https://wa.me/${site.whatsapp}`, "_blank")}
              style={{ background: theme.accent, color: "#fff" }}
              className="w-full py-4 text-xs uppercase tracking-[0.3em] hover:opacity-90 transition inline-flex items-center justify-center gap-2">
              Enviar via WhatsApp <MessageCircle className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────── CONSTRUCTION ─────────────── */
const ConstructionContact = ({ site, theme, labels }: Props) => {
  const projectTypes = ["Residencial novo", "Reforma completa", "Ampliação", "Comercial", "Área externa", "Consultoria"];
  return (
    <section id="visit" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <Eyebrow theme={theme}>{labels.visit}</Eyebrow>
            <H2 theme={theme} className="mb-8">Do rascunho no guardanapo<br />à chave na sua mão.</H2>
            <p style={{ color: theme.ink2 }} className="text-lg leading-relaxed mb-10">
              Uma visita técnica na sua obra ou terreno, sem custo. Levantamos escopo, prazo e faixa de investimento antes de qualquer contrato.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: HardHat, k: "Visita técnica", v: "Grátis · 60 min" },
                { icon: FileText, k: "Orçamento fechado", v: "Em até 5 dias úteis" },
                { icon: Shield, k: "Garantia", v: "5 anos estrutural" },
                { icon: MapPin, k: "Área de atuação", v: `${site.city} + 80km` },
              ].map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div key={r.k}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    style={{ borderColor: theme.line }}
                    className="flex items-center gap-4 py-3 border-b">
                    <Icon className="w-4 h-4" style={{ color: theme.accent }} />
                    <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: theme.ink2 }}>{r.k}</span>
                    <span className="flex-1 text-right" style={{ fontFamily: theme.serif }}>{r.v}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div style={{ background: theme.panel }} className="p-10">
            <div className="flex items-center gap-2 mb-8 text-[11px] uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
              <FileText className="w-3.5 h-3.5" /> Solicitar visita técnica
            </div>

            <div className="mb-8">
              <div className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: theme.ink2 }}>Tipo de projeto</div>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((t) => (
                  <span key={t} style={{ borderColor: theme.line }}
                    className="border px-3 py-1.5 text-xs cursor-pointer hover:border-current transition"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.line)}>
                    <CheckCircle2 className="w-3 h-3 inline mr-1.5 opacity-40" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
                style={{ background: theme.accent, color: "#fff" }}
                className="w-full flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-[0.3em] hover:opacity-90 transition">
                Marcar visita técnica <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="grid grid-cols-2 gap-4 pt-4" style={{ borderColor: theme.line }}>
                <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-sm hover:opacity-70">
                  <Phone className="w-4 h-4" style={{ color: theme.accent }} /> {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm hover:opacity-70">
                  <Mail className="w-4 h-4" style={{ color: theme.accent }} /> {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────── DEFAULT (fallback) ─────────────── */
const DefaultContact = ({ site, theme, labels }: Props) => (
  <section id="visit" className="max-w-3xl mx-auto py-24 px-6 text-center">
    <Eyebrow theme={theme}>{labels.visit}</Eyebrow>
    <H2 theme={theme} className="mb-10">Fale conosco</H2>
    <div className="grid sm:grid-cols-2 gap-4 text-lg text-left">
      <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:opacity-70"><Phone className="w-5 h-5" style={{ color: theme.accent }} /> {site.phone}</a>
      <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:opacity-70"><Mail className="w-5 h-5" style={{ color: theme.accent }} /> {site.email}</a>
      <div className="flex items-center gap-3 sm:col-span-2"><MapPin className="w-5 h-5" style={{ color: theme.accent }} /> {site.address}, {site.city}</div>
    </div>
    <div className="mt-12"><PrimaryCTA theme={theme} href={`https://wa.me/${site.whatsapp}`}>{site.ctaLabel}</PrimaryCTA></div>
  </section>
);

const MAP: Record<ContactVariantKey, React.FC<Props>> = {
  dental: DentalContact,
  realty: RealtyContact,
  gym: GymContact,
  salon: SalonContact,
  detail: DetailContact,
  construction: ConstructionContact,
};

const ContactVariant = (props: Props) => {
  const Cmp = props.variant ? MAP[props.variant] : DefaultContact;
  return <Cmp {...props} />;
};

export default ContactVariant;
