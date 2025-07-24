// /sanity/queries/campaign.ts
import { sanityClient } from "../client";

export const getActiveCampaign = async () => {
  const query = `
    *[_type == "campaign" && enabled == true && startDate <= now() && endDate >= now()] | order(startDate desc)[0] {
      _id,
      title,
      description,
      startDate,
      endDate,
      image {
        asset->{
          url
        }
      },
      promotions[]->{
        title,
        calloutMsg
      }
    }
  `;

  return await sanityClient.fetch(query);
};
