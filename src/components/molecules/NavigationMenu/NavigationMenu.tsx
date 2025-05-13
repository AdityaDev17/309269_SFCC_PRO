import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import styles from "./NavigationMenu.module.css";

const NavigationMenu = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ children, ...props }, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={styles.NavigationMenu}
		{...props}
	>
		{children}
		<NavigationMenuViewport />
	</NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ ...props }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={styles.NavigationMenuList}
		{...props}
	/>
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

// https://ui.shadcn.com/docs/components/navigation-menu
// to use with a next-link
//   <NavigationMenuItem >
//   <Link href="/docs" legacyBehavior passHref>
//     <NavigationMenuLink className="next-link">
//       Documentation
//     </NavigationMenuLink>
//   </Link>
// </NavigationMenuItem>
const NavigationMenuTrigger = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ children, ...props }, ref) => (
	<NavigationMenuPrimitive.Trigger
		ref={ref}
		className={styles.NavigationMenuTrigger}
		{...props}
	>
		{children}{" "}
		{/* <ChevronDown
      className={styles.NavigationMenuTriggerChevronDown}
      aria-hidden="true"
    /> */}
	</NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ ...props }, ref) => (
	<NavigationMenuPrimitive.Content
		ref={ref}
		className={styles.NavigationMenuContent}
		{...props}
	/>
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ ...props }, ref) => (
	<div className={styles.NavigationMenuViewportDiv}>
		<NavigationMenuPrimitive.Viewport
			className={styles.NavigationMenuViewport}
			ref={ref}
			{...props}
		/>
	</div>
));
NavigationMenuViewport.displayName =
	NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ ...props }, ref) => (
	<NavigationMenuPrimitive.Indicator
		ref={ref}
		className={styles.NavigationMenuIndicator}
		{...props}
	>
		<div className={styles.NavigationMenuIndicatorDiv} />
	</NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
	NavigationMenuPrimitive.Indicator.displayName;

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
};

/**
 * ## NavigationMenu
 *
 * The `NavigationMenu` component is a set of styled primitives built on top of `@radix-ui/react-navigation-menu` for building accessible and customizable navigation menus in React applications. It includes several subcomponents to structure your navigation, including items, triggers, content areas, indicators, and more.
 *
 * ### Components
 *
 * - **NavigationMenu**: Root component that wraps the entire navigation menu.
 * - **NavigationMenuList**: Container that holds one or more `NavigationMenuItem` components.
 * - **NavigationMenuItem**: Represents a single item in the navigation menu.
 * - **NavigationMenuTrigger**: A trigger button that opens a dropdown when clicked.
 * - **NavigationMenuContent**: The dropdown content associated with a trigger.
 * - **NavigationMenuLink**: Link used inside menu items, works with client-side routing libraries like Next.js.
 * - **NavigationMenuViewport**: Renders the viewport area where content is displayed.
 * - **NavigationMenuIndicator**: Shows a visual indicator below the active trigger.
 *
 * ### Props
 *
 * - **NavigationMenu**
 *   - Inherits all props from `@radix-ui/react-navigation-menu.Root`.
 *   - `ref`: Forwarded to the underlying Root element.
 *   - `className` (string): Custom CSS class to style the root container.
 *
 * - **NavigationMenuList**
 *   - Inherits all props from `@radix-ui/react-navigation-menu.List`.
 *   - `ref`: Forwarded to the underlying List element.
 *   - `className` (string): Styles the list of navigation items.
 *
 * - **NavigationMenuItem**
 *   - Direct export from `@radix-ui/react-navigation-menu.Item`.
 *   - Accepts children like `NavigationMenuTrigger` and `NavigationMenuContent`.
 *
 * - **NavigationMenuTrigger**
 *   - Inherits all props from `@radix-ui/react-navigation-menu.Trigger`.
 *   - `ref`: Forwarded to the underlying Trigger element.
 *   - `className` (string): Styles the trigger button.
 *   - `children`: Content inside the trigger, usually text or icon.
 *
 * - **NavigationMenuContent**
 *   - Inherits all props from `@radix-ui/react-navigation-menu.Content`.
 *   - `ref`: Forwarded to the underlying Content element.
 *   - `className` (string): Styles the dropdown content area.
 *
 * - **NavigationMenuLink**
 *   - Direct export from `@radix-ui/react-navigation-menu.Link`.
 *   - Works with Next.js `Link` or regular anchor tags.
 *
 * - **NavigationMenuViewport**
 *   - Inherits all props from `@radix-ui/react-navigation-menu.Viewport`.
 *   - `ref`: Forwarded to the underlying Viewport element.
 *   - `className` (string): Styles the outer and inner viewport divs.
 *
 * - **NavigationMenuIndicator**
 *   - Inherits all props from `@radix-ui/react-navigation-menu.Indicator`.
 *   - `ref`: Forwarded to the underlying Indicator element.
 *   - `className` (string): Styles the indicator and its wrapper div.
 *
 * ### Component Behavior
 *
 * - Fully accessible and keyboard-navigable as per Radix UI standards.
 * - Menu items can trigger content dropdowns using `NavigationMenuTrigger`.
 * - Viewport handles animation and display of dropdown content.
 * - Indicator highlights the currently active trigger visually.
 * - Supports integration with client-side routing (e.g., Next.js `Link`).
 */
