"use client";

import { useI18n } from "@/i18n/context";

export function Hero() {
  const { t } = useI18n();
  return (
    <section
      id="top"
      className="on-dark relative overflow-hidden rounded-b-[2.5rem] bg-navy text-white"
    >
      {/* Background video — self-hosted, sin controles de reproductor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/home_produccion_fotograma.webp"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/images/home_hero.mp4" type="video/mp4" />
        </video>
        {/* Navy overlays for contrast */}
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-navy/60" />
      </div>

      <div className="container-x relative flex min-h-[100vh] flex-col justify-center pb-28 pt-36">
        <div className="max-w-5xl animate-fade-up">
          <h1 className="font-display text-[clamp(2.5rem,11.4vw,10.925rem)] font-light leading-[0.92] tracking-tight">
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h1>
          <p className="mt-3 font-display text-2xl font-light text-white/90 sm:text-[2.75rem] sm:leading-tight">
            {t.hero.subtitle}
          </p>

          <div className="mt-14">
            <a
              href="/cotizar"
              className="inline-flex items-center rounded-xl bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/40 transition hover:bg-teal-600"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>

        {/* Description pill */}
        <div className="mt-10 max-w-md self-start rounded-2xl bg-teal/80 px-8 py-7 text-center text-lg leading-relaxed backdrop-blur-sm lg:absolute lg:bottom-36 lg:right-6 lg:mt-0 lg:self-auto xl:right-16">
          {t.hero.pill}
        </div>
      </div>
    </section>
  );
}
