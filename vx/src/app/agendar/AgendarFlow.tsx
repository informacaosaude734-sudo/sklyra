"use client";

import { useSearchParams } from "next/navigation";
import { BookingFlow } from "@/components/booking/BookingFlow";

/** Lê ?servico= e ?barbeiro= no cliente — a página continua estática. */
export function AgendarFlow() {
  const sp = useSearchParams();
  return (
    <BookingFlow
      variant="page"
      initial={{ serviceId: sp.get("servico") ?? undefined, barberId: sp.get("barbeiro") ?? undefined }}
    />
  );
}
