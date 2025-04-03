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
