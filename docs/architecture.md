# Monorepo Architecture

HobbyDeals is a monorepo managed with **Turborepo** and **pnpm workspaces**,
composed of two applications and a set of shared packages (UI, core, supabase,
plus shared tooling configs).

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
│   │   ├── src/<component>/        # one dir per component, public API in index.tsx
│   │   │   ├── index.tsx           # exported entry (package exports "./*" → "./src/*/index.tsx")
│   │   │   ├── <component>.stories.tsx
│   │   │   └── components/         # optional: primitives split (e.g. avatar/, alert/)
│   │   ├── src/lib/utils.ts        # shared cn() helper
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
│   │   ├── src/utils/              # formatPrice, timeAgo, getTemp, getInitials...
│   │   ├── src/utils/test/         # *.test.ts — Jest tests for utils
│   │   ├── src/validations/        # shared Zod schemas
│   │   └── jest.config.cjs         # re-exports @hobbydeals/jest-config/base
│   │
│   ├── config/                     # @hobbydeals/config (Tailwind theme + scripts)
│   │   ├── tailwind/theme.css      # shared design tokens (single source of truth)
│   │   └── scripts/                # generate-mobile-theme.ts (theme:generate)
│   │
│   ├── eslint-config/              # @hobbydeals/eslint-config
│   │   ├── base.js                 # common flat-config rules
│   │   ├── next.js                 # base + Next.js plugin
│   │   └── react-internal.js       # base + React rules (shared component packages)
│   │
│   ├── typescript-config/          # @hobbydeals/typescript-config
│   │   ├── base.json               # strict baseline
│   │   ├── library.json            # shared package defaults
│   │   ├── react-library.json      # library + React JSX
│   │   ├── nextjs.json             # Next.js App Router
│   │   └── tests-react.json        # react-library + jest / node / jest-dom types
│   │
│   ├── jest-config/                # @hobbydeals/jest-config
│   │   ├── base.cjs                # ts-jest preset, Node env (apps + core)
│   │   └── react.cjs               # base + jsdom + @testing-library/jest-dom
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
- **Mobile theme pipeline**: `theme.css` is the single source of truth, but mobile needs
  two derived artifacts that web does not: a JS `NAV_THEME` object for React Navigation
  (which cannot read CSS variables) and a flattened `--color-*` stylesheet with a
  `prefers-color-scheme: dark` block (NativeWind v5 runtime does not traverse the
  multi-level `var()` indirection in `theme.css`). Both are generated by
  `packages/config/scripts/generate-mobile-theme.ts` and written to
  `apps/mobile/lib/theme.ts` and `apps/mobile/theme-system.css`. Run with
  `pnpm theme:generate` after any change to `theme.css`. See [packages.md](./packages.md#scripts-scripts) for details.
- **Native Supabase Auth** — no Clerk. RLS depends on `auth.uid()` and triggers
  on `auth.users`. Replacing it would break database-level security.
- Packages in `packages/` never import from `apps/`. The dependency flow is
  always `apps → packages`, never the reverse.
- **Tooling configs are split per concern**: `@hobbydeals/eslint-config`,
  `@hobbydeals/typescript-config`, and `@hobbydeals/jest-config` are independent
  packages so each one only pulls its own deps. `@hobbydeals/config` is reserved
  for the shared Tailwind theme + theme generation script.
- **Testing pyramid**: Vitest + `@storybook/addon-vitest` runs stories as
  component tests in both UI packages (no separate `*.test.tsx` files for what
  stories already cover). Jest + Testing Library covers unit/integration in apps
  and `@hobbydeals/core` (using `@hobbydeals/jest-config/base`). Chromatic runs
  visual regression on `@hobbydeals/ui` only. Playwright covers web E2E
  (`apps/web/e2e/`). Maestro covers mobile E2E (`apps/mobile/e2e/`).
