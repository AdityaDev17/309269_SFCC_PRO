import { sanityClient } from "../client";

export const getPageBySlugQuery = (slug: string) => `
*[_type == "page" && slug.current == "${slug}"][0]{
  title,
  slug,
  content[]{
    ...,
    image {
      asset->{
        url,
        metadata
      }
    }
  }
}
`;

export async function getPageData(slug: string) {
  return await sanityClient.fetch(getPageBySlugQuery(slug));
}
