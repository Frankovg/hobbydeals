# Shared Packages

All packages live in `packages/` and are consumed by `apps/web` and/or
`apps/mobile`. No package imports from `apps/`.

---

## `@hobbydeals/ui`

Web-only component library. Uses `className` with Tailwind CSS on standard HTML
elements (Next.js compatible). Mobile has its own package `@hobbydeals/ui-native`.
Both platforms share design tokens via `packages/config/tailwind/theme.css`.

### File layout

One directory per component. The package only exposes the directory entry —
`exports` map is `"./*": "./src/*/index.tsx"`, so consumers import as
`@hobbydeals/ui/<component>`.

```
src/<component>/
├── index.tsx                    # public API (exported)
├── <component>.stories.tsx      # Storybook + addon-vitest test target
└── components/                  # optional — primitives, only when split
    ├── <component>.tsx          # Root / Image / Fallback / ... primitives
    └── index.ts
```

When a component has multiple primitives (e.g. Radix-backed `Avatar`,
`AlertDialog`, `Alert`), they live in `components/` and `index.tsx` exposes a
higher-level convenience API on top of them. Stories always import from `.`.

### Components

Generic UI primitives shipped so far:

| Component                     | Notes                                                              |
| ----------------------------- | ------------------------------------------------------------------ |
| `Button`                      | CVA variants (default, destructive, outline, secondary, ghost, link) + sizes |
| `Badge`                       | Variants for temperature, category, discount                       |
| `Input`, `Textarea`           | Form fields aligned to the design system                           |
| `SelectNative`                | Native `<select>` styled to match `Input`                          |
| `InputGroup`                  | Composable input + addon slots                                     |
| `Item`, `Separator`, `Card`   | Layout primitives                                                  |
| `Avatar`, `AvatarGroup`       | Radix-backed; `fallback` + optional `src` / `badge` props          |
| `Alert`                       | Variants: success / destructive / warning / info, automatic icon mapping |
| `AlertDialog`                 | Radix-backed modal confirmation primitives                         |

Domain components on top of these primitives are planned: `DealCard`,
`CategoryBadge`, `VoteButton`, `TemperatureIndicator`, `PriceDisplay`,
`UserAvatar`, `SearchBar`, `EmptyState`, `Toast`.

### Theme

Design tokens (temperature colors, category palette, typography, spacing) are
defined in `@hobbydeals/config/tailwind/theme.css` and imported via CSS.
Both `@hobbydeals/ui` (web) and `@hobbydeals/ui-native` (mobile) share the
same token file — no JS preset needed (Tailwind v4 CSS-first approach).

### Testing

- **Component**: Vitest with `@storybook/addon-vitest` runs every `*.stories.tsx`
  as a component test in Playwright Chromium. No separate `*.test.tsx` is added
  for behavior already covered by stories.
- **Visual**: Storybook (`@storybook/react-vite`) + Chromatic for visual regression.

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

| Function                                | Description                                                              |
| --------------------------------------- | ------------------------------------------------------------------------ |
| `formatPrice(amount, currency)`         | Formats prices with i18n (ES locale by default)                          |
| `getTemperatureLabel(n)`                | Returns label by temperature: cold / warm / hot / burning                |
| `getTemperatureColor(n)`                | Returns the matching color token for a temperature                       |
| `timeAgo(date)`                         | Relative date in Spanish: "hace 3 horas", "ayer"...                      |
| `getInitials(firstName?, lastName?)`    | Uppercased initials, trims whitespace, preserves diacritics              |

Utility tests live in `src/utils/test/*.test.ts` and run with Jest via
`@hobbydeals/jest-config/base` (`pnpm --filter @hobbydeals/core test`).

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

Shared Tailwind theme + the script that derives the mobile theme artifacts.
Toolchain configs (ESLint, TypeScript, Jest) live in their own packages, see
below.

### Tailwind (`tailwind/`)

| File        | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| `theme.css` | Shared design tokens (CSS vars + Tailwind v4 `@theme`). Single source of truth for both web (Tailwind CSS) and mobile (NativeWind v5). Each app imports it via `@import "@hobbydeals/config/tailwind/theme.css"` and overrides fonts locally |

### Scripts (`scripts/`)

| File                         | Description                                                                                                                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generate-mobile-theme.ts`   | Reads `tailwind/theme.css` and emits the two files mobile needs: `apps/mobile/lib/theme.ts` (`THEME` + `NAV_THEME` for React Navigation) and `apps/mobile/theme-system.css` (flattened `--color-*` tokens). Run with `pnpm theme:generate` from the repo root. |

Why two outputs:

- **React Navigation** expects a plain JS `Theme` object with resolved HEX values (it cannot read CSS variables), so the script resolves the shadcn-style tokens (`--background`, `--foreground`, `--primary`, `--border`, etc.) chain for both light and `.dark` blocks and writes them as camelCase keys in `THEME.light` / `THEME.dark`, then builds `NAV_THEME.light` / `NAV_THEME.dark` extending `DefaultTheme` / `DarkTheme`.
- **NativeWind v5** runtime does not traverse multi-level `var()` indirection in `theme.css`, so the script flattens every `--color-*` entry from the `@theme` block to final HEX and emits them in `:root` and inside `@media (prefers-color-scheme: dark) { :root { ... } }`. This makes NativeWind switch color scheme automatically on system appearance change, without any JS wiring.

Both output files are auto-generated and marked as such — do not edit manually, edit `tailwind/theme.css` and re-run `pnpm theme:generate`.

Mobile wires the generated CSS via `apps/mobile/global.css`:

```css
@import "@hobbydeals/config/tailwind/theme.css";
@import "./theme-system.css";
```

The root-level script lives in `package.json` as `"theme:generate": "tsx packages/config/scripts/generate-mobile-theme.ts"` and uses `tsx` + `@types/node` as root devDependencies.

---

## `@hobbydeals/eslint-config`

Flat-config ESLint presets used by every workspace. No package defines its own
rules from scratch — they always extend from here.

| Config             | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `./base`           | Common rules: TypeScript, imports, react-hooks, turbo, prettier compatibility   |
| `./next-js`        | Base + `@next/eslint-plugin-next`                                                |
| `./react-internal` | Base + React rules for shared component packages (also handles `.cjs` files)    |

Consumers add it via `devDependencies` and reference it from `eslint.config.js`.

---

## `@hobbydeals/typescript-config`

Strict TypeScript configurations. Every `tsconfig.json` in the monorepo extends
one of these — never define `compilerOptions` from scratch.

| Config                  | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `base.json`             | Strict baseline (`strict`, `noUncheckedIndexedAccess`, etc.)               |
| `library.json`          | Defaults for shared TS packages                                             |
| `react-library.json`    | Library + React JSX                                                         |
| `nextjs.json`           | Next.js App Router defaults                                                 |
| `tests-react.json`      | `react-library` + `jest`, `node`, `@testing-library/jest-dom` types         |

---

## `@hobbydeals/jest-config`

Shared Jest presets (CommonJS — Jest config files are `.cjs`). Apps and
`@hobbydeals/core` consume these instead of redefining a Jest config.

| Preset    | Description                                                                                  |
| --------- | -------------------------------------------------------------------------------------------- |
| `./base`  | `ts-jest` preset, Node environment, matches `src/**/*.test.{ts,tsx}`                          |
| `./react` | Extends `base` with `jest-environment-jsdom` + `@testing-library/jest-dom` setup              |

Usage in a package:

```js
// jest.config.cjs
module.exports = require("@hobbydeals/jest-config/base");
```

`@hobbydeals/core` is the first consumer; web and core hooks tests will move to
this preset as Jest coverage grows.

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
