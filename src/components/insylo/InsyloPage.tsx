import Image from "next/image";

const problems = [
  { icon: "/images/icons/icon_insylo_problema_01.svg", bold: "Medición imprecisa", rest: "de alimento dentro del silo" },
  { icon: "/images/icons/icon_insylo_problema_02.svg", bold: "Desabastecimiento", rest: "inesperado" },
  { icon: "/images/icons/icon_insylo_problema_03.svg", bold: "Visibilidad limitada", rest: "del silo" },
];

const features = ["Medición automática", "Datos en tiempo real", "Historial y consumo"];

const comparison = {
  rows: ["Función principal", "Cómo utiliza los datos de Insylo", "Tipo de dato utilizado"],
  columns: [
    {
      title: "ECONOMETRIX",
      cells: [
        "Simulador predictivo que genera estados de resultados financieros.",
        "Cruza el dato exacto del consumo de alimento de la granja con los costos operativos para modelar matemáticamente cómo esto impacta en el margen de rentabilidad.",
        "Niveles de llenado del silo.",
      ],
    },
    {
      title: "DASHBOARD DE INSYLO",
      cells: [
        "Es la interfaz gráfica para que el productor visualice y controle el inventario de alimento en su granja.",
        "Presenta gráficamente las mediciones de volumen de alimento para que el usuario vigile el abastecimiento y el consumo en tiempo real.",
        "Niveles exactos de llenado de los silos capturados por el sensor.",
      ],
    },
  ],
};

export function InsyloPage() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Hero */}
      <section className="container-x pt-28">
        <div className="relative overflow-hidden rounded-[30px] bg-navy text-white">
          <Image
            src="/images/insylo/is_problem.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="relative flex min-h-[560px] flex-col justify-center px-8 py-16 sm:px-14 lg:min-h-[680px]">
            <h1 className="font-display text-6xl font-medium leading-none tracking-tight sm:text-8xl lg:text-[10rem]">
              Insylo
            </h1>
            <p className="mt-6 font-display text-2xl font-light sm:text-4xl">
              Sensor 3D
              <br />
              para monitoreo de alimento en silos
            </p>
            <p className="mt-3 text-lg text-white/90 sm:text-2xl">de hasta 12 metros.</p>

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
        <h2 className="section-title text-balance text-center">
          El problema del monitoreo manual del silo
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[732/686] overflow-hidden rounded-[30px]">
            <Image
              src="/images/insylo/is_problem.webp"
              alt="Silo metálico en paisaje montañoso"
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
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left: device shot */}
          <div className="relative aspect-[354/787] overflow-hidden rounded-3xl">
            <Image
              src="/images/insylo/is_solution_left.webp"
              alt="Sensor Insylo instalado"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Center: grain in silo */}
          <div className="relative aspect-[651/799] overflow-hidden rounded-3xl">
            <Image
              src="/images/insylo/is_solution_center.webp"
              alt="Medición de grano en silo industrial"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Right: highlight card + feature chips */}
          <div className="flex flex-col gap-5">
            <div className="rounded-[35px] bg-navy p-8 text-white shadow-lg shadow-navy/25">
              <div className="font-display text-4xl font-medium leading-tight sm:text-5xl">
                Alertas configurables
              </div>
              <div className="mt-6 h-2 w-36 rounded-full bg-cyan" />
              <p className="mt-6 text-2xl leading-snug">
                Recibe alertas cuando el nivel de alimento baja del umbral definido.
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
          <div className="relative aspect-[1133/543]">
            <Image
              src="/images/insylo/is_diferencia.webp"
              alt="Silo lleno de alimento animal"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/60 to-navy/90" />
          </div>

          <span className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-white/50 px-8 py-3 text-center text-xl font-bold text-navy backdrop-blur-sm sm:text-2xl">
            Monitoreo ambiental del silo
          </span>

          {/* Bottom-left detail block */}
          <div className="absolute inset-x-6 bottom-8 sm:inset-x-12">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Topografía 3D del alimento
              </h3>
              <div className="mt-3 h-2 w-52 rounded-full bg-cyan" />
              <p className="mt-4 text-lg font-medium text-white sm:text-2xl">
                Visualiza cómo se distribuye realmente el alimento dentro del silo.
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
            Insylo se conecta{" "}
            <span className="font-light">con aplicaciones del ecosistema Asimetrix</span>
          </h2>

          <div className="mt-14 overflow-x-auto">
            <div className="grid min-w-[720px] grid-cols-[minmax(180px,1fr)_1.5fr_1.5fr] gap-x-6">
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
