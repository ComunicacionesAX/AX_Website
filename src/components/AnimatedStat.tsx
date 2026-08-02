"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /**
   * String completo del stat (ej: "+1000 personas", "+ 600 millones").
   * Extraemos el primer número entero, animamos 0 → n, y preservamos
   * cualquier prefijo (`+`, `+ `) y sufijo (` personas`, ` millones`).
   */
  value: string;
  /** Duración de la animación en ms. */
  duration?: number;
  /**
   * Si true, fuerza que el sufijo (unidad, e.g. "personas") vaya en
   * una segunda línea SIEMPRE, para evitar saltos visuales cuando el
   * número crece durante la animación (99 → 1000 pasa de 1 → 2 líneas).
   */
  forceTwoLines?: boolean;
  className?: string;
};

/**
 * Cifra animada de 0 → n al entrar al viewport.
 *
 * Preserva formato:
 *   "+1000 personas"    → "0 personas" → ... → "+1000 personas"
 *   "+ 600 millones"    → "0 millones" → ... → "+ 600 millones"
 *   "1.5M usuarios"     → "0 usuarios" → ... → "1.5M usuarios"
 *
 * Respeta prefers-reduced-motion (salta a valor final).
 * Usa IntersectionObserver para disparar cuando la cifra es visible.
 */
export function AnimatedStat({
  value,
  duration = 1600,
  forceTwoLines = false,
  className = "",
}: Props) {
  // Extraemos el primer número (entero) del string. Todo lo demás
  // queda como parte del "template" que renderizamos alrededor.
  const match = value.match(/(\d[\d,.]*)/);
  const numeric = match ? parseInt(match[1].replace(/[,.]/g, ""), 10) : 0;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : value;

  const ref = useRef<HTMLSpanElement | null>(null);
  const [current, setCurrent] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCurrent(numeric);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const step = (t: number) => {
              const elapsed = t - start;
              const p = Math.min(1, elapsed / duration);
              // easeOutCubic — arranca rápido, desacelera al final.
              const eased = 1 - Math.pow(1 - p, 3);
              setCurrent(Math.round(numeric * eased));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [numeric, duration]);

  if (forceTwoLines) {
    const unitMatch = suffix.match(/^\s+(.+)$/);
    const unit = unitMatch ? unitMatch[1] : suffix;
    return (
      <span
        ref={ref}
        className={`${className} block text-center sm:text-left`}
        aria-label={value}
      >
        <span aria-hidden="true" className="inline">
          {prefix}
          <span className="tabular-nums">
            {current.toLocaleString("es-CO")}
          </span>
        </span>
        {unit && (
          <>
            {/* Mobile: <br /> visible; desktop: espacio no-breakable. */}
            <br className="sm:hidden" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="inline"
            >
              <span className="hidden sm:inline">&nbsp;</span>
              {unit}
            </span>
          </>
        )}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        <span className="tabular-nums">{current.toLocaleString("es-CO")}</span>
        {suffix}
      </span>
    </span>
  );
}
