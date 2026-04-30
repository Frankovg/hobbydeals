# Testing Strategy

HobbyDeals uses a layered testing approach: unit and integration tests for
correctness, visual regression for UI consistency, and end-to-end tests for
critical user flows.

## Testing pyramid

```
         ┌─────────┐
         │   E2E   │  Playwright (web) + Maestro (mobile)
        ─┼─────────┼─
        │  Visual   │  Storybook + Chromatic (ui only)
       ─┼───────────┼─
       │ Component  │  Vitest + addon-vitest (ui + ui-native)
      ─┼────────────┼─
      │ Unit/Integ   │  Jest + Testing Library (apps + core)
      └──────────────┘
```

## Tools by layer

| Layer              | UI packages (`ui`, `ui-native`)                         | Apps (`web`, `mobile`)                                  | Shared packages (`core`) |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------ |
| Component tests    | Vitest + `@storybook/addon-vitest` (stories as tests)   | —                                                       | —                        |
| Unit / integration | —                                                       | Jest + Testing Library                                  | Jest + Testing Library   |
| Visual regression  | Storybook + Chromatic (`ui` only)                       | —                                                       | —                        |
| Accessibility      | `@storybook/addon-a11y` (axe-core)                      | —                                                       | —                        |
| E2E                | —                                                       | Playwright (web) / Maestro (mobile)                     | —                        |

---

## Component tests — Vitest + addon-vitest (UI packages)

UI packages (`@hobbydeals/ui` and `@hobbydeals/ui-native`) use Vitest with
`@storybook/addon-vitest` to run stories as component tests in a real browser
(Playwright Chromium, headless). Stories double as tests — no separate
`.test.tsx` files needed for component behavior covered by stories.

### Setup per UI package

| Package                  | Test runner                    | Browser             | A11y                     |
| ------------------------ | ------------------------------ | ------------------- | ------------------------ |
| `@hobbydeals/ui`         | `vitest --project=storybook`   | Playwright Chromium | `@storybook/addon-a11y`  |
| `@hobbydeals/ui-native`  | `vitest --project=storybook`   | Playwright Chromium | `@storybook/addon-a11y`  |

### File conventions

Stories co-locate with the component they cover:

```
packages/ui/src/deal-card/
├── deal-card.tsx
├── deal-card.stories.tsx    # doubles as component test
└── index.ts
```

### Running component tests

```bash
pnpm --filter @hobbydeals/ui test-storybook          # run all story tests
pnpm --filter @hobbydeals/ui-native test-storybook    # run all story tests (native)
```

---

## Unit & integration tests — Jest (apps + core)

Apps and `@hobbydeals/core` use Jest + Testing Library for unit and integration
tests covering business logic, hooks, and screens.

### Setup per package

| Package                  | Preset                                       | Test library                       |
| ------------------------ | -------------------------------------------- | ---------------------------------- |
| `apps/web`               | `@hobbydeals/jest-config/react` (`ts-jest` + jsdom) | `@testing-library/react`           |
| `apps/mobile`            | `jest-expo`                                  | `@testing-library/react-native`    |
| `@hobbydeals/core`       | `@hobbydeals/jest-config/base` (`ts-jest`, Node env) | `@testing-library/react` (hooks)   |

Each consumer just re-exports the shared preset from `jest.config.cjs`:

```js
// packages/core/jest.config.cjs
module.exports = require("@hobbydeals/jest-config/base");
```

Tests for `@hobbydeals/core` utils live in `src/<area>/test/*.test.ts` (e.g.
`src/utils/test/get-initials.test.ts`).

### What to test

- **Hooks** (`@hobbydeals/core`): return values, state transitions, error
  handling. Use `renderHook` from Testing Library.
- **Utils** (`@hobbydeals/core`): pure functions with straightforward
  input/output assertions.
- **Validations**: Zod schemas with valid and invalid payloads.
- **Screens/pages** (apps): rendering, navigation, data loading states.

### Running tests

```bash
turbo test                            # all packages
turbo test --filter=@hobbydeals/core  # single package
```

---

## Visual testing — Storybook (+ Chromatic for web only)

Both UI packages have their own Storybook instance for component development.
Chromatic runs visual regression **only on `@hobbydeals/ui`** (web).

`@hobbydeals/ui-native` does **not** use Chromatic: Storybook renders native
components via `react-native-web`, which is a web translation of RN primitives
and doesn't match the pixel output of real iOS/Android. Running visual
regression on the web rendering would give false signal. The plan is to add
Maestro + screenshot diff against real simulators once mobile flows stabilize.

### `@hobbydeals/ui` (web)

- Framework: `@storybook/react-vite`
- Config: `packages/ui/.storybook/`
- Addons: `@storybook/addon-a11y`, `@storybook/addon-vitest`
- Viewports: mobile (390px), tablet (768px), desktop (1280px), wide (1536px)
- Visual regression: Chromatic on every PR

### `@hobbydeals/ui-native` (mobile)

- Framework: `@storybook/react-vite` + `react-native-web` alias
- Config: `packages/ui-native/.storybook/`
- Addons: `@storybook/addon-a11y`, `@storybook/addon-vitest`
- Viewports: iPhone SE (375px), iPhone 14 (390px), iPhone 14 Pro Max (430px), Android (360px)
- Visual regression: none yet (see note above)

### Story conventions

- One story file per component, co-located (`*.stories.tsx`)
- Export a `Default` story plus one story per meaningful variant (loading,
  error, empty, temperature states, etc.)
- Use `args` for interactive controls in Storybook UI

### Running Storybook

```bash
# Web
cd packages/ui && pnpm storybook

# Mobile (on-device)
cd packages/ui-native && pnpm storybook

# Chromatic — web only (CI — requires CHROMATIC_PROJECT_TOKEN)
cd packages/ui && pnpm chromatic
```

---

## E2E tests — Playwright (web)

Playwright tests cover critical web user flows running against a local dev
server with seeded Supabase data.

### Location

```
apps/web/e2e/
├── auth.spec.ts            # login, register, logout
├── deals.spec.ts           # feed, filters, detail, publish
├── voting.spec.ts          # hot/cold votes, temperature update
├── search.spec.ts          # full-text search, filters
├── profile.spec.ts         # user panel, alerts, settings
└── admin.spec.ts           # moderation, user management
```

### Automation

Playwright tests can be generated and maintained with the Playwright MCP
integration in Claude Code. This enables:

- Automated test creation from user flow descriptions
- Interactive debugging and test updates
- Visual verification of test steps

### Running

```bash
cd apps/web && pnpm e2e                 # run all
cd apps/web && pnpm e2e auth.spec.ts    # run single spec
```

---

## E2E tests — Maestro (mobile)

Maestro tests cover critical mobile user flows running against the Expo dev
build on a simulator or device.

### Location

```
apps/mobile/e2e/
├── auth.yaml               # onboarding, login, register
├── feed.yaml               # feed browsing, pull to refresh
├── voting.yaml             # hot/cold votes
├── search.yaml             # search, filters
├── deal-detail.yaml        # detail view, comments
└── profile.yaml            # user panel, settings
```

### Flow format

Maestro flows are declarative YAML files:

```yaml
appId: com.hobbydeals.app
---
- launchApp
- assertVisible: "Ofertas"
- tapOn: "Gaming"
- assertVisible: "PS5.*"
- scrollDown
- tapOn:
    id: "vote-hot"
- assertVisible:
    id: "temperature"
```

### Running

```bash
maestro test apps/mobile/e2e/            # run all flows
maestro test apps/mobile/e2e/auth.yaml   # run single flow
maestro studio                           # interactive flow builder
```

---

## CI integration

All test layers run in GitHub Actions:

| Step                  | Trigger     | What runs                                                     |
| --------------------- | ----------- | ------------------------------------------------------------- |
| Component tests       | Every push  | `vitest run --project=storybook` in `ui` and `ui-native`     |
| Unit / integration    | Every push  | `turbo test` across apps and core                             |
| Storybook + Chromatic | Every PR    | Visual diff for `@hobbydeals/ui` (web) only                   |
| Playwright E2E        | Every PR    | Critical web flows against local Supabase                     |
| Maestro E2E           | Every PR    | Critical mobile flows against Expo dev build                  |
