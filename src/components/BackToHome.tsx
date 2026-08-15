import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackToHomeProps {
  className?: string;
}

export default function BackToHome({ className = "" }: BackToHomeProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-primary transition-colors group ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
      Voltar para o início
    </Link>
  );
}
