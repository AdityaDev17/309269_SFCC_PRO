import { getActiveCampaign } from "@/sanity/queries/campaign";
import CampaignBanner from "@/components/molecules/Campaign/CampaignBanner";
import SanityWrapper from "@/sanity/SanityWrapper";

type CampaignBlockProps = {
  variant?: "hero" | "slim" | "inline";
};

const CampaignBlock = async ({ variant = "hero" }: CampaignBlockProps) => {
  const campaign = await getActiveCampaign();

  if (!campaign?._id) return null;

  return (
    <SanityWrapper id={campaign._id} type="campaign" path="image">
      <CampaignBanner
        title={campaign.title}
        description={campaign.description}
        imageUrl={campaign.image?.asset?.url}
        startDate={campaign.startDate}
        endDate={campaign.endDate}
        promotions={campaign.promotions}
        variant={variant}
      />
    </SanityWrapper>
  );
};

export default CampaignBlock;
