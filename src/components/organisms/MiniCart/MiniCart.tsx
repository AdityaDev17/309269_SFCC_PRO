"use client";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/atomic/Button/Button";
import Typography from "@/components/atomic/Typography/Typography";
import CartItemList from "@/components/molecules/CartItemList/CartItemList";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/molecules/Drawer/Drawer";
import {
	getBasketDetail,
	handleDeleteItem,
	handleUpdateQuantity,
} from "@/components/organisms/MiniCart/CartFuntions";
import styles from "@/components/organisms/MiniCart/MiniCart.module.css";
import { CartItem, MiniCartProps } from "@/common/type";
import { useTranslations } from "next-intl";



const MiniCart = ({
	triggerType,
	bagIcon,
	open,
	onOpenChange,
}: MiniCartProps) => {
	const router = useRouter();
	const t = useTranslations("MiniCart");
	const basketId = sessionStorage.getItem("basketId") ?? "";
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["Basket", basketId],
		queryFn: () => getBasketDetail(),
		enabled: !!basketId,
	});

	console.log(isLoading);
	console.log(data);

	const cartItems = data?.cartItems ?? [];
	const subTotal = data?.subTotal ?? 0;

	const removeBasketMutation = useMutation({
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
			const response = await removeBasketMutation.mutateAsync({ itemId });
			console.log("Remove response:", response);
		} catch (error) {
			console.error("Error removing basket item:", error);
		}
	};

	const updateBasketMutation = useMutation({
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
			const response = await updateBasketMutation.mutateAsync({
				itemId,
				quantity: newQuantity,
			});
			console.log("Update response:", response);
		} catch (error) {
			console.error("Error updating basket item:", error);
		}
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
								label={t("bag-title")}
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
						<div className={styles.cartItemList}>
							<CartItemList
								cartItems={cartItems}
								onDeleteItem={onDeleteItem}
								onUpdateQuantity={onUpdateQuantity}
								miniCart={true}
							/>
						</div>

						<DrawerFooter>
							<div className={styles.footerWrapper}>
								<div className={styles.bagWrapper}>
									<Typography
										type={"Label"}
										variant={3}
										fontWeight="medium"
										label={t("subtotal")}
									/>
									<Typography
										type={"Body"}
										variant={3}
										label={t("including-taxes")}
										color="#75757a"
									/>
								</div>
								<Typography type="Label" variant={3} label={`${subTotal}`} />
							</div>
							<div className={styles.bagButton}>
								<Button
									variant="icon"
									className={styles.viewbag}
									onClick={() => {
										router.push("/cart");
									}}
								>
									{t("view-bag")}
								</Button>
							</div>
						</DrawerFooter>
					</>
				) : isLoading ? (
					<div className={styles.productSkeletonWrapper}>
						<Skeleton className={styles.titleSkeleton} />
						<Skeleton className={styles.priceSkeleton} />

						<div>
							<Skeleton className={styles.descLineSkeleton} />
							<Skeleton className={styles.descLineSkeletonShort} />
						</div>

						<Skeleton className={styles.sizeLabelSkeleton} />

						<div className={styles.sizeGridSkeleton}>
							<Skeleton className={styles.sizeSkeleton} />
							<Skeleton className={styles.sizeSkeleton} />
						</div>

						<Skeleton className={styles.cartButtonSkeleton} />
					</div>
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
								label={t("empty-message")}
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
