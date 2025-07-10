"use client";

import { DELETE_CUSTOMER_ADDRESS, GET_CUSTOMER_ADDRESS } from "@/common/schema";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/atomic/Button/Button";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import ErrorComponent from "@/components/molecules/ErrorComponent/ErrorComponent";
import AddressCard, {
	type AddressData,
} from "@/components/organisms/AddressCard/AddressCard";
import { AddressDialog } from "@/components/organisms/AddressForm/AddressModal";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./address.module.css";
import { useTranslations } from "next-intl";

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
	const t = useTranslations("AddressBook")
	const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState<AddressData>();
	const customerId = sessionStorage.getItem("customer_id") ?? "";

	const { data, refetch, isLoading, isError } = useQuery({
		queryKey: ["GetCustomerAddress", customerId],
		queryFn: () => graphqlRequest(GET_CUSTOMER_ADDRESS, { customerId }),
	});

	const addresses = (data?.getCustomerAddress?.addresses ?? []).map(
		(item: AddressData) => ({
			addressId: item?.addressId,
			firstName: item?.firstName,
			lastName: item?.lastName,
			address1: item?.address1,
			address2: item?.address2,
			city: item?.city,
			countryCode: item?.countryCode,
			phone: item?.phone,
			postalCode: item?.postalCode,
			stateCode: item?.stateCode,
			isDefault: item.preferred ?? false,
		}),
	);

	const deleteAddressMutation = useMutation({
		mutationFn: (input: { customerId: string; addressId: string }) =>
			graphqlRequest(DELETE_CUSTOMER_ADDRESS, { input }),
	});

	const handleDeleteAddress = async (address: AddressData) => {
		try {
			await deleteAddressMutation.mutateAsync({
				customerId,
				addressId: address?.addressId,
			});
			await refetch();
		} catch (error: unknown) {
			if (error instanceof Error) {
				const e = error as Error & {
					response?: {
						errors?: { extensions?: { http?: { status: number } } };
					};
				};
				const status = e?.response?.errors?.extensions?.http?.status;
				console.log("HTTP status:", status);
			}
			await refetch();
		}
	};

	if (isLoading) {
		return (
			<section className={styles.wrapper}>
				<Breadcrumbs
					breadcrumbItems={[
						{ label: "Home", href: "/" },
						{ label: "My Account", href: "/my-account" },
						{ label: "Address Book" },
					]}
				/>
				<h1 className={styles.title}>{t("address-book-title")}</h1>
				<Skeleton className={styles.skeletonAddBtn} />

				<div className={styles.skeletonLayout}>
					{Array.from({ length: 1 }).map((_, idx) => (
						<div
							key={`skeleton-${Date.now()}-${Math.random()}`}
							className={styles.skeletonAddressCard}
						>
							<Skeleton className={styles.skeletonTitle} />
							<Skeleton className={styles.skeletonAddress} />
							<Skeleton className={styles.skeletonDesc} />
							<div className={styles.skeletonButtons}>
								<Skeleton className={styles.skeletonBtn} />
								<Skeleton className={styles.skeletonBtn} />
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className={styles.wrapper}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account", href: "/my-account" },
					{ label: "Address Book" },
				]}
			/>
			<h1 className={styles.title}>{t("address-book-title")}</h1>

			{addresses?.length > 0 && (
				<Button
					variant="secondary"
					onClick={() => setIsAddressDialogOpen(true)}
					className={styles.button}
				>
					{t("add-new-address")}
				</Button>
			)}

			<AddressDialog
				open={isAddressDialogOpen}
				onOpenChangeAction={(open) => setIsAddressDialogOpen(open)}
				refetch={refetch}
				customerType="registered"
			/>

			{addresses?.length === 0 ? (
				<div className={styles.centerWrapper}>
					<ErrorComponent
						errImg="/images/emptyBook.svg"
						imgHeight={200}
						imgWidth={200}
						text1={t("no-saved-address")}
						text2={t("save-address")}
						buttonText={t("add-address-btn")}
						onButtonClick={() => setIsAddressDialogOpen(true)}
					/>
				</div>
			) : (
				<AddressCard
					items={addresses}
					isDelete={true}
					handleDeleteAddress={handleDeleteAddress}
					refetch={refetch}
					selectedAddress={selectedAddress}
					setSelectedAddress={setSelectedAddress}
				/>
			)}
		</section>
	);
};

export default AddressPage;
