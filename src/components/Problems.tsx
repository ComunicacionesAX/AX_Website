import Image from "next/image";

const problems = [
  {
    img: "/images/home_sindatos_silos.webp",
    title: "No controlas el alimento",
    text: "Sin saber el nivel real del alimento, pedir más o dejar de pedir te cuesta.",
  },
  {
    img: "/images/home_sindatos_cerditos.webp",
    title: "Decides con estimaciones",
    text: "Al no conocer el peso real del lote, puedes retrasar o adelantar salidas y afectar la rentabilidad.",
  },
  {
    img: "/images/home_sindatos_gallina-scaled.webp",
    title: "Alteras la conversión",
    text: "Si no detectas a tiempo cambios en las condiciones ambientales, impactas la eficiencia productiva.",
  },
  {
    img: "/images/home_sindatos_silos.webp",
    title: "Impactas la ganancia de peso",
    text: "Al perder de vista el estado real del alimento, terminas desperdiciando recursos.",
  },
];

export function Problems() {
  return (
    <section className="bg-gradient-to-b from-white via-sky-50 to-white py-28">
      <div className="container-x">
        <h2 className="section-title mx-auto max-w-3xl text-center">
          Lo que pasa cuando decides sin datos
        </h2>
      </div>

      {/* Carousel row */}
      <div className="mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
        {problems.map((p, i) => (
          <article
            key={i}
            className="group relative aspect-[3/4.6] w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[400px]"
          >
            <Image
              src={p.img}
              alt={p.title}
              fill
              sizes="400px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <h3 className="text-xl font-medium">{p.title}</h3>
              <div className="my-4 h-0.5 w-12 bg-cyan" />
              <p className="text-[15px] leading-relaxed text-white/85">{p.text}</p>
            </div>
          </article>
        ))}
        <div className="shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
      </div>
    </section>
  );
}
