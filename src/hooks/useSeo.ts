import { useEffect } from "react";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, toAbsoluteUrl } from "@/lib/seo";

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

interface SeoOptions {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  jsonLd?: JsonLd;
  image?: string;
}

/**
 * Client-side SEO manager. Sets title, meta description, canonical and an
 * optional JSON-LD block per route. Rich Results crawlers (Googlebot) execute
 * JS and will read the updated tags. Non-JS social crawlers still fall back
 * to the sitewide index.html defaults.
 */
const absolutizeJsonLd = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(absolutizeJsonLd);
  if (!value || typeof value !== "object") return value;

  const entries = Object.entries(value as Record<string, unknown>).map(([key, nested]) => {
    if ((key === "url" || key === "item" || key === "mainEntityOfPage") && typeof nested === "string") {
      return [key, toAbsoluteUrl(nested)];
    }
    return [key, absolutizeJsonLd(nested)];
  });

  return Object.fromEntries(entries);
};

export function useSeo({ title, description, canonical, ogType = "article", jsonLd, image }: SeoOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    const resolvedDescription = description || DEFAULT_DESCRIPTION;
    const resolvedCanonical = toAbsoluteUrl(canonical);
    const resolvedImage = toAbsoluteUrl(image || DEFAULT_OG_IMAGE);

    const setMeta = (selector: string, attr: "name" | "property", key: string, content?: string) => {
      if (!content) return () => {};
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      const created = !el;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute("content");
      el.setAttribute("content", content);
      return () => {
        if (created) el?.remove();
        else if (prev !== null) el?.setAttribute("content", prev);
      };
    };

    const restoreDesc = setMeta(`meta[name="description"]`, "name", "description", resolvedDescription);
    const restoreOgTitle = setMeta(`meta[property="og:title"]`, "property", "og:title", title);
    const restoreOgDesc = setMeta(`meta[property="og:description"]`, "property", "og:description", resolvedDescription);
    const restoreOgType = setMeta(`meta[property="og:type"]`, "property", "og:type", ogType);
    const restoreOgUrl = setMeta(`meta[property="og:url"]`, "property", "og:url", resolvedCanonical);
    const restoreOgImage = setMeta(`meta[property="og:image"]`, "property", "og:image", resolvedImage);
    const restoreOgSiteName = setMeta(`meta[property="og:site_name"]`, "property", "og:site_name", SITE_NAME);
    const restoreTwitterTitle = setMeta(`meta[name="twitter:title"]`, "name", "twitter:title", title);
    const restoreTwitterDesc = setMeta(`meta[name="twitter:description"]`, "name", "twitter:description", resolvedDescription);
    const restoreTwitterImage = setMeta(`meta[name="twitter:image"]`, "name", "twitter:image", resolvedImage);

    let canonicalEl: HTMLLinkElement | null = null;
    let prevCanonicalHref: string | null = null;
    canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      prevCanonicalHref = canonicalEl.getAttribute("href");
      canonicalEl.setAttribute("href", resolvedCanonical);
    }

    let jsonLdEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      jsonLdEl = document.createElement("script");
      jsonLdEl.type = "application/ld+json";
      jsonLdEl.setAttribute("data-seo-route", "true");
      jsonLdEl.textContent = JSON.stringify(absolutizeJsonLd(jsonLd));
      document.head.appendChild(jsonLdEl);
    }

    return () => {
      document.title = prevTitle;
      restoreDesc();
      restoreOgTitle();
      restoreOgDesc();
      restoreOgType();
      restoreOgUrl();
      restoreOgImage();
      restoreOgSiteName();
      restoreTwitterTitle();
      restoreTwitterDesc();
      restoreTwitterImage();
      if (canonicalEl && prevCanonicalHref !== null) canonicalEl.setAttribute("href", prevCanonicalHref);
      jsonLdEl?.remove();
    };
  }, [title, description, canonical, ogType, jsonLd, image]);
}
