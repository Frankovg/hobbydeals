"use client"

import * as React from "react"

import { cn } from "../lib/utils"

import {
  SelectNativeOptGroup,
  SelectNativeOption,
  SelectNativeRoot,
} from "./components"

export interface SelectNativeOptionItem {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectNativeGroupItem {
  label: string
  options: SelectNativeOptionItem[]
}

export type SelectNativeItem = SelectNativeOptionItem | SelectNativeGroupItem

function isGroup(item: SelectNativeItem): item is SelectNativeGroupItem {
  return "options" in item
}

export interface SelectNativeProps
  extends Omit<React.ComponentProps<"select">, "children"> {
  options: SelectNativeItem[]
  placeholder?: string
  label?: string
  error?: string
  className?: string
}

function SelectNative({
  options,
  placeholder,
  label,
  error,
  className,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...selectProps
}: SelectNativeProps) {
  const generatedId = React.useId()
  const fieldId = id ?? generatedId
  const errorId = error ? `${fieldId}-error` : undefined

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          {label}
        </label>
      ) : null}
      <SelectNativeRoot
        id={fieldId}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={errorId ?? ariaDescribedBy}
        {...selectProps}
      >
        {placeholder ? (
          <SelectNativeOption value="" disabled>
            {placeholder}
          </SelectNativeOption>
        ) : null}
        {options.map((item, index) =>
          isGroup(item) ? (
            <SelectNativeOptGroup key={index} label={item.label}>
              {item.options.map((opt) => (
                <SelectNativeOption
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </SelectNativeOption>
              ))}
            </SelectNativeOptGroup>
          ) : (
            <SelectNativeOption
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </SelectNativeOption>
          )
        )}
      </SelectNativeRoot>
      {error ? (
        <p id={errorId} className="text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { SelectNative }
