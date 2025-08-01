"use client";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation } from "@tanstack/react-query";
import clsx, { type ClassValue } from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { states } from "../../../common/constant";
import { Button } from "../../atomic/Button/Button";
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
import { CREATE_CUSTOMER_ADDRESS, UPDATE_ADDRESS, UPDATE_SHIPPING_ADDRESS } from "@/common/schema";
import { CustomerAddressInput, ShippingAddressInput } from "@/common/type";


export const cn = (...args: ClassValue[]) => clsx(...args);
type RefetchFunction = () => Promise<{
	data?: {
		getCustomerAddress?: {
			addresses?: AddressData[];
		};
	};
}>;

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
	const [state, setState] = useState("");
	const [country, setCountry] = useState("US");
	const [postalCode, setPostalCode] = useState("");
	const [phone, setPhone] = useState("");
	const [isDefault, setIsDefault] = useState(false);

	const basketId = sessionStorage.getItem("basketId");
	const customerId = sessionStorage.getItem("customer_id");

	// Validation state
	const [errors, setErrors] = useState<Record<string, string | undefined>>({});
	const [showErrors, setShowErrors] = useState(false);
	const t = useTranslations("AddressForm");

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

	// Validation rules
	const validateField = (name: string, value: string): string | undefined => {
		switch (name) {
			case "firstName":
				return !value.trim() ? "Please enter your first name" : undefined;
			case "lastName":
				return !value.trim() ? "Please enter your last name" : undefined;
			case "apartment":
				return !value.trim() ? "Please enter your apartment/suite" : undefined;
			case "building":
				return !value.trim() ? "Please enter your address" : undefined;
			case "city":
				return !value.trim() ? "Please enter your city" : undefined;
			case "state":
				return !value.trim() ? "Please select your state" : undefined;
			case "zipcode":
				return !value.trim() ? "Please enter your zip code" : undefined;
			case "phone":
				return !value.trim() ? "Please enter your phone number" : undefined;
			case "email":
				if (customerType === "guest") {
					if (!value.trim()) {
						return "Please enter your email address";
					}
					if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						return "Please enter a valid email address";
					}
				}
				return undefined;
			default:
				return undefined;
		}
	};

	// Validate all fields and update errors state
	const validateAllFields = () => {
		const fieldsToValidate = [
			{ name: "firstName", value: firstName },
			{ name: "lastName", value: lastName },
			{ name: "apartment", value: street },
			{ name: "building", value: address },
			{ name: "city", value: city },
			{ name: "state", value: state },
			{ name: "zipcode", value: postalCode },
			{ name: "phone", value: phone },
		];

		if (customerType === "guest") {
			fieldsToValidate.push({ name: "email", value: email });
		}

		const newErrors: Record<string, string | undefined> = {};
		for (const field of fieldsToValidate) {
			const error = validateField(field.name, field.value);
			if (error) {
				newErrors[field.name] = error;
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle individual field changes
	const handleFieldChange = (name: string, value: string) => {
		// Update the field value
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
		// Clear error for this field if validation passes
		if (showErrors) {
			const error = validateField(name, value);
			setErrors((prev) => ({
				...prev,
				[name]: error,
			}));
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		let formattedValue = value;
		if (name === "phone") {
			formattedValue = value.replace(/\D/g, "").slice(0, 10);
		}
		if (name === "zipcode") {
			formattedValue = value.replace(/\D/g, "").slice(0, 6);
		}

		handleFieldChange(name, formattedValue);
	};

	const handleSelectChange = (name: string, value: string) => {
		handleFieldChange(name, value);
	};

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
		setShowErrors(false);
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setIsDefault(checked);
	};

	// Focus on first error field
	const focusOnFirstError = () => {
		const errorFields = Object.keys(errors);
		if (errorFields.length > 0) {
			const firstErrorField = errorFields[0];
			setTimeout(() => {
				const element = document.querySelector(
					`[name="${firstErrorField}"]`,
				) as HTMLElement;
				if (element) {
					element.focus();
					element.scrollIntoView({ behavior: "smooth", block: "center" });
				}
			}, 100);
		}
	};

	// Mutations
	const createAddressMutation = useMutation({
		mutationFn: (input: CustomerAddressInput) =>
			graphqlRequest(CREATE_CUSTOMER_ADDRESS, { input }),
	});

	const updateCustomerAddressMutation = useMutation({
		mutationFn: (input: CustomerAddressInput) =>
			graphqlRequest(UPDATE_ADDRESS, { input }),
	});

	const updateShippingAddressMutation = useMutation({
		mutationFn: (input: ShippingAddressInput) =>
			graphqlRequest(UPDATE_SHIPPING_ADDRESS, { input }),
	});

	const handleSubmit = async () => {

		setShowErrors(true);
		const isValid = validateAllFields();

		if (!isValid) {
			focusOnFirstError();
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
					stateCode: state,
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
					phone,
					postalCode,
					stateCode: state,
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
						{isEditMode ? t("edit-address") : t("add-address")}
					</DialogTitle>
				</DialogHeader>

				<DialogDescription asChild>
					<div className={styles.ScrollableContent}>
						<div className={styles.MandatoryText}>
							Fields with <span>*</span> sign are mandatory
						</div>

						{/* Contact Details */}
						<fieldset className={styles.Section}>
							<legend>{t("contact-details")}</legend>
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
							<legend>{t("location-details")}</legend>
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

								<div className={styles.SelectWrapper}>
									<Select
										value={state}
										onValueChange={(value) =>
											handleSelectChange("state", value)
										}
									>
										<SelectTrigger
											className={cn(
												styles.SelectOutline,
												errors.state ? styles.ErrorInput : "",
											)}
										>
											<SelectValue placeholder="State*" />
										</SelectTrigger>
										<SelectContent className={styles.SelectContent}>
											{states.map((s) => (
												<SelectItem key={s.value} value={s.value}>
													{s.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									{errors.state && (
										<div className={styles.ErrorText}>{errors.state}</div>
									)}
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
								<div>
									<Input
										placeholder="Country"
										name="country"
										value={country}
										onChange={handleChange}
									/>
								</div>
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
						<label htmlFor="setDefault">{t("set-as-default")}</label>
					</div>

					<div className={styles.ButtonRow}>
						<DialogClose asChild>
							<Button>{t("cancel")}</Button>
						</DialogClose>
						<Button variant="secondary" type="submit" onClick={handleSubmit}>
							{isEditMode ? t("update") : t("save")}
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
