import * as React from "react";

import styles from "./textArea.module.css";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ rows = 4, ...props }, ref) => {
    return (
      <textarea className={styles.Textarea} ref={ref} rows={rows} {...props} />
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
