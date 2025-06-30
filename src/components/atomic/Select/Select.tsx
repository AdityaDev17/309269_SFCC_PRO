/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import styles from "./Select.module.css";

const Select = ({
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>) => {
	const [open, setOpen] = React.useState(false);

	return (
		<SelectPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
			{React.Children.map(children, (child) =>
				React.isValidElement(child) && child.type === SelectTrigger
					? React.cloneElement(
							child as React.ReactElement<SelectTriggerProps>,
							{ isOpen: open },
						)
					: child,
			)}
		</SelectPrimitive.Root>
	);
};

const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
	variant?: "sort";
	isOpen?: boolean;
}

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	SelectTriggerProps
>(({ variant, isOpen, children, ...props }, ref) => {
	const triggerClass = `${styles.SelectTrigger} ${isOpen ? styles.SelectTriggerOpen : ""}`;

	if (variant === "sort") {
		return (
			<SelectPrimitive.Trigger
				ref={ref}
				className={`${styles[`SelectTrigger-${variant}`]} ${isOpen ? styles.SelectTriggerOpen : ""}`}
				{...props}
			>
				<span className={styles.Sort}>SORT</span>
				{children}
				<SelectPrimitive.Icon asChild>
					{isOpen ? (
						<ChevronUp
							style={{ width: "1rem", height: "1rem", opacity: "0.5" }}
						/>
					) : (
						<ChevronDown
							style={{ width: "1rem", height: "1rem", opacity: "0.5" }}
						/>
					)}
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
		);
	}

	return (
		<SelectPrimitive.Trigger ref={ref} className={triggerClass} {...props}>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDown
					style={{ width: "1rem", height: "1rem", opacity: "0.5" }}
				/>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
});

const SelectScrollUpButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ ...props }, ref) => (
	<SelectPrimitive.ScrollUpButton
		ref={ref}
		className={styles.SelectScrollUpButton}
		{...props}
	>
		<ChevronUp style={{ height: "1rem", width: "1rem" }} />
	</SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={styles.SelectScrollDownButton}
		{...props}
	>
		<ChevronDown className="h-4 w-4" />
	</SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
	SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = "popper", ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={`${styles.SelectContent} ${position === "popper" ? styles.SelectContentPopper : null}`}
			position={position}
			{...props}
		>
			<SelectScrollUpButton />
			<SelectPrimitive.Viewport
				className={`${styles.SelectPrimitiveViewport} ${position === "popper" ? styles.SelectPrimitiveViewportPopper : null}`}
			>
				{children}
			</SelectPrimitive.Viewport>
			<SelectScrollDownButton />
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ ...props }, ref) => (
	<SelectPrimitive.Label ref={ref} className={styles.SelectLabel} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
	<SelectPrimitive.Item ref={ref} className={styles.SelectItem} {...props}>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={styles.SelectSeparator}
		{...props}
	/>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
};

/**
 * ## Select
 *
 * A customizable and accessible dropdown select component built using Radix UI's `@radix-ui/react-select`.
 * This component suite includes the root Select, trigger, content display, scrolling buttons, and individual items.
 *
 * ### Main Component: Select
 *
 * - Wraps Radix's `SelectPrimitive.Root`, maintaining open/close state internally.
 * - Enhances functionality by passing the `isOpen` prop to a custom `SelectTrigger`.
 *
 * ### Props (Select)
 *
 * Inherits all props from `SelectPrimitive.Root`.
 *
 * - **children** (ReactNode): Should include `SelectTrigger`, `SelectContent`, etc.
 *
 * ### Subcomponents
 *
 * - **SelectTrigger**
 *   - Custom trigger component for opening the select dropdown.
 *   - Props:
 *     - **variant** (`'sort'`, optional): Adds a 'SORT' label and a specific layout.
 *     - **isOpen** (boolean, internal): Indicates the open state of the dropdown.
 *
 * - **SelectContent**
 *   - Wrapper around the dropdown content.
 *   - Props:
 *     - **position** (string): Controls dropdown positioning. Defaults to `'popper'`.
 *
 * - **SelectItem**
 *   - A selectable option inside the dropdown. Displays a check icon for the selected item.
 *
 * - **SelectScrollUpButton** / **SelectScrollDownButton**
 *   - Scroll controls for navigating through long lists.
 *
 * - **SelectGroup**, **SelectLabel**, **SelectValue**, **SelectSeparator**
 *   - Additional subcomponents provided for accessibility and grouping.
 *
 * ### Component Behavior
 *
 * - The `Select` component provides enhanced styling and behavior while keeping accessibility intact.
 * - Custom styling is handled via CSS Modules (`select.module.css`).
 * - Icons are conditionally rendered based on the open state.
 */
