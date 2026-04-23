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
} from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";

const variantIcons = {
  burning: Flame,
  hot: Thermometer,
  warm: Sun,
  cold: Snowflake,
  "board-games": Dice5,
  gaming: Gamepad2,
  collectibles: Bookmark,
  airsoft: Crosshair,
  music: Music,
  modeling: Puzzle,
} as const;

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-[11px] font-semibold transition-colors [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-success-bg text-success",
        secondary:
          "bg-warning-bg text-warning",
        destructive:
          "bg-error-bg text-error",
        outline:
          "border border-border-default bg-transparent text-text-primary",
        burning:
          "bg-temp-burning/[0.08] text-temp-burning dark:bg-temp-burning/[0.13]",
        hot:
          "bg-temp-hot/[0.08] text-temp-hot dark:bg-temp-hot/[0.13]",
        warm:
          "bg-temp-warm/[0.08] text-temp-warm dark:bg-temp-warm/[0.13]",
        cold:
          "bg-temp-cold/[0.08] text-temp-cold dark:bg-temp-cold/[0.13]",
        discount:
          "rounded-full bg-brand text-white py-[3px]",
        "board-games":
          "border border-cat-boardgames text-cat-boardgames",
        gaming:
          "border border-cat-gaming text-cat-gaming",
        collectibles:
          "border border-cat-collectibles text-cat-collectibles",
        airsoft:
          "border border-cat-airsoft text-cat-airsoft",
        music:
          "border border-cat-music text-cat-music",
        modeling:
          "border border-cat-modeling text-cat-modeling",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    const Icon = variant ? variantIcons[variant as keyof typeof variantIcons] : undefined;
    return (
      <div
        className={cn(badgeVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {Icon && <Icon className="size-3.5" />}
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
