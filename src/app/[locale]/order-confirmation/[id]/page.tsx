export const runtime = "edge";

import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Banner from "@/components/molecules/Banner/Banner";
import { getTranslations } from "next-intl/server";
import React from "react";
import OrderConfimation from "./component";
import styles from "./page.module.css";

export default async function OrderConfirmationPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const t = await getTranslations("OrderConfirmation");
	return (
		<section className={`${styles.layout} ${styles.pageLayout}`}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "Order Confirmation" },
				]}
			/>
			<Banner
				title="THANK YOU FOR PLACING YOUR ORDER!"
				textColor="#000"
				subtitle={`Order ID ${id}`}
				subtitleVariant={5}
				buttonText={t("continue-shopping")}
				backgroundImage="/images/orderConfirmationBanner.svg"
				alignment="center-center"
			/>
			<OrderConfimation />
		</section>
	);
}
