"use client";

import Image from "next/image";
import { AlertTriangle, EyeOff, TrendingUp, Maximize2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import type { ComponentType, SVGProps } from "react";

const images = [
  "/images/home_sindatos_silos.webp",
  "/images/home_sindatos_cerditos.webp",
  "/images/home_sindatos_gallina-scaled.webp",
  "/images/home_sindatos_silos.webp",
];

const icons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  AlertTriangle,
  EyeOff,
  TrendingUp,
  Maximize2,
];

export function Problems() {
  const { t } = useI18n();
  const problems = t.problems.items.map((p, i) => ({
    ...p,
    img: images[i],
    Icon: icons[i] ?? AlertTriangle,
  }));
  return (
    <section className="bg-gradient-to-b from-white via-sky-50 to-white py-28">
      <div className="container-x">
        <h2 className="section-title mx-auto max-w-3xl text-balance text-center">
          {t.problems.title}
        </h2>
      </div>

      <div className="mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
        {problems.map((p, i) => {
          const Icon = p.Icon;
          return (
            <article
              key={i}
              className="group relative aspect-[3/4.6] w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[400px]"
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 800px, 1200px"
                quality={90}
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/85 via-navy/45 to-transparent" />

              <div className="absolute left-5 right-5 top-5 flex">
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2 shadow-lg shadow-navy/10 backdrop-blur-xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 100%)",
                    WebkitBackdropFilter:
                      "blur(20px) saturate(180%) brightness(105%)",
                    backdropFilter:
                      "blur(20px) saturate(180%) brightness(105%)",
                  }}
                >
                  <Icon className="h-4 w-4 text-navy" aria-hidden="true" />
                  <span className="text-sm font-semibold leading-none text-navy">
                    {p.title}
                  </span>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
                  {p.text}
                </p>
              </div>
            </article>
          );
        })}
        <div className="shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
      </div>
    </section>
  );
}
