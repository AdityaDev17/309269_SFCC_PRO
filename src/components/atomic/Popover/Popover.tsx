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
 * ## Popover
 *
 * A styled, accessible wrapper around Radix UI's `@radix-ui/react-popover`.
 * Provides `Popover`, `PopoverTrigger`, and `PopoverContent` for building customizable popovers.
 *
 *
 * ### Popover
 * The root component that manages popover state. Wrap this around your `PopoverTrigger` and `PopoverContent`.
 *
 * ###Example Usuage
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Popover content</PopoverContent>
 * </Popover>
 * ```
 *
 *
 * ### PopoverTrigger
 * The button or element that triggers the popover when clicked or focused.
 *
 * **Props:**
 * - Inherits all standard Radix `Trigger` props.
 * - Typically wraps a button or icon.
 * - Inherits all standard Radix `Trigger` props.
 *
 *
 * ### PopoverContent
 * The content that appears when the popover is open. Automatically rendered in a portal.
 *
 * **Props:**
 * - `align?: "start" | "center" | "end"` – Horizontal alignment of the content relative to the trigger. Defaults to `"center"`.
 * - `sideOffset?: number` – Offset distance between trigger and content. Defaults to `4`.
 * - Accepts all standard Radix `Content` props.
 * - Styled using `Popover.module.css`.
 *
 *
 * ### Example Usage
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

