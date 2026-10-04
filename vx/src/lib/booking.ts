import { BARBERS, BOOKING, SERVICES, type Barber, type Service } from "@/config/brand";
import { formatDuration, formatPrice } from "@/lib/format";
import { hasHours, isClosed, windowFor } from "@/lib/hours";
import { whatsappUrl } from "@/lib/whatsapp";

export type BookingDraft = {
  serviceId?: string;
  /** "any" = sem preferência */
  barberId?: string;
  /** yyyy-mm-dd (data local) */
  date?: string;
  /** HH:MM */
  time?: string;
  name?: string;
  note?: string;
};

export const ANY_BARBER = "any";

export type Day = {
  iso: string;
  date: Date;
  weekday: string;
  day: string;
  month: string;
  closed: boolean;
};

const wd = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const mo = new Intl.DateTimeFormat("pt-BR", { month: "short" });
const full = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const pad = (n: number) => String(n).padStart(2, "0");
export const toIso = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromIso = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const clean = (s: string) => s.replace(".", "").replace(/^\w/, (c) => c.toUpperCase());

export function upcomingDays(from = new Date(), count = BOOKING.daysAhead): Day[] {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return {
      iso: toIso(date),
      date,
      weekday: i === 0 ? "Hoje" : i === 1 ? "Amanhã" : clean(wd.format(date)),
      day: pad(date.getDate()),
      month: clean(mo.format(date)),
      closed: isClosed(date),
    };
  });
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

/**
 * Horários sugeridos para o dia. Sem backend, isto é um PEDIDO: a VX confirma
 * pelo WhatsApp. Horários passados de hoje são removidos.
 */
export function slotsFor(iso: string, durationMin: number | null, now = new Date()): string[] {
  const date = fromIso(iso);
  const win = windowFor(date) ?? (hasHours ? null : BOOKING.fallbackWindow);
  if (!win) return [];
  const step = BOOKING.slotIntervalMin;
  const last = toMin(win.closes) - (durationMin ?? step);
  const isToday = toIso(now) === iso;
  const nowMin = now.getHours() * 60 + now.getMinutes() + 30;
  const out: string[] = [];
  for (let t = toMin(win.opens); t <= last; t += step) {
    if (isToday && t < nowMin) continue;
    out.push(toHHMM(t));
  }
  return out;
}

export const serviceById = (id?: string): Service | undefined =>
  SERVICES.find((s) => s.id === id);

export const barberById = (id?: string): Barber | undefined =>
  BARBERS.find((b) => b.id === id);

export const longDate = (iso: string) => clean(full.format(fromIso(iso)));

export function bookingSummary(d: BookingDraft) {
  const service = serviceById(d.serviceId);
  const barber = d.barberId === ANY_BARBER ? undefined : barberById(d.barberId);
  return {
    service: service?.name ?? "—",
    price: service ? formatPrice(service.price) : "—",
    duration: service ? formatDuration(service.durationMin) : "—",
    barber: d.barberId === ANY_BARBER ? "Sem preferência" : (barber?.name ?? "—"),
    date: d.date ? longDate(d.date) : "—",
    time: d.time ?? "—",
  };
}

export function bookingMessage(d: BookingDraft) {
  const s = bookingSummary(d);
  const lines = [
    "Olá, vim pelo site da VX e gostaria de agendar um horário.",
    "",
    `Serviço: ${s.service}`,
    `Barbeiro: ${s.barber}`,
    `Data: ${s.date}`,
    `Horário: ${s.time}`,
  ];
  if (d.name?.trim()) lines.push(`Nome: ${d.name.trim()}`);
  if (d.note?.trim()) lines.push(`Observação: ${d.note.trim()}`);
  return lines.join("\n");
}

export const bookingWhatsappUrl = (d: BookingDraft) => whatsappUrl(bookingMessage(d));
