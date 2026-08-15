import { useState } from "react";
import { ArrowUpRight, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { site } from "@/content";

const FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "brand", label: "Brand / Company", type: "text", required: false },
  { name: "handle", label: "Instagram / TikTok handle", type: "text", required: false },
] as const;

export function Contact() {
  const [sent, setSent] = useState(false);

  /**
   * No backend wired yet — this opens the visitor's mail client with the
   * inquiry pre-filled. Swap for a real endpoint (Formspree, PHP mailer,
   * your CRM) when you're ready.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [...data.entries()]
      .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `New inquiry — ${data.get("name") || "website"}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow">Contact</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(2.3rem,7vw,5rem)]">
                Tell us where you want <span className="text-brand">to go.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/50">
                Your brand, your goals, and what content is supposed to do for
                the business. We&apos;ll come back with an honest read — even if
                the answer is that you don&apos;t need us yet.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-brand"
                >
                  <Instagram className="size-4" />
                  {site.handle}
                </a>
                {site.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-brand"
                  >
                    <Phone className="size-4" />
                    {p}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className="surface p-7 sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <label
                    key={f.name}
                    className={f.name === "name" || f.name === "email" ? "" : "sm:col-span-2"}
                  >
                    <span className="mb-2 block text-[12px] font-medium tracking-wide text-white/40">
                      {f.label}
                      {f.required && <span className="text-brand"> *</span>}
                    </span>
                    <input
                      name={f.name}
                      type={f.type}
                      required={f.required}
                      className="h-12 w-full rounded-xl border border-white/[0.10] bg-white/[0.02] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-brand/70 focus:bg-white/[0.04]"
                    />
                  </label>
                ))}

                <label className="sm:col-span-2">
                  <span className="mb-2 block text-[12px] font-medium tracking-wide text-white/40">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="What are you building, and what's content supposed to do for it?"
                    className="w-full resize-none rounded-xl border border-white/[0.10] bg-white/[0.02] p-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-brand/70 focus:bg-white/[0.04]"
                  />
                </label>
              </div>

              <Button type="submit" size="lg" className="group mt-8 w-full">
                Submit inquiry
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>

              {sent && (
                <p className="mt-4 text-[13px] font-medium text-brand">
                  Opening your mail app — hit send and we&apos;ll reply within
                  24h.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
