export const runtime = "edge";

import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import { useTranslations } from "next-intl";
import React from "react";
import Payment from "./component";
import styles from "./payment.module.css";

export default function PaymentPage() {
	const t = useTranslations("Payments");
	return (
		<section className={styles.layout}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "Bag", href: "/cart" },
					{ label: "Address", href: "/shipping" },
					{ label: "Payment" },
				]}
				breadcrumbSeparator="/slash.svg"
			/>
			<Typography
				type={"Label"}
				variant={3}
				fontWeight="semibold"
				label={t("title")}
			/>

			<Payment />
		</section>
	);
}
