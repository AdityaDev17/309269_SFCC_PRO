import React from "react";
import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/atomic/Typography/Typography";
import Shipping from "./component";
import styles from "./shipping.module.css";

export default function ShippingPage() {
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
				label="ADDRESS"
			/>

			<Shipping />
		</section>
	);
}
