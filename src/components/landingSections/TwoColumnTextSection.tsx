import styles from "./TwoColumnTextSection.module.css";

export default function TwoColumnTextSection({ leftText, rightText }) {
	return (
		<section className={styles.twoColumnSection}>
			<div className={styles.leftColumn}>{leftText}</div>
			<div className={styles.rightColumn}>{rightText}</div>
		</section>
	);
}
