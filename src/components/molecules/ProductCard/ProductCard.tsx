import React from "react";
import { Button } from "@/components/atomic/button/button";
import { Card, CardContent, CardHeader } from "@/components/atomic/Card/Card";
import Typography from "@/components/atomic/Typography/Typography";
import styles from "./ProductCard.module.css"; 

type Alignment = "center" | "alignStart" | "alignEnd";

interface ProductCardProps {
  alignment?: Alignment;
  width?:number | string; 
  productImage?:string;
  productTitle?:string;
  productDesc?:string;
}
const ProductCard = ({ alignment = "center", width, productImage, productTitle, productDesc }:ProductCardProps) => {
  return (
    <div>
      <Card width={width}>
        <CardHeader>
          <img src={productImage} alt="product" />
        </CardHeader>
        <CardContent className={`${styles.cardContent} ${styles[alignment]}`}>
            <Typography
              type={"Headline"}
              variant={5}
              label={productTitle}
              fontWeight="regular"
              color="black"
            />
            <div style={{ paddingTop: "10px" }}>
              <Button variant="link">
                <Typography
                  type={"Body"}
                  variant={2}
                  label={productDesc}
                  fontWeight="medium"
                  color="black"
                />
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;


/**
 * ## ProductCard Component
 *
 * The `ProductCard` component is designed to display a product's image, title, and description 
 * in a card format. It offers customizable alignment, width, and optional content such as a 
 * product image, title, and description. The component is flexible and can be used to showcase 
 * products in various layouts, such as e-commerce websites or product catalog pages.
 *
 * ### Props:
 * - **`alignment` (optional, "center" | "alignStart" | "alignEnd")**: Determines the alignment 
 *   of the content inside the card. The available options are:
 *   - `center`: Centers the content within the card.
 *   - `alignStart`: Aligns the content to the start (left) of the card.
 *   - `alignEnd`: Aligns the content to the end (right) of the card.
 *   Default is `"center"`.
 *
 * - **`width` (optional, number | string)**: The width of the card. This can be specified in 
 *   pixels (e.g., `400`) or as a string with units (e.g., `'50%'`). If not provided, the default 
 *   width of the card is used.
 * 
 * - **`productImage` (optional, string)**: The URL or path to the product's image. This image 
 *   will be displayed in the card's header.
 * 
 * - **`productTitle` (optional, string)**: The title or name of the product, which will be 
 *   displayed in the card's content section as a headline.
 * 
 * - **`productDesc` (optional, string)**: A short description or summary of the product, which 
 *   will be displayed below the title in the card content. It is wrapped in a link-styled button.
 *
 * 
 */
