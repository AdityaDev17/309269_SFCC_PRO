import type { OrderSummaryProps } from "@/common/type";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Button } from "../../atomic/Button/Button";
import Typography from "../../atomic/Typography/Typography";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({
	reverseOrder = false,
	totalRowTop = false,
	isButton = true,
	isPaymentImage = true,
	discount,
	totalAmt = "",
	currency = "",
	subTotal = "",
	delivery = "",
	tax = "",
	total = "",
	totalSavings = " ",
	buttonText = "CONTINUE",
	onButtonClick,
	isDelivery = false,
}: OrderSummaryProps) => {
	const paymentImages = [
		"/images/pay1.svg",
		"/images/pay2.svg",
		"/images/pay3.svg",
		"/images/pay4.svg",
		"/images/pay5.svg",
	];
	// console.log(currency);
	const t = useTranslations("OrderSummary");
	return (
		<div className={styles.layout}>
			{totalRowTop && (
				<>
					<div className={styles.totalRowTop}>
						<Typography
							type={"Label"}
							variant={3}
							fontWeight="medium"
							label={t("total")}
						/>
						<Typography
							type={"Label"}
							variant={3}
							fontWeight="medium"
							label={`${currency} ${totalAmt}`}
						/>
					</div>
					<hr className={styles.topDivider} />
				</>
			)}
			<div className={styles.standardLayout}>
				<div className={styles.title}>
					<Typography
						type={"Label"}
						variant={3}
						fontWeight="medium"
						label={t("price-details")}
					/>
				</div>
				<div className={styles.summaryRow}>
					<Typography
						type={"Body"}
						variant={2}
						fontWeight="regular"
						label={t("sub-total")}
						color="#4F4B53"
					/>
					<Typography
						type={"Body"}
						variant={2}
						fontWeight="regular"
						label={`${currency} ${subTotal}`}
						color="#4F4B53"
					/>
				</div>
				<div className={styles.summaryRow}>
					<Typography
						type={"Body"}
						variant={2}
						fontWeight="regular"
						label={t("discount")}
						color="#4F4B53"
					/>
					<Typography
						type={"Body"}
						variant={2}
						fontWeight="regular"
						label={`${discount ?? 0}`}
						color="#4F4B53"
					/>
				</div>
				{isDelivery && (
					<div className={styles.summaryRow}>
						<Typography
							type={"Body"}
							variant={2}
							fontWeight="regular"
							label={t("delivery")}
							color="#4F4B53"
						/>
						<Typography
							type={"Body"}
							variant={2}
							fontWeight="regular"
							label={delivery ? `${currency} ${delivery}` : t("free")}
							color="#4F4B53"
						/>
					</div>
				)}
				<div className={styles.summaryRow}>
					<Typography
						type={"Body"}
						variant={2}
						fontWeight="regular"
						label={t("tax")}
						color="#4F4B53"
					/>
					<Typography
						type={"Body"}
						variant={2}
						fontWeight="regular"
						label={tax ? tax : "0"}
						color="#4F4B53"
					/>
				</div>
				<hr className={styles.divider} />
				<div className={styles.totalRow}>
					{totalRowTop ? (
						<>
							<Typography
								type={"Body"}
								variant={2}
								fontWeight="medium"
								label={t("total")}
							/>
							<Typography
								type={"Body"}
								variant={2}
								fontWeight="medium"
								label={`${currency} ${total}`}
							/>
						</>
					) : (
						<>
							{" "}
							<Typography
								type={"Label"}
								variant={3}
								fontWeight="medium"
								label={t("total")}
							/>
							<Typography
								type={"Label"}
								variant={3}
								fontWeight="medium"
								label={`${currency} ${total}`}
							/>
						</>
					)}
				</div>
				<hr className={styles.divider} />
				{/* {!reverseOrder && (
					<div className={styles.totalSavings}>
						<Typography
							type={"Body"}
							variant={2}
							fontWeight="regular"
							label="Total Savings"
							color="#4F4B53"
						/>
						<Typography
							type={"Body"}
							variant={2}
							fontWeight="regular"
							label={`${currency} ${totalSavings}`}
							color="#4F4B53"
						/>
					</div>
				)} */}
				{isButton && (
					<div className={styles.summaryButton}>
						<Button
							variant="secondary"
							className={styles.button}
							onClick={onButtonClick}
						>
							{buttonText}
						</Button>
					</div>
				)}
				{/* {reverseOrder && (
					<div className={styles.reverseTotalSavings}>
						<Typography
							type={"Body"}
							variant={2}
							fontWeight="regular"
							label="Total Savings"
							color="#4F4B53"
						/>
						<Typography
							type={"Body"}
							variant={2}
							fontWeight="regular"
							label={`${currency}${totalSavings}`}
							color="#4F4B53"
						/>
					</div>
				)} */}
				{isPaymentImage && (
					<div className={styles.paymentImages}>
						{paymentImages.map((src) => (
							<Image
								key={src}
								src={src}
								alt={`payment method ${src}`}
								width={42}
								height={28}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderSummary;

/**
 * ## OrderSummary
 *
 * The `OrderSummary` displays a detailed pricing breakdown for an order, including subtotal, delivery, tax, total, and optional savings, along with a call-to-action button and supported payment method icons.
 *
 * ### Props
 *
 * - `reverseOrder` (optional): If `true`, displays the "Total Savings" section below the total row. Defaults to `false`.
 * - `totalRowTop` (optional): If `true`, moves the "Total" row to the top of the summary. Defaults to `false`.
 * - `isButton` (optional): Controls whether the "CONTINUE" button is rendered. Defaults to `true`.
 * - `isPaymentImage` (optional): Controls whether supported payment method icons are displayed. Defaults to `true`.
 *
 * ### Behavior
 *
 * - The summary displays a breakdown including "Sub Total", "Delivery", "Tax", and "Total".
 * - If `totalRowTop` is `true`, the total section appears at the top before the price breakdown.
 * - The component optionally shows a savings section based on `reverseOrder`.
 * -- A button is provided at the bottom for progressing to the next step (e.g., payment or confirmation).
 * - A list of payment method icons is rendered at the bottom if `isPaymentImage` is `true`.
 *
 * ### Used Components
 *
 * - `Typography` for consistent text rendering and styling.
 * - `Button` from the atomic UI library for the call-to-action.
 * - `Image` from `next/image` for optimized image rendering of payment method logos.
 *
 * ### Styling
 *
 * Custom styles are imported from `OrderSummary.module.css`, with classes such as `layout`, `summaryRow`, `divider`, `totalRow`, `summaryButton`, and `paymentImages` to control layout and appearance.
 *
 * ### Example
 *
 * ```tsx
 *
 *
 * export default function Page() {
 *   return (
 *     <OrderSummary
 *       reverseOrder={false}
 *       totalRowTop={true}
 *       isButton={true}
 *       isPaymentImage={true}
 *     />
 *   );
 * }
 * ```
 */
