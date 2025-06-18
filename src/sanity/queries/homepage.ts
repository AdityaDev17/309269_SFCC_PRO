import { sanityClient } from "@/sanity/client";
import groq from "groq";
import { draftMode } from "next/headers";

export const getHomepageData = async () => {
  const query = groq`
     {
    "banners": *[_type == "banner" && _id in *[_type == "homepage"][0].banners[]._ref && visibility == true] | order(priority desc){
      _id,
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
  const {isEnabled} = await draftMode();
  return await sanityClient.fetch(query, {},
    isEnabled ? {
      perspective: 'drafts',
      useCdn: false,
      stega: true
    }: undefined);
};
