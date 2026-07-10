"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const products = [
  { name: "PigVision", desc: "Cámara para pesar cerdos en ceba", href: "/pigvision" },
  { name: "Insylo", desc: "Control del alimento y consumo", href: "/insylo" },
  { name: "Sensores Ambientales", desc: "Ambiente bajo control", href: "/nodos" },
  // SmartWeight oculto hasta que la sección esté lista
];

export function Header() {
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

  const solid = scrolled || mobile;
  const linkColor = solid ? "text-navy" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[92px] items-center justify-between gap-6">
        <a href="/" aria-label="Ir al inicio" className="flex items-center">
          <Logo variant={solid ? "dark" : "cyan"} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition hover:opacity-80 ${linkColor}`}
            >
              Productos
              <ChevronDown
                className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
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
                <div className="fixed inset-x-0 top-[92px] z-50 border-y border-white/20 bg-white/10 shadow-2xl shadow-navy/30 backdrop-blur-2xl backdrop-saturate-150 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.15),rgba(255,255,255,0.05))]">
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
            href="/#poder"
            className={`rounded-full px-4 py-2 text-[15px] font-medium transition hover:opacity-80 ${linkColor}`}
          >
            El poder del saber
          </a>
          <a
            href="/#cotizar"
            className={`rounded-full px-4 py-2 text-[15px] font-medium transition hover:opacity-80 ${linkColor}`}
          >
            Cotizar
          </a>
        </nav>

        <div className="hidden flex-col items-end lg:flex">
          <a
            href="https://app.asimetrix.co/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-8 py-2 text-[15px] font-semibold transition ${
              solid
                ? "bg-navy text-white hover:bg-navy-800"
                : "bg-white text-navy hover:bg-white/90"
            }`}
          >
            Login
          </a>
          <div
            className={`mt-1.5 flex w-full items-center justify-center gap-1.5 text-xs ${linkColor}`}
          >
            <button className="font-medium underline underline-offset-2">ES</button>
            <span className="opacity-30">|</span>
            <button className="opacity-60 transition hover:opacity-100">EN</button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className={`rounded-lg p-2 lg:hidden ${linkColor}`}
          onClick={() => setMobile((v) => !v)}
          aria-label="Menú"
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            <span className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-teal">
              Productos
            </span>
            {products.map((p) => (
              <a
                key={p.name}
                href={p.href}
                onClick={() => setMobile(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-navy"
              >
                {p.name}
              </a>
            ))}
            <a
              href="/#poder"
              onClick={() => setMobile(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-navy"
            >
              El poder del saber
            </a>
            <a
              href="/#cotizar"
              onClick={() => setMobile(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-navy"
            >
              Cotizar
            </a>
            <a
              href="https://app.asimetrix.co/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobile(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-navy/20 px-5 py-3 text-sm font-semibold text-navy"
            >
              Login
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
