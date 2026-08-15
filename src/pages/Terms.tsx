import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useT } from "@/i18n";

const Terms = () => {
  const { lang } = useT();
  const isPt = lang === "pt";

  useEffect(() => {
    document.title = isPt
      ? "Termos de Uso — Sklyra"
      : "Terms of Service — Sklyra";
    const desc = isPt
      ? "Termos de uso da Sklyra: regras, responsabilidades e condições para uso dos nossos serviços de desenvolvimento web."
      : "Sklyra Terms of Service: rules, responsibilities and conditions for using our web development services.";
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    window.scrollTo(0, 0);
  }, [isPt]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-40 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {isPt ? "Voltar" : "Back"}
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          {isPt ? "Termos de Uso" : "Terms of Service"}
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          {isPt ? "Última atualização: Janeiro de 2026" : "Last updated: January 2026"}
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          {isPt ? (
            <>
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Aceitação dos Termos</h2>
                <p>
                  Ao acessar e utilizar os serviços da Sklyra ("nós", "nosso"), você concorda em cumprir estes Termos
                  de Uso. Se não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Descrição dos Serviços</h2>
                <p>
                  A Sklyra oferece serviços de desenvolvimento web, criação de sites institucionais e comerciais,
                  automação de atendimento, integração de sistemas e otimização de performance para empresas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Responsabilidades do Cliente</h2>
                <p>
                  O cliente é responsável por fornecer informações precisas, materiais (textos, imagens, logos) com
                  os devidos direitos de uso, e por revisar e aprovar os entregáveis nos prazos combinados.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Pagamentos</h2>
                <p>
                  Os valores, condições e formas de pagamento são acordados individualmente em proposta comercial.
                  Pagamentos são não reembolsáveis após o início do desenvolvimento, exceto quando expressamente
                  previsto em contrato.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Propriedade Intelectual</h2>
                <p>
                  Após o pagamento integral, o cliente detém a propriedade do código-fonte e do design final
                  entregues. A Sklyra mantém direitos sobre bibliotecas próprias, frameworks e metodologias
                  utilizadas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitação de Responsabilidade</h2>
                <p>
                  Nossos serviços são fornecidos "como estão". Não garantimos resultados específicos de vendas,
                  tráfego ou conversão, embora trabalhemos com as melhores práticas do mercado.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Modificações</h2>
                <p>
                  Reservamo-nos o direito de atualizar estes termos a qualquer momento. Alterações significativas
                  serão comunicadas via e-mail ou aviso no site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Contato</h2>
                <p>
                  Dúvidas sobre estes termos podem ser enviadas para{" "}
                  <a href="mailto:equipe@sklyra.com" className="text-primary hover:underline">
                    equipe@sklyra.com
                  </a>
                  .
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Sklyra's services ("we", "us", "our"), you agree to comply with these
                  Terms of Service. If you do not agree, you should not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Services</h2>
                <p>
                  Sklyra provides web development services, business and institutional website creation, customer
                  service automation, systems integration, and performance optimization for businesses.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Client Responsibilities</h2>
                <p>
                  The client is responsible for providing accurate information, materials (text, images, logos)
                  with proper usage rights, and for reviewing and approving deliverables within agreed timelines.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Payments</h2>
                <p>
                  Values, terms and payment methods are agreed individually in a commercial proposal. Payments are
                  non-refundable after development begins, unless expressly provided in the contract.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Intellectual Property</h2>
                <p>
                  After full payment, the client owns the source code and final design delivered. Sklyra retains
                  rights over its own libraries, frameworks and methodologies used.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
                <p>
                  Our services are provided "as is". We do not guarantee specific sales, traffic or conversion
                  results, although we work with industry best practices.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Modifications</h2>
                <p>
                  We reserve the right to update these terms at any time. Significant changes will be communicated
                  via email or notice on the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact</h2>
                <p>
                  Questions about these terms can be sent to{" "}
                  <a href="mailto:equipe@sklyra.com" className="text-primary hover:underline">
                    equipe@sklyra.com
                  </a>
                  .
                </p>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
