import * as React from "react"
import styles from './Card.module.css'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number; 
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, width, ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles.Card} ${className}`}
    style={{ width: typeof width === 'number' ? `${width}px` : width }} 
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div
    ref={ref}
    className={styles.CardHeader}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ ...props }, ref) => (
  <h3
    ref={ref}
    className={styles.CardTitle}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ ...props }, ref) => (
  <div
    ref={ref}
    className={styles.CardDescription}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} className={styles.CardContent} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div
    ref={ref}
    className={styles.CardFooter}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }



/**
 * ## Card
 *
 * The `Card` component is a customizable container that can hold various content, such as text, images, and other elements. 
 * It is designed to be flexible and can be styled with custom CSS.
 *
 * ### Props
 *
 * - **width** (string | number, optional): Defines the width of the card. Can be a string (e.g., `'100%'`) or a number (e.g., `440` for pixels). Defaults to `440px`.
 * - **className** (string, optional): Allows for additional custom CSS class names to be applied to the card component.
 * - All other standard `HTMLDivElement` props can be passed as well (e.g., `id`, `style`, `data-*` attributes).
 *
 * ### Component Behavior
 *
 * - The card can have a customizable width via the `width` prop, either as a string or a number representing the width in pixels.
 * - The card can be further styled by passing custom class names via the `className` prop.
 * - The component is a wrapper for various card sub-components, which include the header, title, description, content, and footer.
 *
 * ### Example Usage
 *
 * Here’s an example of how to use the `Card` component along with its subcomponents:
 *
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card Content</p>
 *   </CardContent>
 *   <CardFooter>
 *     <p>Card Footer</p>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * ### Subcomponents
 * The following subcomponents are available for use inside the `Card` component:
 *
 * - **CardHeader**: A container for the card's header content.
 * - **CardTitle**: Displays the title of the card, usually a heading.
 * - **CardDescription**: Provides a description or extra content below the title.
 * - **CardContent**: A container for the main content inside the card.
 * - **CardFooter**: A container for the footer content of the card.
 *
 * Each of these subcomponents can receive additional props such as `className`, `style`, etc., to allow customization.
 */

/**
 * ## CardHeader
 *
 * The `CardHeader` component is a subcomponent of the `Card` that holds the header content.
 * It can be used to display a logo, image, or any other content at the top of the card.
 *
 * ### Props
 *
 * - **className** (string, optional): Allows additional CSS class names to be applied to the header.
 * - All other standard `HTMLDivElement` props can be passed as well.
 *
 * ### Component Behavior
 *
 * - This component serves as a container for the card's header content, allowing for custom styling and layout.
 */

/**
 * ## CardTitle 
 *
 * The `CardTitle` component is a subcomponent of the `Card` that displays the main heading or title inside the card.
 * Typically used as an `h3` element, but can be customized with additional props.
 *
 * ### Props
 *
 * - **className** (string, optional): Allows additional CSS class names to be applied to the title.
 * - All other standard `HTMLHeadingElement` props can be passed as well (e.g., `id`, `style`, `aria-*` attributes).
 *
 * ### Component Behavior
 *
 * - This component renders the card's title, typically inside an `h3` element.
 * - It can be customized with additional CSS classes and other HTML heading attributes.
 */

/**
 * ## CardDescription
 *
 * The `CardDescription` component is a subcomponent of the `Card` that provides a brief description or extra information.
 * This component is typically placed below the title.
 *
 * ### Props
 *
 * - **className** (string, optional): Allows additional CSS class names to be applied to the description.
 * - All other standard `HTMLParagraphElement` props can be passed as well (e.g., `id`, `style`, `aria-*` attributes).
 *
 * ### Component Behavior
 *
 * - This component is used to display a short description or content below the card's title.
 * - It can be customized with additional CSS classes and other paragraph attributes.
 */

/**
 * ## CardContent
 *
 * The `CardContent` component is a subcomponent of the `Card` that serves as the main container for the card's body content.
 * It can hold any content, including text, images, or other components.
 *
 * ### Props
 *
 * - **className** (string, optional): Allows additional CSS class names to be applied to the content area.
 * - All other standard `HTMLDivElement` props can be passed as well.
 *
 * ### Component Behavior
 *
 * - This component wraps the main content inside the card. It is flexible and can hold any child components or HTML elements.
 */

/**
 * ## CardFooter
 *
 * The `CardFooter` component is a subcomponent of the `Card` that contains content typically placed at the bottom of the card.
 * This could include action buttons, additional links, or other information.
 *
 * ### Props
 *
 * - **className** (string, optional): Allows additional CSS class names to be applied to the footer.
 * - All other standard `HTMLDivElement` props can be passed as well.
 *
 * ### Component Behavior
 *
 * - This component is used to place footer content inside the card, such as buttons or additional text.
 * - It can be customized with additional CSS classes and other div element attributes.
 */
