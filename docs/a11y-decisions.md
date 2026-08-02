# Decisiones de accesibilidad — trade-offs conocidos

Documenta decisiones donde priorizamos algo (diseño, UX, marca) sobre
cumplimiento estricto de un criterio WCAG. La idea NO es esconderlos
sino registrarlos para futuras revisiones.

## Autoplay del carrusel Solutions (WCAG 2.2.2)

### Contexto

El carrusel de "Así lo solucionamos" tiene auto-rotate cada 6s. WCAG
2.2.2 exige que auto-updating content moving > 5s pueda ser pausado,
detenido u oculto por el usuario.

### Mecanismos de pausa disponibles

- **Hover** (mouse): al pasar el cursor sobre el carrusel, `paused=true`
  vía `onMouseEnter`.
- **Focus** (teclado): al hacer Tab dentro del carrusel, `paused=true`
  vía `onFocus`. Al salir del contenedor, reanuda.
- **Interacción explícita**: click en un dot, swipe o click en flecha
  activa `stopped=true` (detención permanente hasta el `resumeAfterMs
  = 7000` de inactividad).
- **`prefers-reduced-motion`**: si el usuario lo pide en el OS, el
  autoplay se apaga completamente (progress salta a 1, no hay tick).
- **Tab en background**: `visibilitychange` pausa el timer.

### Por qué NO agregamos un botón "pausar" explícito

- El estándar cumple con **cualquier** mecanismo de pausa disponible.
- Hover + Focus + Swipe + Dot click + reduced-motion cubren los casos.
- Un botón dedicado agrega peso visual sin sumar accesibilidad real.

### Cuándo re-visitar

- Si en QA de accesibilidad se reporta que el mecanismo actual no es
  descubrible.
- Si añadimos más carruseles autoplay que ocupen áreas grandes de la
  página (ej. un hero rotativo full-bleed).

---

## `zoom: 0.8` en desktop (WCAG 1.4.4 · 1.4.10)

### Estado

- **Definido en**: `src/app/globals.css @layer base` bajo
  `@media (min-width: 1024px) { body { zoom: 0.8 } }`.
- **En mobile** no aplica — se renderiza al 100% natural.

### Impacto

- **WCAG 1.4.4 (Resize Text, AA)**: el estándar exige que el usuario
  pueda aumentar el tamaño del texto al 200% sin pérdida de
  funcionalidad. Con nuestro zoom fijo al 80%, un usuario que hace
  Cmd + para acercar el navegador compone sobre nuestro zoom → pierde
  ~20% de rango útil (si necesita 200%, terminan siendo 160% percibidos).
- **WCAG 1.4.10 (Reflow, AA)**: `zoom` no es propiedad estándar CSS.
  Chromium la interpreta como zoom real, Firefox parcialmente,
  Safari con quirks (afecta a `position: fixed`, `vw/vh`, y
  `backdrop-filter` en algunos casos). Nuestro código está
  cuidadosamente probado en Chromium — otros navegadores pueden
  presentar inconsistencias visuales menores.

### Por qué existe

Producto pidió una densidad visual tipo "landing corporativa premium"
(ver referencias Iluma). El diseño se hizo con esa escala en mente:
si eliminamos el zoom, todas las tipografías, spacings y CTAs quedan
20% más grandes de lo intencionado, sacando el sitio de su estética.
El costo de re-escalar todo el DS es alto y no aporta valor de UX si
el usuario ya tiene el zoom nativo del navegador disponible.

### Mitigaciones aplicadas

- **Sólo en desktop (>= 1024px)**: en mobile no hay zoom, los tap
  targets se respetan al 100%.
- **`-webkit-text-size-adjust: 100%`** en `<html>` — evita que iOS
  agrande la tipografía en orientation change (interacción con el
  zoom desktop no aplica).
- **Sin caps de zoom** en el navegador — el usuario siempre puede
  hacer Cmd + tantas veces como quiera (aunque parte de sí sobre
  nuestro 80%).

### Cuándo re-visitar

- Cuando haya reporte de un usuario con baja visión.
- Cuando migremos el DS a escala fluida basada en `clamp()` y `rem`
  correctamente calibrado (tarea de deuda técnica marcada como
  "medio plazo").
- Si detectamos que el sitio se ve inconsistente en Safari por el
  zoom (screenshot QA cada release).

### Alternativa técnica (futura)

Reemplazar el zoom por escala tipográfica y de spacing directa:

```css
@theme {
  /* Tokens actuales quedan a "escala 100%". */
  --text-body: 1rem;
  --spacing-1: 0.25rem;
  /* ... */
}
```

Y ajustar todos los usos de tipografía a la escala target sin depender
del zoom del body. Es un refactor grande (afecta ~200 componentes) —
priorizar solo si el reporte del usuario lo justifica.
