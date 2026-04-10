import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

/**
 * Theme constants mirroring CSS variables from @hobbydeals/config/tailwind/theme.css.
 * Keep in sync with theme.css :root and .dark selectors.
 */
export const THEME = {
  light: {
    background: "#f5f4f0",
    foreground: "#111111",
    card: "#f9f8f5",
    cardForeground: "#111111",
    popover: "#ffffff",
    popoverForeground: "#111111",
    primary: "#8ab830",
    primaryForeground: "#ffffff",
    secondary: "#c4872a",
    secondaryForeground: "#111111",
    muted: "#f5f5f5",
    mutedForeground: "#6b6b6b",
    accent: "#edecea",
    accentForeground: "#111111",
    destructive: "#f4e0e0",
    destructiveForeground: "#e05048",
    border: "#d0d0d0",
    input: "#e5e5e5",
    ring: "#c45b3c",
  },
  dark: {
    background: "#0a0a0b",
    foreground: "#f5f5f5",
    card: "#2e2e34",
    cardForeground: "#f5f5f5",
    popover: "#161618",
    popoverForeground: "#f5f5f5",
    primary: "#a0d040",
    primaryForeground: "#0d0d0d",
    secondary: "#d4872a",
    secondaryForeground: "#f5f5f5",
    muted: "#3a3a40",
    mutedForeground: "#8c8c8c",
    accent: "#46464e",
    accentForeground: "#f5f5f5",
    destructive: "#2e1a1a",
    destructiveForeground: "#e05048",
    border: "#787882",
    input: "#50505a",
    ring: "#e86b40",
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
