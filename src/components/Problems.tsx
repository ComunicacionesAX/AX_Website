"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/context";

const images = [
  "/images/home_sindatos_silos.webp",
  "/images/home_sindatos_cerditos.webp",
  "/images/home_sindatos_gallina-scaled.webp",
  "/images/home_sindatos_silos.webp",
];

export function Problems() {
  const { t } = useI18n();
  const problems = t.problems.items.map((p, i) => ({ ...p, img: images[i] }));
  return (
    <section className="bg-gradient-to-b from-white via-sky-50 to-white py-28">
      <div className="container-x">
        <h2 className="section-title mx-auto max-w-3xl text-center">
          {t.problems.title}
        </h2>
      </div>

      {/* Carousel row */}
      <div className="mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
        {problems.map((p, i) => (
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
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <h3 className="text-xl font-medium">{p.title}</h3>
              <div className="my-4 h-0.5 w-12 bg-cyan" />
              <p className="text-[15px] leading-relaxed text-white/85">{p.text}</p>
            </div>
          </article>
        ))}
        <div className="shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
      </div>
    </section>
  );
}
