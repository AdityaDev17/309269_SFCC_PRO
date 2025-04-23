"use client"

import React, { useState } from "react";
import styles from "./wishlist.module.css";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/atomic/Typography/Typography";
import { Button } from "../../components/atomic/Button/Button";
import ProductImageCarousel from "../../components/organisms/ProductImageCarousel/ProductImageCarousel";

const categoryList =["Perfume", "Jewellery", "Brush Set"]
const productData = [
    {
      productImage: "/images/product.svg",
      productTitle: "Product 1",
         bagPrice: "200",
      currency:'$',
      wishListed:true
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
    {
        productImage: "/images/product.svg",
        productTitle: "Product 5",
           bagPrice: "200",
        currency:'$'
      },
      {
        productImage: "/images/product.svg",
        productTitle: "Product 6",
         bagPrice: "200",
        currency:'$'
      },
      {
        productImage: "/images/product.svg",
        productTitle: "Product 7",
        bagPrice: "200",
        currency:'$',
      },
      {
        productImage: "/images/product.svg",
        productTitle: "Product 8",
        bagPrice: "200",
        currency:'$',
      },
   
  ];

const Wishlist = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <div className={styles.container}>
      <Breadcrumb >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Login</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Typography
        type={"Label"}
        variant={3}
        fontWeight="semibold"
        label="WISHLIST"
      />
      <div className={styles.filterConainer}>
        <div className={styles.buttonConainer}>
          {categoryList.map((buttonText, index) => (
              <Button key={index} style={{ marginRight: "10px" }} 
                active={activeIndex === index}
                // active={true}
                onClick={() => setActiveIndex(index)}
                onRemove={() => setActiveIndex(-1)}
              >
              <Typography
                  type="Body"
                  variant={2}
                  fontWeight="regular"
                  label={buttonText}
              />
              </Button>
          ))}
        </div>
        <div className={styles.clearFilter}>
          <Button style={{ border:"none" }} onClick={() => setActiveIndex(-1)}>
            <Typography
                type={"Body"}
                variant={4}
                fontWeight="semibold"
                label={`CLEAR FILTERS`}
              />
            </Button>
        </div>
      </div>

      <ProductImageCarousel cardsPerRow={4} width={325} productData={productData} alignment="alignStart" withPagination={false} moveToBag={false}/>
    
    </div>
  );
};
export default Wishlist;
