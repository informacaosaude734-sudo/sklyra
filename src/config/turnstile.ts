// Cloudflare Turnstile Site Key (public — safe to commit).
// Paste your Site Key here after creating the widget in the Cloudflare dashboard.
// Leave empty to disable Turnstile (dev mode).
export const TURNSTILE_SITE_KEY = "0x4AAAAAAD0BmLaWA2jJ_0XK";

export const isTurnstileEnabled = () => TURNSTILE_SITE_KEY.length > 0;
