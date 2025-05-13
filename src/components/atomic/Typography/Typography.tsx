import React from "react";
import styles from "./Typography.module.css";

type TypographyType = "Headline" | "Body" | "Label";
type FontWeight = "light" | "regular" | "medium" | "semibold" | "bold";

interface TypographyBlockProps {
	type: TypographyType;
	variant: number;
	color?: string;
	fontWeight?: FontWeight;
	label?: string;
	textDecoration?: "none" | "line-through";
}

const Typography = ({
	type,
	variant,
	color = "black",
	fontWeight = "regular",
	label,
	textDecoration = "none",
}: TypographyBlockProps) => {
	const className = `${styles[type.toLowerCase() + variant]} ${styles[fontWeight]}`;

	return (
		<div className={className} style={{ color, textDecoration }}>
			{label || `${type} ${variant}`}
		</div>
	);
};

export default Typography;

/**
 * ## Typography
 *
 * The `Typography` component is a flexible text rendering component that can be used to display different types of text, such as headlines, body text, and labels.
 * It supports customization through various props, including font weight, color, text decoration, and variant selection.
 *
 * ### Props
 *
 * - **type** (`"Headline" | "Body" | "Label"`): Specifies the type of typography. This determines the default styles applied to the text. Available values:
 *   - `"Headline"`: For larger, more prominent text.
 *   - `"Body"`: For regular body text.
 *   - `"Label"`: For smaller text typically used for labels or captions.
 *
 * - **variant** (`number`): Specifies the variant or size of the typography. Different numeric values (e.g., `1`, `2`, etc.) correspond to different predefined styles.
 *
 * - **color** (`string`, optional): The color of the text. This can be any valid CSS color (e.g., `"red"`, `"#333"`, `"rgba(0, 0, 0, 0.8)"`). Defaults to `"black"`.
 *
 * - **fontWeight** (`"light" | "regular" | "medium" | "semibold" | "bold"`, optional): The weight of the font. Available values:
 *   - `"light"`
 *   - `"regular"` (default)
 *   - `"medium"`
 *   - `"semibold"`
 *   - `"bold"`
 *
 * - **label** (`string`, optional): If provided, this value will be displayed as the text content. If not provided, the text will default to a combination of the `type` and `variant` values.
 *
 * - **textDecoration** (`"none" | "line-through"`, optional): Specifies the text decoration style. Available values:
 *   - `"none"`: No text decoration (default).
 *   - `"line-through"`: The text will have a line through it, often used for indicating strikethrough text.
 *
 * ### Component Behavior
 *
 * - The component dynamically generates class names based on the `type` and `variant` props. This allows different styles for headlines, body text, and labels with different variants.
 * - The font weight is determined by the `fontWeight` prop, allowing the text to be rendered in different weights (light, regular, medium, semibold, bold).
 * - The color and text decoration are customizable via inline styles. The `color` prop controls the text color, and the `textDecoration` prop allows for strikethrough or no decoration.
 * - If the `label` prop is provided, it is displayed as the text content. If not, the component will display a default text like `"Headline 1"`, `"Body 2"`, etc., based on the `type` and `variant`.
 *
 * ### Example Usage
 *
 * Here's a simple example of how to use the `Typography` component:
 *
 * ```tsx
 *       <Typography type="Headline" variant={1} color="blue" fontWeight="bold">
 *         This is a bold headline
 *       </Typography>
 *       <Typography type="Body" variant={2} color="gray">
 *         This is body text with variant 2
 *       </Typography>
 *       <Typography type="Label" variant={1} color="green" textDecoration="line-through">
 *         This is a label with a line-through
 *       </Typography>
 * ```
 *
 */
