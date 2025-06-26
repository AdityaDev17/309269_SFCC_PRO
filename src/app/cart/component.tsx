import {
	getBasketDetail,
	handleDeleteItem,
	handleUpdateQuantity,
} from "@/components/organisms/MiniCart/CartFuntions";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../../components/atomic/Button/Button";
import Input from "../../components/atomic/Input/Input";
import { Skeleton } from "../../components/atomic/Skeleton/Skeleton";
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
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["Basket", basketId],
		queryFn: () => getBasketDetail(),
		enabled: !!basketId,
	});
	const CartItems = data?.cartItems ?? [];

	const removeBasketMutations = useMutation({
		mutationFn: (input: { itemId: string }) => handleDeleteItem(input.itemId),
		onSuccess: () => {
			console.log("hii");
			refetch();
		},
		retry: 3,
	});

	const onDeleteItem = async (itemId: string) => {
		console.log("id", itemId);
		try {
			const response = await removeBasketMutations.mutateAsync({ itemId });
			console.log("Remove response:", response);
		} catch (error) {
			console.error("Error removing basket item:", error);
		}
	};

	const updateBasketMutations = useMutation({
		mutationFn: (input: {
			itemId: string;
			quantity: number;
		}) => handleUpdateQuantity(input.itemId, input.quantity),
		onSuccess: () => refetch(),
		retry: 3,
	});

	const onUpdateQuantity = async (itemId: string, newQuantity: number) => {
		console.log("id", itemId, newQuantity);
		try {
			const response = await updateBasketMutations.mutateAsync({
				itemId,
				quantity: newQuantity,
			});
			console.log("Update response:", response);
		} catch (error) {
			console.error("Error updating basket item:", error);
		}
	};

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
								label={`Items in the Bag (${CartItems?.length} items)`}
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
							<OrderSummary
								totalRowTop={true}
								isButton={true}
								totalAmt={data?.subTotal}
								subTotal={data?.subTotal}
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
					</>
				)}
			</div>
		</section>
	);
};
export default Cart;
