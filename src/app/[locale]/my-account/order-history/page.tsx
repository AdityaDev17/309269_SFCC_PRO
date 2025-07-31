export const runtime = "edge";

import { allOrderData } from "@/common/constant";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import ErrorComponent from "@/components/molecules/ErrorComponent/ErrorComponent";
import { useTranslations } from "next-intl";
import React from "react";
import { OrderCardContainer } from "./component";
import styles from "./orderHistory.module.css";

function OrderHistory() {
	const t = useTranslations("HomePage");
	return (
		<div className={styles.container}>
			{allOrderData.length === 0 ? (
				<ErrorComponent
					errImg="./images/orderListEmpty.svg"
					imgHeight={204}
					imgWidth={223}
					text1="No Orders yet!"
					text2="Start creating your order history by shopping our exclusive collection of products."
					buttonText="START SHOPPING"
				/>
			) : (
				<>
					<Breadcrumbs
						breadcrumbItems={[
							{ label: "Home", href: "/" },
							{ label: "My Account", href: "/my-account" },
							{ label: "Order History" },
						]}
						breadcrumbSeparator="/slash.svg"
					/>
					<Typography
						type={"Label"}
						variant={3}
						fontWeight="semibold"
						// label="ORDER HISTORY"
						label={t("order-history")}
					/>

					<OrderCardContainer />
				</>
			)}
		</div>
	);
}

export default OrderHistory;
