"use client";

import {
	UPDATE_SHIPPING_ADDRESS,
	getCustomerAddress,
	getShippingMethod,
	// getShippingAdressFromBasket,
	updateShippingMethod,
} from "@/common/schema";

import {
	RadioGroup,
	RadioGroupItem,
} from "@/components/atomic/RadioGroup/RadioGroup";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import {
	address,
	billingAddress,
	shippingMethodsFromBackend,
} from "../../common/constant";
import { Button } from "../../components/atomic/Button/Button";
import CheckBox from "../../components/atomic/CheckBox/CheckBox";
import Typography from "../../components/atomic/Typography/Typography";
import Accordion from "../../components/molecules/Accordion/Accordion";
import AddressCard, {
	type AddressData,
} from "../../components/organisms/AddressCard/AddressCard";
import {
	AddressDialog,
	updateShippingAddress,
} from "../../components/organisms/AddressForm/AddressModal";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import styles from "./shipping.module.css";

const getShippingAdressFromBasket = gql`
  query BasketInfo($basketId: ID!) {
    basketInfo(basketId: $basketId) {
      shipments {
        shippingAddress {
          address1
          city
          countryCode
          firstName
          fullName
          id
          lastName
          postalCode
          stateCode
        }
      }
    }
  }
`;

type CommonCardType = {
	id: string;
	title: string;
	description: string;
	extraInfo?: string;
};
type ShippingAddress = {
	address1: string;
	city: string;
	countryCode: string;
	firstName: string;
	fullName: string;
	id: string;
	lastName: string;
	postalCode: string;
	stateCode: string;
};

type Shipment = {
	shippingAddress: ShippingAddress | null;
};

type CustomerAddress = {
	addressId: string;
	address1: string;
	address2: string;
	city: string;
	countryCode: string;
	creationDate: string;
	firstName: string;
	fullName: string;
	lastModified: string;
	lastName: string;
	phone: string;
	postalCode: string;
	preferred: boolean;
	stateCode: string;
};

type ShippingMethod = {
	description: string;
	id: string;
	name: string;
	price: string;
};

type UpdateShippingAddressInput = {
	basketId: string | null;
	address1: string;
	address2: string | null;
	city: string;
	countryCode: string;
	firstName: string;
	lastName: string;
	phone: string;
	postalCode: string;
	stateCode: string;
	useAsBilling: boolean;
};

type UpdateShippingMethodInput = {
	basketId: string | null;
	id: string | null;
};
const Shipping = () => {
	const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
	const [selectedShippingMethod, setSelectedShippingMethod] = useState<
		string | null
	>(null);
	const [selectedAddress, setSelectedAddress] = useState<AddressData>();

	//   const customerType = "registered";
	const basketId = sessionStorage.getItem("basketId");
	const customerId = sessionStorage.getItem("customer_id");
	const customerType = sessionStorage.getItem("customer_type");
	const token = sessionStorage.getItem("access_token");

	const { data: shippingMethodData } = useQuery({
		queryKey: ["GetShippingMethod", basketId],
		queryFn: () => graphqlRequest(getShippingMethod, { basketId }),
	});

	const { data: customerAddressData, refetch: refetchAddresses } = useQuery({
		queryKey: ["GetCustomerAddress", customerId],
		queryFn: () => graphqlRequest(getCustomerAddress, { customerId }),
		enabled: customerType === "registered" && !!customerId,
	});

	const { data: shippingAddressData, refetch: refetchShipping } = useQuery({
		queryKey: ["GetShippingAddressFromBasket", basketId],
		queryFn: () => graphqlRequest(getShippingAdressFromBasket, { basketId }),
	});

	const updateShippingAddressMutation = useMutation({
		mutationFn: (input: UpdateShippingAddressInput) =>
			graphqlRequest(UPDATE_SHIPPING_ADDRESS, { input }),
	});

	const updateShippingMethodMutation = useMutation({
		mutationFn: (input: UpdateShippingMethodInput) =>
			graphqlRequest(updateShippingMethod, { input }),
	});

	const shippingAdresses =
		shippingAddressData?.basketInfo?.shipments
			?.filter((shipment: Shipment) => shipment?.shippingAddress != null)
			?.map((shipment: Shipment) => {
				const addr = shipment.shippingAddress;
				return {
					addressId: addr?.id,
					address1: addr?.address1,
					address2: null,
					city: addr?.city,
					countryCode: addr?.countryCode,
					firstName: addr?.firstName,
					lastName: addr?.lastName,
					phone: "",
					postalCode: addr?.postalCode,
					stateCode: addr?.stateCode ?? null,
				};
			}) ?? [];
	const addresses =
		customerType === "registered"
			? (customerAddressData?.getCustomerAddress?.addresses?.map(
					(item: CustomerAddress) => ({
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
						isDefault: item?.preferred,
					}),
				) ?? [])
			: (shippingAddressData?.basketInfo?.shipments
					?.filter((shipment: Shipment) => shipment?.shippingAddress != null)
					?.map((shipment: Shipment) => {
						const addr = shipment.shippingAddress;
						return {
							addressId: addr?.id,
							address1: addr?.address1,
							address2: null,
							city: addr?.city,
							countryCode: addr?.countryCode,
							firstName: addr?.firstName,
							lastName: addr?.lastName,
							phone: "",
							postalCode: addr?.postalCode,
							stateCode: addr?.stateCode ?? null,
						};
					}) ?? []);
	console.log(addresses, shippingAddressData, customerType);

	const shippingMethods: CommonCardType[] =
		shippingMethodData?.getShippingMethod?.applicableShippingMethods?.map(
			(item: ShippingMethod) => ({
				id: item?.id,
				title: item?.name,
				description: item?.name,
				extraInfo: item?.price,
			}),
		) ?? [];

	const handleCheckout = async () => {
		if (customerType === "registered" && selectedAddress) {
			try {
				await updateShippingAddressMutation.mutateAsync({
					basketId,
					address1: selectedAddress?.address1,
					address2: selectedAddress?.address2,
					city: selectedAddress?.city,
					countryCode: selectedAddress?.countryCode,
					firstName: selectedAddress?.firstName,
					lastName: selectedAddress?.lastName,
					phone: selectedAddress?.phone,
					postalCode: selectedAddress?.postalCode,
					stateCode: "NY",
					useAsBilling: true,
				});

				await refetchAddresses();
			} catch (error) {
				console.error("Error updating shipping address:", error);
			}
		}

		try {
			await updateShippingMethodMutation.mutateAsync({
				basketId,
				id: selectedShippingMethod,
			});
		} catch (error) {
			console.error("Error updating shipping method:", error);
		}
	};

	useEffect(() => {
		if (!selectedAddress && addresses?.length) {
			const defaultOrFirst =
				addresses.find((addr: AddressData) => addr.isDefault) || addresses[0];
			setSelectedAddress(defaultOrFirst);
		}
	}, [addresses, selectedAddress]);

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
					{!(customerType === "guest" && shippingAdresses.length === 1) && (
						<Button
							variant="secondary"
							onClick={() => setIsAddressDialogOpen(true)}
						>
							ADD NEW ADDRESS
						</Button>
					)}
				</div>

				<div className={styles.address}>
					<AddressCard
						items={addresses}
						radioButton={true}
						refetch={
							customerType === "registered" ? refetchAddresses : refetchShipping
						}
						selectedAddress={selectedAddress}
						setSelectedAddress={setSelectedAddress}
					/>
				</div>

				<div className={styles.billCheck}>
					<CheckBox />
					<p>Keep Billing Address same as Shipping Address </p>
				</div>

				<div className={styles.shippingmethod}>
					<Typography
						type={"Label"}
						variant={3}
						fontWeight="semibold"
						label="Shipping Method"
					/>
					<RadioGroup
						className={`${styles.cardGrid}`}
						value={selectedShippingMethod || undefined}
						onValueChange={(value) => setSelectedShippingMethod(value)}
					>
						{shippingMethods.map((item) => (
							<div key={item.id} className={styles.card}>
								<div className={styles.wrapper}>
									<h2 className={styles.name}>{item.title}</h2>
									<RadioGroupItem value={item.id} />
								</div>
								<div>
									<p className={styles.address}>{item.description}</p>
									<p className={styles.extraInfo}>${item.extraInfo}</p>
								</div>
							</div>
						))}
					</RadioGroup>
				</div>

				<div className={styles.summary}>
					<OrderSummary
						reverseOrder={true}
						buttonText="CHECKOUT"
						onButtonClick={handleCheckout}
					/>
				</div>
			</div>

			<AddressDialog
				open={isAddressDialogOpen}
				onOpenChangeAction={setIsAddressDialogOpen}
				refetch={
					customerType === "registered" ? refetchAddresses : refetchShipping
				}
				customerType={customerType}
			/>
		</section>
	);
};

export default Shipping;
