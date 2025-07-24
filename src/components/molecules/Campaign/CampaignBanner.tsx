"use client";

import styles from "./Campaign.module.css";

type Promotion = {
  title: string;
  calloutMsg?: string;
};

type CampaignBannerProps = {
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  startDate?: string;
  endDate?: string;
  variant?: "hero" | "slim" | "inline";
  promotions?: Promotion[];
};

const CampaignBanner = ({
  title,
  description,
  imageUrl,
  imageAlt,
  startDate,
  endDate,
  variant = "hero",
  promotions = [],
}: CampaignBannerProps) => {
  const formattedStart = startDate
    ? new Date(startDate).toLocaleDateString("en-GB")
    : "";
  const formattedEnd = endDate
    ? new Date(endDate).toLocaleDateString("en-GB")
    : "";

  return (
    <div className={`${styles.campaignBanner} ${styles[variant]}`}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt || title}
          className={styles.campaignImage}
        />
      )}
      <div className={styles.campaignContent}>
       
        {promotions?.length > 0 && (
          <div className={styles.promotions}>
            {promotions.map((promo, i) => (
              <div key={i} className={styles.promotionItem}>
                <strong>{promo.title}</strong>
                {promo.calloutMsg && <p>{promo.calloutMsg}</p>}
              </div>
            ))}
            {/* {description && (
          <p className={styles.campaignDescription}>{description}</p>
        )} */}

          </div>
        )}

        {(formattedStart || formattedEnd) && (
          <p className={styles.campaignDates}>
            {formattedStart && `Starts: ${formattedStart}`}
            {formattedEnd && ` | Ends: ${formattedEnd}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default CampaignBanner;
