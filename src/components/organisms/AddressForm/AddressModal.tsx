"use client";

import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx, { type ClassValue } from "clsx";
import { useEffect, useMemo, useState } from "react";
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
	email,
	setEmail,
}: {
	open: boolean;
	onOpenChangeAction: (open: boolean) => void;
	isEditMode?: boolean;
	selectedAddress?: AddressData;
	refetch?: RefetchFunction;
	customerType?: string | null;
	setSelectedAddress?: (address: AddressData) => void;
	email: string;
	setEmail: (email: string) => void;
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

	// Validation state
	const [errors, setErrors] = useState<Record<string, string | undefined>>({});

	// Validation rules - for firstName, lastName, and email
	const validateField = (name: string, value: string) => {
		const newErrors = { ...errors };

		switch (name) {
			case "firstName":
				if (!value.trim()) {
					newErrors.firstName = "Please enter your first name";
				} else {
					newErrors.firstName = "";
				}
				break;
			case "lastName":
				if (!value.trim()) {
					newErrors.lastName = "Please enter your last name";
				} else {
					newErrors.firstName = "";
				}
				break;
			case "email":
				if (customerType === "guest") {
					if (!value.trim()) {
						newErrors.email = "Please enter your email address";
					} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						newErrors.email = "Please enter a valid email address";
					} else {
						newErrors.firstName = "";
					}
				}
				break;
			case "phone":
				if (!value.trim()) {
					newErrors.phone = "Phone number is required";
				} else {
					newErrors.phone = "";
				}
				break;
			case "apartment":
				if (!value.trim()) {
					newErrors.apartment = "Apartment/Suite is required";
				} else {
					newErrors.apartment = "";
				}
				break;
			case "building":
				if (!value.trim()) {
					newErrors.building = "Building number is required";
				} else {
					newErrors.building = "";
				}
				break;
			case "city":
				if (!value.trim()) {
					newErrors.city = "City is required";
				} else {
					newErrors.city = "";
				}
				break;
			case "zipcode":
				if (!value.trim()) {
					newErrors.zipcode = "ZIP code is required";
				} else {
					newErrors.zipcode = "";
				}
				break;
		}

		setErrors(newErrors);
	};

	// Check if form is valid - validate firstName, lastName, and email
	const isFormValid = useMemo(() => {
		const requiredFields = [
			{ name: "firstName", value: firstName },
			{ name: "lastName", value: lastName },
			{ name: "apartment", value: street },
			{ name: "building", value: address },
			{ name: "city", value: city },
			{ name: "zipcode", value: postalCode },
			{ name: "phone", value: phone },
		];

		// Add email validation for guest customers
		if (customerType === "guest") {
			requiredFields.push({ name: "email", value: email });
		}

		// Check if all required fields are filled
		const allFieldsFilled = requiredFields.every(
			(field) => field.value.trim() !== "",
		);

		// Check if there are any validation errors
		const hasErrors = Object.keys(errors).length > 0;

		// For email validation, also check email format
		if (customerType === "guest" && email) {
			const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
			return allFieldsFilled && !hasErrors && emailValid;
		}

		return allFieldsFilled && !hasErrors;
	}, [
		firstName,
		lastName,
		street,
		address,
		city,
		postalCode,
		phone,
		email,
		customerType,
		errors,
	]);

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
		setErrors({});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// Validate field on change
		validateField(name, value);

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
			case "email":
				setEmail(value);
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

		// Validate  before submitting
		const fieldsToValidate = [
			{ name: "firstName", value: firstName },
			{ name: "lastName", value: lastName },
			{ name: "apartment", value: street },
			{ name: "building", value: address },
			{ name: "city", value: city },
			{ name: "zipcode", value: postalCode },
			{ name: "phone", value: phone },
		];

		if (customerType === "guest") {
			fieldsToValidate.push({ name: "email", value: email });
		}

		for (const field of fieldsToValidate) {
			validateField(field.name, field.value);
		}

		if (!isFormValid) {
			console.log("Form is not valid, cannot submit");
			return;
		}

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
								<div>
									<Input
										placeholder="First Name*"
										name="firstName"
										value={firstName}
										onChange={handleChange}
										className={errors.firstName ? styles.ErrorInput : ""}
									/>
									{errors.firstName && (
										<div className={styles.ErrorText}>{errors.firstName}</div>
									)}
								</div>
								<div>
									<Input
										placeholder="Last Name*"
										name="lastName"
										value={lastName}
										onChange={handleChange}
										className={errors.lastName ? styles.ErrorInput : ""}
									/>
									{errors.lastName && (
										<div className={styles.ErrorText}>{errors.lastName}</div>
									)}
								</div>
								{customerType === "guest" && (
									<>
										<div>
											<Input
												placeholder="Email*"
												name="email"
												value={email}
												onChange={handleChange}
												className={errors.email ? styles.ErrorInput : ""}
											/>
											{errors.email && (
												<div className={styles.ErrorText}>{errors.email}</div>
											)}
										</div>
										<div>
											<Input
												placeholder="Phone No.*"
												name="phone"
												type="tel"
												className={cn(
													styles.PhoneInput,
													errors.phone ? styles.ErrorInput : "",
												)}
												value={phone}
												onChange={handleChange}
											/>
											{errors.phone && (
												<div className={styles.ErrorText}>{errors.phone}</div>
											)}
										</div>
									</>
								)}
							</div>
							{customerType === "registered" && (
								<div>
									<Input
										placeholder="Phone No.*"
										name="phone"
										type="tel"
										className={cn(
											styles.PhoneInput,
											errors.phone ? styles.ErrorInput : "",
										)}
										value={phone}
										onChange={handleChange}
									/>
									{errors.phone && (
										<div className={styles.ErrorText}>{errors.phone}</div>
									)}
								</div>
							)}
						</fieldset>

						{/* Location Details */}
						<fieldset className={styles.Section}>
							<legend>Location Details:</legend>
							<div className={styles.TwoColumn}>
								<div>
									<Input
										placeholder="Apartment, Suite, etc.*"
										name="apartment"
										value={street}
										onChange={handleChange}
										className={errors.apartment ? styles.ErrorInput : ""}
									/>
									{errors.apartment && (
										<div className={styles.ErrorText}>{errors.apartment}</div>
									)}
								</div>
								<div>
									<Input
										placeholder="Building no.*"
										name="building"
										value={address}
										onChange={handleChange}
										className={errors.building ? styles.ErrorInput : ""}
									/>
									{errors.building && (
										<div className={styles.ErrorText}>{errors.building}</div>
									)}
								</div>
							</div>
							<div className={styles.TwoColumn}>
								<div>
									<Input
										placeholder="City*"
										name="city"
										value={city}
										onChange={handleChange}
										className={errors.city ? styles.ErrorInput : ""}
									/>
									{errors.city && (
										<div className={styles.ErrorText}>{errors.city}</div>
									)}
								</div>
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
								<div>
									<Input
										placeholder="ZIP code*"
										name="zipcode"
										value={postalCode}
										onChange={handleChange}
										className={errors.zipcode ? styles.ErrorInput : ""}
									/>
									{errors.zipcode && (
										<div className={styles.ErrorText}>{errors.zipcode}</div>
									)}
								</div>
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
						<Button
							variant="secondary"
							type="submit"
							onClick={handleSubmit}
							disabled={!isFormValid}
							className={!isFormValid ? styles.DisabledButton : ""}
						>
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
