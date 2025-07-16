import { Button } from "@/components/atomic/Button/Button";
import Input from "@/components/atomic/Input/Input";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import Typography from "@/components/atomic/Typography/Typography";
import CartItemList from "@/components/molecules/CartItemList/CartItemList";
import {
  getBasketDetail,
  handleDeleteItem,
  handleUpdateQuantity,
} from "@/components/organisms/MiniCart/CartFuntions";
import OrderSummary from "@/components/organisms/OrderSummary/OrderSummary";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./cart.module.css";
import { X } from 'lucide-react';
import { graphqlRequest } from "@/lib/graphqlRequest";
import { APPLY_COUPON, REMOVE_COUPON } from "@/common/schema";

type ImageProduct = {
  alt: string;
  link: string;
  title: string;
  disBaseLink: string;
};

export type ImageGroup = {
  images: ImageProduct[];
};

type ProductImage = {
  data: {
    imageGroups: ImageGroup[];
  }[];
};

export type BasketItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  itemId: string;
  productImage: ProductImage;
};

interface Code {
  name: string;
  text: string;
}

const Cart = () => {
	const t = useTranslations("Cart");
	const router = useRouter();
	const basketId = sessionStorage.getItem("basketId") ?? "";
  const [discountCode, setDiscountCode] = useState<Code | null>(null);
  const [couponId, setcouponId] = useState<string | null>(null);
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["Basket", basketId],
		queryFn: () => getBasketDetail(),
		enabled: !!basketId,
	});
	const CartItems = data?.cartItems ?? [];

  const removeBasketMutations = useMutation({
    mutationFn: (input: { itemId: string }) => handleDeleteItem(input.itemId),
    onSuccess: () => {
      refetch();
    },
    retry: 3,
  });
  const removeCoupon = useMutation({
			mutationFn: () =>
				graphqlRequest(REMOVE_COUPON, { input: { basketId, couponId:"fcbe84c02ed457a178222ef39b" } }),
			onSuccess: () => {
				refetch();
			},
			retry: 3,
		});
  const applyCoupon = useMutation({
			mutationFn: () =>
				graphqlRequest( APPLY_COUPON, {
					input: { basketId, code: { code: "SUMMER20" } },
				}),
			onSuccess: () => {
				refetch();
			},
			retry: 3,
		});

  const onDeleteItem = async (itemId: string) => {
    try {
      const response = await removeBasketMutations.mutateAsync({ itemId });
    } catch (error) {
      console.error("Error removing basket item:", error);
    }
  };

  const updateBasketMutations = useMutation({
    mutationFn: (input: { itemId: string; quantity: number }) =>
      handleUpdateQuantity(input.itemId, input.quantity),
    onSuccess: () => refetch(),
    retry: 3,
  });

  const onUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const response = await updateBasketMutations.mutateAsync({
        itemId,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating basket item:", error);
    }
  };

  const clickHandler = async () => {
    console.log("Clicked");
    const response = await applyCoupon.mutateAsync();
    console.log(response);
    setDiscountCode({name: "SUMMER20", text: "You saved 70 USD"});
  }

  return (
    <section className={styles.componentLayout}>
      <div className={styles.firstLayout}>
        {isLoading ? (
          <>
            <div className={styles.items}>
              <Skeleton className={styles.headingSkeleton} />
            </div>

            <div className={styles.cartItemList}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={`skeleton-${Date.now()}-${Math.random()}`}
                  className={styles.cartItemSkeleton}
                />
              ))}
            </div>

            <div className={styles.orderSummarySection}>
              <Skeleton className={styles.orderSummarySkeleton} />
            </div>

            <div className={styles.redeemWrapper}>
              <Skeleton className={styles.redeemTitleSkeleton} />
              <div className={styles.redeemGrid}>
                <div className={styles.redeemPoints}>
                  <Skeleton className={styles.redeemLineSkeleton} />
                  <Skeleton className={styles.redeemLineSkeleton} />
                  <Skeleton className={styles.redeemLineSkeletonShort} />
                  <div className={styles.inputGrid}>
                    <Skeleton className={styles.redeemInputSkeleton} />
                    <Skeleton className={styles.redeemButtonSkeleton} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.items}>
              <Typography
                type={"Label"}
                variant={3}
                fontWeight="semibold"
                label={t("items-in-the-bag", { count: CartItems?.length })}
              />
            </div>
            <div className={styles.cartItemList}>
              <CartItemList
                cartItems={CartItems}
                isWhiteBackground={true}
                onUpdateQuantity={onUpdateQuantity}
                onDeleteItem={onDeleteItem}
              />
            </div>
            <div className={styles.orderSummarySection}>
              {/* APPLY COUPON CODE */}
                <div className={styles.redeemGrid}>
                  <div className={styles.redeemPoints}>
                    <div>
                      <Typography
                        type={"Body"}
                        variant={2}
                        label={t("applyCoupon")}
                        color="#4F4B53"
                      />
                    {!discountCode ? 
                      <div className={styles.inputGrid}>
                        <Input className={styles.input} />
                        <Button variant="secondary" onClick={clickHandler}>{t("apply")}</Button>
                      </div> :
                      <div className={styles.discountApplied}>
                        <div>
                          <h4>{discountCode.name}</h4>
                          <p>{discountCode.text}</p>
                        </div>
                        <X onClick={async () => {
                          await removeCoupon.mutateAsync();
                          setDiscountCode(null)
                        }} style={{cursor: "pointer"}}/>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <OrderSummary
                totalRowTop={false}
                isButton={true}
                // totalAmt={data?.subTotal}
                isDelivery={false}
                discount={data?.orderDiscount?.price}
                total={data?.productTotal}
                subTotal={data?.subTotal}
                buttonText={t("continue")}
                currency={CartItems?.[0]?.currency}
                onButtonClick={() => router.push("/shipping")}
                errorMsg={
                  parseInt(data?.productTotal ?? "0") > 50
                    ? ""
                    : "Total amount should be more than USD 50 to place an order"
                }
              />
            </div>
            <div className={styles.redeemWrapper}>
              <Typography
                type={"Label"}
                variant={3}
                fontWeight="semibold"
                label={t("redeem-points")}
              />
              <div className={styles.redeemGrid}>
                <div className={styles.redeemPoints}>
                  <Typography
                    type={"Body"}
                    variant={2}
                    fontWeight="semibold"
                    label={t("accumulated-points")}
                  />
                  <Typography
                    type={"Body"}
                    variant={2}
                    label={t("redeem-message")}
                    color="#4F4B53"
                  />
                  <div>
                    <Typography
                      type={"Body"}
                      variant={2}
                      label={t("enter-points")}
                      color="#4F4B53"
                    />
                    <div className={styles.inputGrid}>
                      <Input className={styles.input} />
                      <Button variant="secondary">{t("apply")}</Button>
                    </div>
                  </div>
                </div>
                <div className={styles.redeemImage}>
                  <Image
                    src={"/images/redeem.png"}
                    alt={"redeem"}
                    width={113}
                    height={125}
                    priority
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default Cart;
