import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/atomic/Typography/Typography";
import React from "react";
import { OrderCardContainer } from "./component";
import styles from "./orderHistory.module.css";
import ErrorComponent from "../../components/molecules/ErrorComponent/ErrorComponent";
import { orderData } from "../../common/constant";

function OrderHistory() {
  return (
    <div className={styles.container}>
      {orderData.length === 0 ? (
        <ErrorComponent
          errImg="./images/orderListEmpty.svg"
          imgHeight={204}
          imgWidth={223}
          text1="No Orders yet!"
          text2="Start creating your order history by shopping our exclusive collection of products."
          buttonText="START SHOPPING"
        />
      ) : (
        <>
          <Breadcrumbs
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "My Account", href: "/shop" },
              { label: "Order History" },
            ]}
            breadcrumbSeparator="/slash.svg"
          />
          <Typography
            type={"Label"}
            variant={3}
            fontWeight="semibold"
            label="ORDER HISTORY"
          />

          <OrderCardContainer orderData={orderData}/>
        </>
      )}
    </div>
  );
}

export default OrderHistory;
