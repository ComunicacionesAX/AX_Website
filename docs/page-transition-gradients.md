# Gradientes de transición de página → footer

Documentación de los patrones de fondo full-bleed que hemos usado como
transiciones hacia el footer.

## Cuándo usarlos

Sólo cuando la **última sección de la página termina en canvas oscuro**
o cuando queremos que el contenido "amanezca" hacia el footer sin un
corte visible entre el fondo blanco de la página y el navy del footer.

**No usar por defecto.** El comportamiento estándar es:
- Fondo blanco (o `bg-gradient-to-b from-sky-50 via-white to-sky-50`
  para páginas de producto).
- `Footer` sin `flushTop` (mantiene sus esquinas superiores redondeadas).

## Patrón A — Gradient de transición vertical + `Footer flushTop`

Se usó originalmente en `/poder-del-saber` (removido 2026-08-01). El
gradient vertical va **blanco → sky → teal → navy** y termina en un
navy sólido justo al empezar el footer. El footer entra sin esquinas
redondeadas (`flushTop`) para que no se vean parches del fondo
detrás de la curva.

### Snippet

```tsx
{/* Wrapper con gradient — la última sección viable (RelatedProducts,
    CTA, ecosystem…) va dentro. El gradient empieza claro arriba y
    termina en navy exactamente donde arranca el footer. */}
<div
  style={{
    backgroundImage:
      "linear-gradient(180deg, " +
      "#ffffff 0%, " +
      "#e6f1fb 30%, " +
      "#c7e2f7 60%, " +
      "color-mix(in srgb, var(--color-teal) 60%, #c7e2f7) 78%, " +
      "var(--color-teal) 92%, " +
      "var(--color-navy) 100%)",
  }}
>
  <RelatedProducts current={null} variant="orb-halo-stacked" />
</div>
```

Y en el layout de la página:

```tsx
<Footer flushTop />
```

### Cuando aplica bien

- Landing internos donde la última sección tiene glass cards que se ven
  bien sobre el gradient (Iluma-style transition).
- Páginas donde el pie es un "cierre visual" fuerte y se busca
  continuidad con el navy del footer.

### Cuando NO aplica

- Páginas con formularios (Cotizar) — el submit debe cerrar en un
  contexto neutro, no en un canvas navy que compita con el CTA.
- Páginas cortas — la transición se ve forzada si no hay suficiente
  scroll acumulado.
- Páginas que necesitan que el fondo blanco lleve al footer sin drama
  (mayoría de casos de negocio).

## Patrón B — `Footer flushTop` sin gradient

Sirve para páginas cuya última sección **ya termina en navy** (por
ejemplo un CTA final `on-dark`). El footer entra pegado sin
esquinas redondeadas para continuar el navy sin quiebre.

### Snippet

```tsx
{/* Última sección on-dark */}
<section className="bg-navy on-dark …">…</section>
<Footer flushTop />
```

## Referencia — `Footer` con `flushTop`

`src/components/Footer.tsx` acepta prop `flushTop?: boolean`. Por
defecto `false` (el footer tiene `rounded-t-3xl`). Cuando `true`,
omite las esquinas redondeadas.

```tsx
type FooterProps = {
  /** Si true, omite las esquinas superiores redondeadas. Útil en
   *  páginas donde el contenido previo termina en un gradient hacia
   *  navy y las curvas exponen parches del fondo. */
  flushTop?: boolean;
};
```

## Histórico

- **2026-08-01**: `/poder-del-saber` migró de "Patrón A + flushTop" a
  fondo blanco + Footer estándar. La razón: el gradient de transición
  competía visualmente con la nueva variante `orb-halo-stacked` de
  RelatedProducts (que ya tiene glass glacier propio). Documentado aquí
  como referencia para futuros casos donde la transición sí encaje.
