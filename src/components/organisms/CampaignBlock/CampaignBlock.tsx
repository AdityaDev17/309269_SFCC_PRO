import { getActiveCampaign } from "@/sanity/queries/campaign";
import CampaignBanner from "@/components/molecules/Campaign/CampaignBanner";
import SanityWrapper from "@/sanity/SanityWrapper";

type CampaignBlockProps = {
  variant?: "hero" | "slim" | "inline";
};

const CampaignBlock = async ({ variant = "hero" }: CampaignBlockProps) => {
  const campaign = await getActiveCampaign();

  if (!campaign?._id) {
    return null;
  }

  return (
    <SanityWrapper
      id={campaign._id}
      type="campaign"
      path="bannerImage"
    >
      <CampaignBanner
        title={campaign.title}
        ctaText={campaign.ctaText}
        ctaLink={campaign.ctaLink}
        bannerImageUrl={campaign.bannerImageUrl}
        bannerAlt={campaign.bannerAlt}
        showCountdown={campaign.showCountdown}
        countdownEnd={campaign.countdownEnd}
        variant={variant}
      />
    </SanityWrapper>
  );
};

export default CampaignBlock;
