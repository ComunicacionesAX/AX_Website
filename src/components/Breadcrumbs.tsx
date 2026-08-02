"use client";

import { ChevronLeft } from "lucide-react";
import { useI18n } from "@/i18n/context";

type Props = {
  /** Etiqueta de la página actual. */
  current: string;
};

/**
 * Barra fina de breadcrumb sticky bajo el header fijo. Altura del header:
 * 76px en mobile/tablet, 92px en lg+ — el `top` se ajusta en el mismo
 * breakpoint para mantenerse pegado al header sin gap.
 *
 * Diseño: se mantiene visible durante todo el scroll con fondo navy
 * translúcido y blur. En el tope de la página, encaja con el hero navy
 * detrás (parece transparente). Al hacer scroll, se ve como un panel
 * navy semi-transparente sobre el contenido claro — legible en cualquier
 * contexto sin necesidad de cambiar de color dinámicamente.
 */
export function Breadcrumbs({ current }: Props) {
  const { t } = useI18n();
  return (
    <nav
      aria-label="Breadcrumb"
      className="sticky top-[76px] z-40 border-b border-white/5 bg-navy/70 backdrop-blur-md supports-[backdrop-filter]:bg-navy/60 lg:top-[92px]"
    >
      <div className="container-x">
        <ol className="flex h-11 items-center gap-2 text-sm">
          <li>
            <a
              href="/"
              className="inline-flex items-center gap-1 font-medium text-white/70 transition-colors hover:text-cyan"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              {t.nav.home}
            </a>
          </li>
          <li aria-hidden="true" className="text-white/30">
            /
          </li>
          <li aria-current="page" className="font-medium text-white">
            {current}
          </li>
        </ol>
      </div>
    </nav>
  );
}
