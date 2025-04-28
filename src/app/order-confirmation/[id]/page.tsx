import React from "react";
import OrderConfimation from "./component";
import Banner from "@/components/molecules/Banner/Banner";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import styles from "./page.module.css"

export default function OrderConfirmationPage() {
  return (
    <section className={`${styles.layout} ${styles.pageLayout}`}>
      <Breadcrumbs
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Order Confirmation" },
        ]}
      />
      <Banner
        title="THANK YOU FOR PLACING YOUR ORDER!"
        textColor="#000"
        subtitle="Order ID : #64348"
        subtitleVariant={5}
        buttonText="CONTINUE SHOPPING"
        backgroundImage="/images/orderConfirmationBanner.svg"
        alignment="center-center"
      />
      <OrderConfimation />
    </section>
  );
}
