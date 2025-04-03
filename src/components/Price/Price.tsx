import React from 'react';
import Typography from '../Typography/Typography';
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
