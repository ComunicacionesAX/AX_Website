"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/i18n/context";
import { DEMO_BOOKING_URL } from "@/lib/links";

export function InsyloPage() {
  const { t } = useI18n();
  const p = t.insylo;
  const c = t.common;
  const problems = p.problems;
  const [openFeature, setOpenFeature] = useState(-2);
  const [slide, setSlide] = useState(0);
  const slides = p.diffSlides;
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Hero — mismas características gráficas que el home */}
      <section className="on-dark relative overflow-hidden rounded-b-[2.5rem] bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/insylo/is_problem.webp"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/images/insylo/insylo_hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-navy/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-navy/60" />
        </div>

        <div className="container-x relative flex min-h-[100vh] flex-col justify-center pb-28 pt-36">
          <div className="max-w-5xl animate-fade-up">
            <h1 className="font-display text-[clamp(2.5rem,11.4vw,10.925rem)] font-light leading-[0.92] tracking-tight">
              Insylo
            </h1>
            <p className="mt-3 font-display text-2xl font-light text-white/90 sm:text-[2.75rem] sm:leading-tight">
              {p.subtitle}
            </p>
            <p className="mt-3 text-lg text-white/90 sm:text-2xl">{p.range}</p>

            <div className="mt-14">
              <a
                href={DEMO_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/40 transition hover:bg-teal-600"
              >
                {c.scheduleDemo}
              </a>
            </div>
          </div>

          {/* Precision badge */}
          <div className="mt-10 max-w-xs self-start lg:absolute lg:bottom-36 lg:right-6 lg:mt-0 lg:self-auto xl:right-16">
            <div className="h-2 w-52 rounded-full bg-cyan" />
            <div className="mt-4 font-display text-6xl font-bold sm:text-7xl">97%</div>
            <div className="mt-1 text-2xl sm:text-3xl">{c.precision}</div>
          </div>
        </div>
      </section>

      {/* El problema */}
      <section className="container-x py-28">
        <h2 className="section-title text-balance text-center">{p.problemTitle}</h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[732/686] overflow-hidden rounded-[30px]">
            <Image
              src="/images/insylo/is_problem.webp"
              alt={p.problemImgAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <ul className="divide-y divide-navy/10">
            {problems.map((pr) => (
              <li key={pr.bold} className="py-6">
                <p className="text-[1.36rem] leading-snug text-navy sm:text-[1.5rem]">
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
        <p className="mt-4 text-center font-display text-2xl font-light text-navy/80 sm:text-4xl">
          {p.solutionSubtitle}
        </p>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Center: grain in silo */}
          <div className="relative aspect-square">
            <Image
              src="/images/insylo/is_solution_center.webp"
              alt={p.solutionImgAltCenter}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain"
            />
          </div>

          {/* Right: highlight card + feature chips (acordeón) */}
          <div className="flex flex-col gap-5">
            {(() => {
              const open = openFeature === -2;
              return (
                <button
                  type="button"
                  onClick={() => setOpenFeature(open ? -1 : -2)}
                  className={`w-full rounded-[30px] p-[1.7rem] text-left transition-colors ${
                    open
                      ? "bg-navy text-white shadow-lg shadow-navy/25"
                      : "bg-[#f2f2f2] text-[#8e98a8] hover:bg-[#e9ebef]"
                  }`}
                >
                  <div className="font-display text-[1.28rem] font-medium leading-tight sm:text-[1.6rem]">
                    {p.highlightTitle}
                  </div>
                  {open && (
                    <>
                      <div className="mt-3 h-1.5 w-20 rounded-full bg-cyan" />
                      <p className="mt-3 text-[0.96rem] leading-snug text-white/90">{p.highlightText}</p>
                    </>
                  )}
                </button>
              );
            })()}

            {p.features.map((f, i) => {
              const open = openFeature === i;
              return (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => setOpenFeature(open ? -1 : i)}
                  className={`w-full rounded-[30px] p-[1.7rem] text-left transition-colors ${
                    open
                      ? "bg-navy text-white shadow-lg shadow-navy/25"
                      : "bg-[#f2f2f2] text-[#8e98a8] hover:bg-[#e9ebef]"
                  }`}
                >
                  <h3 className="font-display text-[1.28rem] font-medium leading-tight sm:text-[1.6rem]">
                    {f.title}
                  </h3>
                  {open && (
                    <>
                      <div className="mt-3 h-1.5 w-20 rounded-full bg-cyan" />
                      <p className="mt-3 text-[0.96rem] leading-snug text-white/90">{f.text}</p>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lo que marca la diferencia — carrusel */}
      <section className="container-x pt-12 pb-28">
        <h2 className="section-title text-center">{c.whatMakesDifference}</h2>

        <div className="relative mt-14">
          <div className="overflow-hidden rounded-[30px]">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {slides.map((s) => (
                <div key={s.title} className="relative w-full shrink-0">
                  <div className="relative aspect-[1132/541]">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/60 to-navy/90" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-14">
                    <h3 className="font-display text-2xl font-bold sm:text-4xl">{s.title}</h3>
                    <div className="mt-4 h-2 w-40 rounded-full bg-cyan" />
                    <p className="mt-4 max-w-xl text-lg font-medium leading-snug sm:text-2xl">
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Puntos verticales de navegación */}
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center sm:right-6">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Ir a la imagen ${i + 1}`}
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

      {/* CTA con producto */}
      <section className="container-x pt-6 pb-16 text-center">
        <h2 className="section-title mx-auto max-w-4xl text-balance text-center">
          {c.startDeciding}
        </h2>
        <a
          href="/cotizar"
          className="mt-10 inline-flex items-center rounded-lg bg-teal px-8 py-4 text-base font-semibold text-cyan transition hover:bg-teal-600 hover:-translate-y-0.5"
        >
          {c.talkFarm}
        </a>
      </section>

      {/* Ecosistema — comparison table */}
      <section className="container-x pb-8 pt-16">
        <div className="rounded-[24px] bg-navy px-6 py-16 text-white sm:px-12">
          <h2 className="section-title !text-white text-center">
            Insylo {c.connectsWith}{" "}
            <span className="font-light">{c.connectsWithRest}</span>
          </h2>

          <div className="mt-14 overflow-x-auto">
            <div className="grid min-w-[560px] grid-cols-[minmax(110px,1fr)_1.5fr_1.5fr] gap-x-3 sm:min-w-[720px] sm:grid-cols-[minmax(180px,1fr)_1.5fr_1.5fr] sm:gap-x-6">
              <div />
              {p.comparison.columns.map((col) => (
                <div
                  key={col.title}
                  className="rounded-xl border border-white/60 px-3 py-3 text-center text-sm tracking-[0.1em] sm:px-4 sm:text-lg sm:tracking-[0.2em]"
                >
                  {col.title}
                </div>
              ))}

              {p.comparison.rows.map((row, r) => (
                <div key={row} className="contents">
                  <div className="flex items-center border-t border-white/15 py-5 pr-2 text-base font-bold text-cyan sm:py-8 sm:pr-4 sm:text-xl">
                    {row}
                  </div>
                  {p.comparison.columns.map((col) => (
                    <div
                      key={col.title + r}
                      className="border-t border-white/15 py-5 text-[13px] leading-relaxed text-white/90 sm:py-8 sm:text-[15px]"
                    >
                      {col.cells[r]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 text-center">
            <a
              href="/cotizar"
              className="inline-flex items-center rounded-lg bg-teal px-8 py-4 text-base font-semibold text-cyan transition hover:bg-teal-600 hover:-translate-y-0.5"
            >
              {c.talkFarm}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
