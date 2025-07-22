"use client";
import type { UserDetails } from "@/common/constant";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import EditPassword from "@/components/molecules/EditPassword/EditPassword";
import Profile from "@/components/molecules/Profile/Profile";

import sonnerToast, { Toaster } from "@/components/molecules/Toast/Toast";
import styles from "./personalInfo.module.css";

import {
	GET_CUSTOMER,
	UPDATE_CUSTOMER,
	UPDATE_PASSWORD,
} from "@/common/schema";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function PersonalInfoPage() {
	const t = useTranslations("PersonalInformation");
	const router = useRouter();
	const customerId = sessionStorage.getItem("customer_id") ?? "";

	const { data, error, isLoading } = useQuery({
		queryKey: ["Customer", customerId],
		queryFn: () => graphqlRequest(GET_CUSTOMER, { customerId }),

		enabled: !!customerId,
	});

	const { mutate: updateCustomer } = useMutation({
		mutationFn: (input: {
			customerId: string;
			firstName: string;
			lastName: string;
			email: string;
			birthday: string;
			gender: string;
		}) => graphqlRequest(UPDATE_CUSTOMER, { input }),
		retry: 3,
	});

	// Mutation for updating password
	const { mutate: updatePassword } = useMutation({
		mutationFn: (input: {
			customerId: string;
			currentPassword: string;
			password: string;
		}) => graphqlRequest(UPDATE_PASSWORD, { input }),
		retry: 3,
	});

	const handleProfileUpdate = async (updatedData: UserDetails) => {
		try {
			const response = await updateCustomer({
				customerId,
				firstName: updatedData.firstName,
				lastName: updatedData.lastName,
				email: updatedData.email,
				birthday: updatedData.birthDate,
				gender: updatedData.gender,
			});
		} catch (err) {
			console.error("Update failed", err);
		}
	};

	const handlePasswordUpdate = async ({
		currentPassword,
		password,
		confirmPassword,
	}: {
		currentPassword: string;
		password: string;
		confirmPassword: string;
	}) => {
		if (password !== confirmPassword) {
			console.error("Passwords do not match.");
			return;
		}

		try {
			const response = await updatePassword({
				customerId,
				currentPassword,
				password,
			});

			sonnerToast("Password updated successfully.", {
				className: "toast-success-class",
				unstyled: true,
			});
		} catch (err: unknown) {
			if (typeof err === "object" && err !== null && "graphQLErrors" in err) {
				const e = err as {
					graphQLErrors?: { extensions?: { http?: { status?: number } } }[];
				};
				const statusCode = e.graphQLErrors?.[0]?.extensions?.http?.status;

				if (statusCode === 204 || statusCode === 200) {
					sonnerToast(
						"Password updated successfully.Redirecting to login page...",
						{
							className: "toast-success-class",
							unstyled: true,
						},
					);

					router.push("/login");
				} else {
					sonnerToast("Something went wrong.", {
						className: "toast-error-class",
						unstyled: true,
					});

					console.error("Password update failed:", err);
				}
			}
		}
	};

	const customer = data?.customer;

	const userDetails: UserDetails = {
		title: customer?.addresses?.[0]?.salutation ?? "Mr.",
		firstName: customer?.firstName ?? "",
		lastName: customer?.lastName ?? "",
		birthDate: customer?.birthday ?? "",
		gender: customer?.gender ?? "",
		email: customer?.email ?? "",
	};

	if (isLoading) {
		return (
			<div className={styles.wrapper}>
				<Breadcrumbs
					breadcrumbItems={[
						{ label: "Home", href: "/" },
						{ label: "My Account", href: "/my-account" },
						{ label: "Personal Information" },
					]}
				/>
				<h2 className={styles.header}>{t("personal-information")}</h2>

				<div className={styles.gridLayout}>
					<div className={`${styles.column} ${styles.leftColumn}`}>
						<div className={styles.layout}>
							<Skeleton className={styles.skeletonHeader} />

							<div className={styles.skeletonFormRow}>
								<div className={styles.skeletonFormColumn}>
									{["Title", "Last Name", "Birth Date"].map((label, idx) => (
										<div key={`skeleton-${Date.now()}-${Math.random()}`}>
											<div className={styles.fontColor}>{label}*</div>
											<Skeleton className={styles.skeletonFieldTall} />
										</div>
									))}
								</div>

								<div className={styles.skeletonFormColumn}>
									{["First Name", "Gender", "Email ID"].map((label, idx) => (
										<div key={`skeleton-${Date.now()}-${Math.random()}`}>
											<div className={styles.fontColor}>{label}*</div>
											<Skeleton className={styles.skeletonFieldTall} />
										</div>
									))}
								</div>
							</div>

							<div
								className={styles.buttonContainer}
								style={{ marginTop: "20px" }}
							>
								<Skeleton className={styles.skeletonButton} />
							</div>
						</div>
					</div>

					<div className={styles.divider} />

					<div className={`${styles.column} ${styles.rightColumn}`}>
						<Skeleton className={styles.skeletonHeader} />
						<div className={styles.skeletonPasswordFields}>
							{["Current Password", "New Password", "Confirm Password"].map(
								(label, idx) => (
									<div key={`skeleton-${Date.now()}-${Math.random()}`}>
										<div className={styles.fontColor}>{label}*</div>
										<Skeleton className={styles.skeletonFieldTall} />
									</div>
								),
							)}
							<Skeleton className={styles.skeletonFieldTall} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account", href: "/my-account" },
					{ label: "Personal Information" },
				]}
			/>
			<h2 className={styles.header}>{t("personal-information")}</h2>

			<div className={styles.gridLayout}>
				<div className={styles.column}>
					<Profile
						userDetails={userDetails}
						onUpdateClicked={handleProfileUpdate}
					/>
				</div>

				<div className={styles.divider} />

				<div className={styles.column}>
					<EditPassword onUpdateClicked={handlePasswordUpdate} />
					<Toaster />
				</div>
			</div>
		</div>
	);
}
