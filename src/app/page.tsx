import {
  homepageBanners,
  homepageProducts,
  statementBannerData,
} from "../common/constant";
import styles from "./page.module.css";
import ProductCard from "../components/molecules/ProductCard/ProductCard";
import dynamic from "next/dynamic";
import Banner from "@/components/molecules/Banner/Banner";
import BannerCarousel from "@/components/molecules/BannerCarousel/BannerCarousel";
import GetTheLookBanner from "@/components/molecules/GetTheLookBanner/GetTheLookBanner";
import ProductCardBanner from "@/components/molecules/ProductCardBanner/ProductCardBanner";
import StatementBanner from "@/components/molecules/StatementBanner/StatementBanner";
import { getHomepageData } from "@/sanity/queries/homepage";
// const Banner = dynamic(() => import('../components/molecules/Banner/Banner'))
// const BannerCarousel = dynamic(() => import('../components/molecules/BannerCarousel/BannerCarousel'));
// const ProductCardBanner = dynamic(() => import('../components/molecules/ProductCardBanner/ProductCardBanner'));
// const GetTheLookBanner = dynamic(() => import('../components/molecules/GetTheLookBanner/GetTheLookBanner'));
// const StatementBanner = dynamic(() => import('../components/molecules/StatementBanner/StatementBanner'));

export const revalidate = 60;

export default async function Home() {
  const homepageData = await getHomepageData();
  const banners = homepageData.banners || [];
  const statementBanner = homepageData.statementBanner;
  return (
    <div className={styles.homeContainer}>
      {banners[0] && (
        <Banner
          title={banners[0]?.title}
          buttonText={banners[0]?.buttonText}
          description={banners[0]?.description}
          backgroundImage={banners[0]?.backgroundImage}
          alignment={homepageBanners[0]?.alignment}
        />
      )}
      <div className={`${styles.cardLayout}`}>
        {homepageProducts.map((product, index) => (
          <ProductCard
            key={index}
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
      {banners[1] && (
        <Banner
          title={homepageBanners[1]?.title}
          buttonText={homepageBanners[1]?.buttonText}
          description={homepageBanners[1]?.description}
          backgroundImage={banners[2]?.backgroundImage}
          alignment={homepageBanners[1]?.alignment}
        />
      )}
      {banners[1] && (
        <Banner
          title={homepageBanners[2]?.title}
          buttonText={homepageBanners[2]?.buttonText}
          description={homepageBanners[2]?.description}
          backgroundImage={banners[1]?.backgroundImage}
          alignment={homepageBanners[2]?.alignment}
        />
      )}
    </div>
  );
}
