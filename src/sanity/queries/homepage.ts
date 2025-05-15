import { sanityClient } from "@/sanity/client";
import groq from "groq";

export const getHomepageData = async () => {
  const query = groq`
    *[_type == "homepage"][0] {
      banners[] {
        title,
        description,
        buttonText,
        alignment,
        "backgroundImage": backgroundImage.asset->url
      },
      statementBanner {
        heading,
        subheading,
        description,
        imagePosition,
        imageAlt,
        "imageSrc": imageSrc.asset->url
      }
    }
  `;

  return await sanityClient.fetch(query);
};
