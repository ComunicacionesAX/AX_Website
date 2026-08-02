"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/context";
import { AnimatedStat } from "@/components/AnimatedStat";

export function Ecosystem() {
  const { t } = useI18n();
  return (
    <section className="bg-white px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-[84rem]">
        <div className="on-dark overflow-hidden rounded-3xl bg-navy-800 px-8 py-20 text-white sm:px-14 sm:py-24 lg:px-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Left: heading + iluma */}
            <div className="flex flex-col justify-between gap-14">
              {/* Heading escala DS — text-4xl → text-5xl → text-subhead
                  (44px). Peso light, tracking-tight y leading corto
                  refuerza el look editorial. */}
              <h2 className="font-display font-light leading-[1.1] tracking-tight text-white text-3xl sm:text-4xl lg:text-subhead">
                {t.ecosystem.title1}
                <br />
                {t.ecosystem.title2}
                <br />
                {t.ecosystem.title3}
              </h2>
              {/* Logo Iluma — en mobile se centra y tiene max-w para no
                  invadir todo el ancho (verse chico y proporcional).
                  En desktop se ancla a la izquierda a ancho completo. */}
              <Image
                src="/images/Iluma-logo-trimmed.webp"
                alt="Iluma Alliance"
                width={2932}
                height={1368}
                sizes="(max-width: 1024px) 70vw, 45vw"
                className="mx-auto h-auto w-full max-w-xs object-contain object-center lg:mx-0 lg:max-w-none lg:object-left"
              />
            </div>

            {/* Right: copy + stats — centrado en mobile, izquierda desde sm.
                Sólo los 2 primeros párrafos de `copy` van arriba; el 3º
                (cierre editorial "En Asimetrix convertimos…") baja al
                final, debajo de la segunda cifra, como cierre reflexivo. */}
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:pt-2">
              <div className="max-w-md space-y-4">
                {t.ecosystem.copy.slice(0, 2).map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-pretty text-lg leading-relaxed text-white/80 sm:text-xl"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats — cada grupo (cifra + unidad + label) queda
                  cohesionado con gap-3 interno. Entre los dos grupos,
                  gap-8 y el divider glaciar centrado. En mobile todo
                  se centra; en desktop se alinea a la izquierda. */}
              <div className="mt-12 flex flex-col items-center gap-8 sm:items-start">
                <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                  <AnimatedStat
                    value={t.ecosystem.stat1Value}
                    className="font-display text-5xl font-bold leading-tight tracking-tight text-yellow sm:text-6xl"
                    forceTwoLines
                  />
                  <p className="max-w-sm text-pretty text-base font-semibold text-white sm:text-lg">
                    {t.ecosystem.stat1Label}
                  </p>
                </div>

                {/* Divider glaciar — self-center para alinearse solo. */}
                <div
                  aria-hidden="true"
                  className="h-1 w-32 rounded-full bg-gradient-to-r from-teal via-cyan to-teal shadow-[0_0_12px_color-mix(in_srgb,var(--color-cyan)_60%,transparent)] sm:w-40"
                />

                <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                  <AnimatedStat
                    value={t.ecosystem.stat2Value}
                    className="font-display text-5xl font-bold leading-tight tracking-tight text-yellow sm:text-6xl"
                    forceTwoLines
                  />
                  <p className="max-w-sm text-pretty text-base font-semibold text-white sm:text-lg">
                    {t.ecosystem.stat2Label}
                  </p>
                </div>
              </div>

              {/* Cierre editorial — párrafo 3 del copy debajo de las
                  stats, como reflexión final. */}
              {t.ecosystem.copy[2] && (
                <p className="mt-10 max-w-md text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
                  {t.ecosystem.copy[2]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
