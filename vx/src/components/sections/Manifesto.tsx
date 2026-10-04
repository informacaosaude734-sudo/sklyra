import { Reveal } from "@/components/motion/Reveal";
import { CITY, FOUNDED_YEAR } from "@/config/brand";
import { PH } from "@/lib/format";

/** "A VX" — posicionamento. Muito espaço negativo, duas frases e uma linha. */
export function Manifesto() {
  return (
    <section id="a-vx" aria-labelledby="manifesto-title" className="vx-section relative">
      <div className="vx-grid gap-y-12">
        <Reveal as="dl" variant="fade" className="manifesto-meta col-span-4 md:col-span-2 lg:col-span-2 lg:pt-3">
          <div>
            <dt className="sr-only">Cidade</dt>
            <dd>{CITY}</dd>
          </div>
          <div>
            <dt className="sr-only">Fundação</dt>
            <dd>
              Est. <span className={FOUNDED_YEAR ? "" : "is-ph"}>{FOUNDED_YEAR ?? PH.year}</span>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Marca</dt>
            <dd>VX Barber</dd>
          </div>
        </Reveal>

        <div className="col-span-4 md:col-span-6 lg:col-span-10">
          <h2 id="manifesto-title" className="t-display t-xl">
            <Reveal as="span" variant="none" className="block">
              <span className="reveal-line" style={{ "--i": 0 } as React.CSSProperties}>
                <span>Não é sobre</span>
              </span>
              <span className="reveal-line" style={{ "--i": 1 } as React.CSSProperties}>
                <span>cortar mais.</span>
              </span>
            </Reveal>
            <Reveal as="span" variant="draw" aria-hidden className="my-[0.28em] block">
              <span className="cut-line block" />
            </Reveal>
            <Reveal as="span" variant="none" className="block md:pl-[25%]">
              <span className="reveal-line" style={{ "--i": 1 } as React.CSSProperties}>
                <span>É sobre</span>
              </span>
              <span className="reveal-line" style={{ "--i": 2 } as React.CSSProperties}>
                <span>cortar certo.</span>
              </span>
            </Reveal>
          </h2>
        </div>

        <Reveal
          variant="fade"
          delay={250}
          className="manifesto-copy col-span-4 md:col-span-5 md:col-start-3 lg:col-span-4 lg:col-start-6"
        >
          <p className="t-lead text-vx-white/85">
            Antes da máquina, a conversa. Formato de rosto, tipo de fio, rotina — e o jeito que você
            arruma o cabelo de manhã.
          </p>
          <p className="mt-5 text-vx-muted">
            O corte sai daí. Feito para funcionar na segunda-feira, no calor, na rua. Não só na foto
            de saída.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
