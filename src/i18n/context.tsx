"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Lang, type Dictionary } from "./dictionary";

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "ax-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Siempre inicia en "es" para que el render del servidor coincida con el
  // primer render del cliente (evita errores de hidratación). El idioma real
  // guardado se aplica tras el montaje.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "es" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dictionary[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return ctx;
}
