"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { NCSU_STUDY_URL, INNOVACION_STUDY_URL } from "@/lib/links";

const revistaImgs = [
  "/images/saber/saber_bmeditores.webp",
  "/images/saber/saber_pigprogress.webp",
];

export function SaberPage() {
  const { t } = useI18n();
  const s = t.saber;
  const revistas = s.revistas.map((r, i) => ({ ...r, img: revistaImgs[i] }));
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Hero — full-bleed azul hasta arriba, como el resto de las landings */}
      <section
        className="on-dark relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden rounded-b-[2.5rem] px-8 pb-20 pt-44 text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #97f4ff 0%, #005980 45%, #040939 100%)",
        }}
      >
        <h1 className="font-display text-5xl font-medium leading-tight tracking-tight sm:text-7xl lg:text-8xl">
          {s.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-2xl">
          {s.subtitle}
        </p>
      </section>

      {/* Grid de contenidos */}
      <section className="container-x py-16">
        <div className="grid gap-6 lg:grid-cols-[1.9fr_1fr]">
          {/* Feature card */}
          <a
            href={INNOVACION_STUDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block min-h-[420px] overflow-hidden rounded-[30px]"
          >
            <Image
              src="/images/saber/saber_ciencias.webp"
              alt={s.featureAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
            <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-cyan text-navy">
              <Plus className="h-6 w-6" />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <h3 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
                {s.featureTitle1}
                <br />
                {s.featureTitle2}
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">
                {s.featureText}
              </p>
              <span className="mt-4 inline-block rounded-full bg-white/25 px-5 py-2 text-sm font-medium backdrop-blur-sm">
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
                  className="group relative block min-h-[135px] flex-1 overflow-hidden rounded-[30px]"
                >
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/40 to-navy/20" />
                  <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-cyan text-navy">
                    <Plus className="h-4 w-4" />
                  </span>
                  <div className="absolute inset-0 flex flex-col justify-start p-6 text-white">
                    <h3 className="max-w-[70%] font-display text-2xl font-medium leading-tight">
                      {r.title}
                    </h3>
                    <p className="mt-2 max-w-[80%] text-xs leading-snug text-white/85">
                      {r.text}
                    </p>
                    <span className="mt-auto inline-block w-fit rounded-full bg-white/25 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
                      {r.date}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* NCSU study card */}
        <a
          href={NCSU_STUDY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 grid items-center gap-8 overflow-hidden rounded-[24px] border border-white bg-white/40 p-6 shadow-xl shadow-navy/5 backdrop-blur-md transition hover:bg-white/60 sm:p-8 lg:grid-cols-[1.1fr_2fr]">
          <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-sky-50 lg:h-64">
            <Image
              src="/images/saber/saber_ncsu_render.webp"
              alt={s.ncsuRenderAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-contain p-4"
            />
          </div>
          <div className="relative">
            <span className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-cyan text-navy">
              <Plus className="h-6 w-6" />
            </span>
            <h3 className="max-w-2xl font-display text-3xl font-medium leading-tight text-navy sm:text-4xl">
              {s.ncsuTitle}
            </h3>
            <div className="mt-6 flex items-start gap-5">
              <Image
                src="/images/saber/saber_ncsu_logo.webp"
                alt={s.ncsuLogoAlt}
                width={150}
                height={72}
                className="h-14 w-auto object-contain"
              />
              <p className="max-w-md text-[15px] leading-relaxed text-navy/80">
                {s.ncsuText}
              </p>
            </div>
          </div>
        </a>
      </section>
    </div>
  );
}
