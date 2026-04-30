import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-y-0.5 rounded-md border border-border-subtle bg-card py-3.5 pr-2.5 pl-[23px] text-left text-text-primary has-data-[slot=alert-action]:pr-14 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-(--alert-accent) *:[svg:not([class*='size-'])]:size-4 before:pointer-events-none before:absolute before:left-2.5 before:top-3.5 before:bottom-3.5 before:w-[3px] before:rounded-[2px] before:bg-(--alert-accent) before:content-['']",
  {
    variants: {
      variant: {
        default: "[--alert-accent:var(--text-primary)]",
        success: "[--alert-accent:var(--success)]",
        destructive: "[--alert-accent:var(--error)]",
        warning: "[--alert-accent:var(--warning)]",
        info: "[--alert-accent:var(--info)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertRootProps = React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants>

function AlertRoot({ className, variant, ...props }: AlertRootProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "text-[12px] font-semibold leading-tight text-(--alert-accent) group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-[11px] leading-tight text-text-secondary group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-text-primary [&_p:not(:last-child)]:mb-2",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-2.5", className)}
      {...props}
    />
  )
}

export {
  AlertRoot,
  AlertTitle,
  AlertDescription,
  AlertAction,
  alertVariants,
}
export type { AlertRootProps }
