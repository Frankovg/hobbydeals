# HobbyDeals UX — Guía de Diseño para Pencil

## Proyecto
HobbyDeals es una plataforma de chollos/ofertas vertical para hobbies. Inspirada en Chollometro pero enfocada exclusivamente en comunidades de hobbyistas. Community-driven con sistema de temperatura (votos hot/cold), alertas personalizadas y moderación editorial.

## Stack (contexto para decisiones de diseño)
- **Monorepo**: Turborepo + pnpm
- **Web**: Next.js 16 App Router + Tailwind CSS
- **Mobile**: React Native + Expo + NativeWind v4
- **Backend**: Supabase (Auth nativo, Postgres, Realtime, Storage)
- **UI compartida**: `@hobbydeals/ui` — componentes con className que funcionan en web y mobile

## Categorías MVP
| Slug | Nombre | Color | Icono |
|------|--------|-------|-------|
| juegos-de-mesa | Juegos de Mesa | #7F77DD | dice-5 |
| gaming | Gaming | #1D9E75 | gamepad-2 |
| coleccionismo | Coleccionismo | #BA7517 | bookmark |
| airsoft-paintball | Airsoft & Paintball | #D85A30 | crosshair |
| musica | Música | #D4537E | music |
| modelismo-miniaturas | Modelismo & Miniaturas | #378ADD | puzzle |

## Principios de Diseño
- **Moderno y simple** — UI limpia, sin ruido visual
- **Mobile-first** — diseñar primero mobile (402px), luego desktop (1440px)
- **Comunidad al centro** — temperatura y votos siempre prominentes
- **Accesibilidad** — contraste WCAG AA (4.5:1 texto, 3:1 UI), touch targets 44x44px
- **Consistencia cross-platform** — mismos patrones visuales en mobile y desktop

## Sistema de Temperatura
El concepto central de la app. Cada chollo tiene una "temperatura" que sube o baja con votos de la comunidad.
- **Fórmula**: `(votos_hot * 2) - (votos_cold * 1)`
- **Escala visual (4 niveles)**:
  - Cold → `$--temp-cold` #4A82C4 (azul)
  - Warm → `$--temp-warm` #C4872A (ámbar)
  - Hot → `$--temp-hot` #CC5500 (naranja intenso)
  - Burning → `$--temp-burning` #D92B2B (rojo fuerte)
- **Nota**: se eliminó el nivel "Neutral" (antes #8A9490) — la variable `--temp-neutral` todavía existe pero NO se usa en el Brand Manual
- Los votos usan optimistic updates con rollback en error

## Patrones UX Clave
- **Feed**: scroll infinito con deal cards, filtros por categoría/tipo/precio
- **Tipos de oferta**: Oferta flash, Código descuento, Segunda mano, Gratis, Kickstarter
- **Alertas**: keyword + categoría + precio máximo → notificación cuando matchea
- **Moderación**: chollos nuevos van a cola `pending` → moderador aprueba/rechaza
- **Perfil hobbista**: hobbies seleccionados, reputación por categoría, historial

## Componentes @hobbydeals/ui a Diseñar
| Componente | Descripción |
|------------|-------------|
| DealCard | Card de chollo: imagen, título, tienda, precios, temperatura, votos, categoría badge |
| CategoryBadge | Pill con icono y color por hobby |
| VoteButton | Botón hot/cold con estado activo |
| TemperatureIndicator | Barra/gauge visual frío→caliente con número |
| PriceDisplay | Precio actual + original tachado + % descuento |
| UserAvatar | Avatar con imagen o fallback de iniciales |
| SearchBar | Barra de búsqueda redondeada |
| EmptyState | Estado vacío con ilustración y CTA |
| Toast/Alert | Notificaciones temporales |

## Componentes UI (inspirados en gluestack.io)
Estos 20 componentes están diseñados en el Brand Manual en formato side-by-side (dark | light):

| Componente | Variantes/Estados |
|------------|-------------------|
| Toast | success, error, info, warning |
| Spinner | loading indicator |
| Skeleton | placeholder loading (text + avatar + card) |
| Checkbox | checked/unchecked con label |
| Radio | selected/unselected con label |
| Switch | on/off toggle con label |
| Select | dropdown con opciones |
| Textarea | multiline input con placeholder |
| Avatar | con imagen, iniciales y grupo |
| Card | contenedor con header, body, footer |
| Table | header + rows con datos |
| Accordion | expandable/collapsible secciones |
| Alert Dialog | confirmación con título, mensaje, acciones |
| Modal | overlay con contenido, close button |
| Drawer | panel lateral deslizable |
| Menu | dropdown con items, iconos, separador, delete action |
| Popover | card flotante con trigger, título, descripción, acciones |
| Tooltip | burbuja informativa con trigger |

**Librería de referencia**: gluestack.io (estilo shadcn-like, clean, minimal)

---

## PANTALLAS MOBILE (402px — React Native + Expo)

### Auth & Onboarding
1. **Splash/Welcome** — logo + tagline + CTA "Empezar"
2. **Login** — magic link + OAuth Google + enlace a registro
3. **Registro** — email + password + username
4. **Onboarding Hobbies** — selector de categorías favoritas (mínimo 1)

### Tabs principales (bottom nav: Home, Categorías, Publicar, Buscar, Perfil)
5. **Home Feed** — feed de chollos con pills de categoría horizontales, section "Chollos calientes 🔥"
6. **Categorías** — grid de las 6 categorías con icono, color y conteo de chollos
7. **Publicar Chollo** — formulario: imagen, título, URL, precios, categoría, tipo, descripción
8. **Búsqueda** — search bar + resultados con filtros
9. **Perfil** — avatar, stats (chollos/karma/alertas), hobbies, chollos recientes

### Pantallas secundarias
10. **Deal Detail** — imagen grande, precios, temperatura con votos, info del publisher, CTA "Ir a la oferta", comentarios
11. **Categoría Feed** — feed filtrado por una categoría específica con header visual
12. **Mis Chollos** — lista con estados (activo/pendiente/expirado/rechazado)
13. **Guardados** — chollos favoritos
14. **Mis Alertas** — lista de alertas activas + crear nueva
15. **Editar Perfil** — username, display name, bio, avatar
16. **Notificaciones** — lista de notificaciones por tipo
17. **Configuración** — preferencias de notificación, seguridad, cerrar sesión

---

## PANTALLAS DESKTOP (1440px — Next.js App Router)

### Layout base desktop
- **Sidebar izquierda** (240px): logo, navegación principal, categorías, CTA "Publicar chollo"
- **Contenido principal** (flex): varía por ruta
- **Sidebar derecha** (320px, opcional): chollos destacados, alertas activas, trending

### Auth
18. **Login desktop** — formulario centrado con branding
19. **Registro desktop** — formulario + selección de hobbies en el mismo flow

### Páginas públicas
20. **Home Feed desktop** — layout de 2-3 columnas, filtros en sidebar, deal cards más amplias
21. **Deal Detail desktop** — layout dividido: imagen + info a la izquierda, comentarios a la derecha
22. **Categoría desktop** — header con color/icono de categoría + feed filtrado
23. **Búsqueda desktop** — resultados con filtros laterales

### Panel de usuario (/perfil)
24. **Overview** — dashboard con stats, actividad reciente, reputación
25. **Mis Chollos** — tabla/lista con estados y acciones (editar, eliminar)
26. **Guardados** — grid de chollos favoritos
27. **Mis Alertas** — lista + formulario de crear/editar alerta
28. **Editar Perfil** — formulario completo
29. **Notificaciones y Seguridad** — toggles por tipo de notificación, cambiar password, sesiones

### Panel de administración (/admin) — solo desktop
30. **Admin Dashboard** — métricas diarias, chollos/día (gráfico 30 días), reportes pendientes, temperatura media
31. **Cola de Moderación** — tabla de chollos `pending`, preview, aprobar/rechazar con motivo
32. **Gestión de Usuarios** — tabla con búsqueda, cambiar rol, banear, ver historial
33. **Tiendas Verificadas** — lista de merchants, URLs de afiliación, badge verificado
34. **Reportes** — contenido reportado inline, resolver/desestimar
35. **Gestión de Categorías** — editar nombre/color/icono, activar/desactivar, reordenar

---

## Paleta de Colores (variables del .pen)

### Tema: light / dark (con `theme: {mode: "light|dark"}`)

#### Backgrounds (dark: pasos de ~12 hex units para contraste claro)
| Variable | Light | Dark |
|----------|-------|------|
| `$--bg-base` | #F5F4F0 (warm off-white) | #0A0A0B |
| `$--bg-page` | #FFFFFF | #161618 |
| `$--bg-subtle` | #ECEAE5 | #222226 |
| `$--bg-card` | #F9F8F5 | #2E2E34 |
| `$--bg-surface` | #F9FAFB | #3A3A40 |
| `$--bg-elevated` | #EDECEA | #46464E |

#### Texto
| Variable | Light | Dark |
|----------|-------|------|
| `$--text-primary` | #111111 | #F5F5F5 |
| `$--text-secondary` | #6B6B6B | #8C8C8C |
| `$--text-tertiary` | #9E9E9E | #5C5C5C |
| `$--text-inverse` | #FFFFFF | #0D0D0D |

#### Bordes (dark: pasos de ~20 hex units para diferenciación clara)
| Variable | Light | Dark |
|----------|-------|------|
| `$--border-light` | #EDEAE4 | #3C3C46 |
| `$--border-subtle` | #E5E5E5 | #50505A |
| `$--border` | #DDD9D3 | #64646E |
| `$--border-default` | #D0D0D0 | #787882 |
| `$--border-strong` | #D1D5DB | #8C8C96 |

#### Accent y Brand
- `$--accent`: #C45B3C
- `$--accent-light`: #FFF3ED
- `$--primary` / `$--coral-primary`: #FF6B6B
- `$--primary-hover`: #FF5252

#### Semánticos
| Variable | Light | Dark |
|----------|-------|------|
| `$--success` | #4CAF50 | #5EC562 |
| `$--error` | #CC3B30 | #E05048 |
| `$--warning` | #D4952A | #D4952A |
| `$--info` | #4A82C4 | #5B95D9 |

#### Categorías (con variantes light/dark)
- `$--cat-boardgames`: #7F77DD / #9B94E8
- `$--cat-gaming`: #1D9E75 / #28C491
- `$--cat-collectibles`: #BA7517 / #D4872A
- `$--cat-airsoft`: #D85A30 / #E86B40
- `$--cat-music`: #D4537E / #E06490
- `$--cat-modeling`: #378ADD / #4A96EE

## Tipografía
- **Display/Headlines**: `$--font-display` = Space Grotesk, bold 700-800
- **Body/UI**: `$--font-body` = Inter, regular 400 / medium 500 / semibold 600
- **Tamaños** (variables): `$--size-metric` 32px, `$--size-title` 22px, `$--size-section` 18px, `$--size-body` 15px, `$--size-caption` 13px, `$--size-badge` 12px

## Espaciado (variables)
- Grid de 8px
- `$--space-1` 4px, `$--space-2` 8px, `$--space-3` 12px, `$--space-4` 16px, `$--space-5` 24px, `$--space-6` 32px, `$--space-8` 48px, `$--space-10` 64px
- Cards padding: `$--space-4` (16px)
- Secciones gap: `$--space-5` / `$--space-6` (24-32px)
- Corner radius: `$--radius-sm` 6px, `$--radius-md` 8px, `$--radius-lg` 12px, `$--radius-xl` 16px, `$--radius-pill` 26px

## Iconografía
- **Set**: Lucide icons (outlined, stroke 1.5px)
- **Nav**: house, compass, plus, search, user
- **Acciones**: bell, send, arrow-left, chevron-right, settings
- **Categorías**: dice-5, gamepad-2, bookmark, crosshair, music, puzzle

## Estructura del .pen (hobbydeals-ux.pen)

### Top-Level Frames
| ID | Nombre | Descripción |
|----|--------|-------------|
| `YGL3f` | Home — Desktop | Pantalla principal desktop |
| `bd3iR` | Deal Detail — Desktop | Detalle de chollo desktop |
| `YXdcQ` | Brand Manual | Manual de marca completo |

### Brand Manual (YXdcQ) — Estructura
El Brand Manual está dividido en 2 secciones principales:

**Section A** (`9ZQQ4`): Identity + Colors + Typography
- `UDKms`: Header (logo, nombre, tagline)
- `VAoPX`: Paleta de colores (categorías, temperatura 4 niveles, backgrounds light/dark, semánticos, accent)
- `tvz6u`: Typography showcase

**Section B** (`uFOas`): Spacing + Icons + Components
- `uaOqk`: Spacing scale
- `W0HHD`: Border radius
- `SiamT`: Icon set (Lucide)
- `gFr21`: Grid & layout examples
- `tUuAZ`: Component Tokens (buttons, badges, inputs, deal card, temperature — en dark y light panels)
- `IoMHL`: UI Components (20 componentes en layout side-by-side dark|light)

### Layout del UI Components (IoMHL)
Cada componente sigue este patrón:
- Label del componente (text, `$--text-tertiary`, fontSize 13, fontWeight 600)
- Row horizontal (gap 24, fill_container)
  - Dark cell (theme:{mode:"dark"}, fill:#0D0D0D, cornerRadius 8, padding 16)
  - Light cell (theme:{mode:"light"}, fill:#F5F4F0, cornerRadius 8, padding 16)

## Reglas para Pencil
- Usar variables `$--nombre` en lugar de colores hardcodeados
- El tema dark/light se fuerza con `theme: {mode: "dark"}` o `theme: {mode: "light"}` en frames — las variables hijas resuelven al valor correspondiente
- Crear componentes reutilizables para DealCard, Nav, CategoryBadge, etc.
- Verificar con get_screenshot después de cada sección
- Preferir flexbox layout sobre posicionamiento absoluto
- textGrowth: siempre setear antes de width/height en textos
- Mobile frames: 402x874px con cornerRadius 20px
- Desktop frames: 1440x900px con cornerRadius 12px
- **Background light NO es blanco puro** — usar `$--bg-base` (#F5F4F0, warm off-white con armonía)


<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

*No recent activity*
</claude-mem-context>