"use client";
import React, { useState } from "react";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import styles from "./ProductImageCarousel.module.css";

type Alignment = "center" | "alignStart" | "alignEnd";
interface LayoutProps {
  productData: {
    productImage: string;
    productTitle: string;
    productDesc?: string;
    price?: string;
    currency?: string;
    wishListed?: boolean;
    bagPrice?: string;
  }[];
  cardsPerRow: number;
  width?: string | number;
  alignment?: Alignment;
  moveToBag?: boolean;
  withPagination?:boolean
}
const ProductImageCarousel = ({
  productData,
  cardsPerRow,
  width,
  alignment,
  moveToBag,
  withPagination,
}: LayoutProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalGroups = Math.ceil(productData.length / cardsPerRow);
  const visibleItems = withPagination
    ? productData.slice(
        activeIndex * cardsPerRow,
        (activeIndex + 1) * cardsPerRow
      )
    : productData;
  return (
    <>
    <div
      className={`${styles.cardLayout}`}
      style={{ gridTemplateColumns: `repeat(${cardsPerRow}, auto)` }}
    >
      {visibleItems.map((product, index) => (
        <ProductCard
          key={index}
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
        />
      ))}
    </div>
    {withPagination && productData?.length>4 &&<div className={styles.dotsContainer}>
        {Array.from({ length: totalGroups }).map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ""}`}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>}
    </>
  );
};

export default ProductImageCarousel;

/**
 * ## ProductImageCarousel
 *
 * The `ProductImageCarousel` component is a carousel-like component that displays a list of `ProductCard` components in a grid layout. It is designed to showcase products with various attributes such as images, titles, descriptions, prices, and wishlisted status. It also allows for flexible configuration in terms of how many cards are displayed per row, alignment, and whether or not the "Move to Bag" action is shown.
 *
 * ### Props
 *
 * - **productData** (`array`): An array of product objects that each contain the following properties:
 *   - **productImage** (`string`): The URL of the product image.
 *   - **productTitle** (`string`): The title of the product.
 *   - **productDesc** (`string`, optional): A description of the product.
 *   - **price** (`string`, optional): The price of the product.
 *   - **currency** (`string`, optional): The currency symbol/code for the product's price.
 *   - **wishListed** (`boolean`, optional): Whether the product is wishlisted.
 *   - **bagPrice** (`string`, optional): The price of the product in the bag.
 *
 * - **cardsPerRow** (`number`): The number of product cards to display per row in the carousel.
 * - **width** (`string | number`, optional): The width of each product card.
 * - **alignment** (`"center" | "alignStart" | "alignEnd"`, optional): Controls the alignment of the product cards. Available values:
 *   - `center` (default)
 *   - `alignStart`
 *   - `alignEnd`
 *
 * - **moveToBag** (`boolean`, optional): If `true`, the "Move to Bag" button will be displayed on each product card.
 *
 * ### Component Behavior
 *
 * - The `ProductImageCarousel` renders a grid layout with a dynamic number of product cards based on the `cardsPerRow` prop.
 * - Each `ProductCard` is passed data from the `productData` prop, including details like the product image, title, description, price, and wishlisted status.
 * - The carousel layout is responsive and adjusts based on the number of cards per row, which is determined by the `cardsPerRow` prop.
 * - The `width` and `alignment` props allow you to customize the appearance of the cards, while the `moveToBag` prop controls whether or not the "Move to Bag" button is displayed.
 *
 * ### Example Usage
 *
 * Here's an example of how to use the `ProductImageCarousel` component:
 *
 * ```tsx
 *       <ProductImageCarousel
 *         productData={exampleProductData}
 *         cardsPerRow={3}
 *         width={250}
 *         alignment="center"
 *         moveToBag={true}
 *       />
 * ```
 *
 */
 
 