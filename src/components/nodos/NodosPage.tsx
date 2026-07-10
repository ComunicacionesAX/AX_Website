import Image from "next/image";

const problems = [
  { icon: "/images/icons/icon_nodos_problema_01.svg", bold: "Datos medioambientales", rest: "subestimados" },
  { icon: "/images/icons/icon_nodos_problema_02.svg", bold: "Cambios ambientales", rest: "que pasan desapercibidos" },
  { icon: "/images/icons/icon_nodos_problema_03.svg", bold: "Intervenciones", rest: "tardías" },
];

const features = ["Monitoreo continuo", "Alertas configurables", "Ambiente más seguro"];

const comparison = {
  rows: ["Función principal", "Cómo utiliza los datos de Nodos", "Tipo de dato utilizado"],
  columns: [
    {
      title: "DASHBOARD DE GRANJA",
      cells: [
        "Es un panel de control diseñado para visualizar el comportamiento climático del galpón cada 15 minutos.",
        "Recibe la información mediante una conexión de streaming continuo en la nube para graficar las variables y permitir la detección precisa de picos máximos y mínimos.",
        "Variables medioambientales.",
      ],
    },
  ],
};

export function NodosPage() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Hero — mismas características gráficas que el home */}
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/nodos/nodos_problem.webp"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/images/nodos/nodos_hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-navy/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-navy/60" />
        </div>

        <div className="container-x relative flex min-h-[100vh] flex-col justify-center pb-28 pt-36">
          <div className="max-w-5xl animate-fade-up">
            <h1 className="font-display text-[clamp(3.325rem,11.4vw,10.925rem)] font-light leading-[0.92] tracking-tight">
              Nodos
              <br />
              ambientales
            </h1>
            <p className="mt-3 max-w-2xl font-display text-xl font-light text-white/90 sm:text-3xl sm:leading-tight">
              Monitoreo continuo de variables clave: temperatura, humedad, CO₂ y
              luz para mantener estabilidad y anticipar riesgos.
            </p>
            <p className="mt-3 text-lg text-white/90 sm:text-2xl">
              Condiciones visibles, intervención oportuna.
            </p>

            <div className="mt-14">
              <a
                href="/#cotizar"
                className="inline-flex items-center rounded-xl bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/40 transition hover:bg-teal-600"
              >
                Agendar demostración
              </a>
            </div>
          </div>

          {/* Precision badge */}
          <div className="mt-10 max-w-xs self-start lg:absolute lg:bottom-36 lg:right-6 lg:mt-0 lg:self-auto xl:right-16">
            <div className="h-2 w-52 rounded-full bg-cyan" />
            <div className="mt-4 font-display text-6xl font-bold sm:text-7xl">99%</div>
            <div className="mt-1 text-2xl sm:text-3xl">de precisión</div>
          </div>
        </div>
      </section>

      {/* El problema */}
      <section className="container-x py-28">
        <h2 className="section-title text-balance text-center">
          El problema del monitoreo ambiental manual
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[730/691] overflow-hidden rounded-[30px]">
            <Image
              src="/images/nodos/nodos_problem.webp"
              alt="Galpón avícola"
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
        <h2 className="section-title text-center">
          La solución
        </h2>
        <p className="mt-4 text-center font-display text-2xl font-light text-navy/80 sm:text-4xl">
          Monitoreo continuo de las condiciones ambientales
        </p>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left: device shot */}
          <div className="relative aspect-[368/788] overflow-hidden rounded-3xl">
            <Image
              src="/images/nodos/nodos_solution_left.webp"
              alt="Nodo ambiental instalado"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Center: nodo render */}
          <div className="relative aspect-[867/916]">
            <Image
              src="/images/nodos/nodos_solution_center.webp"
              alt="Nodos ambientales"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain"
            />
          </div>

          {/* Right: highlight card + feature chips */}
          <div className="flex flex-col gap-5">
            <div className="rounded-[35px] bg-navy p-8 text-white shadow-lg shadow-navy/25">
              <div className="font-display text-4xl font-medium leading-tight sm:text-5xl">
                Plataforma
                <br />
                de análisis
              </div>
              <div className="mt-6 h-2 w-36 rounded-full bg-cyan" />
              <p className="mt-6 text-2xl leading-snug">
                Visualiza cambios, identifica patrones y entiende la evolución del
                ambiente a través de datos centralizados en una sola plataforma.
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
        <h2 className="section-title text-center">
          Lo que marca la diferencia
        </h2>

        <div className="relative mt-14 overflow-hidden rounded-[30px]">
          <div className="relative aspect-[1139/550]">
            <Image
              src="/images/nodos/nodos_diferencia.webp"
              alt="Galpón con nodos ambientales"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/60 to-navy/90" />
          </div>

          <span className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-white/50 px-8 py-3 text-center text-xl font-bold text-navy backdrop-blur-sm sm:text-2xl">
            Lecturas distribuidas en el galpón
          </span>

          {/* Bottom-left detail block */}
          <div className="absolute inset-x-6 bottom-8 sm:inset-x-12">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Sensores configurables según la necesidad
              </h3>
              <div className="mt-3 h-2 w-52 rounded-full bg-cyan" />
              <p className="mt-4 text-lg font-medium text-white sm:text-2xl">
                Adapta la medición de variables ambientales según las necesidades
                específicas de cada granja.
              </p>
            </div>
          </div>

          <span className="absolute bottom-8 right-6 rounded-full bg-white/50 px-8 py-3 text-center text-xl font-bold text-navy backdrop-blur-sm sm:right-12 sm:text-2xl">
            Proyección de consumo
          </span>
        </div>
      </section>

      {/* CTA con producto */}
      <section className="container-x py-16 text-center">
        <h2 className="section-title mx-auto max-w-4xl text-balance text-center">
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
          <h2 className="section-title !text-white text-center">
            Nodos se conecta{" "}
            <span className="font-light">con aplicaciones del ecosistema Asimetrix</span>
          </h2>

          <div className="mt-14 overflow-x-auto">
            <div className="mx-auto grid max-w-3xl grid-cols-[minmax(180px,1fr)_2fr] gap-x-6">
              <div />
              {comparison.columns.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-white/60 px-4 py-3 text-center text-lg tracking-[0.2em]"
                >
                  {c.title}
                </div>
              ))}

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
