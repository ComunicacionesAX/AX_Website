"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/i18n/context";
import { DEMO_BOOKING_URL } from "@/lib/links";
import { PrecisionBadge } from "@/components/PrecisionBadge";
import { useCanPlayVideo } from "@/hooks/useCanPlayVideo";

type Props = {
  /** Título principal (H1) — puede ser una o dos líneas (ReactNode). */
  title: ReactNode;
  /** Subtitle grande (subhead scale). */
  subtitle: string;
  /**
   * Línea auxiliar bajo el subtitle (rango, tagline). Opcional para
   * páginas que no la necesitan.
   */
  extraLine?: string;
  /** Valor de precisión mostrado en el badge (97, 99...). */
  precision: number;
  /** Poster estático (mobile) y fallback si el video no carga. */
  poster: string;
  /** URL del video autoplay/loop en desktop. */
  videoSrc: string;
};

/**
 * Hero compartido de las páginas de producto. Encapsula:
 *   - Fondo video autoplay/loop en desktop + poster estático en mobile.
 *   - Overlays navy para contraste.
 *   - Título H1 en `text-hero` (token DS clamp 2.5rem→10.9rem).
 *   - Subtitle en subhead + extraLine opcional.
 *   - PrecisionBadge flotante abajo-derecha en desktop.
 *   - CTA "Agendar demostración" al final.
 *
 * Reemplaza las ~90 líneas de hero duplicadas entre PigVisionPage,
 * InsyloPage y NodosPage. Cada página lo consume pasando su título,
 * subtitle, video y precisión.
 */
export function ProductHero({
  title,
  subtitle,
  extraLine,
  precision,
  poster,
  videoSrc,
}: Props) {
  const { t } = useI18n();
  const c = t.common;
  const canPlayVideo = useCanPlayVideo();

  return (
    <section className="on-dark relative overflow-hidden rounded-b-3xl bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {canPlayVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            // Ver nota en Hero.tsx: evita bajar el mp4 completo antes de que
            // `useCanPlayVideo` decida si corresponde reproducirlo.
            preload="metadata"
            poster={poster}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-navy/60" />
      </div>

      <div className="container-x relative flex min-h-[100vh] flex-col items-center justify-center pb-28 pt-36 text-center lg:items-start lg:text-left">
        <div className="order-1 max-w-5xl animate-fade-up lg:order-none">
          {/* El subtitle va DENTRO del h1: el nombre de producto solo
              ("PigVision", "Insylo") no tiene intención de búsqueda — nadie
              busca la marca. Metiendo la línea descriptiva que ya estaba
              debajo, el h1 pasa a contener las keywords reales sin cambiar
              el copy ni el diseño.
              `tracking-tight` baja del h1 al título: letter-spacing se hereda
              como longitud ya computada, así que dejarlo en el h1 le pasaba al
              subtítulo -4px en vez del -0.16px que heredaba del body cuando
              era un <p> hermano. */}
          <h1 className="font-display text-hero font-light leading-[0.92]">
            <span className="block tracking-tight">{title}</span>
            <span className="mt-5 block max-w-2xl whitespace-pre-line font-display text-2xl font-light leading-tight text-white/90 sm:text-subhead">
              {subtitle}
            </span>
          </h1>
          {extraLine && (
            <p className="mt-3 text-lg text-white/90 sm:text-2xl">
              {extraLine}
            </p>
          )}
        </div>

        <PrecisionBadge
          value={precision}
          label={c.precision}
          variant="hero"
          className="order-2 mt-10 max-w-xs lg:absolute lg:bottom-36 lg:right-6 lg:mt-0 lg:self-auto lg:order-none xl:right-16"
        />

        <div className="order-3 mt-10 animate-fade-up lg:order-none lg:mt-14">
          <a
            href={DEMO_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shadow-lg shadow-navy/40"
          >
            {c.scheduleDemo}
          </a>
        </div>
      </div>
    </section>
  );
}
