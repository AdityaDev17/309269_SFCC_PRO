"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import styles from "./Popover.module.css";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = "center", sideOffset = 4, ...props }, ref) => (
  <>
    <PopoverPrimitive.Portal>
     <div className={styles.PopoverOverlay} >
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={styles.PopoverContent}
        {...props}
      />
      </div>
    </PopoverPrimitive.Portal>
  </>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

/**
 * # Popover Component
 *
 * A styled, accessible wrapper around Radix UI's `@radix-ui/react-popover`.
 * Provides `Popover`, `PopoverTrigger`, and `PopoverContent` for building customizable popovers.
 *
 * ## Components
 *
 * ### Popover
 * - The root component that manages the popover state.
 * - Wraps both `PopoverTrigger` and `PopoverContent`.
 *
 * #### Example:
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Popover content</PopoverContent>
 * </Popover>
 * ```
 *
 * ### PopoverTrigger
 * - The trigger element that opens the popover on click or focus.
 * - Typically wraps a button or icon.
 * - Inherits all standard Radix `Trigger` props.
 *
 * ### PopoverContent
 * - The floating content that appears when the popover is active.
 * - Rendered inside a portal for positioning and accessibility.
 * - Styled using `Popover.module.css`.
 *
 * #### Props:
 * - **align?** (`"start" | "center" | "end"`): Horizontal alignment of content relative to the trigger. Defaults to `"center"`.
 * - **sideOffset?** (`number`): Space between the trigger and content. Defaults to `4`.
 * - Accepts all standard Radix `Content` props.
 * - Includes an overlay container (`.PopoverOverlay`) for custom background/blur effects.
 *
 * ## Example Usage
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>
 *     <button>Open Popover</button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>This is a custom popover!</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */

