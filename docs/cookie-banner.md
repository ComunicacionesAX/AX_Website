# CookieBanner — banner de consentimiento

Documentación del componente `CookieBanner` y su modal de preferencias
detalladas.

## Estado actual

- **Componente**: `src/components/CookieBanner.tsx`.
- **Wrapper preview**: `src/components/CookieBannerPreview.tsx` —
  activa el banner sólo cuando la URL trae `?cookies=1` o
  `?cookies=preview`, y limpia consentimiento previo del localStorage
  para que aparezca.
- **Montaje actual (2026-08-01)**: **desactivado en producción**. Se
  monta sólo `<CookieBannerPreview />` en `src/app/layout.tsx` como
  wrapper opt-in. Para activarlo real en producción, reemplazar por
  `<CookieBanner />` directo (o eliminar el gate de query param en el
  preview).

## URLs para probarlo

- Home: http://localhost:3003/?cookies=1
- Cotizar: http://localhost:3003/cotizar?cookies=1
- Cualquier página + `?cookies=1` en el query.

Cambia idioma con el toggle del footer para ver ES/EN.

## Anatomía del banner (barra inferior)

```
┌────────────────────────────────────────────────────────┐ ← border-t cyan/40
│                                                        │
│  Al hacer clic en «Aceptar todas...», aceptas...       │
│                                                        │
│                       [ Configurar cookies ] [ Aceptar ] │
└────────────────────────────────────────────────────────┘
```

- **Container**: `fixed inset-x-0 bottom-0 z-[120] rounded-t-3xl
  bg-navy` — barra fija full-width con esquinas superiores redondeadas
  (`rounded-t-3xl`) y `border-t-2 border-cyan/40`.
- **Layout responsive**: mobile stack vertical (mensaje arriba, botones
  abajo); desktop flex-row con mensaje a la izquierda + botones a la
  derecha.
- **Texto**: `text-pretty` para evitar viudas ("marketing" queda solo
  al final si no).
- **Botones**:
  - "Configurar cookies": outline `border-white/30 text-white` +
    hover `border-white/60 bg-white/5`. Rectangular con `rounded-lg`.
  - "Aceptar todas las cookies": `bg-teal text-white` + hover
    `bg-teal-600`. Mismo `rounded-lg`.

## Anatomía del modal de preferencias

```
┌───────────────────────────────────────────┐
│  [🛡]  Preferencias de cookies       [ X ] │ ← header sky-50 + icon badge cyan
│       Elige qué categorías permites.       │
├───────────────────────────────────────────┤
│  [🛡]  Necesarias           [ • ● ] disabled│ ← check-box always on
│       Requeridas para funcionamiento...    │
│                                            │
│  [📊]  Analíticas           [ • ○ ] toggle │ ← toggle switch
│       Nos ayudan a entender...             │
│                                            │
│  [📢]  Marketing            [ ○ • ] toggle │
│       Permiten mostrar contenido...        │
├───────────────────────────────────────────┤
│              [ Rechazar ] [ Guardar preferencias ]│ ← footer con border-t
└───────────────────────────────────────────┘
```

### Header (banda sky-50)

- `bg-sky-50` + padding vertical generoso.
- **Icon-badge cuadrado cyan** (48px, `rounded-2xl bg-cyan
  shadow-inner`) con `ShieldCheck` en navy — indica "protección /
  privacidad".
- Título en `font-display font-bold text-navy tracking-tight` +
  intro en `text-navy/70`.
- **X close** absoluto arriba derecha con `hover:scale-110
  hover:bg-navy/10` — feedback claro de interactividad.

### Cookie rows (por categoría)

Cada row (`<CookieRow>`) tiene:
- **Ícono contextual** en cuadrado 40px con borde:
  - Necesarias → `ShieldCheck` (mismo del header — "protección").
  - Analíticas → `BarChart3` — "métricas".
  - Marketing → `Megaphone` — "comunicación".
- **Estado visual**:
  - Activo: `border-teal/30 bg-teal/[0.03]` (tinte teal muy sutil).
  - Inactivo: `border-line bg-white`.
- **Título + descripción** en columna, `text-navy` y `text-muted`.
- **Toggle switch** (h-7 w-12) con thumb h-6 w-6 y punto interior:
  - Activo: track teal, punto interior teal.
  - Necesario disabled: track teal `opacity-60`, punto interior cyan.
  - Inactivo: track navy/15.

### Footer con acciones

- `border-t border-line bg-white` + padding vertical.
- Mobile stack vertical (col-reverse — primary abajo primero cuando
  se mira arriba); desktop flex-row justify-end.
- **Rechazar** (outline neutral):
  - Base: `border-line bg-white text-navy`.
  - Hover: `-translate-y-0.5` + `border-teal` + `bg-teal/5` +
    `text-teal` + shadow teal/10.
  - Active: `translate-y-0`.
- **Guardar preferencias** (teal sólido):
  - Base: `bg-teal text-white` + shadow-md shadow-teal/25.
  - Hover: `-translate-y-0.5` + `bg-teal-600` + shadow-lg shadow-teal/40.
  - Active: `translate-y-0`.
- Ambos con `focus-visible:outline focus-visible:outline-2 outline-teal`.

## Focus trap y accesibilidad

- **Hook `useFocusTrap`** (src/hooks/useFocusTrap.ts) atrapa el foco
  dentro del modal:
  - Al abrir: enfoca el primer botón focuseable.
  - Tab/Shift+Tab hacen wrap dentro del modal.
  - Escape cierra el modal.
  - Al cerrar: devuelve el foco al elemento previo.
- **Roles ARIA**:
  - Banner: `role="dialog" aria-live="polite"`.
  - Modal: `role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title"`.
  - Toggle switches: `role="switch" aria-checked` + `aria-label`.
- **Click en backdrop** cierra el modal (`e.target === e.currentTarget`).

## Persistencia

- `localStorage["asimetrix-cookie-consent-v1"]` guarda:

  ```json
  {
    "necessary": true,
    "analytics": true|false,
    "marketing": true|false,
    "ts": "2026-08-01T14:32:00.000Z"
  }
  ```

- Trackers (Analytics, Marketing) que se integren en el futuro deben
  leer esta clave antes de inicializarse.

## i18n

Todos los strings del banner y modal viven en `t.cookies.*`:

- `message`, `settings`, `acceptAll`, `rejectAll`.
- `settingsTitle`, `settingsIntro`.
- `catNecessaryTitle`, `catNecessaryDesc`.
- `catAnalyticsTitle`, `catAnalyticsDesc`.
- `catMarketingTitle`, `catMarketingDesc`.
- `save`, `cancel`.

Paridad completa ES/EN garantizada por `typeof es` en dictionary.ts.

## Cómo activar en producción

En `src/app/layout.tsx`:

```tsx
// Reemplazar:
<CookieBannerPreview />

// Por:
<CookieBanner />
```

Eso monta el banner **para todos los visitantes**. El banner sólo
aparece si `localStorage["asimetrix-cookie-consent-v1"]` no existe;
tras aceptar/rechazar, la clave persiste y el banner no vuelve.

## Reset manual del consentimiento (QA/dev)

```js
localStorage.removeItem("asimetrix-cookie-consent-v1");
location.reload();
```
