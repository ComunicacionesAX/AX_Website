"use client";

import { useEffect, useState } from "react";

/** False on reduced-motion, Data Saver, or slow connection (2g/3g). */
export function useCanPlayVideo(): boolean {
  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      if (!conn) {
        setCanPlay(true);
        return;
      }
      if (conn.saveData) {
        setCanPlay(false);
        return;
      }
      const slow = ["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "");
      setCanPlay(!slow);
    };

    check();
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
