import { useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Injects Google Fonts stylesheet once
const injected = new Set<string>();
export const useFonts = (families: string[]) => {
  useEffect(() => {
    families.forEach((fam) => {
      if (injected.has(fam)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${fam}&display=swap`;
      document.head.appendChild(link);
      injected.add(fam);
    });
  }, [families]);
};

export const BackRibbon = ({ tone = "dark" }: { tone?: "dark" | "light" }) => (
  <div className="fixed top-4 left-4 z-[60]">
    <Link
      to="/#portfolio"
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs backdrop-blur-md transition border ${
        tone === "dark"
          ? "bg-black/40 border-white/10 text-white hover:bg-black/60"
          : "bg-white/70 border-black/10 text-black hover:bg-white/90"
      }`}
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      Voltar ao portfólio Sklyra
    </Link>
  </div>
);

export const SklyraCredit = ({ tone = "dark" }: { tone?: "dark" | "light" }) => (
  <div className={`flex items-center gap-2 text-xs ${tone === "dark" ? "text-white/50" : "text-black/50"}`}>
    <span>Site criado por</span>
    <Link
      to="/"
      className={`font-bold transition ${tone === "dark" ? "text-white/80 hover:text-white" : "text-black hover:text-black/70"}`}
    >
      Sklyra ↗
    </Link>
  </div>
);

export const Section = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`px-6 ${className}`}>{children}</section>
);
