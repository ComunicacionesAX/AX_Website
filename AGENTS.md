# AX Website

Vanilla Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. No custom framework layer — treat it as a standard Next.js project.

See `README.md` for setup and scripts.

## UX Writing — regla general de line-breaks

En cualquier título, subtítulo, tagline o párrafo del sitio, siempre
aplicar estas reglas para line-breaks:

1. **Nunca palabras viudas** — no dejar una palabra solitaria en la
   última línea de un párrafo o título. Usar `text-pretty` en `<p>`
   y `text-balance` en `<h1>/<h2>/<h3>` como default.
2. **Cortes en lugares con sentido**:
   - Preferir cortar **después de un signo de puntuación** (punto o
     coma).
   - Si el corte va **dentro** de una oración, cortar en una posición
     que **no rompa el sentido** de la frase y **facilite la lectura**
     (después de una preposición o conjunción, no antes).
3. **Cuando el line-break importa** (mismo texto en ES y EN debe
   quebrarse en un punto exacto), usar `\n` en el string de i18n
   + `whitespace-pre-line` en la clase del elemento HTML.
4. **Ambos idiomas** — cualquier ajuste manual de line-break debe
   aplicarse tanto en ES como en EN (paridad garantizada por
   `typeof es`).
5. **Mobile primero** — validar el corte a 375px de ancho (iPhone SE)
   antes que en desktop. Los line-breaks manuales rara vez rompen
   desktop.
