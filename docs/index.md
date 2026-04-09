# HobbyDeals — Documentation

Vertical deals platform for hobbies. Community-driven with a temperature system
(hot/cold votes), personalized alerts, and editorial moderation.

## Documents

| Document                             | Description                                              |
| ------------------------------------ | -------------------------------------------------------- |
| [architecture.md](./architecture.md) | Monorepo structure, apps, and architecture decisions     |
| [packages.md](./packages.md)         | Shared packages: ui, core, config, supabase              |
| [roadmap.md](./roadmap.md)           | MVP phases (12 weeks) and post-MVP backlog               |
| [panels.md](./panels.md)             | Admin panel and user panel                               |
| [testing.md](./testing.md)           | Testing strategy: unit, visual, E2E per platform         |

## Quick context

- **Monorepo**: Turborepo + pnpm workspaces
- **Web**: Next.js 16 App Router + Tailwind CSS
- **Mobile**: React Native + Expo + NativeWind v5
- **Backend**: Supabase (Auth, Postgres, Realtime, Storage)
- **Auth**: Native Supabase Auth — RLS depends on `auth.uid()`
- **Shared styles**: design tokens (theme.css) — NativeWind v5 mobile only, Tailwind CSS on web
- **Validation**: Zod in `@hobbydeals/core`, shared across apps

See root `CLAUDE.md` for the full development context.
