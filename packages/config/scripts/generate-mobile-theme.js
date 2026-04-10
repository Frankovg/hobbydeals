/**
 * Reads packages/config/tailwind/theme.css (source of truth)
 * and generates apps/mobile/lib/theme.ts with resolved color values.
 *
 * Run:  node packages/config/scripts/generate-mobile-theme.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../..");
const CSS_PATH = path.join(ROOT, "packages/config/tailwind/theme.css");
const OUT_PATH = path.join(ROOT, "apps/mobile/lib/theme.ts");

// Shadcn token names we need for the mobile theme
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
];

function parseCssBlock(css, selector) {
  // Match the block for the given selector (e.g. ":root" or ".dark")
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escaped}\\s*\\{([^}]+(?:\\{[^}]*\\}[^}]*)*)\\}`, "gs");

  // Simpler approach: find selector, then grab everything until the matching closing brace
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
  const vars = {};

  for (const line of block.split("\n")) {
    const match = line.match(/^\s*--([\w-]+)\s*:\s*(.+?)\s*;/);
    if (match) {
      vars[`--${match[1]}`] = match[2];
    }
  }

  return vars;
}

function resolveVar(value, vars, depth = 0) {
  if (depth > 10) return value; // prevent infinite loops
  const varMatch = value.match(/^var\((--[\w-]+)\)$/);
  if (varMatch) {
    const resolved = vars[varMatch[1]];
    if (resolved) return resolveVar(resolved, vars, depth + 1);
  }
  return value;
}

function toCamelCase(cssName) {
  // "card-foreground" → "cardForeground"
  return cssName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function buildThemeObject(vars) {
  const theme = {};
  for (const key of SHADCN_KEYS) {
    const cssVar = `--${key}`;
    const raw = vars[cssVar];
    if (!raw) {
      console.warn(`  Warning: ${cssVar} not found in CSS block`);
      continue;
    }
    const resolved = resolveVar(raw, vars);
    theme[toCamelCase(key)] = resolved;
  }
  return theme;
}

function formatObject(obj, indent = 4) {
  const pad = " ".repeat(indent);
  const lines = Object.entries(obj).map(([k, v]) => `${pad}${k}: "${v}",`);
  return lines.join("\n");
}

// --- Main ---
const css = fs.readFileSync(CSS_PATH, "utf-8");

const lightVars = parseCssBlock(css, ":root");
const darkVars = parseCssBlock(css, ".dark");

const lightTheme = buildThemeObject(lightVars);
const darkTheme = buildThemeObject(darkVars);

const output = `// AUTO-GENERATED — do not edit manually.
// Source of truth: packages/config/tailwind/theme.css
// Regenerate:      node packages/config/scripts/generate-mobile-theme.js

import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

export const THEME = {
  light: {
${formatObject(lightTheme)}
  },
  dark: {
${formatObject(darkTheme)}
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

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, output, "utf-8");
console.log(`Generated ${path.relative(ROOT, OUT_PATH)}`);
