"use client";
import { Button } from "@/components/atomic/button/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/molecules/Drawer/Drawer";
import React from "react";
import styles from "./MiniCart.module.css";
import Typography from "@/components/atomic/Typography/Typography";
import QuantitySelector from "@/components/atomic/QuantitySelector/QuantitySelector";
import CartItemList from "@/components/molecules/CartItemList/CartItemList";
export interface CartItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
}

interface MiniCartProps {
  cartItems: CartItem[];
  onDeleteItem?: (itemId: string) => void;
  onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
  onViewBag?: () => void;
}

const MiniCart = ({
  cartItems,
  onDeleteItem,
  onUpdateQuantity,
  onViewBag,
}: MiniCartProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary" className={styles.cartButton}>
          Add To Bag
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader className={styles.bagHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <DrawerTitle>
              {" "}
              <Typography
                type={"Label"}
                variant={3}
                fontWeight="medium"
                label="BAG"
              />
            </DrawerTitle>

            {cartItems.length > 0 && (
              <Typography
                type={"Body"}
                variant={3}
                label={`${cartItems.length} items`}
                color="#75757a"
              />
            )}
          </div>

          <DrawerClose className={styles.close} asChild>
            <img src="images/expand.svg" alt="Close" />
          </DrawerClose>
        </DrawerHeader>
        {cartItems.length > 0 ? (
          <>
            <CartItemList
              cartItems={cartItems}
              onDeleteItem={onDeleteItem}
              onUpdateQuantity={onUpdateQuantity}
              miniCart={true}
            />

            <DrawerFooter>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "18px",
                  paddingBottom: "20px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Typography
                    type={"Label"}
                    variant={3}
                    fontWeight="medium"
                    label="SUBTOTAL"
                  />
                  <Typography
                    type={"Body"}
                    variant={3}
                    label="(including taxes)"
                    color="#75757a"
                  />
                </div>
                <Typography type="Label" variant={3} label="$100" />
              </div>
              <Button
                variant="icon"
                className={styles.viewbag}
                onClick={onViewBag}
              >
                VIEW BAG
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <div className={styles.emptyMessage}>
            <img src="images/emptyBag.svg" alt=" Empty Bag" />
            <Typography
              type="Body"
              variant={2}
              label="There is nothing in your bag."
              color="#75757a"
            />
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default MiniCart;
