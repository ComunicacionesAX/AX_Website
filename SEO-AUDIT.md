# Auditoría SEO y plan de trabajo — AX Website

**Fecha:** 14 de agosto de 2026
**Rama auditada:** `redesign/code-only` (Next.js 16.2.10 / React 19 / Tailwind v4)
**Sitio en producción:** `asimetrix.co` (WordPress)
**Alcance:** auditoría técnica del redesign, comparativa con referentes de la industria y plan de trabajo priorizado.

> **Estado:** Fase 0 y Fase 1 **completas** y verificadas.
> Ver [§7 Estado de implementación](#7-estado-de-implementación) para el detalle de qué se hizo y qué queda.
> Las secciones 1 a 4 describen el diagnóstico **original**, previo a los cambios.

> **Fe de errata · 21 de agosto de 2026.** La versión original justificaba la página de FAQ
> por "habilitar rich results". Es incorrecto: Google restringió ese formato en agosto de 2023.
> La tarea sigue siendo válida, con otra justificación. Corregido en [§2.5.1](#251-corrección-faqpage-ya-no-genera-rich-results)
> y en la tarea 2.4 de la Fase 2.

---

## Resumen ejecutivo

El redesign tiene **buenos fundamentos técnicos** (páginas estáticas prerenderizadas, contenido server-rendeado, `alt` en todas las imágenes, `title`/`description` únicos) pero **cero infraestructura SEO**: no hay sitemap, robots, canonical, Open Graph ni datos estructurados.

Hay tres problemas que superan en importancia a todo el checklist técnico:

1. **La migración WordPress → Next.js va a romper URLs indexadas.** 3 de 6 páginas cambian de ruta y los 2 posts del blog desaparecen. Sin redirects 301 se pierde la autoridad acumulada. *Costo de arreglo: horas.*
2. **El inglés no existe para Google.** Hay 943 líneas de contenido traducido que no tienen URL y por lo tanto no se indexan. Asimetrix opera desde Durham, Carolina del Norte — el mercado estadounidense es objetivo real y hoy es inalcanzable por búsqueda orgánica.
3. **El hero del home pesa 22 MB con `preload="auto"`.** En 4G rural — exactamente donde está el cliente — esto destruye el LCP.

Sobre el panorama competitivo: **nadie en este nicho hace SEO agresivo.** El único competidor con disciplina de contenido (BinSentry) tiene ~12 artículos. La barrera de entrada es bajísima, especialmente en español.

---

# 1. Auditoría técnica del redesign

## 1.1. Lo que ya está correcto

No requiere intervención:

- **Las 5 rutas son estáticas prerenderizadas** (`○ Static` en la salida de `next build`). El build compila limpio, sin errores de TypeScript.
- **El contenido sí llega al crawler.** Aunque los 31 componentes son `"use client"`, Next los server-rendea: verifiqué H1, H2 y cuerpo de texto en el HTML crudo de las 5 rutas. Esto era el riesgo principal a descartar y está descartado.
- **`alt` en todas las imágenes**: 16 en el home, 8 por página de producto, 9 en `/poder-del-saber`. Ninguna sin atributo. Los 3 `alt=""` del home corresponden a iconos decorativos (`icon_para_productores.svg`, `icon_para_equipo.svg`, `icon_para_lideres.svg`) — eso es práctica correcta de accesibilidad, no un defecto.
- **`next/image`** en 11 ubicaciones, con `sizes` bien declarado.
- **Breadcrumbs semánticos** (`<nav aria-label="Breadcrumb">` + `<ol>` + `aria-current="page"`).
- **`title` y `description` únicos** en las 5 páginas, con longitudes razonables y buen uso de keywords.
- Jerarquía de headings coherente, con una excepción (ver 1.3).

## 1.2. Elementos ausentes

Medido sobre el HTML efectivamente servido:

| Elemento | Estado | Archivo donde correspondería |
|---|---|---|
| `robots.txt` | **404** | `src/app/robots.ts` (no existe) |
| `sitemap.xml` | **404** | `src/app/sitemap.ts` (no existe) |
| `rel="canonical"` | 0 ocurrencias | `layout.tsx` + metadata por página |
| Open Graph (`og:*`) | **0 tags** | metadata por página |
| Twitter Cards (`twitter:*`) | **0 tags** | metadata por página |
| JSON-LD / Schema.org | **ninguno** | layout + páginas de producto |
| `hreflang` | 0 | requiere i18n con rutas (ver 2.2) |
| `metadataBase` | no definido | `layout.tsx` |
| `priority` en imagen LCP | **0 usos** en todo `src/` | componentes de hero |

El `<head>` completo del home hoy contiene únicamente: `charSet`, `viewport`, `next-size-adjust`, `<title>`, `description` e `icon`.

**Consecuencia inmediata del faltante de Open Graph:** al compartir cualquier página por WhatsApp o LinkedIn no aparece imagen ni título controlado. En B2B agropecuario, donde el enlace circula por WhatsApp entre productores, esto es tráfico perdido de forma directa y medible.

## 1.3. Estructura de headings

Extraída del HTML servido:

| Ruta | H1 actual | Observación |
|---|---|---|
| `/` | "Nunca más decidas sin datos" | Claim de marca, sin intención de búsqueda |
| `/pigvision` | "PigVision" | **Solo nombre de marca** |
| `/insylo` | "Insylo" | **Solo nombre de marca** (además en conflicto, ver 2.3) |
| `/nodos` | "Nodos ambientales" | Término interno, no de búsqueda |
| `/poder-del-saber` | "El poder del saber" | Salta de H1 a H3 sin H2 intermedio |

Nadie busca "PigVision". Buscan *"cómo pesar cerdos sin básula"*, *"cámara para pesar cerdos"*, *"peso de cerdos por visión artificial"*. Los H1 actuales asumen que el usuario ya conoce la marca — lo cual anula la función de captación del canal orgánico.

El resto de la jerarquía (H2 de sección, H3 de features) está bien construida.

## 1.4. Rendimiento y Core Web Vitals

Pesos de transferencia reales de los recursos críticos:

```
/images/home_hero.mp4                     22,017,161 bytes   ← con preload="auto"
/images/logo_onix.svg                        415,645 bytes
/images/home_produccion_fotograma.webp       281,016 bytes
JS de producción (.next/static/chunks)           1.0 MB
```

Videos de producto adicionales (~36 MB combinados):

```
public/images/insylo/     14 MB
public/images/pigvision/  15 MB
public/images/nodos/     7.6 MB
```

`src/components/Hero.tsx` declara `preload="auto"` en el `<video>`, por lo que el navegador descarga los 22 MB desde el arranque de la página. El `poster` está bien puesto y hay fallback a imagen vía `useCanPlayVideo`, pero el `preload` anula el beneficio.

`logo_onix.svg` con 415 KB es un logo vectorial sin optimizar; debería pesar menos de 10 KB.

**Salvedad metodológica:** estos son pesos de transferencia y el bundle de producción real. **No se corrió Lighthouse**, así que no hay cifras de LCP, CLS ni INP medidas. El diagnóstico es sólido, pero conviene establecer una línea base antes de optimizar y volver a medir después.

---

# 2. Hallazgos críticos

## 2.1. La migración va a romper URLs indexadas

El sitio en producción es WordPress. Su `robots.txt`:

```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://asimetrix.co/wp-sitemap.xml
```

Inventario completo del sitemap de producción (8 URLs) cruzado con las rutas del redesign:

| WordPress (indexado hoy) | Redesign | Acción requerida |
|---|---|---|
| `/` | `/` | ninguna |
| `/pigvision/` | `/pigvision` | ninguna (solo trailing slash) |
| `/insylo/` | `/insylo` | ninguna |
| `/nodos-ambientales/` | `/nodos` | **301** |
| `/cuentanos-sobre-tu-operacion/` | `/cotizar` | **301** |
| `/el-poder-del-saber/` | `/poder-del-saber` | **301** |
| `/asimetrix-marca-la-diferencia-en-control-de-crecimiento-porcino/` | — | **se pierde** |
| `/wrapping-up-february-whats-new-in-the-world-of-pigs/` | — | **se pierde** |

También existen `wp-sitemap-taxonomies-category-1.xml` y `wp-sitemap-users-1.xml` (archivos de categoría y autor de WordPress), que desaparecen — es aceptable, esas URLs rara vez tienen valor.

**Riesgo:** 3 de 6 páginas cambian de URL y los 2 únicos posts del blog desaparecen. Sin 301, se pierde toda la autoridad acumulada de esas URLs y los usuarios que lleguen desde resultados de búsqueda antiguos verán un 404.

**Punto abierto adicional:** la navegación del sitio en producción menciona **SmartWeight, Optimarket y Benchmark**, que no existen como páginas en el redesign. Hay que confirmar si se dan de baja deliberadamente o si son un faltante. Cada producto sin página es superficie de keywords que se deja sin cubrir.

## 2.2. El inglés no existe para Google

`src/i18n/context.tsx` implementa i18n del lado del cliente:

- El idioma se guarda en `localStorage` bajo la clave `ax-lang`.
- El estado inicial es **siempre `"es"`**, deliberadamente, para evitar errores de hidratación.
- El idioma real se aplica después del montaje, en un `useEffect`.
- `<html lang="es">` está hardcodeado en `layout.tsx` y solo se muta en el cliente vía `document.documentElement.lang`.

Consecuencias:

1. **No hay ninguna URL en inglés.** `src/i18n/dictionary.ts` tiene **943 líneas** con el sitio completo traducido. Ese contenido está escrito y pagado, y rinde cero en orgánico.
2. **El crawler siempre ve `lang="es"`**, incluso para el contenido en inglés, porque la mutación ocurre después del render del servidor.
3. **No se puede implementar `hreflang`** sin URLs distintas por idioma.

Esto es lo de mayor techo de toda la auditoría: **duplica el inventario indexable sin escribir una sola palabra nueva.** El contexto lo vuelve más relevante — Asimetrix opera desde Durham, Carolina del Norte, bajo Iluma Alliance, y su estudio de respaldo es de NC State University. El mercado estadounidense es un objetivo real que hoy no se puede alcanzar por búsqueda.

## 2.3. Conflicto de marca en "Insylo"

**`insylo.com` pertenece a Insylo Technologies SL**, una empresa española que vende **exactamente el mismo producto**: sensor 3D solar para medición de nivel de alimento en silos.

- H1: *"The smart way to monitor your farm silos"*
- Claim: *"The world's most accurate-and-affordable silo inventory solution"*, sensor 3D patentado y solar que captura volumen, peso, temperatura y humedad
- Clientes declarados: Danish Agro, Lantmännen, Batallé
- Verticales: **Farm** y **Feed Mill**, con página propia cada una

**Implicación:** Asimetrix no va a rankear para el término "Insylo". El dominio exacto, la marca y la antigüedad están del otro lado. Hay que asumir que ese término de marca está perdido y optimizar `/insylo` para **intención descriptiva**: *sensor de nivel de alimento en silo*, *medición de silo de pienso*, *control de inventario de alimento*.

Conviene además escalarlo con quien lleve el registro de marcas, porque el solapamiento es total en producto y en sector.

## 2.4. `/poder-del-saber` regala autoridad

`src/components/saber/SaberPage.tsx` es hoy una página de tarjetas donde **todos los enlaces salen del sitio** con `target="_blank"`:

| Destino | Tipo |
|---|---|
| `https://39682324.fs1.hubspotusercontent-na1.net/.../14+Innovacion+Agropecuaria.pdf` | PDF externo (HubSpot) |
| BM Editores | revista externa |
| Pig Progress | revista externa |
| `/docs/ncsu-pigvision-study.pdf` | PDF propio, pero PDF |

No hay **ni un párrafo de contenido propio indexable**. La página que debería ser el motor de captación orgánica funciona como directorio de salida. El estudio de NCSU —el activo diferencial más fuerte que tiene la empresa— existe únicamente como PDF, formato que Google indexa mal y que no permite enlazado interno ni datos estructurados.

## 2.5. Datos estructurados: ninguno

Sin JSON-LD se pierden oportunidades de rich results y de clarificación de entidad:

- **`Organization`** — empresa, logo, sede en Durham NC, pertenencia a Iluma Alliance, perfiles sociales
- **`Product`** — para PigVision, Insylo y Nodos, con las cifras de precisión que ya están en el copy (97%, 99%, ROI 8:1)
- **`BreadcrumbList`** — el componente `Breadcrumbs.tsx` ya es semánticamente correcto, solo falta el marcado
- **`FAQPage`** — no existe página de FAQ. **Ojo con la expectativa:** ver 2.5.1
- **`VideoObject`** — hay 4 videos sin marcado ni transcripción

### 2.5.1. Corrección: `FAQPage` ya no genera rich results

**Este es un error de la versión original de esta auditoría, corregido el 21 de agosto de 2026.**

La auditoría original justificaba la página de FAQ diciendo que "habilita rich results".
Eso dejó de ser cierto: en **agosto de 2023 Google restringió los rich results de FAQ
a sitios de autoridad gubernamental y de salud**. Un sitio comercial como `asimetrix.co`
puede marcar `FAQPage` correctamente y no verá nunca el acordeón ni ningún adorno en el
resultado de búsqueda.

**Marcar `FAQPage` sigue valiendo la pena, pero por otras razones:**

1. **Captura long-tail** — el valor está en el contenido de las preguntas, no en el marcado.
2. **Es la fuente que citan las respuestas generativas** — AI Overviews, ChatGPT y
   Perplexity resuelven consultas citando FAQs. En español, sobre monitoreo de peso
   porcino y medición de alimento en silo, casi nadie está ahí.
3. **Clarifica la entidad** — ayuda a Google a entender qué es Asimetrix y qué hace cada
   producto.

**Regla general que se deriva de esto, aplicable al resto del plan:** ningún ítem de este
documento debe justificarse por "habilita rich results" sin verificar antes que el tipo de
rich result siga activo para sitios comerciales. Las políticas de resultados enriquecidos
cambian y este documento las asumió estáticas. Lo mismo aplica a `HowTo` (retirado en
agosto de 2023) y a `sitelinks searchbox` (retirado en noviembre de 2023).

Ver también §7 de este documento y la nota equivalente en la propuesta de FAQs.

---

# 3. Referentes de la industria

Consultados directamente sobre sus sitios el 14/08/2026.

## 3.1. BinSentry (Canadá) — el modelo a copiar

Competidor directo de Insylo/AX en monitoreo de silos. **El único del sector con disciplina real de contenido.**

- **Hub `/resources/`** segmentado en: Blog, Case Studies, Position Papers, Media, FAQ.
- **Al menos 12 artículos**, con cadencia sostenida de 1-2 por mes. Últimas publicaciones: agosto 2026, mayo 2026 (×2), abril 2026, marzo 2026, febrero 2026, enero 2026, diciembre 2025, noviembre 2025.
- **Navegación por intención, no por catálogo:** *Why BinSentry* (→ How it works, Success stories), *Solutions* (3 categorías), *Products* (ProSense Feed, ProSense HD), *Resources*, *Company*.
- **Los artículos mezclan producto con temas amplios de industria**, capturando búsquedas de problema y no solo de marca:
  - "How AI-driven automation can help solve chronic labor challenges in ag"
  - "BinSentry technology makes supply chains more resilient during extreme weather"
  - "60,000 and Counting: How BinSentry is Transforming the Feed Industry One Bin at a Time"
  - "How BinSentry's real-time inventory visibility can solve pet food industry supply chain challenges"
- **H1 con claim posicional:** *"Meet the world's most trusted feed management system"*.

## 3.2. Insylo Technologies (España) — conflicto y lección

Ver 2.3 para el conflicto de marca. Lo que hacen bien y es aplicable:

**Segmentan por vertical con página propia** (Farm / Feed Mill), en lugar de una sola página genérica. Asimetrix ya tiene esa segmentación construida en `src/components/Audience.tsx` (Productores / Galponeros y técnicos / Líderes) pero **solo como sección del home, sin URL propia** — es decir, sin capacidad de rankear.

No tienen blog. Su fortaleza es prueba social (logos de clientes grandes), no contenido.

## 3.3. Big Dutchman (Alemania) — el modelo de arquitectura

Líder global en equipamiento porcino y avícola.

- **Idiomas en subcarpeta** (`/de/`, `/en/`). Confirma la recomendación de 2.2: subcarpeta, no subdominio ni ccTLD.
- **Taxonomía profunda** por tipo de producción (porcino / avícola / huevo).
- **"Referenzen"** (casos de referencia) por cada categoría de producto.
- **Glosario de términos técnicos** ("Wörterbuch") — jugada SEO clásica y muy barata: cada término técnico es una URL que captura búsquedas informativas.
- Descargas de brochures con formulario, cobertura de EuroTier, multimedia por sector.
- Contenido temático transversal: ahorro de energía, bienestar animal, digitalización.

## 3.4. Osborne Industries (EE.UU.) — contraejemplo

Competidor en equipamiento de pesada de cerdos. Su única sección de contenido es `/news/` con **3 posts de 2022-2023**. Sin blog, sin recursos, sin guías ni calculadoras. Estrategia centrada en catálogo y autoridad de marca ("American Made", "Employee Owned").

Un competidor grande dejando el terreno libre.

## 3.5. Lectura de conjunto

**El nicho está desatendido en SEO.** El mejor del sector tiene ~12 artículos. Con 15-20 piezas bien hechas se puede liderar la categoría, y en español la competencia es prácticamente nula.

Patrones repetidos entre los que lo hacen bien y que AX no tiene:
1. Hub de recursos segmentado (blog / casos / FAQ) — BinSentry
2. Página por audiencia o vertical — BinSentry e Insylo
3. Idiomas en subcarpeta con contenido indexable — Big Dutchman
4. Casos de referencia con métricas — BinSentry y Big Dutchman
5. Glosario técnico — Big Dutchman

---

# 4. Plan de trabajo

## Fase 0 — Bloqueantes de lanzamiento (~½ día)

**No lanzar el redesign sin esto**, o el relanzamiento resta posicionamiento en lugar de sumarlo.

| # | Tarea | Implementación |
|---|---|---|
| 0.1 | 301 de las 3 URLs que cambian | `redirects()` en `next.config.ts` |
| 0.2 | Resolver los 2 posts de WordPress | Migrar a `/poder-del-saber/[slug]` o 301 al hub |
| 0.3 | `robots.txt` + `sitemap.xml` | `src/app/robots.ts` y `src/app/sitemap.ts` |
| 0.4 | `metadataBase` + canonical por página | `layout.tsx` y metadata de cada ruta |
| 0.5 | Confirmar destino de SmartWeight / Optimarket / Benchmark | Decisión de negocio |

## Fase 1 — Quick wins (~1½ días, bajo riesgo)

| # | Tarea | Impacto |
|---|---|---|
| 1.1 | Open Graph + Twitter Cards en las 5 páginas + `opengraph-image.tsx` | **Alto** en CTR de WhatsApp y LinkedIn |
| 1.2 | `preload="metadata"` en los 4 heroes + comprimir videos (22 MB → ~2 MB) | **Alto** en Core Web Vitals |
| 1.3 | Optimizar `logo_onix.svg` (415 KB → <10 KB) | Medio |
| 1.4 | JSON-LD: `Organization` + `WebSite` en layout, `Product` ×3, `BreadcrumbList` | **Alto** — habilita rich results |
| 1.5 | Reescribir H1 con intención de búsqueda (hoy son puro nombre de marca) | **Alto** |
| 1.6 | `priority` en la imagen LCP de cada página | Medio |
| 1.7 | Corregir el salto H1→H3 en `/poder-del-saber` | Bajo |

**1.5 es el mejor ratio esfuerzo/retorno de toda la lista.** Es reescritura de copy, no ingeniería, y ataca la causa raíz de que las páginas de producto no capten demanda no-marca.

## Fase 2 — Estructural (~1 semana)

| # | Tarea | Justificación |
|---|---|---|
| 2.1 | **i18n con rutas reales**: `/es/*` y `/en/*`, `hreflang`, `lang` correcto en SSR | Duplica el inventario indexable con contenido ya escrito. **Mayor ROI del proyecto.** |
| 2.2 | Reposicionar `/insylo` a keywords descriptivas | El término de marca está tomado por un competidor (2.3) |
| 2.3 | Páginas por audiencia (`/productores`, `/tecnicos`) desde `Audience.tsx` | Patrón validado por BinSentry e Insylo |
| 2.4 | Página `/preguntas-frecuentes` con `FAQPage` schema | Captura long-tail y alimenta las respuestas generativas (AI Overviews, ChatGPT). **No genera rich results** desde agosto 2023: ver 2.5.1. Validado por el referente del sector |
| 2.5 | `VideoObject` schema + transcripciones de los 4 videos | Contenido indexable a partir de assets existentes |
| 2.6 | Search Console, analítica y línea base de Core Web Vitals | Sin medición no hay iteración |

## Fase 3 — Contenido y autoridad (continuo, 3-6 meses)

Lo lento y lo que define el posicionamiento real.

| # | Tarea | Nota |
|---|---|---|
| 3.1 | Convertir `/poder-del-saber` en hub con contenido propio | Hoy todos los enlaces salen del sitio (2.4) |
| 3.2 | Publicar el estudio NCSU como página HTML, no solo PDF | Activo diferencial más fuerte, hoy en formato que Google indexa mal |
| 3.3 | 15-20 artículos de intención informativa | Supera a BinSentry en volumen; en español la competencia es casi nula |
| 3.4 | Case studies con métricas reales | Patrón de BinSentry ("Success stories") y Big Dutchman ("Referenzen") |
| 3.5 | Glosario técnico | Jugada de Big Dutchman: cada término = URL informativa |
| 3.6 | Backlinks de prensa sectorial | Ya hay relación con **BM Editores, Pig Progress y Poultry World** — figuran como logos en `/poder-del-saber`, pero falta conseguir enlaces entrantes desde ellos |

---

# 5. Orden de prioridad

1. **Fase 0** — sin esto el relanzamiento destruye valor existente.
2. **1.2 + 1.5** (videos y H1) — medio día, mayor impacto técnico inmediato.
3. **2.1** (i18n con URLs) — la palanca más grande; el contenido ya está escrito y sin indexar.
4. **Fase 3** — lo que define si lideran la categoría, pero no rinde antes de 3 meses.

---

# 6. Decisiones pendientes

Ambas afectan la implementación y conviene resolverlas antes de escribir código:

1. **Dominio final.** ¿Se mantiene `asimetrix.co` o se migra a `.com`? Define `metadataBase`, los canonical y si hace falta una capa adicional de redirects.
2. **Los 2 posts de WordPress.** ¿Se migran como contenido propio (mejor para SEO, requiere plantilla `[slug]` en `/poder-del-saber`) o se redirigen al hub?

La Fase 0 puede arrancar en paralelo a estas decisiones: es independiente del contenido y se concentra en `next.config.ts` y archivos nuevos.

---

# 7. Estado de implementación

Implementado el 14/08/2026, sin cambios de diseño ni de backend (ver verificación abajo).

## Hecho

| Ítem | Qué se hizo | Archivos |
|---|---|---|
| 0.1 | **5 redirects 301** (308) — las 3 rutas que cambian + los 2 posts de WordPress | `next.config.ts` |
| 0.3 | `robots.txt` y `sitemap.xml` generados, con `/api/` excluido | `src/app/robots.ts`, `src/app/sitemap.ts` |
| 0.4 | `metadataBase` + canonical en las 6 páginas | `src/app/layout.tsx`, `src/lib/seo.ts` |
| 1.1 | Open Graph + Twitter Card en las 6 páginas, con imagen 1200×630 generada en build | `src/app/opengraph-image.tsx`, `src/lib/seo.ts` |
| 1.2a | `preload="auto"` → `"metadata"` en los 4 heroes de video | `Hero.tsx`, `product/ProductHero.tsx` |
| 1.2b | **Videos recomprimidos: 53 MB → 11 MB**, sin audio y con `faststart` | `public/images/**/*.mp4` |
| 1.3 | **`logo_onix.svg` 415 KB → WebP 6 KB** | `public/images/logo_onix.webp`, `OnixButton.tsx` |
| 1.5 | **H1 con keywords**, incorporando el subtítulo existente sin reescribir copy | `Hero.tsx`, `ProductHero.tsx`, `SaberPage.tsx` |
| 1.4 | JSON-LD: `Organization`, `WebSite`, `Product` ×3, `BreadcrumbList` ×5 | `src/lib/schema.ts`, `src/components/JsonLd.tsx` |
| 1.6 | `priority` en la imagen LCP de `/poder-del-saber`; `fetchPriority="high"` en el fallback de los heroes | `SaberPage.tsx`, `Hero.tsx`, `ProductHero.tsx` |
| 1.7 | Salto H1→H3 corregido: los 4 items de la sección pasaron a H2 | `SaberPage.tsx` |
| 2.5a | `VideoObject` en los 4 videos (sin transcripción, que es contenido) | `src/lib/schema.ts` |

El dominio vive en un solo lugar, `SITE_URL` en `src/lib/site.ts`, con override por `NEXT_PUBLIC_SITE_URL`. Cambiar a `.com` es editar una variable de entorno.

## Verificación

| Comprobación | Resultado |
|---|---|
| `next build` | Compila limpio, TypeScript sin errores, 12 páginas estáticas |
| Los 5 redirects | 308 al destino correcto, **también con slash final** (que es la forma indexada) |
| `robots.txt` / `sitemap.xml` | Sirven correctamente; 6 URLs en el sitemap |
| Canonical, OG, Twitter | Presentes en las 6 páginas |
| Imagen OG | PNG 1200×630, 100 KB, revisada visualmente |
| JSON-LD | **24 bloques, los 24 parsean** sin error |
| **Diseño intacto** | Los atributos `class` del HTML servido son **byte-idénticos** al baseline de producción en las 6 páginas (308/263/263/238/142/186 clases, sin una sola diferencia) |
| **DOM visible** | Las únicas diferencias son las intencionales: el atributo `preload`, el tag `h3`→`h2` con clases idénticas, y la pérdida de `loading="lazy"` en la imagen con `priority`. `/cotizar`: cero diferencias |
| **Backend intacto** | `POST /api/cotizar` responde 422 sin campos, 400 con body inválido y 500 de configuración sin credenciales de Mailchimp — el comportamiento esperado |

## Decisión tomada por defecto (revisable)

Los 2 posts de WordPress se redirigen a `/poder-del-saber` en vez de quedar en 404. Ambos eran **republicaciones de artículos de prensa** cuya fuente original el Footer ya enlaza (`bmeditores.mx` y `pigprogress.net` tienen los mismos slugs), así que el costo de no migrarlos como contenido propio es bajo. Si se decide migrarlos, el comentario en `next.config.ts` indica qué cambiar.

## Cierre de la Fase 1

Los tres ítems que quedaban pendientes se completaron.

### 1.2b — Compresión de video: 53 MB → 11 MB (−80%)

Los cuatro heroes eran **720p a ~7.000 kb/s**, unas 4× por encima de lo razonable para esa resolución, y **todos llevaban pista de audio** aunque el markup los reproduce en `muted`.

| Archivo | Antes | Después | |
|---|---|---|---|
| `home_hero.mp4` | 21,0 MB | 4,8 MB | −77% |
| `pigvision_hero.mp4` | 13,8 MB | 1,9 MB | −86% |
| `insylo_hero.mp4` | 12,1 MB | 2,5 MB | −79% |
| `nodos_hero.mp4` | 6,1 MB | 0,7 MB | −87% |

Encode: H.264 CRF 26, preset slow, **sin audio** (`-an`) y con **`+faststart`** — el atomo `moov` va delante de `mdat`, así que la reproducción arranca sin esperar la descarga completa. Verificado leyendo la estructura de atomos de los 4 archivos.

Calidad medida contra el original: **SSIM 0,978 / PSNR 41,5 dB**, y comparación visual de fotogramas indistinguible. Se probó también CRF 30 (2,97 MB, SSIM 0,966), igualmente indistinguible dado que el video va detrás de `bg-navy/55` más un gradiente — está disponible si se quiere bajar otro 38% en el archivo más pesado.

`ffmpeg` no está instalado en la máquina; se usó `ffmpeg-static` en un directorio temporal **fuera del repo**, para no tocar `package.json`.

### 1.3 — `logo_onix.svg`: 415 KB → 6 KB (−99%)

El SVG llevaba **98 imágenes raster embebidas en base64** y `next/image` no optimiza SVG, así que se servían los 415 KB completos en cada página (el widget Onix es fijo y aparece en todas).

Se rasterizó a **WebP de 176×176** (4× del uso máximo, que es `h-11` = 44 px) usando **Chrome real vía `puppeteer-core`**, no librsvg, para que `mix-blend-mode: screen` e `isolation: isolate` se resolvieran igual que en el navegador. Fondo transparente, porque el logo se usa sobre `bg-navy` y sobre `bg-navy/90`.

Comparación A/B en Chrome reproduciendo el contexto real (círculo de 48 px, imagen a 44 px, `object-contain`): a DPR 2 la diferencia media es **0,92/255**, indistinguible a 6× de aumento.

El SVG original **se conservó** en `public/images/logo_onix.svg` como fuente vectorial, pero ya no lo referencia nada. Conviene moverlo fuera de `public/` para que no se despliegue.

### 1.5 — H1 con intención de búsqueda, sin reescribir copy

Cada hero ya tenía la línea descriptiva con las keywords justo debajo del título. En vez de inventar copy nuevo, **esa línea se incorporó al `<h1>`**:

| Ruta | H1 antes | H1 ahora |
|---|---|---|
| `/` | Nunca más decidas sin datos | Nunca más decidas sin datos **Monitoreo inteligente para granjas porcinas y avícolas** |
| `/pigvision` | PigVision | PigVision **Cámara inteligente para pesar cerdos en ceba** |
| `/insylo` | Insylo | Insylo **Sensor 3D para monitoreo de alimento en silos** |
| `/nodos` | Nodos ambientales | Nodos ambientales **Sensores para monitorear el ambiente de la granja** |
| `/poder-del-saber` | El poder del saber | El poder del saber **Información técnica, análisis y datos que explican cómo el monitoreo continuo mejora la rentabilidad en granja.** |

Ni una palabra cambió y no hubo que tocar `dictionary.ts`, así que **el inglés queda cubierto automáticamente**.

Detalle técnico que costó encontrar: `letter-spacing` se hereda como **longitud ya computada**, no como `em`. Al meter el subtítulo dentro del `<h1>`, heredaba el `tracking-tight` del h1 calculado sobre el tamaño gigante del título (−4,1 px en vez de los −0,16 px que heredaba del `body` cuando era un `<p>` hermano). La solución fue **bajar `tracking-tight` del `<h1>` al span del título**, no añadir un `tracking-*` al subtítulo — dos intentos previos (`tracking-normal`, que Tailwind v4 traduce a `0em`, y `tracking-[normal]`) no reproducían el valor original.

## Verificación visual (capturas reales, no solo HTML)

Se compararon **12 capturas full-page** (6 rutas × desktop 1440px y mobile 390px) entre el build de `HEAD` limpio y el de los cambios, usando Chrome con `prefers-reduced-motion: reduce` para que el video no reproduzca y las capturas fueran deterministas.

| | Resultado |
|---|---|
| Alto de página | **Idéntico en las 12** — sin reflujo ni desplazamiento de layout |
| Píxeles distintos | **3.322 sobre ~48 millones (0,007%)** |
| De esos | ~3.150 son el widget Onix (el cambio de logo, intencional) |
| Resto | 164 px de antialiasing sub-píxel en una línea del subtítulo de `/poder-del-saber` (0,005% de esa página), visualmente indistinguible |
| Estilos computados | `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight`, `color`, `textWrap` y `fontFamily` del subtítulo **coinciden exactamente** con el `<p>` original, en las 3 páginas y en ambos viewports |

El arnés de capturas quedó en `.seo-verify/shots.js` para poder repetir la comprobación en cambios futuros.

## Pendiente (fuera de la Fase 1)

| Ítem | Nota |
|---|---|
| Mover `logo_onix.svg` fuera de `public/` | Ya no se referencia; hoy se despliega sin uso |
| Versión WebM/VP9 de los videos | Ahorraría ~30% extra sobre los 11 MB actuales, a costa de duplicar assets y agregar `<source>` |
| Texto dentro del logo Onix | El SVG incluye la leyenda **«¡Hola! Soy Onix»**, ilegible a 40 px y que reduce el tamaño del anillo dentro del círculo. Es una decisión de diseño, no un problema técnico |

## Bug preexistente detectado

`npm run lint` **falla en `HEAD` limpio**, sin relación con estos cambios (verificado con `git stash`):

```
TypeError: Converting circular structure to JSON
  at ConfigValidator.formatErrors (@eslint/eslintrc/lib/shared/config-validator.js:299)
```

Es una incompatibilidad entre `eslint-config-next` 16.2.10 y el flat config de ESLint 9. El linter no llega a analizar ningún archivo. Conviene arreglarlo porque hoy el proyecto no tiene linting efectivo.

---

# Apéndice A — Metodología

Entorno levantado localmente sobre `redesign/code-only`:

- La máquina no tenía Node instalado (sin Homebrew, nvm ni volta). Se instaló Node 24.19.0 LTS standalone en `~/.local/node`.
- `npm install` completó correctamente. Reportó 6 vulnerabilidades de severidad alta y dejó sin ejecutar los install scripts de `sharp` y `unrs-resolver` (no bloqueante: `sharp` usa binarios precompilados).
- `npm run dev` en `localhost:3000`. Las 5 rutas responden 200 sin errores de compilación.
- `npm run build` compila limpio; las 5 páginas se generan como estáticas.

Comprobaciones realizadas:

| Qué | Cómo |
|---|---|
| Contenido server-rendeado | `curl` del HTML crudo + extracción de headings con regex por ruta |
| Meta tags, canonical, OG, JSON-LD | parseo del `<head>` servido |
| `alt` en imágenes | conteo de `<img>` con y sin `alt` por ruta |
| Pesos de recursos | `curl -w '%{size_download}'` por asset |
| Bundle de producción | `du -sh .next/static/chunks` |
| Rutas SEO | códigos HTTP de `/robots.txt`, `/sitemap.xml`, `/llms.txt` |
| Inventario de URLs en producción | `wp-sitemap.xml` y sus 4 sitemaps hijos |
| Referentes | consulta directa a los sitios de BinSentry, Insylo Technologies, Big Dutchman y Osborne |

**Limitaciones:** no se corrió Lighthouse ni se midieron Core Web Vitals reales (LCP, CLS, INP) — las conclusiones de rendimiento se basan en pesos de transferencia y tamaño de bundle. No se hizo investigación de volumen de keywords ni análisis de backlinks, porque esta sesión no tenía herramienta de búsqueda web (solo fetch directo de URLs). Ambas cosas conviene completarlas antes de ejecutar la Fase 3.

---

# Apéndice B — Inventario de rutas

**Redesign (`redesign/code-only`):**

| Ruta | Archivo | Tipo |
|---|---|---|
| `/` | `src/app/page.tsx` | estática |
| `/insylo` | `src/app/insylo/page.tsx` | estática |
| `/nodos` | `src/app/nodos/page.tsx` | estática |
| `/pigvision` | `src/app/pigvision/page.tsx` | estática |
| `/poder-del-saber` | `src/app/poder-del-saber/page.tsx` | estática |
| `/cotizar` | `src/app/cotizar/page.tsx` | estática |
| `/api/cotizar` | `src/app/api/cotizar/route.ts` | dinámica |

**Producción (`asimetrix.co`, WordPress):** ver tabla en 2.1.
