"use client";
import { WISHLIST_DATA } from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/atomic/Typography/Typography";
import ErrorComponent from "../../components/molecules/ErrorComponent/ErrorComponent";
import { Toaster } from "../../components/molecules/Toast/Toast";
import ProductImageCarousel from "../../components/organisms/ProductImageCarousel/ProductImageCarousel";
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
	imageGroups: ImageGroup[];
	name: string;
	price: number;
}

type CustomerProductListItem = {
	productImage: {
		data: ProductImageData[];
	};
};

function Wishlist() {
	const customerId = sessionStorage.getItem("customer_id") ?? "";
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ["Wishlist", customerId],
		queryFn: () =>
			graphqlRequest(WISHLIST_DATA, {
				customerId,
			}),
		enabled: !!customerId,
	});

	const wishlistData =
		data?.getWishlist?.data?.[0]?.customerProductListItems?.map(
			(item: CustomerProductListItem) => ({
				productId: item?.productImage?.data[0]?.id,
				productTitle: item?.productImage?.data[0]?.name,
				bagPrice: item?.productImage?.data[0]?.price,
				currency: item?.productImage?.data[0]?.currency,
				productImage:
					item?.productImage?.data[0]?.imageGroups[0]?.images[0]?.link,
			}),
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

	return wishlistData?.length === 0 ? (
		<ErrorComponent
			errImg="./images/wishlistEmpty.svg"
			imgHeight={205}
			imgWidth={216}
			text1="Your wishlist is empty!"
			buttonText="CONTINUE SHOPPING"
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
				label="WISHLIST"
			/>
			{data && uniqueBrands && <ButtonList buttonNames={uniqueBrands} />}

			{data && wishlistData && (
				<ProductImageCarousel
					width="100%"
					productData={wishlistData}
					alignment="alignStart"
					withPagination={false}
					moveToBag={false}
					onCardClick={handleProductClick}
					//   onMoveToBag={() => {
					//     sonnerToast("Item has been moved to your Bag!", {
					//       className: `${styles.Toast} ${styles.ToastSuccess}`,
					//       unstyled: true,
					//     });
					//   }}
				/>
			)}
			<Toaster />
		</div>
	);
}

export default Wishlist;
