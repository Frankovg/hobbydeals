# Shared Packages

All packages live in `packages/` and are consumed by `apps/web` and/or
`apps/mobile`. No package imports from `apps/`.

---

## `@hobbydeals/ui`

Web-only component library. Uses `className` with Tailwind CSS on standard HTML
elements (Next.js compatible). Mobile has its own package `@hobbydeals/ui-native`.
Both platforms share design tokens via `packages/config/tailwind/theme.css`.

### Components

| Component              | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `DealCard`             | Deal card with visual temperature, price, discount, and votes       |
| `CategoryBadge`        | Badge with icon and hobby color                                     |
| `VoteButton`           | Hot/cold button with animation and optimistic state                 |
| `TemperatureIndicator` | Visual heat scale for the deal (cold → hot)                         |
| `PriceDisplay`         | Current price + original strikethrough + % discount                 |
| `UserAvatar`           | Avatar with image or initials fallback                              |
| `SearchBar`            | Web search bar                                                      |
| `EmptyState`           | Illustrated empty state with message and optional action            |
| `Toast` / `Alert`      | Temporary notifications and error messages                          |

### Theme

Design tokens (temperature colors, category palette, typography, spacing) are
defined in `@hobbydeals/config/tailwind/theme.css` and imported via CSS.
Both `@hobbydeals/ui` (web) and `@hobbydeals/ui-native` (mobile) share the
same token file — no JS preset needed (Tailwind v4 CSS-first approach).

### Testing

- **Unit/integration**: Jest + `@testing-library/react`. Tests co-locate with components (`*.test.tsx`).
- **Visual**: Storybook (`@storybook/react` + `@storybook/nextjs`) + Chromatic for visual regression. Stories co-locate with components (`*.stories.tsx`).

```
src/deal-card/
├── deal-card.tsx
├── deal-card.test.tsx
└── deal-card.stories.tsx
```

---

## `@hobbydeals/ui-native`

Mobile-only component library. Uses React Native primitives (`View`, `Text`,
`Pressable`) with NativeWind v5 for styling. Consumed by `apps/mobile/`.
Shares design tokens with `@hobbydeals/ui` via `packages/config/tailwind/theme.css`.

### Components

| Component              | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `DealCard`             | Deal card with visual temperature, price, discount, and votes       |
| `CategoryBadge`        | Badge with icon and hobby color                                     |
| `VoteButton`           | Hot/cold button with animation and optimistic state                 |
| `TemperatureIndicator` | Visual heat scale for the deal (cold → hot)                         |
| `PriceDisplay`         | Current price + original strikethrough + % discount                 |
| `UserAvatar`           | Avatar with image or initials fallback                              |
| `SearchBar`            | Mobile search bar                                                   |
| `EmptyState`           | Illustrated empty state with message and optional action            |
| `Toast` / `Alert`      | Temporary notifications and error messages                          |

### Testing

- **Unit/integration**: Jest (`jest-expo` preset) + `@testing-library/react-native`. Tests co-locate with components (`*.test.tsx`).
- **Visual**: Storybook (`@storybook/react-native` for on-device development) + `@storybook/addon-react-native-web` for Chromatic (renders RN components in browser via `react-native-web`). Stories co-locate with components (`*.stories.tsx`).

---

## `@hobbydeals/core`

Shared business logic between web and mobile: data hooks, utilities,
TypeScript types, and validation schemas.

### Hooks (`src/hooks/`)

| Hook                | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `useDeals(filters)` | Paginated feed with infinite scroll and filters by category, temperature, price |
| `useDeal(id)`       | Deal detail with Realtime subscription for live temperature                    |
| `useVote()`         | Vote hot/cold with optimistic update and error rollback                        |
| `useAuth()`         | Active session, full profile, and role helpers                                 |
| `useAlerts()`       | CRUD for alerts by keyword, category, and max price                            |

### Utilities (`src/utils/`)

| Function                        | Description                                                              |
| ------------------------------- | ------------------------------------------------------------------------ |
| `formatPrice(amount, currency)` | Formats prices with i18n (ES locale by default)                          |
| `getTemperatureLabel(n)`        | Returns label by temperature: cold / warm / hot / burning                |
| `timeAgo(date)`                 | Relative date in Spanish: "hace 3 horas", "ayer"...                      |

### Validations (`src/validations/`)

Zod schemas defined once and used in both apps:

- `dealSchema` — publish or edit a deal
- `registerSchema` — user registration
- `alertSchema` — create or modify an alert
- `profileSchema` — edit profile

### Types (`src/types/`)

Global domain TypeScript types: `Deal`, `Profile`, `Category`, `Vote`,
`Alert`, `Comment`, `Notification`. Complemented by auto-generated types
in `@hobbydeals/supabase`.

### API (`src/api/`)

Typed and reusable Supabase queries, no UI logic. Each function receives
the Supabase client as a parameter to be compatible with SSR (server client)
and client-side (browser client).

---

## `@hobbydeals/config`

Shared toolchain configurations. No app or package defines its own ESLint,
TypeScript, or Tailwind rules from scratch — they always extend from here.

### ESLint (`eslint/`)

| Config                       | Extends                                   |
| ---------------------------- | ----------------------------------------- |
| `eslint-config-base`         | Common rules for the entire monorepo      |
| `eslint-config-next`         | Base + Next.js specific rules             |
| `eslint-config-react-native` | Base + React Native specific rules        |

### TypeScript (`typescript/`)

| Config              | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `base.json`         | Strict TypeScript (`strict: true`, `noUncheckedIndexedAccess`)   |
| `next.json`         | Extends base with Next.js paths and plugins                      |
| `react-native.json` | Extends base with React Native and Expo types                    |

### Tailwind (`tailwind/`)

| File        | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| `theme.css` | Shared design tokens (CSS vars + Tailwind v4 `@theme`). Single source of truth for both web (Tailwind CSS) and mobile (NativeWind v5). Each app imports it via `@import "@hobbydeals/config/tailwind/theme.css"` and overrides fonts locally |

---

## `@hobbydeals/supabase`

Supabase client factory and generated types. Centralizes connection
configuration so each app uses the correct client for its context.

### Clients (`src/client.ts`)

| Function                | Usage                                        |
| ----------------------- | -------------------------------------------- |
| `createBrowserClient()` | Next.js client components (`"use client"`)   |
| `createServerClient()`  | React Server Components and API routes       |
| `createMobileClient()`  | React Native with `AsyncStorage` as storage  |

### Types (`src/types.ts`)

Auto-generated with:

```bash
supabase gen types typescript --local > packages/supabase/src/types.ts
```

Exports `Database`, `Tables<T>`, and `Enums<T>` for typed access to the entire
database. Regenerate after each migration.
