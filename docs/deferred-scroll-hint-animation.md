# Diferido — Scroll-hint mobile en "Lo que pasa cuando decides sin datos"

**Estado**: DIFERIDO 2026-08-02
**Componente**: `src/components/Problems.tsx`
**Sección**: Home · "Lo que pasa cuando decides sin datos" (carrusel
horizontal con 4 cards).

## Intención

Cuando un usuario mobile scrollea hasta esta sección, disparar una
señal visual clara de que **el bloque es un carrusel horizontal** —
las cards no se ven cortadas obviamente al inicio y algunos usuarios
piensan que sólo hay 1 card visible + una parcial en el borde.

La animación soñada:

1. Usuario scrollea → sección entra al viewport.
2. Tras ~300ms de "asentamiento", el carrusel se desliza solo un poco
   hacia la derecha (~110–140px), revelando parcialmente la segunda
   card.
3. Se queda ~500ms en esa posición para que el usuario alcance a leer.
4. Regresa suave a su posición original.
5. Termina — el usuario ya sabe que puede scrollear/swipear.

Se dispara **una sola vez** por sesión (guard + IntersectionObserver
desconectado). Sólo en mobile (< 640px). Respeta
`prefers-reduced-motion`.

## Intentos realizados y por qué fallaron

### Intento 1 — CSS keyframe `transform: translateX` sobre el track

```css
@keyframes scroll-hint {
  0%   { transform: translateX(0); }
  25%  { transform: translateX(-90px); }
  55%  { transform: translateX(-90px); }
  100% { transform: translateX(0); }
}
.animate-scroll-hint {
  animation: scroll-hint 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}
```

Aplicado al `<div ref={trackRef}>` que tiene `overflow-x-auto` y
`snap-x snap-mandatory`.

**Bug observado (screenshot chat 2026-08-02)**: la 1ª card queda
recortada por el borde izquierdo del `<section>` padre. Por qué:

- `transform: translateX(-90px)` desplaza el elemento COMPLETO
  (viewport de scroll incluido).
- La 1ª card empieza pegada al borde izquierdo del track.
- Al trasladar el track -90px, la 1ª card se sale del área visible.
- Con `overflow-x-clip` en el `<section>` padre, la parte que se sale
  es cortada abruptamente.
- Sin `overflow-x-clip`, el track se sale del `<body>` y causa
  scroll horizontal accidental de toda la página.

Ambas variantes tienen el mismo problema fundamental: **el `transform`
mueve el elemento entero, no el contenido interno.**

### Intento 2 — Tween manual de `scrollLeft` con requestAnimationFrame

```ts
const tween = (from, to, duration) => new Promise(...);
el.style.scrollSnapType = "none";
await tween(0, 110, 650);
await new Promise(r => setTimeout(r, 500));
await tween(110, 0, 650);
el.style.scrollSnapType = originalSnap;
```

**Idea**: mover el `scrollLeft` real del track — el navegador clippea
las cards nativamente contra el viewport del track, así la 1ª card no
se sale de su contenedor.

**Bug observado**: sigue sin fluir en el usuario final. Hipótesis:

- iOS Safari + Android Chrome tienen bugs conocidos con
  `scroll-behavior: smooth` combinado con `scroll-snap-type`.
- El `overflow-x-auto` con `snap-mandatory` puede estar re-snapping
  entre frames del `rAF`, aunque desactivamos snap inline.
- El `scroll-smooth` global de Tailwind (via `html { scroll-behavior:
  smooth }`) puede interferir con la asignación directa de
  `scrollLeft`.

También durante este intento **cambié la imagen del índice 3** para
resolver un hallazgo de auditoría (imagen duplicada con índice 0).
El usuario no quería ese cambio, se revirtió.

## Estado actual del componente

Restaurado a la versión **pre-animación** — sin `useEffect`, sin
`trackRef`, sin dots, sin `IntersectionObserver`. Las cards siguen
scrolleando manualmente con dedo/mouse. El componente funciona pero
sin el hint visual automático.

## Alternativas sugeridas (no implementadas)

### Alt A — Shimmer cyan en el borde derecho

En vez de mover el scroll, animar un `::after` sobre el track con
gradient cyan que "brilla" desde el borde derecho hacia dentro (~50px
de ancho) por 1s. Comunica "hay más" sin manipular scroll ni posición
de cards.

### Alt B — Peek fijo permanente

Reducir el ancho de la card 1 en mobile o añadir `padding-right: 40px`
al track de modo que la card 2 SIEMPRE asome ~40px por la derecha,
sin animación. Estáticamente comunica que hay más.

### Alt C — Refactor a carrusel con transform completo

Cambiar el track de `overflow-x-auto` a `overflow: visible` +
`transform: translateX` calculado en JS (patrón usado en
`Solutions.tsx`). Con eso el hint animation funciona igual que la
mobile carousel de Solutions (peek visible naturalmente).

Costo: reescribir handlers de scroll, swipe, snap. ~2h de trabajo +
QA en 3 navegadores.

### Alt D — Chevron animado indicando "→"

Añadir un chevron `>` cyan flotante en el borde derecho del track,
con animación `translateX(0 → 8px → 0)` en loop lento. No mueve nada
del contenido — sólo agrega una señal visual periférica.

## Próxima retomada

Si volvemos a esto, empezar por **Alt A o Alt D** (menos riesgo, sin
tocar el DOM del carrusel). Sólo escalar a Alt C si el usuario reporta
que las alternativas no comunican suficiente.
