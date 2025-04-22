import React from "react";
import Image from "next/image";
import styles from "./cart.module.css";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/atomic/Typography/Typography";
import CartItemList from "../../components/molecules/CartItemList/CartItemList";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import Input from "../../components/atomic/Input/Input";
import { Button } from "../../components/atomic/Button/Button";
import ProductImageCarousel from "../../components/organisms/ProductImageCarousel/ProductImageCarousel";

const cartItems = [
  {
    id: "1",
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: "OZ",
    quantity: 2,
    price: 50,
    currency: "$",
  },

  {
    id: "2",
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: "OZ",
    quantity: 1,
    price: 50,
    currency: "$",
  },

];

const productData = [
    {
      productImage: "/images/product.svg",
      productTitle: "Product 1",
         bagPrice: "200",
      currency:'$'
    },
    {
      productImage: "/images/product.svg",
      productTitle: "Product 2",
       bagPrice: "200",
      currency:'$'
    },
    {
      productImage: "/images/product.svg",
      productTitle: "Product 3",
      bagPrice: "200",
      currency:'$',
    },
    {
      productImage: "/images/product.svg",
      productTitle: "Product 4",
      bagPrice: "200",
      currency:'$',
    },
   
  ];
const Cart = () => {
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Image src="/slash.svg" alt="slash" width={6} height={18} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart">Bag</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
      <ProductImageCarousel cardsPerRow={4} width={325} productData={productData} alignment="alignStart"   withPagination={true}/>
    </div>
  );
};
export default Cart;
