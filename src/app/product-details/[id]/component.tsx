"use client";
import { colorData, productDetails, sizes } from "@/common/constant";
import {
	ADD_ITEM_TO_BASKET,
	ADD_ITEM_TO_PRODUCTLIST,
	CREATE_CART,
	CREATE_CUSTOMER_PRODUCT_LIST,
	GET_CUSTOMER_PRODUCTLIST,
	GET_PRODUCT_DETAILS,
} from "@/common/schema";
import { Button } from "@/components/atomic/Button/Button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/atomic/Select/Select";
import Accordion from "@/components/molecules/Accordion/Accordion";
import sonnerToast, { Toaster } from "@/components/molecules/Toast/Toast";
import Gallery from "@/components/organisms/Gallery/Gallery";
import { addToBasket } from "@/components/organisms/MiniCart/CartFuntions";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import MiniCart from "../../../components/organisms/MiniCart/MiniCart";
import styles from "./page.module.css";

import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";

export default function ProductDetails() {
	const { id } = useParams() as { id: string };
	const productId = id;
	const [open, setOpen] = useState(false);
	const [toast, setToast] = useState(false);

	const createCustomerProductList = useMutation({
		mutationFn: (input: { customerId: string; type: string }) =>
			graphqlRequest(CREATE_CUSTOMER_PRODUCT_LIST, { input }),
		retry: 3,
	});
	const addItemToProductList = useMutation({
		mutationFn: (input: {
			customerId: string;
			listId: string;
			items: {
				productId: string;
				quantity: number;
				public: boolean;
				priority: number;
				type: string;
			};
		}) => graphqlRequest(ADD_ITEM_TO_PRODUCTLIST, { input }),
		retry: 3,
	});

	const { data, isFetching, isLoading } = useQuery({
		queryKey: ["Product", productId],
		queryFn: () =>
			graphqlRequest(GET_PRODUCT_DETAILS, { productId: productId }),
		enabled: !!productId,
	});
	console.log({ isFetching, isLoading });
	type ProductImage = {
		link: string;
	};

	type ImageGroup = {
		images: ProductImage[];
	};

	const galleryImages = data?.productDetails?.imageGroups
		?.flatMap((group: ImageGroup) => group?.images ?? [])
		.map((image: ProductImage) => image?.link);

	const accordionData = productDetails?.pageMetaTags?.map((item) => ({
		title: item?.id.toUpperCase(),
		desc: item?.value,
	}));

	type Colors = {
		name: string;
		hex: string;
	};

	const handleSelected = (selected: Colors) => {
		console.log("Selectedvarient", selected);
	};

	const addItemToProductLists = async (listId: string, customerId: string) => {
		await addItemToProductList.mutateAsync({
			customerId,
			listId,
			items: {
				productId: productId,
				public: false,
				quantity: 1,
				priority: 1,
				type: "product",
			},
		});
	};

	const handleAddToWishlist = async () => {
		const customerId = sessionStorage.getItem("customer_id") ?? "";
		const response = await graphqlRequest(GET_CUSTOMER_PRODUCTLIST, {
			customerId,
		});

		const wishlist = response?.customerProductListsInfo?.data?.[0];
		let listId: string;
		let isItemInWishlist: string | undefined;
		if (wishlist) {
			isItemInWishlist = wishlist.customerProductListItems?.find(
				(i: { productId: string }) => i.productId === productId,
			);
			listId = wishlist.id;
		} else {
			const {
				createCustomerProductList: { id },
			} = await createCustomerProductList.mutateAsync({
				customerId,
				type: "wish_list",
			});
			listId = id;
		}

		if (!isItemInWishlist) {
			sonnerToast.success("Added to wishlist", {});
			addItemToProductLists(listId, customerId);
		} else {
			sonnerToast.success("Already in wishlist", {});
		}
	};

	const addToBasketMutation = useMutation({
		mutationFn: () => addToBasket(productId),
		onSuccess: () => setOpen(true),
		retry: 3,
	});
	const handleAddToBasket = async () => {
		const response = await addToBasketMutation.mutateAsync();
		return response;
	};
	return (
		<section className={styles.componentLayout}>
			<div className={styles.firstLayout}>
				<div className={styles.gallery}>
					{isLoading ? (
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "20px",
								alignItems: "flex-start",
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "10px",
								}}
							>
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton
										key={`skeleton-${Date.now()}-${Math.random()}`}
										style={{
											height: "93px",
											width: "93px",
											borderRadius: "0.375rem",
										}}
									/>
								))}
							</div>
							<Skeleton
								style={{
									width: "100%",
									height: "518.83px",
									borderRadius: "0.5rem",
								}}
							/>
						</div>
					) : (
						data?.productDetails?.imageGroups != null &&
						galleryImages?.length !== 0 && <Gallery images={galleryImages} />
					)}
				</div>
				<div className={styles.accordion}>
					{isLoading ? (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "12px",
							}}
						>
							{Array.from({ length: 2 }).map((_, i) => (
								<Skeleton
									key={`skeleton-${Date.now()}-${Math.random()}`}
									style={{
										height: "52px",
										width: "100%",
										borderRadius: "0.375rem",
									}}
								/>
							))}
						</div>
					) : (
						<Accordion
							items={accordionData}
							contentStyle={styles.accordionContent}
						/>
					)}
				</div>
				<div className={styles.productDetails}>
					{isLoading ? (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "20px",
							}}
						>
							<Skeleton style={{ width: "80%", height: "32px" }} />
							<Skeleton
								style={{ width: "40%", height: "28px", marginTop: "12px" }}
							/>

							<div>
								<Skeleton
									style={{ width: "100%", height: "16px", marginBottom: "8px" }}
								/>
								{/* <Skeleton style={{ width: "90%", height: "16px", marginBottom: "8px" }} />  */}
								<Skeleton style={{ width: "75%", height: "16px" }} />
							</div>

							<Skeleton style={{ width: "60%", height: "20px" }} />

							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: "12px",
								}}
							>
								<Skeleton style={{ height: "36px", width: "100%" }} />
								<Skeleton style={{ height: "36px", width: "100%" }} />
							</div>

							<Skeleton style={{ height: "36px", width: "100%" }} />
						</div>
					) : (
						<>
							<div className={styles.title}>{data?.productDetails?.name}</div>
							<div className={styles.price}>
								{data?.productDetails?.currency}&nbsp;
								{data?.productDetails?.price}
							</div>
							<div className={styles.desc}>
								{data?.productDetails?.longDescription}
							</div>
							<div className={styles.varientSection}>
								{/* <VarientSelector colors={colorData} onSelected={handleSelected} /> */}
							</div>
							<div className={styles.buttonContainer}>
								<Button onClick={() => handleAddToWishlist()}>
									ADD TO WISHLIST
								</Button>
								<Select>
									<SelectTrigger
										data-testid="select-trigger"
										style={{
											backgroundColor: "#fff",
											border: "solid",
											borderWidth: "1px",
											borderColor: "#CCCBCE",
											color: "#000",
											fontSize: "12px",
											fontWeight: "600",
											lineHeight: "16px",
										}}
									>
										SIZE
									</SelectTrigger>
									<SelectContent>
										{sizes?.map((item) => (
											<SelectItem value={item?.value} key={item?.title}>
												{item?.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<Button
								variant="secondary"
								className={styles.cartButton}
								onClick={() => handleAddToBasket()}
							>
								Add To Bag
							</Button>
						</>
					)}
				</div>
			</div>

			{open && <MiniCart open={open} onOpenChange={setOpen} />}
			<Toaster />
		</section>
	);
}
