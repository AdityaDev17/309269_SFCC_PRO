"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import styles from "./checkbox.module.css"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={styles.Checkbox}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={styles.CheckboxIndicator}
    >
      <Check
        style={{
          height: '0.875rem',
          width: '0.875rem',
        }}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export default Checkbox


/**
 * # Checkbox Component
 *
 * The `Checkbox` component is a styled wrapper around Radix UI's `CheckboxPrimitive.Root`,
 * used to render an accessible and customizable checkbox input.
 *
 * ## Props
 *
 * - Inherits all props from `@radix-ui/react-checkbox`'s `CheckboxPrimitive.Root`.
 *   Common props include:
 *   - **checked** (boolean): Whether the checkbox is checked.
 *   - **defaultChecked** (boolean): The initial checked state.
 *   - **onCheckedChange** (function): Callback fired when the checked state changes.
 *   - **disabled** (boolean): Disables the checkbox if set to `true`.
 *
 * ## Component Behavior
 *
 * - Renders a custom-styled checkbox using CSS modules from `checkbox.module.css`.
 * - Displays a checkmark icon (`Check` from `lucide-react`) when checked.
 * - Uses Radix’s `CheckboxPrimitive.Indicator` to manage the icon visibility based on state.
 * - Fully accessible and supports keyboard interactions.
 */
