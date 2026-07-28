"use client";

import { useI18n } from "@/i18n/context";

export function MidCTA() {
  const { t } = useI18n();
  return (
    <section className="bg-gradient-to-b from-sky-50 via-white to-sky-50 py-32">
      <div className="container-x flex flex-col items-center text-center">
        <h2 className="section-title max-w-3xl text-balance text-center">
          {t.midCta.title}
        </h2>
        <a
          href="/cotizar"
          className="mt-10 inline-flex items-center rounded-xl bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/20 transition hover:bg-teal-600 hover:shadow-xl hover:-translate-y-0.5"
        >
          {t.midCta.cta}
        </a>
      </div>
    </section>
  );
}
