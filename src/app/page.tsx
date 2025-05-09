import Banner from "@/components/molecules/Banner/Banner";
import BannerCarousel from "@/components/molecules/BannerCarousel/BannerCarousel";
import GetTheLookBanner from "@/components/molecules/GetTheLookBanner/GetTheLookBanner";
import ProductCardBanner from "@/components/molecules/ProductCardBanner/ProductCardBanner";
import StatementBanner from "@/components/molecules/StatementBanner/StatementBanner";
import dynamic from "next/dynamic";
import {
	homepageBanners,
	homepageProducts,
	statementBannerData,
} from "../common/constant";
import ProductCard from "../components/molecules/ProductCard/ProductCard";
import styles from "./page.module.css";

// const Banner = dynamic(() => import('../components/molecules/Banner/Banner'))
// const BannerCarousel = dynamic(() => import('../components/molecules/BannerCarousel/BannerCarousel'));
// const ProductCardBanner = dynamic(() => import('../components/molecules/ProductCardBanner/ProductCardBanner'));
// const GetTheLookBanner = dynamic(() => import('../components/molecules/GetTheLookBanner/GetTheLookBanner'));
// const StatementBanner = dynamic(() => import('../components/molecules/StatementBanner/StatementBanner'));

export const revalidate = 60;

export default async function Home() {
	return (
		<div className={styles.homeContainer}>
			<Banner
				title={homepageBanners[0]?.title}
				buttonText={homepageBanners[0]?.buttonText}
				description={homepageBanners[0]?.description}
				backgroundImage={homepageBanners[0]?.backgroundImage}
				alignment={homepageBanners[0]?.alignment}
			/>

			<div className={`${styles.cardLayout}`}>
				{homepageProducts.map((product) => (
					<ProductCard
						key={product.productId}
						productId={product.productId}
						productImage={product.productImage}
						productTitle={product.productTitle}
						productDesc={product.productDesc}
					/>
				))}
			</div>
			<GetTheLookBanner />
			<ProductCardBanner />
			<BannerCarousel />
			<StatementBanner
				imageSrc={statementBannerData.imageSrc}
				imageAlt={statementBannerData.imageAlt}
				imagePosition={statementBannerData.imagePosition}
				heading={statementBannerData.heading}
				subheading={statementBannerData.subheading}
				description={statementBannerData.description}
			/>
			<Banner
				title={homepageBanners[1]?.title}
				buttonText={homepageBanners[1]?.buttonText}
				description={homepageBanners[1]?.description}
				backgroundImage={homepageBanners[1]?.backgroundImage}
				alignment={homepageBanners[1]?.alignment}
			/>

			<Banner
				title={homepageBanners[2]?.title}
				buttonText={homepageBanners[2]?.buttonText}
				description={homepageBanners[2]?.description}
				backgroundImage={homepageBanners[2]?.backgroundImage}
				alignment={homepageBanners[2]?.alignment}
			/>
		</div>
	);
}
