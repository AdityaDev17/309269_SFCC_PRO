"use client";
import React, { useState, useRef, useEffect } from "react";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import styles from "./ProductImageCarousel.module.css";

type Alignment = "center" | "alignStart" | "alignEnd";
interface LayoutProps {
	productData: {
		productId: string;
		productImage: string;
		productTitle?: string;
		productDesc?: string;
		price?: string;
		currency?: string;
		wishListed?: boolean;
		bagPrice?: string;
		itemId?: string;
		listId?: string;
	}[];
	width?: string | number;
	alignment?: Alignment;
	moveToBag?: boolean;
	withPagination?: boolean;
	onCardClick?: (productId: string) => void;
	onButtonClick?: (productId: string) => void;
	onMoveToBag?: (productId: string, itemId: string, listId: string) => void;
	removeFromWishListHandler?: ( itemId: string, listId: string) => void ;
}

const ProductImageCarousel = ({
	productData,
	width,
	alignment,
	moveToBag,
	withPagination,
	onCardClick,
	onButtonClick,
	onMoveToBag,
	removeFromWishListHandler
}: LayoutProps) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const cardsPerPage = 4;
	const totalGroups = Math.ceil(productData.length / cardsPerPage);

	const visibleItems = withPagination
		? productData.slice(
				activeIndex * cardsPerPage,
				(activeIndex + 1) * cardsPerPage,
			)
		: productData;

	useEffect(() => {
		if (!withPagination || !scrollRef.current) return;

		const container = scrollRef.current;

		const onScroll = () => {
			const scrollLeft = container.scrollLeft;
			const cardWidth = container.scrollWidth / productData.length;
			const newIndex = Math.round(scrollLeft / (cardWidth * cardsPerPage));
			setActiveIndex(newIndex);
		};

		container.addEventListener("scroll", onScroll);
		return () => container.removeEventListener("scroll", onScroll);
	}, [productData.length, withPagination]);

	const scrollToGroup = (index: number) => {
		if (scrollRef.current) {
			const container = scrollRef.current;
			const cardWidth = container.scrollWidth / productData.length;
			container.scrollTo({
				left: index * cardsPerPage * cardWidth,
				behavior: "smooth",
			});
		}
		setActiveIndex(index);
	};

	return (
		<div className={styles.layoutContainer}>
			{withPagination ? (
				<div className={styles.scrollContainer} ref={scrollRef}>
					<div className={styles.horizontalRow}>
						{productData.map((product) => (
							<ProductCard
								key={product.productId}
								productId={product.productId}
								productImage={product.productImage}
								productTitle={product.productTitle}
								productDesc={product.productDesc}
								price={product.price}
								currency={product.currency}
								bagPrice={product.bagPrice}
								wishListed={product.wishListed}
								width={width}
								alignment={alignment}
								moveToBag={moveToBag}
								itemId={product.itemId}
								listId={product.listId}
								onClick={
									onCardClick ? () => onCardClick(product.productId) : undefined
								}
								onButtonClick={
									onButtonClick
										? () => onButtonClick(product.productId)
										: undefined
								}
								onMoveToBag={
									onMoveToBag
										? () =>
												onMoveToBag(
													product.productId,
													product.itemId as string,
													product.listId as string,
												)
										: undefined
								}
								removeFromWishListHandler={removeFromWishListHandler}
							/>
						))}
					</div>
				</div>
			) : (
				<div className={styles.cardLayout}>
					{productData.map((product) => (
						<ProductCard
							key={product.productId}
							productId={product.productId}
							productImage={product.productImage}
							productTitle={product.productTitle}
							productDesc={product.productDesc}
							price={product.price}
							currency={product.currency}
							bagPrice={product.bagPrice}
							wishListed={product.wishListed}
							width={width}
							alignment={alignment}
							moveToBag={moveToBag}
							itemId={product.itemId}
							listId={product.listId}
							onClick={
								onCardClick ? () => onCardClick(product.productId) : undefined
							}
							onButtonClick={
								onButtonClick
									? () => onButtonClick(product.productId)
									: undefined
							}
							onMoveToBag={
								onMoveToBag
									? () =>
											onMoveToBag(
												product.productId,
												product.itemId as string,
												product.listId as string,
											)
									: undefined
							}
							removeFromWishListHandler={removeFromWishListHandler}
						/>
					))}
				</div>
			)}

			{withPagination && productData?.length > cardsPerPage && (
				<div className={styles.dotsContainer}>
					{Array.from({ length: totalGroups }).map((_, idx) => {
						const firstProductIndex = idx * cardsPerPage;
						const productId =
							productData[firstProductIndex]?.productId ?? `fallback-${idx}`;
						return (
							<span
								key={`dot-${productId}`}
								role="button"
								tabIndex={0}
								className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ""}`}
								onClick={() => scrollToGroup(idx)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										scrollToGroup(idx);
									}
								}}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ProductImageCarousel;

/**
 * ## ProductImageCarousel
 *
 * The `ProductImageCarousel` component displays a horizontally scrollable collection of `ProductCard` components,
 * optionally with pagination controls. It can be used to showcase product recommendations, related items, or
 * curated collections.
 *
 * ### Props
 *
 * - `productData` **(required)**: An array of product objects containing:
 *   - `productId`: Unique identifier of the product.
 *   - `productImage`: Image URL of the product.
 *   - `productTitle` (optional): Title/name of the product.
 *   - `productDesc` (optional): Description or subtext of the product.
 *   - `price` (optional): Price of the product.
 *   - `currency` (optional): Currency for the price.
 *   - `bagPrice` (optional): Alternate pricing for bag/checkout context.
 *   - `wishListed` (optional): Indicates if the item is wishlisted.
 *
 * - `width` (optional): Width of each individual `ProductCard`. Accepts string or number.
 * - `alignment` (optional): Alignment of content inside the card. Options: `"center"`, `"alignStart"`, `"alignEnd"`.
 * - `moveToBag` (optional): Enables a "Move to Bag" button on the product card if `true`.
 * - `withPagination` (optional): Enables scroll-based pagination and dot indicators. Defaults to `false`.
 * - `onCardClick` (optional): Callback triggered when a product card is clicked, receives the `productId`.
 * - `onButtonClick` (optional): Callback for a product card's action button, receives the `productId`.
 * - `onMoveToBag` (optional): Callback for the "Move to Bag" action, receives the `productId`.
 *
 * ### Behavior
 *
 * - Without `withPagination`, all product cards are rendered in a flexible row layout.
 * - With `withPagination`, cards are grouped by 4 per page, and the user can navigate using pagination dots.
 * - Pagination scroll syncs with the carousel and updates the active dot based on scroll position.
 * - Product cards support interactions via optional `onCardClick`, `onButtonClick`, and `onMoveToBag`.
 *
 * ### Used Components
 *
 * - `ProductCard`: Reusable card that renders product image, title, price, and interactive buttons.
 * - `Image` (Next.js): Optimized image rendering for product visuals.
 *
 * ### Example
 *
 * ```tsx
 * <ProductImageCarousel
 *   productData={[
 *     {
 *       productId: "123",
 *       productImage: "/images/shoe1.jpg",
 *       productTitle: "Running Shoe",
 *       price: "99.99",
 *       currency: "USD",
 *     },
 *     // more products...
 *   ]}
 *   width={250}
 *   alignment="center"
 *   moveToBag={true}
 *   withPagination={true}
 *   onCardClick={(id) => console.log("Clicked product", id)}
 * />
 * ```
 */
