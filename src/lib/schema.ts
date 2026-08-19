// Constructores de JSON-LD (Schema.org). Se consumen desde los `page.tsx`
// vía el componente `<JsonLd>`, que sólo emite el <script> — no renderiza
// nada visible, así que no afecta el diseño.
//
// Criterio: sólo se declara información verificable en el propio sitio. En
// particular NO se incluyen `offers` ni `aggregateRating` en los productos,
// porque no hay precios públicos ni reseñas: inventarlos viola las políticas
// de resultados enriquecidos de Google y puede penalizar el dominio.
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "./site";

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo_ax_completo.svg`,
  description: DEFAULT_DESCRIPTION,
  sameAs: SOCIAL_PROFILES,
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "es",
  publisher: { "@id": ORG_ID },
};

type ProductInput = {
  path: string;
  name: string;
  description: string;
  /** Imagen representativa, relativa a la raíz. */
  image: string;
  /** Precisión declarada en la página (97, 99...). */
  precision: number;
};

export function productSchema({
  path,
  name,
  description,
  image,
  precision,
}: ProductInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}${path}/#product`,
    name,
    description,
    image: `${SITE_URL}${image}`,
    url: `${SITE_URL}${path}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    category: "Precision livestock farming",
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Precisión de medición",
      value: `${precision}%`,
    },
  };
}

/**
 * Breadcrumb de dos niveles (Inicio → página actual), que es exactamente lo
 * que renderiza `<Breadcrumbs>`. Se genera desde el `page.tsx` (servidor)
 * para no tener que convertir ese componente cliente.
 */
export function breadcrumbSchema({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

type VideoInput = {
  name: string;
  description: string;
  /** Video mp4, relativo a la raíz. */
  contentUrl: string;
  /** Poster del video, relativo a la raíz. */
  thumbnailUrl: string;
};

/**
 * `uploadDate` es obligatorio para VideoObject. Se usa una fecha fija en vez
 * de `new Date()` para que el HTML estático no cambie en cada build (un
 * canonical/JSON-LD que muta rompe el cacheo y confunde al crawler).
 */
const VIDEO_UPLOAD_DATE = "2026-01-01";

export function videoSchema({
  name,
  description,
  contentUrl,
  thumbnailUrl,
}: VideoInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    contentUrl: `${SITE_URL}${contentUrl}`,
    thumbnailUrl: `${SITE_URL}${thumbnailUrl}`,
    uploadDate: VIDEO_UPLOAD_DATE,
    publisher: { "@id": ORG_ID },
  };
}
