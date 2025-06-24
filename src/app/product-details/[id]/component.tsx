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
	// interface CartItemResponse {
	// 	itemId: string;
	// 	productName: string;
	// 	quantity: number;
	// 	price: number;
	// 	productId: string;
	// 	productImage?: {
	// 		data?: {
	// 			imageGroups?: {
	// 				images?: {
	// 					link?: string;
	// 				}[];
	// 			}[];
	// 		}[];
	// 	};
	// }
	// interface CartItems {
	// 	id: string;
	// 	name: string;
	// 	description: string;
	// 	quantity: number;
	// 	price: number;
	// 	currency: string;
	// 	productImage: string;
	// 	itemId: string;
	// }
	// [];
	const { id } = useParams() as { id: string };
	const productId = id;
	const [open, setOpen] = useState(false);
	// const [cartItems, setCartItems] = useState<CartItems[]>([]);
	const [toast, setToast] = useState(false);

	// const createCart = useMutation({
	// 	mutationFn: (input: { items: { productId: string; quantity: number }[] }) =>
	// 		graphqlRequest(CREATE_CART, { input }),
	// 	retry: 3,
	// });

	// const addItemToBasket = useMutation({
	// 	mutationFn: (input: {
	// 		basketId: string;
	// 		items: { productId: string; quantity: number }[];
	// 	}) => graphqlRequest(ADD_ITEM_TO_BASKET, { input }),
	// 	retry: 3,
	// });

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

		if (response?.customerProductListsInfo?.data) {
			const wishLists =
				response?.customerProductListsInfo?.data?.filter(
					(list: { type: string }) => list.type === "wish_list",
				) || [];
			const isItemInWishlist = wishLists?.[0]?.customerProductListItems?.find(
				(i: { productId: string }) => i.productId === productId,
			);
			if (!isItemInWishlist) {
				sonnerToast.success("Added to wishlist", {});
				addItemToProductLists(wishLists?.[0]?.id, customerId);
			} else {
				sonnerToast.success("Already in wishlist", {});
			}
		} else {
			const response = await createCustomerProductList.mutateAsync({
				customerId,
				type: "wish_list",
			});
			addItemToProductLists(
				response?.createCustomerProductList?.id,
				customerId,
			);
		}
	};

	// const prepareCartItems = (response: CartItemResponse[], currency: string) => {
	// 	setCartItems(
	// 		response?.map((item) => ({
	// 			id: item?.productId,
	// 			itemId: item?.itemId,
	// 			name: item?.productName,
	// 			description: "",
	// 			quantity: item?.quantity,
	// 			price: item?.price,
	// 			currency: currency,
	// 			productImage:
	// 				item?.productImage?.data?.[0]?.imageGroups?.[0]?.images?.[0]?.link ??
	// 				"",
	// 		})),
	// 	);
	// };

	// const handleClick = async () => {
	// 	const basketId = await sessionStorage.getItem("basketId");
	// 	if (basketId) {
	// 		const response = await addItemToBasket.mutateAsync({
	// 			basketId,
	// 			items: [{ productId, quantity: 1 }],
	// 		});
	// 		prepareCartItems(
	// 			response?.addToCart?.productItems,
	// 			response?.addToCart?.currency,
	// 		);
	// 	} else {
	// 		const response = await createCart.mutateAsync({
	// 			items: [{ productId, quantity: 1 }],
	// 		});
	// 		prepareCartItems(
	// 			response?.createCart?.productItems,
	// 			response?.createCart?.currency,
	// 		);
	// 		sessionStorage.setItem("basketId", response?.createCart?.basketId ?? "");
	// 	}
	// 	setOpen(true);
	// };

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
					{data?.productDetails?.imageGroups != null &&
						galleryImages?.length !== 0 && <Gallery images={galleryImages} />}
				</div>
				<div className={styles.accordion}>
					<Accordion
						items={accordionData}
						contentStyle={styles.accordionContent}
					/>
				</div>
				<div className={styles.productDetails}>
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
								{sizes?.map((item) => {
									return (
										<SelectItem value={item?.value} key={item?.title}>
											{item?.title}
										</SelectItem>
									);
								})}
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
				</div>
			</div>
			{open && <MiniCart open={open} onOpenChange={setOpen} />}
			<Toaster />
		</section>
	);
}
