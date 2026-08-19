"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { NCSU_STUDY_URL, INNOVACION_STUDY_URL } from "@/lib/links";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedProducts } from "@/components/RelatedProducts";

const revistaImgs = [
  "/images/saber/saber_bmeditores.webp",
  "/images/saber/saber_pigprogress.webp",
];

export function SaberPage() {
  const { t } = useI18n();
  const s = t.saber;
  const revistas = s.revistas.map((r, i) => ({ ...r, img: revistaImgs[i] }));
  return (
    <div className="bg-white">
      <Breadcrumbs current={s.title} />
      {/* Hero — gradient vertical midnight → teal. El midnight del top del
          gradient hace match con el breadcrumb navy translúcido pegado arriba. */}
      <section className="bg-hero on-dark relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden rounded-b-3xl px-8 pb-24 pt-32 text-center text-white sm:pt-40">
        {/* Título con text-hero-sm (clamp 3rem→6rem) — token DS oficial
            para heroes de páginas internas. Reemplaza escala hardcoded. */}
        {/* Ver nota en ProductHero: el subtitle entra al h1 para aportar las
            keywords ("monitoreo continuo", "rentabilidad en granja") que
            "El poder del saber" por sí solo no tiene. */}
        <h1 className="font-display text-hero-sm font-light">
          <span className="block tracking-tight">{s.title}</span>
          <span className="mt-6 block max-w-3xl whitespace-pre-line text-pretty font-display text-xl font-light leading-relaxed text-white/90 sm:text-2xl">
            {s.subtitle}
          </span>
        </h1>
      </section>

      {/* Grid de contenidos */}
      <section className="container-x py-16">
        <div className="grid gap-6 lg:grid-cols-[1.9fr_1fr]">
          
          <a
            href={INNOVACION_STUDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block min-h-[520px] overflow-hidden rounded-[30px] shadow-lg shadow-navy/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/25 lg:min-h-[640px]"
          >
            <Image
              src="/images/saber/saber_ciencias.webp"
              alt={s.featureAlt}
              fill
              // Candidata a LCP en desktop: está en el primer viewport.
              // `priority` sólo cambia la prioridad de carga, no el layout.
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
            <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-cyan text-navy transition-transform duration-300 group-hover:scale-110">
              <Plus className="h-6 w-6" />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
              {/* h2: son los items de primer nivel de la sección. Sin h2 el
                  documento saltaba de h1 a h3. El tamaño lo dan las clases,
                  así que el cambio de tag no altera el diseño. */}
              <h2 className="text-balance font-display font-bold leading-[1.1] tracking-tight text-3xl sm:text-4xl lg:text-5xl">
                {s.featureTitle1}
                <br />
                {s.featureTitle2}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/90 sm:text-xl">
                {s.featureText}
              </p>
              <span className="mt-6 inline-block rounded-full border border-white/30 bg-white/15 px-5 py-2 text-base font-medium backdrop-blur-md">
                {s.featureDate}
              </span>
            </div>
          </a>

          {/* Revista digital cards */}
          <div className="flex flex-col gap-6">
            {revistas.map((r) => {
              const url = "url" in r ? (r.url as string) : undefined;
              const Card = url ? "a" : "article";
              return (
                <Card
                  key={r.title}
                  {...(url
                    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group relative block min-h-[300px] flex-1 overflow-hidden rounded-[30px] shadow-md shadow-navy/10 transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/20"
                >
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/40 to-navy/20" />
                  <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-cyan text-navy transition-transform duration-300 group-hover:scale-110">
                    <Plus className="h-4 w-4" />
                  </span>
                  {/* Layout: título arriba, texto en el medio, chip fecha
                      pegado abajo — `justify-between` hace el trabajo. */}
                  <div className="absolute inset-0 flex flex-col p-7 text-white">
                    <div>
                      <h2 className="max-w-[85%] text-balance font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                        {r.title}
                      </h2>
                      <p className="mt-3 max-w-[90%] text-pretty text-base leading-snug text-white/90 sm:text-lg">
                        {r.text}
                      </p>
                    </div>
                    <span className="mt-auto inline-block w-fit rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
                      {r.date}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <a
          href={NCSU_STUDY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 grid items-center gap-10 overflow-hidden rounded-[24px] border border-white bg-white/40 p-8 shadow-xl shadow-navy/5 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/60 hover:shadow-2xl hover:shadow-navy/15 sm:p-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-sky-50 lg:h-72">
            <Image
              src="/images/saber/saber_ncsu_render.webp"
              alt={s.ncsuRenderAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-contain p-4 transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative">
            <span className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-cyan text-navy transition-transform duration-300 group-hover:scale-110">
              <Plus className="h-6 w-6" />
            </span>
            <h2 className="max-w-2xl text-balance pr-14 font-display font-bold leading-tight tracking-tight text-navy text-3xl sm:text-4xl lg:whitespace-pre-line lg:text-subhead">
              {s.ncsuTitle}
            </h2>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:gap-6">
              <Image
                src="/images/saber/saber_ncsu_logo.webp"
                alt={s.ncsuLogoAlt}
                width={150}
                height={72}
                className="h-14 w-auto shrink-0 object-contain"
              />
              <p className="max-w-md text-pretty text-lg leading-relaxed text-navy/80 sm:text-xl">
                {s.ncsuText}
              </p>
            </div>
          </div>
        </a>
      </section>

      <RelatedProducts current={null} variant="orb-halo-stacked" />
    </div>
  );
}
