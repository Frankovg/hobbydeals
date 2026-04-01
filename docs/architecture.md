# Arquitectura del monorepo

HobbyDeals es un monorepo gestionado con **Turborepo** y **pnpm workspaces**,
compuesto por dos aplicaciones y cuatro paquetes compartidos.

## Estructura de directorios

```
hobbydeals/
├── apps/
│   ├── web/                        # Next.js 14 + App Router + Tailwind
│   │   ├── app/
│   │   │   ├── (auth)/             # login, registro, recuperar clave
│   │   │   ├── (main)/             # feed, detalle, categorías, búsqueda
│   │   │   ├── admin/              # dashboard, moderación, usuarios
│   │   │   ├── perfil/             # panel usuario, ajustes, alertas
│   │   │   └── api/                # webhooks, revalidación, afiliación
│   │   ├── components/             # componentes web-específicos
│   │   ├── lib/                    # supabase SSR, metadata helpers
│   │   └── middleware.ts           # auth guard + route protection
│   │
│   └── mobile/                     # React Native + Expo + NativeWind v5
│       ├── app/
│       │   ├── (auth)/             # onboarding, login, registro
│       │   ├── (tabs)/             # feed, categorías, buscar, perfil
│       │   └── chollo/[id]/        # detalle con deep link
│       ├── components/             # componentes native-específicos
│       └── app.json                # config Expo + EAS
│
├── packages/
│   ├── ui/                         # @hobbydeals/ui
│   │   ├── src/components/         # DealCard, CategoryBadge, VoteButton...
│   │   └── src/theme/              # tokens, colores, tipografía
│   │
│   ├── core/                       # @hobbydeals/core
│   │   ├── src/api/                # queries Supabase tipadas
│   │   ├── src/hooks/              # useDeals, useAuth, useVote...
│   │   ├── src/types/              # tipos globales TypeScript
│   │   ├── src/utils/              # formatPrice, timeAgo, getTemp...
│   │   └── src/validations/        # schemas Zod compartidos
│   │
│   ├── config/                     # @hobbydeals/config
│   │   ├── eslint/                 # configs base, next, react-native
│   │   ├── typescript/             # tsconfig base, next, rn
│   │   └── tailwind/               # preset + NativeWind preset
│   │
│   └── supabase/                   # @hobbydeals/supabase
│       ├── src/client.ts           # factory: browser, server, mobile
│       └── src/types.ts            # tipos generados (supabase gen types)
│
├── supabase/                       # configuración local (Docker)
│   ├── migrations/                 # schema SQL versionado
│   ├── seed.sql                    # admin + users + 30 chollos de prueba
│   └── config.toml                 # puertos, auth, smtp local
│
├── turbo.json                      # pipeline build/dev/lint/test
├── pnpm-workspace.yaml             # definición del workspace
└── package.json                    # root workspace + scripts globales
```

## Aplicaciones

### `apps/web` — Next.js 14

Aplicación web principal con App Router. Renderizado en servidor para SEO y
rendimiento. Consume los paquetes compartidos `@hobbydeals/ui`, `@hobbydeals/core`
y `@hobbydeals/supabase`.

### `apps/mobile` — React Native + Expo

Aplicación móvil para iOS y Android. Usa Expo Router para navegación basada en
archivos, NativeWind v5 para estilos compatibles con Tailwind CSS v4, y los mismos paquetes
compartidos que la web.

## Paquetes

Ver [packages.md](./packages.md) para la documentación detallada de cada paquete.

## Decisiones de arquitectura

- **Turborepo** gestiona el pipeline: `turbo dev` arranca web, mobile y Supabase local
  en paralelo; `turbo build` recompila solo lo que ha cambiado.
- **NativeWind v5** es el puente de estilos: los componentes de `@hobbydeals/ui`
  usan `className` de Tailwind y funcionan en ambas plataformas sin wrappers.
- **Supabase Auth nativo** — no Clerk. La RLS depende de `auth.uid()` y los
  triggers sobre `auth.users`. Sustituirlo rompería la seguridad a nivel de base
  de datos.
- Los paquetes en `packages/` nunca importan desde `apps/`. El flujo de
  dependencias es siempre `apps → packages`, nunca al revés.
