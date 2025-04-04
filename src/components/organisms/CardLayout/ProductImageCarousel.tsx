import React from 'react'
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import styles from './ProductImageCarousel.module.css'

type Alignment = "center" | "alignStart" | "alignEnd";
interface LayoutProps {
    productData: {
      productImage: string;
      productTitle: string;
      productDesc: string;
    }[];
    cardsPerRow: number ;
    width?:string | number;
    alignment?:Alignment;
  }
  
  const  ProductImageCarousel= ({ productData, cardsPerRow ,width,alignment}: LayoutProps) => {
  
    return (
        <div className={`${styles.cardLayout}`} style={{ gridTemplateColumns: `repeat(${cardsPerRow}, auto)` }}>
        {productData.map((product, index) => (
          <ProductCard
            key={index}
            productImage={product.productImage}
            productTitle={product.productTitle}
            productDesc={product.productDesc}
            width={width} 
            alignment={alignment}
          />
        ))}
      </div>
    );
  };
  
  export default ProductImageCarousel;




  /**
 * ## ProductImageCarousel Component
 *
 * The `ProductImageCarousel` component is designed to display a collection of product cards in a 
 * carousel-style grid. It arranges the `ProductCard` components in rows, with each row containing 
 * a specified number of cards, based on the `cardsPerRow` prop. This component is ideal for displaying 
 * products in a visually appealing grid layout on e-commerce or catalog pages.
 *
 * ### Props:
 * - **`productData` (Array of Objects)**: An array of product data, where each object represents 
 *   a product and contains the following properties:
 *   - `productImage` (string): The URL or path to the product's image.
 *   - `productTitle` (string): The title or name of the product.
 *   - `productDesc` (string): A short description of the product.
 * 
 * - **`cardsPerRow` (number)**: The number of `ProductCard` components to display in each row of 
 *   the carousel/grid. This allows for a flexible number of cards per row depending on the screen size 
 *   or layout requirements.
 * 
 * - **`width` (optional, string | number)**: The width of each product card in the carousel. This can 
 *   be specified in pixels (e.g., `400`) or as a string with units (e.g., `'50%'`).
 * 
 * - **`alignment` (optional, "center" | "alignStart" | "alignEnd")**: Determines the alignment of 
 *   the content within each individual `ProductCard`. The available options are:
 *   - `center`: Centers the content.
 *   - `alignStart`: Aligns the content to the left.
 *   - `alignEnd`: Aligns the content to the right.
 *   Default is `"center"`.
 *
 * 
 * 
 */
