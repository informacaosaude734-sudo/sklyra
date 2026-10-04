import { notFound } from "next/navigation";
import { PosterLab } from "./PosterLab";

/**
 * Laboratório (só em desenvolvimento): renderiza o monograma 3D numa pose
 * fixa, com fundo transparente, para gerar /public/media/vx-chrome.webp.
 */
export default function PosterPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <PosterLab />;
}

export const metadata = { robots: { index: false, follow: false } };
