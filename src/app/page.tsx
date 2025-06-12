import Banner from "@/components/molecules/Banner/Banner";
import BannerCarousel from "@/components/molecules/BannerCarousel/BannerCarousel";
import GetTheLookBanner from "@/components/molecules/GetTheLookBanner/GetTheLookBanner";
import ProductCardBanner from "@/components/molecules/ProductCardBanner/ProductCardBanner";
import StatementBanner from "@/components/molecules/StatementBanner/StatementBanner";

import { getHomepageData } from "@/sanity/queries/homepage";
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
  const homepageData = await getHomepageData();
  const banners = homepageData.banners || [];
  const statementBanner = homepageData.statementBanner;
  console.log(banners);
  return (
    <div className={styles.homeContainer}>
      {/* <Banner
        title="Testing Video"
        videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
      /> */}

      {banners[1] && (
        <Banner
          title={banners[1]?.title}
          buttonText={homepageBanners[0]?.buttonText}
          description={banners[2]?.description}
          videoUrl={banners[2]?.videoUrl}
          alignment={homepageBanners[0]?.alignment}
        />
      )}
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
      {banners[1] && (
        <Banner
          title={homepageBanners[1]?.title}
          buttonText={homepageBanners[1]?.buttonText}
          description={homepageBanners[1]?.description}
          backgroundImage={banners[1]?.backgroundImage}
          alignment={homepageBanners[1]?.alignment}
        />
      )}
      {banners[1] && (
        <Banner
          title={homepageBanners[2]?.title}
          buttonText={homepageBanners[2]?.buttonText}
          buttonColor={homepageBanners[2]?.buttonColor}
          description={homepageBanners[2]?.description}
          backgroundImage={banners[0]?.backgroundImage}
          alignment={homepageBanners[2]?.alignment}
          textColor={homepageBanners[2]?.textColor}
        />
      )}
    </div>
  );
}
