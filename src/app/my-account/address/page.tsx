"use client";

import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useState } from "react";
import Breadcrumbs from "../../../components/atomic/Breadcrumbs/Breadcrumbs";
import { Button } from "../../../components/atomic/Button/Button";
import ErrorComponent from "../../../components/molecules/ErrorComponent/ErrorComponent";
import AddressCard, {
	type AddressData,
} from "../../../components/organisms/AddressCard/AddressCard";
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

const GET_CUSTOMER_ADDRESS = `
query GetCustomerAddress($customerId: ID!) {
  getCustomerAddress(customerId: $customerId) {
    addresses {
      addressId
      address1
      address2
      city
      countryCode
      creationDate
      firstName
      fullName
      lastModified
      lastName
      phone
      postalCode
      preferred
      stateCode
    }
  }
}
`;

const DELETE_CUSTOMER_ADDRESS = `
mutation RemoveCustomerAddress($input: InputCustomerAddress!) {
  removeCustomerAddress(input: $input) {
    addressId
    address1
    address2
    city
    countryCode
    creationDate
    firstName
    fullName
    lastModified
    lastName
    phone
    postalCode
    preferred
    stateCode
  }
}`;

const customerId = sessionStorage.getItem("customer_id") ?? "";

const AddressPage = () => {
	const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState<AddressData>();

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
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Something went wrong</div>;

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

			{addresses?.length > 0 && (
				<Button
					variant="secondary"
					onClick={() => setIsAddressDialogOpen(true)}
					className={styles.button}
				>
					ADD NEW ADDRESS
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
						text1="No Saved Addresses"
						text2="Save an address for faster checkout."
						buttonText="ADD AN ADDRESS"
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
