"use client";
import { REMOVE_ITEM_FROM_WISHLIST, WISHLIST_DATA } from "@/common/schema";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import Typography from "@/components/atomic/Typography/Typography";
import ErrorComponent from "@/components/molecules/ErrorComponent/ErrorComponent";
import sonnerToast, { Toaster } from "@/components/molecules/Toast/Toast";
import { addToBasket } from "@/components/organisms/MiniCart/CartFuntions";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import ButtonList from "./component";
import styles from "./wishlist.module.css";

interface WishlistImage {
	alt: string;
	link: string;
	title: string;
	disBaseLink: string;
}

interface ImageGroup {
	images: WishlistImage[];
	viewType: string;
}

interface ProductImageData {
	id: string;
	brand: string;
	currency: string;
	c_sanityImages:[string];
	name: string;
	price: number;
}

type CustomerProductListItem = {
	id: string;
	productImage: {
		data: ProductImageData[];
	};
};

function Wishlist() {
	const customerId = sessionStorage.getItem("customer_id") ?? "";
	const router = useRouter();

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["Wishlist", customerId],
		queryFn: () =>
			graphqlRequest(WISHLIST_DATA, {
				customerId,
			}),
		enabled: !!customerId,
	});

	const removeFromWishlist = useMutation({
		mutationFn: async ({
			customerId,
			listId,
			itemId,
		}: {
			customerId: string;
			listId: string;
			itemId: string;
		}) => {
			return graphqlRequest(REMOVE_ITEM_FROM_WISHLIST, {
				customerId,
				listId,
				itemId,
			});
		},
	});

	const moveToBagMutation = useMutation({
		mutationFn: async ({ productId }: { productId: string }) =>
			await addToBasket(productId),
	});

	const wishlistData =
		data?.getWishlist?.data?.[0]?.customerProductListItems?.map(
			(item: CustomerProductListItem) => {
				const productData = item?.productImage?.data;
				const firstProduct = Array.isArray(productData) && productData.length > 0 ? productData[0] : null;

				return {
					productId: firstProduct?.id ?? "",
					productTitle: firstProduct?.name ?? "",
					bagPrice: firstProduct?.price ?? "",
					currency: firstProduct?.currency ?? "",
					productImage:
						firstProduct?.c_sanityImages?.[0] ?? "",
					itemId: item?.id ?? "",
					listId: data?.getWishlist?.data?.[0]?.id ?? "",
					wishListed: true
				};
			} 
		);

	const items = data?.getWishlist?.data?.[0]?.customerProductListItems || [];

	const uniqueBrands = items
		.map(
			(item: CustomerProductListItem) => item?.productImage?.data?.[0]?.brand,
		)
		.filter(
			(
				brand: string | undefined,
				index: number,
				self: (string | undefined)[],
			) => brand !== undefined && self.indexOf(brand) === index,
		);

	// handler for navigating to PDP
	const handleProductClick = (productId: string) => {
		router.push(`/product-details/${productId}`);
	};

	const removeFromWishListHandler = async ( listId: string, itemId: string) => {
		console.log(listId, itemId);
		try {
			await removeFromWishlist.mutateAsync({ customerId, listId, itemId });
		} catch(err) {
			console.log("🚀 ~ removeFromWishListHandler ~ err:", err)
			await refetch();
		}
	}

	const handleMoveToBag = async (
		productId: string,
		itemId: string,
		listId: string,
	) => {
		try {
			await moveToBagMutation.mutateAsync({ productId });
			await removeFromWishlist.mutateAsync({ customerId, listId, itemId });
			await refetch();
			sonnerToast("Item moved to Bag!", {
				className: `${styles.Toast} ${styles.ToastSuccess}`,
				unstyled: true,
			});
		} catch (error: unknown) {
			if (
				typeof error === "object" &&
				error !== null &&
				"graphQLErrors" in error
			) {
				const e = error as {
					graphQLErrors?: { extensions?: { http?: { status?: number } } }[];
				};
				const statusCode = e.graphQLErrors?.[0]?.extensions?.http?.status;
				if (statusCode === 204 || statusCode === 200) {
					await refetch();
					sonnerToast("Item moved to Bag!", {
						className: `${styles.Toast} ${styles.ToastSuccess}`,
						unstyled: true,
					});
				} else {
					sonnerToast("Failed to move item to Bag.", {
						className: `${styles.Toast} ${styles.ToastError}`,
						unstyled: true,
					});
				}
			} else {
				await refetch();
				sonnerToast("Item moved to Bag!.", {
					className: `${styles.Toast} ${styles.ToastError}`,
					unstyled: true,
				});
			}
		}
	};

	const t = useTranslations("Wishlist");
	return isLoading ? (
		<div className={styles.container}>
			<Breadcrumbs
				breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
				breadcrumbSeparator="/slash.svg"
			/>

			<Typography
				type={"Label"}
				variant={3}
				fontWeight="semibold"
				label={t("title")}
			/>

			{/* Filters skeleton */}
			<Skeleton className={styles.skeletonFilter} />

			{/* Product cards skeletons */}
			<div className={styles.skeletonProductContainer}>
				{Array.from({ length: 1 })?.map((_, i) => (
					<div key={`skeleton-${Date.now()}-${Math.random()}`}>
						<div
							key={`skeleton-${Date.now()}-${Math.random()}`}
							className={styles.skeletonProductCard}
						>
							<Skeleton className={styles.skeletonProductImage} />
							<Skeleton className={styles.skeletonProductTitle} />
							<Skeleton className={styles.skeletonProductPrice} />
						</div>
					</div>
				))}
			</div>
		</div>
	) : wishlistData?.length === 0 ? (
		<ErrorComponent
			errImg="./images/wishlistEmpty.svg"
			imgHeight={205}
			imgWidth={216}
			text1={t("text-empty-wishlist")}
			buttonText={t("continue-shopping")}
		/>
	) : (
		<div className={styles.container}>
			<Breadcrumbs
				breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
				breadcrumbSeparator="/slash.svg"
			/>
			<Typography
				type={"Label"}
				variant={3}
				fontWeight="semibold"
				label={t("title")}
			/>
			{/* {data && uniqueBrands && <ButtonList buttonNames={uniqueBrands} />} */}
			{data && wishlistData && (
				<ProductImageCarousel
					width="100%"
					productData={wishlistData}
					alignment="alignStart"
					withPagination={false}
					// moveToBag={true}
					onCardClick={handleProductClick}
					// onMoveToBag={handleMoveToBag}
					removeFromWishListHandler={removeFromWishListHandler}
				/>
			)}
			<Toaster />
		</div>
	);
}

export default Wishlist;
