import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, ArrowRight, Check, AlertCircle } from "lucide-react";
import { useT } from "@/i18n";
import { apiFetch } from "@/lib/api";
import { SklyraLogo } from "./SklyraLogo";

interface LeadFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = {
  id: "estagio" | "negocio" | "nome" | "email" | "whatsapp";
  label: string;
  description: string;
  placeholder: string;
  type: string;
  icon: any;
  options?: { value: string; label: string }[];
};

type PhoneCountry = "BR" | "US";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

const detectPhoneCountry = (digits: string): PhoneCountry | null => {
  if (!digits) return null;
  if (/^[2-9]\d{2}$/.test(digits.slice(0, 3)) && digits.length <= 10) return "US";
  if (/^[1-9]\d/.test(digits.slice(0, 2))) return "BR";
  return null;
};

const formatWhatsApp = (value: string) => {
  const digits = getPhoneDigits(value).slice(0, 13);
  const country = detectPhoneCountry(digits);
  const limitedDigits = country === "US" ? digits.slice(0, 10) : digits.slice(0, 11);

  if (country === "US") {
    const area = limitedDigits.slice(0, 3);
    const prefix = limitedDigits.slice(3, 6);
    const line = limitedDigits.slice(6, 10);
    let display = "";

    if (area) display += `(${area}`;
    if (area.length === 3) display += ")";
    if (prefix) display += ` ${prefix}`;
    if (line) display += `-${line}`;

    return { digits: limitedDigits, country, display };
  }

  if (country === "BR") {
    const ddd = limitedDigits.slice(0, 2);
    const first = limitedDigits.slice(2, 7);
    const line = limitedDigits.slice(7, 11);
    let display = "";

    if (ddd) display += `(${ddd}`;
    if (ddd.length === 2) display += ")";
    if (first) display += ` ${first}`;
    if (line) display += `-${line}`;

    return { digits: limitedDigits, country, display: display.trim() };
  }

  return { digits, country, display: digits };
};

const validatePhone = (value: string) => {
  const digits = getPhoneDigits(value);
  const country = detectPhoneCountry(digits);

  if (!digits) return { valid: false, country, error: "", normalized: "" };

  if (country === "US") {
    if (digits.length !== 10) {
      return { valid: false, country, error: "invalid_us_length", normalized: digits };
    }

    if (!/^[2-9]/.test(digits)) {
      return { valid: false, country, error: "invalid_us_start", normalized: digits };
    }

    return { valid: true, country, error: "", normalized: digits };
  }

  if (country === "BR") {
    if (digits.length < 10 || digits.length > 11) {
      return { valid: false, country, error: "invalid_br_length", normalized: digits };
    }

    const ddd = Number(digits.slice(0, 2));
    if (ddd < 11 || ddd > 99) {
      return { valid: false, country, error: "invalid_br_ddd", normalized: digits };
    }

    if (digits.length === 11 && digits[2] !== "9") {
      return { valid: false, country, error: "invalid_br_mobile", normalized: digits };
    }

    return { valid: true, country, error: "", normalized: digits };
  }

  return { valid: false, country, error: "invalid_unknown", normalized: digits };
};

const FlagIcon = ({ country }: { country: PhoneCountry | null }) => {
  if (country === "BR") {
    return (
      <svg viewBox="0 0 28 20" className="h-5 w-7 rounded-[4px] shadow-sm" aria-hidden="true">
        <rect width="28" height="20" rx="3" fill="#229E45" />
        <path d="M14 3L24 10L14 17L4 10L14 3Z" fill="#F7C600" />
        <circle cx="14" cy="10" r="4.2" fill="#1F4AA8" />
        <path d="M10.2 9.3C11.3 8.5 12.7 8.1 14.2 8.1C16.1 8.1 17.8 8.8 19 10" stroke="#fff" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 20" className="h-5 w-7 rounded-[4px] shadow-sm" aria-hidden="true">
      <rect width="28" height="20" rx="3" fill="#fff" />
      <path d="M0 2h28M0 6h28M0 10h28M0 14h28M0 18h28" stroke="#C81D25" strokeWidth="2" />
      <rect width="12" height="10" rx="3" fill="#22408C" />
      <path d="M2.2 2.1h1.2M4.6 2.1h1.2M7 2.1h1.2M9.4 2.1h1.2M3.4 4.1h1.2M5.8 4.1H7M8.2 4.1h1.2M2.2 6.1h1.2M4.6 6.1h1.2M7 6.1h1.2M9.4 6.1h1.2" stroke="#fff" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
};

const buildSteps = (lang: "pt" | "en", estagio: string): Step[] => {
  if (lang === "en") {
    const steps: Step[] = [
      {
        id: "estagio",
        label: "Where are you starting from?",
        description: "This helps us tailor the diagnosis to your current stage.",
        placeholder: "",
        type: "options",
        icon: null,
        options: [
          { value: "tenho_site", label: "I already have a site or Google presence" },
          { value: "so_redes", label: "I only have social media" },
          { value: "do_zero", label: "I'm starting from zero" },
        ],
      },
    ];

    if (estagio === "tenho_site") {
      steps.push({
        id: "negocio",
        label: "What's your business name or site/Google link?",
        description: "So we can pull up what's already there before the diagnosis.",
        placeholder: "Business name or URL",
        type: "text",
        icon: null,
      });
    }

    steps.push(
      { id: "nome", label: "First: your name.", description: "This audit is prepared manually for your business.", placeholder: "Your full name", type: "text", icon: User },
      { id: "email", label: "Where should we send it?", description: "We will use this e-mail to send the diagnosis.", placeholder: "email@example.com", type: "email", icon: Mail },
      { id: "whatsapp", label: "What is your number?", description: "A real person can follow up with you directly.", placeholder: "(XXX) XXX-XXXX", type: "tel", icon: null },
    );

    return steps;
  }

  const steps: Step[] = [
    {
      id: "estagio",
      label: "De onde você está partindo?",
      description: "Isso nos ajuda a adaptar o diagnóstico ao seu momento atual.",
      placeholder: "",
      type: "options",
      icon: null,
      options: [
        { value: "tenho_site", label: "Já tenho site ou presença no Google" },
        { value: "so_redes", label: "Tenho só redes sociais" },
        { value: "do_zero", label: "Estou começando do zero" },
      ],
    },
  ];

  if (estagio === "tenho_site") {
    steps.push({
      id: "negocio",
      label: "Qual o nome do seu negócio ou link do site/Google?",
      description: "Assim já conseguimos ver o que existe antes de fazer o diagnóstico.",
      placeholder: "Nome do negócio ou link",
      type: "text",
      icon: null,
    });
  }

  steps.push(
    { id: "nome", label: "Primeiro: seu nome.", description: "Esse diagnóstico é preparado manualmente para o seu negócio.", placeholder: "Seu nome completo", type: "text", icon: User },
    { id: "email", label: "Pra onde a gente manda?", description: "Vamos usar esse e-mail para enviar o diagnóstico.", placeholder: "email@exemplo.com", type: "email", icon: Mail },
    { id: "whatsapp", label: "E o seu número?", description: "Uma pessoa de verdade pode falar com você depois.", placeholder: "(DD) 00000-0000", type: "tel", icon: null },
  );

  return steps;
};

const LeadFormDialog = ({ open, onOpenChange }: LeadFormDialogProps) => {
  const { lang } = useT();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ estagio: "", negocio: "", nome: "", email: "", whatsapp: "" });
  const steps = useMemo(() => buildSteps(lang, formData.estagio), [lang, formData.estagio]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadCount, setLeadCount] = useState(127);
  const [touchedPhone, setTouchedPhone] = useState(false);

  useEffect(() => {
    if (!open) return;

    setCurrentStep(0);
    setError("");
    setTouchedPhone(false);

    apiFetch<{ count: number }>("/api/leads/count.php")
      .then(({ count }) => setLeadCount((count ?? 0) + 127))
      .catch(() => setLeadCount(127));
  }, [open]);

  // Lock scrolling on <html>, not <body>: body has `overflow-x: hidden` in the
  // global stylesheet, so a body-level lock never reaches the viewport
  // scrollbar. Leaving it there makes the `fixed inset-0` overlay below size to
  // innerWidth (viewport + scrollbar gutter) and spill past the visible area.
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousOverflow;
    };
  }, [open]);

  const currentValue = formData[steps[currentStep]?.id as keyof typeof formData] || "";
  const phoneMeta = formatWhatsApp(formData.whatsapp);

  const getValidationMessage = (showPhoneError: boolean) => {
    if (steps[currentStep]?.id === "email" && formData.email.trim() && !EMAIL_REGEX.test(formData.email.trim())) {
      return lang === "en" ? "Enter a valid e-mail address." : "Digite um e-mail válido.";
    }

    if (steps[currentStep]?.id === "whatsapp" && showPhoneError && formData.whatsapp.trim()) {
      const result = validatePhone(formData.whatsapp);
      if (!result.valid) {
        return lang === "en"
          ? "Enter a valid phone number for Brazil or the United States."
          : "Digite um número válido do Brasil ou dos Estados Unidos.";
      }
    }

    return "";
  };

  const stepError = getValidationMessage(touchedPhone);
  const canProceed = currentValue.trim().length > 0 && !stepError;

  const savePartialLead = async () => {
    if (!formData.nome.trim()) return;

    try {
      await apiFetch("/api/leads/partial.php", {
        method: "POST",
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email || null,
          whatsapp: formData.whatsapp || null,
          step_reached: currentStep + 1,
        }),
      });
    } catch {}
  };

  const handleNext = async () => {
    if (!currentValue.trim()) return;

    if (steps[currentStep]?.id === "whatsapp") {
      setTouchedPhone(true);
    }

    if (stepError) {
      setError(stepError);
      return;
    }

    if (currentStep < steps.length - 1) {
      await savePartialLead();
      setCurrentStep((step) => step + 1);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiFetch("/api/leads/submit.php", {
        method: "POST",
        body: JSON.stringify({
          nome: formData.nome,
          empresa: formData.negocio.trim() || "-",
          email: formData.email.trim(),
          whatsapp: validatePhone(formData.whatsapp).normalized || "N/A",
          whatsappCountry: validatePhone(formData.whatsapp).country || "",
          segmento: formData.estagio || "-",
          score: 10,
          lang,
        }),
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ estagio: "", negocio: "", nome: "", email: "", whatsapp: "" });
        setTouchedPhone(false);
        onOpenChange(false);
      }, 3000);
    } catch {
      setError(lang === "en" ? "Failed to submit. Please try again." : "Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={() => onOpenChange(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            <div className="saas-container relative max-h-[88vh] overflow-y-auto pt-12 px-5 pb-6 md:px-8 md:pb-8">
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <SklyraLogo width={56} height={56} className="h-12 w-12 md:h-14 md:w-14" />
                {!submitted && (
                  <>
                    <h2 className="mt-5 text-xl md:text-2xl font-bold tracking-tight text-foreground leading-tight">
                      {lang === "en" ? "Your competitor is taking the calls." : "Seu concorrente está recebendo as ligações."}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      {leadCount} {lang === "en" ? "businesses already asked for a diagnosis." : "empresas já pediram um diagnóstico."}
                    </p>
                  </>
                )}
              </div>

              {submitted ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-bold mb-2">{lang === "en" ? "All set!" : "Tudo certo!"}</h3>
                  <p className="text-muted-foreground text-sm">
                    {lang === "en" ? "We received your information." : "Recebemos seus dados."}
                  </p>
                </div>
              ) : (
                <div className="relative z-10 mt-6">
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60">
                      <span>{lang === "en" ? `Step ${currentStep + 1} of ${steps.length}` : `Passo ${currentStep + 1} de ${steps.length}`}</span>
                      <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="flex gap-1">
                      {steps.map((_, i) => (
                        <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
                          <div className="h-full rounded-full bg-primary" style={{ width: i <= currentStep ? "100%" : "0%" }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-snug text-foreground">
                        {steps[currentStep].label}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {steps[currentStep].description}
                      </p>
                    </div>

                    {steps[currentStep].id === "estagio" ? (
                      <div className="flex flex-col gap-2.5">
                        {steps[currentStep].options?.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setError("");
                              setFormData((prev) => ({ ...prev, estagio: opt.value }));
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                              formData.estagio === opt.value
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    ) : steps[currentStep].id === "whatsapp" ? (
                      <div className="flex items-center gap-3 border-b border-border/60 py-3 transition-colors focus-within:border-primary">
                        <FlagIcon country={phoneMeta.country} />
                        <input
                          type="tel"
                          inputMode="numeric"
                          value={phoneMeta.display}
                          onChange={(e) => {
                            setError("");
                            const formatted = formatWhatsApp(e.target.value);
                            setFormData((prev) => ({ ...prev, whatsapp: formatted.digits }));
                          }}
                          onBlur={() => setTouchedPhone(true)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              void handleNext();
                            }
                          }}
                          placeholder={steps[currentStep].placeholder}
                          className="w-full bg-transparent border-0 text-foreground text-base placeholder:text-muted-foreground/40 focus:outline-none rounded-none text-left"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <input
                        type={steps[currentStep].type}
                        value={currentValue}
                        onChange={(e) => {
                          setError("");
                          setFormData((prev) => ({ ...prev, [steps[currentStep].id]: e.target.value }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void handleNext();
                          }
                        }}
                        placeholder={steps[currentStep].placeholder}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/60 text-foreground text-base placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors rounded-none text-left"
                        autoFocus
                      />
                    )}

                    {(error || stepError) && (
                      <p className="flex items-center gap-1.5 text-xs text-destructive">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {error || stepError}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => void handleNext()}
                      disabled={loading || !canProceed}
                      className="btn-framer btn-framer--ring w-full !py-3 !text-sm disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {loading ? (
                        lang === "en" ? "Sending..." : "Enviando..."
                      ) : currentStep === steps.length - 1 ? (
                        <>
                          <Check className="w-4 h-4" />
                          {lang === "en" ? "Submit" : "Enviar"}
                        </>
                      ) : (
                        <>
                          {lang === "en" ? "Continue" : "Continuar"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadFormDialog;
