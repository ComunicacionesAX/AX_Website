"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/context";

const DISMISS_KEY = "onix-dismissed";

/**
 * Widget flotante para Onix (asistente conversacional de Asimetrix).
 *
 * Dos estados:
 *   1. `visible=true` (default): pill grande con logo + copy + link a onix.asimetrix.co.
 *      Se puede cerrar con la X → guarda dismissal en sessionStorage.
 *   2. `visible=false` (dismissed): pill chico con solo el icono Onix,
 *      permite reabrir el widget completo. Sigue apareciendo (más discreto)
 *      para que el usuario pueda recuperarlo dentro de la misma sesión.
 *
 * `sessionStorage` en vez de `localStorage`: el dismissal dura sólo la
 * sesión del navegador. Al abrir el sitio en pestaña nueva vuelve a estar.
 */
export function OnixButton() {
  const { t } = useI18n();
  const [visible, setVisible] = useState<boolean | null>(null);

  // Hidratación: leemos sessionStorage sólo en cliente. `null` inicial
  // evita hydration mismatch (SSR renderiza nada, cliente decide).
  useEffect(() => {
    if (typeof window === "undefined") return;
    setVisible(sessionStorage.getItem(DISMISS_KEY) !== "1");
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  const reopen = () => {
    sessionStorage.removeItem(DISMISS_KEY);
    setVisible(true);
  };

  if (visible === null) return null;

  // Estado dismissed → pill mini con solo el icono. Botón "restaurar".
  // Wrapper con role="status" aria-live="polite" para anunciar el
  // cambio de estado a screen readers cuando el usuario cierra el
  // widget (WCAG 4.1.3 — Status messages).
  if (!visible) {
    return (
      <div role="status" aria-live="polite" className="contents">
      <button
        type="button"
        onClick={reopen}
        aria-label={t.onix.reopen}
        className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy/90 shadow-xl shadow-navy/30 ring-1 ring-white/15 backdrop-blur-sm transition hover:scale-105 hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
      >
        {/* Logo Onix — mismo que el widget completo, así se reconoce. */}
        <Image
          src="/images/logo_onix.svg"
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
          className="h-10 w-10 object-contain"
        />
        {/* Ícono chat superpuesto abajo-derecha — pista visual de que
            al clic se despliega algo, no que abre onix.asimetrix.co directo. */}
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan text-navy shadow-md ring-2 ring-navy">
          <MessageCircle className="h-3 w-3" aria-hidden="true" />
        </span>
      </button>
      </div>
    );
  }

  // Estado default → widget completo con logo + copy + link + X.
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <a
        href="https://onix.asimetrix.co/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.onix.label}
        className="group flex items-center gap-3 rounded-full bg-navy/90 py-2 pl-2 pr-5 shadow-xl shadow-navy/30 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-navy"
      >
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-navy">
          <Image
            src="/images/logo_onix.svg"
            alt="Onix"
            width={48}
            height={48}
            className="h-11 w-11 object-contain transition group-hover:scale-105"
          />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-cyan">{t.onix.title}</span>
          <span className="text-xs text-white/80">{t.onix.subtitle}</span>
        </span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t.onix.close}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/80 text-white/80 shadow-lg ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-navy hover:text-white"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
