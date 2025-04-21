/**
 * ## Button 
 *
 * The `Button` component is a highly customizable and accessible UI element designed for various use cases.
 * It supports different styles, sizes, icons, and interaction behaviors.
 *
 * ### Features:
 * - **Multiple Variants**: Choose from `"secondary"`, `"link"`, and `"icon"` styles.
 * - **Size Options**: `"sm"`, `"lg"`, and `"icon"` for different use cases.
 * - **Active State**: If `active` is `true`, an `X` (close) icon appears to indicate an active button.
 * - **Icon Support**: Can display an additional icon alongside the button label.
 * - **Removable Buttons**: If `onRemove` is provided, clicking the close icon triggers the callback.
 * - **Flexible Rendering**: Use `asChild` to render as a different HTML element (`<a>`, `<div>`, etc.).
 *
 * ### Props:
 *
 * | Prop       | Type                                      | Description |
 * |------------|-------------------------------------------|-------------|
 * | `variant`  | `"secondary" \| "link" \| "icon"`        | Defines the button style. |
 * | `size`     | `"sm" \| "lg" \| "icon"`                 | Controls the button size. |
 * | `active`   | `boolean` (default: `false`)              | If `true`, the button displays an active state with a close icon. |
 * | `icon`     | `React.ReactNode`                         | Adds an icon to the button. |
 * | `asChild`  | `boolean` (default: `false`)              | If `true`, renders as a different component (e.g., `<a>`). |
 * | `onRemove` | `() => void`                              | Callback triggered when the close icon (`X`) is clicked. |
 * | `children` | `React.ReactNode`                         | Button label or content. |
 *
 * ### Accessibility Considerations:
 * - The `X` close icon prevents event bubbling to avoid unexpected behaviors.
 * - Uses `data-attributes` (`data-variant`, `data-size`, `data-state`) to manage styles dynamically.
 * - Supports keyboard accessibility and screen readers.
 *
 * ### Challenges & Considerations:
 * - **Styling Optimization**: Instead of multiple `className` conditions, styles are handled via CSS Modules using `data-attributes`.
 * - **Avoiding Unnecessary Renders**: Ensured `onRemove` only executes when necessary.
 * - **Composable Design**: Using `Slot` from `@radix-ui/react-slot` allows wrapping the button with other components seamlessly.
 
*/


import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { X } from "lucide-react";
import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  active?: boolean;
  onRemove?: () => void;
  variant?: "secondary" | "link" | "icon";
  size?: "sm" | "lg" | "icon";
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      active = false,
      className,
      size,
      asChild = false,
      icon,
      children,
      onRemove,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-state={active ? "active" : "inactive"}
        data-size={size}
        data-variant={variant}
        className={`${styles.Button} ${className ? className : ""}`}
        ref={ref}
        {...props}
      >
        {children}
        {active && (
          <X
            data-testid="close-icon"
            className={styles.CloseIcon}
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
          />
        )}
        {icon && <span className={styles.Icon}>{icon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
