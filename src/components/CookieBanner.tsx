"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck, BarChart3, Megaphone } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const STORAGE_KEY = "asimetrix-cookie-consent-v1";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: string;
};

/**
 * Banner de consentimiento de cookies — visible hasta que el usuario
 * elige una opción. Persiste el consentimiento en localStorage bajo
 * STORAGE_KEY. Diseño:
 *   - Barra full-width fija al bottom, fondo navy con borde superior cyan
 *     (matchea la referencia Iluma/DS Asimetrix on-dark).
 *   - Mensaje a la izquierda, botones a la derecha: "Cookie settings"
 *     (btn-secondary) y "Accept all cookies" (btn-primary teal).
 *   - Modal de configuración con toggles por categoría (necessary,
 *     analytics, marketing).
 *
 * NOTA: no llama a ningún tracker; sólo guarda la elección. Si más
 * adelante se integra Analytics/Marketing, esos scripts deben leer
 * localStorage[STORAGE_KEY] antes de inicializarse.
 */
export function CookieBanner() {
  const { t } = useI18n();
  const c = t.cookies;
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (consent: Omit<Consent, "ts">) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...consent, ts: new Date().toISOString() }),
      );
    } catch {
      // Ignora quota errors.
    }
  };

  const acceptAll = () => {
    persist({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
    setSettingsOpen(false);
  };

  const rejectAll = () => {
    persist({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
    setSettingsOpen(false);
  };

  const savePrefs = () => {
    persist({ necessary: true, analytics, marketing });
    setVisible(false);
    setSettingsOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      
      <div
        role="dialog"
        aria-label={c.settingsTitle}
        aria-live="polite"
        className="fixed inset-x-0 bottom-0 z-[120] rounded-t-3xl border-t-2 border-cyan/40 bg-navy text-white shadow-[0_-8px_32px_-4px_rgba(4,9,57,0.6)]"
      >
        <div className="container-x flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-6">
          <p className="max-w-3xl text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
            {c.message}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:shrink-0">
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/5 sm:w-auto"
            >
              {c.settings}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3 text-base font-semibold text-white transition hover:bg-teal-600 sm:w-auto"
            >
              {c.acceptAll}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de preferencias detalladas — con focus trap para
          navegación por teclado accesible. */}
      {settingsOpen && (
        <SettingsModal
          title={c.settingsTitle}
          intro={c.settingsIntro}
          onClose={() => setSettingsOpen(false)}
          onReject={rejectAll}
          onSave={savePrefs}
          rejectLabel={c.rejectAll}
          saveLabel={c.save}
          cancelLabel={c.cancel}
          catNecessaryTitle={c.catNecessaryTitle}
          catNecessaryDesc={c.catNecessaryDesc}
          catAnalyticsTitle={c.catAnalyticsTitle}
          catAnalyticsDesc={c.catAnalyticsDesc}
          catMarketingTitle={c.catMarketingTitle}
          catMarketingDesc={c.catMarketingDesc}
          analytics={analytics}
          setAnalytics={setAnalytics}
          marketing={marketing}
          setMarketing={setMarketing}
        />
      )}
    </>
  );
}

type SettingsModalProps = {
  title: string;
  intro: string;
  onClose: () => void;
  onReject: () => void;
  onSave: () => void;
  rejectLabel: string;
  saveLabel: string;
  cancelLabel: string;
  catNecessaryTitle: string;
  catNecessaryDesc: string;
  catAnalyticsTitle: string;
  catAnalyticsDesc: string;
  catMarketingTitle: string;
  catMarketingDesc: string;
  analytics: boolean;
  setAnalytics: (v: boolean) => void;
  marketing: boolean;
  setMarketing: (v: boolean) => void;
};

function SettingsModal({
  title,
  intro,
  onClose,
  onReject,
  onSave,
  rejectLabel,
  saveLabel,
  cancelLabel,
  catNecessaryTitle,
  catNecessaryDesc,
  catAnalyticsTitle,
  catAnalyticsDesc,
  catMarketingTitle,
  catMarketingDesc,
  analytics,
  setAnalytics,
  marketing,
  setMarketing,
}: SettingsModalProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(true, onClose);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      className="fixed inset-0 z-[130] flex items-end justify-center bg-navy/60 backdrop-blur-sm p-4 sm:items-center"
      onClick={(e) => {
        // Click en el backdrop cierra — el panel interior detiene la
        // propagación abajo.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={trapRef}
        className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy/40"
      >
        {/* Header con banda sky-50 y patrón de header dialog del DS.
            Título en display, icon shield decorativo a la izquierda. */}
        <div className="relative bg-sky-50 px-6 pb-6 pt-8 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            aria-label={cancelLabel}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition-all duration-200 hover:scale-110 hover:bg-navy/10 hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan text-navy shadow-inner shadow-cyan/50">
              <ShieldCheck className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="flex-1 pr-8">
              <h2
                id="cookie-settings-title"
                className="font-display text-2xl font-bold leading-tight tracking-tight text-navy sm:text-3xl"
              >
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy/70 sm:text-base">
                {intro}
              </p>
            </div>
          </div>
        </div>

        {/* Body — lista de categorías. */}
        <div className="px-6 py-6 sm:px-8">
          <ul className="space-y-3">
            <CookieRow
              icon={ShieldCheck}
              title={catNecessaryTitle}
              desc={catNecessaryDesc}
              checked
              disabled
            />
            <CookieRow
              icon={BarChart3}
              title={catAnalyticsTitle}
              desc={catAnalyticsDesc}
              checked={analytics}
              onChange={setAnalytics}
            />
            <CookieRow
              icon={Megaphone}
              title={catMarketingTitle}
              desc={catMarketingDesc}
              checked={marketing}
              onChange={setMarketing}
            />
          </ul>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-line bg-white px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={onReject}
            className="group/btn inline-flex items-center justify-center rounded-xl border-[1.5px] border-line bg-white px-5 py-3 text-base font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-teal/5 hover:text-teal hover:shadow-md hover:shadow-teal/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal active:translate-y-0"
          >
            {rejectLabel}
          </button>
          <button
            type="button"
            onClick={onSave}
            className="group/btn inline-flex items-center justify-center rounded-xl bg-teal px-5 py-3 text-base font-semibold text-white shadow-md shadow-teal/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal active:translate-y-0"
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function CookieRow({
  icon: Icon,
  title,
  desc,
  checked,
  disabled = false,
  onChange,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const rowId = `cookie-row-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <li
      className={`flex items-start gap-4 rounded-2xl border p-4 transition ${
        checked
          ? "border-teal/30 bg-teal/[0.03]"
          : "border-line bg-white"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
          checked
            ? "border-teal/30 bg-teal/10 text-teal"
            : "border-line bg-sky-50 text-navy/60"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <label
          htmlFor={rowId}
          className="text-base font-semibold text-navy"
        >
          {title}
        </label>
        <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
      </div>
      <button
        id={rowId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
          checked ? "bg-teal" : "bg-navy/15"
        } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ease-out ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        >
          {/* Punto interior teal cuando activo, cyan dot cuando disabled. */}
          <span
            className={`h-1.5 w-1.5 rounded-full transition ${
              checked
                ? "bg-teal"
                : disabled
                  ? "bg-cyan"
                  : "bg-transparent"
            }`}
          />
        </span>
      </button>
    </li>
  );
}
