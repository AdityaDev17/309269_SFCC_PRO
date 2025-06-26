import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/atomic/HoverCard/HoverCard";
import React, { useState } from "react";
import styles from "./VarientSelector.module.css";

type Colors = {
	name: string;
	hex: string;
};

interface VarinetSelectorProps {
	onSelected: (colors: Colors) => void;
	colors: Colors[];
}

const VarientSelector = ({ colors, onSelected }: VarinetSelectorProps) => {
	const visibleColors = colors?.slice(0, 5);
	const remainingCount = colors?.length - visibleColors?.length;
	const remainingColors = colors?.slice(5);
	const [selected, setSelected] = useState(0);

	const handleSelected = (index: number) => {
		onSelected(colors[index]);
		setSelected(index);
	};

	return (
		<>
			<div className={styles.container}>
				{visibleColors?.map((color: Colors, index: number) => (
					<div
						className={
							selected === index ? styles.circleBlack : styles.circleBlackW
						}
						key={color?.name}
					>
						<div
							className={styles.colorCircle}
							style={{ backgroundColor: color.hex }}
							title={color.name}
							onClick={() => handleSelected(index)}
							onKeyUp={() => handleSelected(index)}
						/>
					</div>
				))}
				{remainingCount !== 0 && (
					<HoverCard>
						<HoverCardTrigger asChild>
							<div className={styles.extraCircle}>+{remainingCount}</div>
						</HoverCardTrigger>
						<HoverCardContent className={styles.content}>
							<div className={styles.container}>
								{remainingColors?.map((color: Colors, index: number) => {
									const actualIndex = index + 5; // shift index for full list
									return (
										<div
											className={
												selected === actualIndex
													? styles.circleBlack
													: styles.circleBlackW
											}
											key={actualIndex}
										>
											<div
												className={styles.colorCircle}
												style={{ backgroundColor: color.hex }}
												title={color.name}
												onClick={() => setSelected(actualIndex)}
												onKeyUp={() => setSelected(actualIndex)}
											/>
										</div>
									);
								})}
							</div>
						</HoverCardContent>
					</HoverCard>
				)}
			</div>
			<div className={styles.titleColor}>{colors?.[selected]?.name}</div>
		</>
	);
};

export default VarientSelector;

/**
 * ## VarientSelector
 *
 * The `VarientSelector` component allows users to choose a color variant from a given list.
 * It visually displays up to five color options directly and provides access to additional
 * options via a hover-triggered card.
 *
 * ### Props
 *
 * - **colors** (Array): A list of color objects to be displayed. Each object should contain:
 *   - **hex** (string): The hex code of the color (e.g., `#FFFFFF`).
 *   - **name** (string): The display name of the color (e.g., `"White"`).
 * - **onSelected** (function): A callback function that is invoked when a color is selected.
 *   It receives the selected color object as an argument.
 *
 * ### Component Behavior
 *
 * - Displays the first five colors as circular buttons directly.
 * - If more than five colors are provided, the remaining colors are shown inside a `HoverCard`
 *   when the `+N` indicator is hovered.
 * - Clicking on a color updates the selected state and triggers the `onSelected` callback.
 * - The currently selected color's name is shown below the selector.
 *
 * ### Example Usage
 *
 * ```tsx
 * <VarientSelector
 *   colors={[
 *     { hex: "#FF0000", name: "Red" },
 *     { hex: "#00FF00", name: "Green" },
 *     { hex: "#0000FF", name: "Blue" },
 *     ...
 *   ]}
 *   onSelected={(color) => console.log("Selected color:", color)}
 * />
 * ```
 */
