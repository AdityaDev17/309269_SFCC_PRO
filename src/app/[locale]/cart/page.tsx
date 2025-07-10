"use client";
import { productData } from "@/common/constant";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./cart.module.css";
import Cart from "./component";

export default function CartPage() {
	const t = useTranslations("Cart");
	const router = useRouter();
	return (
		<section className={styles.container}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "Bag", href: "/cart" },
				]}
				breadcrumbSeparator="/slash.svg"
			/>
			<Typography
				type={"Label"}
				variant={3}
				fontWeight="semibold"
				label={t("bag")}
			/>

			<Cart />
			<section className={styles.productCarouselSection}>
				<Typography
					type="Body"
					variant={1}
					fontWeight="bold"
					color="black"
					label={t("you-may-also-like")}
				/>
				<section>
					<ProductImageCarousel
						width={"100%"}
						withPagination={true}
						productData={productData}
						alignment="alignStart"
						onCardClick={(id) => router.push(`/product-details/${id}`)}
					/>
				</section>
			</section>
		</section>
	);
}
