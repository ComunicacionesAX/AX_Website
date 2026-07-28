"use client";

import { useState } from "react";
import { MessageCircle, Mail, CalendarPlus, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { DEMO_BOOKING_URL } from "@/lib/links";

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
  const [solution, setSolution] = useState<string | null>(null);
  const [digLevel, setDigLevel] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatus("error");
      setErrorText(q.requiredError);
      return;
    }

    setStatus("sending");
    setErrorText("");

    try {
      const res = await fetch("/api/cotizar", {
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
          solution,
          digLevel: digLevel !== null ? q.digLevels[digLevel] : "",
          message,
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorText(q.errorMsg);
    }
  }

  if (status === "success") {
    return (
      <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
        <section className="relative overflow-hidden rounded-b-[2.5rem] bg-navy text-white">
          <div className="container-x flex min-h-[52vh] flex-col justify-center pb-16 pt-44">
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-light leading-[0.95] tracking-tight">
              {q.heroTitle1}
              <br />
              {q.heroTitle2}
              <br />
              {q.heroTitle3}
            </h1>
          </div>
        </section>
        <section className="container-x py-28">
          <div
            role="status"
            className="mx-auto flex max-w-xl flex-col items-center rounded-[28px] border border-white bg-white/60 p-12 text-center shadow-xl shadow-navy/5 backdrop-blur-md"
          >
            <CheckCircle2 className="h-16 w-16 text-teal" aria-hidden="true" />
            <p className="mt-6 text-xl leading-relaxed text-navy">
              {q.successMsg}
            </p>
          </div>
        </section>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Hero — full-bleed navy, como el resto de las landings */}
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-navy text-white">
        <div className="container-x flex min-h-[52vh] flex-col justify-center pb-16 pt-44">
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-light leading-[0.95] tracking-tight">
            {q.heroTitle1}
            <br />
            {q.heroTitle2}
            <br />
            {q.heroTitle3}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-2xl">
            {q.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Cuerpo: formulario + tarjeta de contacto */}
      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-[1.9fr_1fr]">
          {/* ---------- Formulario ---------- */}
          <div>
            <h2 className="section-title">{q.introTitle}</h2>
            <p className="mt-1 font-display text-2xl font-light text-navy/70 sm:text-3xl">
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
                  <Field label={q.fields.nameLabel} placeholder={q.fields.namePlaceholder} value={name} onChange={setName} required />
                  <Field label={q.fields.companyLabel} placeholder={q.fields.companyPlaceholder} value={company} onChange={setCompany} />
                  <Field label={q.fields.locationLabel} placeholder={q.fields.locationPlaceholder} value={location} onChange={setLocation} />
                  <Field label={q.fields.emailLabel} placeholder={q.fields.emailPlaceholder} type="email" value={email} onChange={setEmail} required />
                  <div className="sm:col-span-2">
                    <Field label={q.fields.phoneLabel} placeholder={q.fields.phonePlaceholder} type="tel" value={phone} onChange={setPhone} />
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
                    <p className="text-sm font-medium text-navy/60">{q.prodTypeLabel}</p>
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
                    <p className="text-sm font-medium text-navy/60">{q.animalCountLabel}</p>
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

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {q.solutions.map((s, i) => {
                    const active = solution === s.name;
                    const last = i === q.solutions.length - 1;
                    return (
                      <button
                        type="button"
                        key={s.name}
                        onClick={() => setSolution(s.name)}
                        className={`flex items-start gap-4 rounded-2xl border bg-white p-6 text-left transition ${
                          active
                            ? "border-cyan ring-2 ring-cyan/40"
                            : "border-line hover:border-cyan/60"
                        } ${last ? "sm:col-span-2" : ""}`}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-cyan">
                          {s.abbr}
                        </span>
                        <span className="flex-1">
                          <span className="block font-bold text-navy">{s.name}</span>
                          <span className="mt-1 block text-sm text-muted">{s.desc}</span>
                        </span>
                        <span
                          className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition ${
                            active ? "border-cyan bg-cyan" : "border-line"
                          }`}
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

                <p className="mt-8 text-sm font-medium text-navy/60">{q.digLabel}</p>
                <div className="relative mt-6 px-2">
                  {/* track */}
                  <div className="absolute left-2 right-2 top-3 h-0.5 bg-line" />
                  <div className="relative flex justify-between">
                    {q.digLevels.map((lvl, i) => {
                      const active = digLevel === i;
                      return (
                        <button
                          type="button"
                          key={lvl}
                          onClick={() => setDigLevel(i)}
                          className="flex max-w-[4.5rem] flex-col items-center gap-3 sm:max-w-[7rem]"
                        >
                          <span
                            className={`h-6 w-6 rounded-full border-2 bg-white transition ${
                              active ? "border-cyan ring-4 ring-cyan/30" : "border-navy/30"
                            }`}
                          />
                          <span
                            className={`text-center text-xs leading-snug transition ${
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
                  <label htmlFor="field-message" className="text-sm font-medium text-navy/60">
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

              <p className="text-sm leading-relaxed text-muted">{q.privacy}</p>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-5 py-3 text-sm font-medium text-red-600"
                >
                  {errorText}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="w-full rounded-xl bg-gradient-to-r from-teal to-navy px-8 py-4 text-base font-semibold text-white shadow-lg shadow-navy/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? q.submitting : q.submit}
              </button>
            </form>
          </div>

          {/* ---------- Tarjeta de contacto ---------- */}
          <aside className="lg:pt-2">
            <div className="rounded-[28px] border border-white bg-white/60 p-8 shadow-xl shadow-navy/5 backdrop-blur-md lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-light leading-snug text-navy">
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

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy/60">
        {label}
        {required && <span className="ml-0.5 text-teal" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        className="mt-2 w-full rounded-xl border border-line bg-white px-5 py-3.5 text-navy outline-none transition placeholder:text-muted/70 focus:border-cyan focus:ring-2 focus:ring-cyan/30"
      />
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
      className={`rounded-full border px-6 py-3 text-[15px] font-medium transition ${
        active
          ? "border-cyan bg-cyan/15 text-navy"
          : "border-line bg-white text-navy/80 hover:border-cyan/60"
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
