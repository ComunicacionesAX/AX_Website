export function MidCTA() {
  return (
    <section className="bg-gradient-to-b from-sky-50 via-white to-sky-50 py-32">
      <div className="container-x flex flex-col items-center text-center">
        <h2 className="max-w-3xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
          ¿Quieres ver cómo funcionaría en tu granja?
        </h2>
        <a
          href="#cotizar"
          className="mt-10 inline-flex items-center rounded-xl bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/20 transition hover:bg-teal-600 hover:shadow-xl hover:-translate-y-0.5"
        >
          Hablemos sobre tu operación
        </a>
      </div>
    </section>
  );
}
