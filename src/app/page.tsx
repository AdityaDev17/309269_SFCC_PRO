import Banner from "@/components/molecules/Banner/Banner";
import BannerCarousel from "@/components/molecules/BannerCarousel/BannerCarousel";
import GetTheLookBanner from "@/components/molecules/GetTheLookBanner/GetTheLookBanner";
import ProductCardBanner from "@/components/molecules/ProductCardBanner/ProductCardBanner";
import { homepageBanners, homepageProducts } from "../common/constant";
import styles from "./page.module.css";
import ProductCard from "../components/molecules/ProductCard/ProductCard";

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
        buttonLink={homepageBanners[0]?.buttonLink}
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

      <Banner
        title={homepageBanners[1]?.title}
        buttonText={homepageBanners[1]?.buttonText}
        description={homepageBanners[1]?.description}
        backgroundImage={homepageBanners[1]?.backgroundImage}
        alignment={homepageBanners[1]?.alignment}
        buttonLink={homepageBanners[1]?.buttonLink}
      />

      <Banner
        title={homepageBanners[2]?.title}
        buttonText={homepageBanners[2]?.buttonText}
        description={homepageBanners[2]?.description}
        backgroundImage={homepageBanners[2]?.backgroundImage}
        alignment={homepageBanners[2]?.alignment}
        buttonLink={homepageBanners[2]?.buttonLink}
      />
   </div>
  );
}
 