import * as React from "react"

import { cn } from "../../lib/utils"

type CardSize = "default" | "sm"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: CardSize }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col bg-card text-foreground rounded-md overflow-hidden",
        "gap-2.5 p-4 data-[size=sm]:gap-2 data-[size=sm]:p-3",
        className
      )}
      {...props}
    />
  )
}

function CardImage({
  className,
  ...props
}: React.ComponentProps<"img"> & { alt?: string }) {
  return (
    <img
      data-slot="card-image"
      className={cn(
        "w-full aspect-[4/3] rounded-sm bg-bg-elevated object-cover",
        className
      )}
      alt={props.alt ?? ""}
      {...props}
    />
  )
}

function CardImagePlaceholder({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-image-placeholder"
      aria-hidden="true"
      className={cn("w-full aspect-[4/3] rounded-sm bg-bg-elevated", className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-body text-sm font-semibold leading-tight text-foreground group-data-[size=sm]/card:text-[13px]",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-xs leading-snug text-text-secondary",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("text-xs text-text-secondary", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardImage,
  CardImagePlaceholder,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
export type { CardSize }
