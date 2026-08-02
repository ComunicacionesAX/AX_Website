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
            {/* "Nos situamos en" — heading light (level 2 del DS, ~2rem
                desktop). Menos peso que el título principal para crear
                jerarquía tipo eyebrow-heading. */}
            <p className="font-display text-3xl font-light text-navy/80 sm:text-4xl">
              {t.research.pre}
            </p>
            {/* "el Research Triangle," — display-lg (subhead 44px+),
                bold para máxima jerarquía. Sobreescribe section-title
                que era 40px max. */}
            <h2 className="mt-1 font-display font-bold leading-[1.05] tracking-tight text-navy text-4xl sm:text-5xl lg:text-subhead">
              {t.research.title}
            </h2>
            {/* "Carolina del Norte" — mismo tratamiento que el eyebrow
                arriba. Cierra el bloque de heading. */}
            <p className="mt-2 font-display text-3xl font-light text-navy/80 sm:text-4xl">
              {t.research.post}
            </p>

            {/* Body — sube de text-lg (18px) a text-xl (20px) matcheando
                la referencia. leading-relaxed conserva la respiración. */}
            <div className="mt-10 max-w-md space-y-5 text-xl leading-relaxed text-muted">
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
