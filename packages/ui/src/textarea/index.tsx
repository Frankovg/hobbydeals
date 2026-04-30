import * as React from "react"

import { cn } from "../lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-24 w-full min-w-0 rounded-md border border-border bg-card px-20 py-3 text-sm text-foreground",
        "transition-colors outline-none",
        "placeholder:text-text-tertiary focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/20 dark:bg-card dark:disabled:bg-muted dark:aria-invalid:border-error dark:aria-invalid:ring-error/30",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
