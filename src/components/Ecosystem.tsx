"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/context";

export function Ecosystem() {
  const { t } = useI18n();
  return (
    <section className="bg-white px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-[84rem]">
        <div className="overflow-hidden rounded-[2.5rem] bg-navy-800 px-8 py-20 text-white sm:px-14 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: heading + iluma */}
            <div className="flex flex-col justify-between gap-12">
              <h2 className="section-title !text-white">
                {t.ecosystem.title1}
                <br />
                {t.ecosystem.title2}
                <br />
                {t.ecosystem.title3}
              </h2>
              <Image
                src="/images/Iluma-logo.webp"
                alt="Iluma Alliance"
                width={700}
                height={310}
                className="h-72 w-auto object-contain object-left"
              />
            </div>

            {/* Right: copy + stats */}
            <div className="lg:pt-2">
              <p className="max-w-md text-pretty text-lg leading-relaxed text-white/70">
                {t.ecosystem.copy}
              </p>

              <div className="mt-12 space-y-8">
                <div>
                  <div className="font-display text-5xl font-bold text-yellow sm:text-6xl">
                    {t.ecosystem.stat1Value}
                  </div>
                  <p className="mt-2 font-semibold text-white">
                    {t.ecosystem.stat1Label}
                  </p>
                </div>
                <div>
                  <div className="font-display text-5xl font-bold text-yellow sm:text-6xl">
                    {t.ecosystem.stat2Value}
                  </div>
                  <p className="mt-2 font-semibold text-white">
                    {t.ecosystem.stat2Label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
