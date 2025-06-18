"use client";
import {
	DELETE_BASKET_ITEM,
	GET_BASKET,
	UPDATE_BASKET_ITEM,
} from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../../atomic/Button/Button";
import Typography from "../../atomic/Typography/Typography";
import CartItemList from "../../molecules/CartItemList/CartItemList";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../../molecules/Drawer/Drawer";
import styles from "./MiniCart.module.css";
export interface CartItem {
	id: string;
	name: string;
	description: string;
	quantity: number;
	price: number;
	currency: string;
	productImage: string;
	itemId: string;
}

interface MiniCartProps {
	cartItem?: CartItem[];
	onDeleteItems?: (itemId: string) => void;
	onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
	triggerType?: "button" | "icon";
	bagIcon?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	basketId?: string;
}
interface CartItemResponse {
	productId: string;
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
	itemId: string;
}
[];

const MiniCart = ({
	cartItem,
	// onDeleteItems,
	// onUpdateQuantity,
	triggerType,
	bagIcon,
	open,
	onOpenChange,
	basketId,
}: MiniCartProps) => {
	const router = useRouter();
	const { data } = useQuery({
		queryKey: ["Basket", basketId],
		queryFn: () => graphqlRequest(GET_BASKET, { basketId }),
		enabled: !!basketId,
	});

	const [cartItems, setCartItems] = useState<CartItems[]>(cartItem ?? []);

	const prepareCartItems = (response: CartItemResponse[], currency: string) => {
		setCartItems(
			response?.map((item) => ({
				id: item?.productId,
				name: item?.productName,
				description: "",
				quantity: item?.quantity,
				price: item?.price,
				currency: currency,
				itemId: item?.itemId,
				productImage:
					item?.productImage?.data?.[0]?.imageGroups?.[0]?.images?.[0]?.link ??
					"",
			})),
		);
	};

	const removeBasketMutation = useMutation({
		mutationFn: (input: { basketId: string; itemId: string }) =>
			graphqlRequest(DELETE_BASKET_ITEM, { input }),
		retry: 3,
	});
	const getBasketDetails = async () => {
		const basketId = sessionStorage.getItem("basketId") ?? "";
		const response = await graphqlRequest(GET_BASKET, { basketId });
		prepareCartItems(
			response?.basketInfo?.productItems,
			response?.basketInfo?.currency,
		);
	};
	const handleDeleteItem = async (itemId: string) => {
		console.log("id", itemId);
		const basketId = sessionStorage.getItem("basketId") ?? "";
		try {
			const response = await removeBasketMutation.mutateAsync({
				basketId,
				itemId,
			});
			await getBasketDetails();
			console.log("Remove response:", response);
		} catch (error) {
			console.error("Error removing basket item:", error);
		}
	};
	const onDeleteItem = (itemId: string) => {
		handleDeleteItem(itemId);
	};

	const updateBasketMutation = useMutation({
		mutationFn: (input: {
			basketId: string;
			itemId: string;
			quantity: number;
		}) => graphqlRequest(UPDATE_BASKET_ITEM, { input }),
		retry: 3,
	});
	const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
		console.log("id", itemId, newQuantity);
		const basketId = sessionStorage.getItem("basketId") ?? "";
		try {
			const response = await updateBasketMutation.mutateAsync({
				basketId,
				itemId,
				quantity: newQuantity,
			});
			await getBasketDetails();
			console.log("Update response:", response);
		} catch (error) {
			console.error("Error updating basket item:", error);
		}
	};
	const onUpdateQuantity = (itemId: string, newQuantity: number) => {
		handleUpdateQuantity(itemId, newQuantity);
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange} side="right">
			<DrawerTrigger asChild />
			<DrawerContent side="right">
				<DrawerHeader className={styles.bagHeader}>
					<div className={styles.bagWrapper}>
						<DrawerTitle>
							{" "}
							<Typography
								type={"Label"}
								variant={3}
								fontWeight="medium"
								label="BAG"
							/>
						</DrawerTitle>

						{cartItems?.length > 0 && (
							<Typography
								type={"Body"}
								variant={3}
								label={`${cartItems.length} items`}
								color="#75757a"
							/>
						)}
					</div>

					<DrawerClose className={styles.close} asChild>
						<Image
							src="/images/expand.svg"
							alt="Close"
							width={48}
							height={48}
						/>
					</DrawerClose>
				</DrawerHeader>
				{cartItems?.length > 0 ? (
					<>
						<CartItemList
							cartItems={cartItems}
							onDeleteItem={onDeleteItem}
							onUpdateQuantity={onUpdateQuantity}
							miniCart={true}
						/>

						<DrawerFooter>
							<div className={styles.footerWrapper}>
								<div className={styles.bagWrapper}>
									<Typography
										type={"Label"}
										variant={3}
										fontWeight="medium"
										label="SUBTOTAL"
									/>
									<Typography
										type={"Body"}
										variant={3}
										label="(including taxes)"
										color="#75757a"
									/>
								</div>
								<Typography type="Label" variant={3} label="$100" />
							</div>
							<div className={styles.bagButton}>
								<Button
									variant="icon"
									className={styles.viewbag}
									onClick={() => {
										router.push("/cart");
									}}
								>
									VIEW BAG
								</Button>
							</div>
						</DrawerFooter>
					</>
				) : (
					<div className={styles.emptyContainer}>
						<div className={styles.emptyMessage}>
							<Image
								src="/images/emptyBag.svg"
								alt=" Empty Bag"
								width={222}
								height={205}
							/>
							<Typography
								type="Body"
								variant={2}
								label="There is nothing in your bag!"
								color="#75757a"
							/>
						</div>
					</div>
				)}
			</DrawerContent>
		</Drawer>
	);
};
export default MiniCart;

/**
 * ## MiniCart
 *
 * The `MiniCart` displays a compact shopping cart drawer that allows users to view, update, or remove items from their cart and proceed to view the full shopping bag.
 *
 * ### Props
 *
 * - `cartItems`: An array of items in the cart. Each item includes `id`, `name`, `description`, `quantity`, `price`, `currency`, and `productImage`.
 * - `onDeleteItem` (optional): Callback fired when an item is removed from the cart.
 * - `onUpdateQuantity` (optional): Callback triggered when the quantity of an item is changed.
 * - `triggerType` (optional): Defines how the drawer is triggered, either `"button"` or `"icon"`. Defaults to a button if not specified.
 * - `bagIcon` (optional): Path to the icon image used when `triggerType` is `"icon"`.
 *
 * ### Behavior
 *
 * - Displays the cart in a slide-in drawer from the right side.
 * - Opens via a button or custom icon trigger depending on `triggerType`.
 * - If `cartItems` is empty, a message and an empty bag image are shown.
 * - When items are present, it shows a list using `CartItemList`, displays subtotal, and includes a "VIEW BAG" button.
 *
 * ### Used Components
 *
 * - `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, `DrawerClose` for building the drawer.
 * - `Typography` for consistent text styling.
 * - `CartItemList` for rendering individual cart items.
 * - `Button` for triggering the drawer and actions inside it.
 * - `Image` from `next/image` for optimized rendering of icons and illustrations.
 *
 * ### Styling
 *
 * Custom styles are applied from `MiniCart.module.css`, including layout, drawer content, and responsiveness.
 * Classes like `bagHeader`, `footerWrapper`, `emptyMessage`, and `bagIcon` define the appearance of different sections.
 *
 * ### Example
 *
 * ```tsx
 *
 *
 * const cartData: CartItem[] = [
 *   {
 *     id: "1",
 *     name: "Sneakers",
 *     description: "Comfortable running shoes",
 *     quantity: 2,
 *     price: 50,
 *     currency: "USD",
 *     productImage: "/images/sneakers.png",
 *   },
 * ];
 *
 * export default function Page() {
 *   const handleViewBag = () => {
 *     console.log("Navigating to full cart");
 *   };
 *
 *   return (
 *     <MiniCart
 *       cartItems={cartData}
 *       triggerType="icon"
 *       bagIcon="/icons/cart.svg"
 *     />
 *   );
 * }
 * ```
 */
