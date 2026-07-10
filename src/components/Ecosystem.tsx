import Image from "next/image";

export function Ecosystem() {
  return (
    <section className="bg-white px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-[84rem]">
        <div className="overflow-hidden rounded-[2.5rem] bg-navy-800 px-8 py-20 text-white sm:px-14 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: heading + iluma */}
            <div className="flex flex-col justify-between gap-12">
              <h2 className="section-title !text-white">
                Somos parte de un ecosistema global de innovación
              </h2>
              <Image
                src="/images/Iluma-logo.webp"
                alt="Iluma Alliance"
                width={260}
                height={115}
                className="h-24 w-auto object-contain object-left"
              />
            </div>

            {/* Right: copy + stats */}
            <div className="lg:pt-2">
              <p className="max-w-md text-pretty text-lg leading-relaxed text-white/70">
                Impulsados por el propósito de diseñar nutrición para mejorar
                vidas. Integramos ciencia, tecnología y conocimiento para
                enfrentar los desafíos reales de la producción animal.
              </p>

              <div className="mt-12 space-y-8">
                <div>
                  <div className="font-display text-5xl font-bold text-yellow sm:text-6xl">
                    +1000 personas
                  </div>
                  <p className="mt-2 font-semibold text-white">
                    alineadas bajo un mismo propósito.
                  </p>
                </div>
                <div>
                  <div className="font-display text-5xl font-bold text-yellow sm:text-6xl">
                    + 600 millones
                  </div>
                  <p className="mt-2 font-semibold text-white">
                    de vidas diarias impactadas
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
