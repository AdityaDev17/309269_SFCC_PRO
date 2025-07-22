"use client";
import { UPDATE_CUSTOMER_ADDRESS } from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import type React from "react";
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Button } from "../../atomic/Button/Button";
import CheckBox from "../../atomic/CheckBox/CheckBox";
import { RadioGroup, RadioGroupItem } from "../../atomic/RadioGroup/RadioGroup";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../molecules/Dialog/Dialog";
import { AddressDialog } from "../AddressForm/AddressModal";
import styles from "./AddressCard.module.css";

export type AddressData = {
	addressId: string;
	address1: string;
	address2: string | null;
	city: string;
	countryCode: string;
	firstName: string;
	lastName: string;
	phone: string;
	postalCode: string;
	isDefault: boolean;
	stateCode?: string | null;
	preferred?: boolean;
};

type RefetchFunction = () => Promise<{
	data?: {
		getCustomerAddress?: {
			addresses?: AddressData[];
		};
	};
}>;

type AddressCardProps = {
	items: AddressData[];
	radioButton?: boolean;
	isDelete?: boolean;
	handleDeleteAddress?: (item: AddressData) => void;
	refetch?: RefetchFunction;
	selectedAddress?: AddressData;
	setSelectedAddress?: React.Dispatch<
		React.SetStateAction<AddressData | undefined>
	>;
};

const AddressCard: React.FC<AddressCardProps> = ({
	items,
	radioButton,
	isDelete,
	handleDeleteAddress,
	refetch,
	selectedAddress,
	setSelectedAddress,
}) => {
	const t = useTranslations("AddressCard");
	const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const handleEditClick = (address: AddressData) => {
		setSelectedAddress?.(address);
		setEditMode(true);
		setIsAddressDialogOpen(true);
	};

	const updateAddressMutation = useMutation({
		mutationFn: (input: {
			addressId: string;
			address1: string;
			address2: string | null;
			city: string;
			countryCode: string;
			firstName: string;
			lastName: string;
			phone: string;
			postalCode: string;
			preferred: boolean;
			stateCode: string;
		}) => graphqlRequest(UPDATE_CUSTOMER_ADDRESS, { input }),
	});
	const customerType = sessionStorage?.getItem("customer_type");
	const handleDefaultAddress = async (
		item: AddressData,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const checked = e.target.checked;
		try {
			const input = {
				customerId: sessionStorage.getItem("customer_id") ?? "",
				addressId: item.addressId,
				address1: item.address1,
				address2: item.address2,
				city: item.city,
				countryCode: item.countryCode,
				firstName: item.firstName,
				lastName: item.lastName,
				phone: item.phone,
				postalCode: item.postalCode,
				preferred: checked,
				stateCode: "NY",
			};

			const response = await updateAddressMutation.mutateAsync(input);
			await refetch?.();
		} catch (error) {
			console.error("Error updating address:", error);
		}
	};

	useEffect(() => {
		if (selectedAddress && items.length > 0) {
			const exists = items.some(
				(item) => item.addressId === selectedAddress.addressId,
			);
			if (!exists) {
				const fallback = items.find((item) => item.isDefault) || items[0];
				setSelectedAddress?.(fallback);
			}
		}
	}, [items, selectedAddress, setSelectedAddress]);

	return (
		<RadioGroup
			className={`${styles.cardGrid} ${radioButton ? styles.twoColumnGrid : ""}`}
			value={selectedAddress?.addressId}
			onValueChange={(value) => {
				const found = items.find((item) => item.addressId === value);
				setSelectedAddress?.(found);
			}}
		>
			{items?.map((item) => (
				<div key={item.addressId} className={`${styles.card}`}>
					<div className={styles.wrapper}>
						<h2
							className={styles.name}
						>{`${item.firstName} ${item.lastName}`}</h2>
						{radioButton && <RadioGroupItem value={item.addressId} />}
					</div>

					<p className={styles.address}>
						{`${item?.address1} ${item?.city} ${item?.stateCode} ${item?.countryCode} ${item?.postalCode}`}
					</p>

					<p className={styles.phone}>
						{t("phone")} {item.phone}
					</p>

					<div className={styles.actions}>
						<div className={styles.checkbox}>
							<input
								type="checkbox"
								id="setDefault"
								checked={item.isDefault}
								onChange={(e) => handleDefaultAddress(item, e)}
							/>
							<span>
								{item?.isDefault ? t("default") : t("set-as-default")}
							</span>
						</div>

						<div className={styles.iconGroup}>
							<FaPen
								className={styles.icon}
								onClick={() => handleEditClick(item)}
							/>

							{isAddressDialogOpen && (
								<AddressDialog
									open={isAddressDialogOpen}
									onOpenChangeAction={async (open) => {
										setIsAddressDialogOpen(open);
										if (!open) {
											const result = await refetch?.();
											const allAddresses =
												result?.data?.getCustomerAddress?.addresses ?? [];
											const updated = allAddresses.find(
												(addr: AddressData) =>
													addr.addressId === selectedAddress?.addressId,
											);
											if (updated) {
												setSelectedAddress?.({
													addressId: updated.addressId,
													firstName: updated.firstName,
													lastName: updated.lastName,
													address1: updated.address1,
													address2: updated.address2,
													city: updated.city,
													countryCode: updated.countryCode,
													phone: updated.phone,
													postalCode: updated.postalCode,
													isDefault: updated.isDefault ?? false,
													stateCode: updated.stateCode ?? null,
												});
											}
										}
									}}
									isEditMode={editMode}
									selectedAddress={selectedAddress}
									refetch={refetch}
									customerType={customerType}
								/>
							)}

							{isDelete && (
								<Dialog>
									<DialogTrigger asChild>
										<FaTrash className={styles.icon} />
									</DialogTrigger>
									<DialogContent className={styles.dialogContent}>
										<DialogHeader className={styles.dialogHeader}>
											<DialogTitle className={styles.dialogTitle}>
												{t("delete-title")}
											</DialogTitle>
										</DialogHeader>
										<DialogDescription className={styles.dialogDescription}>
											{t("delete-confirmation")}
										</DialogDescription>
										<DialogFooter className={styles.dialogFooter}>
											<DialogClose asChild>
												<Button>{t("cancel")}</Button>
											</DialogClose>
											<DialogClose asChild>
												<Button
													variant="secondary"
													onClick={() => handleDeleteAddress?.(item)}
												>
													{t("delete")}
												</Button>
											</DialogClose>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							)}
						</div>
					</div>
				</div>
			))}
		</RadioGroup>
	);
};

export default AddressCard;

/**
 * ## AddressCard
 *
 * The `AddressCard` displays a list of user addresses or delivery options with optional radio selection,
 * default selection handling, and edit/delete actions.
 *
 * ### Props
 *
 * - `items`: An array of address or delivery option objects with `id`, `title`, `description`, and other optional fields.
 * - `variant`: Specifies the display mode - either `"address"` or `"delivery"`.
 * - `radioButton` (optional): When `true`, enables selection using radio buttons.
 * - `isDelete` (optional): When `true`, allows address deletion via a confirmation dialog.
 * - `shipping` (optional): When `true`, shows the "Set as Default" option only for selected/shipping address.
 *
 * ### Behavior
 *
 * - Displays each item in a card layout using a responsive grid.
 * - Allows selection via radio buttons if `radioButton` is enabled.
 * - Manages default address state separately from selected address state.
 * - Supports editing an address using the `AddressDialog` modal.
 * - Provides delete functionality through a confirmation `Dialog` if `isDelete` is enabled.
 * - "Set as Default" checkbox is conditionally displayed based on `shipping` and selection.
 *
 * ### Used Components
 *
 * - `RadioGroup`, `RadioGroupItem` for managing address selection.
 * - `Dialog`, `DialogTrigger`, `DialogContent`, `DialogFooter`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogClose` for delete confirmation modal.
 * - `CheckBox` for toggling the default address.
 * - `AddressDialog` for editing an address.
 * - `Button` for actions inside dialogs.
 * - Icons from `react-icons` (`FaPen`, `FaTrash`) for edit/delete.
 *
 * ### Styling
 *
 * Styles are imported from `AddressCard.module.css` and conditionally applied using `styles.<className>`.
 * Includes styles for layout grid, card states (selected/default), and actions.
 *
 * ### Example
 *
 * ```tsx
 * import AddressCard from "@/components/organisms/AddressCard/AddressCard";
 *
 * const addresses = [
 *   {
 *     id: "1",
 *     title: "Home",
 *     description: "123 Main Street, City",
 *     phone: "1234567890",
 *     isDefault: true,
 *   },
 *   {
 *     id: "2",
 *     title: "Work",
 *     description: "456 Office Street, Business City",
 *   },
 * ];
 *
 * export default function Page() {
 *   return (
 *     <AddressCard
 *       items={addresses}
 *       variant="address"
 *       radioButton
 *       isDelete
 *       shipping
 *     />
 *   );
 * }
 * ```
 */
