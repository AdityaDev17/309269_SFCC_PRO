import { LoaderCircle, type LucideProps } from "lucide-react";
import styles from "./LoadingSpinner.module.css";

export interface IProps extends LucideProps {
	className?: string;
}

const LoadingSpinner = ({ className, ...props }: IProps) => {
	return (
		<LoaderCircle
			className={`${styles.spinner} ${className ? className : ""}`}
			{...props}
		/>
	);
};

export default LoadingSpinner;

/**
 * ## LoadingSpinner
 *
 * The `LoadingSpinner` is a reusable and customizable loading indicator built using the `LoaderCircle` icon from `lucide-react`.
 * It is styled with a spinning animation via a CSS module and can inherit all standard icon props.
 *
 * ### Props
 *
 * - **className** (string, optional): Additional class names to customize the spinner's styling.
 * - **...props** (`LucideProps`): Inherits all props from the `LoaderCircle` component (e.g., `size`, `color`, `strokeWidth`, etc.).
 *
 * ### Component Behavior
 *
 * - Applies a spinning animation using the `spinner` class from `loadingSpinner.module.css`.
 * - Can be resized, recolored, or otherwise customized via Lucide props.
 * - Useful for indicating loading states in buttons, forms, modals, or full-screen loaders.
 */
