import groq from "groq";
import { sanityClient } from "@/sanity/client";

export const getLandingPageData = async (slug) => {
  const query = groq`
  *[_type == "landingPage" && slug.current == $slug][0]{
    _id,
      title,
      slug,
      publishDate,
      content[]{
        _type,
        _key,
        ...select(
          _type == "hero" => {
            heading,
            subheading,
            "backgroundImage": backgroundImage.asset->url
          },
          _type == "twoColumnText" => {
            leftText,
            rightText
          }
          // Add more section types as needed
        )
      }
    }
  `;
  return await sanityClient.fetch(query, { slug });
};
