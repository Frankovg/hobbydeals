/**
 * Reads packages/config/tailwind/theme.css (source of truth) and generates:
 *
 *  - apps/mobile/lib/theme.ts      → THEME + NAV_THEME objects (React Navigation)
 *  - apps/mobile/theme-system.css  → flattened --color-* tokens in :root + @media
 *                                    (prefers-color-scheme: dark) so NativeWind
 *                                    auto-switches on system appearance change
 *
 * Run:  pnpm theme:generate
 */

import * as fs from "node:fs";
import * as path from "node:path";

type CssVars = Record<string, string>;
type ThemeObject = Record<string, string>;

const ROOT = path.resolve(__dirname, "../../..");
const CSS_PATH = path.join(ROOT, "packages/config/tailwind/theme.css");
const OUT_TS_PATH = path.join(ROOT, "apps/mobile/lib/theme.ts");
const OUT_CSS_PATH = path.join(ROOT, "apps/mobile/theme-system.css");

const SHADCN_KEYS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
] as const;

function parseCssBlock(css: string, selector: string): CssVars {
  const startIdx = css.indexOf(`${selector} {`);
  if (startIdx === -1) return {};

  let depth = 0;
  let blockStart = -1;
  let blockEnd = -1;

  for (let i = startIdx; i < css.length; i++) {
    if (css[i] === "{") {
      if (depth === 0) blockStart = i + 1;
      depth++;
    } else if (css[i] === "}") {
      depth--;
      if (depth === 0) {
        blockEnd = i;
        break;
      }
    }
  }

  if (blockStart === -1 || blockEnd === -1) return {};

  const block = css.slice(blockStart, blockEnd);
  const vars: CssVars = {};

  for (const line of block.split("\n")) {
    const match = line.match(/^\s*--([\w-]+)\s*:\s*(.+?)\s*;/);
    if (match) {
      vars[`--${match[1]}`] = match[2];
    }
  }

  return vars;
}

function resolveVar(value: string, vars: CssVars, depth = 0): string {
  if (depth > 10) return value;
  const varMatch = value.match(/^var\((--[\w-]+)\)$/);
  if (varMatch) {
    const resolved = vars[varMatch[1]];
    if (resolved) return resolveVar(resolved, vars, depth + 1);
  }
  return value;
}

function toCamelCase(cssName: string): string {
  return cssName.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function buildShadcnTheme(vars: CssVars): ThemeObject {
  const theme: ThemeObject = {};
  for (const key of SHADCN_KEYS) {
    const cssVar = `--${key}`;
    const raw = vars[cssVar];
    if (!raw) {
      console.warn(`  Warning: ${cssVar} not found in CSS block`);
      continue;
    }
    theme[toCamelCase(key)] = resolveVar(raw, vars);
  }
  return theme;
}

function resolveColorTokens(rawVars: CssVars, themeVars: CssVars): CssVars {
  // For each --color-* entry in @theme, resolve its var() chain against rawVars
  const colorEntries = Object.entries(themeVars).filter(([name]) =>
    name.startsWith("--color-"),
  );
  const lookup = { ...rawVars, ...themeVars };
  return Object.fromEntries(
    colorEntries.map(([name, value]) => [name, resolveVar(value, lookup)]),
  );
}

// --- Parse source ---
const css = fs.readFileSync(CSS_PATH, "utf-8");
const lightVars = parseCssBlock(css, ":root");
const darkVars = parseCssBlock(css, ".dark");
const themeVars = parseCssBlock(css, "@theme");

const lightTheme = buildShadcnTheme(lightVars);
const darkTheme = buildShadcnTheme(darkVars);
const lightColorTokens = resolveColorTokens(lightVars, themeVars);
const darkColorTokens = resolveColorTokens({ ...lightVars, ...darkVars }, themeVars);

// --- TS output: THEME + NAV_THEME for React Navigation ---
function formatThemeEntries(obj: ThemeObject, indent = 4): string {
  const pad = " ".repeat(indent);
  return Object.entries(obj)
    .map(([k, v]) => `${pad}${k}: "${v}",`)
    .join("\n");
}

const tsOutput = `// AUTO-GENERATED — do not edit manually.
// Source of truth: packages/config/tailwind/theme.css
// Regenerate:      pnpm theme:generate

import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

export const THEME = {
  light: {
${formatThemeEntries(lightTheme)}
  },
  dark: {
${formatThemeEntries(darkTheme)}
  },
};

export const NAV_THEME: { light: Theme; dark: Theme } = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructiveForeground,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructiveForeground,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
`;

fs.mkdirSync(path.dirname(OUT_TS_PATH), { recursive: true });
fs.writeFileSync(OUT_TS_PATH, tsOutput, "utf-8");
console.log(`Generated ${path.relative(ROOT, OUT_TS_PATH)}`);

// --- CSS output: flattened --color-* for NativeWind runtime ---
// NativeWind's runtime doesn't traverse deep var() chains, so we emit the final
// --color-* tokens as HEX directly in :root (light) and inside @media
// (prefers-color-scheme: dark), bypassing the multi-level indirection in theme.css.
function formatCssLines(vars: CssVars, indent: number): string {
  const pad = " ".repeat(indent);
  return Object.entries(vars)
    .map(([name, value]) => `${pad}${name}: ${value};`)
    .join("\n");
}

const cssOutput = `/* AUTO-GENERATED — do not edit manually.
 * Source of truth: packages/config/tailwind/theme.css
 * Regenerate:      pnpm theme:generate
 *
 * Flattens the --color-* tokens from the @theme block (resolved against :root for
 * light, merged :root+.dark for dark) and emits them directly. NativeWind picks up
 * the @media query and switches automatically on system appearance change.
 */

:root {
${formatCssLines(lightColorTokens, 2)}
}

@media (prefers-color-scheme: dark) {
  :root {
${formatCssLines(darkColorTokens, 4)}
  }
}
`;

fs.mkdirSync(path.dirname(OUT_CSS_PATH), { recursive: true });
fs.writeFileSync(OUT_CSS_PATH, cssOutput, "utf-8");
console.log(`Generated ${path.relative(ROOT, OUT_CSS_PATH)}`);
