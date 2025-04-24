import React from "react";
import ButtonList from "./component";
import styles from "./wishlist.module.css";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";

const categoryList = ["Perfume", "Jewellery", "Brush Set"];
const productData = [
  {
    productId: "Product 1",
    productImage: "/images/product.svg",
    productTitle: "Product 1",
    bagPrice: "200",
    currency: "$",
    wishListed: true,
  },
  {
    productId: "Product 2",
    productImage: "/images/product.svg",
    productTitle: "Product 2",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "Product 3",
    productImage: "/images/product.svg",
    productTitle: "Product 3",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "Product 4",
    productImage: "/images/product.svg",
    productTitle: "Product 4",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "Product 5",
    productImage: "/images/product.svg",
    productTitle: "Product 5",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "Product 6",
    productImage: "/images/product.svg",
    productTitle: "Product 6",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "Product 7",
    productImage: "/images/product.svg",
    productTitle: "Product 7",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "Product 8",
    productImage: "/images/product.svg",
    productTitle: "Product 8",
    bagPrice: "200",
    currency: "$",
  },
];

function page() {
  return (
    <section className={styles.container}>
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
        cardsPerRow={4}
        width={325}
        productData={productData}
        alignment="alignStart"
        withPagination={false}
        moveToBag={true}
      />
    </section>
  );
}

export default page;
