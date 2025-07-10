"use client";
import { orderStatus } from "@/common/constant";
import { GET_ORDER_DETAILS } from "@/common/schema";
import type { ProductItem, Values, VariationAttributes } from "@/common/type";
import { Button } from "@/components/atomic/Button/Button";
import Input from "@/components/atomic/Input/Input";
import {
	RadioGroup,
	RadioGroupItem,
} from "@/components/atomic/RadioGroup/RadioGroup";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import Typography from "@/components/atomic/Typography/Typography";
import CartItemList from "@/components/molecules/CartItemList/CartItemList";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/molecules/Dialog/Dialog";
import OrderSummary from "@/components/organisms/OrderSummary/OrderSummary";
import Timeline from "@/components/organisms/Timeline/Timeline";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type React from "react";
import styles from "./orderDetails.module.css";

const Details = () => {
	const { isDelivered, steps, currentStep } = orderStatus;
	const t = useTranslations("Order-Details");
	// const [selectedOption, setSelectedOption] = useState("");
	// const [textValue, setTextValue] = useState("");
	const { id } = useParams() as { id: string };
	const orderId = id;
	const { data, error, isLoading } = useQuery({
		queryKey: ["OrderDetails", orderId],
		queryFn: () => graphqlRequest(GET_ORDER_DETAILS, { orderId: orderId }),
		enabled: !!orderId,
	});
	const orderDetails = data?.orderInfo;

	const getSize = (values: Values[], size: string) => {
		return values?.find((item) => item.value === size)?.name;
	};

	const orderdedItems = orderDetails?.productItems?.map((item: ProductItem) => {
		const imageUrl =
			item?.productData?.data?.[0]?.imageGroups?.[0]?.images?.[0]?.link || "";
		const variant = item?.productData?.data?.[0]?.variants?.find(
			(v) => v?.productId === item.productId,
		);

		return {
			id: item.productId,
			name: item.productName,
			description: "",
			quantity: item.quantity,
			price: item.price,
			currency: orderDetails.currency,
			productImage: imageUrl,
			size: getSize(
				(
					item?.productData?.data?.[0]
						?.variationAttributes as VariationAttributes[]
				)?.find((attr) => attr.id === "size")?.values ?? [],
				item?.productData?.data?.[0]?.variants?.find(
					(variation) => variation?.productId === item?.productId,
				)?.variationValues?.size ?? "",
			),
			color: variant?.variationValues?.color ?? "",
		};
	});

	const capitalizeName = (name = "") =>
		name
			.split(" ")
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
			.join(" ");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<div className={styles.detailsSection}>
			{isLoading ? (
				<>
					<div className={styles.orderId}>
						<Skeleton className={styles.skeletonHeading} />
						<Skeleton className={styles.skeletonSubheading} />

						<div className={styles.orderItems}>
							{Array.from({ length: 1 }).map((_, i) => (
								<Skeleton
									key={`skeleton-${Date.now()}-${Math.random()}`}
									className={styles.skeletonCartItem}
								/>
							))}
						</div>
					</div>

					<div className={styles.tracker}>
						<Skeleton className={styles.skeletonTimeline} />
					</div>

					<div className={styles.bottom}>
						<section className={styles.addressSection}>
							{/* Customer Information Block */}
							<div className={styles.row}>
								<Skeleton className={styles.skeletonLabel} />
								<div className={styles.address}>
									<Skeleton className={styles.skeletonTextBlock} />
									<Skeleton className={styles.skeletonTextBlock} />
									<Skeleton className={styles.skeletonTextBlock} />
								</div>
							</div>

							{/* Delivery Address Block */}
							<div className={styles.row}>
								<Skeleton className={styles.skeletonLabel} />
								<div className={styles.address}>
									<Skeleton className={styles.skeletonTextBlock} />
									<Skeleton className={styles.skeletonTextBlock} />
									<Skeleton className={styles.skeletonTextBlock} />
									<Skeleton className={styles.skeletonTextBlock} />
								</div>
							</div>

							{/* Payment Method Block */}
							<div className={styles.row}>
								<Skeleton className={styles.skeletonLabel} />
								<Skeleton className={styles.skeletonTextBlock} />
							</div>
						</section>

						{/* Order Summary + Return Note */}
						<div className={styles.bottom}>
							<Skeleton className={styles.skeletonOrderSummary} />
							<Skeleton className={styles.skeletonReturnNote} />
						</div>

						<div className={styles.deliverdButtons}>
							<Skeleton className={styles.skeletonButton} />
							<Skeleton className={styles.skeletonButton} />
						</div>
					</div>
				</>
			) : (
				<>
					<div className={styles.orderId}>
						<Typography
							type="Body"
							variant={2}
							fontWeight="semibold"
							label={t("delivered-on", { date: "18th April 2024" })}
						/>
						<Typography
							type="Body"
							variant={2}
							fontWeight="regular"
							label={`${t("order-id")}: ${orderDetails?.orderNo}`}
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
						<Timeline
							steps={steps}
							currentStep={currentStep}
							complete={false}
						/>
					</div>

					<div className={styles.bottom}>
						<section className={styles.addressSection}>
							<div className={styles.row}>
								<Typography
									type="Label"
									variant={3}
									fontWeight="bold"
									color="black"
									label={t("customer-info")}
								/>
								<div className={styles.address}>
									<div className={styles.custInfo}>
										<Typography
											type="Body"
											variant={2}
											fontWeight="semibold"
											label={`${t("name")}: `}
										/>
										<Typography
											type="Body"
											variant={2}
											fontWeight="regular"
											label={capitalizeName(
												orderDetails?.shipments[0]?.shippingAddress?.fullName,
											)}
										/>
									</div>
									<div className={styles.custInfo}>
										<Typography
											type="Body"
											variant={2}
											fontWeight="semibold"
											label={`${t("phone")}: `}
										/>
										<Typography
											type="Body"
											variant={2}
											fontWeight="regular"
											label={orderDetails?.shipments[0]?.shippingAddress?.phone}
										/>
									</div>
									<div className={styles.custInfo}>
										<Typography
											type="Body"
											variant={2}
											fontWeight="semibold"
											label={`${t("email")}: `}
										/>
										<Typography
											type="Body"
											variant={2}
											fontWeight="regular"
											label={orderDetails?.customerInfo?.email}
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
									label={t("delivery-address")}
								/>
								<div className={styles.address}>
									<div>
										{capitalizeName(
											orderDetails?.shipments[0]?.shippingAddress?.fullName,
										)}
									</div>
									<div>
										{orderDetails?.shipments[0]?.shippingAddress?.address1}
									</div>
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
									label={t("payment-method")}
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
								subTotal={orderDetails?.productSubTotal}
								total={orderDetails?.orderTotal}
								totalAmt={orderDetails?.orderTotal}
								isDelivery={true}
								discount={orderDetails?.orderPriceAdjustments[0]?.price}
							/>
							<div>
								<Typography
									type="Body"
									variant={2}
									fontWeight="regular"
									label={t("return-window", { date: "25th April 2024" })}
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
														label={t("return-order")}
													/>
												</Button>
											</DialogTrigger>

											<DialogContent
												className={styles.returnDialog}
												// overlayClassName={styles.dialogOverlay}
											>
												<DialogHeader className={styles.dialogHeader}>
													<DialogTitle>
														<Typography
															type="Label"
															variant={3}
															fontWeight="semibold"
															label={t("return-order")}
														/>
													</DialogTitle>
												</DialogHeader>

												<form onSubmit={handleSubmit}>
													<div className={styles.dialogForm}>
														<Typography
															type="Body"
															variant={2}
															fontWeight="semibold"
															label={t("why-returning")}
														/>
														<Typography
															type="Body"
															variant={2}
															fontWeight="regular"
															label={t("return-info-help")}
														/>
														<RadioGroup defaultValue="option-one">
															<div className={styles.radioContainer}>
																<div className={styles.radioButton}>
																	<RadioGroupItem
																		value="option-one"
																		id="option-one"
																	/>
																	<label htmlFor="option-one">
																		{t("reason-quality")}
																	</label>
																</div>
																<div className={styles.radioButton}>
																	<RadioGroupItem
																		value="option-two"
																		id="option-two"
																	/>
																	<label htmlFor="option-two">
																		{t("reason-defective")}
																	</label>
																</div>
																<div className={styles.radioButton}>
																	<RadioGroupItem
																		value="option-three"
																		id="option-three"
																	/>
																	<label htmlFor="option-three">
																		{t("reason-image-mismatch")}
																	</label>
																</div>
																<div className={styles.radioButton}>
																	<RadioGroupItem
																		value="option-four"
																		id="option-four"
																	/>
																	<label htmlFor="option-four">
																		{t("reason-other")}
																	</label>
																</div>
															</div>
														</RadioGroup>
														<Typography
															type="Body"
															variant={2}
															fontWeight="semibold"
															label={t("additional-comments")}
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
																	label={t("cancel")}
																/>
															</Button>
														</DialogClose>
														<Button variant="secondary">
															<Typography
																type="Body"
																variant={2}
																fontWeight="regular"
																label={t("submit")}
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
												label={t("download-invoice")}
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
											label={t("cancel-order")}
										/>
									</Button>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Details;
