"use client";

import { useI18n } from "@/i18n/context";

/**
 * Toggle switch de idioma tech — thumb cyan que se desliza sobre track
 * outline. Reemplaza al viejo `LangSwitch` (texto plano "ES | EN") en
 * Header y Footer.
 *
 * Ancho: auto por default (compacto). Pasa `className="w-full"` para que
 * se estire al ancho del contenedor (útil en drawer mobile donde queda
 * junto a un CTA full-width).
 */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const isEs = lang === "es";
  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={`relative inline-flex items-center rounded-full border border-white/20 bg-navy/40 p-0.5 backdrop-blur-sm ${className}`}
    >
      {/* Thumb — se desliza al lado activo. */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full bg-cyan shadow-[0_0_10px_rgba(151,244,255,0.5)] transition-transform duration-300 ease-out ${
          isEs ? "translate-x-0" : "translate-x-[calc(100%+2px)]"
        }`}
      />
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={isEs}
        aria-label="Español"
        lang="es"
        className={`relative z-10 flex-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          isEs ? "text-navy" : "text-white/70 hover:text-white"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={!isEs}
        aria-label="English"
        lang="en"
        className={`relative z-10 flex-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          !isEs ? "text-navy" : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
