import banner from './banner'
import homePage from './homePage'
import landingPage from './landingPage'
import mediaGroup from './mediaGroup'
import {productType} from './product'
import test from 'node:test'
import article from './article'
import testimonial from './testimonial'
import bannerSection from './sections/bannerSection'
import editorialSection from './sections/editorialSection'
import testimonialSection from './sections/testimonialSection'
import productCarouselSection from './sections/productCarouselSection'
import hero from './modules/hero'
import twoColumn from './modules/twoColumn'

export const schemaTypes = [
  //Documents
  productType,
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
]
