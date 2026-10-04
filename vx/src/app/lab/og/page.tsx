import Image from "next/image";
import { notFound } from "next/navigation";

/** Laboratório (só em desenvolvimento): composição 1200×630 do Open Graph. */
export default function OgLab() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div
      id="og"
      className="fixed left-0 top-0 z-[9999] overflow-hidden bg-vx-black"
      style={{ width: 1200, height: 630 }}
    >
      <Image src="/media/textures/concrete.webp" alt="" fill className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_75%_50%,rgb(241_239_234/0.08),transparent_70%)]" />
      <div className="absolute right-[-40px] top-1/2 h-[700px] w-[700px] -translate-y-1/2">
        <Image src="/media/vx-chrome.webp" alt="" fill className="object-contain" />
      </div>
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-vx-metal/10 via-vx-white/70 to-vx-metal/10" />
      <p className="t-caps absolute left-16 top-14 text-vx-white/80">Rio de Janeiro — Brasil</p>
      <p className="t-display absolute bottom-[calc(50%+18px)] left-16 text-[104px] text-vx-white">Seu corte.</p>
      <p className="t-display absolute left-16 top-[calc(50%+18px)] text-[104px] text-vx-white">Sua presença.</p>
      <p className="absolute bottom-12 left-16 text-[22px] text-vx-white/75">VX — Barbearia no Rio de Janeiro</p>
    </div>
  );
}

export const metadata = { robots: { index: false, follow: false } };
