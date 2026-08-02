"use client";

import { useI18n } from "@/i18n/context";
import { TechGlassCard } from "./TechGlassCard";

export function CTA() {
  const { t } = useI18n();
  return (
    <section
      id="cotizar"
      className="bg-gradient-to-b from-white to-sky-50 pb-16 pt-8"
    >
      <div className="container-x">
        <TechGlassCard className="mx-auto flex max-w-5xl flex-col items-center px-8 py-24 text-center sm:py-28">
          {/* Título CTA — display grande estilo referencia. Sobreescribe
              section-title (max 40px) para llegar a ~64px en desktop. */}
          <h2 className="mx-auto max-w-3xl text-balance font-display font-bold leading-[1.1] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {t.cta.title}
          </h2>
          <a
            href="/cotizar"
            className="btn-primary mt-12 shadow-lg shadow-navy/40 hover:-translate-y-0.5 hover:shadow-xl"
          >
            {t.cta.cta}
          </a>
        </TechGlassCard>
      </div>
    </section>
  );
}
