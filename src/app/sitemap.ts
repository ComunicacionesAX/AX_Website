import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/site";

/**
 * Sitemap generado desde `ROUTES` (src/lib/site.ts), que es la fuente única
 * de rutas indexables. Al agregar una página nueva, sumarla ahí.
 *
 * `lastModified` se omite a propósito: poner la fecha del build haría que
 * cambie en cada deploy sin que el contenido cambie, lo que le enseña al
 * crawler a ignorar el campo. Conviene volver a activarlo cuando haya
 * contenido con fecha real de edición (posts del blog).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
