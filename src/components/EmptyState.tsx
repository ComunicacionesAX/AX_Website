"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import { Inbox } from "lucide-react";

type Props = {
  /** Ícono superior — por defecto Inbox. Pasa cualquier Lucide icon. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Título principal, breve y descriptivo. */
  title: string;
  /** Descripción opcional que expande el porqué del estado vacío. */
  description?: string;
  /** Acción primaria — típicamente un CTA para volver al estado normal. */
  action?: ReactNode;
  /** Compact reduce padding y tamaño de ícono — útil dentro de cards. */
  compact?: boolean;
  className?: string;
};

/**
 * Empty state estándar del DS Asimetrix. Uso genérico para "sin
 * resultados", "aún no hay datos", "en construcción", etc.
 *
 * Composición: ícono circular en glass cyan → título → descripción
 * (opcional) → acción (opcional).
 *
 * Ejemplo:
 *   <EmptyState
 *     icon={FileSearch}
 *     title="Aún no hay reportes"
 *     description="Cuando ejecutes el primer análisis, aparecerá aquí."
 *     action={<a href="/reportes/nuevo" className="btn-primary">Nuevo reporte</a>}
 *   />
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  compact = false,
  className = "",
}: Props) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "py-8" : "py-16 sm:py-24"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className={`flex items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-teal ${
          compact ? "h-12 w-12" : "h-16 w-16 sm:h-20 sm:w-20"
        }`}
      >
        <Icon
          className={compact ? "h-5 w-5" : "h-7 w-7 sm:h-9 sm:w-9"}
          strokeWidth={1.75}
        />
      </div>
      <h3
        className={`mt-5 font-display font-bold leading-tight tracking-tight text-navy ${
          compact ? "text-lg" : "text-2xl sm:text-3xl"
        }`}
      >
        {title}
      </h3>
      {description && (
        <p
          className={`mt-3 max-w-md text-pretty text-muted ${
            compact ? "text-sm" : "text-base sm:text-lg"
          }`}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-6 sm:mt-8">{action}</div>}
    </div>
  );
}
