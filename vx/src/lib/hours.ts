import { OPENING_HOURS, type Weekday } from "@/config/brand";
import { PH } from "@/lib/format";

export const WEEKDAYS: Weekday[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const LABEL: Record<Weekday, string> = {
  Mo: "Seg",
  Tu: "Ter",
  We: "Qua",
  Th: "Qui",
  Fr: "Sex",
  Sa: "Sáb",
  Su: "Dom",
};

const SCHEMA_DAY: Record<Weekday, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

export const hasHours = OPENING_HOURS.length > 0;

/** Linhas legíveis: ["Ter–Sex 10:00–20:00", "Sáb 09:00–18:00"] */
export function hoursLines(): string[] {
  if (!hasHours) return [PH.hours];
  return OPENING_HOURS.map(({ days, opens, closes }) => {
    const d =
      days.length > 2 && isConsecutive(days)
        ? `${LABEL[days[0]]}–${LABEL[days[days.length - 1]]}`
        : days.map((x) => LABEL[x]).join(", ");
    return `${d} ${opens}–${closes}`;
  });
}

function isConsecutive(days: Weekday[]) {
  const order: Weekday[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const idx = days.map((d) => order.indexOf(d));
  return idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
}

/** Janela do dia, ou null se fechado. Sem horário configurado = sempre aberto. */
export function windowFor(date: Date): { opens: string; closes: string } | null {
  if (!hasHours) return null;
  const wd = WEEKDAYS[date.getDay()];
  const spec = OPENING_HOURS.find((s) => s.days.includes(wd));
  return spec ? { opens: spec.opens, closes: spec.closes } : null;
}

export const isClosed = (date: Date) => hasHours && windowFor(date) === null;

export const schemaOpeningHours = () =>
  OPENING_HOURS.map((s) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: s.days.map((d) => `https://schema.org/${SCHEMA_DAY[d]}`),
    opens: s.opens,
    closes: s.closes,
  }));
