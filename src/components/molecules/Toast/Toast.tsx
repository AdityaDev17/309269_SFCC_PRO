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
