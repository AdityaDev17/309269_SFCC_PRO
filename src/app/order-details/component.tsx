"use client";
import Typography from "../../components/atomic/Typography/Typography";
import React, { useState } from "react";
import { orderDetails } from "../../common/constant";
import styles from "./orderDetails.module.css";
import CartItemList from "../../components/molecules/CartItemList/CartItemList";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import { Button } from "../../components/atomic/Button/Button";
import Timeline from "../../components/organisms/Timeline/Timeline";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/molecules/Dialog/Dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../components/atomic/RadioGroup/RadioGroup";
import Input from "../../components/atomic/Input/Input";
import { orderStatus } from "../../common/constant";

const Details = () => {
  const { isDelivered, steps, currentStep } = orderStatus;
  const orderdedItems = orderDetails?.productItems?.map((item) => ({
    id: item?.productId,
    name: item?.productName,
    description: "",
    quantity: item?.quantity,
    price: item?.price,
    currency: orderDetails?.currency,
    productImage: item?.productImage,
  }));
  const [selectedOption, setSelectedOption] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Selected:", selectedOption);
    console.log("Text:", textValue);
    // TODO: handle your submit logic here
  };
  return (
    <div className={styles.detailsSection}>
      <div className={styles.orderId}>
        <Typography
          type="Body"
          variant={2}
          fontWeight="semibold"
          label={`Delivered on 18th April 2024`}
        />
        <Typography
          type="Body"
          variant={2}
          fontWeight="regular"
          label={`ORDER ID : ${orderDetails.orderNo}`}
          color="#4F4B53"
        />

        <div className={styles.orderItems}>
          <CartItemList
            cartItems={orderdedItems}
            orderQuantity={true}
            isWhiteBackground={true}
            button1={true}
            button2={true}
          />
        </div>
      </div>

      <div className={styles.tracker}>
        <Timeline steps={steps} currentStep={currentStep} complete={false} />
      </div>

      <div className={styles.bottom}>
        <section className={styles.addressSection}>
          <div className={styles.row}>
            <Typography
              type="Label"
              variant={3}
              fontWeight="bold"
              color="black"
              label={"Customer Information"}
            />
            <div className={styles.address}>
              <div className={styles.custInfo}>
                <Typography
                  type="Body"
                  variant={2}
                  fontWeight="semibold"
                  label="Name: "
                />
                <Typography
                  type="Body"
                  variant={2}
                  fontWeight="regular"
                  label={orderDetails?.shipments[0]?.shippingAddress?.fullName}
                />
              </div>
              <div className={styles.custInfo}>
                <Typography
                  type="Body"
                  variant={2}
                  fontWeight="semibold"
                  label="Phone no.: "
                />
                <Typography
                  type="Body"
                  variant={2}
                  fontWeight="regular"
                  label={orderDetails?.shipments[0]?.shippingAddress?.fullName}
                />
              </div>
              <div className={styles.custInfo}>
                <Typography
                  type="Body"
                  variant={2}
                  fontWeight="semibold"
                  label="Email ID: "
                />
                <Typography
                  type="Body"
                  variant={2}
                  fontWeight="regular"
                  label={orderDetails?.shipments[0]?.shippingAddress?.fullName}
                />
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <Typography
              type="Label"
              variant={3}
              fontWeight="bold"
              color="black"
              label={"Delivery Address"}
            />
            <div className={styles.address}>
              <div>{orderDetails?.shipments[0]?.shippingAddress?.fullName}</div>
              <div>{orderDetails?.shipments[0]?.shippingAddress?.address1}</div>
              <div>{orderDetails?.shipments[0]?.shippingAddress?.city}</div>
              <div>
                {orderDetails?.shipments[0]?.shippingAddress?.countryCode}
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <Typography
              type="Label"
              variant={3}
              fontWeight="bold"
              color="black"
              label={"Method of Payment"}
            />

            <div className={styles.address}>
              {orderDetails?.paymentInstruments[0]?.paymentMethodId}
            </div>
          </div>
        </section>
        <div className={styles.bottom}>
          <OrderSummary
            totalRowTop={true}
            isButton={false}
            isPaymentImage={false}
          />
          <div>
            <Typography
              type="Body"
              variant={2}
              fontWeight="regular"
              label="Return window is open till 25th April 2024."
              color="#75757A"
            />
          </div>

          <div className={styles.deliverdButtons}>
            {/* <Button>
              <Typography
                type="Body"
                variant={2}
                fontWeight="regular"
                label="RETURN ORDER"
              />
            </Button> */}
            {isDelivered ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Typography
                        type="Body"
                        variant={2}
                        fontWeight="regular"
                        label="RETURN ORDER"
                      />
                    </Button>
                  </DialogTrigger>

                  <DialogContent
                    className={styles.returnDialog}
                    overlayClassName={styles.dialogOverlay}
                  >
                    <DialogHeader className={styles.dialogHeader}>
                      <DialogTitle>
                        <Typography
                          type="Label"
                          variant={3}
                          fontWeight="semibold"
                          label="Return Order"
                        />
                      </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                      <div className={styles.dialogForm}>
                        <Typography
                          type="Body"
                          variant={2}
                          fontWeight="semibold"
                          label="Why are you returning?"
                        />
                        <Typography
                          type="Body"
                          variant={2}
                          fontWeight="regular"
                          label="This information will be used to improve our products and services."
                        />
                        <RadioGroup defaultValue="option-one">
                          <div className={styles.radioContainer}>
                            <div className={styles.radioButton}>
                              <RadioGroupItem
                                value="option-one"
                                id="option-one"
                              />
                              <label htmlFor="option-one">Quality issues</label>
                            </div>
                            <div className={styles.radioButton}>
                              <RadioGroupItem
                                value="option-two"
                                id="option-two"
                              />
                              <label htmlFor="option-two">
                                Received wrong/defective product
                              </label>
                            </div>
                            <div className={styles.radioButton}>
                              <RadioGroupItem
                                value="option-three"
                                id="option-three"
                              />
                              <label htmlFor="option-three">
                                Product does not match website image
                              </label>
                            </div>
                            <div className={styles.radioButton}>
                              <RadioGroupItem
                                value="option-four"
                                id="option-four"
                              />
                              <label htmlFor="option-four">Other issue</label>
                            </div>
                          </div>
                        </RadioGroup>
                        <Typography
                          type="Body"
                          variant={2}
                          fontWeight="semibold"
                          label="Any additional comments:"
                        />
                        <div>
                          <Input />
                        </div>
                      </div>
                      <DialogFooter className={styles.dialogFooter}>
                        <DialogClose asChild>
                          <Button>
                            <Typography
                              type="Body"
                              variant={2}
                              fontWeight="regular"
                              label="CANCEL"
                            />
                          </Button>
                        </DialogClose>
                        <Button variant="secondary">
                          <Typography
                            type="Body"
                            variant={2}
                            fontWeight="regular"
                            label="SUBMIT"
                            color="white"
                          />
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="secondary">
                  <Typography
                    type="Body"
                    variant={2}
                    fontWeight="regular"
                    label="DOWNLOAD INVOICE"
                    color="white"
                  />
                </Button>
              </>
            ) : (
              <Button>
                <Typography
                  type="Body"
                  variant={2}
                  fontWeight="regular"
                  label="CANCEL ORDER"
                />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
