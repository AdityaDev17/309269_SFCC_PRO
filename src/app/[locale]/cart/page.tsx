"use client";
import { productData } from "@/common/constant";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./cart.module.css";
import Cart from "./component";

export default function CartPage() {
	const router = useRouter();
	const basketId = sessionStorage.getItem("basketId") ?? "";
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
				label="BAG"
			/>

			<Cart basketId={basketId} />
			<section className={styles.productCarouselSection}>
				<Typography
					type="Body"
					variant={1}
					fontWeight="bold"
					color="black"
					label={"YOU MAY ALSO LIKE"}
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
