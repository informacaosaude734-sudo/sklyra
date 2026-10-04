import Link from "next/link";
import { IconInstagram, IconOut, IconWhatsapp } from "@/components/ui/icons";
import { ADDRESS, CITY, EMAIL, INSTAGRAM, MAP_URL, PHONE, STATE } from "@/config/brand";
import { FOOTER_LINKS } from "@/data/nav";
import { formatInstagram, formatWhatsapp, PH } from "@/lib/format";
import { hasHours, hoursLines } from "@/lib/hours";
import { hasWhatsapp, whatsappUrl } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER } from "@/config/brand";
import { asset } from "@/lib/base";

export function Footer() {
  const wa = whatsappUrl();
  const year = new Date().getFullYear();

  return (
    <footer id="contato" aria-labelledby="contato-title" className="relative overflow-clip border-t border-vx-line">
      <h2 id="contato-title" className="sr-only">
        Contato
      </h2>

      <div className="vx-grid gap-y-10 pt-16 lg:pt-24">
        <div className="col-span-4 md:col-span-4 lg:col-span-3">
          <h3 className="t-caps text-vx-muted">Endereço</h3>
          <address className="mt-3 not-italic">
            <span className={ADDRESS ? "" : "is-ph"}>{ADDRESS || PH.address}</span>
            <br />
            {CITY} — {STATE}
          </address>
          {MAP_URL && (
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="link-cut is-static t-small mt-3 inline-flex items-center gap-1">
              Abrir no mapa <IconOut className="size-3.5" />
            </a>
          )}
        </div>

        <div className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-5">
          <h3 className="t-caps text-vx-muted">WhatsApp</h3>
          {hasWhatsapp && wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="link-cut is-static t-num mt-3 inline-flex items-center gap-2">
              <IconWhatsapp className="size-4" /> {formatWhatsapp(WHATSAPP_NUMBER)}
            </a>
          ) : (
            <p className="is-ph mt-3">{PH.whatsapp}</p>
          )}
          {PHONE && <p className="t-num mt-2 text-vx-muted">{PHONE}</p>}
          {EMAIL && (
            <a href={`mailto:${EMAIL}`} className="link-cut is-static mt-2 block text-vx-muted">
              {EMAIL}
            </a>
          )}
        </div>

        <div className="col-span-2 md:col-span-2 lg:col-span-2">
          <h3 className="t-caps text-vx-muted">Instagram</h3>
          {INSTAGRAM ? (
            <a
              href={`https://instagram.com/${INSTAGRAM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-cut is-static mt-3 inline-flex items-center gap-2"
            >
              <IconInstagram className="size-4" /> {formatInstagram(INSTAGRAM)}
            </a>
          ) : (
            <p className="is-ph mt-3">{PH.instagram}</p>
          )}
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-10">
          <h3 className="t-caps text-vx-muted">Horário</h3>
          <ul className="t-num mt-3 space-y-1">
            {hoursLines().map((l) => (
              <li key={l} className={hasHours ? "" : "is-ph"}>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="vx-container mt-16 lg:mt-24" aria-hidden>
        <p className="footer-vx select-none">VX</p>
      </div>

      <div className="vx-container border-t border-vx-line pb-28 pt-6 lg:pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Rodapé">
            <ul className="t-small flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/#") ? (
                    <a href={asset(l.href)} className="link-cut text-vx-white/80 hover:text-vx-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="link-cut text-vx-white/80 hover:text-vx-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <p className="t-small text-vx-muted">
            © {year} VX Barber — {CITY} — {STATE}
          </p>
        </div>
      </div>
    </footer>
  );
}
