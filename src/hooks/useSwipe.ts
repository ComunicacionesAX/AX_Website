"use client";

import { useRef } from "react";

type Options = {
  /** Distancia mínima (px) para contar como swipe. */
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

/**
 * Detección de swipe horizontal touch-only. Retorna handlers para spread
 * sobre el elemento que captura el gesto.
 *
 * - Ignora movimientos con más desplazamiento vertical que horizontal
 *   (deja pasar el scroll de la página).
 * - `threshold` default 40px — ni tan sensible que dispare con toques,
 *   ni tan alto que exija movimientos largos.
 */
export function useSwipe({
  threshold = 40,
  onSwipeLeft,
  onSwipeRight,
}: Options) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (!start.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.current.x;
      const dy = t.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) < threshold) return;
      if (Math.abs(dy) > Math.abs(dx)) return; // scroll vertical
      if (dx < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    },
  };
}
