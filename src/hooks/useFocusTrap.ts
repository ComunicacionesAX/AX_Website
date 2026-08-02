"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Atrapa el foco por teclado dentro de un contenedor mientras está
 * activo. Diseñado para modales y dialogs — patrón WAI-ARIA:
 *
 *   1. Al montarse: guarda el elemento con foco previo y mueve el foco
 *      al primer elemento focuseable dentro del contenedor.
 *   2. Mientras está activo: intercepta Tab / Shift+Tab para hacer
 *      wrap dentro del contenedor.
 *   3. Escape cierra el dialog (opcional, via callback).
 *   4. Al desmontarse: devuelve el foco al elemento previo.
 *
 * Uso:
 *   const ref = useFocusTrap<HTMLDivElement>(open, onClose);
 *   return <div ref={ref} role="dialog">…</div>
 */
export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  onEscape?: () => void,
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Enfoca el primer elemento focuseable — o el contenedor mismo si
    // no hay ninguno (mantiene el foco dentro para el screen reader).
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      container.setAttribute("tabindex", "-1");
      container.focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (activeEl === first || !container.contains(activeEl)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Devuelve el foco al trigger que abrió el modal.
      previouslyFocused?.focus?.();
    };
  }, [active, onEscape]);

  return containerRef;
}
