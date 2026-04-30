"use client"

import * as React from "react"

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogHeaderText,
  AlertDialogMedia,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  type AlertDialogSize,
} from "./components"

export interface AlertDialogProps {
  title: React.ReactNode
  description?: React.ReactNode
  trigger?: React.ReactNode
  media?: React.ReactNode
  actionLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void
  tone?: "default" | "destructive"
  size?: AlertDialogSize
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function AlertDialog({
  title,
  description,
  trigger,
  media,
  actionLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onAction,
  onCancel,
  tone = "default",
  size = "sm",
  open,
  defaultOpen,
  onOpenChange,
  children,
}: AlertDialogProps) {
  return (
    <AlertDialogRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger ? (
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      ) : null}
      <AlertDialogContent size={size}>
        {children ?? (
          <>
            <AlertDialogHeader>
              {media ? <AlertDialogMedia>{media}</AlertDialogMedia> : null}
              <AlertDialogHeaderText>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                {description ? (
                  <AlertDialogDescription>{description}</AlertDialogDescription>
                ) : null}
              </AlertDialogHeaderText>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {cancelLabel !== null ? (
                <AlertDialogCancel onClick={onCancel}>
                  {cancelLabel}
                </AlertDialogCancel>
              ) : null}
              {actionLabel !== null ? (
                <AlertDialogAction tone={tone} onClick={onAction}>
                  {actionLabel}
                </AlertDialogAction>
              ) : null}
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}

export { AlertDialog }

export {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogHeaderText,
  AlertDialogMedia,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components"
export type { AlertDialogSize } from "./components"
