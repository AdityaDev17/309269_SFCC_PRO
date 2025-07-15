"use client";
import { Alignment, type ProductCardProps } from "@/common/type";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../../atomic/Button/Button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../atomic/Card/Card";
import Typography from "../../atomic/Typography/Typography";
import styles from "./ProductCard.module.css";

const ProductCard = ({
	productId,
	alignment = "center",
	width,
	productImage,
	productTitle,
	productDesc,
	price,
	currency,
	moveToBag,
	wishListed,
	bagPrice,
	onClick,
	onButtonClick,
	onMoveToBag,
	onMouseEnter,
	onMouseLeave
}: ProductCardProps) => {
	const t = useTranslations("ProductCard");
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobileView = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobileView();
		window.addEventListener("resize", checkMobileView);
		return () => window.removeEventListener("resize", checkMobileView);
	}, []);

	return (
		<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<Card width={width} onClick={() => productId && onClick?.(productId)}>
				<CardHeader className={styles.imageWrapper}>
					<Image
						src={productImage}
						alt="product"
						className={styles.productImage}
						width={440}
						height={440}
						loading="eager"
						priority={true}
					/>
					{wishListed && (
						<Image
							src="/images/whishlist_fill.svg"
							alt="wishlist"
							className={styles.wishlistIcon}
							width={24}
							height={24}
						/>
					)}
				</CardHeader>

				{productTitle && (
					<CardContent className={`${styles.cardContent} ${styles[alignment]}`}>
						<Typography
							type={"Headline"}
							variant={5}
							label={productTitle}
							fontWeight="regular"
							color="black"
						/>
						{productDesc && (
							<div className={styles.spacing}>
								<Button
									variant="link"
									onClick={(e) => {
										e.stopPropagation();
										productId && onButtonClick?.(productId);
									}}
								>
									<Typography
										type={"Body"}
										variant={2}
										label={productDesc}
										fontWeight="medium"
										color="black"
									/>
								</Button>
							</div>
						)}
						{price && (
							<div className={styles.spacing}>
								<Typography
									type="Body"
									variant={1}
									color="gray"
									fontWeight="medium"
									label={`${currency}  ${price}`}
								/>
							</div>
						)}
					</CardContent>
				)}

				{!isMobile ? (
					<CardFooter className={styles.priceButtonRow}>
						{bagPrice && (
							<Typography
								type="Body"
								variant={1}
								color="gray"
								fontWeight="medium"
								label={`${currency}${bagPrice}`}
							/>
						)}
						{moveToBag && (
							<Button
								variant="icon"
								className={styles.moveToBagButton}
								onClick={(e) => {
									e.stopPropagation();
									productId && onMoveToBag?.(productId);
								}}
							>
								<Typography
									type="Body"
									variant={2}
									label={t("move-to-bag")}
									fontWeight="medium"
									color="black"
								/>
							</Button>
						)}
					</CardFooter>
				) : (
					<CardFooter className={styles.pricemobileButtonRow}>
						{bagPrice && (
							<Typography
								type="Body"
								variant={1}
								color="gray"
								fontWeight="medium"
								label={`${currency}${bagPrice}`}
							/>
						)}
						{moveToBag && (
							<Button
								variant="icon"
								className={styles.moveToBagMobileButton}
								onClick={(e) => {
									e.stopPropagation();
									productId && onMoveToBag?.(productId);
								}}
							>
								<Typography
									type="Body"
									variant={2}
									label={t("move-to-bag")}
									fontWeight="medium"
									color="black"
								/>
							</Button>
						)}
					</CardFooter>
				)}
			</Card>
		</div>
	);
};

export default ProductCard;

/**
 * ## ProductCard
 *
 * The `ProductCard` component displays a product in a card layout with an image, title, description, price,
 * and optional action buttons. It supports responsive behavior and can be used across product listings, wishlists,
 * and other commerce-related views.
 *
 *
 * ### Props
 *
 * #### `productId?: string`
 * - Optional. Unique identifier for the product, used in event callbacks like click or button actions.
 *
 * #### `alignment?: "center" | "alignStart" | "alignEnd"`
 * - Optional. Alignment of the card content (`productTitle`, `productDesc`, and `price`). Defaults to `"center"`.
 *
 * #### `width?: number | string`
 * - Optional. Width of the card. Can be a number (pixels) or string (e.g., `"100%"`).
 *
 * #### `productImage: string`
 * - Required. URL of the main product image.
 *
 * #### `productTitle?: string`
 * - Optional. Name/title of the product.
 *
 * #### `productDesc?: string`
 * - Optional. Description or secondary text below the product title (usually a link).
 *
 * #### `price?: string`
 * - Optional. Price displayed under the description (used in regular listing views).
 *
 * #### `currency?: string`
 * - Optional. Currency symbol prefixed to `price` or `bagPrice` (e.g., `"$"`).
 *
 * #### `moveToBag?: boolean`
 * - Optional. If `true`, shows a "Move to Bag" button (typically in wishlist views).
 *
 * #### `wishListed?: boolean`
 * - Optional. If `true`, displays a filled wishlist icon overlay.
 *
 * #### `bagPrice?: string`
 * - Optional. Alternate price display used in the footer, commonly shown in wishlist or bag views.
 *
 * #### `onClick?: (productId: string) => void`
 * - Optional. Callback fired when the card itself is clicked.
 *
 * #### `onButtonClick?: (productId: string) => void`
 * - Optional. Callback fired when the linked `productDesc` is clicked.
 *
 * #### `onMoveToBag?: (productId: string) => void`
 * - Optional. Callback fired when the "Move to Bag" button is clicked.
 *
 *
 * ### Behavior
 *
 * - **Image & Wishlist**:
 *   - Always renders the product image.
 *   - Renders a wishlist icon if `wishListed` is `true`.
 *
 * - **Card Content**:
 *   - Displays product title, optional description (as a clickable link), and price if provided.
 *   - Aligns content based on the `alignment` prop.
 *
 * - **Responsive Footer**:
 *   - On **desktop**, shows `bagPrice` and "Move to Bag" button side by side.
 *   - On **mobile**, the same layout is stacked with adjusted styles for smaller screens.
 *
 *
 * ### Styling (CSS Modules: `ProductCard.module.css`)
 *
 * - `imageWrapper`: Styles the image section.
 * - `productImage`: Controls the sizing and cropping of the main image.
 * - `wishlistIcon`: Positioned overlay icon for wishlist status.
 * - `cardContent`: Wrapper for the title, description, and price.
 * - `spacing`: Applies vertical spacing between elements.
 * - `priceButtonRow` / `pricemobileButtonRow`: Footer layout containers (desktop/mobile).
 * - `moveToBagButton` / `moveToBagMobileButton`: Button styles for "Move to Bag".
 *
 *
 * ### Dependencies
 *
 * - `Card`, `CardHeader`, `CardContent`, `CardFooter`: Atomic layout components.
 * - `Typography`: Used for all text content for consistent style.
 * - `Button`: Used for "Move to Bag" and linked description.
 * - `next/image`: Optimized image rendering.
 *
 *
 * ### Example Usage
 *
 * ```tsx
 * <ProductCard
 *   productId="abc123"
 *   alignment="alignStart"
 *   productImage="/images/shoe.png"
 *   productTitle="Running Shoes"
 *   productDesc="Explore details"
 *   price="129.99"
 *   currency="$"
 *   wishListed={true}
 *   moveToBag={true}
 *   bagPrice="129.99"
 *   onClick={(id) => console.log("View product:", id)}
 *   onButtonClick={(id) => console.log("Clicked description for:", id)}
 *   onMoveToBag={(id) => console.log("Moved to bag:", id)}
 * />
 * ```
 *
 * ### Notes
 *
 * - The card is fully clickable unless you interact with the `Button` elements, which stop propagation.
 * - Best used within product grids or wishlist views.
 */
