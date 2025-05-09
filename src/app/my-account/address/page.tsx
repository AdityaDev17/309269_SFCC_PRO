"use client";

import { useState } from "react";
import { address } from "../../../common/constant";
import Breadcrumbs from "../../../components/atomic/Breadcrumbs/Breadcrumbs";
import { Button } from "../../../components/atomic/Button/Button";
import ErrorComponent from "../../../components/molecules/ErrorComponent/ErrorComponent";
import AddressCard from "../../../components/organisms/AddressCard/AddressCard";
import { AddressDialog } from "../../../components/organisms/AddressForm/AddressModal";
import styles from "./address.module.css";

type AddressType = {
	firstName: string;
	lastName: string;
	phone: string;
	apartment: string;
	building: string;
	street: string;
	landmark?: string;
	city: string;
	state: string;
	zipcode: string;
	isDefault?: boolean;
};

const AddressPage = () => {
	const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

	return (
		<section className={styles.wrapper}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account", href: "/my-account" },
					{ label: "Address Book" },
				]}
			/>
			<h1 className={styles.title}>ADDRESS BOOK</h1>
			{address?.length > 0 && (
				<Button
					variant="secondary"
					onClick={() => setIsAddressDialogOpen(true)}
					className={styles.button}
				>
					{" "}
					ADD NEW ADDRESS
				</Button>
			)}
			<AddressDialog
				open={isAddressDialogOpen}
				onOpenChange={(open) => setIsAddressDialogOpen(open)}
			/>

			{address.length === 0 ? (
				<div className={styles.centerWrapper}>
					<ErrorComponent
						errImg="/images/emptyBook.svg"
						imgHeight={200}
						imgWidth={200}
						text1="No Saved Addresses"
						text2="Save an address for faster checkout."
						buttonText="ADD AN ADDRESS"
						onButtonClick={() => setIsAddressDialogOpen(true)}
					/>
				</div>
			) : (
				<AddressCard items={address} variant={"address"} isDelete={true} />
			)}
		</section>
	);
};

export default AddressPage;
