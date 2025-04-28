"use client";

import React from "react";
import ButtonList from "./component";
import styles from "./wishlist.module.css";

import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/atomic/Typography/Typography";
import ProductImageCarousel from "../../components/organisms/ProductImageCarousel/ProductImageCarousel";
import ErrorComponent from "../../components/molecules/ErrorComponent/ErrorComponent";
import { toast, Toaster } from "../../components/molecules/Toast/Toast";

import { productData, categoryList } from "../../common/constant";

function Wishlist() {
  return productData.length === 0 ? (
    <ErrorComponent
      errImg="./images/wishlistEmpty.svg"
      imgHeight={205}
      imgWidth={216}
      text1="Your wishlist is empty!"
      buttonText="CONTINUE SHOPPING"
    />
  ) : (
    <div className={styles.container}>
      <Breadcrumbs
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
        breadcrumbSeparator="/slash.svg"
      />
      <Typography
        type={"Label"}
        variant={3}
        fontWeight="semibold"
        label="WISHLIST"
      />
      <ButtonList buttonNames={categoryList} />

      <ProductImageCarousel
        width="100%"
        productData={productData}
        alignment="alignStart"
        withPagination={false}
        moveToBag={true}
        onMoveToBag={() => {
          toast("Item has been moved to your Bag!", {
            className: `${styles.Toast} ${styles.ToastSuccess}`,
            unstyled: true,
          });
        }}
      />
      <Toaster />
    </div>
  );
}

export default Wishlist;
