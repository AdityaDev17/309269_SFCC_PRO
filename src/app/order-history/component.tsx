import React from "react";
import styles from "orderHistory.module.css";
import { Button } from "@/components/atomic/Button/Button";
import Typography from "@/components/atomic/Typography/Typography";

const OrderCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.orderImage}></div>
      <div className={styles.orderDetails}>
        <div className={styles.orderStatus}>
          <Typography
            type="Body"
            variant={2}
            fontWeight="semibold"
            label="Arriving Tomorrow"
          />
        </div>
        <div className={styles.orderName}>
          <Typography
            type="Label"
            variant={3}
            fontWeight="regular"
            label="Men's Perfume 1, 100ml"
          />
        </div>
        <div className={styles.orderId}>
          <Typography
            type="Body"
            variant={2}
            fontWeight="regular"
            label="ORDER IS : ABCD12345678"
          />
        </div>
        <div className={styles.orderTotal}>
          <Typography
            type="Body"
            variant={3}
            fontWeight="semibold"
            label="Order Total: $100"
          />
        </div>
        <Button style={{ marginTop: "10px" }}>
          <Typography
            type="Body"
            variant={3}
            fontWeight="semibold"
            label="VIEW DETAILS"
          />
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
