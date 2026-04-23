import * as Slot from "@rn-primitives/slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Bookmark,
  Crosshair,
  Dice5,
  Flame,
  Gamepad2,
  Music,
  Puzzle,
  Snowflake,
  Sun,
  Thermometer,
} from "lucide-react-native";
import * as React from "react";
import { Platform, View } from "react-native";

import { iconWithClassName } from "../lib/icons";
import { cn } from "../lib/utils";
import { TextClassContext } from "../text/text";

const variantIcons = {
  burning: iconWithClassName(Flame),
  hot: iconWithClassName(Thermometer),
  warm: iconWithClassName(Sun),
  cold: iconWithClassName(Snowflake),
  "board-games": iconWithClassName(Dice5),
  gaming: iconWithClassName(Gamepad2),
  collectibles: iconWithClassName(Bookmark),
  airsoft: iconWithClassName(Crosshair),
  music: iconWithClassName(Music),
  modeling: iconWithClassName(Puzzle),
} as const;

const iconClassByVariant: Record<keyof typeof variantIcons, string> = {
  burning: "size-3.5 shrink-0 text-temp-burning",
  hot: "size-3.5 shrink-0 text-temp-hot",
  warm: "size-3.5 shrink-0 text-temp-warm",
  cold: "size-3.5 shrink-0 text-temp-cold",
  "board-games": "size-3.5 shrink-0 text-cat-boardgames",
  gaming: "size-3.5 shrink-0 text-cat-gaming",
  collectibles: "size-3.5 shrink-0 text-cat-collectibles",
  airsoft: "size-3.5 shrink-0 text-cat-airsoft",
  music: "size-3.5 shrink-0 text-cat-music",
  modeling: "size-3.5 shrink-0 text-cat-modeling",
};

const badgeVariants = cva(
  cn(
    "shrink-0 flex-row items-center gap-1 rounded-sm px-2.5 py-1",
    Platform.select({
      web: "inline-flex whitespace-nowrap transition-colors",
    })
  ),
  {
    variants: {
      variant: {
        default: "bg-success-bg",
        secondary: "bg-warning-bg",
        destructive: "bg-error-bg",
        outline: "border border-border-default bg-transparent",
        burning: "bg-temp-burning/[0.08] dark:bg-temp-burning/[0.13]",
        hot: "bg-temp-hot/[0.08] dark:bg-temp-hot/[0.13]",
        warm: "bg-temp-warm/[0.08] dark:bg-temp-warm/[0.13]",
        cold: "bg-temp-cold/[0.08] dark:bg-temp-cold/[0.13]",
        discount: "rounded-full bg-brand py-[3px]",
        "board-games": "border border-cat-boardgames bg-transparent",
        gaming: "border border-cat-gaming bg-transparent",
        collectibles: "border border-cat-collectibles bg-transparent",
        airsoft: "border border-cat-airsoft bg-transparent",
        music: "border border-cat-music bg-transparent",
        modeling: "border border-cat-modeling bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const badgeTextVariants = cva("text-[11px] font-semibold", {
  variants: {
    variant: {
      default: "text-success",
      secondary: "text-warning",
      destructive: "text-error",
      outline: "text-text-primary",
      burning: "text-temp-burning",
      hot: "text-temp-hot",
      warm: "text-temp-warm",
      cold: "text-temp-cold",
      discount: "text-white",
      "board-games": "text-cat-boardgames",
      gaming: "text-cat-gaming",
      collectibles: "text-cat-collectibles",
      airsoft: "text-cat-airsoft",
      music: "text-cat-music",
      modeling: "text-cat-modeling",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BadgeProps = React.ComponentProps<typeof View> & {
  asChild?: boolean;
} & VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant,
  asChild,
  children,
  ...props
}: BadgeProps) {
  const Component = asChild ? Slot.View : View;
  const Icon =
    variant && variant in variantIcons
      ? variantIcons[variant as keyof typeof variantIcons]
      : undefined;
  const iconClass =
    variant && variant in iconClassByVariant
      ? iconClassByVariant[variant as keyof typeof iconClassByVariant]
      : undefined;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {Icon && iconClass ? <Icon className={iconClass} /> : null}
        {children}
      </Component>
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
