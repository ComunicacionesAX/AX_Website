"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronDown, Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";
import { LangToggle } from "./LangToggle";
import { useI18n } from "@/i18n/context";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function Header() {
  const { t } = useI18n();
  const products = t.nav.productItems;
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Producto sobre el que hay hover en el dropdown — controla el preview
  // grande. Se inicializa con el primero para que el preview se vea al abrir.
  const [hoveredProduct, setHoveredProduct] = useState<string>(
    products[0]?.name ?? "",
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Focus trap para los menús portalizados: aísla el foco por teclado
  // dentro del panel abierto (WCAG 2.4.3). Escape cierra el menú.
  const productsMenuRef = useFocusTrap<HTMLDivElement>(
    open,
    () => setOpen(false),
  );
  const mobileMenuRef = useFocusTrap<HTMLDivElement>(
    mobile,
    () => setMobile(false),
  );

  // Al abrir el menú, resetea el preview al primer producto.
  useEffect(() => {
    if (open && products[0]) setHoveredProduct(products[0].name);
  }, [open, products]);

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
      className={`on-dark fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/70 backdrop-blur-2xl backdrop-saturate-150 transition-shadow duration-300 supports-[backdrop-filter]:bg-navy/50 ${
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
      <div className="container-x flex h-[76px] items-center justify-between gap-6 lg:h-[92px]">
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
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-base font-medium transition hover:opacity-80 ${linkColor}`}
            >
              {t.nav.products}
              <ChevronDown
                className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {open &&
              mounted &&
              createPortal(
                <>
                  
                  <div
                    className="fixed inset-0 z-[100]"
                    onClick={() => setOpen(false)}
                    aria-hidden
                  />
                  
                  <div
                    ref={productsMenuRef}
                    id="products-menu"
                    className="on-dark fixed inset-x-0 top-[92px] z-[110] animate-slide-down border-b border-white/10 text-white shadow-2xl shadow-navy/60 [-webkit-backdrop-filter:blur(60px)_saturate(180%)] [backdrop-filter:blur(60px)_saturate(180%)]"
                    style={{
                      background: "rgba(4, 9, 57, 0.35)",
                      boxShadow:
                        "inset 0 1px 0 0 rgba(255,255,255,0.15), 0 24px 48px -12px rgba(4,9,57,0.5)",
                    }}
                  >
                    <div className="container-x py-8">
                      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12">
                        
                        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl bg-sky ring-1 ring-white/20 md:block">
                          {products.map((p) => (
                            <Image
                              key={p.name}
                              src={p.img}
                              alt=""
                              fill
                              sizes="(max-width: 1024px) 40vw, 500px"
                              aria-hidden="true"
                              className={`object-contain p-3 transition-opacity duration-300 ${
                                p.name === hoveredProduct
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Lista de productos — flex-col, sin thumbnails a la
                            izquierda (el preview grande hace ese trabajo). */}
                        <ul className="flex flex-col justify-center gap-2">
                          {products.map((p) => (
                            <li key={p.name}>
                              <a
                                href={p.href}
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => setHoveredProduct(p.name)}
                                onFocus={() => setHoveredProduct(p.name)}
                                className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors ${
                                  p.name === hoveredProduct
                                    ? "bg-white/10"
                                    : "hover:bg-white/5"
                                }`}
                              >
                                <div className="min-w-0 flex-1">
                                  <div
                                    className={`text-xl font-semibold transition-colors sm:text-2xl ${
                                      p.name === hoveredProduct
                                        ? "text-cyan"
                                        : "text-white"
                                    }`}
                                  >
                                    {p.name}
                                  </div>
                                  <div className="mt-0.5 text-base text-white/70">
                                    {p.desc}
                                  </div>
                                </div>
                                <ArrowRight
                                  aria-hidden="true"
                                  className={`h-5 w-5 shrink-0 text-cyan transition-all duration-300 ${
                                    p.name === hoveredProduct
                                      ? "translate-x-0 opacity-100"
                                      : "-translate-x-2 opacity-0"
                                  }`}
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>,
                document.body,
              )}
          </div>

          <a
            href="/poder-del-saber"
            className={`rounded-full px-4 py-2 text-base font-medium transition hover:opacity-80 ${linkColor}`}
          >
            {t.nav.saber}
          </a>
          <a
            href="/cotizar"
            className={`rounded-full px-4 py-2 text-base font-medium transition hover:opacity-80 ${linkColor}`}
          >
            {t.nav.quote}
          </a>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="https://app.asimetrix.co/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            {t.nav.login}
            <ExternalLink
              aria-hidden="true"
              className="h-4 w-4 opacity-70"
            />
          </a>
          <LangToggle />
        </div>

        {/* Mobile: menú */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            className={`rounded-lg p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${linkColor}`}
            onClick={() => setMobile((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
          >
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — vía portal para que el backdrop-filter se aplique
          sobre el hero (no sobre el header padre que también tiene blur). */}
      {mobile &&
        mounted &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[100] lg:hidden"
              onClick={() => setMobile(false)}
              aria-hidden
            />
            <div
              ref={mobileMenuRef}
              id="mobile-menu"
              className="on-dark fixed inset-x-0 top-[76px] z-[110] animate-slide-down border-b border-white/10 text-white shadow-2xl shadow-navy/60 [-webkit-backdrop-filter:blur(80px)_saturate(180%)] [backdrop-filter:blur(80px)_saturate(180%)] lg:hidden lg:top-[92px]"
              style={{
                background: "rgba(4, 9, 57, 0.75)",
                boxShadow:
                  "inset 0 1px 0 0 rgba(255,255,255,0.12), 0 24px 48px -12px rgba(4,9,57,0.6)",
              }}
            >
              <nav className="container-x flex flex-col py-4">
                <span className="px-2 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-cyan">
                  {t.nav.products}
                </span>
                <ul className="flex flex-col divide-y divide-white/5">
                  {products.map((p) => (
                    <li key={p.name}>
                      <a
                        href={p.href}
                        onClick={() => setMobile(false)}
                        className="group grid grid-cols-[56px_1fr_auto] items-center gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-white/5"
                      >
                        <div
                          aria-hidden="true"
                          className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-sky ring-1 ring-white/20"
                        >
                          <Image
                            src={p.img}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-contain p-1.5"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-base font-semibold text-white group-hover:text-cyan">
                            {p.name}
                          </div>
                          <div className="mt-0.5 truncate text-sm text-white/70">
                            {p.desc}
                          </div>
                        </div>
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-cyan/70"
                        />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 flex flex-col gap-1 border-t border-white/10 pt-3">
                  <a
                    href="/poder-del-saber"
                    onClick={() => setMobile(false)}
                    className="rounded-lg px-2 py-2 text-base font-medium text-white"
                  >
                    {t.nav.saber}
                  </a>
                  <a
                    href="/cotizar"
                    onClick={() => setMobile(false)}
                    className="rounded-lg px-2 py-2 text-base font-medium text-white"
                  >
                    {t.nav.quote}
                  </a>
                </div>

                {/* CTA login mobile — glacier glass del DS: fondo cyan
                    translúcido con backdrop-blur, hover eleva y satura. */}
                <a
                  href="https://app.asimetrix.co/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobile(false)}
                  className="btn-glacier-glass mt-4 w-full"
                >
                  {t.nav.login}
                  <ExternalLink
                    aria-hidden="true"
                    className="h-4 w-4 opacity-70"
                  />
                </a>
                {/* Toggle idioma — centrado con el CTA de arriba. */}
                <div className="mt-4 flex justify-center">
                  <LangToggle />
                </div>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
