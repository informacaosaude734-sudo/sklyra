export const SITE_URL = "https://sklyra.com";
export const SITE_NAME = "Sklyra";
export const DEFAULT_OG_IMAGE = "https://sklyra.com/sklyra-logo.png";
export const DEFAULT_DESCRIPTION =
  "Sklyra cria sites, landing pages e automacoes para brasileiros nos Estados Unidos com foco em conversao, SEO local e crescimento previsivel.";

export const toAbsoluteUrl = (path?: string) => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, SITE_URL).toString();
};
