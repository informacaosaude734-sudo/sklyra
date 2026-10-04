import Link from "next/link";
import { VXMark } from "@/components/brand/VXMark";

export default function NotFound() {
  return (
    <section className="vx-grid min-h-[80svh] content-center gap-y-10 pt-[var(--nav-h)]">
      <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-2">
        <VXMark className="h-16 w-auto text-vx-white" reflection="dim" gap={10} />
        <h1 className="t-display t-xl mt-10">
          Essa página
          <br />
          não existe.
        </h1>
        <p className="mt-6 max-w-[36ch] text-vx-muted">
          O link pode estar errado ou a página mudou de lugar. Volte para o início ou agende direto.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-primary">
            Voltar ao início
          </Link>
          <Link href="/agendar" className="btn btn-ghost">
            Agendar horário
          </Link>
        </div>
      </div>
    </section>
  );
}
