import React from 'react';
import Typography from '../../atomic/Typography/Typography';
import styles from './Price.module.css';

interface PriceProps {
  price: number;
  priceAfterDiscount: number;
  currency: string;
}

const Price = ({ price, priceAfterDiscount, currency }: PriceProps) => {
  return (
    <div className={styles.priceContainer}>
      <Typography
        type="Body" 
        variant={1} 
        color="gray" 
        fontWeight="medium" 
        textDecoration="line-through" 
        label={`${currency}${price}`} 
      />
      <Typography
        type="Body" 
        variant={1} 
        fontWeight="bold" 
        label={`${currency}${priceAfterDiscount}`} 
      />
    </div>
  );
};

export default Price;

/**
 * ## Price Component
 *
 * The `Price` component is used to display the original price and the discounted price (if applicable) 
 * of a product or item. It visually distinguishes the original price by crossing it out (using the 
 * `line-through` text decoration) and displays the discounted price in a bold font.
 *
 * ### Props:
 * - **`price` (number)**: The original price of the item or product before any discounts.
 * - **`priceAfterDiscount` (number)**: The price of the item after applying a discount.
 * - **`currency` (string)**: The currency symbol or code that will be used to prefix both the original price and the discounted price (e.g., `$`, `€`, `£`).
 * 
 * ### Component Behavior:
 * - The original price is displayed with a **strikethrough** (`line-through` text decoration) to indicate that it is the former price.
 * - The discounted price is displayed next to the original price in a bold style to emphasize the new price.
 * 
 */

