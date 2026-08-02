"use client";

import { useI18n } from "@/i18n/context";

export function MidCTA() {
  const { t } = useI18n();
  return (
    <section className="bg-gradient-to-b from-sky-50 via-white to-sky-50 py-28">
      <div className="container-x flex flex-col items-center text-center">
        {/* Display grande — misma escala que el CTA final del home y el
            CTA de las páginas de producto (consistencia por sección). */}
        <h2 className="mx-auto max-w-3xl text-balance font-display font-bold leading-[1.1] tracking-tight text-navy text-4xl sm:text-5xl lg:text-6xl">
          {t.midCta.title}
        </h2>
        <a
          href="/cotizar"
          className="btn-primary mt-12 shadow-lg shadow-navy/20 hover:-translate-y-0.5 hover:shadow-xl"
        >
          {t.midCta.cta}
        </a>
      </div>
    </section>
  );
}
