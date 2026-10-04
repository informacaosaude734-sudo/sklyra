"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { useScroll } from "@/components/motion/SmoothScroll";
import { IconClose } from "@/components/ui/icons";

// O fluxo (e o Motion) só entra no bundle quando necessário; pré-carrega em idle.
const loadFlow = () => import("./BookingFlow").then((m) => m.BookingFlow);
const BookingFlow = dynamic(loadFlow, {
  ssr: false,
  loading: () => <div className="flex-1" aria-busy="true" />,
});

type OpenOpts = { serviceId?: string; barberId?: string };
type Ctx = { open: (opts?: OpenOpts) => void; close: () => void };

const BookingContext = createContext<Ctx>({ open: () => {}, close: () => {} });
export const useBooking = () => useContext(BookingContext);

/**
 * Agendamento em <dialog> nativo: foco preso, Esc fecha, fundo inerte e o foco
 * volta para o botão que abriu. /agendar renderiza o mesmo fluxo como página.
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { lock, unlock } = useScroll();
  const [session, setSession] = useState<{ key: number; initial: OpenOpts } | null>(null);

  const open = useCallback((opts: OpenOpts = {}) => {
    setSession((s) => ({ key: (s?.key ?? 0) + 1, initial: opts }));
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const preload = () => void loadFlow();
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(preload, 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!session || !d || d.open) return;
    d.showModal();
    lock();
  }, [session, lock]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => {
      unlock();
      // Mantém o conteúdo durante a animação de saída.
      window.setTimeout(() => setSession(null), 380);
    };
    // Clique no backdrop fecha.
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("close", onClose);
    d.addEventListener("click", onClick);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("click", onClick);
    };
  }, [unlock]);

  return (
    <BookingContext.Provider value={{ open, close }}>
      {children}
      <dialog
        ref={dialogRef}
        className="vx-dialog"
        aria-labelledby="booking-title"
      >
        <div className="vx-dialog__panel">
          <header className="flex items-center justify-between gap-4 border-b border-vx-line px-5 py-4 sm:px-8">
            <p id="booking-title" className="t-caps text-vx-white">
              Agendar na VX
            </p>
            <button
              type="button"
              onClick={close}
              className="-mr-2 grid size-11 place-items-center text-vx-white transition-colors duration-[var(--dur-fast)] hover:text-vx-metal"
              aria-label="Fechar agendamento"
            >
              <IconClose className="size-5" />
            </button>
          </header>
          {session ? (
            <BookingFlow key={session.key} initial={session.initial} onDone={close} variant="dialog" />
          ) : null}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}

/**
 * Link de agendamento. Sem JS (ou com Ctrl/⌘-clique) leva a /agendar;
 * com JS abre o painel por cima da página.
 */
export function BookLink({
  serviceId,
  barberId,
  onClick,
  children,
  ...rest
}: OpenOpts & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  const { open } = useBooking();
  const params = new URLSearchParams();
  if (serviceId) params.set("servico", serviceId);
  if (barberId) params.set("barbeiro", barberId);
  const qs = params.toString();
  return (
    <Link
      href={`/agendar${qs ? `?${qs}` : ""}`}
      data-cursor="book"
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        open({ serviceId, barberId });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
