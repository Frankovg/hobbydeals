import * as React from "react"

import { cn } from "../lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-border bg-card px-20 py-3 text-sm text-foreground",
        "transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-text-tertiary focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/20 dark:bg-card dark:disabled:bg-muted dark:aria-invalid:border-error dark:aria-invalid:ring-error/30",
        className
      )}
      {...props}
    />
  )
}

export { Input }
