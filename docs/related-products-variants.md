# RelatedProducts — variantes y propuestas

Documentación de las variantes visuales del componente `RelatedProducts`
(cross-navegación entre PigVision · Insylo · Sensores ambientales) y las
propuestas de nuevas variantes aún no implementadas.

## Variantes actuales (implementadas)

| Variante        | Layout       | Canvas           | Uso recomendado                                                     |
| --------------- | ------------ | ---------------- | ------------------------------------------------------------------- |
| `dark`          | Vertical     | Navy sólido      | Cross-nav sobre secciones oscuras. Highest contrast.                |
| `light`         | Vertical     | Blanco glass     | Cross-nav en canvas claro / sky background.                         |
| `orb` (default) | Vertical     | Blanco glass     | Producto con orb luminoso, cards altas premium.                     |
| `orb-compact`   | Horizontal   | Teal harbor 42%  | Cross-nav discreta al pie de páginas de producto.                   |
| `orb-tech`      | Horizontal   | Teal harbor 42%  | Igual a `orb-compact` + HUD chip código + barra precisión monospace. Páginas data-heavy. |
| `orb-float`     | Horizontal   | Glacier glass    | Producto flotante SOBRE la card, texto en glass glacier. Landing.   |

## `orb-compact` — harbor tech (removida de páginas de producto 2026-08-01)

Cross-nav horizontal con canvas **harbor teal translúcido** y capas
tech animadas. Estaba aplicada al pie de las páginas de producto
(`/pigvision`, `/insylo`, `/nodos`) hasta el 2026-08-01, cuando fue
reemplazada por `orb-halo-stacked` para unificar el cross-nav con
`/poder-del-saber`.

**Sigue disponible en el catálogo** para futuros usos donde se necesite
un tratamiento "tech instrumental" y ambiente oscuro.

### Composición

```
┌────────────────────────────────────────┐
│ ┌──┐   ┌──┐                            │
│ │  │   │  │                            │
│ │● │   │ ●│    Producto                │
│ │  │   │  │    Tagline breve           │
│ │  │   │  │    → Conocer producto      │
│ └──┘   └──┘                            │
└────────────────────────────────────────┘
   ↑         ↑
 esquinas   spot cyan derivando
 HUD (L)    + grid tech + destellos
```

### Reglas de diseño

- **Canvas oscuro-transparente**: gradient teal harbor `rgba(0,89,128,
  0.42→0.28)` con `backdrop-filter: blur(36px) saturate(200%)`. El
  fondo de la sección se ve difuminado detrás → sensación de "cristal
  ahumado azul-claro" (no negro, no navy, es harbor).
- **Layout horizontal**: producto cuadrado a la izquierda
  (`w-40 sm:w-52`), zona texto flex-1 a la derecha con `pl-5 sm:pl-7`
  de separación entre imagen y título.
- **Producto DENTRO de un contenedor con orb**: aquí SÍ hay orb + ring
  visible (a diferencia de `orb-halo-stacked`). El orb es cyan pulsante
  `orb-glow` + ring cyan/45 + ring exterior cyan/70 que aparece en
  hover (sensación de "escaneando").
- **Elementos tech animados sobre TODA la card**:
  - `.tech-grid` cyan 24×24px con máscara radial hacia el producto.
  - `.tech-spot` derivando por 3 posiciones en loop de 14s.
  - Hairlines cyan superior/inferior (`bg-gradient via-cyan/70`).
  - 3 `.tech-node` cyan parpadeantes con delays escalonados.
  - Corner markers HUD en 3 esquinas (`L` cyan 40%→90% en hover).
- **Tipografía**: `text-white` (título, tracking-tight),
  `text-white/95` (tagline), **`text-teal`** (CTA — no cyan, para
  legibilidad AA sobre el fondo harbor).
- **Sub-variante `orb-tech`**: mismo canvas, añade HUD chip arriba
  izquierda (LED pulsante + código de producto en font-mono) + barra
  de precisión monospace con `ACC. 97%` en el body. Uso: páginas
  data-heavy donde el detalle técnico ayuda a la lectura.

### Snippet

```tsx
<a className="on-dark group relative isolate flex flex-row items-center overflow-hidden rounded-3xl transition-transform duration-500 ease-out hover:-translate-y-1">
  style={{
    background: "linear-gradient(180deg, rgba(0,89,128,0.42) 0%, rgba(0,89,128,0.28) 100%)",
    backdropFilter: "blur(36px) saturate(200%)",
    boxShadow: /* highlights cyan + outer shadow navy + glow cyan */,
  }}
  {/* Grid tech + spot drift + hairlines + corner markers + tech-nodes */}
  {/* Zona imagen w-40/w-52 con orb-glow + ring cyan */}
  {/* Zona texto flex-1 con pl-5/pl-7 */}
</a>
```

### Casos de uso

- Cross-nav sobre canvas claro (sky-50) donde queremos un contraste
  fuerte tipo instrumento oscuro.
- Cuando la página tiene una identidad tech marcada y necesitamos
  reforzarla al pie.
- Grids de 2 (no de 3) — la card horizontal se lee mejor cuando hay
  espacio.

### Cuando NO usar

- Cross-nav en landings ligeras / editoriales — el peso visual harbor
  compite con el contenido.
- Grids apilados verticalmente por muchos productos — el layout
  horizontal deja de justificarse.
- Canvas ya oscuro — se pierde el contraste que le da su fuerza.

### Migración a `orb-halo-stacked` (2026-08-01)

Motivo: unificar el cross-nav en todo el sitio. Antes `orb-compact` en
producto y `orb-halo-stacked` en saber. Ahora ambos usan
`orb-halo-stacked` para consistencia de lectura entre landings y
páginas de producto. `orb-compact` queda como opción futura para
secciones data-heavy o con identidad tech marcada.

---

## `orb-halo-stacked` — implementada 2026-08-01

Cross-nav estándar del sitio. Producto flotante arriba (sin container,
sin background), card glacier glass debajo con el texto. Layout aéreo
y vertical.

**Aplicado en:**
- `/poder-del-saber` (3 cards, `current: null`, grid `lg:grid-cols-3`).
- `/pigvision` `/insylo` `/nodos` (2 cards, `current: slug`, grid
  `md:grid-cols-2`).

### Composición

```
      ✨ borde cyan glacier (drop-shadow blur 4px + 10px)
     [ producto ]         ← sin container, sólo drop-shadow cyan
        ▼ overlap 25%
   ┌─────────────────┐
   │ ▒ glass glacier ▒│    ← card blanca-glacier con solo texto
   │  Producto        │
   │  Tagline         │
   │  → Conocer       │
   └─────────────────┘
```

### Reglas de diseño

- **El halo va PEGADO al contorno del producto**, no como un orbe
  irradiado. Usamos `drop-shadow` (no `box-shadow`) sobre el `<Image>`
  para que el glow siga la silueta transparente del render, no un
  círculo. Múltiples capas: corto brillante (4px) + medio (10px) +
  sombra vertical navy sutil (grounding).
- **Sin ring exterior**. Cualquier círculo/border/orb decorativo
  compite con la forma real del producto y ocupa espacio que debe ser
  aéreo.
- **Gradient de la card equilibrado con el texto**: blanco dominante
  (82%→72%) con tinte sky muy sutil al fondo (55%). El texto navy tiene
  contraste AA, no compite con el fondo.
- **Producto se sale hacia arriba** de la card mediante
  `position: absolute` sobre un wrapper `<a>` con `pt-24 sm:pt-28`
  (padding-top que reserva espacio para el producto flotante).
- **Cards igualan altura** en el mismo row: `h-full` en el `<a>`,
  `flex-1` en la card interior, `mt-auto` en el CTA. Todas las cards
  del row muestran el CTA en la misma línea vertical, sin importar
  cuánto texto tenga cada tagline.

### Snippet

```tsx
<a className="group relative isolate flex h-full flex-col items-center pt-24 sm:pt-28">
  {/* Producto flotante sin container */}
  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto h-48 w-48 sm:h-56 sm:w-56">
    <Image
      src={p.img}
      alt={p.name}
      fill
      className="relative object-contain p-4 transition-transform group-hover:-translate-y-2 group-hover:scale-105 sm:p-5"
      style={{
        filter:
          "drop-shadow(0 0 4px rgba(151,244,255,0.85)) " +
          "drop-shadow(0 0 10px rgba(151,244,255,0.55)) " +
          "drop-shadow(0 12px 18px rgba(4,9,57,0.22))",
      }}
    />
  </div>

  {/* Card glacier glass — sólo texto */}
  <div
    className="relative flex w-full flex-1 flex-col items-center rounded-3xl border border-white/50 px-6 pt-20 pb-7 text-center transition-all group-hover:-translate-y-1 group-hover:shadow-xl sm:px-8 sm:pt-24 sm:pb-8"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(240,248,255,0.72) 60%, rgba(199,226,247,0.55) 100%)",
      backdropFilter: "blur(28px) saturate(150%)",
      boxShadow:
        "inset 0 1px 0 0 rgba(255,255,255,0.9), " +
        "inset 0 -1px 0 0 rgba(4,9,57,0.05), " +
        "0 22px 44px -18px rgba(4,9,57,0.20), " +
        "0 14px 28px -12px rgba(151,244,255,0.22)",
    }}
  >
    <h3 style={{ textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}>{p.name}</h3>
    <p>{p.tagline}</p>
    <div className="mt-auto pt-5">…</div>
  </div>
</a>
```

### Casos de uso

- Landing internos que buscan un cross-nav "aéreo" y premium.
- Páginas cuya última sección debe cerrar con un cierre visual liviano.
- Cuando el producto tiene render con fondo transparente/PNG (el
  drop-shadow glow depende de la silueta real).

### Cuando NO usar

- Renders con fondo sólido: el drop-shadow siguiendo la silueta se
  convierte en un rectángulo brillante rectangular, no glacier.
- Grids con muchas cards (> 3): la separación aérea vertical se pierde
  cuando el usuario ya está scrolleando.
- Canvas oscuro: el gradient glacier (blanco→sky) queda plano contra
  navy. Usar `orb-compact` (dark glass) en su lugar.

---

## Propuesta pendiente — `orb-halo-stacked` (original, superseded)

Feedback recibido el 2026-08-01 sobre la variante final del cross-nav
en `/poder-del-saber`:

> "La imagen del producto con el halo debería estar como flotante, con
> background transparente. Debajo del producto habría una card con
> efecto glass color glacier con el texto."

### Diferencias vs. `orb-float` actual

`orb-float` actual:

- Layout **horizontal** (producto izquierda, texto derecha).
- Producto flota, sale parcialmente del container.
- Card glacier contiene sólo el texto, pero el producto flota adyacente.

`orb-halo-stacked` propuesta:

- Layout **vertical apilado** (producto arriba, card debajo).
- Producto y halo viven en **background completamente transparente**
  arriba (sin container propio, sin border, ninguna forma).
- **Card glacier glass** con sólo el texto debajo, alineada al centro.
- El producto se sale parcialmente hacia arriba del área de la card
  (mismo patrón "flotante" pero eje vertical).

### Diseño target

```
   ┌───────────────────┐
   │    ✨ halo cyan    │      ← producto + halo, sin container
   │   [producto]      │
   └───────────────────┘
        ▼ overlap 30%
┌───────────────────────────┐
│ ▒▒ glass glacier ▒▒       │  ← card glass color glacier
│                           │
│  Nombre del producto      │
│  Tagline breve            │
│  → Conocer producto       │
│                           │
└───────────────────────────┘
```

### Notas de implementación (a futuro)

- Estructura: `<article>` con `flex-col`, contenedor superior
  `overflow-visible` para permitir que el producto se salga hacia
  arriba con `translate-y-[-30%]`.
- Producto: sin `bg-*` ni `border-*`, sólo el orb + ring + `<Image>`.
- Card: aplicar el mismo tratamiento glass glacier de `orb-float`
  (gradient sky→white→cyan translúcido, blur profundo).
- Padding-top de la card debe compensar el overlap del producto para
  que el texto no quede tapado.
- Hover: el producto sube levemente (`-translate-y-2`), la card baja
  su sombra (elevación).

### Por qué no está aplicada aún

- Requiere ajuste vertical de spacing por página (el producto que se
  sale hacia arriba puede tocar el heading anterior).
- Los renders de producto (`home_render_*`.webp) tienen ratios distintos
  (PigVision 768×536, Insylo 768×1131, Nodos 768×536) — el layout
  vertical apilado hace más visible esa asimetría. Podría necesitar
  crop consistente o max-height.
- La `orb-float` actual cumple parcialmente el objetivo; se deja como
  fallback funcional hasta iterar la propuesta stacked.

## Convenciones comunes a todas las variantes

- Todas usan el mismo catálogo `CATALOG` (nombre, href, img, tagline,
  accuracy, code).
- Todas soportan `current: ProductKey | null` — al pasar el slug del
  producto actual, se excluye del listado y se muestran los otros dos.
- Con `current=null`, se muestran los tres productos.
- El heading y subtitle vienen de `t.common.discoverTitle` /
  `discoverSubtitle` (cuando `current=null`) o `relatedTitle` /
  `relatedSubtitle` (con `current` definido).
