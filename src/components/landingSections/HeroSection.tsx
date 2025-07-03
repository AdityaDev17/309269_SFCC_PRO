// components/landingSections/HeroSection.tsx
import styles from "./HeroSection.module.css";

export default function HeroSection({ heading, subheading, backgroundImage }) {
	return (
		<section
			className={styles.heroSection}
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			<div className={styles.heroContent}>
				<h1>{heading}</h1>
				<p>{subheading}</p>
			</div>
		</section>
	);
}
