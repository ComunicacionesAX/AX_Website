"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/context";

const meta = [
  { img: "/images/home_render_pigvision-768x536.webp", accuracy: 98, href: "/pigvision" },
  { img: "/images/home_render_nodos-768x536.webp", accuracy: 99, href: "/nodos" },
  { img: "/images/home_render_insylo-1-768x1131.webp", accuracy: 97, href: "/insylo" },
];

export function Solutions() {
  const { t } = useI18n();
  const solutions = t.solutions.items.map((s, i) => ({ ...s, ...meta[i] }));
  return (
    <section
      id="soluciones"
      className="bg-gradient-to-b from-white via-sky-50 to-white py-32"
    >
      <div className="container-x">
        <h2 className="section-title text-center">{t.solutions.title}</h2>

        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-3">
          {solutions.map((s) => (
            <article
              key={s.name}
              className="flex flex-col rounded-3xl bg-white p-7 shadow-2xl shadow-navy/10"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl font-bold leading-tight text-navy">
                  {s.name}
                </h3>
                <a
                  href={s.href}
                  aria-label={`${t.solutions.see} ${s.name}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan text-navy transition hover:bg-cyan/80"
                >
                  <Plus className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-3 text-[15px] leading-snug text-muted">{s.text}</p>

              <div className="relative mt-6 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-sky-50">
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="scale-110 object-contain p-3"
                />
              </div>

              {/* accuracy bar */}
              <div className="mt-6">
                <div className="h-1 w-full overflow-hidden rounded-full bg-sky">
                  <div
                    className="h-full rounded-full bg-cyan"
                    style={{ width: `${s.accuracy}%` }}
                  />
                </div>
                <p className="mt-3 text-center text-navy">
                  <span className="font-display text-4xl font-bold leading-none">
                    {s.accuracy}%
                  </span>
                  <br />
                  <span className="mt-1 inline-block text-sm text-muted">
                    {t.solutions.precision}
                  </span>
                </p>
              </div>

              <a
                href={s.href}
                className="mt-5 rounded-xl bg-teal px-6 py-3 text-center text-[15px] font-semibold text-white transition hover:bg-teal-600"
              >
                {t.solutions.seeHow}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
