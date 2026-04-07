# Monorepo Architecture

HobbyDeals is a monorepo managed with **Turborepo** and **pnpm workspaces**,
composed of two applications and four shared packages.

## Directory structure

```
hobbydeals/
├── apps/
│   ├── web/                        # Next.js 16 + App Router + Tailwind
│   │   ├── app/
│   │   │   ├── (auth)/             # login, registration, password recovery
│   │   │   ├── (main)/             # feed, detail, categories, search
│   │   │   ├── admin/              # dashboard, moderation, users
│   │   │   ├── profile/            # user panel, settings, alerts
│   │   │   └── api/                # webhooks, revalidation, affiliation
│   │   ├── components/             # web-specific components
│   │   ├── lib/                    # supabase SSR, metadata helpers
│   │   └── middleware.ts           # auth guard + route protection
│   │
│   └── mobile/                     # React Native + Expo + NativeWind v5
│       ├── app/
│       │   ├── (auth)/             # onboarding, login, registration
│       │   ├── (tabs)/             # feed, categories, search, profile
│       │   └── deal/[id]/          # detail with deep link
│       ├── components/             # native-specific components
│       └── app.json                # Expo + EAS config
│
├── packages/
│   ├── ui/                         # @hobbydeals/ui (web-only)
│   │   └── src/components/         # DealCard, CategoryBadge, VoteButton... (HTML + Tailwind)
│   │
│   ├── core/                       # @hobbydeals/core
│   │   ├── src/api/                # typed Supabase queries
│   │   ├── src/hooks/              # useDeals, useAuth, useVote...
│   │   ├── src/types/              # global TypeScript types
│   │   ├── src/utils/              # formatPrice, timeAgo, getTemp...
│   │   └── src/validations/        # shared Zod schemas
│   │
│   ├── config/                     # @hobbydeals/config
│   │   ├── eslint/                 # base, next, react-native configs
│   │   ├── typescript/             # tsconfig base, next, rn
│   │   └── tailwind/               # theme.css (shared design tokens)
│   │
│   └── supabase/                   # @hobbydeals/supabase
│       ├── src/client.ts           # factory: browser, server, mobile
│       └── src/types.ts            # generated types (supabase gen types)
│
├── supabase/                       # local config (Docker)
│   ├── migrations/                 # versioned SQL schema
│   ├── seed.sql                    # admin + users + 30 test deals
│   └── config.toml                 # ports, auth, local smtp
│
├── turbo.json                      # build/dev/lint/test pipeline
├── pnpm-workspace.yaml             # workspace definition
└── package.json                    # root workspace + global scripts
```

## Applications

### `apps/web` — Next.js 16

Main web application with App Router. Server-side rendering for SEO and
performance. Consumes shared packages `@hobbydeals/ui`, `@hobbydeals/core`,
and `@hobbydeals/supabase`.

### `apps/mobile` — React Native + Expo

Mobile application for iOS and Android. Uses Expo Router for file-based
navigation, NativeWind v5 for Tailwind CSS v4 compatible styles, and the same
shared logic packages as web (core, supabase). UI components are native-specific
and live in `apps/mobile/`.

## Packages

See [packages.md](./packages.md) for detailed documentation of each package.

## Architecture decisions

- **Turborepo** manages the pipeline: `turbo dev` starts web, mobile, and local
  Supabase in parallel; `turbo build` recompiles only what has changed.
- **Per-platform styling**: web uses Tailwind CSS directly, mobile uses
  NativeWind v5. Both share design tokens via `packages/config/tailwind/theme.css`.
  Components are separate: `@hobbydeals/ui` is web-only, mobile has its own in `apps/mobile/`.
- **Native Supabase Auth** — no Clerk. RLS depends on `auth.uid()` and triggers
  on `auth.users`. Replacing it would break database-level security.
- Packages in `packages/` never import from `apps/`. The dependency flow is
  always `apps → packages`, never the reverse.
