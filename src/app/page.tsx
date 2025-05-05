
import { homepageBanners, homepageProducts, statementBannerData } from "../common/constant";
import styles from "./page.module.css";
import ProductCard from "../components/molecules/ProductCard/ProductCard";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import('../components/molecules/Banner/Banner'))
const BannerCarousel = dynamic(() => import('../components/molecules/BannerCarousel/BannerCarousel'));
const ProductCardBanner = dynamic(() => import('../components/molecules/ProductCardBanner/ProductCardBanner'));
const GetTheLookBanner = dynamic(() => import('../components/molecules/GetTheLookBanner/GetTheLookBanner'));
const StatementBanner = dynamic(() => import('../components/molecules/StatementBanner/StatementBanner'));




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
 