import { getHomepageContent } from "../utilities/getHomePageContent";
import Banner from "@/components/molecules/Banner/Banner";
import BannerCarousel from "@/components/molecules/BannerCarousel/BannerCarousel";
import GetTheLookBanner from "@/components/molecules/GetTheLookBanner/GetTheLookBanner";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";

export const revalidate = 60;

export default async function Home() {
  const { banners, products } = await getHomepageContent();
  //const isPromoEnabled = await enablePromoFlag();

  return (
    <>
      <Banner
        title={banners[0]?.title}
        buttonText={banners[0]?.buttonText}
        description={banners[0]?.description}
        backgroundImage={banners[0]?.backgroundImage}
        alignment={banners[0]?.alignment}
        buttonLink={banners[0]?.buttonLink}
      />

      <ProductImageCarousel productData={products} cardsPerRow={3} />
      <GetTheLookBanner />
      <BannerCarousel />
      
      <Banner
        title={banners[1]?.title}
        buttonText={banners[1]?.buttonText}
        description={banners[1]?.description}
        backgroundImage={banners[1]?.backgroundImage}
        alignment={banners[1]?.alignment}
        buttonLink={banners[1]?.buttonLink}
      />
      <Banner
        title={banners[2]?.title}
        buttonText={banners[2]?.buttonText}
        description={banners[2]?.description}
        backgroundImage={banners[2]?.backgroundImage}
        alignment={banners[2]?.alignment}
        buttonLink={banners[2]?.buttonLink}
      />
    </>
  );
}
