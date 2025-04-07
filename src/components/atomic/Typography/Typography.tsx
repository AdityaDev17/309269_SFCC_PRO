import React from "react";
import styles from './Typography.module.css';

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

const Typography= ({
  type,
  variant,
  color = "black",
  fontWeight = "regular",
  label,
  textDecoration = "none",
}:TypographyBlockProps) => {
    const className = `${styles[type.toLowerCase() + variant]} ${styles[fontWeight]}`;


  return (
    <div className={className} style={{ color, textDecoration }}>
      {label || `${type} ${variant}`}
    </div>
  );
};

export default Typography;


/**
 * ## Typography Component
 *
 * The `Typography` component is a reusable text styling component that displays text 
 * based on the type of typography (e.g., Headline, Body, Label) and applies various 
 * style properties such as font size, line height, color, font weight, and text decoration.
 * This component supports different variants of typography, allowing you to easily 
 * customize the appearance of text throughout your application.
 *
 * ### Props:
 * - **`type` (string)**: The type of typography to render. It can be one of:
 *   - `"Headline"`: Renders headline-style text.
 *   - `"Body"`: Renders body-style text.
 *   - `"Label"`: Renders label-style text.
 * 
 * - **`variant` (number)**: A number representing the specific variant for the chosen typography type. 
 *   For example, `variant=1` will render the first variant for the selected type (e.g., `headline1`, `body1`).
 * 
 * - **`color` (string, optional)**: The color of the text. Defaults to `"black"` if not provided.
 *   Accepts any valid CSS color (e.g., `"red"`, `"#FF5733"`, `"rgb(255, 99, 71)"`).
 * 
 * - **`fontWeight` (string, optional)**: The weight of the font. Defaults to `"regular"` if not provided.
 *   It can be one of the following:
 *   - `"light"`
 *   - `"regular"`
 *   - `"medium"`
 *   - `"semibold"`
 *   - `"bold"`
 * 
 * - **`label` (string, optional)**: Custom text to display inside the typography component. 
 *   If not provided, the component will display a default text that combines the `type` and `variant`.
 * 
 * - **`textDecoration` (string, optional)**: Text decoration to apply to the text. 
 *   Defaults to `"none"`. Can be one of:
 *   - `"none"`
 *   - `"line-through"`
 *
 
 */
