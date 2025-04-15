"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import styles from "./switch.module.css"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ ...props }, ref) => (
  <SwitchPrimitives.Root
    className={styles.Switch}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={styles.SwitchThumb}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export default Switch;


/**
 * # Switch Component
 * 
 * The `Switch` component is a toggle control that allows users to switch between two states, such as "on" and "off."
 * It is built using Radix UI's Switch primitive and supports accessibility and customization.
 * 
 * ## Props
 * 
 * - **checked** (boolean, optional): Controls the current state of the switch.
 *   If `true`, the switch is turned on; otherwise, it is off.
 * 
 * - **onCheckedChange** (function, optional): A callback function triggered when the switch state changes.
 *   It receives the new state (`true` or `false`) as a parameter.
 * 
 * - **disabled** (boolean, optional): If `true`, the switch will be disabled and non-interactive.
 * 
 * - **defaultChecked** (boolean, optional): Sets the initial state of the switch when uncontrolled.
 * 
 * ## Component Behavior
 * 
 * - The **`checked`** state can be controlled externally or left uncontrolled using `defaultChecked`.
 * - If **`disabled`** is `true`, the switch will be inactive and visually styled as disabled.
 * - The **`onCheckedChange`** callback updates when the switch is toggled.
 */