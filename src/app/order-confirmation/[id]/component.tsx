import Typography from "@/components/atomic/Typography/Typography";
import styles from "./page.module.css";
import Image from "next/image";
import { cartItems } from "@/common/constant";
import CartItemList from "@/components/molecules/CartItemList/CartItemList";
import OrderSummary from "@/components/organisms/OrderSummary/OrderSummary";
const OrderConfimation = () => {
  return (
    <section className={styles.layout}>
      <Typography
        type="Label"
        variant={3}
        fontWeight="semibold"
        color="black"
        label={"ORDER SUMMARY"}
      />
      <section className={styles.detailsSection}>
        <section className={styles.main}>
          <section className={styles.addressSection}>
            <div className={styles.rootLayer}>
              <Image
                src={"/images/redeem.svg"}
                alt={"redeem"}
                width={24}
                height={24}
              />
              <div className={styles.row}>
                <div className={styles.title}>Delivery Address</div>
                <div className={styles.address}>
                  Sarthak Sharma 123 Main Street Anytown, California - 90210
                  Contact Number: +1 1234567890
                </div>
              </div>
            </div>
            <div className={styles.border}></div>
            <div className={styles.rootLayer}>
              <Image
                src={"/images/redeem.svg"}
                alt={"redeem"}
                width={24}
                height={24}
              />
              <div className={styles.row}>
                <div className={styles.title}>Delivery Address</div>
                <div className={styles.address}>
                  Sarthak Sharma 123 Main Street Anytown, California - 90210
                  Contact Number: +1 1234567890
                </div>
              </div>
            </div>
            <div className={styles.border}></div>
            <div className={styles.rootLayer}>
              <Image
                src={"/images/redeem.svg"}
                alt={"redeem"}
                width={24}
                height={24}
              />
              <div className={styles.row}>
                <div className={styles.title}>Delivery Address</div>
                <div className={styles.address}>
                  Sarthak Sharma 123 Main Street Anytown, California - 90210
                  Contact Number: +1 1234567890
                </div>
              </div>
            </div>
          </section>
          <section className={styles.secondRow}>
            <Typography
              type="Label"
              variant={3}
              fontWeight="semibold"
              color="black"
              label={"Product Details"}
            />
            <CartItemList
              cartItems={cartItems}
              orderQuantity={true}
              isWhiteBackground={true}
            />
          </section>
        </section>
        <OrderSummary
          totalRowTop={true}
          isButton={false}
          isPaymentImage={false}
        />
      </section>
    </section>
  );
};

export default OrderConfimation;
