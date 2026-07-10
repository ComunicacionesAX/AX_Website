import Image from "next/image";

const segments = [
  {
    icon: "/images/icons/icon_para_productores.svg",
    title: "Productores",
    text: "que buscan más control y rentabilidad",
  },
  {
    icon: "/images/icons/icon_para_equipo.svg",
    title: "Equipos técnicos",
    text: "que necesitan datos confiables",
  },
  {
    icon: "/images/icons/icon_para_lideres.svg",
    title: "Líderes",
    text: "que toman decisiones estratégicas",
  },
];

export function Audience() {
  return (
    <section
      id="poder"
      className="bg-gradient-to-b from-white via-sky-50 to-white py-32"
    >
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-4 lg:divide-x lg:divide-navy/10">
          <h2 className="section-title lg:pr-8">
            ¿Para quién es Asimetrix?
          </h2>

          {segments.map((s) => (
            <div
              key={s.title}
              className="flex flex-col items-center px-4 text-center"
            >
              <Image src={s.icon} alt="" width={32} height={32} className="h-8 w-8" />
              <h3 className="mt-4 font-display text-xl font-bold text-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
