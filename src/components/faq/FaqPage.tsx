"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedProducts } from "@/components/RelatedProducts";
import { TechGlassCard } from "@/components/TechGlassCard";

/**
 * Render de cada producto, indexado por el `id` de grupo del diccionario. Los
 * grupos transversales (generales, inversion, datos, respaldo) no están acá, y
 * su ausencia es justamente lo que decide si un grupo se envuelve en contenedor
 * de producto o se deja plano.
 *
 * Son las MISMAS imágenes que usa el menú de Productos (`nav.productItems`) y
 * `RelatedProducts`: el reconocimiento sólo funciona si la pieza que el
 * visitante asocia al producto es siempre la misma. Son renders con
 * transparencia, así que van `object-contain` sobre fondo claro, como en el
 * resto del sitio.
 *
 * Vive en el componente y no en el diccionario porque no cambia con el idioma.
 */
const PRODUCT_IMG: Record<string, string> = {
  pigvision: "/images/home_render_pigvision-768x536.webp",
  insylo: "/images/home_render_insylo-1-768x1131.webp",
  // El grupo se llama `sensores`; el producto y su ruta son `nodos`.
  sensores: "/images/home_render_nodos-768x536.webp",
};

/**
 * Hub de preguntas frecuentes. El contenido vive completo en
 * `src/i18n/dictionary.ts` (clave `faqPage`); acá sólo está el render.
 *
 * Navegación: una sola, los tags ancla de la columna izquierda. En mobile son
 * una fila que envuelve sobre el contenido; desde `lg` son una columna sticky
 * que acompaña el scroll para no perder la navegación 45 preguntas más abajo.
 *
 * Los grupos de producto (los que tienen entrada en `PRODUCT_IMG`) van dentro
 * de un contenedor con el render del equipo a la derecha de sus preguntas. Los
 * transversales van planos: ese contraste es lo que destaca a los de producto.
 * Si todos llevaran contenedor, ninguno resaltaría.
 *
 * Cuatro decisiones que no son cosméticas:
 *
 * 1. **El contenedor de producto NO puede recortar el overflow.** La imagen es
 *    `lg:sticky` para seguir visible mientras se abren las preguntas, y un
 *    `overflow-hidden` en cualquier ancestro lo convierte en el contenedor de
 *    scroll y mata el sticky. De ahí que la card use borde y radio pero nada
 *    que recorte.
 * 2. **La respuesta siempre está en el DOM.** El colapso es `grid-rows: 0fr`
 *    + `overflow-hidden` (dentro de la pregunta, donde no hay sticky), nunca
 *    render condicional ni `display:none`. Si el texto no está en el HTML
 *    servido, Google no lo indexa — y el contenido indexable ES el motivo de
 *    esta página.
 * 3. **Nada enlazable dentro de la respuesta.** Con altura 0 el texto sigue
 *    siendo foco alcanzable por teclado: un enlace ahí sería un foco
 *    invisible. Los enlaces cruzados van fuera del acordeón, siempre visibles
 *    (que además es donde le sirven al crawler).
 * 4. **Los `id` de grupo vienen del diccionario, no del título.** Son los
 *    anchors públicos (`/preguntas-frecuentes#pigvision`) a los que apuntan los
 *    tags, así que no se rompen al cambiar de idioma.
 *
 * El heading del acordeón es `h4` cuando la sección tiene título propio
 * (h2 grupo → h3 sección → h4 pregunta) y `h3` cuando no lo tiene, para no
 * saltarse niveles en los grupos que no se subdividen.
 */
export function FaqPage() {
  const { t } = useI18n();
  const f = t.faqPage;

  // Acordeones independientes: abrir uno no cierra los demás. En una FAQ el
  // visitante suele comparar dos respuestas cercanas.
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (key: string) =>
    setOpen((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  const countOf = (g: (typeof f.groups)[number]) =>
    g.sections.reduce((n, s) => n + s.items.length, 0);

  /**
   * Secciones y acordeones de un grupo. Lo comparten las dos variantes de
   * cabecera (con contenedor de producto y sin él) para que la lista de
   * preguntas no exista dos veces.
   */
  const renderSections = (g: (typeof f.groups)[number]) =>
    g.sections.map((s, si) => (
      <div key={s.title || g.id} className={si === 0 ? "" : "mt-10"}>
        {s.title && (
          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-teal">
            {s.title}
          </h3>
        )}

        <div className="mt-3 divide-y divide-navy/10 border-t border-navy/10">
          {s.items.map((item, ii) => {
            const key = `${g.id}-${si}-${ii}`;
            const answerId = `faq-answer-${key}`;
            const isOpen = open.includes(key);
            const QTag = s.title ? "h4" : "h3";
            return (
              <div key={item.q}>
                <QTag>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="group flex w-full items-start justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={`text-pretty font-display text-lg font-semibold leading-snug transition-colors sm:text-xl ${
                        isOpen ? "text-teal" : "text-navy group-hover:text-teal"
                      }`}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ease-out ${
                        isOpen
                          ? "rotate-180 text-teal"
                          : "rotate-0 text-navy/40"
                      }`}
                    />
                  </button>
                </QTag>

                {/* Ver nota 2: el texto no se desmonta, sólo colapsa. */}
                <div
                  id={answerId}
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-3xl text-pretty pb-6 pr-4 text-base leading-relaxed text-navy/70 sm:text-lg">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));

  /**
   * Enlace cruzado al producto — fuera del acordeón, siempre visible. Es la
   * mitad del valor SEO de esta página.
   */
  const renderProductLink = (g: (typeof f.groups)[number]) =>
    g.productHref ? (
      <a
        href={g.productHref}
        className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-teal transition hover:gap-3 hover:text-navy"
      >
        {t.common.seeProduct} {g.productName}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </a>
    ) : null;

  return (
    <div className="bg-white">
      <Breadcrumbs current={f.pageLabel} />

      {/* Hero — mismo patrón que /poder-del-saber: gradient vertical
          midnight → teal, con el subtítulo dentro del h1. */}
      <section className="bg-hero on-dark relative flex flex-col items-center justify-center overflow-hidden rounded-b-3xl px-8 pb-20 pt-32 text-center text-white sm:pt-40">
        <h1 className="font-display text-hero-sm font-light">
          <span className="block tracking-tight">{f.title}</span>
          <span className="mx-auto mt-6 block max-w-2xl text-pretty font-display text-xl font-light leading-relaxed text-white/90 sm:text-2xl">
            {f.subtitle}
          </span>
        </h1>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
          {/* Tags ancla. Es la única navegación de la página, así que se
              renderiza en todos los viewports: fila que envuelve en mobile,
              columna sticky desde `lg` — pegada bajo el header fijo (92px) más
              el breadcrumb sticky (44px).
              La columna es de 18rem porque los tags van `whitespace-nowrap` y
              el más largo ("Inversión y modelo comercial") no cabe en menos.
              El scroll al ancla es suave por el `scroll-behavior: smooth` de
              globals.css, que ya respeta `prefers-reduced-motion`. */}
          <nav
            aria-label={f.navLabel}
            className="lg:sticky lg:top-[152px] lg:self-start"
          >
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {f.groups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="group flex items-center gap-2 whitespace-nowrap rounded-full border border-navy/10 bg-sky-50 px-4 py-2 text-sm font-semibold text-navy transition duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-teal hover:text-white hover:shadow-md hover:shadow-teal/25"
                  >
                    {g.title}
                    <span className="text-xs font-medium tabular-nums text-navy/40 transition-colors group-hover:text-white/70">
                      {countOf(g)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            {f.groups.map((g) => {
              const img = PRODUCT_IMG[g.id];
              return (
                <section
                  key={g.id}
                  id={g.id}
                  // Compensa header fijo + breadcrumb sticky al llegar por anchor.
                  className="scroll-mt-32 pb-14 lg:scroll-mt-40"
                >
                  {img ? (
                    // Contenedor de producto. Ver nota 1: borde y radio, pero
                    // nada que recorte el overflow, o el sticky de la imagen
                    // deja de funcionar.
                    <div className="rounded-[28px] border border-navy/10 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm shadow-navy/5 sm:p-8">
                      <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-teal">
                        {f.productEyebrow}
                      </p>
                      <h2 className="section-title mt-1.5 text-balance">
                        {g.title}
                      </h2>

                      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-10">
                        {/* La imagen va primera en el DOM para que en mobile
                            quede justo bajo el título, y se coloca explícita en
                            la columna 2 desde `lg`. El grid estira esta celda a
                            todo el alto de las preguntas; el sticky vive en el
                            div interior, que es lo que le da recorrido. */}
                        <div className="lg:col-start-2 lg:row-start-1">
                          <div className="lg:sticky lg:top-[160px]">
                            <div className="relative mx-auto aspect-square w-44 lg:w-full">
                              <Image
                                src={img}
                                alt={g.productName}
                                fill
                                sizes="(max-width: 1024px) 176px, 208px"
                                className="object-contain drop-shadow-[0_16px_28px_rgba(4,9,57,0.18)]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
                          {renderSections(g)}
                        </div>
                      </div>

                      {renderProductLink(g)}
                    </div>
                  ) : (
                    <>
                      <h2 className="section-title text-balance">{g.title}</h2>
                      <div className="mt-8">{renderSections(g)}</div>
                    </>
                  )}
                </section>
              );
            })}

            <TechGlassCard className="px-8 py-14 text-center sm:px-12">
              <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {f.ctaTitle}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
                {f.ctaText}
              </p>
              <a href="/cotizar" className="btn-primary mt-10">
                {t.common.talkFarm}
              </a>
            </TechGlassCard>
          </div>
        </div>
      </section>

      <RelatedProducts current={null} variant="orb-halo-stacked" />
    </div>
  );
}
