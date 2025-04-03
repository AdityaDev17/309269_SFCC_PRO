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
