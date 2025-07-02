"use client";
import { Button } from "@/components/atomic/Button/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QuantitySelector from "../../atomic/QuantitySelector/QuantitySelector";
import Typography from "../../atomic/Typography/Typography";
import styles from "./CartItemList.module.css";

interface CartItem {
	id: string;
	name: string;
	description?: string;
	quantity: number;
	price: number;
	currency: string;
	productImage: string;
	itemId: string;
	size?: string;
	color?: string;
}

interface CartItemListProps {
	cartItems: CartItem[];
	onDeleteItem?: (itemId: string) => void;
	onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
	miniCart?: boolean;
	orderQuantity?: boolean;
	isWhiteBackground?: boolean;
	button1?: boolean;
	button2?: boolean;
}

const CartItemList = ({
	cartItems,
	onDeleteItem,
	onUpdateQuantity,
	miniCart,
	orderQuantity,
	isWhiteBackground,
	button1,
	button2,
}: CartItemListProps) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobileView = () => {
			setIsMobile(window.innerWidth <= 768);
			console.log(window.innerWidth);
		};

		checkMobileView();
		window.addEventListener("resize", checkMobileView);
		return () => window.removeEventListener("resize", checkMobileView);
	}, []);

	return (
		<div>
			{cartItems?.map((item) => (
				<div
					key={item.id}
					className={`${styles.bagContent} ${isWhiteBackground ? styles.whiteBackground : ""}`}
				>
					<div className={styles.cartItem}>
						<div className={styles.productImageWrapper}>
							<Image
								src={item.productImage}
								alt="cart Image"
								width={140}
								height={140}
								className={styles.productImage}
								loading="eager"
							/>
						</div>

						<div style={{ flex: 1 }}>
							<Typography
								type="Body"
								variant={2}
								fontWeight="semibold"
								label={item.name}
							/>
							{item?.size && item?.color && (
								<div className={styles.textColor}>
									<div>
										Size &nbsp;{Number.parseInt(item?.size, 10).toString()}
									</div>
									<div className={styles.align}>| </div>
									<div className={styles.color}>
										Color{" "}
										<div
											className={styles.circle}
											style={{
												backgroundColor: `${item?.color}`,
											}}
										/>
									</div>
								</div>
							)}
							{item.description && (
								<Typography
									type="Body"
									variant={2}
									fontWeight="semibold"
									label={item.description}
								/>
							)}

							<div className={styles.quantity}>
								{!isMobile && (
									<Typography
										type="Body"
										variant={2}
										label={
											orderQuantity ? `Quantity: ${item.quantity}` : "Quantity"
										}
										color="#4f4b53"
									/>
								)}

								{orderQuantity && (
									<div className={styles.miniCartControls}>
										<div className={styles.miniCartLeft}>
											<Typography
												type="Label"
												variant={3}
												label={`${item.currency} ${item.price}`}
											/>
										</div>
										<div className={styles.orderButtons}>
											{button1 && (
												<Button>
													<Typography
														type="Body"
														variant={2}
														label="BUY NOW"
														fontWeight="regular"
													/>
												</Button>
											)}
											{button2 && !isMobile && (
												<Button>
													<Typography
														type="Body"
														variant={2}
														label="WRITE REVIEW"
														fontWeight="regular"
													/>
												</Button>
											)}
										</div>
									</div>
								)}

								{miniCart && (
									<div className={styles.miniCartControls}>
										<div className={styles.miniCartLeft}>
											<QuantitySelector
												updateQuantity={true}
												onQuantityChange={(newQty) =>
													onUpdateQuantity?.(item.itemId, newQty)
												}
												qty={item.quantity}
											/>
											<Image
												src="/images/delete.png"
												alt="Delete"
												onClick={() => onDeleteItem?.(item.itemId)}
												className={styles.deleteIcon}
												width={24}
												height={24}
											/>
										</div>
										<Typography
											type="Label"
											variant={3}
											label={`${item.currency} ${item.price}`}
											color="#4f4b53"
										/>
									</div>
								)}

								{!miniCart && !orderQuantity && (
									<div className={styles.fullCartControls}>
										{!isMobile && (
											<div className={styles.fullCartLeft}>
												<QuantitySelector
													updateQuantity={true}
													onQuantityChange={(newQty) =>
														onUpdateQuantity?.(item.itemId, newQty)
													}
													qty={item.quantity}
												/>
												<Button className={styles.wishlistBtn}>
													Move to Wishlist
												</Button>
												<div className={styles.deleteWrapper}>
													<Image
														src="/images/delete.png"
														alt="Delete"
														onClick={() => onDeleteItem?.(item.itemId)}
														className={styles.deleteIcon}
														width={24}
														height={24}
														priority
													/>
												</div>
											</div>
										)}
										<Typography
											type="Label"
											variant={3}
											label={`${item.currency} ${item.price}`}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
					{isMobile && !miniCart && !orderQuantity && (
						<div>
							<Typography
								type="Body"
								variant={2}
								label={"Quantity"}
								color="#4f4b53"
							/>
							<div className={styles.mobileCartLeft}>
								<QuantitySelector
									updateQuantity={true}
									onQuantityChange={(newQty) =>
										onUpdateQuantity?.(item.itemId, newQty)
									}
									qty={item.quantity}
								/>
								<Button className={styles.wishlistBtn}>Move to Wishlist</Button>
								<div className={styles.deleteWrapper}>
									<Image
										src="/images/delete.png"
										alt="Delete"
										onClick={() => onDeleteItem?.(item.itemId)}
										className={styles.deleteIcon}
										width={24}
										height={24}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default CartItemList;

/**
 * ## CartItemList
 *
 * The `CartItemList` component displays a list of items in the user's shopping cart. It supports different layouts
 * and behaviors based on context (e.g., full cart, mini cart, or order summary view). The component is responsive
 * and adapts to mobile and desktop layouts dynamically.
 *
 * ### Props
 *
 * - `cartItems` **(required)**: Array of cart item objects to display. Each item has:
 *   - `id`: Unique identifier.
 *   - `name`: Name of the product.
 *   - `description` (optional): Short product description.
 *   - `quantity`: Quantity selected by the user.
 *   - `price`: Price of a single unit.
 *   - `currency`: Currency symbol (e.g., "$").
 *   - `productImage`: Image URL of the product.
 *
 * - `onDeleteItem` (optional): Callback function called with an item `id` when the delete icon is clicked.
 * - `onUpdateQuantity` (optional): Callback function called with an item `id` and `newQuantity` when quantity is updated.
 * - `miniCart` (optional): If `true`, renders a compact version used in side panels or overlays.
 * - `orderQuantity` (optional): If `true`, renders a read-only layout suitable for order summaries or confirmations.
 * - `isWhiteBackground` (optional): If `true`, applies a white background style (e.g., for overlays or modals).
 *
 * ### Features
 *
 * - **Responsive Layout**:
 *   - Uses internal state to track viewport size and render mobile-specific controls/layout when necessary.
 *   - On mobile, quantity, wishlist, and delete actions are stacked vertically.
 *
 * - **Mini Cart Mode (`miniCart = true`)**:
 *   - Compact controls with quantity selector, delete button, and price total (`price * quantity`).
 *
 * - **Full Cart Mode**:
 *   - Offers a richer layout with “Move to Wishlist” option and separate delete button.
 *   - Displays price for a single unit of the product.
 *
 * - **Order Quantity Mode (`orderQuantity = true`)**:
 *   - Quantity shown as static text.
 *   - Price shown beside quantity.
 *   - No controls for updating or deleting items.
 *
 * - **Custom Styling**:
 *   - Controlled using `CartItemList.module.css`.
 *   - Classes like `bagContent`, `miniCartControls`, `fullCartControls`, `deleteWrapper`, `mobileCartLeft` manage layout and spacing.
 *
 * ### Usage Example
 *
 * ```tsx
 * <CartItemList
 *   cartItems={[
 *     {
 *       id: '1',
 *       name: 'Sneakers',
 *       quantity: 2,
 *       price: 99.99,
 *       currency: '$',
 *       productImage: '/images/sneakers.jpg',
 *     }
 *   ]}
 *   onDeleteItem={(id) => console.log('Delete item:', id)}
 *   onUpdateQuantity={(id, qty) => console.log('Update item:', id, qty)}
 *   miniCart={false}
 * />
 * ```
 *
 * ### Dependencies
 *
 * - `QuantitySelector`: A component for increasing or decreasing item quantities.
 * - `Typography`: Custom text component for consistent styling.
 * - `next/image`: For optimized image rendering.
 *
 * ### Notes
 *
 * - Only one of `miniCart`, `orderQuantity`, or full-cart layout should be active at a time for correct rendering.
 * - `onDeleteItem` and `onUpdateQuantity` are optional but recommended for interactive modes.
 *
 */
