import Image from "next/image";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./BreadcrumbsWrapper";

interface BreadcrumbItemType {
	label: string;
	href?: string;
}

interface BreadcrumbWrapperProps {
	breadcrumbItems: BreadcrumbItemType[];
	breadcrumbSeparator?: string; // only image link now
}

const Breadcrumbs: React.FC<BreadcrumbWrapperProps> = ({
	breadcrumbItems,
	breadcrumbSeparator = "/slash.svg", // default image path
}) => {
	const lastIndex = breadcrumbItems.length - 1;

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbItems.map((item, index) => (
					<React.Fragment key={item?.label}>
						<BreadcrumbItem>
							{index === lastIndex || !item.href ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < lastIndex && (
							<BreadcrumbSeparator>
								<Image
									src={breadcrumbSeparator}
									alt="separator"
									width={6}
									height={18}
								/>
							</BreadcrumbSeparator>
						)}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default Breadcrumbs;

/**
 * ## Breadcrumb
 *
 * A collection of accessible and composable breadcrumb navigation components used to indicate
 * the current page’s location within a navigational hierarchy.
 *
 *
 *
 * ### Breadcrumb
 * The root wrapper component that renders a `<nav>` element with `aria-label="breadcrumb"`.
 *
 * **Props:**
 * - Accepts all standard props for `<nav>`.
 * - Optional `separator` prop for custom implementations (not used directly in the base component).
 *
 *
 * ### BreadcrumbList
 * Renders the breadcrumb items inside an `<ol>` list.
 *
 * **Props:**
 * - Accepts all standard props for `<ol>`.
 * - Applies default breadcrumb list styling via `Breadcrumbs.module.css`.
 *
 *
 * ### BreadcrumbItem
 * Represents an individual breadcrumb item (`<li>`).
 *
 * **Props:**
 * - Accepts all standard props for `<li>`.
 * - Styled through `Breadcrumbs.module.css`.
 *
 *
 * ### BreadcrumbLink
 * A link component for a breadcrumb item.
 *
 * **Props:**
 * - Accepts all standard props for `<a>`.
 * - **asChild** (boolean, optional): If true, uses Radix UI's `Slot` to render the passed child component.
 * - Applies consistent breadcrumb link styles.
 *
 *
 * ### BreadcrumbPage
 * Used to indicate the current page in the breadcrumb trail.
 *
 * **Props:**
 * - Accepts all standard props for `<span>`.
 *
 *
 * ### BreadcrumbSeparator
 * Used between breadcrumb items to visually separate them.
 *
 * **Props:**
 * - Accepts all standard props for `<li>`.
 * - Defaults to a right-chevron icon (`<ChevronRight />`) if no children are passed.
 * - `aria-hidden` is applied for accessibility.
 *
 *
 * ### BreadcrumbEllipsis
 * Renders an ellipsis icon (three dots) when breadcrumb items are truncated.
 *
 * **Props:**
 * - Accepts all standard props for `<span>`.
 * - Includes screen reader support for accessibility.
 *
 * ### Wrapper Concept
 *
 * The **BreadcrumbWrapper** (`Breadcrumbs` component) serves as the main container and logic controller for rendering
 * the breadcrumb navigation. It accepts the `breadcrumbItems` array that consists of `label` and optional `href` values
 * for each breadcrumb item. The `breadcrumbSeparator` prop allows customization of the separator used between breadcrumb items,
 * defaulting to a path to an image (`/slash.svg`). This makes the `Breadcrumbs` component flexible and reusable in various
 * contexts while maintaining consistent structure and behavior for accessibility.
 *
 * The wrapper processes the list of items, dynamically rendering the appropriate breadcrumb item (link or page)
 * and separator between them. It uses the helper components (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`,
 * `BreadcrumbLink`, `BreadcrumbPage`, and `BreadcrumbSeparator`) for composing the overall structure, ensuring
 * separation of concerns and maintainability.
 *
 * ### Example Usage
 *
 * ```tsx
 * <Breadcrumbs breadcrumbItems={[
 *   { label: "Home", href: "/" },
 *   { label: "Products", href: "/products" },
 *   { label: "Headphones" }
 * ]} />
 * ```
 * This example renders a breadcrumb navigation for a path like:
 * Home → Products → Headphones (with "Headphones" being the current page).
 *
 */
