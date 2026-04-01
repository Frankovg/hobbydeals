# HobbyDeals — Project Context

Deals platform specialized in hobbies, inspired by Chollometro but vertical:
only leisure and hobby offers. Community-driven with a temperature system
(hot/cold votes), personalized alerts, and editorial moderation.

## Stack decisions (do not change without discussion)

- **Monorepo**: Turborepo + pnpm workspaces
- **Web**: Next.js 16 App Router + Tailwind CSS
- **Mobile**: React Native + Expo + Uniwind 1.6.1 (Tailwind v4 bindings, replaces NativeWind)
- **Backend**: Supabase (Auth, Postgres, Realtime, Storage)
- **Auth**: Native Supabase Auth — NO Clerk (breaks RLS and triggers)
- **Data fetching (web)**: Direct Supabase client in Server Components + Server Actions for mutations
- **Data fetching (mobile + interactive client components)**: TanStack Query + `@supabase-cache-helpers/postgrest-react-query`
- **NO GraphQL**: Supabase PostgREST covers field selection, joins, and filters — GraphQL adds no value with a single backend
- **Validation**: Zod (schemas in `@hobbydeals/core`, shared web+mobile)
- **Error tracking**: Sentry
- **Deal images**: Open Graph scraping as default + manual upload as fallback. Supabase Storage bucket `deal-images`. Edge Function to parse `og:image` from the deal URL
- **UX/Design**: Pencil (.pen files) — design source of truth lives in `apps/ux/`
- **CI/CD**: GitHub Actions -> Vercel (web) + Expo EAS (mobile)

## Monorepo structure

```
hobbydeals/
├── apps/
│   ├── web/          # Next.js 16 App Router
│   ├── mobile/       # React Native + Expo
│   └── ux/           # Pencil design files — UX source of truth
├── packages/
│   ├── ui/           # @hobbydeals/ui — cross-platform components (NativeWind)
│   ├── core/         # @hobbydeals/core — hooks, API queries, utils, types, Zod schemas
│   ├── config/       # @hobbydeals/config — eslint, tsconfig, tailwind preset
│   └── supabase/     # @hobbydeals/supabase — client factory + generated types
└── supabase/
    ├── migrations/   # versioned SQL schema
    ├── seed.sql      # development data (see below)
    └── config.toml
```

## Shared packages

### @hobbydeals/ui

Components using `className` with Tailwind/NativeWind that work on web and
mobile without wrappers. Key components: `DealCard`, `CategoryBadge`,
`VoteButton`, `TemperatureIndicator`, `PriceDisplay`, `UserAvatar`, `SearchBar`,
`EmptyState`.

### @hobbydeals/core

All shared business logic:

- Hooks: `useDeals(filters)`, `useDeal(id)`, `useVote()`, `useAuth()`, `useAlerts()`
- Utils: `formatPrice()`, `getTemperatureLabel()`, `timeAgo()` (ES locale)
- Zod schemas for forms (publish deal, registration, alert)
- Typed Supabase queries

### @hobbydeals/supabase

Client factory per environment:

- `createBrowserClient()` — Next.js client components
- `createServerClient()` — RSC and API routes
- `createMobileClient()` — React Native with AsyncStorage
- Types generated with `supabase gen types typescript`

### @hobbydeals/config

- `eslint-config-base`, `eslint-config-next`, `eslint-config-react-native`
- `tsconfig/base.json` (strict), `tsconfig/next.json`, `tsconfig/react-native.json`
- `tailwind/preset.js` with temperature system color tokens
- `tailwind/nativewind.js` for mobile

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
| `juegos-de-mesa`       | Juegos de Mesa         | #7F77DD |
| `gaming`               | Gaming                 | #1D9E75 |
| `coleccionismo`        | Coleccionismo          | #BA7517 |
| `airsoft-paintball`    | Airsoft & Paintball    | #D85A30 |
| `musica`               | Música                 | #D4537E |
| `modelismo-miniaturas` | Modelismo & Miniaturas | #378ADD |

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
├── (auth)/registro     # Registration + hobby selection
├── (main)/             # Main feed with filters
├── (main)/[categoria]  # Category feed
├── (main)/chollo/[id]  # Detail with comments and votes
├── (main)/buscar       # Full-text search (pg_trgm)
├── admin/              # Admin panel — protected role:admin|moderator
└── perfil/             # User panel — protected auth
```

### Mobile (Expo Router)

```
app/
├── (auth)/             # Onboarding + login
└── (tabs)/
    ├── index           # Main feed
    ├── categorias      # Category grid
    ├── buscar          # Search
    └── perfil          # User panel
```

## Admin panel (/admin)

- Dashboard: daily metrics, pending reports, average temperature
- Moderation queue: approve/reject deals with reason
- User management: role, ban, reputation
- Verified stores and affiliate URLs
- Featured and sponsored management (always labeled)

## User panel (/perfil)

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
- `@hobbydeals/ui` components use `className` (NativeWind compatible)
- Never import from `apps/` inside `packages/`
- Supabase queries always typed, never `any`
- Zod schemas defined in `@hobbydeals/core/src/validations`, imported in both apps
- File names: kebab-case for files, PascalCase for components
