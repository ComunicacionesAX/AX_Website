"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/i18n/context";
import { FeatureAccordionCard } from "@/components/FeatureAccordionCard";
import { useAutoRotate } from "@/hooks/useAutoRotate";
import { useSwipe } from "@/hooks/useSwipe";
import { EcosystemConnections } from "@/components/EcosystemConnections";
import { RelatedProducts } from "@/components/RelatedProducts";
import { Breadcrumbs } from "@/components/Breadcrumbs";

/**
 * Estructura de datos que consume ProductPage. Cada página de producto
 * (PigVision, Insylo, Nodos) pasa su i18n slice conforme a este contrato.
 * Los diccionarios ya tienen estas claves — sólo cambiamos la forma en
 * que el componente las consume.
 */
export type ProductData = {
  pageLabel: string;
  problemTitle: string;
  problemImgAlt: string;
  problemImg: string;
  problems: { bold: string; rest: string }[];
  solutionSubtitle: string;
  solutionImg: string;
  solutionImgAlt: string;
  /** Título del highlight card (siempre acordeón abierto por default). */
  highlightTitle: ReactNode;
  highlightText: string;
  features: { title: string; text: string }[];
  diffSlides: { title: string; text: string; img: string }[];
  comparison: {
    rows: string[];
    columns: { title: string; cells: string[] }[];
  };
  ecosystemHeading: ReactNode;
};

type Props = {
  /** Slug para RelatedProducts (destaca las OTRAS opciones). */
  current: "pigvision" | "insylo" | "nodos";
  /** Nombre human-readable del producto (para la tabla ecosistema). */
  productName: string;
  /** Aspect ratio de la imagen "El problema". Cambia entre productos. */
  problemAspect: string;
  /** Aspect ratio del render de "La solución". */
  solutionAspect: string;
  /** Layout del grid de "La solución". Insylo/Nodos usan `[1.1fr_1fr]`. */
  solutionGridCols?: string;
  /** Contenido del hero — cada página lo define distinto (video + copy). */
  hero: ReactNode;
  data: ProductData;
};

/**
 * Layout compartido de páginas de producto. Sustituye ~180 líneas
 * duplicadas entre PigVisionPage / InsyloPage / NodosPage.
 *
 * Estructura fija: Breadcrumbs → Hero (custom) → El problema →
 * La solución (accordion) → Lo que marca la diferencia (carrusel vertical)
 * → CTA "Empieza a decidir" → Ecosistema comparison → RelatedProducts.
 *
 * Las variaciones per-producto viven en `data` y `hero`, y algunas
 * dimensiones (aspect ratios) llegan por prop.
 */
export function ProductPage({
  current,
  productName,
  problemAspect,
  solutionAspect,
  solutionGridCols = "1.1fr_1fr",
  hero,
  data,
}: Props) {
  const { t } = useI18n();
  const c = t.common;
  const slides = data.diffSlides;
  const {
    slide,
    setSlide,
    progress: diffProgress,
    containerProps,
  } = useAutoRotate(slides.length);
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => setSlide((slide + 1) % slides.length),
    onSwipeRight: () => setSlide((slide - 1 + slides.length) % slides.length),
  });

  const featureCount = data.features.length + 1;
  const {
    slide: featureIdx,
    setSlide: setFeatureIdx,
    progress: featureProgress,
    containerProps: featureContainerProps,
  } = useAutoRotate(featureCount, { intervalMs: 6500 });
  // Mapea el índice normalizado 0..N a openFeature: -2 (highlight) o
  // el índice real del feature (0..N-1).
  const openFeature = featureIdx === 0 ? -2 : featureIdx - 1;
  const setOpenFeature = (v: number) => {
    // v === -2 → índice 0; v === i → índice i + 1.
    setFeatureIdx(v === -2 ? 0 : v + 1);
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      <Breadcrumbs current={data.pageLabel} />
      {hero}

      {/* El problema */}
      <section className="container-x py-28">
        <h2 className="section-title text-balance text-center">
          {data.problemTitle}
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-[30px]"
            style={{ aspectRatio: problemAspect }}
          >
            <Image
              src={data.problemImg}
              alt={data.problemImgAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <ul className="divide-y divide-navy/10">
            {data.problems.map((pr) => (
              <li key={pr.bold} className="py-7">
                <p className="text-pretty text-xl leading-snug text-navy sm:text-2xl">
                  <span className="font-bold">{pr.bold}</span> {pr.rest}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* La solución */}
      <section className="container-x py-16">
        <h2 className="section-title text-center">{c.theSolution}</h2>
        <p className="mt-4 text-center font-display text-2xl font-light text-navy/80 sm:text-subhead">
          {data.solutionSubtitle}
        </p>

        <div
          className="mt-8 grid items-center gap-10 lg:[grid-template-columns:var(--sol-cols)]"
          style={
            {
              "--sol-cols": `minmax(0, ${solutionGridCols.split("_")[0]}) minmax(0, ${solutionGridCols.split("_")[1]})`,
            } as React.CSSProperties
          }
        >
          <div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            style={{ aspectRatio: solutionAspect }}
          >
            <Image
              src={data.solutionImg}
              alt={data.solutionImgAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-5" {...featureContainerProps}>
            <FeatureAccordionCard
              title={data.highlightTitle}
              body={data.highlightText}
              open={openFeature === -2}
              onToggle={() => setOpenFeature(openFeature === -2 ? -1 : -2)}
              progress={openFeature === -2 ? featureProgress : 0}
            />
            {data.features.map((f, i) => (
              <FeatureAccordionCard
                key={f.title}
                title={f.title}
                body={f.text}
                open={openFeature === i}
                onToggle={() => setOpenFeature(openFeature === i ? -1 : i)}
                progress={openFeature === i ? featureProgress : 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lo que marca la diferencia — carrusel vertical */}
      <section className="container-x pt-12 pb-28">
        <h2 className="section-title text-center">
          {c.whatMakesDifference}
        </h2>

        <div
          className="relative mt-14 touch-pan-y"
          {...containerProps}
          {...swipeHandlers}
        >
          <div className="relative h-[520px] overflow-hidden rounded-[30px] sm:h-auto sm:aspect-[1132/541]">
            <div
              className="flex h-full flex-col transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateY(-${slide * 100}%)` }}
            >
              {slides.map((s, i) => (
                <div
                  key={s.title}
                  className="relative h-full w-full shrink-0"
                >
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/60 to-navy/90" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-14">
                    <h3 className="font-display text-2xl font-bold sm:text-4xl">
                      {s.title}
                    </h3>
                    
                    <div
                      aria-hidden="true"
                      className="mt-4 h-2 w-40 overflow-hidden rounded-full bg-white/20"
                    >
                      <div
                        className="h-full rounded-full bg-cyan shadow-[0_0_12px_color-mix(in_srgb,var(--color-cyan)_60%,transparent)]"
                        style={{
                          width: `${i === slide ? diffProgress * 100 : 0}%`,
                          transition:
                            i === slide
                              ? "width 80ms linear"
                              : "width 300ms ease-out",
                        }}
                      />
                    </div>
                    <p className="mt-4 max-w-xl text-lg font-medium leading-snug sm:text-2xl">
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots verticales */}
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center sm:right-6">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Slide ${i + 1}`}
                aria-current={slide === i}
                onClick={() => setSlide(i)}
                className="group flex h-9 w-9 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all ${
                    slide === i
                      ? "h-4 w-4 bg-cyan"
                      : "h-2.5 w-2.5 bg-white/60 group-hover:bg-white/90"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — display grande consistente con el CTA del home */}
      <section className="container-x pt-6 pb-20 text-center">
        <h2 className="mx-auto max-w-4xl text-balance font-display font-bold leading-[1.1] tracking-tight text-navy text-4xl sm:text-5xl lg:text-6xl">
          {c.startDeciding}
        </h2>
        <a
          href="/cotizar"
          className="btn-primary mt-12 hover:-translate-y-0.5"
        >
          {c.talkFarm}
        </a>
      </section>

      {/* Ecosistema — comparison table sobre navy card */}
      <section className="container-x pb-8 pt-16">
        <div className="on-dark rounded-[24px] bg-navy px-6 py-16 text-white sm:px-12">
          <h2 className="section-title !text-white text-center">
            {data.ecosystemHeading}
          </h2>

          <div className="mt-14">
            <EcosystemConnections
              productName={productName}
              rows={data.comparison.rows}
              columns={data.comparison.columns}
            />
          </div>

          <div className="mt-14 text-center">
            <a
              href="/cotizar"
              className="btn-primary hover:-translate-y-0.5"
            >
              {c.talkFarm}
            </a>
          </div>
        </div>
      </section>

      <RelatedProducts current={current} variant="orb-halo-stacked" />
    </div>
  );
}
