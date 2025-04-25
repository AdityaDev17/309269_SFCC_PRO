"use client";
import { Button } from "../../atomic/Button/Button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "../../molecules/Drawer/Drawer";
import React from "react";
import styles from "./MiniCart.module.css";
import Typography from "../../atomic/Typography/Typography";
import CartItemList from "../../molecules/CartItemList/CartItemList";
import Image from "next/image";
export interface CartItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
  productImage: string;
}

interface MiniCartProps {
  cartItems: CartItem[];
  onDeleteItem?: (itemId: string) => void;
  onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
  onViewBag?: () => void;
  triggerType?: "button" | "icon";
  bagIcon?:string;
}

const MiniCart = ({
  cartItems,
  onDeleteItem,
  onUpdateQuantity,
  onViewBag,
  triggerType,
  bagIcon
}: MiniCartProps) => {
  const [open, setOpen] = React.useState(false);
  const handleViewBag = () => {
    if (onViewBag) {
      onViewBag(); 
    }
    setOpen(false);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
     <DrawerTrigger asChild>
  {triggerType === "icon" && bagIcon ? (
    <Image
      src={bagIcon}
      alt="Open Cart"
      width={20}
      height={20}
      className={styles.bagIcon}
    />
  ) : (
    <Button variant="secondary" className={styles.cartButton}>
      Add To Bag
    </Button>
  )}
</DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader className={styles.bagHeader}>
          <div className={styles.bagWrapper}>
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
            <Image src="/images/expand.svg" alt="Close"  width={48} height={48}/>
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
               className={styles.footerWrapper}
              >
                <div
           className={styles.bagWrapper}
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
                onClick={handleViewBag}
              >
                VIEW BAG
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <div className={styles.emptyMessage}>
            <Image src="/images/emptyBag.svg" alt=" Empty Bag" width={222} height={205} />
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
