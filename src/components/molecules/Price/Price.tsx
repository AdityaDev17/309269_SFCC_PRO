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
 * # Price Component
 *
 * The `Price` component is used to display the original price and the discounted price of a product. It shows the original price with a strikethrough and the discounted price in bold.
 *
 * ## Props
 *
 * - **price** (`number`): The original price of the product.
 * - **priceAfterDiscount** (`number`): The price of the product after applying any discounts.
 * - **currency** (`string`): The currency symbol or code (e.g., "$", "€") used to display the price.
 *
 * ## Component Behavior
 *
 * - The original price is displayed with a strikethrough effect to indicate that it is no longer applicable.
 * - The discounted price is displayed prominently in bold to highlight the new price.
 * - Both the original price and the discounted price are prefixed with the currency symbol provided by the `currency` prop.
 *
 * ## Example Usage
 *
 * Here's a simple example of how to use the `Price` component:
 *
 * ```tsx
 * import React from 'react';
 * import Price from './Price'; // Adjust the import path as needed
 *
 * const Example = () => {
 *   return (
 *     <div>
 *       <Price 
 *         price={100} 
 *         priceAfterDiscount={80} 
 *         currency="$" 
 *       />
 *     </div>
 *   );
 * };
 * ```
 *
 * In this example:
 * - The original price is `$100` (with a strikethrough).
 * - The discounted price is `$80` (displayed in bold).
 *
 * ## Dynamic Behavior
 * - The `Price` component conditionally renders both the original price and the discounted price based on the props provided.
 * - If no discount is provided, you may set the `priceAfterDiscount` equal to the original `price` to show only one price.
 */


