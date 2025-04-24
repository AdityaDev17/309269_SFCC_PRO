'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./cart.module.css";
import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/atomic/Typography/Typography";
import CartItemList from "../../components/molecules/CartItemList/CartItemList";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import Input from "../../components/atomic/Input/Input";
import { Button } from "../../components/atomic/Button/Button";
import ProductImageCarousel from "../../components/organisms/ProductImageCarousel/ProductImageCarousel";
import { cartItems, productData } from "../../common/constant";

const Cart = () => {
  const router= useRouter();
  return (
    <div className={styles.container}>
     <Breadcrumbs
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Bag", href: "/cart" },
        ]}
        breadcrumbSeparator="/slash.svg"
      />
      <Typography
        type={"Label"}
        variant={3}
        fontWeight="semibold"
        label="Bag"
      />

      <div className={styles.cartPageWrapper}>
        <div className={styles.cartItemsSection}>
          <div className={styles.items}>
            <Typography
              type={"Label"}
              variant={3}
              fontWeight="semibold"
              label={`Items in the Bag (${cartItems.length} items)`}
            />
          </div>
          <CartItemList cartItems={cartItems} isWhiteBackground={true} />
        </div>

        <div className={styles.orderSummarySection}>
          <OrderSummary />
        </div>
      </div>
      <Typography
        type={"Label"}
        variant={3}
        fontWeight="semibold"
        label="Redeem Points"
      />
      <div className={styles.redeemGrid}>
        <div className={styles.redeemPoints}>
          <Typography
            type={"Body"}
            variant={2}
            fontWeight="semibold"
            label="80 ACCUMULATED POINTS"
          />
          <Typography
            type={"Body"}
            variant={2}
            label="Would you like to redeem your sustainability points? (1 POINT = €1)"
            color="#4F4B53"
          />
          <div>
            <Typography
              type={"Body"}
              variant={2}
              label="Enter points here"
              color="#4F4B53"
            />
            <div className={styles.inputGrid}>
              <Input className={styles.input} />
              <Button variant="secondary">APPLY</Button>
            </div>
          </div>
        </div>
        <div className={styles.redeemImage}>
          <Image
            src={"/images/redeem.svg"}
            alt={"redeem"}
            width={113}
            height={125}
          />
        </div>
      </div>
      <div className={styles.carosel}>
      <Typography
        type={"Label"}
        variant={3}
        fontWeight="medium"
        label="YOU MAY ALSO LIKE"
      />
      </div>
      <ProductImageCarousel width={'100%'}   withPagination={true} productData={productData} alignment="alignStart"   onCardClick={(id) => router.push(`/productDetails/${id}`)}  />
    </div>
  );
};
export default Cart;
