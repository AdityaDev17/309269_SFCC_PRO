import { sanityClient } from "@/sanity/client";
import groq from "groq";

export const getHomepageData = async () => {
  const query = groq`
     {
    "banners": *[_type == "banner" && _id in *[_type == "homepage"][0].banners[]._ref && visibility == true] | order(priority desc){
      title,
      description,
      "backgroundImage": backgroundImage.asset->url,
      "videoUrl": video.asset->url,
      altText,
      variant,
      priority
    }
  }
  `;

  return await sanityClient.fetch(query);
};
