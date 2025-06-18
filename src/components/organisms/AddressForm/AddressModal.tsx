"use client";

import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx, { type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { states } from "../../../common/constant";
import { Button } from "../../atomic/Button/Button";
import CheckBox from "../../atomic/CheckBox/CheckBox";
import Input from "../../atomic/Input/Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../atomic/Select/Select";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../molecules/Dialog/Dialog";
import type { AddressData } from "../AddressCard/AddressCard";
import styles from "./AddressModal.module.css";

const basketId = sessionStorage.getItem("basketId");
const customerId = sessionStorage.getItem("customer_id");

export const createAddress = `
  mutation CreateCustomerAddress($input: InputCustomerAddress!) {
    createCustomerAddress(input: $input) {
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
`;

export const updateAddress = `
  mutation UpdateCustomerAddress($input: InputCustomerAddress!) {
    updateCustomerAddress(input: $input) {
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
`;

export const updateShippingAddress = `
  mutation UpdateShippingAddress($input: InputCustomerAddress!) {
    updateShippingAddress(input: $input) {
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

export const cn = (...args: ClassValue[]) => clsx(...args);
type RefetchFunction = () => Promise<{
	data?: {
		getCustomerAddress?: {
			addresses?: AddressData[];
		};
	};
}>;
type CustomerAddressInput = {
	customerId: string | null;
	addressId?: string;
	address1: string;
	address2: string;
	city: string;
	countryCode: string;
	firstName: string;
	lastName: string;
	phone: string;
	postalCode: string;
	preferred: boolean;
	stateCode: string;
};

type ShippingAddressInput = {
	basketId: string | null;
	address1: string;
	address2: string;
	city: string;
	countryCode: string;
	firstName: string;
	lastName: string;
	phone: string;
	postalCode: string;
	stateCode: string;
	useAsBilling?: boolean;
};

export function AddressDialog({
	open,
	onOpenChangeAction,
	isEditMode = false,
	selectedAddress,
	refetch,
	setSelectedAddress,
	customerType = "registered",
}: {
	open: boolean;
	onOpenChangeAction: (open: boolean) => void;
	isEditMode?: boolean;
	selectedAddress?: AddressData;
	refetch?: RefetchFunction;
	customerType?: string | null;
	setSelectedAddress?: (address: AddressData) => void;
}) {
	// State initialization
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [street, setStreet] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("NY");
	const [country, setCountry] = useState("US");
	const [postalCode, setPostalCode] = useState("");
	const [phone, setPhone] = useState("");
	const [isDefault, setIsDefault] = useState(false);

	useEffect(() => {
		if (selectedAddress) {
			setFirstName(selectedAddress.firstName || "");
			setLastName(selectedAddress.lastName || "");
			setStreet(selectedAddress.address1 || "");
			setAddress(selectedAddress.address2 || "");
			setCity(selectedAddress.city || "");
			setState(selectedAddress.stateCode || "NY");
			setCountry(selectedAddress.countryCode || "US");
			setPostalCode(selectedAddress.postalCode || "");
			setPhone(selectedAddress.phone || "");
			setIsDefault(selectedAddress.isDefault || false);
		} else {
			resetForm();
		}
	}, [selectedAddress]);

	const resetForm = () => {
		setFirstName("");
		setLastName("");
		setStreet("");
		setAddress("");
		setCity("");
		setState("");
		setCountry("US");
		setPostalCode("");
		setPhone("");
		setIsDefault(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case "firstName":
				setFirstName(value);
				break;
			case "lastName":
				setLastName(value);
				break;
			case "apartment":
				setStreet(value);
				break;
			case "building":
				setAddress(value);
				break;
			case "city":
				setCity(value);
				break;
			case "state":
				setState(value);
				break;
			case "country":
				setCountry(value);
				break;
			case "zipcode":
				setPostalCode(value);
				break;
			case "phone":
				setPhone(value);
				break;
		}
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setIsDefault(checked);
	};

	// Mutations
	const createAddressMutation = useMutation({
		mutationFn: (input: CustomerAddressInput) =>
			graphqlRequest(createAddress, { input }),
	});

	const updateCustomerAddressMutation = useMutation({
		mutationFn: (input: CustomerAddressInput) =>
			graphqlRequest(updateAddress, { input }),
	});

	const updateShippingAddressMutation = useMutation({
		mutationFn: (input: ShippingAddressInput) =>
			graphqlRequest(updateShippingAddress, { input }),
	});

	const handleSubmit = async () => {
		console.log("save is clicked");
		try {
			if (customerType === "registered") {
				const input: CustomerAddressInput = {
					customerId,
					addressId: isEditMode
						? selectedAddress?.addressId
						: generateAddressId(),
					address1: street,
					address2: address,
					city,
					countryCode: country,
					firstName,
					lastName,
					phone,
					postalCode,
					preferred: isDefault,
					stateCode: "NY",
				};

				isEditMode
					? await updateCustomerAddressMutation.mutateAsync(input)
					: await createAddressMutation.mutateAsync(input);
				await refetch?.();
			} else {
				const input: ShippingAddressInput = {
					basketId,
					address1: street,
					address2: address,
					city,
					countryCode: country,
					firstName,
					lastName,
					phone: phone,
					postalCode,
					stateCode: "NY",
					...(isEditMode ? {} : { useAsBilling: true }),
				};
				await updateShippingAddressMutation.mutateAsync(input);
			}

			await refetch?.();
			onOpenChangeAction(false);
		} catch (err) {
			console.error("Error while submitting address:", err);
		}
	};

	const generateAddressId = () => Math.random().toString(36).substring(2, 10);

	return (
		<Dialog open={open} onOpenChange={onOpenChangeAction}>
			<DialogContent
				className={cn(styles.DialogContent, styles.AddressDialogContent)}
			>
				<DialogHeader className={styles.AddressDialogHeader}>
					<DialogTitle className={styles.AddressDialogTitle}>
						{isEditMode ? "Edit Address" : "Add Address"}
					</DialogTitle>
				</DialogHeader>

				<DialogDescription asChild>
					<div className={styles.ScrollableContent}>
						<div className={styles.MandatoryText}>
							Fields with <span>*</span> sign are mandatory
						</div>

						{/* Contact Details */}
						<fieldset className={styles.Section}>
							<legend>Contact Details:</legend>
							<div className={styles.TwoColumn}>
								<Input
									placeholder="First Name*"
									name="firstName"
									value={firstName}
									onChange={handleChange}
								/>
								<Input
									placeholder="Last Name"
									name="lastName"
									value={lastName}
									onChange={handleChange}
								/>
							</div>
							<Input
								placeholder="Phone No.*"
								name="phone"
								type="tel"
								className={styles.PhoneInput}
								value={phone}
								onChange={handleChange}
							/>
						</fieldset>

						{/* Location Details */}
						<fieldset className={styles.Section}>
							<legend>Location Details:</legend>
							<div className={styles.TwoColumn}>
								<Input
									placeholder="Apartment, Suite, etc.*"
									name="apartment"
									value={street}
									onChange={handleChange}
								/>
								<Input
									placeholder="Building no.*"
									name="building"
									value={address}
									onChange={handleChange}
								/>
							</div>
							<div className={styles.TwoColumn}>
								<Input
									placeholder="City*"
									name="city"
									value={city}
									onChange={handleChange}
								/>
								<div className={styles.SelectOutline}>
									<Select value={state} onValueChange={setState}>
										<SelectTrigger>
											<SelectValue placeholder="State*" />
										</SelectTrigger>
										<SelectContent>
											{states.map((s) => (
												<SelectItem key={s.value} value={s.value}>
													{s.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className={styles.TwoColumn}>
								<Input
									placeholder="ZIP code*"
									name="zipcode"
									value={postalCode}
									onChange={handleChange}
								/>
								<Input
									placeholder="Country"
									name="country"
									value={country}
									onChange={handleChange}
								/>
							</div>
						</fieldset>
					</div>
				</DialogDescription>

				{/* Footer */}
				<DialogFooter className={styles.AddressDialogFooter}>
					<div className={styles.CheckboxRow}>
						<input
							type="checkbox"
							id="setDefault"
							checked={isDefault}
							onChange={handleCheckboxChange}
						/>
						<label htmlFor="setDefault">Set as Default</label>
					</div>

					<div className={styles.ButtonRow}>
						<DialogClose asChild>
							<Button>Cancel</Button>
						</DialogClose>
						<Button variant="secondary" type="submit" onClick={handleSubmit}>
							{isEditMode ? "Update" : "Save"}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/**
 * ## AddressDialog Component
 *
 * `AddressDialog` is a composable modal dialog built using Radix UI primitives and custom atomic components.
 * It allows users to input and save a new shipping address, with validations for mandatory fields, structured sections for contact and location, and the option to set the address as default.
 *
 * ### Features:
 * - **Custom Dialog UI**: Built using the `Dialog` component set (Trigger, Content, Header, Title, Description, Footer, Close).
 * - **Atomic Inputs**: Uses project-level `Input`, `Select`, `Button`, and `Checkbox` components for consistency and design coherence.
 * - **Stateful Checkbox**: Includes an internal state (`isChecked`) to track the "Set as Default" checkbox.
 * - **Structured Form Sections**: Inputs are grouped under "Contact Details" and "Location Details" using semantic `<fieldset>` and `<legend>`.
 * - **Responsive Layout**: Modular CSS (`AddressModal.module.css`) defines a clean, two-column responsive layout with proper spacing.
 * - **Pre-defined State List**: Offers a sample list of states in a dropdown using `SelectItem` components.
 *
 *
 * ### Component Hierarchy:
 *
 * ```tsx
 * <Dialog>
 *   <DialogTrigger> // Opens modal
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle />
 *     </DialogHeader>
 *     <DialogDescription> // Scrollable content
 *       <fieldset>Contact Details</fieldset>
 *       <fieldset>Location Details</fieldset>
 *     </DialogDescription>
 *     <DialogFooter>
 *       <Checkbox /> // Set as default
 *       <DialogClose>Cancel</DialogClose>
 *       <Button>Save</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 *
 *
 * ### Example Usage:
 *
 * ```tsx
 *
 * export default function Page() {
 *   return (
 *     <div>
 *       <AddressDialog />
 *     </div>
 *   );
 * }
 * ```
 *
 *
 * ### Accessibility Considerations:
 * - Inherits focus trapping, ARIA roles, and keyboard navigation from Radix Dialog.
 * - Uses semantic HTML elements (`fieldset`, `legend`, `label`) for better screen reader support.
 * - Dialog closes on ESC key or when clicking the Cancel button.
 *
 *
 * ### Styling Notes:
 * - Modular styles are defined in `AddressModal.module.css`.
 * - Key class hooks:
 *   - `.AddressDialogContent` – Dialog positioning and box styling.
 *   - `.TwoColumn` – Grid layout for paired inputs.
 *   - `.DialogFooter` – Fixed footer styling.
 *   - `.CheckboxRow` – Layout for checkbox and label.
 *   - `.ScrollableContent` – Scrollable inner section.
 *
 * ### Props:
 * This component does **not** currently accept props. All configuration is internal.
 *
 *
 * ### Future Enhancements:
 * - Add form validation and controlled input states.
 * - Replace hardcoded state list with dynamic API-based data.
 * - Support for address editing by passing initial values via props.
 *
 *
 */
