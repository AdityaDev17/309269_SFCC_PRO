"use client";
import React, { useState } from "react";
import {
	address,
	billingAddress,
	shippingMethodsFromBackend,
} from "../../common/constant";
import { Button } from "../../components/atomic/Button/Button";
import CheckBox from "../../components/atomic/CheckBox/CheckBox";
import Typography from "../../components/atomic/Typography/Typography";
import Accordion from "../../components/molecules/Accordion/Accordion";
import AddressCard from "../../components/organisms/AddressCard/AddressCard";
import { AddressDialog } from "../../components/organisms/AddressForm/AddressModal";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import styles from "./shipping.module.css";

const Shipping = () => {
	const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
	const accordionData = billingAddress?.map((item) => ({
		title: item?.id,
		desc: item?.value,
	}));
	return (
		<section className={styles.componentLayout}>
			<div className={styles.firstLayout}>
				<div className={styles.tittleWrapper}>
					<Typography
						type={"Label"}
						variant={3}
						fontWeight="medium"
						label="Shipping Address"
					/>
					<Button
						variant="secondary"
						onClick={() => setIsAddressDialogOpen(true)}
					>
						ADD NEW ADDRESS
					</Button>
				</div>
				<div className={styles.address}>
					<AddressCard
						items={address}
						radioButton={true}
						variant={"address"}
						isDelete={true}
						shipping={true}
					/>
				</div>
				<div className={styles.billCheck}>
					<CheckBox />
					<p>Keep Billing Address same as Shipping Address </p>
				</div>
				<div className={styles.accordion}>
					<Accordion
						items={accordionData}
						contentStyle={styles.accordionContent}
					/>
				</div>
				<div className={styles.shippingmethod}>
					<Typography
						type={"Label"}
						variant={3}
						fontWeight="semibold"
						label="Shipping Method"
					/>
					<AddressCard
						items={shippingMethodsFromBackend}
						variant={"delivery"}
						radioButton={true}
					/>
				</div>
				<div className={styles.summary}>
					<OrderSummary reverseOrder={true} />
				</div>
			</div>
			<AddressDialog
				open={isAddressDialogOpen}
				onOpenChange={(open) => setIsAddressDialogOpen(open)}
			/>
		</section>
	);
};
export default Shipping;
