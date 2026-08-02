"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useRef } from "react";
import { useI18n } from "@/i18n/context";
import { PrecisionBadge } from "@/components/PrecisionBadge";
import { useAutoRotate } from "@/hooks/useAutoRotate";
import { useSwipe } from "@/hooks/useSwipe";

const meta = [
  { img: "/images/home_render_pigvision-768x536.webp", accuracy: 97, href: "/pigvision" },
  { img: "/images/home_render_insylo-1-768x1131.webp", accuracy: 97, href: "/insylo" },
  { img: "/images/home_render_nodos-768x536.webp", accuracy: 99, href: "/nodos" },
];

const MOBILE_CARD_VW = 78;
const MOBILE_PEEK_VW = 11;

export function Solutions() {
  const { t } = useI18n();
  const solutions = t.solutions.items.map((s, i) => ({ ...s, ...meta[i] }));

  const { slide: active, setSlide, containerProps } = useAutoRotate(
    solutions.length,
    { intervalMs: 6000, stopOnInteract: true, resumeAfterMs: 7000 },
  );

  const n = solutions.length;
  const mid = Math.floor(n / 2);
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => setSlide((active + 1) % n),
    onSwipeRight: () => setSlide((active - 1 + n) % n),
  });

  const slotOf = (i: number) => ((i - active + mid) % n + n) % n;
  const orderClass = ["md:order-0", "md:order-1", "md:order-2"];

  const prevSlotsRef = useRef<number[]>(solutions.map((_, i) => slotOf(i)));
  const currentSlots = solutions.map((_, i) => slotOf(i));
  const slideFromFor = (i: number, slot: number): string => {
    const prev = prevSlotsRef.current[i];
    if (prev === undefined || prev === slot) return "40px";
    let delta = slot - prev;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    return delta > 0 ? "80px" : "-80px";
  };
  prevSlotsRef.current = currentSlots;

  const trackTransform = `translateX(calc(-${active * MOBILE_CARD_VW}vw - ${active * 12}px))`;

  return (
    <section
      id="soluciones"
      className="bg-gradient-to-b from-white via-sky-50 to-white py-32"
    >
      <div className="container-x">
        <h2 className="section-title text-center">{t.solutions.title}</h2>
      </div>

      <div
        role="region"
        aria-roledescription="carrusel"
        aria-label={t.solutions.title}
        aria-live="polite"
        aria-atomic="false"
        className="relative mt-10 overflow-hidden py-4 md:hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 4vw, #000 calc(100% - 4vw), transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, #000 4vw, #000 calc(100% - 4vw), transparent 100%)",
        }}
        {...containerProps}
        {...swipeHandlers}
      >
        <div
          className="flex touch-pan-y items-stretch gap-3 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{
            paddingLeft: `${MOBILE_PEEK_VW}vw`,
            paddingRight: `${MOBILE_PEEK_VW}vw`,
            transform: trackTransform,
          }}
        >
          {solutions.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.name}
                className="shrink-0"
                style={{ width: `${MOBILE_CARD_VW}vw` }}
                onClick={() => setSlide(i)}
              >
                <article
                  aria-current={isActive}
                  className={`grid grid-rows-[auto_auto_auto_auto_auto] gap-6 overflow-hidden rounded-3xl bg-white p-7 shadow-2xl transition-[transform,box-shadow,opacity] duration-500 ease-out ${
                    isActive
                      ? "scale-100 opacity-100 shadow-navy/25"
                      : "scale-95 opacity-70 shadow-navy/10"
                  }`}
                >
                  <CardBody s={s} isActive={isActive} t={t} />
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-x">
        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label={t.solutions.title}
          aria-live="polite"
          aria-atomic="false"
          className="relative mt-8 hidden md:block"
          {...containerProps}
        >
          <button
            type="button"
            onClick={() => setSlide((active - 1 + n) % n)}
            aria-label={t.solutions.prev}
            className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/90 p-3 text-navy shadow-lg shadow-navy/10 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal flex lg:-left-8 xl:-left-16"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setSlide((active + 1) % n)}
            aria-label={t.solutions.next}
            className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/90 p-3 text-navy shadow-lg shadow-navy/10 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal flex lg:-right-8 xl:-right-16"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>

          <div
            className="grid touch-pan-y gap-6 md:grid-cols-3 md:[grid-template-rows:auto_auto_auto_auto_auto]"
            {...swipeHandlers}
          >
            {solutions.map((s, i) => {
              const isActive = i === active;
              const slot = slotOf(i);
              return (
                <article
                  key={`${s.name}-${slot}`}
                  onClick={() => setSlide(i)}
                  aria-current={isActive}
                  style={{
                    ["--slide-from" as string]: slideFromFor(i, slot),
                  }}
                  className={`group relative cursor-pointer grid-rows-[auto_auto_auto_auto_auto] gap-6 overflow-hidden rounded-3xl bg-white p-7 shadow-2xl shadow-navy/10 transition-[transform,box-shadow,opacity] duration-500 ease-out md:row-span-5 md:grid md:animate-card-slide-in md:[grid-row:span_5] md:[grid-template-rows:subgrid] ${orderClass[slot]} ${
                    isActive
                      ? "md:z-10 md:scale-105 md:opacity-100 md:shadow-2xl md:shadow-navy/25"
                      : "md:scale-95 md:opacity-90 md:shadow-lg md:shadow-navy/5 md:hover:brightness-105"
                  }`}
                >
                  {!isActive && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 group-hover:opacity-40"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.20) 100%)",
                        backdropFilter: "blur(3px) saturate(140%)",
                        WebkitBackdropFilter: "blur(3px) saturate(140%)",
                      }}
                    />
                  )}
                  <CardBody s={s} isActive={isActive} t={t} />
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div
        role="tablist"
        aria-label={t.solutions.title}
        className="mt-16 flex items-center justify-center gap-2"
      >
        {solutions.map((s, i) => (
          <button
            key={s.name}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-label={`${t.solutions.see} ${s.name}`}
            onClick={() => setSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-8 bg-teal" : "w-2 bg-navy/20 hover:bg-navy/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function CardBody({
  s,
  isActive,
  t,
}: {
  s: {
    name: string;
    text: string;
    img: string;
    accuracy: number;
    href: string;
  };
  isActive: boolean;
  t: ReturnType<typeof useI18n>["t"];
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-bold leading-tight text-navy sm:text-3xl">
          {s.name}
        </h3>
        <a
          href={s.href}
          onClick={(e) => e.stopPropagation()}
          aria-label={`${t.solutions.see} ${s.name}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan text-navy transition hover:bg-cyan/80"
        >
          <Plus className="h-5 w-5" />
        </a>
      </div>

      <p className="text-base leading-snug text-muted">{s.text}</p>

      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-sky-50">
        <Image
          src={s.img}
          alt={s.name}
          fill
          sizes="(max-width: 768px) 82vw, 33vw"
          className={`object-contain p-3 transition-transform duration-500 ${
            isActive ? "scale-125" : "scale-110"
          }`}
        />
      </div>

      <PrecisionBadge
        value={s.accuracy}
        label={t.solutions.precision}
        variant="card"
        active={isActive}
      />

      <a
        href={s.href}
        onClick={(e) => e.stopPropagation()}
        className="btn-primary self-end"
      >
        {t.solutions.seeHow}
      </a>
    </>
  );
}
