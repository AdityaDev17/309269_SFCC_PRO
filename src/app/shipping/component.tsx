"use client";

import {
	GET_CUSTOMER,
	GET_CUSTOMER_ADDRESS,
	GET_SHIPPING_ADDRESS_FROM_BASKET,
	GET_SHIPPING_METHOD,
	UPDATE_CUSTOMER_INFO_IN_BASKET,
	UPDATE_SHIPPING_ADDRESS,
	UPDATE_SHIPPING_METHOD,
} from "@/common/schema";
import {
	RadioGroup,
	RadioGroupItem,
} from "@/components/atomic/RadioGroup/RadioGroup";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/atomic/Button/Button";
import CheckBox from "../../components/atomic/CheckBox/CheckBox";
import Typography from "../../components/atomic/Typography/Typography";
import AddressCard, {
	type AddressData,
} from "../../components/organisms/AddressCard/AddressCard";
import {
	AddressDialog,
	updateShippingAddress,
} from "../../components/organisms/AddressForm/AddressModal";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import styles from "./shipping.module.css";

type CustomerDetails = {
	basketId: string;
	email: string;
};

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
	const router = useRouter();
	const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
	const [selectedShippingMethod, setSelectedShippingMethod] = useState<
		string | null
	>(null);
	const [selectedAddress, setSelectedAddress] = useState<AddressData>();
	const [email, setEmail] = useState<string>("");

	//   const customerType = "registered";
	const basketId = sessionStorage.getItem("basketId");
	const customerId = sessionStorage.getItem("customer_id");
	const customerType = sessionStorage.getItem("customer_type");

	const { data: shippingMethodData } = useQuery({
		queryKey: ["GetShippingMethod", basketId],
		queryFn: () => graphqlRequest(GET_SHIPPING_METHOD, { basketId }),
	});

	const { data: customerAddressData, refetch: refetchAddresses } = useQuery({
		queryKey: ["GetCustomerAddress", customerId],
		queryFn: () => graphqlRequest(GET_CUSTOMER_ADDRESS, { customerId }),
		enabled: customerType === "registered" && !!customerId,
	});

	const { data: shippingAddressData, refetch: refetchShipping } = useQuery({
		queryKey: ["GetShippingAddressFromBasket", basketId],
		queryFn: () =>
			graphqlRequest(GET_SHIPPING_ADDRESS_FROM_BASKET, { basketId }),
	});

	const { data: customerDetails } = useQuery({
		queryKey: ["GetCustomer", customerId],
		queryFn: () => graphqlRequest(GET_CUSTOMER, { customerId }),
		enabled: !!customerId,
	});

	const updateShippingAddressMutation = useMutation({
		mutationFn: (input: UpdateShippingAddressInput) =>
			graphqlRequest(UPDATE_SHIPPING_ADDRESS, { input }),
		retry: 2,
	});

	const updateShippingMethodMutation = useMutation({
		mutationFn: (input: UpdateShippingMethodInput) =>
			graphqlRequest(UPDATE_SHIPPING_METHOD, { input }),
		retry: 2,
	});

	const updateCustomerDetailInBasket = useMutation({
		mutationFn: (input: CustomerDetails) =>
			graphqlRequest(UPDATE_CUSTOMER_INFO_IN_BASKET, {
				customerDetailInput: input,
			}),
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

		const emailStoreInBasket =
			customerType === "registered" ? customerDetails?.customer?.email : email;

		// Saving email in the basket
		const detailsInput: CustomerDetails = {
			basketId: basketId || "",
			email: emailStoreInBasket,
		};
		await updateCustomerDetailInBasket.mutateAsync(detailsInput);

		try {
			await updateShippingMethodMutation.mutateAsync({
				basketId,
				id: selectedShippingMethod,
			});
			router.push("/payment");
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
					{/* <OrderSummary
						reverseOrder={true}
						buttonText="CHECKOUT"
						onButtonClick={handleCheckout}
					/> */}
					<OrderSummary
						reverseOrder={true}
						isButton={true}
						total={shippingAddressData?.basketInfo?.productTotal}
						currency={shippingAddressData?.basketInfo?.currency}
						subTotal={shippingAddressData?.basketInfo?.productSubTotal}
						buttonText="PROCEED TO PAYMENT"
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
				email={email}
				setEmail={setEmail}
			/>
		</section>
	);
};

export default Shipping;
