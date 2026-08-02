"use client";

import { useEffect, useState } from "react";

/**
 * Determina si el usuario puede reproducir video de fondo sin costo
 * o interrupción. Retorna `true` si:
 *   - No hay `prefers-reduced-motion: reduce` activo.
 *   - `navigator.connection.saveData` es false o no está disponible.
 *   - El tipo de conexión efectiva es 4g/wifi (no 2g/3g/slow-2g).
 *
 * Cuando devuelve `false`, el consumidor debería mostrar sólo el
 * poster estático — evita cargar MP4 pesados en conexiones lentas o
 * cuando el usuario ha pedido ahorrar data (Data Saver).
 *
 * NOTA: `navigator.connection` es NetworkInformation API, disponible
 * en Chromium (Chrome, Edge, Opera, Android). En Safari/Firefox
 * retorna `undefined` — en ese caso asumimos que hay banda ancha.
 */
export function useCanPlayVideo(): boolean {
  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      // Reduced motion → nunca autoplay.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setCanPlay(false);
        return;
      }

      const nav = navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
          addEventListener?: (event: string, cb: () => void) => void;
          removeEventListener?: (event: string, cb: () => void) => void;
        };
      };
      const conn = nav.connection;

      // Sin NetworkInformation API — asume banda ancha.
      if (!conn) {
        setCanPlay(true);
        return;
      }

      // Data Saver activo → no autoplay.
      if (conn.saveData) {
        setCanPlay(false);
        return;
      }

      // Conexión lenta → no autoplay.
      const slow = ["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "");
      setCanPlay(!slow);
    };

    check();

    // Re-check si cambia la conexión (móvil que cambia de wifi a 4g etc).
    const nav = navigator as Navigator & {
      connection?: {
        addEventListener?: (event: string, cb: () => void) => void;
        removeEventListener?: (event: string, cb: () => void) => void;
      };
    };
    const conn = nav.connection;
    conn?.addEventListener?.("change", check);
    return () => conn?.removeEventListener?.("change", check);
  }, []);

  return canPlay;
}
