"use client";
import { GET_ORDER_DETAILS } from "@/common/schema";
import Typography from "@/components/atomic/Typography/Typography";
import CartItemList from "@/components/molecules/CartItemList/CartItemList";
import OrderSummary from "@/components/organisms/OrderSummary/OrderSummary";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

const fetchProductData = async () => {
	try {
		const variables = {
			orderId: "00003602",
		};

		const response = graphqlRequest(GET_ORDER_DETAILS, variables);
		return response;
	} catch (er) {
		console.log("234", er);
	}
};

const OrderConfimation = () => {
	const { id } = useParams() as { id: string };
	const orderId = id;
	interface ProductItem {
		productId: string;
		productName: string;
		quantity: number;
		price: string;
		productImage: {
			data: {
				imageGroups: {
					images: { link: string }[];
				}[];
			}[];
		};
	}
	const { data, error, isLoading } = useQuery({
		queryKey: ["OrderDetails", orderId],
		queryFn: fetchProductData,
		enabled: !!orderId,
	});

	const orderDetails = data?.getOrder;
	const orderdedItems = orderDetails?.productItems?.map(
		(item: ProductItem) => ({
			id: item?.productId,
			name: item?.productName,
			description: "",
			quantity: item?.quantity,
			price: item?.price,
			currency: orderDetails?.currency,
			productImage: item?.productImage.data[0].imageGroups[0].images[0].link,
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
						<div className={styles.rootLayer}>
							<Image
								src={"/images/deliveryAddress.svg"}
								alt={"redeem"}
								width={24}
								height={24}
							/>
							<div className={styles.row}>
								<Typography
									type="Label"
									variant={3}
									fontWeight="bold"
									color="black"
									label={"Delivery Address"}
								/>
								<div className={styles.address}>
									<div>
										{orderDetails?.shipments[0]?.shippingAddress?.fullName}
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
						</div>
						<div className={styles.border} />
						<div className={styles.rootLayer}>
							<Image
								src={"/images/date.svg"}
								alt={"redeem"}
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
									{orderDetails?.creationDate?.split("T")[0]}
								</div>
							</div>
						</div>
						<div className={styles.border} />
						<div className={styles.rootLayer}>
							<Image
								src={"/images/payment.svg"}
								alt={"redeem"}
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
									{orderDetails?.paymentInstruments[0]?.paymentMethodId}
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
							cartItems={orderdedItems}
							orderQuantity={true}
							isWhiteBackground={true}
						/>
					</section>
				</section>
				<OrderSummary
					totalRowTop={true}
					isButton={false}
					isPaymentImage={false}
					total={orderDetails?.orderTotal.toString()}
					totalAmt={orderDetails?.productTotal.toString()}
					// totalAmt={orderDetails?.orderTotal.toString()}
					totalSavings="0"
					subTotal={orderDetails?.productSubTotal.toString()}
					// subTotal={orderDetails?.orderTotal.toString()}
					delivery="Free"
					tax={orderDetails?.taxTotal.toString()}
					currency={orderDetails?.currency}
				/>
			</section>
		</section>
	);
};

export default OrderConfimation;
