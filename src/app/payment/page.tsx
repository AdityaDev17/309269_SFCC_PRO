import React from "react";
import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/atomic/Typography/Typography";
import Payment from "./component";
import styles from "./payment.module.css";

export default function PaymentPage() {
	return (
		<section className={styles.layout}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "Bag", href: "/cart" },
					{ label: "Address",href: "/shipping" },
					{ label: "Payment" },
				]}
				breadcrumbSeparator="/slash.svg"
			/>
			<Typography
				type={"Label"}
				variant={3}
				fontWeight="semibold"
				label="Payment"
			/>

			<Payment />
		</section>
	);
}
