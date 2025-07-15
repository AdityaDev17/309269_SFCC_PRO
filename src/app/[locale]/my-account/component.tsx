"use client";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Tile from "@/components/atomic/Tile/Tile";
import Banner from "@/components/molecules/Banner/Banner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./myAccount.module.css";

import { fetchToken, graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";

import { GET_CUSTOMER, LOGOUT_CUSTOMER } from "@/common/schema";
import { clearSession, handlePostLogoutTokenRefresh } from "@/lib/sessionUtils";

import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import { useTranslations } from "next-intl";

const MyAccount = () => {
	const t = useTranslations("MyAccount");
	const router = useRouter();

	const [customerId, setCustomerId] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const id = sessionStorage.getItem("customer_id");
			setCustomerId(id);
		}
	}, []);

	const { data, isLoading } = useQuery({
		queryKey: ["GetCustomer", customerId],
		queryFn: () => graphqlRequest(GET_CUSTOMER, { customerId }),
		enabled: !!customerId,
	});

	const logoutCustomerMutation = useMutation({
		mutationFn: (input: {
			clientId: string;
			refreshToken: string;
			channelId: string;
		}) => graphqlRequest(LOGOUT_CUSTOMER, { input }),
		retry: 3,
	});

	const handleLogout = async () => {
		try {
			const refreshToken = sessionStorage.getItem("refresh_token");
			const clientId = "68224742-4e6d-45e3-acf7-2b75d5d2bdb0";
			const channelId = "accPro";

			if (!refreshToken) {
				console.warn(
					"No refresh token found, clearing session and fetching guest token",
				);
				await handlePostLogoutTokenRefresh();
				router.push("/");
				return;
			}

			const response = await logoutCustomerMutation.mutateAsync({
				clientId,
				refreshToken,
				channelId,
			});

			if (response?.data?.logoutCustomer) {
				clearSession();

				const tokenRefreshSuccess = await handlePostLogoutTokenRefresh();

				if (tokenRefreshSuccess) {
					console.log("Successfully transitioned to guest session");
				} else {
					console.warn(
						"Failed to obtain guest token, but logout was successful",
					);
				}

				router.push("/");
			} else {
				console.error("Logout response was not successful");

				await handlePostLogoutTokenRefresh();
				router.push("/");
			}
		} catch (err) {
			console.error("Logout error:", err);
			await handlePostLogoutTokenRefresh();
			router.push("/");
		}
	};

	const capitalizeFirstLetter = (str?: string) =>
		str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

	return (
		<div className={styles.wrapper}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account" },
				]}
				breadcrumbSeparator="/slash.svg"
			/>

			{isLoading ? (
				<Skeleton className={styles.bannerSkeleton} />
			) : (
				<Banner
					// title={`Hello ${data?.customer?.firstName || "there"}!`}
					title={`Hello ${capitalizeFirstLetter(data?.customer?.firstName) || "there"}!`}
					subtitle="Greetings!"
					subtitleVariant={5}
					backgroundImage="/images/myAccount-banner.svg"
					alignment="center-center"
					textColor="black"
				/>
			)}

			{isLoading ? (
				<div className={styles.tilesGrid}>
					{Array.from({ length: 7 }).map((_, i) => (
						<Skeleton
							key={`skeleton-${Date.now()}-${Math.random()}`}
							className={styles.tileSkeleton}
						/>
					))}
				</div>
			) : (
				<div className={styles.tilesGrid}>
					<Tile label={t("personal-info")} href="/my-account/personal-info" />
					<Tile label={t("order-history")} href="/my-account/order-history" />
					<Tile label={t("payments")} href="/my-account/payments" />
					<Tile label={t("my-subscription")} href="/my-account/subscription" />
					<Tile label={t("address-book")} href="/my-account/address" />
					<Tile
						label={t("contact-preferences")}
						href="/my-account/contact-info"
					/>
					<Tile label={t("logout")} onClick={handleLogout} />
				</div>
			)}
		</div>
	);
};

export default MyAccount;
