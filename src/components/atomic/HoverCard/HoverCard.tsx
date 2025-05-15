"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";

import styles from "./HoverCard.module.css";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ align = "center", sideOffset = 4, ...props }, ref) => (
	<HoverCardPrimitive.Content
		ref={ref}
		align={align}
		sideOffset={sideOffset}
		className={styles.HoverCardContent}
		{...props}
	/>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

/**
 * ## HoverCard
 *
 * The `HoverCard` component is a wrapper around [Radix UI's HoverCard](https://www.radix-ui.com/primitives/docs/components/hover-card),
 * providing a customizable, accessible hover-triggered card UI. It includes a trigger and content component, with scoped styling.
 *
 * ### Components
 *
 * - **HoverCard**: The root wrapper for the hover card interaction.
 * - **HoverCardTrigger**: The element that triggers the card on hover.
 * - **HoverCardContent**: The content area that appears when the trigger is hovered. This is a styled, forwarded component.
 *
 * ### HoverCardContent Props
 *
 * Inherits all props from `@radix-ui/react-hover-card`'s `HoverCard.Content`, with additional defaults and styling:
 *
 * - **align** (string, optional): Controls the alignment of the content relative to the trigger.
 *   Defaults to `"center"`.
 * - **sideOffset** (number, optional): The offset in pixels from the trigger.
 *   Defaults to `4`.
 * - **className** (string, optional): Custom class name for styling.
 *   Automatically includes scoped styles from `HoverCard.module.css`.
 *
 * ### Styling
 *
 * - The component uses CSS Modules for styling (`HoverCard.module.css`), applied specifically to `HoverCardContent`.
 *
 * ### Example Usage
 *
 * ```tsx
 * import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/atomic/HoverCard/HoverCard";
 *
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <button>Hover me</button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <div>More details shown on hover</div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
