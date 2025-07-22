import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import { useTranslations } from "next-intl";
import React from "react";
import Shipping from "./component";
import styles from "./shipping.module.css";

export default function ShippingPage() {
	const t = useTranslations("Shipping");
	return (
		<section className={styles.layout}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "Bag", href: "/cart" },
					{ label: "Address" },
				]}
				breadcrumbSeparator="/slash.svg"
			/>
			<Typography
				type={"Label"}
				variant={3}
				fontWeight="semibold"
				label={t("address")}
			/>

			<Shipping />
		</section>
	);
}
