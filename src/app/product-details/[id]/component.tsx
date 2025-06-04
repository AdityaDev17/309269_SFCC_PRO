"use client";
import { colorData, productDetails, sizes } from "@/common/constant";
import {
	ADD_ITEM_TO_BASKET,
	ADD_ITEM_TO_PRODUCTLIST,
	CREATE_CART,
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
import VarientSelector from "@/components/molecules/VarientSelector/VarientSelector";
import Gallery from "@/components/organisms/Gallery/Gallery";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import MiniCart from "../../../components/organisms/MiniCart/MiniCart";
import styles from "./page.module.css";

export default function ProductDetails() {
	interface CartItemResponse {
		itemId: string;
		productName: string;
		quantity: number;
		price: number;
		productImage?: {
			data?: {
				imageGroups?: {
					images?: {
						link?: string;
					}[];
				}[];
			}[];
		};
	}
	interface CartItems {
		id: string;
		name: string;
		description: string;
		quantity: number;
		price: number;
		currency: string;
		productImage: string;
	}
	[];
	const { id } = useParams() as { id: string };
	const productId = id;
	const [open, setOpen] = useState(false);
	const [cartItems, setCartItems] = useState<CartItems[]>([]);

	const createCart = useMutation({
		mutationFn: (input: { items: { productId: string; quantity: number }[] }) =>
			graphqlRequest(CREATE_CART, { input }),
		retry: 3,
	});

	const addItemToBasket = useMutation({
		mutationFn: (input: {
			basketId: string;
			items: { productId: string; quantity: number }[];
		}) => graphqlRequest(ADD_ITEM_TO_BASKET, { input }),
		retry: 3,
	});

	// const [getCustomerProductList] = useLazyQuery(GET_CUSTOMER_PRODUCTLIST, {});

	// const [addItemToProductList] = useMutation(ADD_ITEM_TO_PRODUCTLIST, {});

	const { data } = useQuery({
		queryKey: ["Product",productId],
		queryFn: () =>
			graphqlRequest(GET_PRODUCT_DETAILS, { productId: productId }),
		enabled: !!productId,
	});
	type ProductImage = {
		link: string;
	};

	type ImageGroup = {
		images: ProductImage[];
	};

	const galleryImages = data?.productDetails?.imageGroups &&data?.productDetails?.imageGroups
		.flatMap((group: ImageGroup) => group?.images ?? [])
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

	const addItemToProductLists = async () => {
		// const listId = localStorage.getItem("customerListId");
		// await addItemToProductList({
		// 	variables: {
		// 		input: {
		// 			customerId: "cdwXs3wHc2wHaRwrbKkqYYxHgY",
		// 			items: {
		// 				productId: "ACNPETS_124",
		// 				public: false,
		// 				quantity: 1,
		// 				priority: 1,
		// 				type: "product",
		// 			},
		// 			listId: listId,
		// 		},
		// 	},
		// });
	};

	const handleAddToWishlist = async () => {
		// const productListId = localStorage?.getItem("customerListId");
		// if (productListId) {
		// 	addItemToProductLists();
		// } else {
		// 	const { data, error } = await getCustomerProductList({
		// 		variables: {
		// 			customerId: "cdwXs3wHc2wHaRwrbKkqYYxHgY",
		// 		},
		// 	});
		// 	if (error) {
		// 		console.error("Error fetching product lists:", error);
		// 		return;
		// 	}
		// 	localStorage.setItem(
		// 		"customerListId",
		// 		data?.getCustomerProductLists?.data?.[0]?.id,
		// 	);
		// 	addItemToProductLists();
		// }
	};

	const prepareCartItems = (response: CartItemResponse[], currency: string) => {
		setCartItems(
			response?.map((item) => ({
				id: item?.itemId,
				name: item?.productName,
				description: "",
				quantity: item?.quantity,
				price: item?.price,
				currency: currency,
				productImage:
					item?.productImage?.data?.[0]?.imageGroups?.[0]?.images?.[0]?.link ??
					"",
			})),
		);
	};

	const handleClick = async () => {
		const basketId = await sessionStorage.getItem("basketId");
		if (basketId) {
			const response = await addItemToBasket.mutateAsync({
				basketId,
				items: [{ productId, quantity: 1 }],
			});
			prepareCartItems(
				response?.addToCart?.productItems,
				response?.addToCart?.currency,
			);
		} else {
			const response = await createCart.mutateAsync({
				items: [{ productId, quantity: 1 }],
			});
			prepareCartItems(
				response?.createCart?.productItems,
				response?.createCart?.currency,
			);
			sessionStorage.setItem("basketId", response?.createCart?.basketId ?? "");
		}
		setOpen(true);
	};

	return (
		<section className={styles.componentLayout}>
			<div className={styles.firstLayout}>
				<div className={styles.gallery}>
					{data?.productDetails?.imageGroups!=null && galleryImages?.length !== 0 && (
						<Gallery images={galleryImages} />
					)}
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
						onClick={() => handleClick()}
					>
						Add To Bag
					</Button>
				</div>
			</div>
			{open && (
				<MiniCart cartItems={cartItems} open={open} onOpenChange={setOpen} />
			)}
		</section>
	);
}
