# Content inventory — trabajo de UX Writing

Exportación de todos los strings del sitio (ES + EN pareados) desde
`src/i18n/dictionary.ts`. Generado con `node scripts/export-content.mjs`.

**Total actual: 363 strings.**

## Archivos disponibles

| Archivo | Uso |
|---|---|
| `content-inventory.xlsx` | Excel para revisión offline. Columnas: Ruta · Sección · Contexto · Texto ES · Texto EN · Notas · Estado. |
| `content-inventory.csv` | Mismo contenido en CSV. Súbelo a Google Sheets para colaboración en tiempo real (File → Import → Upload). |
| `content-inventory.json` | Estructura completa `{ es, en }` idéntica al diccionario del sitio. Útil para diff y re-integración. |

## Columnas del Excel / CSV

- **Ruta** — path completo del i18n (ej: `hero.title1`, `pigvision.features.[2].title`). Sirve para localizar el string en el código.
- **Sección** — top-level key (`nav`, `hero`, `cotizar`…). Filtro rápido.
- **Contexto** — descripción humana de dónde vive el texto (ej: "Home · Hero", "Formulario Cotizar").
- **Texto ES** — versión actual en español.
- **Texto EN** — versión actual en inglés.
- **Notas** — vacío. Usa esta columna para tus comentarios de UX writer.
- **Estado** — todos empiezan en `Pendiente`. Sugiero usar: `Pendiente` · `En revisión` · `Aprobado` · `Requiere cambios`.

## Workflow sugerido

### Opción A — Trabajo individual (Excel local)

1. Abre `content-inventory.xlsx` en Excel/Numbers.
2. Filtra por **Sección** para trabajar página por página.
3. Edita las columnas **Texto ES** y **Texto EN** directamente.
4. Marca **Estado = Aprobado** cuando termines cada string.
5. Guarda y devuelve el archivo. Yo re-poblo `dictionary.ts` con los cambios.

### Opción B — Colaboración (Google Sheets)

1. Ve a [sheets.google.com](https://sheets.google.com) → **Crear** nueva hoja.
2. **Archivo → Importar → Cargar** → arrastra `content-inventory.csv`.
3. Elige **Reemplazar hoja** + **Separador: coma**.
4. Comparte con tu equipo con permisos de edición.
5. Usa **Vista → Congelar → 1 fila** para mantener la cabecera fija.
6. Al terminar: **Archivo → Descargar → CSV** y me lo pasas.

### Opción C — Edición como código (JSON)

Si prefieres editar como developer:

1. Abre `content-inventory.json`.
2. Modifica los strings directamente respetando la estructura.
3. Me lo pasas y actualizo `src/i18n/dictionary.ts` con un diff mecánico.

## Estructura de los datos

- **Strings** de UI en `es` y `en` (paridad completa garantizada por
  `typeof es` en TypeScript).
- Los arrays de objetos se expanden con índice: `hero.productItems.[0].name`.
- Los valores numéricos (`accuracy`, etc) están **excluidos** del export —
  no son texto de UX.

## Regenerar

Después de cambios en `src/i18n/dictionary.ts`:

```bash
node scripts/export-content.mjs
```

Sobrescribe los 3 archivos en este directorio.

## Re-integración

Cuando tengas la revisión de UX Writing lista, pásame el archivo
editado (Excel, CSV o JSON) y yo hago el diff y actualizo
`dictionary.ts` en un solo paso. Type-check corre para garantizar
paridad ES/EN.
