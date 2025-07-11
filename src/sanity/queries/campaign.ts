import { sanityClient } from "../client";

export const getActiveCampaign = async () => {
  const query = `
    *[_type == "campaign" && isActive == true && startDate <= now() && endDate >= now()] | order(startDate desc)[0]{
      _id,
      title,
      slug,
      ctaText,
      ctaLink,
      showCountdown,
      countdownEnd,
      "bannerImageUrl": bannerImage.asset->url,
      "bannerAlt": bannerImage.alt
    }
  `;
  return sanityClient.fetch(query);
};
