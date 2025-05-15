import * as React from "react";

import styles from "./TextArea.module.css";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ rows = 4, ...props }, ref) => {
		return (
			<textarea className={styles.Textarea} ref={ref} rows={rows} {...props} />
		);
	},
);
Textarea.displayName = "Textarea";

export default Textarea;

/**
 * ## Textarea
 *
 * The `Textarea` component is a reusable and styled textarea input field.
 * It provides a customizable text input area with consistent styling,
 * and a smooth user experience.
 *
 * ### Features:
 * - Automatically resizes to show **4 lines** of text by default.
 * - Includes `border`, `padding`, and `focus-visible` styles for better UI/UX.
 * - Supports all standard HTML textarea attributes via props.
 * - Uses **forwardRef** for better integration with React forms and controlled inputs.
 *
 * ### Props:
 * - Accepts all standard **`<textarea>`** attributes such as:
 *   - `placeholder` - Sets placeholder text.
 *   - `disabled` - Disables the textarea.
 *   - `value` - Controls the textarea value (for controlled components).
 *   - `onChange` - Callback triggered when the text changes.
 *
 * ### Usage Example:
 * ```tsx
 *
 * function App() {
 *   return (
 *     <Textarea placeholder="Type your message here..." />
 *   );
 * }
 * ```
 *
 * ### Challenges & Research:
 * - Ensured that the default height accommodates 4 lines of text.
 * - Used `ref` forwarding to maintain compatibility with form handlers.
 * - Researched best practices for accessibility (`:focus-visible`, `placeholder`, etc.).
 */
