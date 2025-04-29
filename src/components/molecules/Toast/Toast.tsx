/**
 * ## Toast Component
 *
 * The `Toaster` component provides customizable toast notifications using the `sonner` library.
 * It adapts to the current theme from `next-themes` and supports rich styling via CSS Modules.
 *
 * ---
 *
 * ### Features:
 * - **Theme Aware**: Inherits system, dark, or light theme based on user preference.
 * - **Positioning**: Toasts appear in the top-right corner by default.
 * - **Auto Dismiss**: Toasts automatically disappear after 2500ms.
 * - **Custom Styling**: Modular CSS classes for consistent look and feel.
 * - **Close Button**: Toasts are dismissible via a built-in close button.
 * - **Flexible Configuration**: All `sonner` props are supported and extendable.
 *
 * ---
 *
 * ### Props:
 *
 * The `Toaster` accepts all props from the `sonner` library.
 *
 * | Prop         | Type                    | Description |
 * |--------------|-------------------------|-------------|
 * | `theme`      | `"light" \| "dark" \| "system"` | Sets the toast's theme. Defaults to system theme via `useTheme()`. |
 * | `duration`   | `number`                | Duration in milliseconds before toast disappears. Default: `2500`. |
 * | `position`   | `"top-right"` (default) | Position of the toast on screen. |
 * | `toastOptions` | `object`              | Custom classNames and settings for internal toast elements. |
 *
 * ---
 *
 * ### Accessibility Considerations:
 * - Close button supports screen readers.
 * - Appears in a non-intrusive location to minimize disruption.
 * - Dismissable via click and auto timeout.
 *
 * ---
 *
 * ### Styling Notes:
 * - Uses CSS Modules via `Toast.module.css`.
 * - Classnames like `Toast`, `ToastDescription`, `ToastActionButton`, and `ToastCancelButton` allow full control of the design.
 *
 * 
 */

"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import styles from "./Toast.module.css";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      closeButton={true}
      duration={2500}
      position="top-right"
      // className={`${styles.Toast} ${styles.ToastSuccess}`}

      toastOptions={{
        classNames: {
          toast: styles.Toast,
          content: styles.ToastDescription,
          actionButton: styles.ToastActionButton,
          closeButton: styles.ToastCancelButton,
          //toast: styles.toasttest
        },
      }}
      {...props}
    />
  );
};
export { Toaster, toast };