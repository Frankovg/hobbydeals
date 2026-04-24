import { ChevronDownIcon } from "lucide-react"
import * as React from "react"

import { cn } from "../lib/utils"

function SelectNative({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div
      className={cn(
        "group/select-native relative w-full has-[select:disabled]:opacity-60",
        className
      )}
      data-slot="select-native-wrapper"
    >
      <select
        data-slot="select-native"
        className={cn(
          "h-11 w-full min-w-0 appearance-none [-webkit-appearance:none] [-moz-appearance:none] [background-image:none] [&::-ms-expand]:hidden rounded-md border border-border bg-card px-20 py-3 text-sm text-foreground",
          "transition-colors outline-none",
          "placeholder:text-text-tertiary focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
          "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/20 dark:bg-card dark:disabled:bg-muted dark:aria-invalid:border-error dark:aria-invalid:ring-error/30"
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-text-tertiary select-none"
        aria-hidden="true"
        data-slot="select-native-icon"
      />
    </div>
  )
}

function SelectNativeOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="select-native-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function SelectNativeOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="select-native-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { SelectNative, SelectNativeOptGroup, SelectNativeOption }
