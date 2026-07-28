"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/context";

export function ResearchTriangle() {
  const { t } = useI18n();
  return (
    <section className="bg-gradient-to-b from-white via-sky-50 to-white py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-2xl font-light text-navy/80 sm:text-3xl">
              {t.research.pre}
            </p>
            <h2 className="section-title mt-1">{t.research.title}</h2>
            <p className="mt-1 font-display text-2xl font-light text-navy/80 sm:text-3xl">
              {t.research.post}
            </p>

            <div className="mt-8 max-w-md space-y-4 text-lg leading-relaxed text-muted">
              <p>{t.research.p1}</p>
              <p>{t.research.p2}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-navy/10">
            <div className="relative aspect-[724/683]">
              <Image
                src="/images/home_research_triangle.webp"
                alt={t.research.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
