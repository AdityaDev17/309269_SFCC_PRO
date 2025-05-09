"use client";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import { type UserDetails, mockUserDetails } from "../../../common/constant";
import EditPassword from "../../../components/molecules/EditPassword/EditPassword";
import Profile from "../../../components/molecules/Profile/Profile";
import styles from "./PersonalInfo.module.css";

export default function PersonalInfoPage() {
	const handleProfileUpdate = (updatedData: UserDetails) => {
		console.log("Updated Profile Data:", updatedData);
	};

	const handlePasswordUpdate = (updatedPassword: string) => {
		console.log("Updated Password:", updatedPassword);
	};

	return (
		<div className={styles.wrapper}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account", href: "/my-account" },
					{ label: "Personal Information" },
				]}
			/>
			<h2 className={styles.header}>Personal Information</h2>

			<div className={styles.gridLayout}>
				<div className={styles.column}>
					<Profile
						userDetails={mockUserDetails}
						onUpdateClicked={handleProfileUpdate}
					/>
				</div>

				<div className={styles.divider} />

				<div className={styles.column}>
					<EditPassword onUpdateClicked={handlePasswordUpdate} />
				</div>
			</div>
		</div>
	);
}
