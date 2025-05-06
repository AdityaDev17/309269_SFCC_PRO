"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import styles from "./Label.module.css";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={styles.Label} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;

/**
 * ## Label
 *
 * The `Label` component is a lightweight, accessible text element used to annotate form controls.
 * It wraps the `@radix-ui/react-label` primitive and applies custom styling via CSS Modules.
 *
 * ### Features:
 * - **Accessible**: Automatically associates the label with an input via the `htmlFor` prop.
 * - **Custom Styling**: Uses CSS Modules (`Label.module.css`) for consistent visual design.
 * - **Radix Primitive**: Built on top of Radix UI's `LabelPrimitive.Root` for robust accessibility support.
 * - **Forwarded Refs**: Fully supports `ref` forwarding for enhanced composability.
 *
 * ### Props:
 *
 * Inherits all props from `@radix-ui/react-label.Label`, including:
 *
 * | Prop        | Type                 | Description |
 * |-------------|----------------------|-------------|
 * | `htmlFor`   | `string`             | Associates the label with a form element by ID. |
 * | `children`  | `React.ReactNode`    | The label content. |
 * | `className` | `string` (optional)  | Custom class names can be merged with module styles. |
 * | `ref`       | `React.Ref`          | Ref is forwarded to the underlying label element. |
 *
 * ### Accessibility Considerations:
 * - Automatically links to the associated form element using `htmlFor`.
 * - Complies with [WAI-ARIA labeling](https://www.w3.org/WAI/tutorials/forms/labels/) best practices.
 * - Ensures screen readers correctly identify and read out associated labels.
 *
 * ### Styling Strategy:
 * - Uses a scoped CSS module (`Label.module.css`) for styling.
 * - Default className `styles.Label` ensures consistency across the application.
 *
 * ### Example:
 *
 * ```tsx
 * import Label from "./Label";
 *
 * function LoginForm() {
 *   return (
 *     <form>
 *       <Label htmlFor="email">Email</Label>
 *       <input id="email" type="email" />
 *     </form>
 *   );
 * }
 * ```
 */
