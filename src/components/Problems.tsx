"use client";

import Image from "next/image";
import { AlertTriangle, EyeOff, TrendingUp, Maximize2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import type { ComponentType, SVGProps } from "react";

const images = [
  "/images/home_sindatos_silos.webp",
  "/images/home_sindatos_cerditos.webp",
  "/images/home_sindatos_gallina-scaled.webp",
  "/images/home_sindatos_silos.webp",
];

// Íconos por card — replican la referencia del DS: cada problema tiene un
// símbolo pertinente (falta de control, ceguera al peso, curva/conversión,
// impacto/expansión).
const icons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  AlertTriangle,
  EyeOff,
  TrendingUp,
  Maximize2,
];

// ─── INTENTO PENDIENTE — Scroll-hint mobile ────────────────────────────
// Hemos intentado 2 aproximaciones para animar automáticamente el
// carrusel al entrar al viewport (revelar que hay más contenido a la
// derecha). Ambas fallaron; se dejan documentadas para retomar cuando
// dediquemos tiempo a resolverlo bien.
//
// Intento 1 — CSS keyframe con `transform: translateX` sobre el track.
//   Bug: el track tiene `overflow-x-auto`; el transform mueve el
//   elemento completo (viewport y todo su contenido). La 1ª card, que
//   empieza pegada al borde izquierdo, se traslada FUERA del área
//   visible y se corta contra el `<section overflow-x-clip>` padre.
//   Ver screenshot de referencia en el chat de sesión 2026-08-02.
//
// Intento 2 — Tween manual de `scrollLeft` del track con rAF.
//   Bug: aunque desactivamos `scrollSnapType = "none"` durante el
//   tween, iOS Safari + Android Chrome siguen "atrapando" el scroll
//   con el `snap-mandatory` de Tailwind entre frames. La animación se
//   ve entrecortada o directamente no fluye. Tampoco resolvió el
//   problema visual de recorte reportado por el usuario.
//
// Próximo intento sugerido (NO implementado):
//   - Duplicar visualmente la 1ª card AL FINAL del track (o vice
//     versa) para que sea "infinite loop". Sólo mostrar el hint como
//     una animación puramente decorativa sobre las cards secundarias
//     (dupes), sin tocar el scroll real del elemento primario.
//   - O construir el carrusel con transform completo (no overflow
//     scroll) y usar swipe handlers programáticos — cambio grande.
//   - O simplemente añadir una animación de rebote visual en el
//     borde derecho (cyan shimmer) sin mover el scroll → indica "hay
//     más" sin manipular posición.
//
// Estado: DIFERIDO. Componente restaurado a versión pre-animación.

export function Problems() {
  const { t } = useI18n();
  const problems = t.problems.items.map((p, i) => ({
    ...p,
    img: images[i],
    Icon: icons[i] ?? AlertTriangle,
  }));
  return (
    <section className="bg-gradient-to-b from-white via-sky-50 to-white py-28">
      <div className="container-x">
        <h2 className="section-title mx-auto max-w-3xl text-balance text-center">
          {t.problems.title}
        </h2>
      </div>

      {/* Carrusel horizontal. Cada card tiene:
          - Tag glass arriba (izquierda) con ícono + título en navy, fondo
            translúcido con blur alto — DS Asimetrix.
          - Imagen a full-bleed detrás.
          - Descripción abajo sobre un gradient corto y sutil desde navy/80
            para asegurar contraste sin invadir la imagen. */}
      <div className="mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
        {problems.map((p, i) => {
          const Icon = p.Icon;
          return (
            <article
              key={i}
              className="group relative aspect-[3/4.6] w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[400px]"
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 800px, 1200px"
                quality={90}
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Gradient solo abajo — deja la imagen respirar en el 60%
                  superior y asegura contraste del texto en la zona inferior. */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/85 via-navy/45 to-transparent" />

              {/* Tag glass — chip con ícono + título en navy, fondo
                  blanco translúcido + backdrop-blur. Posicionado arriba
                  izquierda a ~24px del borde. */}
              <div className="absolute left-5 right-5 top-5 flex">
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2 shadow-lg shadow-navy/10 backdrop-blur-xl"
                  style={{
                    // Fondo cristal — blanco 55% con saturate/brightness
                    // para que hereda tono cálido de la imagen debajo pero
                    // conserva legibilidad del navy.
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 100%)",
                    WebkitBackdropFilter:
                      "blur(20px) saturate(180%) brightness(105%)",
                    backdropFilter:
                      "blur(20px) saturate(180%) brightness(105%)",
                  }}
                >
                  <Icon className="h-4 w-4 text-navy" aria-hidden="true" />
                  <span className="text-sm font-semibold leading-none text-navy">
                    {p.title}
                  </span>
                </div>
              </div>

              {/* Descripción — abajo, sin línea cyan (matches referencia). */}
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
                  {p.text}
                </p>
              </div>
            </article>
          );
        })}
        <div className="shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
      </div>
    </section>
  );
}
