import {
  CheckCircle2,
  Info,
  TriangleAlert,
  XCircle,
  type LucideIcon,
} from "lucide-react"
import * as React from "react"

import {
  AlertAction,
  AlertDescription,
  AlertRoot,
  AlertTitle,
} from "./components"

export type AlertVariant =
  | "default"
  | "success"
  | "destructive"
  | "warning"
  | "info"

const variantIcons: Record<AlertVariant, LucideIcon | null> = {
  default: null,
  success: CheckCircle2,
  destructive: XCircle,
  warning: TriangleAlert,
  info: Info,
}

export interface AlertProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  variant?: AlertVariant
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  /** Override the default icon. Pass `false` to hide it. */
  icon?: React.ReactNode | false
}

function Alert({
  variant = "default",
  title,
  description,
  action,
  icon,
  ...rest
}: AlertProps) {
  const DefaultIcon = variantIcons[variant]
  const renderedIcon =
    icon === false ? null : icon !== undefined ? icon : DefaultIcon ? <DefaultIcon /> : null

  return (
    <AlertRoot variant={variant} {...rest}>
      {renderedIcon}
      <AlertTitle>{title}</AlertTitle>
      {description ? <AlertDescription>{description}</AlertDescription> : null}
      {action ? <AlertAction>{action}</AlertAction> : null}
    </AlertRoot>
  )
}

export { Alert }
