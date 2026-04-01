/// <reference types="react-native-css/types" />
import { cva, type VariantProps } from "class-variance-authority";
import { styled } from "nativewind";
import { Platform, Pressable as RNPressable } from "react-native";

import { cn } from "./lib/utils";
import { TextClassContext } from "./text";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StyledPressable = styled(RNPressable as any);

const buttonVariants = cva(
  cn(
    "group shrink-0 flex-row items-center justify-center gap-2 rounded-md",
    Platform.select({
      web: "whitespace-nowrap outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-brand-primary active:opacity-90",
          Platform.select({ web: "hover:opacity-90" })
        ),
        secondary: cn(
          "bg-brand-secondary active:opacity-90",
          Platform.select({ web: "hover:opacity-90" })
        ),
        destructive: cn(
          "bg-error-bg active:opacity-80",
          Platform.select({ web: "hover:opacity-80" })
        ),
        outline: cn(
          "border border-border-default bg-transparent active:bg-bg-subtle",
          Platform.select({ web: "hover:bg-bg-subtle" })
        ),
        ghost: cn(
          "active:bg-bg-subtle",
          Platform.select({ web: "hover:bg-bg-subtle" })
        ),
      },
      size: {
        default: "px-6 py-3",
        sm: "px-3 py-1.5",
        lg: "px-8 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  cn(
    "text-body font-semibold",
    Platform.select({ web: "pointer-events-none transition-colors" })
  ),
  {
    variants: {
      variant: {
        default: "text-text-inverse",
        secondary: "text-text-inverse",
        destructive: "text-error",
        outline: "text-text-primary",
        ghost: "text-text-secondary font-medium",
      },
      size: {
        default: "",
        sm: "text-badge",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<typeof RNPressable> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <StyledPressable
        className={cn(
          props.disabled && "opacity-50",
          buttonVariants({ variant, size }),
          className
        )}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
