import React from "react";
import OrderConfimation from "./component";
import Banner from "@/components/molecules/Banner/Banner";

export default function OrderConfirmationPage() {
  return (
    <>
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
    </>
  );
}
