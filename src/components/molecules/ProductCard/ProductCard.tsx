
'use client';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/atomic/Button/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/atomic/Card/Card";
import Typography from "@/components/atomic/Typography/Typography";
import styles from "./ProductCard.module.css";
import Image from "next/image";

type Alignment = "center" | "alignStart" | "alignEnd";

interface ProductCardProps {
  productId?: string;
  alignment?: Alignment;
  width?: number | string;
  productImage: string;
  productTitle?: string;
  productDesc?: string;
  price?: string;
  currency?: string;
  moveToBag?: boolean;
  wishListed?: boolean;
  bagPrice?: string;
  onClick?: (productId: string) => void;       
  onButtonClick?: (productId: string) => void; 
  onMoveToBag?: (productId: string) => void; 
}
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
}: ProductCardProps) => {

  const [isMobile, setIsMobile] = useState(false);

  const checkMobileView = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);
  return (
    <div>
    <Card width={width} onClick={() =>productId && onClick?.(productId)}>
  <CardHeader className={styles.imageWrapper}>
    <Image
      src={productImage}
      alt="product"
      className={styles.productImage}
      width={440}
      height={440}
      loading="eager"
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
              productId &&  onButtonClick?.(productId);
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
            label={`${currency}${price}`}
          />
        </div>
      )}
    </CardContent>
  )}

  {!isMobile ?(<CardFooter className={styles.priceButtonRow}>
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
          productId &&   onMoveToBag?.(productId);
        }}
      >
        <Typography
          type="Body"
          variant={2}
          label="Move to Bag"
          fontWeight="medium"
          color="black"
        />
      </Button>
    )}
  </CardFooter>) :(
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
          productId &&  onMoveToBag?.(productId);
        }}
      >
        <Typography
          type="Body"
          variant={2}
          label="Move to Bag"
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
 * The ProductCard component is a flexible and reusable component designed to display product information such as an image, title, description, price, and additional actions like adding to the bag or wishlisting. It can be customized in terms of alignment, size, and various product details.
 *
 * ### Props
 *
 * - **alignment** (`"center" | "alignStart" | "alignEnd"`, optional): Controls the alignment of the content inside the card. Available values:
 *   - `"center"`: Centers the content (default).
 *   - `"alignStart"`: Aligns the content to the start (left).
 *   - `"alignEnd"`: Aligns the content to the end (right).
 *
 * - **width** (`number | string`, optional): Sets the width of the `ProductCard`. Can be a pixel value (`'px'`) or percentage.
 *
 * - **productImage** (`string`): The URL of the product image to be displayed on the card.
 *
 * - **productTitle** (`string`): The title/name of the product.
 *
 * - **productDesc** (`string`, optional): A short description of the product. If provided, it will be displayed under the product title.
 *
 * - **price** (`string`, optional): The price of the product, displayed below the product description.
 *
 * - **currency** (`string`, optional): The currency symbol or code used for displaying the price (e.g., `$`, `€`, etc.). Defaults to an empty string if not provided.
 *
 * - **moveToBag** (`boolean`, optional): If `true`, shows a "Move to Bag" button. Defaults to `false`.
 *
 * - **wishListed** (`boolean`, optional): If `true`, a "wishlist" icon is displayed on the product image.
 *
 * - **bagPrice** (`string`, optional): The price of the product in the bag, displayed in the footer if provided.
 *
 * ### Component Behavior
 *
 * - The card will render a product image, product title, description, price, and optional "Move to Bag" button based on the props provided.
 * - The alignment of the content can be controlled using the `alignment` prop, which allows the text and buttons to be aligned in different ways (centered, left-aligned, or right-aligned).
 * - If `wishListed` is `true`, a wishlist icon is shown in the header of the card.
 * - If `moveToBag` is `true`, the "Move to Bag" button is shown at the bottom of the card.
 * - If `bagPrice` is provided, it will display the price in the card footer.
 *
 * ### Example Usage
 *
 * Here's a simple example of how to use the `ProductCard` component:
 *
 * ```tsx
 *       <ProductCard
 *         alignment="center"
 *         productImage="https://via.placeholder.com/150"
 *         productTitle="Sample Product"
 *         productDesc="This is a description of the product."
 *         price="29.99"
 *         currency="$"
 *         moveToBag={true}
 *         wishListed={true}
 *         bagPrice="25.99"
 *       />
 *
 * ```
 *
 */
