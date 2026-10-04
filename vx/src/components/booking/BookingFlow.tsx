"use client";

import { AnimatePresence, m, LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { useEffect, useId, useMemo, useState } from "react";
import { BARBERS, BOOKING, SERVICES } from "@/config/brand";
import {
  ANY_BARBER,
  bookingSummary,
  bookingWhatsappUrl,
  serviceById,
  slotsFor,
  upcomingDays,
  type BookingDraft,
  type Day,
} from "@/lib/booking";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice, PH } from "@/lib/format";
import { hasHours } from "@/lib/hours";
import { hasWhatsapp, whatsappUrl } from "@/lib/whatsapp";
import { IconCheck, IconOut, IconWhatsapp } from "@/components/ui/icons";

type StepId = "service" | "barber" | "date" | "time" | "confirm";

const STEP_COPY: Record<StepId, { label: string; title: string }> = {
  service: { label: "Serviço", title: "O que vai ser hoje?" },
  barber: { label: "Barbeiro", title: "Com quem?" },
  date: { label: "Data", title: "Que dia?" },
  time: { label: "Horário", title: "Que horas?" },
  confirm: { label: "Confirmar", title: "Confere e envia." },
};

const WEEK_HEAD = ["D", "S", "T", "Q", "Q", "S", "S"];

export function BookingFlow({
  initial,
  onDone,
  variant,
}: {
  initial?: { serviceId?: string; barberId?: string };
  onDone?: () => void;
  variant: "dialog" | "page";
}) {
  const steps = useMemo<StepId[]>(
    () => ["service", ...(BARBERS.length ? (["barber"] as const) : []), "date", "time", "confirm"],
    [],
  );

  const [draft, setDraft] = useState<BookingDraft>(() => ({
    serviceId: serviceById(initial?.serviceId)?.id,
    barberId: BARBERS.length ? initial?.barberId : ANY_BARBER,
  }));
  const [index, setIndex] = useState(() => (serviceById(initial?.serviceId) ? 1 : 0));
  const [dir, setDir] = useState(1);
  const [sent, setSent] = useState(false);
  const [nameError, setNameError] = useState(false);
  // Datas dependem do relógio do visitante: calcula só no cliente.
  const [days, setDays] = useState<Day[]>([]);
  useEffect(() => setDays(upcomingDays()), []);

  const step = steps[index];
  const service = serviceById(draft.serviceId);
  const slots = useMemo(
    () => (draft.date ? slotsFor(draft.date, service?.durationMin ?? null) : []),
    [draft.date, service?.durationMin],
  );

  const canNext =
    (step === "service" && !!draft.serviceId) ||
    (step === "barber" && !!draft.barberId) ||
    (step === "date" && !!draft.date) ||
    (step === "time" && !!draft.time) ||
    step === "confirm";

  const go = (to: number) => {
    setDir(to > index ? 1 : -1);
    setIndex(Math.max(0, Math.min(steps.length - 1, to)));
  };

  const set = (patch: Partial<BookingDraft>, advance = false) => {
    setDraft((d) => {
      const next = { ...d, ...patch };
      if ("date" in patch && patch.date !== d.date) next.time = undefined;
      return next;
    });
    if (advance) window.setTimeout(() => go(index + 1), 160);
  };

  const waUrl = bookingWhatsappUrl(draft);
  const quickWa = whatsappUrl();

  const headingId = useId();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className={cn("flex min-h-0 flex-1 flex-col", variant === "page" && "min-h-[70dvh]")}>
          {/* Progresso: segmentos de linha, o atual aceso. */}
          <ol className="flex gap-1.5 px-5 pt-5 sm:px-8" aria-label="Etapas do agendamento">
            {steps.map((s, i) => (
              <li key={s} className="flex-1">
                <button
                  type="button"
                  disabled={i > index}
                  onClick={() => go(i)}
                  className="group block w-full py-2 text-left disabled:cursor-default"
                  aria-current={i === index ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "block h-px w-full transition-colors duration-[var(--dur-ui)]",
                      i < index ? "bg-vx-metal" : i === index ? "bg-vx-white" : "bg-vx-line-strong",
                    )}
                  />
                  <span
                    className={cn(
                      "t-caps mt-2 hidden sm:block",
                      i === index ? "text-vx-white" : "text-vx-muted",
                    )}
                  >
                    {STEP_COPY[s].label}
                  </span>
                  <span className="sr-only sm:hidden">{STEP_COPY[s].label}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-8 sm:px-8" data-lenis-prevent>
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <m.section
                key={sent ? "sent" : step}
                custom={dir}
                initial={{ opacity: 0, y: dir * 14 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, y: dir * -10, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } }}
                aria-labelledby={headingId}
              >
                {sent ? (
                  <Sent onDone={onDone} variant={variant} headingId={headingId} />
                ) : (
                  <>
                    <p className="t-caps text-vx-muted">
                      {index + 1}/{steps.length}
                    </p>
                    <h2 id={headingId} className="t-display t-m mt-3 text-vx-white" tabIndex={-1}>
                      {STEP_COPY[step].title}
                    </h2>

                    <div className="mt-8">
                      {step === "service" && (
                        <Options
                          name="service"
                          value={draft.serviceId}
                          onPick={(v, adv) => set({ serviceId: v }, adv)}
                          options={SERVICES.map((s, i) => ({
                            value: s.id,
                            title: s.name,
                            index: String(i + 1).padStart(2, "0"),
                            meta: [formatPrice(s.price), formatDuration(s.durationMin)],
                          }))}
                        />
                      )}

                      {step === "barber" && (
                        <Options
                          name="barber"
                          value={draft.barberId}
                          onPick={(v, adv) => set({ barberId: v }, adv)}
                          options={[
                            { value: ANY_BARBER, title: "Sem preferência", meta: ["Quem estiver livre"] },
                            ...BARBERS.map((b) => ({
                              value: b.id,
                              title: b.name || PH.barberName,
                              meta: [b.specialty || PH.specialty],
                            })),
                          ]}
                        />
                      )}

                      {step === "date" && (
                        <DatePicker
                          days={days}
                          value={draft.date}
                          onPick={(v, adv) => set({ date: v }, adv)}
                        />
                      )}

                      {step === "time" && (
                        <>
                          {slots.length ? (
                            <fieldset>
                              <legend className="sr-only">Horários disponíveis</legend>
                              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                {slots.map((t) => (
                                  <Chip
                                    key={t}
                                    name="time"
                                    value={t}
                                    checked={draft.time === t}
                                    onPick={(adv) => set({ time: t }, adv)}
                                  >
                                    <span className="t-num text-base font-semibold">{t}</span>
                                  </Chip>
                                ))}
                              </div>
                            </fieldset>
                          ) : (
                            <p className="text-vx-muted">
                              Sem horários neste dia. Volte e escolha outra data.
                            </p>
                          )}
                          {!hasHours && (
                            <p className="t-small mt-6 max-w-[46ch] text-vx-muted">
                              Horários sugeridos. A VX confirma a disponibilidade pelo WhatsApp
                              antes de fechar o horário.
                            </p>
                          )}
                        </>
                      )}

                      {step === "confirm" && (
                        <Confirm
                          draft={draft}
                          setDraft={(p) => {
                            setDraft((d) => ({ ...d, ...p }));
                            if (p.name) setNameError(false);
                          }}
                          nameError={nameError}
                        />
                      )}
                    </div>

                    {step === "service" && quickWa && (
                      <p className="t-small mt-10 text-vx-muted">
                        Prefere conversar antes?{" "}
                        <a href={quickWa} target="_blank" rel="noopener noreferrer" className="link-cut is-static text-vx-white">
                          Chamar no WhatsApp
                        </a>
                      </p>
                    )}
                  </>
                )}
              </m.section>
            </AnimatePresence>
          </div>

          {!sent && (
            <footer className="flex items-center gap-3 border-t border-vx-line px-5 py-4 sm:px-8">
              {index > 0 ? (
                <button type="button" onClick={() => go(index - 1)} className="btn btn-ghost">
                  Voltar
                </button>
              ) : (
                <span />
              )}
              <div className="ml-auto flex items-center gap-3">
                {step !== "confirm" ? (
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    disabled={!canNext}
                    className="btn btn-primary disabled:pointer-events-none disabled:opacity-40"
                  >
                    Continuar
                  </button>
                ) : hasWhatsapp && waUrl ? (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    data-cursor="book"
                    onClick={(e) => {
                      if (!draft.name?.trim()) {
                        e.preventDefault();
                        setNameError(true);
                        document.getElementById("booking-name")?.focus();
                        return;
                      }
                      setSent(true);
                    }}
                  >
                    <IconWhatsapp className="size-4" />
                    Enviar pelo WhatsApp
                  </a>
                ) : (
                  <span className="btn btn-primary pointer-events-none opacity-40" aria-disabled="true">
                    <IconWhatsapp className="size-4" />
                    Enviar pelo WhatsApp
                  </span>
                )}
              </div>
            </footer>
          )}
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

/* ------------------------------------------------------------------ */

type Opt = { value: string; title: string; index?: string; meta?: string[] };

function Options({
  name,
  value,
  options,
  onPick,
}: {
  name: string;
  value?: string;
  options: Opt[];
  onPick: (v: string, advance: boolean) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Escolha uma opção</legend>
      <ul className="border-t border-vx-line">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <li key={o.value} className="border-b border-vx-line">
              <label
                className={cn(
                  "group relative flex cursor-pointer items-baseline gap-4 py-4 transition-colors duration-[var(--dur-fast)]",
                  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-vx-sodium",
                  checked ? "text-vx-white" : "text-vx-white/80 hover:text-vx-white",
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={o.value}
                  checked={checked}
                  onChange={() => onPick(o.value, false)}
                  onClick={(e) => e.detail > 0 && onPick(o.value, true)}
                  className="sr-only"
                />
                {o.index && <span className="t-num t-small w-6 shrink-0 text-vx-muted">{o.index}</span>}
                <span className="t-display t-s flex-1 transition-[font-stretch] duration-[var(--dur-ui)] ease-[var(--ease-vx)] group-hover:[font-stretch:100%]">
                  {o.title}
                </span>
                <span className="t-small t-num hidden shrink-0 text-right text-vx-muted sm:block">
                  {o.meta?.map((m, i) => (
                    <span key={i} className={cn("block", m.startsWith("[") || m.includes("[") ? "is-ph" : "")}>
                      {m}
                    </span>
                  ))}
                </span>
                <span
                  aria-hidden
                  className={cn("lit shrink-0 self-center transition-opacity duration-[var(--dur-fast)]", checked ? "opacity-100" : "opacity-0")}
                />
              </label>
              {o.meta?.length ? (
                <p className="t-small t-num -mt-2 pb-3 pl-10 text-vx-muted sm:hidden">{o.meta.join(" · ")}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

function Chip({
  name,
  value,
  checked,
  disabled,
  onPick,
  children,
  className,
}: {
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onPick: (advance: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "relative flex min-h-12 cursor-pointer select-none flex-col items-center justify-center rounded-[var(--radius-vx)] border px-2 py-2 text-center transition-[border-color,background-color,color] duration-[var(--dur-fast)]",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-vx-sodium",
        checked
          ? "border-vx-sodium bg-vx-sodium/10 text-vx-white"
          : "border-vx-line-strong text-vx-white/85 hover:border-vx-white hover:text-vx-white",
        disabled && "pointer-events-none border-vx-line text-vx-dim line-through",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onPick(false)}
        onClick={(e) => e.detail > 0 && onPick(true)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

function DatePicker({
  days,
  value,
  onPick,
}: {
  days: Day[];
  value?: string;
  onPick: (v: string, advance: boolean) => void;
}) {
  if (!days.length) return <div className="h-64" aria-busy="true" />;
  const lead = days[0].date.getDay();
  const months = Array.from(new Set(days.map((d) => d.month)));
  return (
    <fieldset>
      <legend className="t-small mb-4 text-vx-muted">
        Próximas {Math.ceil((days.length + lead) / 7)} semanas · {months.join(" / ")}
      </legend>
      <div className="grid grid-cols-7 gap-1.5" role="presentation">
        {WEEK_HEAD.map((d, i) => (
          <span key={i} aria-hidden className="t-caps pb-1 text-center text-vx-muted">
            {d}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`e${i}`} aria-hidden />
        ))}
        {days.map((d) => (
          <Chip
            key={d.iso}
            name="date"
            value={d.iso}
            checked={value === d.iso}
            disabled={d.closed}
            onPick={(adv) => onPick(d.iso, adv)}
            className="aspect-square min-h-0 px-0"
          >
            <span className="t-num text-[1.05rem] font-semibold leading-none">{d.day}</span>
            <span className="sr-only">
              {d.weekday}, {d.day} {d.month}
              {d.closed ? " — fechado" : ""}
            </span>
          </Chip>
        ))}
      </div>
    </fieldset>
  );
}

function Confirm({
  draft,
  setDraft,
  nameError,
}: {
  draft: BookingDraft;
  setDraft: (p: Partial<BookingDraft>) => void;
  nameError: boolean;
}) {
  const s = bookingSummary(draft);
  const rows: [string, string][] = [
    ["Serviço", s.service],
    ["Valor", s.price],
    ["Duração", s.duration],
    ["Barbeiro", s.barber],
    ["Data", s.date],
    ["Horário", s.time],
  ];
  return (
    <div className="space-y-8">
      <dl className="border-t border-vx-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-6 border-b border-vx-line py-3">
            <dt className="t-small text-vx-muted">{k}</dt>
            <dd className={cn("t-num text-right font-semibold", v.includes("[") && "is-ph font-normal")}>{v}</dd>
          </div>
        ))}
      </dl>

      <div className="space-y-5">
        <div>
          <label htmlFor="booking-name" className="t-small block text-vx-muted">
            Seu nome
          </label>
          <input
            id="booking-name"
            type="text"
            autoComplete="given-name"
            value={draft.name ?? ""}
            onChange={(e) => setDraft({ name: e.target.value })}
            aria-invalid={nameError || undefined}
            aria-describedby={nameError ? "booking-name-error" : undefined}
            className={cn(
              "mt-2 block h-12 w-full rounded-[var(--radius-vx)] border bg-transparent px-4 text-vx-white outline-none transition-colors duration-[var(--dur-fast)] placeholder:text-vx-dim focus:border-vx-white",
              nameError ? "border-vx-sodium" : "border-vx-line-strong",
            )}
          />
          {nameError && (
            <p id="booking-name-error" className="t-small mt-2 text-vx-sodium">
              Escreva seu nome para a VX identificar o pedido.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="booking-note" className="t-small block text-vx-muted">
            Observação <span className="text-vx-dim">(opcional)</span>
          </label>
          <textarea
            id="booking-note"
            rows={2}
            value={draft.note ?? ""}
            onChange={(e) => setDraft({ note: e.target.value })}
            placeholder="Ex.: quero manter o comprimento em cima"
            className="mt-2 block w-full resize-none rounded-[var(--radius-vx)] border border-vx-line-strong bg-transparent px-4 py-3 text-vx-white outline-none transition-colors duration-[var(--dur-fast)] placeholder:text-vx-dim focus:border-vx-white"
          />
        </div>
      </div>

      <div className="t-small space-y-3 text-vx-muted">
        <p>O pedido abre no seu WhatsApp já preenchido. A VX responde confirmando o horário.</p>
        {!hasWhatsapp && (
          <p className="text-vx-sodium">
            WhatsApp da VX ainda não configurado — defina WHATSAPP_NUMBER em src/config/brand.ts.
          </p>
        )}
        {BOOKING.externalUrl && (
          <p>
            Prefere a agenda online?{" "}
            <a href={BOOKING.externalUrl} target="_blank" rel="noopener noreferrer" className="link-cut is-static inline-flex items-center gap-1 text-vx-white">
              Abrir sistema de agendamento <IconOut className="size-3.5" />
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

function Sent({ onDone, variant, headingId }: { onDone?: () => void; variant: "dialog" | "page"; headingId: string }) {
  return (
    <div className="py-6">
      <span className="grid size-14 place-items-center border border-vx-sodium text-vx-sodium">
        <IconCheck className="size-6" />
      </span>
      <h2 id={headingId} className="t-display t-m mt-8">
        Pedido aberto
        <br />
        no WhatsApp.
      </h2>
      <p className="mt-5 max-w-[40ch] text-vx-muted">
        Agora é só enviar a mensagem. A VX responde confirmando o horário — ou sugerindo o mais próximo.
      </p>
      {variant === "dialog" ? (
        <button type="button" onClick={onDone} className="btn btn-ghost mt-10">
          Voltar ao site
        </button>
      ) : (
        <a href="/" className="btn btn-ghost mt-10">
          Voltar ao site
        </a>
      )}
    </div>
  );
}
