"use client";

import styles from "./Campaign.module.css";

type CampaignBannerProps = {
  title: string;
  ctaText?: string;
  ctaLink?: string;
  bannerImageUrl?: string;
  bannerAlt?: string;
  showCountdown?: boolean;
  countdownEnd?: string;
  variant?: "hero" | "slim" | "inline";
};

const CampaignBanner = ({
  title,
  ctaText,
  ctaLink,
  bannerImageUrl,
  bannerAlt,
  showCountdown,
  countdownEnd,
  variant = "hero",
}: CampaignBannerProps) => {
  

  const formattedDate = countdownEnd
    ? new Date(countdownEnd).toLocaleDateString("en-GB")
    : "";

  return (
    <div className={`${styles.campaignBanner} ${styles[variant]}`}>
      {bannerImageUrl && (
        <img src={bannerImageUrl} alt={bannerAlt || title} />
      )}

      <div className={styles.campaignContent}>
        <h2 className={styles.campaignTitle}>{title}</h2>

        {ctaText && (
          <a href={ctaLink || "#"} className={styles.campaignCTA}>
            {ctaText}
          </a>
        )}

        {showCountdown && countdownEnd && (
          <p className={styles.campaignCountdown}>
            Ends on {formattedDate}
          </p>
        )}
      </div>
    </div>
  );
};

export default CampaignBanner;
