"use client";
import { useRouter } from "next/navigation";
import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Tile from "../../components/atomic/Tile/Tile";
import Banner from "../../components/molecules/Banner/Banner";
import styles from "./myAccount.module.css";

const MyAccount = () => {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.push("/");
	};
	return (
		<div className={styles.wrapper}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account" },
				]}
				breadcrumbSeparator="/slash.svg"
			/>

			<Banner
				title="Hello Jenssa!"
				subtitle="Greetings!"
				subtitleVariant={5}
				backgroundImage="/images/myAccount-banner.svg"
				alignment="center-center"
				textColor="black"
			/>

			<div className={styles.tilesGrid}>
				<Tile label="Personal Information" href="/my-account/personal-info" />
				<Tile label="Order History" href="/my-account/order-history" />
				<Tile label="Payments" href="/my-account/payments" />
				<Tile label="My Subscription" href="/my-account/subscription" />
				<Tile label="Address Book" href="/my-account/address" />
				<Tile label="Contact & Preferences" href="/my-account/contact-info" />
				<Tile label="Log Out" onClick={handleLogout} />
			</div>
		</div>
	);
};

export default MyAccount;
