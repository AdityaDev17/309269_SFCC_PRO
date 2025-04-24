import Banner from "@/components/molecules/Banner/Banner";
import BannerCarousel from "@/components/molecules/BannerCarousel/BannerCarousel";
import GetTheLookBanner from "@/components/molecules/GetTheLookBanner/GetTheLookBanner";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";
import ProductCardBanner from "@/components/molecules/ProductCardBanner/ProductCardBanner";
import { homepageBanners, homepageProducts } from "../common/constant"

export const revalidate = 60;

export default async function Home() {

  return (
    <>
      <Banner
        title={homepageBanners[0]?.title}
        buttonText={homepageBanners[0]?.buttonText}
        description={homepageBanners[0]?.description}
        backgroundImage={homepageBanners[0]?.backgroundImage}
        alignment={homepageBanners[0]?.alignment}
        buttonLink={homepageBanners[0]?.buttonLink}
      />
      
      <ProductImageCarousel productData={homepageProducts} cardsPerRow={3} />
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
    </>
  );
}
