"use client";

import { useI18n } from "@/i18n/context";
import { useCanPlayVideo } from "@/hooks/useCanPlayVideo";

export function Hero() {
  const { t } = useI18n();
  const canPlayVideo = useCanPlayVideo();
  return (
    <section
      id="top"
      className="on-dark relative overflow-hidden rounded-b-3xl bg-navy text-white"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {canPlayVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/home_produccion_fotograma.webp"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/images/home_hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/images/home_produccion_fotograma.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-navy/60" />
      </div>

      <div className="container-x relative flex min-h-[100vh] flex-col items-center justify-center pb-28 pt-36 text-center lg:items-start lg:text-left">
        <div className="animate-fade-up lg:max-w-[65%]">
          <h1 className="font-display text-hero-sm font-light leading-[0.95] tracking-tight">
            <span className="block lg:whitespace-nowrap">{t.hero.title1}</span>
            <span className="block lg:whitespace-nowrap">{t.hero.title2}</span>
          </h1>
          <p className="mt-5 whitespace-pre-line text-pretty font-display text-xl font-light leading-tight text-white/90 sm:whitespace-normal sm:text-2xl lg:text-3xl">
            {t.hero.subtitle}
          </p>
        </div>

        <div
          className="mt-10 max-w-md rounded-2xl border border-white/20 px-8 py-7 text-center text-lg leading-relaxed text-white/95 shadow-xl shadow-navy/30 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            boxShadow:
              "inset 0 1px 0 0 rgba(255,255,255,0.30), 0 20px 40px -12px rgba(4,9,57,0.4)",
          }}
        >
          {t.hero.pill}
        </div>

        <div className="mt-10 animate-fade-up lg:mt-12">
          <a
            href="/cotizar"
            className="btn-primary shadow-lg shadow-navy/40"
          >
            {t.hero.cta}
          </a>
        </div>

        <div
          className="pointer-events-auto hidden max-w-md rounded-2xl border border-white/20 px-8 py-7 text-center text-lg leading-relaxed text-white/95 shadow-xl shadow-navy/30 lg:absolute lg:bottom-24 lg:right-6 lg:block xl:right-16"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            boxShadow:
              "inset 0 1px 0 0 rgba(255,255,255,0.30), 0 20px 40px -12px rgba(4,9,57,0.4)",
          }}
        >
          {t.hero.pill}
        </div>
      </div>
    </section>
  );
}
