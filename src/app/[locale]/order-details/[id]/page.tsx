import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import React from "react";
import Details from "./component";
import styles from "./orderDetails.module.css";

function OrderDetails() {
	return (
		<div className={styles.container}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account", href: "/shop" },
					{ label: "Order History" },
					{ label: "Order Details" },
				]}
				breadcrumbSeparator="/slash.svg"
			/>
			<Typography
				type={"Label"}
				variant={3}
				fontWeight="semibold"
				label="ORDER HISTORY"
			/>
			<Details />
		</div>
	);
}

export default OrderDetails;
