import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { VXMark } from "@/components/brand/VXMark";
import { CITY, STATE } from "@/config/brand";

export const metadata: Metadata = {
  title: "Agendar horário",
  description:
    "Agende seu corte, barba ou acabamento na VX, barbearia no Rio de Janeiro. Escolha serviço, barbeiro, dia e horário e confirme pelo WhatsApp.",
  alternates: { canonical: "/agendar" },
};

export default async function AgendarPage(props: PageProps<"/agendar">) {
  const sp = await props.searchParams;
  const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  return (
    <section className="relative min-h-[100svh] pt-[calc(var(--nav-h)+2rem)]">
      <div className="vx-grid gap-y-12 pb-20">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <VXMark className="h-14 w-auto text-vx-white" reflection="metal" />
          <h1 className="t-display t-xl mt-10">
            Agendar
            <br />
            na VX.
          </h1>
          <p className="t-lead mt-8 max-w-[32ch] text-vx-white/80">
            Serviço, barbeiro, dia e horário. O pedido sai pronto no seu WhatsApp e a VX confirma.
          </p>
          <p className="t-caps mt-10 text-vx-muted">
            {CITY} — {STATE}
          </p>
        </div>
        <div className="col-span-4 flex min-h-[38rem] flex-col border border-vx-line bg-vx-surface md:col-span-8 lg:col-span-6 lg:col-start-7">
          <BookingFlow
            variant="page"
            initial={{ serviceId: pick(sp.servico), barberId: pick(sp.barbeiro) }}
          />
        </div>
      </div>
    </section>
  );
}
