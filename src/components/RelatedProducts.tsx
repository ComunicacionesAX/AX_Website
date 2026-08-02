"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/context";

type ProductKey = "pigvision" | "insylo" | "nodos";

const CATALOG: Record<
  ProductKey,
  {
    href: string;
    img: string;
    accuracy: number;
    code: string;
  }
> = {
  pigvision: {
    href: "/pigvision",
    img: "/images/home_render_pigvision-768x536.webp",
    accuracy: 97,
    code: "PV-01",
  },
  insylo: {
    href: "/insylo",
    img: "/images/home_render_insylo-1-768x1131.webp",
    accuracy: 97,
    code: "IS-01",
  },
  nodos: {
    href: "/nodos",
    img: "/images/home_render_nodos-768x536.webp",
    accuracy: 99,
    code: "SE-01",
  },
};

/** Nombres visibles y taglines por idioma — resuelto en cada render. */
function useProductInfo() {
  const { t } = useI18n();
  return {
    pigvision: {
      name: "PigVision",
      tagline: t.common.productTaglinePigVision,
    },
    insylo: {
      name: "Insylo",
      tagline: t.common.productTaglineInsylo,
    },
    nodos: {
      name: t.nodos.pageLabel, // "Sensores ambientales" / "Environmental sensors"
      tagline: t.common.productTaglineNodos,
    },
  } as const;
}

type Props = {
  /** Producto actual — se excluye del listado. Si es null muestra los tres. */
  current: ProductKey | null;
  /**
   * Variante visual.
   * - "dark": card navy con grid cyan tech.
   * - "light": card glass clara sobre gradient sky con hairlines cyan.
   * - "orb" (default): glass profundo con orb luminoso detrás del producto.
   * - "orb-compact": glass tech horizontal (imagen izquierda, texto derecha).
   * - "orb-tech": misma base que orb-compact + HUD chip con código de
   *   producto + LED pulsante + barra de precisión monospace. Diseñado
   *   para páginas data-heavy donde el detalle técnico ayuda a la lectura.
   * - "orb-float": producto flotante SOBRE la card, no dentro. Sólo el
   *   texto vive en la card glacier glass; el render + orb quedan
   *   suspendidos a la izquierda, sin container, como si estuvieran
   *   sobre el fondo de la sección.
   * - "orb-halo-stacked": producto flotante ARRIBA sin container
   *   (sólo halo + render), debajo card glacier glass con texto.
   *   Layout vertical, aéreo. El producto se sale hacia arriba (25%)
   *   para reforzar la sensación de flotación.
   */
  variant?:
    | "dark"
    | "light"
    | "orb"
    | "orb-compact"
    | "orb-tech"
    | "orb-float"
    | "orb-halo-stacked";
};

/**
 * Cross-navegación al pie de cada página de producto — tratamiento tech
 * inspirado en los TechGlassCard: fondo navy con grid animado + scan-line,
 * imagen prominente sobre halo cyan, HUD superior con código de producto y
 * porcentaje de precisión, hover eleva la card y mueve el CTA.
 */
export function RelatedProducts({ current, variant = "orb" }: Props) {
  const { t } = useI18n();
  const c = t.common;
  const info = useProductInfo();
  const others = (Object.keys(CATALOG) as ProductKey[]).filter(
    (k) => k !== current,
  );

  const title = current === null ? c.discoverTitle : c.relatedTitle;
  const subtitle =
    current === null ? c.discoverSubtitle : c.relatedSubtitle;

  return (
    <section className="container-x pt-16 pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title text-balance">{title}</h2>
        <p className="mt-4 text-lg text-navy/70">{subtitle}</p>
      </div>

      <div
        className={`mt-14 grid gap-6 ${
          others.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"
        } ${
          variant === "orb-halo-stacked" ? "items-stretch pt-24 sm:pt-28" : ""
        }`}
      >
        {others.map((key) => {
          // Merge de la meta estática (imagen/href/etc) con lo i18n (nombre/tagline).
          const product = { ...CATALOG[key], ...info[key] };
          const props = { product, seeLabel: c.seeProduct };
          if (variant === "dark") return <DarkCard key={key} {...props} />;
          if (variant === "light") return <LightCard key={key} {...props} />;
          if (variant === "orb-compact")
            return <OrbCompactCard key={key} {...props} />;
          if (variant === "orb-tech")
            return <OrbCompactCard key={key} {...props} tech />;
          if (variant === "orb-float")
            return <OrbFloatCard key={key} {...props} />;
          if (variant === "orb-halo-stacked")
            return <OrbHaloStackedCard key={key} {...props} />;
          return <OrbCard key={key} {...props} />;
        })}
      </div>
    </section>
  );
}

// ─── Card variants ────────────────────────────────────────────────────────

type CardProps = {
  product: (typeof CATALOG)[ProductKey] & {
    name: string;
    tagline: string;
  };
  seeLabel: string;
};

/** Card navy tech — propuesta 1. */
function DarkCard({ product: p, seeLabel }: CardProps) {
  return (
    <a
      href={p.href}
      className="group relative isolate flex flex-col overflow-hidden rounded-3xl bg-navy text-white shadow-2xl shadow-navy/30 ring-1 ring-white/10 transition-transform duration-500 ease-out hover:-translate-y-2 hover:shadow-navy/50"
    >
      {/* Grid tech + spot + hairline (sin scan-line). */}
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(151,244,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(151,244,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at center, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at center, black 30%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle 400px at 50% 15%, rgba(151,244,255,0.18), transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
      />

      <div className="relative flex h-64 items-center justify-center px-6 pt-10 pb-2 sm:h-80 sm:pt-12">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/25 sm:h-64 sm:w-64"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/40 sm:h-44 sm:w-44"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/30 blur-3xl transition-all duration-500 group-hover:h-56 group-hover:w-56 group-hover:bg-cyan/50"
        />
        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="relative object-contain p-6 drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>

      <div className="mx-7 mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="font-mono text-xs uppercase tracking-wider text-white/50">
          Precisión
        </span>
        <div className="relative flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-1 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]"
            style={{ width: `${p.accuracy}%` }}
          />
        </div>
        <span className="font-mono text-sm font-bold text-cyan tabular-nums">
          {p.accuracy}%
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end px-7 pt-6 pb-8">
        <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
          {p.name}
        </h3>
        <p className="mt-3 text-pretty text-base leading-relaxed text-white/70">
          {p.tagline}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-cyan transition-colors">
          {seeLabel} {p.name}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </a>
  );
}

/**
 * Card light glass — propuesta 2.
 * Superficie blanca translúcida sobre gradient sky con blur, hairlines
 * teal tenues, halo cyan detrás del producto y HUD en tinta navy.
 */
function LightCard({ product: p, seeLabel }: CardProps) {
  return (
    <a
      href={p.href}
      className="group relative isolate flex flex-col overflow-hidden rounded-3xl ring-1 ring-navy/10 shadow-xl shadow-navy/10 transition-transform duration-500 ease-out hover:-translate-y-2 hover:shadow-navy/25"
      style={{
        // Glass claro: blanco translúcido con blur. El navy fg viene del
        // gradient sky detrás — se lee como cristal esmerilado glacier.
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)",
        backdropFilter: "blur(24px) saturate(140%)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
      }}
    >
      {/* Grid teal tenue — más suave que la variante dark. */}
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,89,128,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,89,128,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at center, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at center, black 30%, transparent 100%)",
        }}
      />
      {/* Spot glacier — tinte cyan claro arriba centro. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle 400px at 50% 15%, rgba(151,244,255,0.35), transparent 65%)",
        }}
      />
      {/* Highlight superior — filo blanco tipo vidrio. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
      />
      {/* Hairline teal debajo del highlight. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-[1px] -z-10 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent"
      />

      {/* Zona producto */}
      <div className="relative flex h-64 items-center justify-center px-6 pt-10 pb-2 sm:h-80 sm:pt-12">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/20 sm:h-64 sm:w-64"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/30 sm:h-44 sm:w-44"
        />
        {/* Halo glacier — cyan brillante translúcido sobre glass. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/60 blur-3xl transition-all duration-500 group-hover:h-56 group-hover:w-56 group-hover:bg-cyan/80"
        />
        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="relative object-contain p-6 drop-shadow-[0_20px_25px_rgba(4,9,57,0.2)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>

      {/* Barra precisión — glass style con teal */}
      <div className="mx-7 mt-4 flex items-center gap-3 border-t border-navy/10 pt-4">
        <span className="font-mono text-xs uppercase tracking-wider text-navy/50">
          Precisión
        </span>
        <div className="relative flex-1 overflow-hidden rounded-full bg-navy/10">
          <div
            className="h-1 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]"
            style={{ width: `${p.accuracy}%` }}
          />
        </div>
        <span className="font-mono text-sm font-bold text-teal tabular-nums">
          {p.accuracy}%
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end px-7 pt-6 pb-8">
        <h3 className="font-display text-2xl font-bold leading-tight text-navy sm:text-3xl">
          {p.name}
        </h3>
        <p className="mt-3 text-pretty text-base leading-relaxed text-navy/70">
          {p.tagline}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-teal transition-colors">
          {seeLabel} {p.name}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </a>
  );
}

/**
 * Card orb-glass — propuesta 3.
 *
 * Concept: el producto flota dentro de una lente de cristal esmerilado.
 * - Base: fondo blanco muy translúcido + backdrop-blur profundo.
 * - Orb luminoso pulsante (cyan → glacier → transparent) detrás del producto.
 * - Beveled edges: highlight blanco arriba + sombra interior abajo simulando
 *   el volumen del cristal.
 * - Refracción diagonal: mancha cyan tenue arriba-izquierda.
 * - Hover: el orb crece y el producto sube — como si la lente se acercara.
 */
function OrbCard({ product: p, seeLabel }: CardProps) {
  return (
    <a
      href={p.href}
      className="group relative isolate flex flex-col overflow-hidden rounded-[32px] transition-transform duration-700 ease-out hover:-translate-y-2"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 50%, rgba(199,226,247,0.30) 100%)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        boxShadow:
          "inset 0 1px 0 0 rgba(255,255,255,0.9), " +
          "inset 0 -1px 0 0 rgba(4,9,57,0.08), " +
          "inset 1px 0 0 0 rgba(255,255,255,0.4), " +
          "inset -1px 0 0 0 rgba(255,255,255,0.4), " +
          "0 30px 60px -20px rgba(4,9,57,0.35), " +
          "0 20px 40px -20px rgba(151,244,255,0.25)",
      }}
    >
      {/* Reflejo diagonal — mancha cyan sutil arriba-izquierda simulando
          la luz rebotando en el cristal. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[9]"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, transparent 30%, transparent 70%, rgba(151,244,255,0.15) 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Zona del producto con orb luminoso */}
      <div className="relative flex h-72 items-center justify-center px-6 pt-14 pb-2 sm:h-96">
        {/* Orb luminoso — gradient radial cyan que pulsa. */}
        <span
          aria-hidden="true"
          className="orb-glow absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-out group-hover:h-72 group-hover:w-72 sm:h-72 sm:w-72"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(151,244,255,0.75) 0%, rgba(151,244,255,0.35) 35%, rgba(199,226,247,0.15) 60%, transparent 80%)",
            filter: "blur(24px)",
          }}
        />
        {/* Ring del orb — borde luminoso que define la forma. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 sm:h-64 sm:w-64"
          style={{
            boxShadow:
              "inset 0 0 40px rgba(255,255,255,0.4), 0 0 30px rgba(151,244,255,0.4)",
          }}
        />
        {/* Highlight superior del orb — arco brillante, reflejo de luz sobre
            esfera de cristal. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full sm:h-64 sm:w-64"
        >
          <span
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)",
            }}
          />
        </span>

        {/* Producto — flota levemente dentro del orb, sube más en hover. */}
        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="relative object-contain p-8 drop-shadow-[0_25px_35px_rgba(4,9,57,0.25)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-105"
        />
      </div>

      {/* Meta — sin HUD ni barra, sólo lo esencial. */}
      <div className="relative flex flex-1 flex-col justify-end px-8 pt-6 pb-8">
        <div
          aria-hidden="true"
          className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-navy/15 to-transparent"
        />
        <h3 className="font-display text-2xl font-bold leading-tight text-navy sm:text-3xl">
          {p.name}
        </h3>
        <p className="mt-3 text-pretty text-base leading-relaxed text-navy/70">
          {p.tagline}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-teal transition-colors">
          {seeLabel} {p.name}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </a>
  );
}

/**
 * Card orb-compact — dark glass tech.
 *
 * Diseño oscuro-transparente que amplifica el efecto tech sin ruido:
 *   - Base navy translúcido (~55%) con backdrop-blur profundo. El fondo
 *     de la página se ve difuminado por detrás → sensación de "cristal
 *     ahumado" instrumental.
 *   - Grid tech cyan tenue con máscara radial hacia el producto.
 *   - Hairlines cyan superior/inferior (canto luminoso).
 *   - Corner markers HUD en 3 esquinas.
 *   - Scan-line lento que baja por la zona del producto.
 *   - Ring exterior cyan que aparece en hover (efecto scanning).
 *   - Sin chips ni HUD-badge de código: el peso lo llevan la
 *     iluminación y el layout, no elementos textuales.
 *
 * NOTA: la variante `light` mantiene el chip PROD + barra precisión
 * para casos donde ese detalle sea útil (páginas más data-heavy).
 */
function OrbCompactCard({
  product: p,
  seeLabel,
  tech = false,
}: CardProps & { tech?: boolean }) {
  return (
    <a
      href={p.href}
      className="on-dark group relative isolate flex flex-row items-center overflow-hidden rounded-3xl transition-transform duration-500 ease-out hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,89,128,0.42) 0%, rgba(0,89,128,0.28) 100%)",
        backdropFilter: "blur(36px) saturate(200%)",
        WebkitBackdropFilter: "blur(36px) saturate(200%)",
        boxShadow:
          "inset 0 1px 0 0 rgba(151,244,255,0.25), " +
          "inset 0 -1px 0 0 rgba(4,9,57,0.15), " +
          "0 20px 40px -14px rgba(4,9,57,0.35), " +
          "0 12px 24px -10px rgba(151,244,255,0.18)",
      }}
    >
      
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-[8]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(151,244,255,0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(151,244,255,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
        }}
      />

      {/* Spot cyan que va derivando — reutiliza `tech-spot-drift` del
          DS. Se mueve por toda la card, no sólo la esquina superior. */}
      <div
        aria-hidden="true"
        className="tech-spot pointer-events-none absolute inset-0 -z-[9]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Hairlines cyan — filo luminoso superior + inferior. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"
      />

      {/* Corner markers HUD — 3 esquinas. */}
      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />

      {/* HUD chip arriba izquierda — sólo en variante tech. Código de
          producto + LED cyan pulsante. */}
      {tech && (
        <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-white/10 px-2.5 py-1 backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">
            {p.code}
          </span>
        </div>
      )}

      <span
        aria-hidden="true"
        className="tech-node pointer-events-none absolute right-[42%] top-6 h-1 w-1 rounded-full bg-cyan shadow-[0_0_6px_var(--color-cyan)]"
      />
      <span
        aria-hidden="true"
        className="tech-node tech-node--delay1 pointer-events-none absolute right-[26%] top-[38%] h-1 w-1 rounded-full bg-cyan shadow-[0_0_6px_var(--color-cyan)]"
      />
      <span
        aria-hidden="true"
        className="tech-node tech-node--delay2 pointer-events-none absolute bottom-6 right-[35%] h-1 w-1 rounded-full bg-cyan shadow-[0_0_6px_var(--color-cyan)]"
      />

      {/* Zona imagen — cuadrada a la izquierda, más grande para dar
          protagonismo al producto (subió de w-32/w-40 → w-40/w-52). */}
      <div className="relative aspect-square w-40 shrink-0 self-stretch overflow-hidden sm:w-52">
        {/* Orb luminoso — halo cyan pulsante más brillante sobre navy.
            Escalado a la nueva zona (w-40/w-52). */}
        <span
          aria-hidden="true"
          className="orb-glow absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 group-hover:h-36 group-hover:w-36 sm:h-40 sm:w-40 sm:group-hover:h-44 sm:group-hover:w-44"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(151,244,255,0.85) 0%, rgba(151,244,255,0.4) 40%, transparent 75%)",
            filter: "blur(20px)",
          }}
        />
        {/* Ring del orb — borde luminoso cyan. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/45 sm:h-36 sm:w-36"
          style={{
            boxShadow:
              "inset 0 0 30px rgba(151,244,255,0.25), 0 0 30px rgba(151,244,255,0.4)",
          }}
        />
        {/* Ring exterior cyan — aparece en hover (efecto scanning). */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/70 opacity-0 transition-all duration-500 group-hover:h-40 group-hover:w-40 group-hover:opacity-100 sm:h-40 sm:w-40 sm:group-hover:h-48 sm:group-hover:w-48"
        />

        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 160px, 208px"
          className="relative object-contain p-4 drop-shadow-[0_18px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:scale-105 sm:p-5"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center py-6 pl-5 pr-6 sm:py-8 sm:pl-7 sm:pr-8">
        <h3
          className="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl"
          style={{ textShadow: "0 1px 2px rgba(4,9,57,0.35)" }}
        >
          {p.name}
        </h3>
        <p className="mt-3 text-pretty text-base font-medium leading-relaxed text-white/95 sm:text-lg">
          {p.tagline}
        </p>

        {tech && (
          <div className="mt-4 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
              Acc.
            </span>
            <div className="relative h-1 w-20 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal to-cyan shadow-[0_0_6px_var(--color-cyan)]"
                style={{ width: `${p.accuracy}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold tabular-nums text-cyan">
              {p.accuracy}%
            </span>
          </div>
        )}

        <div className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-teal transition-colors sm:text-lg">
          {seeLabel} {p.name}
          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </a>
  );
}

/**
 * Card orb-float — producto FLOTANTE sobre la card glass glacier.
 *
 * Concepto: la card blanca-glass glacier solo aloja el texto. El
 * producto (imagen + orb + rings) queda posicionado ABSOLUTE hacia la
 * izquierda, se sale parcialmente del container y flota sobre el fondo
 * de la sección. Da sensación de "producto suspendido en el aire" —
 * más aéreo y premium que la variante compact.
 */
function OrbFloatCard({ product: p, seeLabel }: CardProps) {
  return (
    <a
      href={p.href}
      className="group relative isolate flex min-h-[220px] items-center pl-48 pr-6 py-8 sm:min-h-[260px] sm:pl-72 sm:pr-8 sm:py-10"
    >
      {/* Card glass glacier — sólo texto. El pl grande deja espacio
          para el producto flotante a la izquierda. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-3xl border border-white/40 transition-transform duration-500 group-hover:-translate-y-1"
        style={{
          // Fondo glacier: sky-alpha suave + cyan tint. Cristal claro.
          background:
            "linear-gradient(135deg, rgba(199,226,247,0.55) 0%, rgba(255,255,255,0.65) 50%, rgba(151,244,255,0.30) 100%)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.7), " +
            "inset 0 -1px 0 0 rgba(4,9,57,0.05), " +
            "0 20px 40px -14px rgba(4,9,57,0.20), " +
            "0 12px 24px -10px rgba(151,244,255,0.25)",
        }}
      />

      {/* Zona producto flotante — más grande para dar protagonismo:
          h-52/w-52 mobile → h-72/w-72 desktop. */}
      <div className="pointer-events-none absolute -left-6 top-1/2 h-52 w-52 -translate-y-1/2 sm:-left-10 sm:h-72 sm:w-72">
        {/* Orb luminoso — halo cyan pulsante escalado. */}
        <span
          aria-hidden="true"
          className="orb-glow absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 group-hover:h-44 group-hover:w-44 sm:h-56 sm:w-56 sm:group-hover:h-60 sm:group-hover:w-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(151,244,255,0.9) 0%, rgba(151,244,255,0.4) 40%, transparent 75%)",
            filter: "blur(24px)",
          }}
        />
        {/* Ring del orb — canto luminoso escalado. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 sm:h-52 sm:w-52"
          style={{
            boxShadow:
              "inset 0 0 36px rgba(255,255,255,0.5), 0 0 36px rgba(151,244,255,0.45)",
          }}
        />

        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 208px, 288px"
          className="relative object-contain p-5 drop-shadow-[0_24px_32px_rgba(4,9,57,0.28)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 sm:p-7"
        />
      </div>

      {/* Texto — vive dentro de la card glass. */}
      <div className="relative flex flex-col">
        <h3
          className="font-display text-xl font-bold leading-tight tracking-tight text-navy sm:text-2xl"
          style={{ textShadow: "0 1px 2px rgba(255,255,255,0.5)" }}
        >
          {p.name}
        </h3>
        <p className="mt-2 text-pretty text-sm font-medium leading-relaxed text-navy/80 sm:text-base">
          {p.tagline}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors sm:text-base">
          {seeLabel} {p.name}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </a>
  );
}

/**
 * Card orb-halo-stacked — el producto flota LIBRE arriba, sin container
 * ni background. Sólo halo cyan + render. Debajo, una card glacier
 * glass con el texto.
 *
 * Diseño target (feedback 2026-08-01):
 *   ┌──────────────────┐
 *   │   ✨ halo cyan    │  ← sin container, solo el producto
 *   │  [producto]      │     flotando sobre el fondo de la sección
 *   └────┬─────────────┘
 *        ▼ overlap 25%
 *   ┌──────────────────┐
 *   │ ▒ glass glacier ▒│  ← card con solo texto
 *   │  Producto         │
 *   │  Tagline          │
 *   │  → Conocer        │
 *   └──────────────────┘
 *
 * Notas:
 * - El wrapper `<a>` es transparente, sin bg/border. La card visible
 *   es un absoluto interior que ocupa sólo la parte inferior.
 * - El producto se sale hacia arriba con translate-y negativo para
 *   reforzar la sensación de flotación aérea.
 * - Hover: el producto sube un poco más y la card baja ligeramente
 *   su sombra (elevación).
 */
function OrbHaloStackedCard({ product: p, seeLabel }: CardProps) {
  return (
    <a
      href={p.href}
      className="group relative isolate flex h-full flex-col items-center pt-24 sm:pt-28"
    >
      
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto h-48 w-48 sm:h-56 sm:w-56">
        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 192px, 224px"
          className="relative object-contain p-1 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105 sm:p-2"
          style={{
            filter:
              "drop-shadow(0 0 4px rgba(151,244,255,0.85)) " +
              "drop-shadow(0 0 10px rgba(151,244,255,0.55)) " +
              "drop-shadow(0 12px 18px rgba(4,9,57,0.22))",
          }}
        />
      </div>

      <div
        className="relative flex w-full flex-1 flex-col items-center rounded-3xl border border-white/50 px-6 pt-20 pb-7 text-center transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl sm:px-8 sm:pt-24 sm:pb-8"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(240,248,255,0.72) 60%, rgba(199,226,247,0.55) 100%)",
          backdropFilter: "blur(28px) saturate(150%)",
          WebkitBackdropFilter: "blur(28px) saturate(150%)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.9), " +
            "inset 0 -1px 0 0 rgba(4,9,57,0.05), " +
            "0 22px 44px -18px rgba(4,9,57,0.20), " +
            "0 14px 28px -12px rgba(151,244,255,0.22)",
        }}
      >
        <h3
          className="font-display text-xl font-bold leading-tight tracking-tight text-navy sm:text-2xl"
          style={{ textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}
        >
          {p.name}
        </h3>
        <p className="mx-auto mt-3 max-w-xs whitespace-pre-line text-pretty text-sm font-medium leading-relaxed text-navy/80 sm:text-base">
          {p.tagline}
        </p>
        
        <div className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-teal transition-colors sm:text-base">
          {seeLabel} {p.name}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </a>
  );
}

/**
 * Corner-marker HUD — pequeña "L" en la esquina, tipo visor de cámara /
 * instrumento óptico. Cyan con opacidad tenue para no competir con el
 * contenido, más brillante en hover.
 */
function CornerMark({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  // Cada esquina: dos líneas (h + v) que salen del vértice. Uso `before`
  // y `after` implícitos vía dos spans dentro para claridad.
  const base =
    "pointer-events-none absolute h-4 w-4 opacity-40 transition-opacity duration-500 group-hover:opacity-90";
  const positions = {
    tl: "left-3 top-3",
    tr: "right-3 top-3",
    bl: "left-3 bottom-3",
    br: "right-3 bottom-3",
  };
  const linesByPos = {
    tl: (
      <>
        <span className="absolute left-0 top-0 h-px w-full bg-cyan/70" />
        <span className="absolute left-0 top-0 h-full w-px bg-cyan/70" />
      </>
    ),
    tr: (
      <>
        <span className="absolute right-0 top-0 h-px w-full bg-cyan/70" />
        <span className="absolute right-0 top-0 h-full w-px bg-cyan/70" />
      </>
    ),
    bl: (
      <>
        <span className="absolute bottom-0 left-0 h-px w-full bg-cyan/70" />
        <span className="absolute bottom-0 left-0 h-full w-px bg-cyan/70" />
      </>
    ),
    br: (
      <>
        <span className="absolute bottom-0 right-0 h-px w-full bg-cyan/70" />
        <span className="absolute bottom-0 right-0 h-full w-px bg-cyan/70" />
      </>
    ),
  };
  return (
    <span aria-hidden="true" className={`${base} ${positions[position]}`}>
      {linesByPos[position]}
    </span>
  );
}
