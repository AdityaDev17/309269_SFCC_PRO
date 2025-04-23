"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import styles from './RadioGroup.module.css'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={styles.RadioGroup}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={styles.RadioGroupItem}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={styles.RadioGroupItemIndicator}>
        <Circle className={styles.Circle} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }


/**
 * ## RadioGroup
 *
 * A customizable and accessible radio button group built using Radix UI's `@radix-ui/react-radio-group`.
 * This component suite includes the main `RadioGroup` container and the individual `RadioGroupItem` elements.
 *
 * ### Main Component: RadioGroup
 *
 * - Wraps Radix's `RadioGroupPrimitive.Root` to provide a stylized radio group container.
 * - Applies custom styling through a CSS Module (`radioGroup.module.css`).
 * - Fully accessible and keyboard-navigable.
 *
 * ### Props (RadioGroup)
 *
 * Inherits all props from `RadioGroupPrimitive.Root`.
 *
 * - **value** (string): The current selected value.
 * - **onValueChange** (function): Callback when the selected value changes.
 * - **disabled** (boolean, optional): Disables the radio group.
 *
 * ### Subcomponent: RadioGroupItem
 *
 * - Wraps `RadioGroupPrimitive.Item` and displays a selectable radio option.
 * - Uses Radix's `Indicator` to show selection status with a `Circle` icon.
 * - Applies styling from `radioGroup.module.css`.
 *
 * ### Component Behavior
 *
 * - Ensures proper accessibility by handling keyboard interactions and selection indicators.
 * - The `Circle` icon appears inside the selected `RadioGroupItem`.
 * - Supports full customization and can be easily integrated with forms.
 */
