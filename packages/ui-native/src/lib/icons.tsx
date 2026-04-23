import { styled } from "nativewind";

import type { LucideIcon } from "lucide-react-native";
import type { ComponentType } from "react";

/**
 * Wraps a Lucide icon so NativeWind className is forwarded to its style prop.
 * Usage: const StyledCheck = iconWithClassName(Check);
 */
export function iconWithClassName(icon: LucideIcon): ComponentType<{ className?: string; size?: number; color?: string }> {
  return styled(icon) as ComponentType<{ className?: string; size?: number; color?: string }>;
}
