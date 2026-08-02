"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarPlus, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { DEMO_BOOKING_URL } from "@/lib/links";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const STORAGE_KEY = "cotizar-draft-v1";

type FormDraft = {
  name: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  prodType: string | null;
  animalCount: string | null;
  /** Multi-selección: el usuario puede elegir varias soluciones a la vez. */
  solutions: string[];
  digLevel: number | null;
  message: string;
};

function SectionNumber({ n }: { n: number }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan/40 text-sm font-bold text-navy">
      {n}
    </span>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export function CotizarPage() {
  const { t } = useI18n();
  const q = t.cotizar;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [prodType, setProdType] = useState<string | null>(null);
  const [animalCount, setAnimalCount] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<string[]>([]);
  const toggleSolution = (name: string) =>
    setSolutions((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  const [digLevel, setDigLevel] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  // Al primer submit fallido por validación, forzamos touched=true en
  // todos los Fields → así los inputs inválidos muestran su error
  // inline inmediatamente (aunque el usuario no haya hecho blur).
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Preview mode para QA/desarrolladores. Añade ?preview=success,
  // ?preview=error o ?preview=sending a la URL para forzar el estado
  // correspondiente sin necesidad de completar el formulario.
  // Con ?preview=sending scrollea automáticamente al botón submit para
  // que el spinner sea visible sin scroll manual.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const preview = params.get("preview");
    if (preview === "success") setStatus("success");
    else if (preview === "sending") {
      setStatus("sending");
      // Retraso mínimo para que el botón esté en el DOM antes del scroll.
      setTimeout(() => {
        const btn = document.querySelector<HTMLButtonElement>(
          "button[type=submit]",
        );
        btn?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else if (preview === "error") {
      setStatus("error");
      setErrorText(q.errorMsgNetwork);
      setTimeout(() => {
        document
          .querySelector("[role='alert']")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [q.errorMsgNetwork]);

  // Restaura draft desde localStorage al montar. Un ref evita que el
  // efecto de guardar corra antes de haber leído (perdería el draft).
  const hydrated = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw) as Partial<FormDraft>;
        if (typeof d.name === "string") setName(d.name);
        if (typeof d.company === "string") setCompany(d.company);
        if (typeof d.location === "string") setLocation(d.location);
        if (typeof d.email === "string") setEmail(d.email);
        if (typeof d.phone === "string") setPhone(d.phone);
        if (typeof d.prodType === "string" || d.prodType === null)
          setProdType(d.prodType ?? null);
        if (typeof d.animalCount === "string" || d.animalCount === null)
          setAnimalCount(d.animalCount ?? null);
        if (Array.isArray(d.solutions)) {
          setSolutions(d.solutions.filter((s): s is string => typeof s === "string"));
        }
        if (typeof d.digLevel === "number" || d.digLevel === null)
          setDigLevel(d.digLevel ?? null);
        if (typeof d.message === "string") setMessage(d.message);
      }
    } catch {
      // Ignora drafts inválidos.
    }
    hydrated.current = true;
  }, []);

  // Guarda draft cada vez que cambia algún campo (post-hidratación).
  useEffect(() => {
    if (!hydrated.current) return;
    const draft: FormDraft = {
      name,
      company,
      location,
      email,
      phone,
      prodType,
      animalCount,
      solutions,
      digLevel,
      message,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignora quota errors.
    }
  }, [name, company, location, email, phone, prodType, animalCount, solutions, digLevel, message]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Inventario de errores del alert (a nivel form):
    //  1. requiredError    — falta name o email (submit prematuro).
    //  2. errorMsgValidation — hay algún campo con error live activo.
    //  3. errorMsgNetwork  — fetch falló al conectar (offline/timeout).
    //  4. errorMsgServer   — el servidor respondió ≥500 o payload inválido.
    //  5. errorMsg (fallback) — cualquier otro caso inesperado.
    // Helper: scrollea al primer input con aria-invalid tras un tick
    // para que React haya renderizado los borders rojos.
    const scrollToFirstInvalid = () => {
      setTimeout(() => {
        const first = document.querySelector<HTMLElement>(
          "input[aria-invalid='true']",
        );
        first?.scrollIntoView({ behavior: "smooth", block: "center" });
        first?.focus?.({ preventScroll: true });
      }, 60);
    };

    if (!name.trim() || !email.trim()) {
      setSubmitAttempted(true);
      setStatus("error");
      setErrorText(q.requiredError);
      scrollToFirstInvalid();
      return;
    }
    // Chequeo de formato: si escribieron algo pero no es válido.
    const emailTrim = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(emailTrim)) {
      setSubmitAttempted(true);
      setStatus("error");
      setErrorText(q.errorMsgValidation);
      scrollToFirstInvalid();
      return;
    }
    if (phone.trim() && phone.replace(/\D/g, "").length < 7) {
      setSubmitAttempted(true);
      setStatus("error");
      setErrorText(q.errorMsgValidation);
      scrollToFirstInvalid();
      return;
    }

    setStatus("sending");
    setErrorText("");

    let res: Response;
    try {
      res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          location,
          email,
          phone,
          prodType,
          animalCount,
          solutions,
          solution: solutions.join(", "),
          digLevel: digLevel !== null ? q.digLevels[digLevel] : "",
          message,
        }),
      });
    } catch {
      // Fetch rechazado — la red falló antes de contactar al servidor.
      setStatus("error");
      setErrorText(q.errorMsgNetwork);
      return;
    }

    if (res.status >= 500) {
      setStatus("error");
      setErrorText(q.errorMsgServer);
      return;
    }

    if (!res.ok) {
      setStatus("error");
      setErrorText(q.errorMsg);
      return;
    }

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-sky-50">
        <Breadcrumbs current={q.pageLabel} />
        {/* Dialog de éxito — card blanca centrada, estilo del DS.
            Header con banda navy + orb cyan detrás del check; body con
            eyebrow chip cyan + heading display + mensaje; footer con
            acciones alineadas a la derecha. */}
        <div className="flex min-h-[calc(100vh-92px)] items-center justify-center px-6 py-16 sm:py-24">
          <div
            role="dialog"
            aria-labelledby="cotizar-success-title"
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-white shadow-2xl shadow-navy/15"
          >
            {/* Header — banda oscura navy (on-dark) con orb cyan pulsante
                detrás del check-badge. Da un momento "premium" al éxito
                sin salirse del contenedor dialog. */}
            <div className="on-dark relative flex items-center justify-center overflow-hidden bg-navy px-8 pt-12 pb-10">
              {/* Orb glow — halo cyan pulsante detrás del badge. */}
              <div
                aria-hidden="true"
                className="orb-glow pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(151,244,255,0.35) 0%, rgba(151,244,255,0.10) 45%, transparent 75%)",
                }}
              />
              {/* Check icon — glass badge con borde cyan translúcido. */}
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-cyan/40 bg-navy/40 backdrop-blur-md">
                <CheckCircle2
                  className="h-11 w-11 text-cyan"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
              </div>
            </div>

            {/* Body — eyebrow chip cyan + heading display + mensaje + hint. */}
            <div className="px-8 pt-8 pb-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                {q.successEyebrow}
              </span>
              <h1
                id="cotizar-success-title"
                className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl"
              >
                {q.successHeading}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-navy/80 sm:text-lg">
                {q.successMsg}
              </p>
              <p className="mt-3 text-sm text-muted">{q.successHint}</p>
            </div>

            {/* Footer — actions row separada por border-t sutil, patrón
                DS típico de dialog. Full-width en mobile, side-by-side
                a la derecha en desktop. */}
            <div className="flex flex-col-reverse gap-2 border-t border-line bg-white px-6 py-5 sm:flex-row sm:justify-end sm:gap-3">
              <a
                href="/#soluciones"
                className="inline-flex items-center justify-center rounded-xl border-[1.5px] border-line bg-white px-5 py-3 text-base font-semibold text-navy transition hover:border-teal/60 hover:text-teal"
              >
                {q.successProducts}
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-teal px-5 py-3 text-base font-semibold text-white transition hover:bg-teal-600"
              >
                {q.successHome}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      <Breadcrumbs current={q.pageLabel} />
      {/* Hero — gradient vertical midnight → teal. */}
      <section className="bg-hero on-dark relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden rounded-b-3xl px-8 pb-20 pt-32 text-center text-white sm:pt-40">
        <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          {q.heroTitle1}
          <br />
          {q.heroTitle2}
          {q.heroTitle3 && (
            <>
              <br />
              {q.heroTitle3}
            </>
          )}
        </h1>
        <div className="mt-6 max-w-3xl space-y-2">
          {q.heroSubtitle.map((paragraph, i) => (
            <p
              key={i}
              className="whitespace-pre-line text-pretty font-display text-xl font-light leading-relaxed text-white/90 sm:text-2xl"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Cuerpo: formulario + tarjeta de contacto */}
      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-[1.9fr_1fr]">
          {/* ---------- Formulario ---------- */}
          <div>
            <h2 className="section-title whitespace-pre-line text-pretty">
              {q.introTitle}
            </h2>
            <p className="mt-1 text-pretty font-display text-2xl font-light text-navy/70 sm:text-3xl">
              {q.introSubtitle}
            </p>

            <form className="mt-14 space-y-16" onSubmit={handleSubmit} noValidate>
              {/* 1 — Contacto */}
              <div>
                <div className="flex items-center gap-3">
                  <SectionNumber n={1} />
                  <h3 className="font-display text-2xl font-bold text-navy">
                    {q.section1}
                  </h3>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <Field label={q.fields.nameLabel} placeholder={q.fields.namePlaceholder} value={name} onChange={setName} required forceTouched={submitAttempted} />
                  <Field label={q.fields.companyLabel} placeholder={q.fields.companyPlaceholder} value={company} onChange={setCompany} forceTouched={submitAttempted} />
                  <Field label={q.fields.locationLabel} placeholder={q.fields.locationPlaceholder} value={location} onChange={setLocation} forceTouched={submitAttempted} />
                  <Field label={q.fields.emailLabel} placeholder={q.fields.emailPlaceholder} type="email" value={email} onChange={setEmail} required forceTouched={submitAttempted} />
                  <div className="sm:col-span-2">
                    <Field label={q.fields.phoneLabel} placeholder={q.fields.phonePlaceholder} type="tel" value={phone} onChange={setPhone} forceTouched={submitAttempted} />
                  </div>
                </div>
              </div>

              {/* 2 — Producción */}
              <div>
                <div className="flex items-center gap-3">
                  <SectionNumber n={2} />
                  <h3 className="font-display text-2xl font-bold text-navy">
                    {q.section2}
                  </h3>
                </div>

                <div className="mt-8 grid gap-10 sm:grid-cols-[1.4fr_1fr]">
                  <div>
                    <p className="text-base font-medium text-navy/60">{q.prodTypeLabel}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {q.prodTypes.map((opt) => (
                        <Chip
                          key={opt}
                          active={prodType === opt}
                          onClick={() => setProdType(opt)}
                        >
                          {opt}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-medium text-navy/60">{q.animalCountLabel}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {q.animalCounts.map((opt) => (
                        <Chip
                          key={opt}
                          active={animalCount === opt}
                          onClick={() => setAnimalCount(opt)}
                        >
                          {opt}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 — Solución */}
              <div>
                <div className="flex items-center gap-3">
                  <SectionNumber n={3} />
                  <h3 className="font-display text-2xl font-bold text-navy">
                    {q.section3}
                  </h3>
                </div>

                {/* Checkbox group — todas las cards con la MISMA altura
                    (items-stretch + h-full en el button). El texto usa
                    `text-pretty` para que el navegador ajuste line-breaks
                    y evite palabras huérfanas al final del párrafo. */}
                <div
                  role="group"
                  aria-label={q.section3}
                  className="mt-8 grid items-stretch gap-4 sm:grid-cols-2"
                >
                  {q.solutions.map((s) => {
                    const active = solutions.includes(s.name);
                    return (
                      <button
                        type="button"
                        key={s.name}
                        role="checkbox"
                        aria-checked={active}
                        onClick={() => toggleSolution(s.name)}
                        className={`group flex h-full items-start gap-4 rounded-2xl border bg-white p-6 text-left transition ${
                          active
                            ? "border-teal ring-2 ring-teal/25"
                            : "border-line hover:border-teal/50"
                        }`}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-cyan">
                          {s.abbr}
                        </span>
                        <span className="flex-1">
                          <span className="block text-pretty font-bold text-navy">
                            {s.name}
                          </span>
                          <span className="mt-1 block text-pretty text-base leading-snug text-muted">
                            {s.desc}
                          </span>
                        </span>
                        <span
                          className="check-box mt-1"
                          data-checked={active}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4 — Digitalización */}
              <div>
                <div className="flex items-center gap-3">
                  <SectionNumber n={4} />
                  <h3 className="font-display text-2xl font-bold text-navy">
                    {q.section4}
                  </h3>
                </div>

                <p className="mt-8 text-base font-medium text-navy/60">{q.digLabel}</p>
                <div
                  role="radiogroup"
                  aria-label={q.digLabel}
                  className="relative mt-6"
                  onKeyDown={(e) => {
                    const total = q.digLevels.length;
                    const cur = digLevel ?? -1;
                    const focusIdx = (idx: number) => {
                      const el = e.currentTarget.querySelectorAll<HTMLButtonElement>(
                        '[role="radio"]',
                      )[idx];
                      el?.focus();
                    };
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = cur < 0 ? 0 : (cur + 1) % total;
                      setDigLevel(next);
                      focusIdx(next);
                    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                      e.preventDefault();
                      const prev = cur <= 0 ? total - 1 : cur - 1;
                      setDigLevel(prev);
                      focusIdx(prev);
                    } else if (e.key === "Home") {
                      e.preventDefault();
                      setDigLevel(0);
                      focusIdx(0);
                    } else if (e.key === "End") {
                      e.preventDefault();
                      setDigLevel(total - 1);
                      focusIdx(total - 1);
                    }
                  }}
                >
                  {(() => {
                    const N = q.digLevels.length;
                    // Con flex-1 en cada botón, ancho por botón = 100/N %.
                    // Centro del círculo i = (2i+1) × 50/N % del contenedor.
                    const halfCol = 50 / N;
                    const fillPct =
                      digLevel === null ? 0 : (2 * digLevel + 1) * halfCol;
                    return (
                      <>
                        {/* Track de fondo — conecta el centro del 1er círculo
                           con el centro del último. */}
                        <div
                          className="absolute top-3 h-0.5 bg-line"
                          style={{
                            left: `${halfCol}%`,
                            right: `${halfCol}%`,
                          }}
                        />
                        {/* Fill — parte del borde izquierdo del contenedor y
                           llega EXACTAMENTE al centro del círculo seleccionado.
                           En digLevel=0 (Todo manual) → llena hasta el centro
                           del 1er círculo. */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute left-0 top-[calc(0.75rem-1px)] h-1 origin-left rounded-full bg-teal shadow-[0_0_10px_2px_color-mix(in_srgb,var(--color-teal)_50%,transparent)] transition-[width] duration-700 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
                          style={{ width: `${fillPct}%` }}
                        />
                      </>
                    );
                  })()}
                  <div className="relative flex">
                    {q.digLevels.map((lvl, i) => {
                      const active = digLevel === i;
                      const tabIndex =
                        active || (digLevel === null && i === 0) ? 0 : -1;
                      return (
                        <button
                          type="button"
                          key={lvl}
                          role="radio"
                          aria-checked={active}
                          tabIndex={tabIndex}
                          onClick={() => setDigLevel(i)}
                          className="group flex flex-1 flex-col items-center gap-3 px-2"
                        >
                          <span
                            className="radio-dot radio-dot--lg bg-white"
                            data-checked={active}
                            aria-hidden="true"
                          />
                          <span
                            className={`text-center text-sm leading-snug transition ${
                              active ? "font-semibold text-navy" : "text-muted"
                            }`}
                          >
                            {lvl}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 5 — Mensaje */}
              <div>
                <div className="flex items-center gap-3">
                  <SectionNumber n={5} />
                  <h3 className="font-display text-2xl font-bold text-navy">
                    {q.section5}
                  </h3>
                </div>

                <div className="mt-8">
                  <label htmlFor="field-message" className="text-base font-medium text-navy/60">
                    {q.messageLabel}
                  </label>
                  <textarea
                    id="field-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={q.messagePlaceholder}
                    className="mt-2 w-full rounded-2xl border border-line bg-white px-5 py-4 text-navy outline-none transition placeholder:text-muted/70 focus:border-cyan focus:ring-2 focus:ring-cyan/30"
                  />
                </div>
              </div>

              <p className="text-base leading-relaxed text-muted">{q.privacy}</p>
              <p className="flex items-center gap-2 text-sm font-medium text-teal">
                <span aria-hidden="true">✓</span>
                {q.trust}
              </p>

              {status === "error" && (
                <div role="alert" className="alert" data-status="error">
                  <AlertCircle className="alert__icon" aria-hidden="true" />
                  <div className="alert__body">{errorText}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="btn-primary w-full shadow-lg shadow-navy/20 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending && (
                  // Fallback dual para a11y (prefers-reduced-motion):
                  //  - Por defecto muestra el GIF animado del isotipo.
                  //  - Con reduced-motion: muestra el SVG estático.
                  // El GIF viene con ~42% de whitespace, compensado
                  // vía scale-[2.35] + overflow-hidden en el wrapper.
                  <span
                    aria-hidden="true"
                    className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden"
                  >
                    <img
                      src="/images/logo_ax_isotipo_animado.gif"
                      alt=""
                      className="spinner-ax-gif h-full w-full max-w-none scale-[2.35] object-contain"
                    />
                    <img
                      src="/images/logo_ax_isotipo.svg"
                      alt=""
                      className="spinner-ax-static h-full w-full object-contain"
                    />
                  </span>
                )}
                {sending ? q.submitting : q.submit}
              </button>
            </form>
          </div>

          {/* ---------- Tarjeta de contacto ---------- */}
          <aside className="lg:pt-2">
            <div className="rounded-[28px] border border-white bg-white/60 p-8 shadow-xl shadow-navy/5 backdrop-blur-md lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-bold leading-snug text-navy">
                {q.contactTitle}
              </h2>
              <div className="mt-5 h-1 w-24 rounded-full bg-cyan" />

              <ul className="mt-8 space-y-7">
                <ContactRow icon={<CalendarPlus className="h-5 w-5" />} title={q.demo} value={q.demoValue} href={DEMO_BOOKING_URL} external />
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// Email — requiere user@host.tld con TLD ≥ 2 chars y sin espacios.
// Suficiente para validación cliente; backend valida de verdad.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
// Teléfono — sólo dígitos, +, espacios, guiones y paréntesis. Mínimo
// 7 dígitos reales para descartar ruido.
const PHONE_ALLOWED_RE = /^[\d+\s()\-]*$/;
const PHONE_MIN_DIGITS = 7;

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
  forceTouched,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  /**
   * Cuando el padre indica true (ej. tras submit fallido), tratamos
   * el Field como si ya hubiera pasado por blur — así el error inline
   * se ve inmediatamente sin necesidad de que el usuario navegue el
   * input primero.
   */
  forceTouched?: boolean;
}) {
  const { t } = useI18n();
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;
  const [localTouched, setLocalTouched] = useState(false);
  const touched = localTouched || !!forceTouched;
  const setTouched = setLocalTouched;
  // Hint transient: aparece brevemente cuando el input rechaza un
  // carácter (ej. una letra en el campo tel). Se limpia solo tras 2s.
  // `nonce` fuerza remount del <p> en cada rechazo, así la animación
  // de flash se reinicia aunque el mensaje sea el mismo.
  const [rejectionHint, setRejectionHint] = useState<string | null>(null);
  const [rejectionNonce, setRejectionNonce] = useState(0);
  const rejectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Validación live — sólo muestra error DESPUÉS del primer blur, para
  // no acosar al usuario mientras escribe la primera vez.
  const trimmed = value.trim();
  let error: string | null = null;
  if (touched) {
    if (required && !trimmed) {
      error = t.cotizar.fieldRequired;
    } else if (type === "email" && trimmed && !EMAIL_RE.test(trimmed)) {
      error = t.cotizar.invalidEmail;
    } else if (type === "tel" && trimmed) {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < PHONE_MIN_DIGITS) {
        error = t.cotizar.invalidPhone;
      }
    }
  }
  const invalid = !!error;

  // Sanitiza input mientras se escribe:
  //  - tel: sólo permite dígitos + `+`, espacios, guiones, paréntesis.
  //  - resto: pasa tal cual.
  // Si rechazamos un carácter, mostramos un hint por 2s para explicar
  // al usuario por qué su input no aparece.
  const handleChange = (raw: string) => {
    if (type === "tel" && !PHONE_ALLOWED_RE.test(raw)) {
      setRejectionHint(t.cotizar.phoneOnlyDigits);
      setRejectionNonce((n) => n + 1);
      if (rejectionTimerRef.current) clearTimeout(rejectionTimerRef.current);
      rejectionTimerRef.current = setTimeout(
        () => setRejectionHint(null),
        2000,
      );
      return;
    }
    onChange(raw);
  };

  return (
    <div>
      <label htmlFor={id} className="text-base font-medium text-navy/60">
        {label}
        {required && <span className="ml-0.5 text-teal" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={
          invalid
            ? errorId
            : rejectionHint
              ? `${id}-hint`
              : undefined
        }
        inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
        autoComplete={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
        className={`mt-2 w-full rounded-xl border bg-white px-5 py-3.5 text-navy outline-none transition placeholder:text-muted/70 focus:ring-2 ${
          invalid
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
            : rejectionHint
              ? "border-amber-600 focus:border-amber-700 focus:ring-amber-600/25"
              : "border-line focus:border-cyan focus:ring-cyan/30"
        }`}
      />
      {invalid && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      )}
      {!invalid && rejectionHint && (
        <p
          id={`${id}-hint`}
          key={rejectionNonce}
          role="status"
          aria-live="polite"
          className="animate-flash-attention mt-1.5 text-sm font-semibold text-amber-700"
        >
          {rejectionHint}
        </p>
      )}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border-[1.5px] px-6 py-3 text-body-sm font-semibold transition ${
        active
          ? "border-teal bg-teal text-white shadow-sm shadow-teal/30"
          : "border-line bg-white text-navy/80 hover:border-teal/60 hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}

function ContactRow({
  icon,
  title,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-start gap-4"
      >
        <span className="mt-0.5 flex h-6 w-6 items-center justify-center text-teal">
          {icon}
        </span>
        <span>
          <span className="block font-bold text-navy transition group-hover:text-teal">
            {title}
          </span>
          <span className="block text-sm text-muted">{value}</span>
        </span>
      </a>
    </li>
  );
}
