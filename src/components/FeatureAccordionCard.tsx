"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  title: ReactNode;
  body: string;
  open: boolean;
  onToggle: () => void;
  as?: "button" | "div";
  /**
   * Progreso 0..1 del autoplay del card activo. La barra glaciar
   * cyan se llena con este valor, funcionando como indicador visible
   * del tiempo que queda antes de avanzar al siguiente card. Sólo
   * aplica cuando `open=true`; si se omite, el card mantiene la barra
   * fija en 100% cuando está abierto (comportamiento clásico).
   */
  progress?: number;
};

/**
 * Card colapsable usada en la sección "La solución" de las páginas de producto.
 *
 * Microinteracciones:
 * - Altura animada con grid-rows 0fr → 1fr (permite transición smooth sin JS).
 * - Chevron rota 180° al expandir.
 * - Barra cyan crece de scaleX(0) → scaleX(1) con easing spring-like.
 * - Body fade + slide-up cuando aparece.
 * - Hover-lift sutil (translate-y) sólo en estado cerrado.
 */
export function FeatureAccordionCard({
  title,
  body,
  open,
  onToggle,
  as: Tag = "button",
  progress,
}: Props) {
  const controlled = progress !== undefined;
  const fillPct = controlled ? Math.max(0, Math.min(1, progress)) * 100 : open ? 100 : 0;
  return (
    <Tag
      type={Tag === "button" ? "button" : undefined}
      onClick={onToggle}
      aria-expanded={open}
      className={`group relative w-full overflow-hidden rounded-[30px] border p-7 text-left backdrop-blur-xl backdrop-saturate-150 transition-[background-color,color,transform,box-shadow,border-color] duration-300 ease-out sm:p-8 ${
        open
          ? "border-cyan/50 text-white shadow-xl shadow-navy/30"
          : "border-white/60 bg-white/50 text-navy hover:-translate-y-0.5 hover:border-cyan/30 hover:bg-white/70 hover:shadow-md hover:shadow-navy/10"
      }`}
      style={
        open
          ? {
              background:
                "linear-gradient(180deg, rgba(4,9,57,0.85) 0%, rgba(4,9,57,0.75) 100%)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              boxShadow:
                "inset 0 1px 0 0 rgba(151,244,255,0.25), " +
                "inset 0 -1px 0 0 rgba(0,0,0,0.20), " +
                "0 20px 40px -14px rgba(4,9,57,0.4)",
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
          {title}
        </h3>
        <ChevronDown
          aria-hidden="true"
          className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ease-out ${
            open ? "rotate-180 text-cyan" : "rotate-0 text-navy/50"
          }`}
        />
      </div>

      <div
        className={`grid origin-top overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-out ${
          open ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr] pt-0"
        }`}
      >
        <div className="min-h-0 origin-top">
          
          <div
            aria-hidden="true"
            className={`relative h-1.5 w-full max-w-[10rem] overflow-hidden rounded-full transition-opacity duration-500 ${
              controlled
                ? open ? "bg-white/15 opacity-100" : "opacity-0"
                : "bg-transparent"
            }`}
          >
            <div
              className="h-full rounded-full bg-cyan shadow-[0_0_10px_color-mix(in_srgb,var(--color-cyan)_60%,transparent)]"
              style={{
                width: `${fillPct}%`,
                transition: controlled
                  ? "width 80ms linear"
                  : "width 500ms ease-out",
              }}
            />
          </div>
          
          <p
            className={`mt-3 text-base leading-snug transition-[opacity,transform] duration-300 ease-out ${
              open
                ? "translate-y-0 opacity-100 delay-100"
                : "-translate-y-1 opacity-0 delay-0"
            } ${open ? "text-white/90" : "text-navy/70"}`}
          >
            {body}
          </p>
        </div>
      </div>
    </Tag>
  );
}
