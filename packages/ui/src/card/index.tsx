import * as React from "react"

import { Button } from "../button"

import {
  Card as CardRoot,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardImagePlaceholder,
  CardTitle,
  type CardSize,
} from "./components"

export interface CardProps
  extends Omit<React.ComponentProps<"div">, "title" | "content"> {
  title: React.ReactNode
  description?: React.ReactNode
  /** Image URL. Falls back to a neutral placeholder when omitted. */
  image?: string
  imageAlt?: string
  /** When true and `image` is omitted, renders the placeholder block. */
  showImagePlaceholder?: boolean
  /** Extra content rendered between description and footer. */
  content?: React.ReactNode
  /** Custom footer node. Takes precedence over `actionLabel`. */
  footer?: React.ReactNode
  /** Quick action button shown in the footer. */
  actionLabel?: React.ReactNode
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void
  size?: CardSize
}

function Card({
  title,
  description,
  image,
  imageAlt,
  showImagePlaceholder = false,
  content,
  footer,
  actionLabel,
  onAction,
  size = "default",
  ...rest
}: CardProps) {
  const hasMedia = Boolean(image) || showImagePlaceholder
  const resolvedFooter =
    footer ??
    (actionLabel != null ? (
      <Button type="button" size="md" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null)

  return (
    <CardRoot size={size} {...rest}>
      {hasMedia ? (
        image ? (
          <CardImage src={image} alt={imageAlt ?? ""} />
        ) : (
          <CardImagePlaceholder />
        )
      ) : null}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      {content ? <CardContent>{content}</CardContent> : null}
      {resolvedFooter ? <CardFooter>{resolvedFooter}</CardFooter> : null}
    </CardRoot>
  )
}

export { Card }

export {
  Card as CardRoot,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardImagePlaceholder,
  CardTitle,
} from "./components"
export type { CardSize } from "./components"
