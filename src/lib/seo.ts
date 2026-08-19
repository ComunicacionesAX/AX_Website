import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

type PageMetaInput = {
  /** Ruta absoluta desde la raíz, con slash inicial. Ej: "/pigvision". */
  path: string;
  title: string;
  description: string;
};

// Imagen social compartida, generada por `src/app/opengraph-image.tsx`.
//
// Hay que declararla explícitamente: Next NO mergea `openGraph` campo por
// campo, así que cuando una página exporta su propio bloque `openGraph`,
// reemplaza el del layout — incluida la imagen basada en archivo. Sin esto,
// og:image sólo aparecía en el home (verificado en el HTML servido).
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Asimetrix — Monitoreo inteligente para granjas porcinas y avícolas",
};

/**
 * Construye la metadata de una página con canonical, Open Graph y Twitter
 * Card consistentes, para no repetir la misma estructura en cada `page.tsx`.
 */
export function pageMetadata({
  path,
  title,
  description,
}: PageMetaInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      // Relativa a `metadataBase` (definido en layout.tsx).
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "es_LA",
      url,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
