import Image from "next/image";
import React from "react";
import styles from "./ScrollingImageGridSection.module.css";

export default function ScrollingImageGridSection({ data }) {
	const { title, images } = data;

	return (
		<section className={styles.scrollingGrid}>
			<h2>{title}</h2>
			<div className={styles.imageRow}>
				{images.map((img) => (
					<div key={img._key || img.asset._ref} className={styles.imageWrapper}>
						<Image src={img.asset.url} alt={title} width={300} height={200} />
					</div>
				))}
			</div>
		</section>
	);
}
