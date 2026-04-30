import * as React from "react"

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbRoot,
  BreadcrumbSeparator,
} from "./components"

export interface BreadcrumbItemData {
  label: string
  href?: string
}

export interface BreadcrumbProps
  extends Omit<React.ComponentProps<typeof BreadcrumbRoot>, "children"> {
  items: BreadcrumbItemData[]
}

function Breadcrumb({ items, ...rest }: BreadcrumbProps) {
  const lastIndex = items.length - 1

  return (
    <BreadcrumbRoot {...rest}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === lastIndex
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <span>{item.label}</span>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator /> : null}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}

export { Breadcrumb }
