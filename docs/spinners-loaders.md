# Spinners y loaders del DS Asimetrix

Indicadores de carga disponibles en el sistema de diseño.

## Componentes disponibles

### 1) `.spinner` — anillo circular genérico

CSS-only en `globals.css`. Anillo teal (canvas claro) o cyan
(on-dark) sobre track sky. 16px por defecto, escalable con
utilidades Tailwind (`w-6 h-6`, etc).

```html
<span class="spinner" aria-hidden="true"></span>
```

**Cuándo usarlo:**
- Loading states genéricos (API calls sin marca).
- Skeletons de contenido antes de que llegue data.
- Situaciones donde el peso visual debe ser mínimo.

### 2) `.spinner-ax` — isotipo Asimetrix animado CSS

CSS-only. Toma el SVG `logo_ax_isotipo.svg` y le aplica keyframe
`spinner-ax-rotate` (rotación 360° + scale 1↔1.06 en 1.4s). Un
filter CSS colorea el SVG navy en teal (light canvas) o cyan
(on-dark).

```html
<img src="/images/logo_ax_isotipo.svg" class="spinner-ax" />
```

**Cuándo usarlo:**
- Loading states con branding sutil (el isotipo se reconoce como
  Asimetrix pero rota como spinner clásico).
- Cuando queremos el color-coded del DS (teal/cyan según canvas)
  sin depender de un GIF externo.
- **Ligero** (SVG + CSS, ~2KB). Prefiere sobre `logo_ax_isotipo_animado`
  cuando bandwidth importa.

### 3) `logo_ax_isotipo_animado.gif` — animación oficial de marca

**El más "de marca"**. Es la animación exacta que aparece en el DS
Asimetrix (`/Users/ajaramillo/Claude_Proyectos/Design_System/asimetrix-ds/public/logos/Logo-Asimetrix-Animado---Azul.gif`).
93 frames, 400×400px, 105KB.

**IMPORTANTE — whitespace del canvas**: el GIF original tiene el
isotipo ocupando sólo ~42% del canvas (172×173px de 400×400). Si
lo consumes con un `<img>` directo a tamaño natural (`h-10 w-10`),
el isotipo se ve microscópico (~17px reales sobre 40px).

**Patrón correcto** (recorta whitespace sin editar el asset):

```tsx
{sending && (
  <span
    aria-hidden="true"
    className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden"
  >
    <img
      src="/images/logo_ax_isotipo_animado.gif"
      alt=""
      className="h-full w-full max-w-none scale-[2.35] object-contain"
    />
  </span>
)}
```

**La magia**: `scale-[2.35]` (que es `1 / 0.42`) amplía el GIF para
que el isotipo llene el `overflow-hidden` del wrapper. El whitespace
queda por fuera del span y se recorta. El isotipo ahora ocupa el
100% del tamaño visible declarado.

**Cuándo usarlo:**
- Loading states de acciones de negocio importantes (submit de
  formulario, guardado de cambios) — reforzar la marca en el momento
  de compromiso del usuario.
- Botones primarios que se merecen ese "brand moment".

**Cuándo NO usarlo:**
- Skeletons o loaders genéricos — pesa 105KB.
- Componentes que aparecen muchas veces a la vez (listas, tablas) —
  cada instancia carga el GIF completo.

## Consumo actual

- **`/cotizar` submit**: `logo_ax_isotipo_animado.gif` con el patrón
  de wrapper `h-8 w-8 overflow-hidden` + `scale-[2.35]`. Uso: reforzar
  marca en el momento del submit.

## Anti-patrones a evitar

### ❌ Usar el GIF sin recortar whitespace

```tsx
<img src="/images/logo_ax_isotipo_animado.gif" className="h-10 w-10" />
```

Resultado: isotipo microscópico (~17px sobre 40px). Bug histórico
2026-08-01 corregido documentando este patrón.

### ❌ Modificar el GIF (recortar / re-exportar)

El GIF viene directo del DS y se sincroniza con la fuente. Si lo
recortamos localmente y luego el DS actualiza el asset, perdemos
la actualización. El patrón `scale + overflow-hidden` deja el
asset intacto.

## `prefers-reduced-motion`

Todos los spinners deben respetar la preferencia del usuario:
- `.spinner`: `animation-duration: 2s` (más lento).
- `.spinner-ax`: `animation-duration: 3s`.
- El GIF: no controlable por CSS (el navegador puede pausarlo en
  algunos casos según OS). Considerar mostrar `logo_ax_isotipo.svg`
  estático cuando el usuario pide reduced-motion.
