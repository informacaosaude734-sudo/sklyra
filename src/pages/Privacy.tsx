import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useT } from "@/i18n";

const Privacy = () => {
  const { lang } = useT();
  const isPt = lang === "pt";

  useEffect(() => {
    document.title = isPt
      ? "Política de Privacidade — Sklyra"
      : "Privacy Policy — Sklyra";
    const desc = isPt
      ? "Como a Sklyra coleta, usa e protege seus dados pessoais em conformidade com LGPD e boas práticas de segurança."
      : "How Sklyra collects, uses and protects your personal data in compliance with GDPR and security best practices.";
    const meta = document.querySelector('meta[name="description"]');
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
          {isPt ? "Política de Privacidade" : "Privacy Policy"}
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          {isPt ? "Última atualização: Janeiro de 2026" : "Last updated: January 2026"}
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          {isPt ? (
            <>
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Dados que Coletamos</h2>
                <p>
                  Coletamos nome, e-mail, WhatsApp e informações que você fornece voluntariamente em formulários e no
                  chat. Também registramos dados técnicos de navegação (IP, dispositivo, páginas visitadas) para
                  fins analíticos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Como Usamos seus Dados</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Responder solicitações e enviar propostas comerciais</li>
                  <li>Executar contratos e prestar os serviços contratados</li>
                  <li>Enviar comunicações relevantes sobre o projeto ou novidades</li>
                  <li>Melhorar nossa plataforma e experiência do usuário</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Base Legal (LGPD)</h2>
                <p>
                  Tratamos seus dados com base no consentimento fornecido ao preencher formulários, na execução de
                  contratos e em nosso legítimo interesse comercial, sempre respeitando seus direitos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Compartilhamento</h2>
                <p>
                  Não vendemos seus dados. Compartilhamos apenas com provedores essenciais (Supabase para banco de
                  dados, Brevo para envio de e-mails, Meta para WhatsApp Business API), sempre sob acordos de
                  confidencialidade.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Segurança</h2>
                <p>
                  Utilizamos criptografia TLS/HTTPS, autenticação segura e Row-Level Security no banco de dados.
                  Senhas nunca são armazenadas em texto puro e verificamos vazamentos conhecidos (HIBP).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Seus Direitos</h2>
                <p>
                  Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados a qualquer momento
                  enviando um e-mail para{" "}
                  <a href="mailto:equipe@sklyra.com" className="text-primary hover:underline">
                    equipe@sklyra.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies</h2>
                <p>
                  Usamos cookies essenciais para funcionamento do site e cookies analíticos para entender o uso.
                  Você pode gerenciar cookies nas configurações do seu navegador.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Retenção</h2>
                <p>
                  Mantemos seus dados enquanto durar o relacionamento comercial ou até que solicite exclusão,
                  respeitando obrigações legais de retenção.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Data We Collect</h2>
                <p>
                  We collect name, email, WhatsApp and information you voluntarily provide in forms and chat. We
                  also log technical browsing data (IP, device, pages visited) for analytics purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Data</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Respond to requests and send commercial proposals</li>
                  <li>Execute contracts and deliver contracted services</li>
                  <li>Send relevant project updates or news</li>
                  <li>Improve our platform and user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Legal Basis</h2>
                <p>
                  We process your data based on the consent provided when filling forms, contract execution and
                  our legitimate business interest, always respecting your rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Sharing</h2>
                <p>
                  We do not sell your data. We share only with essential providers (Supabase for database, Brevo for
                  email delivery, Meta for WhatsApp Business API), always under confidentiality agreements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Security</h2>
                <p>
                  We use TLS/HTTPS encryption, secure authentication and Row-Level Security on the database.
                  Passwords are never stored in plain text and we check for known breaches (HIBP).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
                <p>
                  You can request access, correction, deletion or portability of your data at any time by emailing{" "}
                  <a href="mailto:equipe@sklyra.com" className="text-primary hover:underline">
                    equipe@sklyra.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies</h2>
                <p>
                  We use essential cookies for site functionality and analytics cookies to understand usage. You
                  can manage cookies in your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Retention</h2>
                <p>
                  We keep your data for the duration of the business relationship or until you request deletion,
                  respecting legal retention obligations.
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

export default Privacy;
