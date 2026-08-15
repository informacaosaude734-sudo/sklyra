import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY, isTurnstileEnabled } from "@/config/turnstile";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

interface Props {
  onToken: (token: string) => void;
  onExpire?: () => void;
  action?: string;
}

/**
 * Invisible Cloudflare Turnstile widget.
 * Renders a hidden challenge and returns the token via onToken.
 */
const Turnstile = ({ onToken, onExpire, action }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isTurnstileEnabled() || !containerRef.current) return;

    let cancelled = false;
    const render = () => {
      if (cancelled || !window.turnstile || !containerRef.current) return;
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          size: "flexible",
          appearance: "interaction-only",
          action,
          callback: (token: string) => onToken(token),
          "expired-callback": () => onExpire?.(),
          "error-callback": () => onExpire?.(),
        });
      } catch {}
    };

    // Inject the Turnstile script on-demand (removed from <head> for LCP)
    const ensureScript = () => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src*="challenges.cloudflare.com/turnstile"]'
      );
      if (existing) return;
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    };

    if (window.turnstile) {
      render();
    } else {
      ensureScript();
      const t = setInterval(() => {
        if (window.turnstile) {
          clearInterval(t);
          render();
        }
      }, 200);
      setTimeout(() => clearInterval(t), 10000);
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isTurnstileEnabled()) return null;
  return <div ref={containerRef} className="cf-turnstile" />;
};

export default Turnstile;
