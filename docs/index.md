# HobbyDeals — Documentación

Plataforma de chollos vertical para hobbies. Comunidad-driven con sistema de
temperatura, alertas personalizadas y moderación editorial.

## Documentos

| Documento                            | Descripción                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| [architecture.md](./architecture.md) | Estructura del monorepo, apps y decisiones de arquitectura |
| [packages.md](./packages.md)         | Paquetes compartidos: ui, core, config, supabase           |
| [roadmap.md](./roadmap.md)           | Fases del MVP (12 semanas) y backlog post-MVP              |
| [panels.md](./panels.md)             | Panel de administración y panel de usuario                 |

## Contexto rápido

- **Monorepo**: Turborepo + pnpm workspaces
- **Web**: Next.js 14 App Router + Tailwind
- **Mobile**: React Native + Expo + NativeWind v4
- **Backend**: Supabase (Auth, Postgres, Realtime, Storage)
- **Auth**: Supabase Auth nativo — la RLS depende de `auth.uid()`
- **Estilos compartidos**: NativeWind v4 — mismo `className` en web y mobile
- **Validación**: Zod en `@hobbydeals/core`, compartido entre apps

Ver `CLAUDE.md` en la raíz para el contexto completo de desarrollo.
