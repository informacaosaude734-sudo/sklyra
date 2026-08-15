import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDemoBySlug } from "@/data/demoSites";
import NotFound from "./NotFound";

import BellaCucina from "./demos/BellaCucina";
import MorettiLaw from "./demos/MorettiLaw";
import MeridianRealty from "./demos/MeridianRealty";
import FabiHairStudio from "./demos/FabiHairStudio";

import BellaSobre from "./demos/bella/Sobre";
import BellaMenu from "./demos/bella/Menu";
import BellaGaleria from "./demos/bella/Galeria";
import BellaContato from "./demos/bella/Contato";

import MorettiFirma from "./demos/moretti/Firma";
import MorettiPraticas from "./demos/moretti/Praticas";
import MorettiCasos from "./demos/moretti/Casos";
import MorettiContato from "./demos/moretti/Contato";

import MeridianSobre from "./demos/meridian/Sobre";
import MeridianListings from "./demos/meridian/Listings";
import MeridianDiario from "./demos/meridian/Diario";
import MeridianContato from "./demos/meridian/Contato";

import FabiSobre from "./demos/fabi/Sobre";
import FabiServicos from "./demos/fabi/Servicos";
import FabiGaleria from "./demos/fabi/Galeria";
import FabiBook from "./demos/fabi/Book";

const HOME_TEMPLATES: Record<string, React.ComponentType<any>> = {
  "bella-cucina": BellaCucina,
  "moretti-law": MorettiLaw,
  "meridian-realty": MeridianRealty,
  "fabi-hair-studio": FabiHairStudio,
};

const PAGE_TEMPLATES: Record<string, Record<string, React.ComponentType<any>>> = {
  "bella-cucina": {
    sobre: BellaSobre,
    menu: BellaMenu,
    galeria: BellaGaleria,
    contato: BellaContato,
  },
  "moretti-law": {
    firma: MorettiFirma,
    praticas: MorettiPraticas,
    casos: MorettiCasos,
    contato: MorettiContato,
  },
  "meridian-realty": {
    sobre: MeridianSobre,
    listings: MeridianListings,
    diario: MeridianDiario,
    contato: MeridianContato,
  },
  "fabi-hair-studio": {
    sobre: FabiSobre,
    servicos: FabiServicos,
    galeria: FabiGaleria,
    book: FabiBook,
  },
};

const DemoSite = () => {
  const { slug, page } = useParams<{ slug: string; page?: string }>();
  const site = slug ? getDemoBySlug(slug) : undefined;

  useEffect(() => {
    if (site) document.title = `${site.brand} — ${site.industry}`;
  }, [site]);

  if (!site) return <NotFound />;

  if (!page) {
    const Template = HOME_TEMPLATES[site.slug];
    if (!Template) return <NotFound />;
    return <Template site={site} />;
  }

  const PageTemplate = PAGE_TEMPLATES[site.slug]?.[page];
  if (!PageTemplate) return <NotFound />;
  return <PageTemplate site={site} />;
};

export default DemoSite;
