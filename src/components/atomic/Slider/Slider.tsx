"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import styles from "./Slider.module.css";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ ...props }, ref) => {
	const [value, setValue] = React.useState([50]);

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={styles.Slider}
			value={value}
			onValueChange={setValue}
			{...props}
		>
			<SliderPrimitive.Track className={styles.SliderTrack}>
				<SliderPrimitive.Range className={styles.SliderRange} />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className={styles.SliderThumb} />
		</SliderPrimitive.Root>
	);
});

Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;

/**
 * ## Slider
 *
 * The `Slider` component is an interactive UI element that allows users to select a numeric value within a given range.
 * It is built using Radix UI's Slider primitive and supports customization.
 *
 * ### Props:
 * - **`value` (number[] | undefined, optional)**: Controls the current value of the slider.
 *   If not provided, it defaults to `[50]`.
 *
 * - **`onValueChange` (function, optional)**: A callback function triggered when the slider value changes.
 *   It receives the updated value as a parameter.
 *
 * - **`disabled` (boolean, optional)**: If `true`, the slider will be disabled and non-interactive.
 * - **`min` (number, optional)**: The minimum value the slider can take.
 * - **`max` (number, optional)**: The maximum value the slider can take.
 * - **`step` (number, optional)**: Defines the increment/decrement step for value changes.
 *
 * ### Component Behavior:
 * - The **`value`** state is initialized to `[50]` if not provided externally.
 * - The **`onValueChange`** callback updates the value when the slider is moved.
 * - If **`disabled`** is `true`, the slider will be inactive.
 *
 */
