// Configuración canónica del sitio, usada por la metadata SEO (canonical,
// Open Graph, sitemap, robots y JSON-LD).
//
// SITE_URL es el único lugar donde vive el dominio. Si cambia (por ejemplo
// a .com) o para un preview de staging, se sobreescribe por entorno:
//   NEXT_PUBLIC_SITE_URL=https://asimetrix.com
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://asimetrix.co"
).replace(/\/$/, "");

export const SITE_NAME = "Asimetrix";

export const DEFAULT_TITLE =
  "Asimetrix | Monitoreo inteligente para granjas porcinas y avícolas";

export const DEFAULT_DESCRIPTION =
  "Cámaras inteligentes, sensores y herramientas de IA que transforman datos en rentabilidad para granjas porcinas y avícolas.";

// Perfiles sociales oficiales — los mismos que enlaza el Footer.
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/asimetrix_",
  "https://www.linkedin.com/company/asimetrix/",
];

// Rutas indexables del sitio, con su prioridad relativa para el sitemap.
// `/cotizar` va incluida (es una landing de conversión legítima), pero con
// prioridad menor que el home y los productos.
export const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/pigvision", priority: 0.9 },
  { path: "/insylo", priority: 0.9 },
  { path: "/nodos", priority: 0.9 },
  { path: "/poder-del-saber", priority: 0.8 },
  { path: "/cotizar", priority: 0.7 },
] as const;
