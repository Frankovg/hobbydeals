"use client"

import * as React from "react"

import {
  AvatarBadge,
  AvatarFallback,
  AvatarGroupCount,
  AvatarGroupRoot,
  AvatarImage,
  AvatarRoot,
  type AvatarSize,
} from "./components"

export interface AvatarProps
  extends Omit<React.ComponentProps<typeof AvatarRoot>, "children"> {
  fallback: string
  src?: string
  alt?: string
  badge?: boolean
}

function Avatar({
  fallback,
  src,
  alt,
  badge = false,
  size = "default",
  ...rest
}: AvatarProps) {
  return (
    <AvatarRoot size={size} {...rest}>
      {src ? <AvatarImage src={src} alt={alt ?? ""} /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
      {badge ? <AvatarBadge /> : null}
    </AvatarRoot>
  )
}

export interface AvatarGroupItem {
  fallback: string
  src?: string
  alt?: string
}

export interface AvatarGroupProps
  extends Omit<React.ComponentProps<typeof AvatarGroupRoot>, "children"> {
  avatars: AvatarGroupItem[]
  max?: number
  size?: AvatarSize
}

function AvatarGroup({
  avatars,
  max,
  size = "default",
  ...rest
}: AvatarGroupProps) {
  const visible = max != null ? avatars.slice(0, max) : avatars
  const overflow = max != null ? Math.max(avatars.length - max, 0) : 0

  return (
    <AvatarGroupRoot {...rest}>
      {visible.map((item, index) => (
        <Avatar
          key={index}
          fallback={item.fallback}
          src={item.src}
          alt={item.alt}
          size={size}
        />
      ))}
      {overflow > 0 ? <AvatarGroupCount>+{overflow}</AvatarGroupCount> : null}
    </AvatarGroupRoot>
  )
}

export { Avatar, AvatarGroup }
