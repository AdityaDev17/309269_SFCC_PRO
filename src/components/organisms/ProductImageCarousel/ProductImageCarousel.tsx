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
  }[];
  width?: string | number;
  alignment?: Alignment;
  moveToBag?: boolean;
  withPagination?:boolean;
  onCardClick?: (productId: string) => void;
  onButtonClick?: (productId: string) => void;
  onMoveToBag?: (productId: string) => void;
}


const ProductImageCarousel = ({
  productData,
  width,
  alignment,
  moveToBag,
  withPagination,
  onCardClick,
  onButtonClick,
  onMoveToBag
}: LayoutProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardsPerPage = 4;
  const totalGroups = Math.ceil(productData.length / cardsPerPage);

  const visibleItems = withPagination
    ? productData.slice(activeIndex * cardsPerPage, (activeIndex + 1) * cardsPerPage)
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
            {productData.map((product, index) => (
              <div className={styles.cardWrapper} key={index}>
                <ProductCard
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
                  onClick={onCardClick ? () => onCardClick(product.productId) : undefined}
                  onButtonClick={onButtonClick ? () => onButtonClick(product.productId) : undefined}
                  onMoveToBag={onMoveToBag ? () => onMoveToBag(product.productId) : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.cardLayout}>
          {productData.map((product, index) => (
            <ProductCard
              key={index}
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
              onClick={onCardClick ? () => onCardClick(product.productId) : undefined}
              onButtonClick={onButtonClick ? () => onButtonClick(product.productId) : undefined}
              onMoveToBag={onMoveToBag ? () => onMoveToBag(product.productId) : undefined}
            />
          ))}
        </div>
      )}

      {withPagination && productData?.length > cardsPerPage && (
        <div className={styles.dotsContainer}>
          {Array.from({ length: totalGroups }).map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ""}`}
              onClick={() => scrollToGroup(idx)}
            />
          ))}
        </div>
      )}
    </div>
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
 
 