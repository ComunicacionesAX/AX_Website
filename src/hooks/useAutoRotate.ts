"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Duración entre cambios de slide, en ms. */
  intervalMs?: number;
  /** Si true, se detiene permanentemente al primer click manual. */
  stopOnInteract?: boolean;
  /**
   * Duración extra (ms) que se suma al `intervalMs` cuando el carrusel
   * está en la última card y va a saltar a la primera. Da tiempo al
   * usuario de asimilar el "final" antes de reiniciar el loop.
   */
  loopBackDelayMs?: number;
  /**
   * Si el usuario interactúa y `stopOnInteract` está activo, reanuda el
   * autoplay tras `resumeAfterMs` de inactividad (en ms). Si no se
   * pasa, la detención es permanente. Ejemplo: 7000 → tras 7s sin
   * tocar nada, vuelve a rotar. Útil para carruseles hero donde el
   * usuario podría solo pasar de largo.
   */
  resumeAfterMs?: number;
};

/**
 * Auto-rotación para carruseles.
 *
 * Comportamiento:
 * - Avanza al siguiente slide cada `intervalMs` (default 5000).
 * - Se pausa cuando el usuario hace hover sobre el contenedor.
 * - Se pausa cuando la pestaña no está visible.
 * - Respeta `prefers-reduced-motion` (no rota).
 * - Con `stopOnInteract`, un click en un dot manual la detiene definitivamente
 *   (patrón WCAG 2.2.2 — el usuario recupera el control).
 *
 * Retorna `{slide, setSlide, containerProps}`:
 * - `containerProps` se esparce sobre el elemento contenedor del carrusel
 *   (registra listeners de hover).
 * - `setSlide` cambia de slide manualmente (y detiene autoplay si stopOnInteract).
 */
export function useAutoRotate(total: number, options: Options = {}) {
  const {
    intervalMs = 5000,
    stopOnInteract = true,
    loopBackDelayMs = 3000,
    resumeAfterMs,
  } = options;
  const [slide, setSlideState] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (total <= 1 || stopped || paused) {
      clearTimer();
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // setTimeout en vez de setInterval — así el delay depende del slide
    // actual: cuando llegamos al final del carrusel, damos un beat extra
    // antes de volver al inicio, para que el "reset" no se sienta abrupto.
    const isLast = slide === total - 1;
    const delay = intervalMs + (isLast ? loopBackDelayMs : 0);

    timerRef.current = setTimeout(() => {
      setSlideState((prev) => (prev + 1) % total);
    }, delay);

    return clearTimer;
  }, [total, paused, stopped, intervalMs, loopBackDelayMs, slide]);

  // Pausa cuando la pestaña queda en background — evita "saltos" al volver.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const setSlide = (idx: number) => {
    setSlideState(idx);
    if (stopOnInteract) {
      setStopped(true);
      // Si hay `resumeAfterMs`, programa reanudación tras N ms de
      // inactividad. Cualquier nueva interacción reinicia el timer.
      if (resumeAfterMs) {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
          setStopped(false);
        }, resumeAfterMs);
      }
    }
  };

  // Limpieza del resume timer al desmontar.
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Progress 0..1 del slide actual — útil para pintar barras de
  // "tiempo restante". Se resetea a 0 en cada cambio de slide y avanza
  // hasta 1 con la duración correspondiente (intervalMs + loopBackDelayMs
  // si es la última). Cuando `stopped` o `paused`, el progreso se
  // congela en su valor actual.
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Cancela cualquier RAF previo antes de arrancar uno nuevo.
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Sin animación si está pausado, detenido o poco slides.
    if (total <= 1 || stopped || paused) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    const isLast = slide === total - 1;
    const dur = intervalMs + (isLast ? loopBackDelayMs : 0);
    const start = performance.now();
    setProgress(0);

    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / dur);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [slide, total, stopped, paused, intervalMs, loopBackDelayMs]);

  return {
    slide,
    setSlide,
    /**
     * Progreso 0..1 del slide actual. 0 al iniciar cada slide, 1 al
     * completar. Ideal para pintar una barra "de llenado" que
     * sincroniza con el autoplay. Congelado cuando `stopped` o `paused`.
     */
    progress,
    containerProps: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      // Pausa también cuando el foco por teclado entra al contenedor.
      // WCAG 2.2.2 — el usuario que navega con Tab necesita que el
      // auto-rotate no le pelee la lectura. onBlur reanuda cuando el
      // foco sale del contenedor completo.
      onFocus: () => setPaused(true),
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        // e.currentTarget = contenedor, relatedTarget = próximo foco.
        // Si el nuevo foco sigue dentro del contenedor, no despausar.
        if (
          e.relatedTarget &&
          e.currentTarget.contains(e.relatedTarget as Node)
        ) {
          return;
        }
        setPaused(false);
      },
    },
  };
}
