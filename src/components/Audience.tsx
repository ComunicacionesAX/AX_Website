"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/context";

const icons = [
  "/images/icons/icon_para_productores.svg",
  "/images/icons/icon_para_equipo.svg",
  "/images/icons/icon_para_lideres.svg",
];

export function Audience() {
  const { t } = useI18n();
  const segments = t.audience.segments.map((s, i) => ({ ...s, icon: icons[i] }));
  return (
    <section
      id="poder"
      className="bg-gradient-to-b from-white via-sky-50 to-white py-32"
    >
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-4 lg:divide-x lg:divide-navy/10">
          <h2 className="section-title lg:whitespace-nowrap lg:pr-8">
            {t.audience.title1}
            <br />
            {t.audience.title2}
          </h2>

          {segments.map((s) => (
            <div
              key={s.title}
              className="flex flex-col items-center px-4 text-center"
            >
              <Image src={s.icon} alt="" width={32} height={32} className="h-8 w-8" />
              <h3 className="mt-4 font-display text-xl font-bold text-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
