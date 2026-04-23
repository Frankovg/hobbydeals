import type { LucideIcon } from "lucide-react-native";
import type { ComponentType } from "react";

// Web override for Storybook/Vite. The `lucide-react-native` → `lucide-react`
// alias in .storybook/main.ts replaces the icon implementation with DOM SVGs
// that accept Tailwind `className` directly. Wrapping them with nativewind's
// `styled()` (as the native build does) intercepts the className and prevents
// Tailwind classes from reaching the <svg>, so icons render without color or
// size. Returning the icon as-is lets className flow through.
export function iconWithClassName(
  icon: LucideIcon
): ComponentType<{ className?: string; size?: number; color?: string }> {
  return icon as unknown as ComponentType<{
    className?: string;
    size?: number;
    color?: string;
  }>;
}
