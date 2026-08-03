"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { LangToggle } from "./LangToggle";

function Instagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function Linkedin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
    </svg>
  );
}

type FooterProps = {
  /** Si true, omite las esquinas superiores redondeadas. Útil en páginas
   *  como /poder-del-saber donde el contenido previo termina en un
   *  gradient hacia navy y las curvas exponen parches del fondo. */
  flushTop?: boolean;
};

export function Footer({ flushTop = false }: FooterProps = {}) {
  const { t } = useI18n();
  const columns = [t.footer.colProducts, t.footer.colSaber];
  return (
    <footer
      className={`on-dark relative px-6 pt-10 pb-8 text-white sm:px-10 lg:px-16 lg:pt-14 lg:pb-10 ${
        flushTop ? "" : "rounded-t-3xl"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--color-navy) 0%, var(--color-teal) 65%, color-mix(in srgb, var(--color-cyan) 40%, var(--color-teal)) 100%)",
      }}
    >
        <div className="container-x !px-0">
          {/* Layout desktop: 4 columnas (Logo+redes | Cotizar | Productos | Saber | Login+idioma).
              Mobile: Login+idioma primero, luego Cotizar, luego Productos, Saber, y Logo al final. */}
          
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-x-10">
            {/* Columna 1 — Logo + redes sociales. Desktop: izquierda.
                Mobile: al final del footer (order-last). */}
            <div className="order-last flex justify-center lg:order-none lg:justify-start lg:self-start lg:pr-10">
              <div className="inline-flex flex-col items-center gap-4">
                
                <Image
                  src="/images/logo_ax_completo-trimmed.svg"
                  alt={t.footer.logoAlt}
                  width={542}
                  height={130}
                  className="block h-14 w-auto sm:h-16 lg:h-20"
                />
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/asimetrix_?igsh=eXFjbmN1a2J0bnpq&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cyan transition hover:bg-white/10"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/asimetrix/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cyan transition hover:bg-white/10"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                
                <div className="mt-4">
                  <LangToggle />
                </div>
              </div>
            </div>

            {columns.map((col, i) => (
              <div key={col.title} className={`lg:pt-4 ${i === 0 ? "order-3 lg:order-none" : "order-4 lg:order-none"}`}>
                <h4 className="text-lg font-semibold text-white">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...("external" in l && l.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-white/70 transition hover:text-cyan"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="order-2 flex flex-col items-start text-left lg:order-none lg:pt-4">
              <a
                href="/cotizar"
                className="text-lg font-semibold text-white transition-colors hover:text-cyan"
              >
                {t.footer.quoteTitle}
              </a>
              <a
                href="/cotizar"
                className="mt-2 max-w-sm text-sm text-white/70 transition-colors hover:text-cyan"
              >
                {t.footer.quoteText}
              </a>
            </div>

            <div className="order-first flex lg:order-none lg:items-start lg:pt-4">
              <a
                href="https://app.asimetrix.co/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan px-6 py-3 text-base font-semibold text-navy shadow-lg shadow-cyan/25 transition hover:bg-cyan/90 lg:w-auto"
              >
                {t.nav.login}
                <ExternalLink aria-hidden="true" className="h-4 w-4 opacity-80" />
              </a>
            </div>
          </div>

          {/* Barra inferior: legal centrado. */}
          <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/10 pt-6 text-center text-sm text-white/70">
            <p className="text-pretty">{t.footer.legal}</p>
          </div>
        </div>
    </footer>
  );
}
