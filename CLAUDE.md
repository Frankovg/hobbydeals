# HobbyDeals — Contexto del proyecto

Plataforma de chollos especializada en hobbies, inspirada en Chollometro pero
vertical: solo ofertas de ocio y afición. Comunidad-driven con sistema de
temperatura (votos hot/cold), alertas personalizadas y moderación editorial.

## Stack de decisiones (no cambiar sin discutir)

- **Monorepo**: Turborepo + pnpm workspaces
- **Web**: Next.js 16 App Router + Tailwind CSS
- **Mobile**: React Native + Expo + NativeWind v4
- **Backend**: Supabase (Auth, Postgres, Realtime, Storage)
- **Auth**: Supabase Auth nativo — NO Clerk (rompe RLS y triggers)
- **Data fetching (web)**: Supabase client directo en Server Components + Server Actions para mutaciones
- **Data fetching (mobile + client components interactivos)**: TanStack Query + `@supabase-cache-helpers/postgrest-react-query`
- **NO GraphQL**: PostgREST de Supabase cubre selección de campos, joins y filtros — GraphQL no agrega valor con un solo backend
- **Validación**: Zod (schemas en `@hobbydeals/core`, compartidos web+mobile)
- **Error tracking**: Sentry
- **Imágenes de chollos**: Scraping Open Graph como default + upload manual como fallback. Supabase Storage bucket `deal-images`. Edge Function para parsear `og:image` de la URL del deal
- **CI/CD**: GitHub Actions → Vercel (web) + Expo EAS (mobile)

## Estructura del monorepo

```
hobbydeals/
├── apps/
│   ├── web/          # Next.js 16 App Router
│   └── mobile/       # React Native + Expo
├── packages/
│   ├── ui/           # @hobbydeals/ui — componentes multiplataforma (NativeWind)
│   ├── core/         # @hobbydeals/core — hooks, API queries, utils, tipos, Zod schemas
│   ├── config/       # @hobbydeals/config — eslint, tsconfig, tailwind preset
│   └── supabase/     # @hobbydeals/supabase — client factory + tipos generados
└── supabase/
    ├── migrations/   # schema SQL versionado
    ├── seed.sql      # datos de desarrollo (ver abajo)
    └── config.toml
```

## Packages compartidos

### @hobbydeals/ui

Componentes con `className` Tailwind/NativeWind que funcionan en web y mobile
sin wrappers. Componentes clave: `DealCard`, `CategoryBadge`, `VoteButton`,
`TemperatureIndicator`, `PriceDisplay`, `UserAvatar`, `SearchBar`, `EmptyState`.

### @hobbydeals/core

Toda la lógica de negocio compartida:

- Hooks: `useDeals(filters)`, `useDeal(id)`, `useVote()`, `useAuth()`, `useAlerts()`
- Utils: `formatPrice()`, `getTemperatureLabel()`, `timeAgo()` (locale ES)
- Schemas Zod para formularios (publicar chollo, registro, alerta)
- Queries Supabase tipadas

### @hobbydeals/supabase

Factory de clientes según entorno:

- `createBrowserClient()` — Next.js client components
- `createServerClient()` — RSC y API routes
- `createMobileClient()` — React Native con AsyncStorage
- Tipos generados con `supabase gen types typescript`

### @hobbydeals/config

- `eslint-config-base`, `eslint-config-next`, `eslint-config-react-native`
- `tsconfig/base.json` (strict), `tsconfig/next.json`, `tsconfig/react-native.json`
- `tailwind/preset.js` con tokens de color del sistema de temperatura
- `tailwind/nativewind.js` para mobile

## Base de datos (Supabase + PostgreSQL)

### Tablas principales

| Tabla                   | Descripción                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| `profiles`              | Extiende auth.users. Campos: username, role, reputation, notif_prefs |
| `categories`            | 6 categorías MVP (ver abajo)                                         |
| `stores`                | Merchants verificados con URLs de afiliación                         |
| `deals`                 | Chollos. discount_pct es columna generada automáticamente            |
| `deal_votes`            | Votos hot/cold. UNIQUE(deal_id, user_id)                             |
| `comments`              | Anidados 1 nivel (parent_id). Soft delete con is_deleted             |
| `alerts`                | Alertas por keyword + categoría + precio máximo                      |
| `notifications`         | In-app via Supabase Realtime                                         |
| `saved_deals`           | Favoritos del usuario                                                |
| `reports`               | Reportes de contenido para moderación                                |
| `user_category_follows` | Categorías seguidas para feed personalizado                          |

### Lógica en base de datos (triggers)

- `handle_new_user` — crea perfil automáticamente al registrarse (sobre auth.users)
- `update_deal_temperature` — recalcula temperatura tras cada voto: `(hot*2) - (cold*1)`
- `update_comments_count` — mantiene contador desnormalizado en deals
- `update_user_reputation` — recalcula reputación del autor cuando votan sus chollos
- `update_updated_at` — actualiza timestamp en deals, profiles, comments

### RLS

Todas las tablas de usuario tienen RLS. Helper `current_user_role()` para
verificar admin/moderator. Las tablas públicas (categories, stores, tags) no
tienen RLS.

### Enums

`deal_status`: pending | active | expired | rejected | archived
`user_role`: user | moderator | admin
`vote_value`: hot | cold
`report_status`: pending | reviewed | resolved | dismissed
`notif_type`: alert_match | comment_reply | deal_hot | deal_expired | system

## Categorías MVP

| Slug                   | Nombre                 | Color   |
| ---------------------- | ---------------------- | ------- |
| `juegos-de-mesa`       | Juegos de Mesa         | #7F77DD |
| `gaming`               | Gaming                 | #1D9E75 |
| `coleccionismo`        | Coleccionismo          | #BA7517 |
| `airsoft-paintball`    | Airsoft & Paintball    | #D85A30 |
| `musica`               | Música                 | #D4537E |
| `modelismo-miniaturas` | Modelismo & Miniaturas | #378ADD |

## Datos de desarrollo (seed.sql)

El archivo `supabase/seed.sql` contiene:

- **6 usuarios**: admin@hobbydeals.es (Admin1234!) + 5 usuarios de prueba (Test1234!)
- **Usuario admin**: id `a0000001-*`, role `admin`, reputación 1000
- **30 chollos**: 5 por categoría, mezcla de `active` y `pending`
- **Votos, comentarios, alertas, guardados y follows** de ejemplo
- **10 tiendas** (Amazon, FNAC, Thomann, Steam, Games Workshop...)
- Contadores desnormalizados actualizados al final del seed

Comandos de desarrollo:

```bash
supabase start          # Inicia Postgres + Auth + Studio local
supabase db reset       # Aplica migrations + seed desde cero
supabase gen types typescript --local > packages/supabase/src/types.ts
```

## Rutas principales

### Web (Next.js App Router)

```
app/
├── (auth)/login        # Magic link + OAuth Google
├── (auth)/registro     # Registro + selección hobbies
├── (main)/             # Feed principal con filtros
├── (main)/[categoria]  # Feed por categoría
├── (main)/chollo/[id]  # Detalle con comentarios y votos
├── (main)/buscar       # Búsqueda full-text (pg_trgm)
├── admin/              # Panel admin — protegido role:admin|moderator
└── perfil/             # Panel usuario — protegido auth
```

### Mobile (Expo Router)

```
app/
├── (auth)/             # Onboarding + login
└── (tabs)/
    ├── index           # Feed principal
    ├── categorias      # Grid de categorías
    ├── buscar          # Búsqueda
    └── perfil          # Panel usuario
```

## Panel de administración (/admin)

- Dashboard: métricas diarias, reportes pendientes, temperatura media
- Cola de moderación: aprobar/rechazar chollos con motivo
- Gestión de usuarios: rol, ban, reputación
- Tiendas verificadas y URLs de afiliación
- Gestión de destacados y patrocinados (siempre etiquetados)

## Panel de usuario (/perfil)

- Overview de actividad y reputación
- Mis chollos (activo/pendiente/expirado)
- Guardados y alertas
- Configuración de perfil y notificaciones

## Roadmap MVP (12 semanas)

1. **Sem 1–2**: Fundación monorepo + Supabase local + seed
2. **Sem 3–4**: Sistema de diseño + Auth (web y mobile)
3. **Sem 5–7**: Feed, votos, publicación, comentarios, búsqueda
4. **Sem 8–9**: Panel usuario + alertas + notificaciones Realtime
5. **Sem 10–11**: Panel administración + moderación
6. **Sem 12**: SEO, performance, deploy Vercel + EAS

## Patrón de data fetching

Queries reutilizables en `@hobbydeals/core` que reciben un cliente tipado:

| Contexto | Herramienta | Ejemplo |
|----------|-------------|---------|
| Server Components (web) | Supabase client directo | `await getDeals(createServerClient(), filters)` |
| Mutaciones simples (web) | Server Actions + `revalidatePath()` | Publicar chollo, moderar, editar perfil |
| Client Components interactivos (web) | TanStack Query | Votos (optimistic updates), comentarios, búsqueda, infinite scroll |
| Mobile (todo) | TanStack Query | RN no tiene Server Components, TanStack Query es el state manager de server state |
| Realtime | Supabase Realtime + TanStack Query | Suscripciones a votos/temperatura via `postgres_changes` |

`@supabase-cache-helpers/postgrest-react-query` genera cache keys automáticas
y sincroniza mutations con queries. Usar siempre que se combine Supabase + TanStack Query.

## Convenciones de código

- TypeScript estricto en todo el monorepo
- Componentes de `@hobbydeals/ui` usan `className` (NativeWind compatible)
- Nunca importar desde `apps/` dentro de `packages/`
- Queries Supabase siempre tipadas, nunca `any`
- Zod schemas definidos en `@hobbydeals/core/src/validations`, importados en ambas apps
- Nombres de archivos: kebab-case para archivos, PascalCase para componentes
