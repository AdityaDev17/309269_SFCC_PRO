import {
	DELETE_BASKET_ITEM,
	GET_BASKET,
	UPDATE_BASKET_ITEM,
} from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../../components/atomic/Button/Button";
import Input from "../../components/atomic/Input/Input";
import Typography from "../../components/atomic/Typography/Typography";
import CartItemList from "../../components/molecules/CartItemList/CartItemList";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import styles from "./cart.module.css";

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
type CartProps = {
	basketId: string;
};

const Cart = ({ basketId }: CartProps) => {
	const router = useRouter();
	const { data, refetch } = useQuery({
		queryKey: ["GetBasket", basketId],
		queryFn: () => graphqlRequest(GET_BASKET, { basketId: basketId }),
		enabled: !!basketId,
	});

	const CartItems = data?.basketInfo?.productItems?.map((item: BasketItem) => {
		const imageGroups = item?.productImage?.data?.[0]?.imageGroups;
		let productImage = imageGroups?.find((group: ImageGroup) =>
			group.images?.[0]?.link?.includes("/large/"),
		)?.images?.[0]?.link;
		if (!productImage && imageGroups?.length > 0) {
			for (const group of imageGroups) {
				if (group.images?.[0]?.link) {
					productImage = group.images[0].link;
					break;
				}
			}
		}

		return {
			id: item?.productId,
			name: item?.productName,
			quantity: item?.quantity,
			price: item?.price,
			currency: data?.basketInfo?.currency,
			productImage: productImage || null,
			itemId: item?.itemId,
		};
	});
	const updateBasketMutation = useMutation({
		mutationFn: (input: {
			basketId: string;
			itemId: string;
			quantity: number;
		}) => graphqlRequest(UPDATE_BASKET_ITEM, { input }),
		retry: 3,
	});
	const removeBasketMutation = useMutation({
		mutationFn: (input: { basketId: string; itemId: string }) =>
			graphqlRequest(DELETE_BASKET_ITEM, { input }),
		retry: 3,
	});

	const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
		console.log("id", itemId, newQuantity);
		try {
			const response = await updateBasketMutation.mutateAsync({
				basketId,
				itemId,
				quantity: newQuantity,
			});
			await refetch();
			console.log("Update response:", response);
		} catch (error) {
			console.error("Error updating basket item:", error);
		}
	};
	const handleDeleteItem = async (itemId: string) => {
		console.log("id", itemId);
		try {
			const response = await removeBasketMutation.mutateAsync({
				basketId,
				itemId,
			});
			await refetch();
			console.log("Remove response:", response);
		} catch (error) {
			console.error("Error removing basket item:", error);
		}
	};

	return (
		<section className={styles.componentLayout}>
			<div className={styles.firstLayout}>
				<div className={styles.items}>
					<Typography
						type={"Label"}
						variant={3}
						fontWeight="semibold"
						label={`Items in the Bag (${CartItems?.length} items)`}
					/>
				</div>
				<div className={styles.cartItemList}>
					<CartItemList
						cartItems={CartItems}
						isWhiteBackground={true}
						onUpdateQuantity={handleUpdateQuantity}
						onDeleteItem={handleDeleteItem}
					/>
				</div>
				<div className={styles.orderSummarySection}>
					<OrderSummary
						totalRowTop={true}
						isButton={true}
						totalAmt={data?.basketInfo?.productSubTotal}
						currency={data?.basketInfo?.currency}
						subTotal={data?.basketInfo?.productTotal}
						buttonText="CONTINUE"
						onButtonClick={() => router.push("/shipping")}
					/>
				</div>
				<div className={styles.redeemWrapper}>
					<Typography
						type={"Label"}
						variant={3}
						fontWeight="semibold"
						label="Redeem Points"
					/>
					<div className={styles.redeemGrid}>
						<div className={styles.redeemPoints}>
							<Typography
								type={"Body"}
								variant={2}
								fontWeight="semibold"
								label="80 ACCUMULATED POINTS"
							/>
							<Typography
								type={"Body"}
								variant={2}
								label="Would you like to redeem your sustainability points? (1 POINT = €1)"
								color="#4F4B53"
							/>
							<div>
								<Typography
									type={"Body"}
									variant={2}
									label="Enter points here"
									color="#4F4B53"
								/>
								<div className={styles.inputGrid}>
									<Input className={styles.input} />
									<Button variant="secondary">APPLY</Button>
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
			</div>
		</section>
	);
};
export default Cart;
