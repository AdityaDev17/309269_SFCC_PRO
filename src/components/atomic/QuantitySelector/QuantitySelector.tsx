import Image from "next/image";
import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";
import styles from "./QuantitySelector.module.css";

interface QuantitySelectorProps {
	onQuantityChange: (quantity: number) => void;
	updateQuantity: boolean;
	qty?: number;
}

const QuantitySelector = ({
	onQuantityChange,
	updateQuantity,
	qty,
}: QuantitySelectorProps) => {
	const [quantity, setQuantity] = useState(qty ?? 1);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (typeof qty === "number" && qty !== quantity) {
			setQuantity(qty);
		}
	}, [qty]);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const selectNumber = (num: number) => {
		setQuantity(num);
		onQuantityChange(num);
		setIsOpen(false);
	};

	const increaseQuantity = () => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity);
		onQuantityChange(newQuantity);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			onQuantityChange(newQuantity);
		}
	};

	return (
		<div className={styles.container}>
			{updateQuantity ? (
				<div className={styles.content}>
					<Image
						className={styles.iconButton}
						onClick={decreaseQuantity}
						src="/images/minusIcon.svg"
						alt="Decrease"
						width={8}
						height={8}
					/>
					<span className={styles.quantityText}>{quantity}</span>
					<Image
						className={styles.iconButton}
						onClick={increaseQuantity}
						src="/images/addIcon.svg"
						alt="Increase"
						width={8}
						height={8}
					/>
				</div>
			) : (
				<div className={styles.content} onClick={toggleDropdown}>
					<Typography
						type="Body"
						variant={2}
						label={quantity.toString()}
						color="#4f4b53"
					/>
					<Image
						className={styles.downArrowIcon}
						src="/images/chevron.png"
						alt="Chevron down"
						width={14}
						height={7}
					/>
				</div>
			)}

			{isOpen && !updateQuantity && (
				<div className={styles.dropdown}>
					<div className={styles.dropdownList}>
						{[...Array(10)].map((_, index) => (
							<div
								key={index}
								className={styles.dropdownItem}
								onClick={() => selectNumber(index + 1)}
							>
								{index + 1}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default QuantitySelector;

/**
 * ## QuantitySelector
 *
 * The `QuantitySelector` component allows users to select a quantity either by using
 * increment and decrement buttons or by selecting a value from a dropdown list. The component
 * provides a customizable way to handle quantity changes and can be used in situations such as
 * selecting the quantity of a product in a shopping cart.
 *
 * ### Props
 *
 * - **onQuantityChange** (function): A callback function that is triggered when the quantity changes. It receives the updated quantity as an argument.
 * - **updateQuantity** (boolean): Determines whether the quantity should be updated via buttons or from a dropdown. If `true`, the user can increase or decrease the quantity by clicking the "+" or "-" icons. If `false`, the quantity can be selected from a dropdown.
 * - **qty** (number, optional): An initial value for the quantity. If provided, this value will be used as the starting quantity. Defaults to `1` if not provided.
 *
 * ### Component Behavior
 *
 * - **With `updateQuantity = true`**: The user can click on the "+" and "-" icons to increase or decrease the quantity. The updated quantity is passed to the `onQuantityChange` callback.
 * - **With `updateQuantity = false`**: The quantity is displayed as text with a dropdown arrow. When the user clicks on it, a dropdown of numbers (1 to 10) is shown, allowing the user to select a number. The selected number is passed to the `onQuantityChange` callback.
 * - **Quantity Boundaries**: The minimum quantity is `1`, and the user cannot decrease the quantity below that value.
 * - **Dropdown Functionality**: The dropdown appears when `updateQuantity` is `false`. It allows users to select a quantity from the range `1` to `10`.
 *
 */
