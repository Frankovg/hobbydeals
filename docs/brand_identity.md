# HobbyDeals — Brand Identity Manual

**Version**: 1.0
**Date**: March 2026
**Status**: Reference document for Pencil design system generation

---

## 1. Brand Philosophy

HobbyDeals is a vertical deals platform for hobby communities. It is built by enthusiasts, for enthusiasts. The platform does not perform excitement — it earns it.

The brand sits at the intersection of **tactical precision** and **community trust**. Like the hobbies it serves (wargaming, airsoft, modeling, collecting), HobbyDeals rewards patience, knowledge, and attention to detail. A good deal is a well-executed mission.

### Core Brand Values

| Value | Expression |
|-------|-----------|
| **Direct** | No fluff, no filler. Information is served clean. |
| **Earned** | Trust is built through curation, not volume. |
| **Tactical** | Every deal is an opportunity. The platform helps you act on it. |
| **Community-rooted** | The temperature system puts collective intelligence at the center. |

---

## 2. Brand Personality

**If HobbyDeals were a person**: A 32-year-old wargaming veteran who also builds 1:35 scale tanks. He knows every deal before it goes viral. He doesn't hype — he informs. He's been burned before and now he reads the fine print.

### Voice Attributes

- **Concise** — Sentences are short. No padding.
- **Knowledgeable** — Speaks the language of each hobby without condescension.
- **Dry wit** — Occasionally funny, never trying too hard.
- **Unapologetically niche** — Does not explain what "hot glue and sprues" means.
- **Honest** — Expired deals are marked immediately. No dark patterns.

### Tone by Context

| Context | Tone |
|---------|------|
| Deal card copy | Factual, precise, no superlatives |
| Empty states | Dry, brief, slightly sardonic |
| Error messages | Direct, never apologetic, always actionable |
| Push notifications | Abrupt in a good way — like a tap on the shoulder |
| Onboarding | Efficient, respects the user's time |

### Anti-patterns (what HobbyDeals is NOT)

- Not playful-cartoonish (no confetti, no bouncy animations)
- Not Amazon (not maximalist, not overwhelming)
- Not a startup trying to be your friend
- Not aggressive in a loud way — aggressive in a focused, no-BS way

---

## 3. Target Audience

**Primary**: Men aged 18–40, active in one or more hobby categories
**Secondary**: Men aged 40–55, experienced collectors and hobbyists with buying power
**Tertiary**: Women aged 20–35 interested in gaming or collecting

### Psychographic Profile

- Values their money — researches before buying
- Belongs to online hobby communities (Discord, Reddit, Facebook groups)
- Has been burned by bad deals before
- Follows category influencers
- Dislikes being marketed to; responds to peer validation
- Mobile-first, but also desktop during work hours for deal hunting

---

## 4. Color System

### Design Principles for Color

- Both themes are built on **black and white** as the dominant base — color is an accent, not a foundation
- Dark theme: blacks and near-blacks, white text. Light theme: whites and near-whites, black text.
- Brand, category, and semantic colors appear only as accents: CTAs, badges, indicators, states
- High contrast is mandatory: minimum 4.5:1 for text, 3:1 for UI elements (WCAG AA)
- Semantic colors carry meaning across themes and cannot be substituted

---

### 4.1 Brand Colors

#### Primary — Recon Green

```
HEX: #8AB830
RGB: 138, 184, 48
HSL: 79°, 59%, 45%
```

A saturated yellow-green that reads as **alive, charged, and purposeful**. Inspired by night-vision equipment, active camo variants, and the color of new growth after a field exercise. High contrast on dark surfaces. Used for CTAs, active states, highlights, temperature peak indicators, and brand presence.

**Usage**: Primary buttons, active nav items, deal temperature at maximum, price savings highlight, links.

---

#### Secondary — Brass

```
HEX: #C4872A
RGB: 196, 135, 42
HSL: 34°, 65%, 47%
```

A warm, oxidized copper-brass. References **military hardware, casings, aged metal, and quality gear**. Complements Recon Green without competing. Warmer and softer — used when the interface needs emphasis without urgency.

**Usage**: Secondary CTAs, category badges (accent), vote count highlights, featured deal ribbon, membership or reputation badges.

---

### 4.2 Neutral Scale — Dark Theme (Default)

| Token | HEX | Usage |
|-------|-----|-------|
| `bg-base` | `#0D0D0D` | Main app background |
| `bg-subtle` | `#141414` | Secondary screens, drawers |
| `bg-card` | `#1A1A1A` | Cards, panels, modals |
| `bg-elevated` | `#222222` | Floating elements, dropdowns |
| `border-subtle` | `#2A2A2A` | Card borders, dividers |
| `border-default` | `#383838` | Input borders, separators |
| `text-tertiary` | `#5C5C5C` | Placeholder text, disabled states |
| `text-secondary` | `#8C8C8C` | Labels, metadata, captions |
| `text-primary` | `#F5F5F5` | Body text, primary content |
| `text-inverse` | `#0D0D0D` | Text on brand-colored backgrounds |

---

### 4.3 Neutral Scale — Light Theme

The light theme uses **white and near-white grays** as its base. Clean, minimal, high contrast. Color accents (brand, category, semantic) do the heavy lifting.

| Token | HEX | Usage |
|-------|-----|-------|
| `bg-base` | `#FFFFFF` | Main app background |
| `bg-subtle` | `#F5F5F5` | Secondary screens, drawers |
| `bg-card` | `#FAFAFA` | Cards, panels, modals |
| `bg-elevated` | `#F0F0F0` | Floating elements, dropdowns |
| `border-subtle` | `#E5E5E5` | Card borders, dividers |
| `border-default` | `#D0D0D0` | Input borders, separators |
| `text-tertiary` | `#9E9E9E` | Placeholder text, disabled states |
| `text-secondary` | `#6B6B6B` | Labels, metadata, captions |
| `text-primary` | `#111111` | Body text, primary content |
| `text-inverse` | `#FFFFFF` | Text on brand-colored or dark backgrounds |

---

### 4.4 Semantic Colors

Semantic colors serve function, not decoration. They must remain immediately recognizable regardless of theme.

#### Success — Operative Green
```
HEX: #4CAF50 (light theme foreground) / #5EC562 (dark theme foreground)
Background light: #F0FBF0
Background dark: #0F1F0F
```
References: mission complete, item available, deal active. A green distinct from the brand Recon Green by being rounder and more universally understood.

**Usage**: Deal active status, form validation success, upvote confirmed, alert matched.

---

#### Warning — Amber Alert
```
HEX: #D4952A (same in both themes, adjusted contrast per theme)
Background light: #FDF8F0
Background dark: #1F150A
```
References: brass casing, fire, caution without panic. Same family as Secondary Brass but positioned as a signal.

**Usage**: Deal expiring soon, stock running low, pending moderation, unverified store.

---

#### Error — Red Zone
```
HEX: #CC3B30 (light theme) / #E05048 (dark theme)
Background light: #FDF0EF
Background dark: #200A08
```
Direct and legible. Not an orange-red (which reads as warning) — this is a cooler, more urgent red.

**Usage**: Form errors, deal expired, rejected submission, destructive action confirmation.

---

#### Info — Tactical Blue
```
HEX: #4A82C4 (light theme) / #5B95D9 (dark theme)
Background light: #F0F5FD
Background dark: #0A1220
```
Calm, informational, non-urgent. Military maps, technical diagrams, clear skies.

**Usage**: Tooltips, info banners, deal type "Kickstarter", new feature callouts.

---

### 4.5 Temperature Color Scale

The temperature system is a core visual element. The scale maps deal temperature (votes) to color:

| State | Label | HEX | Context |
|-------|-------|-----|---------|
| Cold | Frío | `#4A82C4` | Negative or low score |
| Neutral | Tibio | `#8A9490` | Around zero |
| Warm | Caliente | `#C4872A` | Positive score |
| Hot | En llamas | `#CC5500` | High positive score |
| Burning | Viral | `#8AB830` | Exceptional score — brand primary |

The scale transitions smoothly. At the highest temperature, the brand's primary color takes over — reinforcing that a viral deal is the platform's core value.

---

### 4.6 Category Colors

Category colors remain unchanged from product spec, but must be verified for contrast on dark backgrounds:

| Category | HEX | Dark theme adjusted |
|----------|-----|---------------------|
| Juegos de Mesa | `#7F77DD` | `#9B94E8` (lightened +15%) |
| Gaming | `#1D9E75` | `#28C491` (lightened +15%) |
| Coleccionismo | `#BA7517` | `#D4872A` (lightened +10%) |
| Airsoft | `#D85A30` | `#E86B40` (lightened +5%) |
| Música | `#D4537E` | `#E06490` (lightened +5%) |
| Modelismo | `#378ADD` | `#4A96EE` (lightened +5%) |

---

## 5. Typography

Two typefaces only. No exceptions.

### 5.1 Space Grotesk — Display & Headlines

**Source**: Google Fonts
**Character**: Geometric, slightly unconventional letter forms (especially the `a`, `G`, `R`). Wide enough to feel authoritative. Slightly industrial — closer to equipment labels than editorial fonts.
**Why**: Feels modern and opinionated without being decorative. Works at large sizes on dark backgrounds without disappearing. Has enough personality to be a brand asset.

```
Family: Space Grotesk
Weights used: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
Styles: Normal only (no italic)
```

| Role | Weight | Size (mobile) | Size (desktop) | Line Height |
|------|--------|---------------|----------------|-------------|
| Display | Bold 700 | — | 48px | 1.1 |
| H1 | Bold 700 | 28px | 36px | 1.15 |
| H2 | SemiBold 600 | 22px | 28px | 1.2 |
| H3 | SemiBold 600 | 18px | 22px | 1.25 |
| H4 | Medium 500 | 16px | 18px | 1.3 |
| Price (prominent) | Bold 700 | 20px | 24px | 1.1 |
| Badge/Label | SemiBold 600 | 11px | 12px | 1.0 |

Letter spacing: `−0.01em` for H1 and larger, `0` for H2–H4, `+0.04em` for BADGE/LABEL (all caps).

---

### 5.2 Inter — Body & UI

**Source**: Google Fonts
**Character**: Neutral, functional, invisible in the best sense. Optimized for screen legibility across all sizes. Industry standard for UI text.
**Why**: Does not compete with Space Grotesk. Where Space Grotesk declares, Inter informs. Together they create a clear visual hierarchy without using different fonts for the same level.

```
Family: Inter
Weights used: 400 (Regular), 500 (Medium), 600 (SemiBold)
Styles: Normal only (no italic)
```

| Role | Weight | Size (mobile) | Size (desktop) | Line Height |
|------|--------|---------------|----------------|-------------|
| Body Large | Regular 400 | 16px | 16px | 1.5 |
| Body | Regular 400 | 14px | 15px | 1.55 |
| Body Small | Regular 400 | 13px | 13px | 1.5 |
| UI Label | Medium 500 | 14px | 14px | 1.4 |
| Caption | Medium 500 | 12px | 12px | 1.4 |
| Overline | SemiBold 600 | 11px | 11px | 1.3 |
| Button | SemiBold 600 | 14px | 15px | 1.0 |
| Input | Regular 400 | 15px | 15px | 1.4 |

---

### Typography Rules

- **Space Grotesk** handles: page titles, deal titles, prices, section headers, CTAs
- **Inter** handles: descriptions, metadata, labels, body copy, input text, captions
- Never use italic — italics undermine the brand's directness
- All-caps reserved for badges, labels, and overlines — never for body text
- Letter-spacing on all-caps: minimum `+0.06em`
- Minimum text size: 11px (badge/caption). Nothing below.

---

## 6. Spacing & Layout

### Grid System

```
Base unit: 4px
Standard grid: 8px increments
Column grid (mobile): 4 columns, 16px gutter, 16px margin
Column grid (desktop): 12 columns, 24px gutter, 40px margin
```

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon-to-label, tight inline gaps |
| `space-2` | 8px | Component internal gaps |
| `space-3` | 12px | Between related elements |
| `space-4` | 16px | Card padding, section gaps |
| `space-5` | 24px | Between sections |
| `space-6` | 32px | Major section breaks |
| `space-8` | 48px | Page-level vertical rhythm |
| `space-10` | 64px | Hero/splash sections |

### Corner Radius

| Context | Radius |
|---------|--------|
| Small elements (badges, chips) | `6px` |
| Buttons | `8px` |
| Cards | `12px` |
| Modals, bottom sheets | `16px` |
| Avatar | `50%` (circle) |
| Full-bleed images in cards | inherits card radius at top |

### Shadows (Dark Theme)

Shadows are rarely needed in dark themes. When used:
```
Elevation 1 (cards): 0 1px 3px rgba(0,0,0,0.5)
Elevation 2 (modals): 0 8px 24px rgba(0,0,0,0.6)
Elevation 3 (tooltips): 0 4px 12px rgba(0,0,0,0.7)
```

### Shadows (Light Theme)

```
Elevation 1: 0 1px 3px rgba(0,0,0,0.08)
Elevation 2: 0 8px 24px rgba(0,0,0,0.12)
Elevation 3: 0 4px 12px rgba(0,0,0,0.16)
```

---

## 7. Layout Philosophy

### Less Amazon, More Wallapop

- **Information density**: Low to medium. One focal element per card. No cram.
- **Whitespace is content**: Empty space communicates quality and trust. Fill it with purpose.
- **Progressive disclosure**: Show the deal card. Let the user choose to expand.
- **No carousels on mobile**: Static feeds respect the user's scrolling intent.
- **Sidebar on desktop only**: Mobile is pure feed + bottom navigation.

### Content Hierarchy Per Screen

1. **Deal image** — visual anchor, always present
2. **Price + discount** — the primary value proposition
3. **Title** — precise, not truncated below 2 lines
4. **Temperature** — community validation signal
5. **Metadata** — category, store, date — tertiary, never dominant

### Touch Targets

- Minimum touch target: `44×44px`
- Vote buttons: `48×48px` (frequent action, needs comfort)
- Nav items: `full tab bar height × 1/5 width`

---

## 8. Iconography

**Set**: Lucide Icons
**Style**: Outlined, `stroke-width: 1.5px`
**Sizes**: 16px (inline), 20px (UI), 24px (navigation), 32px (feature callouts)

Icons do not use fill in the outlined variant. The brand relies on line weight and negative space, not solid shapes.

**Icon-to-label alignment**: Always vertically centered. Gap between icon and label: `space-2` (8px).

**Category icons**:

| Category | Icon |
|----------|------|
| Juegos de Mesa | `dice-5` |
| Gaming | `gamepad-2` |
| Coleccionismo | `bookmark` |
| Airsoft | `crosshair` |
| Música | `music` |
| Modelismo | `puzzle` |

---

## 9. Motion & Interaction

### Principles

- Motion is **functional**, not decorative
- No spring animations, no bounce, no confetti
- Transitions communicate state change, not personality

### Timing

| Type | Duration | Easing |
|------|----------|--------|
| Micro (opacity, color) | 100ms | `ease-out` |
| UI transitions (slide, expand) | 200ms | `ease-in-out` |
| Screen transitions (mobile) | 280ms | `ease-in-out` |
| Skeleton loading pulse | 1200ms | `ease-in-out` loop |

### Specific Patterns

- **Vote button**: Scale `1.0 → 1.15 → 1.0` on tap, 150ms, with color change
- **Temperature badge**: Color transition only, 300ms ease
- **Bottom sheet**: Slide up from bottom, 250ms ease-out
- **Toast notification**: Slide in from top, auto-dismiss at 3s, slide out 200ms
- No page transitions on web (instant route change, skeleton loading state)

---

## 10. Logo Principles

*(Artwork to be defined separately. These are brand constraints.)*

- **Wordmark**: "HobbyDeals" set in Space Grotesk Bold. "Hobby" in `text-primary`, "Deals" in Recon Green (`#8AB830`).
- **No icon-only logo** in V1 — wordmark only
- **Minimum size**: 80px wide (mobile), 120px wide (desktop)
- **Clearspace**: Equal to the cap-height of the "H" on all sides
- **On dark backgrounds**: Full wordmark as described above
- **On light backgrounds**: Same — the green "Deals" works on both themes
- **Never**: Stretched, rotated, gradient-filled, or placed on a colored badge

---

## 11. Do / Don't

### DO
- Use high contrast consistently — accessibility is non-negotiable
- Treat empty space as intentional design
- Let the community's temperature data be the hero of the deal card
- Use category colors consistently and only for category identification
- Keep copy concise — one clear action per screen
- Follow the two-typeface rule strictly

### DON'T
- Use brand or category colors as backgrounds — they are always accents only
- Use italic text
- Use more than two type sizes in a single card component
- Use decorative gradients on backgrounds (gradients only on temperature indicators)
- Add drop shadows to text
- Use the brand Recon Green for anything other than CTAs, active states, and temperature peak
- Use placeholder copy in designs — use realistic deal data from the defined categories

---

## 12. Accessibility Checklist

| Requirement | Standard | Status |
|-------------|----------|--------|
| Text contrast (normal) | 4.5:1 WCAG AA | Required |
| Text contrast (large, 18px+) | 3:1 WCAG AA | Required |
| UI element contrast (borders, icons) | 3:1 WCAG AA | Required |
| Touch target minimum | 44×44px | Required |
| Focus indicator | 2px solid `#8AB830` with 2px offset | Required |
| Color not sole indicator | Pair color with icon or label | Required |

---

## 13. Design Tokens Summary (for Pencil variables)

All variables follow the naming convention `$color--[token-name]`:

```
// Brand
$color--brand-primary: #8AB830
$color--brand-secondary: #C4872A

// Dark Theme Neutrals
$color--bg-base-dark: #0D0D0D
$color--bg-subtle-dark: #141414
$color--bg-card-dark: #1A1A1A
$color--bg-elevated-dark: #222222
$color--border-subtle-dark: #2A2A2A
$color--border-default-dark: #383838
$color--text-tertiary-dark: #5C5C5C
$color--text-secondary-dark: #8C8C8C
$color--text-primary-dark: #F5F5F5
$color--text-inverse-dark: #0D0D0D

// Light Theme Neutrals
$color--bg-base-light: #FFFFFF
$color--bg-subtle-light: #F5F5F5
$color--bg-card-light: #FAFAFA
$color--bg-elevated-light: #F0F0F0
$color--border-subtle-light: #E5E5E5
$color--border-default-light: #D0D0D0
$color--text-tertiary-light: #9E9E9E
$color--text-secondary-light: #6B6B6B
$color--text-primary-light: #111111
$color--text-inverse-light: #FFFFFF

// Semantic
$color--success: #5EC562
$color--warning: #D4952A
$color--error: #E05048
$color--info: #5B95D9

// Temperature
$color--temp-cold: #4A82C4
$color--temp-neutral: #8A9490
$color--temp-warm: #C4872A
$color--temp-hot: #CC5500
$color--temp-burning: #8AB830
```

---

*End of HobbyDeals Brand Identity Manual v1.0*
