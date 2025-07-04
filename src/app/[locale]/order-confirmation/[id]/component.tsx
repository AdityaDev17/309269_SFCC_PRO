"use client";
import { GET_ORDER_DETAILS, UPDATE_ORDER } from "@/common/schema";
import type {
	CartItemResponse,
	Values,
	VariationAttributes,
} from "@/common/type";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import Typography from "@/components/atomic/Typography/Typography";
import CartItemList from "@/components/molecules/CartItemList/CartItemList";
import OrderSummary from "@/components/organisms/OrderSummary/OrderSummary";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import styles from "./page.module.css";

const OrderConfimation = () => {
	const { id } = useParams() as { id: string };
	const orderId = id;
	const hasUpdated = useRef(false);

	const { data, error, isLoading } = useQuery({
		queryKey: ["OrderDetails", orderId],
		queryFn: () => graphqlRequest(GET_ORDER_DETAILS, { orderId: orderId }),
		enabled: !!orderId,
	});

	const updateCart = useMutation({
		mutationFn: (input: { orderNo: string }) =>
			graphqlRequest(UPDATE_ORDER, { input }),
		retry: 3,
	});

	const runUpdate = useCallback(async () => {
		if (!orderId || hasUpdated.current) return;

		hasUpdated.current = true;

		try {
			await updateCart.mutateAsync({ orderNo: orderId });
		} catch (err) {
			console.error("Update failed:", err);
		}
	}, [orderId, updateCart]);

	useEffect(() => {
		runUpdate();
	}, [runUpdate]);

	const getSize = (values: Values[], size: string) => {
		return values?.find((item) => item.value === size)?.name;
	};

	const orderDetails = data?.orderInfo;
	const orderdedItems = orderDetails?.productItems?.map(
		(item: CartItemResponse) => ({
			id: item?.productId,
			name: item?.productName,
			description: "",
			quantity: item?.quantity,
			price: item?.price,
			itemId: item?.itemId,
			currency: orderDetails?.currency,
			color: item?.productData?.data?.[0]?.variants?.find(
				(variation) => variation?.productId === item?.productId,
			)?.variationValues?.color,
			size: getSize(
				(
					item?.productData?.data?.[0]
						?.variationAttributes as VariationAttributes[]
				)?.find((attr) => attr.id === "size")?.values ?? [],
				item?.productData?.data?.[0]?.variants?.find(
					(variation) => variation?.productId === item?.productId,
				)?.variationValues?.size ?? "",
			),
			productImage:
				item?.productData?.data?.[0]?.imageGroups?.[0]?.images?.[0]?.link,
		}),
	);

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
						{/* Delivery Address */}
						<div className={styles.rootLayer}>
							<Image
								src={"/images/deliveryAddress.svg"}
								alt="address"
								width={24}
								height={24}
							/>
							<div className={styles.row}>
								<Typography
									type="Label"
									variant={3}
									fontWeight="semibold"
									color="black"
									label={"Delivery Address"}
								/>
								<div className={styles.address}>
									<div>
										{isLoading ? (
											<Skeleton className={styles.skeletonAddressLine} />
										) : (
											orderDetails?.shipments[0]?.shippingAddress?.fullName
										)}
									</div>
									<div>
										{isLoading ? (
											<Skeleton className={styles.skeletonAddressLineLong} />
										) : (
											orderDetails?.shipments[0]?.shippingAddress?.address1
										)}
									</div>
									<div>
										{isLoading ? (
											<Skeleton className={styles.skeletonAddressLineShort} />
										) : (
											orderDetails?.shipments[0]?.shippingAddress?.city
										)}
									</div>
									<div>
										{isLoading ? (
											<Skeleton className={styles.skeletonCountry} />
										) : (
											orderDetails?.shipments[0]?.shippingAddress?.countryCode
										)}
									</div>
								</div>
							</div>
						</div>

						<div className={styles.border} />

						{/* Date of Order */}
						<div className={styles.rootLayer}>
							<Image
								src={"/images/date.svg"}
								alt="date"
								width={24}
								height={24}
							/>
							<div className={styles.row}>
								<Typography
									type="Label"
									variant={3}
									fontWeight="bold"
									color="black"
									label={"Date of Order"}
								/>
								<div className={styles.address}>
									{isLoading ? (
										<Skeleton className={styles.skeletonOrderDate} />
									) : (
										orderDetails?.creationDate?.split("T")[0]
									)}
								</div>
							</div>
						</div>

						<div className={styles.border} />

						{/* Method of Payment */}
						<div className={styles.rootLayer}>
							<Image
								src={"/images/payment.svg"}
								alt="payment"
								width={24}
								height={24}
							/>
							<div className={styles.row}>
								<Typography
									type="Label"
									variant={3}
									fontWeight="bold"
									color="black"
									label={"Method of Payment"}
								/>
								<div className={styles.address}>
									{isLoading ? (
										<Skeleton className={styles.skeletonPayment} />
									) : (
										orderDetails?.paymentInstruments[0]?.paymentMethodId
									)}
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
						{isLoading ? (
							<div style={{ display: "grid", gap: "1rem" }}>
								{Array.from({ length: 1 }).map((_, i) => (
									<div
										key={`skeleton-${Date.now()}-${Math.random()}`}
										style={{ display: "flex", gap: "1rem" }}
									>
										<Skeleton className={styles.skeletonProductImage} />
										<div className={styles.skeletonProductDetails}>
											<Skeleton className={styles.skeletonProductTitle} />
											<Skeleton className={styles.skeletonProductQty} />
											<Skeleton className={styles.skeletonProductPrice} />
										</div>
									</div>
								))}
							</div>
						) : (
							<CartItemList
								cartItems={orderdedItems}
								orderQuantity={true}
								isWhiteBackground={true}
							/>
						)}
					</section>
				</section>

				<section className={styles.orderSummary}>
					{isLoading ? (
						<Skeleton className={styles.skeletonOrderSummary} />
					) : (
						<OrderSummary
							totalRowTop={true}
							isButton={false}
							isPaymentImage={false}
							total={orderDetails?.orderTotal.toString()}
							// totalAmt={orderDetails?.productTotal.toString()}
							totalAmt={orderDetails?.orderTotal}
							isDelivery={true}
							discount={orderDetails?.orderPriceAdjustments[0]?.price}
							delivery={orderDetails?.shippingTotal}
							totalSavings="0"
							subTotal={orderDetails?.productSubTotal.toString()}
							tax={orderDetails?.taxTotal.toString()}
							currency={orderDetails?.currency}
						/>
					)}
				</section>
			</section>
		</section>
	);
};

export default OrderConfimation;
