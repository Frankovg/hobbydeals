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
│       ├── e2e/                    # Maestro E2E flows (YAML)
│       └── app.json                # Expo + EAS config
│
├── packages/
│   ├── ui/                         # @hobbydeals/ui (web-only)
│   │   ├── src/components/         # DealCard, CategoryBadge, VoteButton... (HTML + Tailwind)
│   │   └── .storybook/             # Storybook config (web)
│   │
│   ├── ui-native/                  # @hobbydeals/ui-native (mobile-only)
│   │   ├── src/components/         # DealCard, CategoryBadge, VoteButton... (RN + NativeWind)
│   │   └── .storybook/             # Storybook config (RN + react-native-web)
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
and `@hobbydeals/supabase`. E2E tests with Playwright in `apps/web/e2e/`.

### `apps/mobile` — React Native + Expo

Mobile application for iOS and Android. Uses Expo Router for file-based
navigation, NativeWind v5 for Tailwind CSS v4 compatible styles, and the same
shared logic packages as web (core, supabase). UI components come from
`@hobbydeals/ui-native`. E2E tests with Maestro in `apps/mobile/e2e/`.

## Packages

See [packages.md](./packages.md) for detailed documentation of each package.

## Architecture decisions

- **Turborepo** manages the pipeline: `turbo dev` starts web, mobile, and local
  Supabase in parallel; `turbo build` recompiles only what has changed.
- **Per-platform UI packages**: web uses `@hobbydeals/ui` (HTML + Tailwind CSS),
  mobile uses `@hobbydeals/ui-native` (RN + NativeWind v5). Both share design tokens
  via `packages/config/tailwind/theme.css`. Never mix web and native components in the same package.
- **Native Supabase Auth** — no Clerk. RLS depends on `auth.uid()` and triggers
  on `auth.users`. Replacing it would break database-level security.
- Packages in `packages/` never import from `apps/`. The dependency flow is
  always `apps → packages`, never the reverse.
- **Testing pyramid**: Jest + Testing Library for unit/integration in both UI
  packages and core. Storybook + Chromatic for visual regression in both UI
  packages. Playwright for web E2E (`apps/web/e2e/`). Maestro for mobile E2E
  (`apps/mobile/e2e/`).
