import banner from "./banner";
import homePage from "./homePage";
import landingPage from "./landingPage";
import mediaGroup from "./mediaGroup";
import product from "./product";
import variant from "./variant";
import campaign from "./campaign";
import promotion from "./promotion";
// import test from "node:test";
import article from "./article";
import testimonial from "./testimonial";
import bannerSection from "./sections/bannerSection";
import editorialSection from "./sections/editorialSection";
import testimonialSection from "./sections/testimonialSection";
import productCarouselSection from "./sections/productCarouselSection";
import hero from "./modules/hero";
import twoColumn from "./modules/twoColumn";

export const schemaTypes = [
  //Documents
  product,
  variant,
  campaign, 
  promotion,
  banner,
  homePage,
  mediaGroup,
  landingPage,
  article,
  testimonial,
  //Sections
  bannerSection,
  editorialSection,
  testimonialSection,
  productCarouselSection,
  //Components
  hero,
  twoColumn,
];
