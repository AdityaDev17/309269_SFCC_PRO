import * as React from "react"
import styles from './Card.module.css'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number; 
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, width = 440, ...props }, ref) => (
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
 * ## Card Component
 *
 * The `Card` component is a flexible container for content that can be used to display information 
 * in a neat, structured layout. It comes with various sub-components, such as `CardHeader`, `CardTitle`, 
 * `CardDescription`, `CardContent`, and `CardFooter`, which allow for customization of different areas 
 * within the card.
 *
 * The `Card` component itself accepts props for customizing the width, as well as passing down 
 * additional HTML attributes to style or extend the card’s behavior.
 *
 * ### Props for `Card`:
 * - **`width` (string | number, optional)**: The width of the card. It can be either a string (e.g., `"100%"`) or a number (e.g., `440` which will be interpreted as `440px`). The default is `440px`.
 * - **`className` (string, optional)**: An optional class name to further customize the styling of the card.
 * - **`...props` (React.HTMLAttributes<HTMLDivElement>)**: Additional HTML attributes can be passed to the underlying `div` element.
 *
 *
 * ### Sub-components:
 *
 * - **`CardHeader`**: Represents the header section of the card.
 * - **`CardTitle`**: Represents the title of the card, typically a heading.
 * - **`CardDescription`**: Represents a section for describing the card's content.
 * - **`CardContent`**: Represents the main content area of the card.
 * - **`CardFooter`**: Represents the footer section of the card, typically for actions or extra information.
 *
*
 */
