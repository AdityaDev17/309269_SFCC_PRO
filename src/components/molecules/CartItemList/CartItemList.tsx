'use client';
import React, { useEffect, useState } from 'react';
import styles from './CartItemList.module.css';
import Typography from '../../atomic/Typography/Typography';
import QuantitySelector from '../../atomic/QuantitySelector/QuantitySelector';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  currency: string;
  productImage: string;
}

interface CartItemListProps {
  cartItems: CartItem[];
  onDeleteItem?: (itemId: string) => void;
  onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
  miniCart?: boolean;
  orderQuantity?: boolean;
  isWhiteBackground?: boolean;
}

const CartItemList = ({ cartItems, onDeleteItem, onUpdateQuantity, miniCart, orderQuantity , isWhiteBackground}: CartItemListProps) => {
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
  {cartItems.map((item) => (
  <div key={item.id} className={`${styles.bagContent} ${isWhiteBackground ? styles.whiteBackground : ''}`}>
    <div className={styles.cartItem}>
      <div className={styles.productImageWrapper}>
        <Image
          src={item.productImage}
          alt="cart Image"
          width={140}
          height={140}
          className={styles.productImage}
          loading='eager'
        />
      </div>

      <div style={{ flex: 1 }}>
        <Typography type="Body" variant={2} fontWeight="semibold" label={item.name} />
        {item.description && (
          <Typography type="Body" variant={2} fontWeight="semibold" label={item.description} />
        )}

        <div className={styles.quantity}>
          {!isMobile && (
            <Typography
              type="Body"
              variant={2}
              label={orderQuantity ? `Quantity: ${item.quantity}` : 'Quantity'}
              color="#4f4b53"
            />
          )}

          {orderQuantity && (
            <div className={styles.orderPrice}>
              <Typography
                type="Label"
                variant={3}
                label={`${item.currency} ${item.price}`}
              />
            </div>
          )}

          {miniCart && (
            <div className={styles.miniCartControls}>
              <div className={styles.miniCartLeft}>
                <QuantitySelector
                  updateQuantity={true}
                  onQuantityChange={(newQty) => onUpdateQuantity?.(item.id, newQty)}
                  qty={item.quantity}
                />
                <Image
                  src="/images/delete.svg"
                  alt="Delete"
                  onClick={() => onDeleteItem?.(item.id)}
                  className={styles.deleteIcon}
                  width={24}
                  height={24}
                />
              </div>
              <Typography
                type="Label"
                variant={3}
                label={`${item.currency} ${item.quantity * item.price}`}
                color="#4f4b53"
              />
            </div>
          )}

          {!miniCart && !orderQuantity &&  (
            <div className={styles.fullCartControls}>
              {!isMobile && (
                <div className={styles.fullCartLeft}>
                  <QuantitySelector
                    updateQuantity={true}
                    onQuantityChange={(newQty) => onUpdateQuantity?.(item.id, newQty)}
                    qty={item.quantity}
                  />
                  <button className={styles.wishlistBtn}>Move to Wishlist</button>
                  <div className={styles.deleteWrapper}>
                    <Image
                      src="/images/delete.svg"
                      alt="Delete"
                      onClick={() => onDeleteItem?.(item.id)}
                      className={styles.deleteIcon}
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              )}
              <Typography
                type="Label"
                variant={3}
                label={`${item.currency} ${item.price}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    {isMobile && !miniCart && !orderQuantity &&(
      <div>
        <Typography
            type="Body"
            variant={2}
            label={'Quantity'}
            color="#4f4b53"
          />
      <div className={styles.mobileCartLeft}>
        <QuantitySelector
          updateQuantity={true}
          onQuantityChange={(newQty) => onUpdateQuantity?.(item.id, newQty)}
          qty={item.quantity}
        />
        <button className={styles.wishlistBtn}>Move to Wishlist</button>
        <div className={styles.deleteWrapper}>
          <Image
            src="/images/delete.svg"
            alt="Delete"
            onClick={() => onDeleteItem?.(item.id)}
            className={styles.deleteIcon}
            width={24}
            height={24}
          />
        </div>
      </div>
      </div>
    )}
  </div>
))}

     </div>
  );
};

export default CartItemList;
