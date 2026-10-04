import type { Metadata } from "next";
import { CITY, EMAIL, SITE_URL, STATE } from "@/config/brand";
import { PH } from "@/lib/format";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a VX trata os dados de quem visita o site e agenda um horário.",
  alternates: { canonical: `${SITE_URL}/privacidade` },
};

/**
 * Texto-base. REVISAR COM ASSESSORIA JURÍDICA antes de publicar (LGPD).
 */
export default function PrivacidadePage() {
  return (
    <article className="vx-grid pb-24 pt-[calc(var(--nav-h)+3rem)]">
      <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4">
        <h1 className="t-display t-l">Política de privacidade</h1>
        <p className="t-small mt-6 text-vx-muted">
          Texto-base. Revise com sua assessoria jurídica antes de publicar.
        </p>

        <div className="mt-12 space-y-10 text-vx-white/85 [&_h2]:t-display [&_h2]:t-s [&_h2]:mb-3 [&_h2]:text-vx-white">
          <section>
            <h2>O que este site coleta</h2>
            <p>
              O site não tem cadastro nem formulário que envie dados para um servidor da VX. Quando
              você usa o agendamento, as informações escolhidas (serviço, barbeiro, data, horário,
              nome e observação) são montadas em uma mensagem que abre no seu WhatsApp. Nada é
              enviado até você mesmo enviar a mensagem.
            </p>
          </section>
          <section>
            <h2>WhatsApp e serviços de terceiros</h2>
            <p>
              Ao enviar a mensagem, o tratamento dos dados passa a seguir também a política do
              WhatsApp. Links para Instagram e mapas seguem as políticas dessas plataformas.
            </p>
          </section>
          <section>
            <h2>Cookies e métricas</h2>
            <p>
              Este site não usa cookies de publicidade. Se ferramentas de métricas forem adicionadas,
              esta página será atualizada com a lista e a finalidade de cada uma.
            </p>
          </section>
          <section>
            <h2>Seus direitos (LGPD)</h2>
            <p>
              Você pode pedir acesso, correção ou exclusão das conversas e dados de agendamento que a
              VX mantiver, pelo canal de contato abaixo.
            </p>
          </section>
          <section>
            <h2>Contato</h2>
            <p>
              VX Barber — {CITY} — {STATE}
              <br />
              <span className={EMAIL ? "" : "is-ph"}>{EMAIL || "[E-MAIL DE CONTATO]"}</span>
              <br />
              <span className="is-ph">{PH.address}</span>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
