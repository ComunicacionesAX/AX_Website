import Image from "next/image";

export function ResearchTriangle() {
  return (
    <section className="bg-gradient-to-b from-white via-sky-50 to-white py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-2xl font-light text-navy/80 sm:text-3xl">
              Nos situamos en
            </p>
            <h2 className="mt-1 font-display text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl">
              el Research Triangle,
            </h2>
            <p className="mt-1 font-display text-2xl font-light text-navy/80 sm:text-3xl">
              Carolina del Norte
            </p>

            <div className="mt-8 max-w-md space-y-4 text-lg leading-relaxed text-muted">
              <p>Uno de los epicentros de innovación, investigación y ciencias de la vida.</p>
              <p>
                Un entorno que impulsa nuestro desarrollo tecnológico y fortalece
                nuestra capacidad para transformar conocimiento en soluciones
                reales para la producción animal.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-navy/10">
            <div className="relative aspect-[724/683]">
              <Image
                src="/images/home_research_triangle.webp"
                alt="Research Triangle, Carolina del Norte"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
