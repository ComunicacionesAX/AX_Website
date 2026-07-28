"use client";

import { useI18n } from "@/i18n/context";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role="group"
      aria-label="Idioma / Language"
    >
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        lang="es"
        className={
          lang === "es"
            ? "rounded px-1 font-medium underline underline-offset-2"
            : "rounded px-1 opacity-60 transition hover:opacity-100"
        }
      >
        ES
      </button>
      <span className="opacity-30" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        lang="en"
        className={
          lang === "en"
            ? "rounded px-1 font-medium underline underline-offset-2"
            : "rounded px-1 opacity-60 transition hover:opacity-100"
        }
      >
        EN
      </button>
    </div>
  );
}
