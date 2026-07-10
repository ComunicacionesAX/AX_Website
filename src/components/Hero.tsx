const VIDEO_ID = "4OXS_f9DCPU";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden rounded-b-[2.5rem] bg-navy text-white"
    >
      {/* Background video */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/home_produccion_fotograma.webp)" }}
        />
        <iframe
          title="Asimetrix"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&disablekb=1`}
          allow="autoplay; encrypted-media"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.35]"
        />
        {/* Navy overlays for contrast */}
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-navy/60" />
      </div>

      <div className="container-x relative flex min-h-[100vh] flex-col justify-center pb-28 pt-36">
        <div className="max-w-5xl animate-fade-up">
          <h1 className="font-display text-[clamp(3.325rem,11.4vw,10.925rem)] font-light leading-[0.92] tracking-tight">
            Monitoreo
            <br />
            inteligente
          </h1>
          <p className="mt-3 font-display text-2xl font-light text-white/90 sm:text-[2.75rem] sm:leading-tight">
            para granjas porcinas y avícolas
          </p>

          <div className="mt-14">
            <a
              href="#cotizar"
              className="inline-flex items-center rounded-xl bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/40 transition hover:bg-teal-600"
            >
              Evaluar mi granja
            </a>
          </div>
        </div>

        {/* Description pill */}
        <div className="mt-10 max-w-md self-start rounded-2xl bg-teal/80 px-8 py-7 text-center text-lg leading-relaxed backdrop-blur-sm lg:absolute lg:bottom-36 lg:right-6 lg:mt-0 lg:self-auto xl:right-16">
          Cámaras inteligentes, sensores y herramientas de IA que transforman
          datos en rentabilidad.
        </div>
      </div>
    </section>
  );
}
