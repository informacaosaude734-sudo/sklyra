// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Emits public/sitemap.xml with all static routes + dynamic entries pulled
// from local data sources (articles + cases).
//
// NOTE: Insights/cases are shipped as static local data (src/data/*). When we
// migrate content to Supabase, replace the imports below with a Supabase
// fetch — the emit shape stays identical.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { articles } from "../src/data/devtone-articles";
import { cases } from "../src/data/cases";

const BASE_URL = "https://sklyra.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/insights", changefreq: "weekly", priority: "0.8" },
  { path: "/cases", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
];

const articleEntries: SitemapEntry[] = articles.map((a) => ({
  path: `/insights/${a.id}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const caseEntries: SitemapEntry[] = cases.map((c) => ({
  path: `/cases/${c.slug}`,
  lastmod: c.publishedAt,
  changefreq: "monthly",
  priority: "0.7",
}));

const entries = [...staticEntries, ...articleEntries, ...caseEntries];

function generate(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generate(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
