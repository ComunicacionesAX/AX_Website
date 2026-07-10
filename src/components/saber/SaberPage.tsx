export function SaberPage() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Hero — gradiente diagonal glacier -> harbor -> midnight (design system) */}
      <section className="container-x pt-28">
        <div
          className="flex min-h-[440px] flex-col items-center justify-center rounded-[24px] px-8 py-16 text-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #97f4ff 0%, #005980 45%, #040939 100%)",
          }}
        >
          <h1 className="font-display text-5xl font-medium leading-tight tracking-tight sm:text-7xl lg:text-8xl">
            El poder del saber
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-2xl">
            Información técnica, análisis y datos que explican cómo el monitoreo
            continuo mejora la rentabilidad en granja.
          </p>
        </div>
      </section>

      {/* Contenido — temáticas (pendiente de diseño en Figma) */}
      <section className="container-x py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Temática 1", "Temática 2", "Temática 3"].map((t) => (
            <article
              key={t}
              className="flex min-h-[260px] flex-col justify-end rounded-3xl bg-white p-7 shadow-xl shadow-navy/5"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-teal">
                El poder del saber
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-navy">
                {t}
              </h3>
              <p className="mt-2 text-[15px] leading-snug text-muted">
                Próximamente: artículos, estudios y análisis técnicos.
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
