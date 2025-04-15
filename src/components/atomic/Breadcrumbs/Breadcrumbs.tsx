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
 * # Breadcrumb Components
 *
 * A collection of accessible and composable breadcrumb navigation components used to indicate 
 * the current page’s location within a navigational hierarchy.
 *
 * ## Components
 *
 * ### Breadcrumb
 * - Root wrapper component that renders a `<nav>` element with `aria-label="breadcrumb"`.
 * - Accepts all standard props for `<nav>`.
 * - Optional `separator` prop for custom implementations (not used directly in the base component).
 *
 * ### BreadcrumbList
 * - Wraps the breadcrumb items inside an `<ol>` element.
 * - Accepts all standard props for `<ol>`.
 * - Applies default breadcrumb list styling via `Breadcrumbs.module.css`.
 *
 * ### BreadcrumbItem
 * - Represents an individual breadcrumb item rendered as `<li>`.
 * - Accepts all standard props for `<li>`.
 * - Styled through `Breadcrumbs.module.css`.
 *
 * ### BreadcrumbLink
 * - A link element used inside a breadcrumb item.
 * - Accepts all standard props for `<a>`.
 * - **asChild** (boolean, optional): If true, uses Radix UI's `Slot` to render the passed child component.
 * - Applies consistent breadcrumb link styles.
 *
 * ### BreadcrumbPage
 * - Indicates the current page in the breadcrumb trail.
 * - Rendered as a `<span>` with `role="link"` and `aria-current="page"`.
 * - Non-interactive (disabled).
 * - Accepts all standard props for `<span>`.
 *
 * ### BreadcrumbSeparator
 * - Used to visually separate breadcrumb items.
 * - Rendered as a `<li>` element.
 * - Accepts all standard props for `<li>`.
 * - Defaults to a right-chevron icon (`<ChevronRight />`) if no children are passed.
 * - `aria-hidden` is applied for accessibility.
 *
 * ### BreadcrumbEllipsis
 * - Renders an ellipsis icon (`<MoreHorizontal />`) to indicate truncated items.
 * - Accepts all standard props for `<span>`.
 * - Includes screen reader support for accessibility.
 *
 * ## Example Usage
 *
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

