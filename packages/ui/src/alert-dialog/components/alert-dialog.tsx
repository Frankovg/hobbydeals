"use client"

import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
import * as React from "react"

import { Button } from "../../button"
import { cn } from "../../lib/utils"

type AlertDialogSize = "sm" | "default"

function AlertDialogRoot({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/30 duration-100 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: AlertDialogSize
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-3 rounded-md bg-card p-4 text-foreground shadow-lg ring-1 ring-border-light/60 outline-none duration-100",
          "data-[size=sm]:max-w-xs data-[size=default]:max-w-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "flex flex-col gap-1 text-left has-data-[slot=alert-dialog-media]:flex-row has-data-[slot=alert-dialog-media]:items-start has-data-[slot=alert-dialog-media]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogHeaderText({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header-text"
      className={cn("flex flex-1 flex-col gap-1", className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-bg-elevated *:[svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-display text-body font-semibold leading-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-xs leading-relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-2 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

const ACTION_BUTTON_CLASSES =
  "h-auto rounded-md px-3 py-1.5 text-xs font-semibold"
const CANCEL_BUTTON_CLASSES =
  "h-auto rounded-md border-border-default px-3 py-1.5 text-xs font-medium"
const DESTRUCTIVE_OVERRIDE_CLASSES =
  "bg-error text-text-inverse hover:bg-error/90"

function AlertDialogAction({
  className,
  variant = "default",
  size = "sm",
  tone = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size"> & {
    tone?: "default" | "destructive"
  }) {
  const toneClasses = tone === "destructive" ? DESTRUCTIVE_OVERRIDE_CLASSES : ""
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        data-tone={tone}
        className={cn(ACTION_BUTTON_CLASSES, toneClasses, className)}
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(CANCEL_BUTTON_CLASSES, className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogHeaderText,
  AlertDialogFooter,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
export type { AlertDialogSize }
