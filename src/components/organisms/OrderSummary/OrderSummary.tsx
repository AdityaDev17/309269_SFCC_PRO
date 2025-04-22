import React from "react";
import styles from "./OrderSummary.module.css";
import Typography from "@/components/atomic/Typography/Typography";
import { Button } from "@/components/atomic/button/button";

const OrderSummary = ({ reverseOrder = false, totalRowTop = false, isButton=true ,isPaymentImage= true }) => {
  const paymentImages = [
    "/images/pay1.svg",
    "/images/pay2.svg",
    "/images/pay3.svg",
    "/images/pay4.svg",
    "/images/pay5.svg",
  ];

  return (
    <div className={styles.layout}>
      {totalRowTop && (
        <>
          <div className={styles.totalRowTop}>
            <Typography
              type={"Label"}
              variant={3}
              fontWeight="medium"
              label="Total"
            />
            <Typography
              type={"Label"}
              variant={3}
              fontWeight="medium"
              label="$420"
            />
          </div>
          <hr className={styles.topDivider} />
        </>
      )}
      <div className={styles.standardLayout}>
        <div className={styles.title}>
          <Typography
            type={"Label"}
            variant={3}
            fontWeight="medium"
            label="Price Details"
          />
        </div>
        <div className={styles.summaryRow}>
          <Typography
            type={"Body"}
            variant={2}
            fontWeight="regular"
            label="Sub Total"
            color="#4F4B53"
          />
          <Typography
            type={"Body"}
            variant={2}
            fontWeight="regular"
            label="$400"
            color="#4F4B53"
          />
        </div>
        <div className={styles.summaryRow}>
          <Typography
            type={"Body"}
            variant={2}
            fontWeight="regular"
            label="Delivery"
            color="#4F4B53"
          />
          <Typography
            type={"Body"}
            variant={2}
            fontWeight="regular"
            label="Free"
            color="#4F4B53"
          />
        </div>
        <div className={styles.summaryRow}>
          <Typography
            type={"Body"}
            variant={2}
            fontWeight="regular"
            label="Tax"
            color="#4F4B53"
          />
          <Typography
            type={"Body"}
            variant={2}
            fontWeight="regular"
            label="$20"
            color="#4F4B53"
          />
        </div>
        <hr className={styles.divider} />
        <div className={styles.totalRow}>
          {totalRowTop ? (
            <>
              <Typography
                type={"Body"}
                variant={2}
                fontWeight="medium"
                label="Total"
              />
              <Typography
                type={"Body"}
                variant={2}
                fontWeight="medium"
                label="$20"
              />
            </>
          ) : (
            <>
              {" "}
              <Typography
                type={"Label"}
                variant={3}
                fontWeight="medium"
                label="Total"
              />
              <Typography
                type={"Label"}
                variant={3}
                fontWeight="medium"
                label="$420"
              />
            </>
          )}
        </div>
        <hr className={styles.divider} />
        {!reverseOrder && (
          <div className={styles.totalSavings}>
            <Typography
              type={"Body"}
              variant={2}
              fontWeight="regular"
              label="Total Savings"
              color="#4F4B53"
            />
            <Typography
              type={"Body"}
              variant={2}
              fontWeight="regular"
              label="$20"
              color="#4F4B53"
            />
          </div>
        )}
{isButton && 
        <div className={styles.summaryButton}>
          <Button variant="secondary" className={styles.button}>
            CONTINUE
          </Button>
        </div>
}
        {reverseOrder && (
          <div className={styles.reverseTotalSavings}>
            <Typography
              type={"Body"}
              variant={2}
              fontWeight="regular"
              label="Total Savings"
              color="#4F4B53"
            />
            <Typography
              type={"Body"}
              variant={2}
              fontWeight="regular"
              label="$20"
              color="#4F4B53"
            />
          </div>
        )}
{isPaymentImage &&
        <div className={styles.paymentImages}>
          {paymentImages.map((src, index) => (
            <img key={index} src={src} alt={`payment method ${index + 1}`} />
          ))}
        </div>}
      </div>
    </div>
  );
};

export default OrderSummary;

/**
 * ## OrderSummary 
 *
 * The OrderSummary component is used to display an order's summary, including the price details,
 *  It showcases the breakdown of costs such as subtotal, delivery
 * charges, tax, total savings, and the final total. This component is typically used in e-commerce
 * platforms, especially during the checkout or order confirmation stages.
 *
 *
 * ### Component Behavior:
 * - The component displays various sections such as "Sub Total", "Delivery", "Tax", and "Total",
 *   with corresponding values.
 * - A button is provided at the bottom for progressing to the next step (e.g., payment or confirmation).
 *
 */
