import Image from "next/image";

const problems = [
  {
    icon: "/images/icons/icon_pigvision_problema_01.svg",
    bold: "Pesajes manuales",
    rest: "que estresan a los cerdos",
  },
  {
    icon: "/images/icons/icon_pigvision_problema_02.svg",
    bold: "Datos poco frecuentes",
    rest: "o inestables",
  },
  {
    icon: "/images/icons/icon_pigvision_problema_03.svg",
    bold: "Decisiones tardías sobre",
    rest: "crecimiento y venta",
  },
];

const features = ["Instalación simple", "Plataforma de monitoreo", "Alertas tempranas"];

const comparison = {
  rows: ["Función principal", "Cómo utiliza los datos de PigVision", "Tipo de dato utilizado"],
  columns: [
    {
      title: "OPTIMARKET",
      cells: [
        "Optimiza el calendario de salida para maximizar rentabilidad.",
        "Toma el peso actual calculado por las cámaras y simula matemáticamente la curva de distribución de tamaños del lote para planear entregas escalonadas.",
        "Peso promedio del lote proyectado matemáticamente hacia el futuro.",
      ],
    },
    {
      title: "DASHBOARD DE PIGVISION",
      cells: [
        "Es la plataforma central que consolida el rendimiento del lote y grafica el crecimiento de los animales en el tiempo.",
        "Traza curvas de crecimiento cruzando la edad de los animales con su peso, comparando automáticamente estos resultados frente a la meta de la guía genética.",
        "Pesos promedios y datos de ganancia diaria.",
      ],
    },
  ],
};

export function PigVisionPage() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Hero */}
      <section className="container-x pt-28">
        <div className="relative overflow-hidden rounded-[30px] bg-navy text-white">
          <Image
            src="/images/pigvision/pv_problem.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="relative flex min-h-[560px] flex-col justify-center px-8 py-16 sm:px-14 lg:min-h-[680px]">
            <h1 className="font-display text-6xl font-medium leading-none tracking-tight sm:text-8xl lg:text-[10rem]">
              PigVision
            </h1>
            <p className="mt-6 font-display text-2xl font-light sm:text-4xl">
              Cámara inteligente
              <br />
              para pesar cerdos en ceba
            </p>
            <p className="mt-3 text-lg text-white/90 sm:text-2xl">de 30Kg a 150Kg</p>

            <a
              href="/#cotizar"
              className="mt-10 inline-flex w-fit items-center rounded-lg bg-teal px-7 py-3.5 text-base font-semibold text-cyan transition hover:bg-teal-600"
            >
              Agendar demostración
            </a>

            {/* Precision badge */}
            <div className="mt-12 max-w-xs lg:absolute lg:right-14 lg:top-24 lg:mt-0">
              <div className="h-2 w-52 rounded-full bg-cyan" />
              <div className="mt-4 font-display text-6xl font-bold sm:text-7xl">97%</div>
              <div className="mt-1 text-2xl sm:text-3xl">de precisión</div>
            </div>
          </div>
        </div>
      </section>

      {/* El problema */}
      <section className="container-x py-28">
        <h2 className="text-balance text-center font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
          El problema de pensar de forma tradicional
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[732/663] overflow-hidden rounded-[33px]">
            <Image
              src="/images/pigvision/pv_problem.webp"
              alt="Cerdos en granja"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <ul className="divide-y divide-navy/10">
            {problems.map((p) => (
              <li key={p.bold} className="flex items-start gap-5 py-6">
                <Image
                  src={p.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="mt-1 h-10 w-10 shrink-0"
                />
                <p className="text-2xl leading-snug text-navy sm:text-3xl">
                  <span className="font-bold">{p.bold}</span> {p.rest}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* La solución */}
      <section className="container-x py-16">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-navy sm:text-5xl lg:text-6xl">
          La solución
        </h2>
        <p className="mt-4 text-center font-display text-2xl font-light text-navy/80 sm:text-4xl">
          datos claros para soluciones productivas
        </p>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left: pigs image */}
          <div className="relative aspect-[397/781] overflow-hidden rounded-3xl">
            <Image
              src="/images/pigvision/pv_solution_pigs.webp"
              alt="Cerdos monitoreados"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Center: device render */}
          <div className="relative aspect-[779/962]">
            <Image
              src="/images/pigvision/pv_solution_render.webp"
              alt="PigVision plataforma de monitoreo"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain"
            />
          </div>

          {/* Right: feature chips + highlight card */}
          <div className="flex flex-col gap-5">
            <div className="rounded-[35px] bg-navy p-8 text-white shadow-lg shadow-navy/25">
              <div className="font-display text-4xl font-medium leading-tight sm:text-5xl">
                Medición
                <br />
                sin contacto
              </div>
              <div className="mt-6 h-2 w-36 rounded-full bg-cyan" />
              <p className="mt-6 text-2xl leading-snug">
                Calcula el peso sin tocar ni estresar a los animales.
              </p>
            </div>

            {features.map((f) => (
              <div
                key={f}
                className="rounded-full bg-[#f2f2f2] px-7 py-4 text-xl font-medium text-[#8e98a8]"
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que marca la diferencia */}
      <section className="container-x py-28">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Lo que marca la diferencia
        </h2>

        <div className="relative mt-14 overflow-hidden rounded-[30px]">
          <div className="relative aspect-[1132/541]">
            <Image
              src="/images/pigvision/pv_diferencia.webp"
              alt="Granja porcina"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/60 to-navy/90" />
          </div>

          <span className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-white/50 px-8 py-3 text-center text-xl font-bold text-navy backdrop-blur-sm sm:text-2xl">
            ROI productivo de hasta 8:1
          </span>
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/50 px-8 py-3 text-center text-xl font-bold text-navy backdrop-blur-sm sm:text-2xl">
            Diagnóstico remoto
          </span>
        </div>
      </section>

      {/* CTA con producto */}
      <section className="container-x py-16 text-center">
        <h2 className="mx-auto max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Empieza a tomar decisiones con datos reales
        </h2>
        <a
          href="/#cotizar"
          className="mt-10 inline-flex items-center rounded-lg bg-teal px-8 py-4 text-base font-semibold text-cyan transition hover:bg-teal-600 hover:-translate-y-0.5"
        >
          Hablemos sobre tu granja
        </a>
      </section>

      {/* Ecosistema — comparison table */}
      <section className="container-x pb-8 pt-16">
        <div className="rounded-[24px] bg-navy px-6 py-16 text-white sm:px-12">
          <h2 className="text-center font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            PigVision se conecta{" "}
            <span className="font-light">con aplicaciones del ecosistema Asimetrix</span>
          </h2>

          <div className="mt-14 overflow-x-auto">
            <div className="grid min-w-[720px] grid-cols-[minmax(180px,1fr)_1.5fr_1.5fr] gap-x-6">
              {/* Header row */}
              <div />
              {comparison.columns.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-white/60 px-4 py-3 text-center text-lg tracking-[0.2em]"
                >
                  {c.title}
                </div>
              ))}

              {/* Body rows */}
              {comparison.rows.map((row, r) => (
                <div key={row} className="contents">
                  <div className="flex items-center border-t border-white/15 py-8 pr-4 text-xl font-bold text-cyan">
                    {row}
                  </div>
                  {comparison.columns.map((c) => (
                    <div
                      key={c.title + r}
                      className="border-t border-white/15 py-8 text-[15px] leading-relaxed text-white/90"
                    >
                      {c.cells[r]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 text-center">
            <a
              href="/#cotizar"
              className="inline-flex items-center rounded-lg bg-teal px-8 py-4 text-base font-semibold text-cyan transition hover:bg-teal-600 hover:-translate-y-0.5"
            >
              Hablemos sobre tu granja
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
