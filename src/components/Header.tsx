"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LangSwitch } from "./LangSwitch";
import { useI18n } from "@/i18n/context";

export function Header() {
  const { t } = useI18n();
  const products = t.nav.productItems;
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Cierra el menú de Productos al hacer scroll
      setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra menús con la tecla Escape (accesibilidad de teclado).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // El menú se mantiene siempre azul con efecto glass; al hacer scroll se
  // vuelve un poco más opaco para reforzar la legibilidad.
  const linkColor = "text-white";

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/80 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 ${
        scrolled || mobile ? "shadow-lg shadow-navy/30" : ""
      }`}
    >
      {/* Saltar al contenido — solo visible al enfocar con teclado */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lg"
      >
        {t.nav.skipToContent}
      </a>
      <div className="container-x flex h-[92px] items-center justify-between gap-6">
        <a href="/" aria-label={t.nav.goHome} className="flex items-center">
          <Logo variant="cyan" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="products-menu"
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition hover:opacity-80 ${linkColor}`}
            >
              {t.nav.products}
              <ChevronDown
                className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {open && (
              <>
                {/* Click-outside backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpen(false)}
                  aria-hidden
                />
                <div id="products-menu" className="fixed inset-x-0 top-[92px] z-50 border-b border-white/10 bg-navy/80 shadow-2xl shadow-navy/30 backdrop-blur-xl backdrop-saturate-150">
                  <div className="container-x flex flex-col py-4">
                    {products.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        onClick={() => setOpen(false)}
                        className="group rounded-lg px-4 py-3 transition hover:bg-white/10"
                      >
                        <div className="text-base font-semibold text-white transition [text-shadow:0_1px_3px_rgba(4,9,57,0.5)] group-hover:text-cyan">
                          {p.name}
                        </div>
                        <div className="text-sm text-white/90 [text-shadow:0_1px_2px_rgba(4,9,57,0.4)]">
                          {p.desc}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <a
            href="/poder-del-saber"
            className={`rounded-full px-4 py-2 text-[15px] font-medium transition hover:opacity-80 ${linkColor}`}
          >
            {t.nav.saber}
          </a>
          <a
            href="/cotizar"
            className={`rounded-full px-4 py-2 text-[15px] font-medium transition hover:opacity-80 ${linkColor}`}
          >
            {t.nav.quote}
          </a>
        </nav>

        <div className="hidden flex-col items-end lg:flex">
          <div className="flex items-center gap-2">
            <a
              href="https://app.asimetrix.co/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-2 text-[15px] font-semibold text-navy transition hover:bg-white/90"
            >
              {t.nav.login}
            </a>
          </div>
          <LangSwitch
            className={`mt-1.5 w-full justify-center text-xs ${linkColor}`}
          />
        </div>

        {/* Mobile: menú */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            className={`rounded-lg p-2 ${linkColor}`}
            onClick={() => setMobile((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
          >
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div id="mobile-menu" className="border-t border-white/10 bg-navy/90 backdrop-blur-xl lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            <span className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-cyan">
              {t.nav.products}
            </span>
            {products.map((p) => (
              <a
                key={p.name}
                href={p.href}
                onClick={() => setMobile(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-white"
              >
                {p.name}
              </a>
            ))}
            <a
              href="/poder-del-saber"
              onClick={() => setMobile(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-white"
            >
              {t.nav.saber}
            </a>
            <a
              href="/cotizar"
              onClick={() => setMobile(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-white"
            >
              {t.nav.quote}
            </a>
            <a
              href="https://app.asimetrix.co/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobile(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy"
            >
              {t.nav.login}
            </a>
            <LangSwitch className="mt-3 px-2 text-sm text-white" />
          </nav>
        </div>
      )}
    </header>
  );
}
