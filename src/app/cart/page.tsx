
'use client';
import React from 'react';
import Cart from './component';
import { useRouter } from "next/navigation";
import styles from './cart.module.css'
import Breadcrumbs from '../../components/atomic/Breadcrumbs/Breadcrumbs';
import Typography from '../../components/atomic/Typography/Typography';
import ProductImageCarousel from '../../components/organisms/ProductImageCarousel/ProductImageCarousel';
import { productData } from "../../common/constant";


export default function CartPage() {
      const router = useRouter();
    return(
        <section className={styles.container}>
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
        label="BAG"
      />
  
  <Cart/>
  <section className={styles.productCarouselSection}>
        <Typography
          type="Body"
          variant={1}
          fontWeight="bold"
          color="black"
          label={"YOU MAY ALSO LIKE"}
        />
        <section>
        <ProductImageCarousel
        width={"100%"}
        withPagination={true}
        productData={productData}
        alignment="alignStart"
        onCardClick={(id) => router.push(`/product-details/${id}`)}
      />
        </section>
      </section>
      </section>
    )
}