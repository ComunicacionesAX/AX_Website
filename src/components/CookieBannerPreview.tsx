"use client";

import { useEffect, useState } from "react";
import { CookieBanner } from "@/components/CookieBanner";

/**
 * Wrapper de preview del CookieBanner. Sólo lo renderiza cuando la URL
 * contiene `?cookies=1` o `?cookies=preview`. Además limpia el
 * localStorage relevante al montar, para que el banner aparezca aunque
 * el usuario ya lo haya aceptado en la misma sesión.
 *
 * En producción, sustituir por `<CookieBanner />` directo en layout.
 */
export function CookieBannerPreview() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("cookies");
    if (flag === "1" || flag === "preview") {
      // Limpia consentimiento previo para que el banner aparezca.
      try {
        localStorage.removeItem("asimetrix-cookie-consent-v1");
      } catch {
        // Ignora quota errors.
      }
      setVisible(true);
    }
  }, []);

  if (!visible) return null;
  return <CookieBanner />;
}
