import Image from "next/image";
import React from "react";
import styles from "./ProductHeroSection.module.css";

export default function ProductHeroSection({ data }) {
	const { title, subtitle, image, ctaText, ctaLink } = data;

	return (
		<section className={styles.productHero}>
			<div className={styles.textBlock}>
				<h1>{title}</h1>
				<p>{subtitle}</p>
				<a href={ctaLink} className={styles.ctaButton}>
					{ctaText}
				</a>
			</div>
			{image && (
				<div className={styles.imageWrapper}>
					<Image src={image.asset.url} alt={title} width={600} height={400} />
				</div>
			)}
		</section>
	);
}
