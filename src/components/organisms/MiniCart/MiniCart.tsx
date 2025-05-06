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
    <Drawer open={open} onOpenChange={setOpen} side="right">
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
              <div className={styles.bagButton}>
              <Button
                variant="icon"
                className={styles.viewbag}
                onClick={handleViewBag}
              >
                VIEW BAG
              </Button></div>
            </DrawerFooter>
          </>
        ) : (
          <div className={styles.emptyContainer}>
  <div className={styles.emptyMessage}>
    <Image src="/images/emptyBag.svg" alt=" Empty Bag" width={222} height={205} />
    <Typography
      type="Body"
      variant={2}
      label="There is nothing in your bag!"
      color="#75757a"
    />
  </div>
</div>

        )}
      </DrawerContent>
    </Drawer>
  );
};
export default MiniCart;

/**
 * ## MiniCart
 *
 * The `MiniCart` displays a compact shopping cart drawer that allows users to view, update, or remove items from their cart and proceed to view the full shopping bag.
 *
 * ### Props
 *
 * - `cartItems`: An array of items in the cart. Each item includes `id`, `name`, `description`, `quantity`, `price`, `currency`, and `productImage`.
 * - `onDeleteItem` (optional): Callback fired when an item is removed from the cart.
 * - `onUpdateQuantity` (optional): Callback triggered when the quantity of an item is changed.
 * - `onViewBag` (optional): Callback invoked when the user clicks the "VIEW BAG" button.
 * - `triggerType` (optional): Defines how the drawer is triggered, either `"button"` or `"icon"`. Defaults to a button if not specified.
 * - `bagIcon` (optional): Path to the icon image used when `triggerType` is `"icon"`.
 *
 * ### Behavior
 *
 * - Displays the cart in a slide-in drawer from the right side.
 * - Opens via a button or custom icon trigger depending on `triggerType`.
 * - If `cartItems` is empty, a message and an empty bag image are shown.
 * - When items are present, it shows a list using `CartItemList`, displays subtotal, and includes a "VIEW BAG" button.
 * - The "VIEW BAG" button triggers the `onViewBag` callback and closes the drawer.
 *
 * ### Used Components
 *
 * - `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, `DrawerClose` for building the drawer.
 * - `Typography` for consistent text styling.
 * - `CartItemList` for rendering individual cart items.
 * - `Button` for triggering the drawer and actions inside it.
 * - `Image` from `next/image` for optimized rendering of icons and illustrations.
 *
 * ### Styling
 *
 * Custom styles are applied from `MiniCart.module.css`, including layout, drawer content, and responsiveness.
 * Classes like `bagHeader`, `footerWrapper`, `emptyMessage`, and `bagIcon` define the appearance of different sections.
 *
 * ### Example
 *
 * ```tsx
 * import MiniCart, { CartItem } from "@/components/organisms/MiniCart/MiniCart";
 *
 * const cartData: CartItem[] = [
 *   {
 *     id: "1",
 *     name: "Sneakers",
 *     description: "Comfortable running shoes",
 *     quantity: 2,
 *     price: 50,
 *     currency: "USD",
 *     productImage: "/images/sneakers.png",
 *   },
 * ];
 *
 * export default function Page() {
 *   const handleViewBag = () => {
 *     console.log("Navigating to full cart");
 *   };
 *
 *   return (
 *     <MiniCart
 *       cartItems={cartData}
 *       onViewBag={handleViewBag}
 *       triggerType="icon"
 *       bagIcon="/icons/cart.svg"
 *     />
 *   );
 * }
 * ```
 */

