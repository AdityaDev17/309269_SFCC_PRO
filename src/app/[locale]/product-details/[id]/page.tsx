import { productData } from "@/common/constant";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import Banner from "@/components/molecules/Banner/Banner";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";

import { getTranslations } from "next-intl/server";
import ProductDetails from "./component";
import styles from "./page.module.css";
export default async function ProductDetailsPage({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { slug: string; name: string };
}) {
	const { slug, name } = searchParams;
	const t = await getTranslations("ProductDetails");
	return (
		<section className={styles.layout}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: slug, href: `/category/${slug}` },
					{ label: name, href: "" },
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
					label={t("may also like")}
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
