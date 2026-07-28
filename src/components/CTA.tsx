"use client";

import { useI18n } from "@/i18n/context";

export function CTA() {
  const { t } = useI18n();
  return (
    <section
      id="cotizar"
      className="bg-gradient-to-b from-white to-sky-50 pb-16 pt-8"
    >
      <div className="container-x">
        <div className="rounded-[2.5rem] bg-white px-8 py-24 text-center shadow-xl shadow-navy/5">
          <h2 className="section-title mx-auto lg:whitespace-nowrap">
            {t.cta.title}
          </h2>
          <a
            href="/cotizar"
            className="mt-10 inline-flex items-center rounded-xl bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/20 transition hover:bg-teal-600 hover:shadow-xl hover:-translate-y-0.5"
          >
            {t.cta.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
