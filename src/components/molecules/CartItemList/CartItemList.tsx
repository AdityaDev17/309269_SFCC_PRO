'use client';
import React from 'react';
import styles from './CartItemList.module.css';
import Typography from '@/components/atomic/Typography/Typography';
import QuantitySelector from '@/components/atomic/QuantitySelector/QuantitySelector';

interface CartItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  currency: string;
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
  return (
    <div className={`${styles.bagContent} ${isWhiteBackground ? styles.whiteBackground : ''}`}>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <img
            src="images/cartImage.svg"
            alt="cart Image"
            style={{ border: '1px solid #cccbce'}}
          />
          
          <div style={{ flex: 1 }}>
            <Typography type="Body" variant={2} fontWeight="semibold" label={item.name} />
            {item.description && (
              <Typography type="Body" variant={2} fontWeight="semibold" label={item.description} />
            )}

            <div className={styles.quantity}>
              {/* Label for Quantity */}
              <Typography
                type="Body"
                variant={2}
                label={orderQuantity ? `Quantity: ${item.quantity}` : 'Quantity'}
                color="#4f4b53"
              />

              {/* Display only price for order summary */}
              {orderQuantity && (
                <div className={styles.orderPrice}>
                  <Typography
                    type="Label"
                    variant={3}
                    label={`${item.currency} ${item.price}`}
                  />
                </div>
              )}

              {/* Mini cart controls (qty selector + delete + price) */}
              {miniCart && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <QuantitySelector
                      updateQuantity={true}
                      onQuantityChange={(newQty) => onUpdateQuantity?.(item.id, newQty)}
                      qty={item?.quantity}
                    />
                    <img
                      src="images/delete.svg"
                      alt="Delete"
                      onClick={() => onDeleteItem?.(item.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <Typography
                    type="Label"
                    variant={3}
                    label={`${item.currency} ${item.quantity *item.price}`}
                    color="#4f4b53"
                  />
                </div>
              )}

              {/* Full cart controls: dropdown, wishlist, delete, price */}
              {!miniCart && !orderQuantity && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex',gap:'10px'}}>
                  <QuantitySelector
                      updateQuantity={true}
                      onQuantityChange={(newQty) => onUpdateQuantity?.(item.id, newQty)}
                      qty={item?.quantity}
                    />
                  <button className={styles.wishlistBtn}>Move to Wishlist</button>
                  <img
                      src="images/delete.svg"
                      alt="Delete"
                      onClick={() => onDeleteItem?.(item.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
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
      ))}
    </div>
  );
};


export default CartItemList;
