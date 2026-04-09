# Testing Strategy

HobbyDeals uses a layered testing approach: unit and integration tests for
correctness, visual regression for UI consistency, and end-to-end tests for
critical user flows.

## Testing pyramid

```
         ┌─────────┐
         │   E2E   │  Playwright (web) + Maestro (mobile)
        ─┼─────────┼─
        │  Visual   │  Storybook + Chromatic (ui + ui-native)
       ─┼───────────┼─
       │ Unit/Integ  │  Jest + Testing Library (all packages)
       └─────────────┘
```

## Tools by layer

| Layer              | Web                                  | Mobile                                                  | Shared packages          |
| ------------------ | ------------------------------------ | ------------------------------------------------------- | ------------------------ |
| Unit / integration | Jest + `@testing-library/react`      | Jest + `@testing-library/react-native`                  | Jest + Testing Library   |
| Visual regression  | Storybook + Chromatic                | Storybook (RN) + `react-native-web` + Chromatic         | —                        |
| E2E                | Playwright                           | Maestro                                                 | —                        |

---

## Unit & integration tests

### Setup per package

| Package                  | Preset       | Test library                       |
| ------------------------ | ------------ | ---------------------------------- |
| `@hobbydeals/ui`         | `ts-jest`    | `@testing-library/react`           |
| `@hobbydeals/ui-native`  | `jest-expo`  | `@testing-library/react-native`    |
| `@hobbydeals/core`       | `ts-jest`    | `@testing-library/react` (hooks)   |

### File conventions

Tests co-locate with the source file they cover:

```
packages/ui/src/deal-card/
├── deal-card.tsx
├── deal-card.test.tsx
└── deal-card.stories.tsx
```

```
packages/ui-native/src/deal-card/
├── deal-card.tsx
├── deal-card.test.tsx
└── deal-card.stories.tsx
```

### What to test

- **Components**: rendering, props, interactions (press, input), conditional
  states (loading, error, empty), accessibility labels.
- **Hooks** (`@hobbydeals/core`): return values, state transitions, error
  handling. Use `renderHook` from Testing Library.
- **Utils** (`@hobbydeals/core`): pure functions with straightforward
  input/output assertions.
- **Validations**: Zod schemas with valid and invalid payloads.

### Running tests

```bash
turbo test                          # all packages
turbo test --filter=@hobbydeals/ui  # single package
```

---

## Visual testing — Storybook + Chromatic

Both UI packages have their own Storybook instance for component development
and Chromatic for automated visual regression on every PR.

### `@hobbydeals/ui` (web)

- Framework: `@storybook/react` + `@storybook/nextjs`
- Config: `packages/ui/.storybook/`
- Stories use standard HTML rendering in Chromium

### `@hobbydeals/ui-native` (mobile)

- On-device development: `@storybook/react-native` (renders in simulator)
- Chromatic / browser: `@storybook/addon-react-native-web` renders RN components
  via `react-native-web` so Chromatic can capture browser screenshots
- Config: `packages/ui-native/.storybook/`

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

# Chromatic (CI — requires CHROMATIC_PROJECT_TOKEN)
cd packages/ui && pnpm chromatic
cd packages/ui-native && pnpm chromatic
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

| Step                  | Trigger     | What runs                                               |
| --------------------- | ----------- | ------------------------------------------------------- |
| Unit / integration    | Every push  | `turbo test` across all packages                        |
| Storybook + Chromatic | Every PR    | Visual diff for `@hobbydeals/ui` and `@hobbydeals/ui-native` |
| Playwright E2E        | Every PR    | Critical web flows against local Supabase               |
| Maestro E2E           | Every PR    | Critical mobile flows against Expo dev build            |
