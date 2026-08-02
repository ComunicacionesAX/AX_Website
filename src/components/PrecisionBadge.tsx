"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "hero" | "card";

type Props = {
  value: number;
  label: string;
  variant?: Variant;
  className?: string;
  /**
   * Modo de disparo de la animación:
   * - undefined (default): auto — al entrar al viewport (IntersectionObserver).
   * - true: anima hasta `value`.
   * - false: mantiene el valor final estático (no anima, no resetea).
   *
   * Uso: en el carrusel del home pasar `active={i === activeSlide}` para que
   * sólo la card del centro anime al llegar. Las laterales muestran su valor
   * pero no animan.
   */
  active?: boolean;
};

const DURATION_MS = 1400;

export function PrecisionBadge({
  value,
  label,
  variant = "hero",
  className = "",
  active,
}: Props) {
  const controlled = active !== undefined;
  const [progress, setProgress] = useState<number>(controlled ? value : 0);
  const ref = useRef<HTMLDivElement | null>(null);

  // Función común de animación — de 0 → value con easeOutCubic.
  const runAnimation = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(value);
      return () => {};
    }
    let raf = 0;
    let start = 0;
    setProgress(0);
    const step = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      const p = Math.min(1, elapsed / DURATION_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  };

  // Modo controlado — anima cada vez que `active` pasa a true.
  useEffect(() => {
    if (!controlled) return;
    if (active) return runAnimation();
    // No activo → muestra el valor final estático (para que las cards
    // laterales sigan viéndose completas, sólo la activa anima).
    setProgress(value);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, value, controlled]);

  // Modo auto — IntersectionObserver al entrar al viewport.
  useEffect(() => {
    if (controlled) return;
    const node = ref.current;
    if (!node) return;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cleanup = runAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, controlled]);

  const pctInt = Math.round(progress);

  if (variant === "card") {
    return (
      <div ref={ref} className={className}>
        {/* Progress bar — track sky, fill teal→cyan gradient con glow
            cyan sutil. Mismo tratamiento que la barra hero (mismos
            tokens de color, sólo cambia altura/track). */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-sky">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal to-cyan shadow-[0_0_6px_color-mix(in_srgb,var(--color-cyan)_60%,transparent)]"
            style={{
              width: `${progress}%`,
              transition: "none",
            }}
          />
        </div>
        <p
          className="mt-3 text-center text-navy"
          aria-label={`${value}% ${label}`}
        >
          <span
            className="font-display text-4xl font-bold leading-none tabular-nums tracking-tight"
            aria-hidden="true"
          >
            {pctInt}%
          </span>
          <br />
          <span className="mt-1 inline-block text-sm text-muted">{label}</span>
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {/* Hero variant — barra más gruesa y ancha, track white/20 sobre
          canvas oscuro. Fill teal→cyan gradient con glow cyan más
          intenso para lucir sobre navy. */}
      <div className="h-2 w-52 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal to-cyan shadow-[0_0_10px_color-mix(in_srgb,var(--color-cyan)_80%,transparent)]"
          style={{
            width: `${progress}%`,
            transition: "none",
          }}
        />
      </div>
      <div
        className="mt-4 font-display text-6xl font-bold leading-none tabular-nums tracking-tight sm:text-7xl"
        aria-label={`${value}% ${label}`}
      >
        <span aria-hidden="true">{pctInt}%</span>
      </div>
      <div className="mt-2 text-2xl font-light sm:text-3xl">{label}</div>
    </div>
  );
}
