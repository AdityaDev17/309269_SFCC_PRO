import { productData } from "@/common/constant";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import Banner from "@/components/molecules/Banner/Banner";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";
import ProductDetails from "./component";
import styles from "./page.module.css";
export default async function ProductDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	console.log("getProductId", id);
	return (
		<section className={styles.layout}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "Shop", href: "/shop" },
					{ label: "Lipstick" },
				]}
				breadcrumbSeparator="/slash.svg"
			/>
			<ProductDetails />
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
					/>
				</section>
			</section>
			<section className={styles.bannerLayout}>
				<Banner
					title="VELVET NUIT SET"
					buttonText="View More"
					description="Sumptuous lipsticks in rich, velvety shades, designed for elegance."
					backgroundImage="/images/productBanner.svg"
					alignment="left-top"
				/>
			</section>
		</section>
	);
}
