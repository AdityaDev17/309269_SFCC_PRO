import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import styles from './Breadcrumbs.module.css'

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ ...props }, ref) => (
  <ol
    ref={ref}
    className={styles.BreadcrumbList}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ ...props }, ref) => (
  <li
    ref={ref}
    className={styles.BreadcrumbItem}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={styles.BreadcrumbLink}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={styles.BreadcrumbPage}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={styles.BreadcrumbSeparator}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={styles.BreadcrumbEllipsis}
    {...props}
  >
    <MoreHorizontal style={{ height: '1rem', width: '1rem' }} />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

/**
 * 
 * ## Breadcrumbs
 *
 * A collection of accessible and composable breadcrumb navigation components.
 * Useful for indicating the current page’s location within a navigational hierarchy.
 *
 * 
 *
 * ### Breadcrumb
 * The root wrapper component that renders a `<nav>` element with `aria-label="breadcrumb"`.
 * 
 * **Props:**
 * - Accepts all standard props for `<nav>`.
 * - Optional `separator` prop (not used directly here but useful in custom implementations).
 *
 *
 * ### BreadcrumbList
 * Renders the breadcrumb items inside an `<ol>` list.
 *
 * **Props:**
 * - Accepts all standard props for `<ol>`.
 * - Applies default breadcrumb list styling from `Breadcrumbs.module.css`.
 *
 *
 * ### BreadcrumbItem
 * Represents an individual breadcrumb item (`<li>`).
 *
 * **Props:**
 * - Accepts all standard props for `<li>`.
 * - Automatically styled via `Breadcrumbs.module.css`.
 *
 *
 * ### BreadcrumbLink
 * A link component for a breadcrumb item.
 *
 * **Props:**
 * - Accepts all standard props for `<a>`.
 * - `asChild?: boolean` — if true, renders using a passed child component via Radix UI's `Slot`.
 * - Applies consistent breadcrumb link styles.
 *
 *
 * ### BreadcrumbPage
 * Used to indicate the current page in the breadcrumb trail.
 *
 * **Props:**
 * - Accepts all standard props for `<span>`.
 * - Rendered as `role="link"` with `aria-current="page"` and disabled.
 *
 *
 * ### BreadcrumbSeparator
 * Used between breadcrumb items to visually separate them.
 *
 * **Props:**
 * - Accepts all standard props for `<li>`.
 * - Defaults to a right chevron icon (`<ChevronRight />`) if no children are passed.
 * - `aria-hidden` for accessibility.
 *
 *
 * ### BreadcrumbEllipsis
 * Renders an ellipsis icon (three dots) when breadcrumb items are truncated.
 *
 * **Props:**
 * - Accepts all standard props for `<span>`.
 * - Uses the `<MoreHorizontal />` icon with screen reader support.
 *
 *
 * ### Example Usage:
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/products">Products</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Headphones</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
