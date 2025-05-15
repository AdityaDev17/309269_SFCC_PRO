// /sanity/queries/product.ts
import { groq } from "next-sanity";

export const PRODUCT_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    currency,
    longDescription,
    publishedAt,
    metaTags[]{
      id,
      value
    },
    imageGroups[]{
      images[]{
        image{
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`;
