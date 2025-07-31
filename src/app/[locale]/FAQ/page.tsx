export const runtime = "edge";

"use client";

import {
	frequentlyAskedData,
	ordersData,
	paymentsData,
	productInfoData,
	returnsData,
	shippingData,
} from "@/common/constant";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { FaqAccordion } from "./FaqAccordion";
import NeedAssistance from "./NeedAssistance";
import SearchWithSuggestions from "./SearchWithSuggestions";
import styles from "./page.module.css";
interface FaqItem {
	id: string;
	question: string;
	answer: string;
	category: string;
}

// Combine all FAQ items for search
const allFaqItems = [
	...frequentlyAskedData,
	...ordersData,
	...shippingData,
	...returnsData,
	...paymentsData,
	...productInfoData,
];

export default function FAQPage() {
	const t = useTranslations("FAQ");
	const [searchTerm, setSearchTerm] = useState("");
	const [openAccordion, setOpenAccordion] = useState<string | null>(null);
	const faqRefs = useRef<Record<string, HTMLDivElement | null>>({});

	// Handle suggestion click
	const handleSuggestionClick = (item: FaqItem) => {
		setOpenAccordion(item.category);

		setTimeout(() => {
			if (faqRefs.current[item.id]) {
				faqRefs.current[item.id]?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		}, 300);
	};

	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "FAQ", href: "/FAQ" },
	];
	return (
		<div className={styles.faqContainer}>
			{/* Main Content */}
			<main className={styles.mainContainer}>
				{/* Breadcrumb */}
				<div className={styles.breadcumbsContainer}>
					<div className={styles.breadcrumbsWrapper}>
						<div className={styles.breadcrumbs}>
							<Breadcrumbs breadcrumbItems={breadcrumbItems} />
						</div>
					</div>
				</div>
				<h1 className={styles.heading}>FAQ</h1>
				<div className={styles.faqGrid}>
					{/* FAQ Sections */}
					<div className={styles.faqSection}>
						{/* Search Bar */}
						<div className={styles.searchBar}>
							<SearchWithSuggestions
								placeholder="Search your queries..."
								value={searchTerm}
								onChange={setSearchTerm}
								onClear={() => setSearchTerm("")}
								onMicClick={() => console.log("Mic clicked")}
								className={styles.customSearch}
								allFaqItems={allFaqItems}
								onSuggestionClick={handleSuggestionClick}
							/>
						</div>

						{/* FAQ Accordions */}
						<div className={styles.accordionContainer}>
							<FaqAccordion
								title={t("frequently-asked")}
								icon={
									<img
										src="images/FAQ_icon.svg"
										className={styles.icon}
										alt="Message Icon"
									/>
								}
								items={frequentlyAskedData}
								isOpen={openAccordion === "frequently-asked"}
								onToggle={() =>
									setOpenAccordion(
										openAccordion === "frequently-asked"
											? null
											: "frequently-asked",
									)
								}
								itemRefs={faqRefs}
							/>

							<FaqAccordion
								title={t("orders")}
								icon={
									<img
										src="/images/orders_icon.svg"
										className={styles.icon}
										alt="Message Icon"
									/>
								}
								items={ordersData}
								isOpen={openAccordion === "orders"}
								onToggle={() =>
									setOpenAccordion(openAccordion === "orders" ? null : "orders")
								}
								itemRefs={faqRefs}
							/>
							<FaqAccordion
								title={t("shipping")}
								icon={
									<img
										src="/images/shipping_icon.svg"
										className={styles.icon}
										alt="Message Icon"
									/>
								}
								items={shippingData}
								isOpen={openAccordion === "shipping"}
								onToggle={() =>
									setOpenAccordion(
										openAccordion === "shipping" ? null : "shipping",
									)
								}
								itemRefs={faqRefs}
							/>
							<FaqAccordion
								title={t("returns-exchange")}
								icon={
									<img
										src="/images/return_icon.svg"
										className={styles.icon}
										alt="Message Icon"
									/>
								}
								items={returnsData}
								isOpen={openAccordion === "returns"}
								onToggle={() =>
									setOpenAccordion(
										openAccordion === "returns" ? null : "returns",
									)
								}
								itemRefs={faqRefs}
							/>
							<FaqAccordion
								title={t("payments")}
								icon={
									<img
										src="/images/payments_icon.svg"
										className={styles.icon}
										alt="Message Icon"
									/>
								}
								items={paymentsData}
								isOpen={openAccordion === "payments"}
								onToggle={() =>
									setOpenAccordion(
										openAccordion === "payments" ? null : "payments",
									)
								}
								itemRefs={faqRefs}
							/>
							<FaqAccordion
								title={t("product-information")}
								icon={
									<img
										src="/images/products_info_icon.svg"
										className={styles.icon}
										alt="Message Icon"
									/>
								}
								items={productInfoData}
								isOpen={openAccordion === "product-info"}
								onToggle={() =>
									setOpenAccordion(
										openAccordion === "product-info" ? null : "product-info",
									)
								}
								itemRefs={faqRefs}
							/>
						</div>
					</div>

					<div className={styles.needAssistance}>
						<NeedAssistance />
					</div>
				</div>
			</main>
		</div>
	);
}
