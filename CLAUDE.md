# HobbyDeals — Project Context

Deals platform specialized in hobbies, inspired by Chollometro but vertical:
only leisure and hobby offers. Community-driven with a temperature system
(hot/cold votes), personalized alerts, and editorial moderation.

## Project documentation

The `docs/` directory is the source of truth for architecture, packages, testing,
roadmap, panels, and brand identity. Always read and follow `docs/` before
implementing. If your changes conflict with what's documented there, flag it
before proceeding.

## Stack decisions (do not change without discussion)

- **Monorepo**: Turborepo + pnpm workspaces
- **Web**: Next.js 16 App Router + Tailwind CSS
- **Mobile**: React Native + Expo + NativeWind v5 (Tailwind v4 bindings)
- **Backend**: Supabase (Auth, Postgres, Realtime, Storage)
- **Auth**: Native Supabase Auth — NO Clerk (breaks RLS and triggers)
- **Data fetching (web)**: Direct Supabase client in Server Components + Server Actions for mutations
- **Data fetching (mobile + interactive client components)**: TanStack Query + `@supabase-cache-helpers/postgrest-react-query`
- **NO GraphQL**: Supabase PostgREST covers field selection, joins, and filters — GraphQL adds no value with a single backend
- **Validation**: Zod (schemas in `@hobbydeals/core`, shared web+mobile)
- **Error tracking**: Sentry
- **Deal images**: Open Graph scraping as default + manual upload as fallback. Supabase Storage bucket `deal-images`. Edge Function to parse `og:image` from the deal URL
- **UX/Design**: Pencil (.pen files) — design source of truth lives in `apps/ux/`
- **Testing (UI packages)**: Vitest + `@storybook/addon-vitest` (stories as tests, browser mode with Playwright) + `@storybook/addon-a11y` (accessibility)
- **Testing (apps)**: Jest + React Testing Library (web) + Jest + `@testing-library/react-native` (mobile)
- **Testing (visual)**: Storybook + Chromatic for `@hobbydeals/ui` (web). `@hobbydeals/ui-native` uses only Storybook + `@storybook/addon-a11y` — no visual regression yet (Chromatic renders via `react-native-web`, which doesn't match native iOS/Android output; plan is to add Maestro + screenshot diff when flows stabilize)
- **Testing (E2E web)**: Playwright (automated via MCP + Claude Code)
- **Testing (E2E mobile)**: Maestro (YAML-based flows)
- **CI/CD**: GitHub Actions -> Vercel (web) + Expo EAS (mobile)

## Monorepo structure

```
hobbydeals/
├── apps/
│   ├── web/          # Next.js 16 App Router
│   ├── mobile/       # React Native + Expo
│   └── ux/           # Pencil design files — UX source of truth
├── packages/
│   ├── ui/                 # @hobbydeals/ui — web components (HTML + Tailwind CSS)
│   ├── ui-native/          # @hobbydeals/ui-native — mobile components (RN + NativeWind v5)
│   ├── core/               # @hobbydeals/core — hooks, API queries, utils, types, Zod schemas
│   ├── config/             # @hobbydeals/config — shared Tailwind theme + theme:generate script
│   ├── eslint-config/      # @hobbydeals/eslint-config — base / next-js / react-internal presets
│   ├── typescript-config/  # @hobbydeals/typescript-config — base, library, nextjs, react-library, tests-react
│   ├── jest-config/        # @hobbydeals/jest-config — shared Jest base + react presets (apps + core)
│   └── supabase/           # @hobbydeals/supabase — client factory + generated types
└── supabase/
    ├── migrations/   # versioned SQL schema
    ├── seed.sql      # development data (see below)
    └── config.toml
```

## Shared packages

### @hobbydeals/ui

Web-only components using `className` with Tailwind CSS (HTML elements, Next.js compatible).
Both platforms share design tokens via `packages/config/tailwind/theme.css`.

Components are organized one directory per component, with the public API in
`<component>/index.tsx` (the package exports `./*` → `./src/*/index.tsx`). When a
component has multiple primitives (e.g. `Avatar` + `AvatarRoot`/`Image`/`Fallback`/
`Badge`/`Group`), the primitives live in `<component>/components/` and `index.tsx`
re-exports a higher-level convenience API on top of them. Stories co-locate as
`<component>/<component>.stories.tsx` and import from `.`.

Generic UI primitives shipped so far: `Button`, `Badge`, `Input`, `Textarea`,
`SelectNative`, `InputGroup`, `Item`, `Separator`, `Card`, `Avatar` / `AvatarGroup`,
`Alert`, `AlertDialog`. Domain components (`DealCard`, `CategoryBadge`, `VoteButton`,
`TemperatureIndicator`, `PriceDisplay`, `UserAvatar`, `SearchBar`, `EmptyState`) are
planned on top of these primitives.

Includes Storybook for component development and Chromatic for visual regression.

### @hobbydeals/ui-native

Mobile components using React Native primitives (`View`, `Text`, `Pressable`) + NativeWind v5.
Consumed by `apps/mobile/`. Shares design tokens with `@hobbydeals/ui` via `packages/config/tailwind/theme.css`.
Key mobile components mirror web counterparts: `DealCard`, `CategoryBadge`, `VoteButton`,
`TemperatureIndicator`, `PriceDisplay`, `UserAvatar`, `SearchBar`, `EmptyState`.
Includes Storybook (`@storybook/react-vite` + `react-native-web` alias) for component development. No visual regression tool yet — see stack decisions above.

### @hobbydeals/core

All shared business logic:

- Hooks: `useDeals(filters)`, `useDeal(id)`, `useVote()`, `useAuth()`, `useAlerts()`
- Utils: `formatPrice()`, `getTemperatureLabel()`, `getTemperatureColor()`, `timeAgo()` (ES locale), `getInitials()`
- Zod schemas for forms (publish deal, registration, alert)
- Typed Supabase queries
- Tests: Jest + `ts-jest` via `@hobbydeals/jest-config/base`. Tests live in `src/<area>/test/*.test.ts`

### @hobbydeals/supabase

Client factory per environment:

- `createBrowserClient()` — Next.js client components
- `createServerClient()` — RSC and API routes
- `createMobileClient()` — React Native with AsyncStorage
- Types generated with `supabase gen types typescript`

### @hobbydeals/config

- `tailwind/theme.css` — shared design tokens (colors, spacing, typography, temperature, categories). Single source of truth for both web (Tailwind v4 CSS-first) and mobile (NativeWind v5)
- `scripts/generate-mobile-theme.ts` — emits `apps/mobile/lib/theme.ts` (`THEME` + `NAV_THEME`) and `apps/mobile/theme-system.css` from `theme.css`. Run with `pnpm theme:generate`

### @hobbydeals/eslint-config

Flat-config presets used by every workspace. Exports:

- `./base` — common rules for the monorepo (TS, imports, react-hooks, turbo, prettier)
- `./next-js` — base + Next.js plugin
- `./react-internal` — base + React rules for shared component packages (also handles `.cjs` files)

### @hobbydeals/typescript-config

Strict TS configs extended by every package:

- `base.json` — strict baseline (`strict`, `noUncheckedIndexedAccess`)
- `library.json` / `react-library.json` — for shared packages
- `nextjs.json` — App Router defaults
- `tests-react.json` — extends `react-library.json` with `jest`, `node`, `@testing-library/jest-dom` types

### @hobbydeals/jest-config

Shared Jest presets (CommonJS, since Jest config files are `.cjs`):

- `./base` — `ts-jest` preset, Node environment, `src/**/*.test.{ts,tsx}` match
- `./react` — extends base with `jest-environment-jsdom` + `@testing-library/jest-dom`

Consumed by `@hobbydeals/core` (and apps/web going forward) via `jest.config.cjs`:
`module.exports = require("@hobbydeals/jest-config/base");`

## UX / Design (apps/ux/)

Pencil project with the UX source of truth for web and mobile. Contains:

- `hobbydeals-ux.pen` — main design file (read/write only via Pencil MCP tools, NOT Read/Grep)
- `images/` — exported assets and references
- `CLAUDE.md` — design guidelines, component specs, temperature system visuals, and brand manual

**Important**: `.pen` files are encrypted. Always use `pencil` MCP tools (`batch_get`, `batch_design`, `get_editor_state`, etc.) to interact with them. Never use `Read` or `Grep` on `.pen` files.

When implementing UI components, refer to the Pencil designs as the visual spec. The `apps/ux/CLAUDE.md` has the full design system documentation (colors, typography, spacing, component inventory).

## Database (Supabase + PostgreSQL)

### Main tables

| Table                   | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| `profiles`              | Extends auth.users. Fields: username, role, reputation, notif_prefs     |
| `categories`            | 6 MVP categories (see below)                                            |
| `stores`                | Verified merchants with affiliate URLs                                  |
| `deals`                 | Deals. discount_pct is an auto-generated column                         |
| `deal_votes`            | Hot/cold votes. UNIQUE(deal_id, user_id)                                |
| `comments`              | Nested 1 level (parent_id). Soft delete with is_deleted                 |
| `alerts`                | Alerts by keyword + category + max price                                |
| `notifications`         | In-app via Supabase Realtime                                            |
| `saved_deals`           | User favorites                                                          |
| `reports`               | Content reports for moderation                                          |
| `user_category_follows` | Followed categories for personalized feed                               |

### Database logic (triggers)

- `handle_new_user` — auto-creates profile on signup (on auth.users)
- `update_deal_temperature` — recalculates temperature after each vote: `(hot*2) - (cold*1)`
- `update_comments_count` — maintains denormalized counter in deals
- `update_user_reputation` — recalculates author reputation when their deals get voted
- `update_updated_at` — updates timestamp on deals, profiles, comments

### RLS

All user tables have RLS enabled. Helper `current_user_role()` to check
admin/moderator. Public tables (categories, stores, tags) have no RLS.

### Enums

`deal_status`: pending | active | expired | rejected | archived
`user_role`: user | moderator | admin
`vote_value`: hot | cold
`report_status`: pending | reviewed | resolved | dismissed
`notif_type`: alert_match | comment_reply | deal_hot | deal_expired | system

## MVP Categories

| Slug                   | Name                   | Color   |
| ---------------------- | ---------------------- | ------- |
| `board-games`          | Juegos de Mesa         | #7F77DD |
| `gaming`               | Gaming                 | #1D9E75 |
| `collectibles`         | Coleccionismo          | #BA7517 |
| `airsoft`              | Airsoft                | #D85A30 |
| `music`                | Música                 | #D4537E |
| `modeling`             | Modelismo              | #378ADD |

## Development data (seed.sql)

The `supabase/seed.sql` file contains:

- **6 users**: admin@hobbydeals.es (Admin1234!) + 5 test users (Test1234!)
- **Admin user**: id `a0000001-*`, role `admin`, reputation 1000
- **30 deals**: 5 per category, mix of `active` and `pending`
- **Votes, comments, alerts, saved deals, and follows** as examples
- **10 stores** (Amazon, FNAC, Thomann, Steam, Games Workshop...)
- Denormalized counters updated at the end of the seed

Development commands:

```bash
supabase start          # Start local Postgres + Auth + Studio
supabase db reset       # Apply migrations + seed from scratch
supabase gen types typescript --local > packages/supabase/src/types.ts
```

## Main routes

### Web (Next.js App Router)

```
app/
├── (auth)/login        # Magic link + OAuth Google
├── (auth)/register     # Registration + hobby selection
├── (main)/             # Main feed with filters
├── (main)/[category]   # Category feed
├── (main)/deal/[id]    # Detail with comments and votes
├── (main)/search       # Full-text search (pg_trgm)
├── admin/              # Admin panel — protected role:admin|moderator
└── profile/            # User panel — protected auth
```

### Mobile (Expo Router)

```
app/
├── (auth)/             # Onboarding + login
└── (tabs)/
    ├── index           # Main feed
    ├── categories      # Category grid
    ├── search          # Search
    └── profile         # User panel
```

## Admin panel (/admin)

- Dashboard: daily metrics, pending reports, average temperature
- Moderation queue: approve/reject deals with reason
- User management: role, ban, reputation
- Verified stores and affiliate URLs
- Featured and sponsored management (always labeled)

## User panel (/profile)

- Activity and reputation overview
- My deals (active/pending/expired)
- Saved deals and alerts
- Profile and notification settings

## MVP Roadmap (12 weeks)

1. **Wk 1-2**: Monorepo foundation + local Supabase + seed
2. **Wk 3-4**: Design system + Auth (web and mobile)
3. **Wk 5-7**: Feed, votes, publishing, comments, search
4. **Wk 8-9**: User panel + alerts + Realtime notifications
5. **Wk 10-11**: Admin panel + moderation
6. **Wk 12**: SEO, performance, deploy Vercel + EAS

## Data fetching pattern

Reusable queries in `@hobbydeals/core` that receive a typed client:

| Context | Tool | Example |
|---------|------|---------|
| Server Components (web) | Direct Supabase client | `await getDeals(createServerClient(), filters)` |
| Simple mutations (web) | Server Actions + `revalidatePath()` | Publish deal, moderate, edit profile |
| Interactive Client Components (web) | TanStack Query | Votes (optimistic updates), comments, search, infinite scroll |
| Mobile (all) | TanStack Query | RN has no Server Components, TanStack Query is the server state manager |
| Realtime | Supabase Realtime + TanStack Query | Subscriptions to votes/temperature via `postgres_changes` |

`@supabase-cache-helpers/postgrest-react-query` generates automatic cache keys
and syncs mutations with queries. Always use when combining Supabase + TanStack Query.

## Code conventions

- **Code language**: All source code, comments, JSDoc, variable names, commits, and technical documentation must be **in English**. User-facing content (HTML, UI text, labels, descriptions) can be multilingual (Spanish by default for the app)
- Strict TypeScript across the entire monorepo
- `@hobbydeals/ui` is web-only (HTML + Tailwind CSS). `@hobbydeals/ui-native` is mobile-only (RN + NativeWind). Never mix web and native components in the same package
- Never import from `apps/` inside `packages/`
- Supabase queries always typed, never `any`
- Zod schemas defined in `@hobbydeals/core/src/validations`, imported in both apps
- File names: kebab-case for files, PascalCase for components

## Testing strategy

### UI packages — Vitest + Storybook addon-vitest

`@hobbydeals/ui` and `@hobbydeals/ui-native` use Vitest with `@storybook/addon-vitest` to run
stories as component tests in a real browser (Playwright Chromium, headless). Stories double as
tests — no separate `.test.tsx` files needed for component behavior covered by stories.

| Package | Test runner | Browser | A11y |
|---------|------------|---------|------|
| `@hobbydeals/ui` | `vitest --project=storybook` | Playwright Chromium | `@storybook/addon-a11y` |
| `@hobbydeals/ui-native` | `vitest --project=storybook` | Playwright Chromium | `@storybook/addon-a11y` |

Stories and tests live next to each component:
```
packages/ui/src/deal-card/
├── deal-card.tsx
├── deal-card.stories.tsx    # doubles as component test
└── index.ts
```

### App tests — Jest + Testing Library

Apps use Jest for unit and integration tests (business logic, hooks, screens).

| Package | Test library | Preset |
|---------|-------------|--------|
| `apps/web` | `@testing-library/react` | `ts-jest` |
| `apps/mobile` | `@testing-library/react-native` | `jest-expo` |
| `@hobbydeals/core` | `@testing-library/react` (for hooks) | `ts-jest` |

### Visual testing — Storybook

Both `@hobbydeals/ui` and `@hobbydeals/ui-native` have their own Storybook setup
with `@storybook/react-vite`.

- `@hobbydeals/ui`: `@storybook/react-vite` with web viewports (mobile 390px, tablet 768px, desktop 1280px, wide 1536px). Chromatic runs on every PR for automated visual regression
- `@hobbydeals/ui-native`: `@storybook/react-vite` + `react-native-web` alias, with mobile viewports (iPhone SE, iPhone 14, iPhone 14 Pro Max, Android). No Chromatic — `react-native-web` rendering doesn't match native iOS/Android output, so visual regression on web would be misleading. Plan is to add Maestro + screenshot diff against real simulators once mobile flows stabilize

### E2E tests — Playwright (web) + Maestro (mobile)

| Platform | Tool | Test location | How it runs |
|----------|------|---------------|-------------|
| Web | Playwright | `apps/web/e2e/` | Automated via Playwright MCP + Claude Code |
| Mobile | Maestro | `apps/mobile/e2e/` | YAML flow files, runs against simulator/device |

Playwright tests cover critical web user flows: auth, deal publishing, voting, search, admin moderation.
Maestro flows cover the equivalent mobile flows: onboarding, feed browsing, voting, search, profile.
