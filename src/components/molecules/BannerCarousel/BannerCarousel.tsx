"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../atomic/Button/Button";
import Typography from "../../atomic/Typography/Typography";
import styles from "./BannerCarousel.module.css";

import { type CardType, bannerData } from "../../../common/constant";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../atomic/Card/Card";

const BannerCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % bannerData.length);
		}, 8000);

		const checkMobile = () => {
			if (typeof window !== "undefined") {
				setIsMobile(window.innerWidth <= 600);
			}
		};

		checkMobile();

		window.addEventListener("resize", checkMobile);

		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const currentBanner = bannerData[currentIndex];

	const textCard = currentBanner.find((card) => card.type === "text");
	const imageCards = currentBanner.filter((card) => card.type === "image");

	const renderCard = (card: CardType, index: number) => {
		if (card.type === "text") {
			return (
				<Card
					key={index}
					className={`${styles.card} ${styles.textCard}`}
					width="100%"
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0.5rem",
							justifyContent: "center",
						}}
					>
						<CardHeader className={styles.cardHeader}>
							<Typography
								type="Headline"
								variant={2}
								fontWeight="regular"
								color="black"
								label={card.title}
							/>
							<Typography
								type="Headline"
								variant={2}
								fontWeight="regular"
								color="black"
								label={card.subtitle}
							/>
						</CardHeader>
						<CardContent className={styles.cardContent}>
							<Typography
								type="Body"
								variant={2}
								fontWeight="regular"
								color="#555"
								label={card.description}
							/>
						</CardContent>
						{card.link && (
							<CardFooter className={styles.buttonContainer}>
								<Button
									variant="link"
									onClick={() => console.log("Link Clicked")}
								>
									VIEW MORE
								</Button>
							</CardFooter>
						)}
					</div>
				</Card>
			);
		}
		return (
			<Card
				key={index}
				className={`${styles.card} ${styles.imageCard}`}
				width="100%"
			>
				<CardHeader>
					<Image
						src={card.image ?? "/placeholder.svg"}
						alt="Banner"
						width={440}
						height={600}
						loading="eager"
						style={{ width: "100%", height: "auto" }}
					/>
				</CardHeader>
			</Card>
		);
	};

	return (
		<div className={styles.carouselWrapper}>
			{isMobile ? (
				<div className={styles.mobileLayout}>
					{textCard && (
						<div className={styles.textCardContainer}>
							{renderCard(textCard, 0)}
						</div>
					)}
					<div className={styles.imagesContainer}>
						{imageCards.map((card, index) => renderCard(card, index + 1))}
					</div>
				</div>
			) : (
				<div className={styles.cardsContainer}>
					{currentBanner.map((card, index) => renderCard(card, index))}
				</div>
			)}

			<div className={styles.pagination}>
				{bannerData.map((banner, index) => {
					const textCard = banner.find((card) => card.type === "text");
					const key = textCard?.title ?? `banner-${index}`;
					return (
						<div
							key={key}
							className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default BannerCarousel;

/**
 * ## BannerCarousel
 *
 * The `BannerCarousel` component is a rotating carousel that displays a series of banners with
 * a mix of text and image cards. It automatically cycles through the banners every 8 seconds.
 *
 * ### Props
 * - No external props are passed directly to the component.
 *
 * ### Component Behavior
 *
 * - The component cycles through a set of banners (`bannerData`) every 8 seconds, showing different
 *   cards consisting of text and images.
 * - Each banner can contain text with a title, subtitle, description, and a link or it can contain
 *   images.
 * - The `VIEW MORE` button is only shown for text cards that contain a link.
 * - The carousel will also display pagination dots that correspond to the number of banners.
 * - The current banner's index is tracked and updated as the carousel cycles through the banners.
 */
