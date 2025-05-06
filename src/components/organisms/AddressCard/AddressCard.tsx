import React, { useState } from "react";
import CheckBox from "../../atomic/CheckBox/CheckBox";
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
import { FaPen, FaTrash } from "react-icons/fa";
import styles from "./AddressCard.module.css";
import { Button } from "../../atomic/Button/Button";
import { RadioGroup, RadioGroupItem } from "../../atomic/RadioGroup/RadioGroup";
import { AddressDialog } from "../AddressForm/AddressModal";

type CommonCardType = {
  id: string;
  title: string;
  description: string;
  phone?: string;
  extraInfo?: string;
  isDefault?: boolean;
};

type AddressCardProps = {
  items: CommonCardType[];
  variant: "address" | "delivery";
  radioButton?: boolean;
  isDelete?: boolean;
  shipping?:boolean;
};

const AddressCard: React.FC<AddressCardProps> = ({
  items,
  variant,
  radioButton,
  isDelete,
  shipping
}) => {
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    items.find((item) => item.isDefault)?.id || null
  );
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(
    items.find((item) => item.isDefault)?.id || null
  );

  const handleRadioChange = (id: string) => {
    setSelectedAddressId(id);
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddressId(id);
    setSelectedAddressId(id);
  };

  return (
    <RadioGroup
      value={selectedAddressId ?? ""}
      onValueChange={(value) => setSelectedAddressId(value)}
      className={`${styles.cardGrid} ${radioButton ? styles.twoColumnGrid : ""}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.card} ${selectedAddressId === item.id ? styles.defaultCard : ""}`}
        >
          <div className={styles.wrapper}>
            <h2 className={styles.name}>{item.title}</h2>
            {radioButton && <RadioGroupItem value={item.id}  onChange={()=>handleRadioChange}/>}
          </div>

          {item.description && (
            <p className={styles.address}>{item.description}</p>
          )}
          {item.phone && <p className={styles.phone}>Phone No. {item.phone}</p>}
          {item.extraInfo && (
            <p className={styles.extraInfo}>{item.extraInfo}</p>
          )}

          {variant === "address" && (
            <div className={styles.actions}>
              {(item.id === selectedAddressId ||
                item.id === defaultAddressId) &&
                shipping && (
                  <div className={styles.checkbox}>
                    <CheckBox
                      checked={item.id === defaultAddressId}
                      onChange={() => handleSetDefault(item.id)}
                    />
                    <span>
                      {item.id === defaultAddressId
                        ? "Default"
                        : "Set as Default"}
                    </span>
                  </div>
                )}

              {!shipping && (
                <div className={styles.checkbox}>
                  <CheckBox
                    checked={item.id === defaultAddressId}
                    onChange={() => handleSetDefault(item.id)}
                  />
                  <span>
                    {item.id === defaultAddressId
                      ? "Default"
                      : "Set as Default"}
                  </span>
                </div>
              )}
              <div className={styles.iconGroup}>
                <FaPen
                  className={styles.icon}
                  onClick={() => setIsAddressDialogOpen(true)}
                />
                <AddressDialog
                  open={isAddressDialogOpen}
                  onOpenChange={(open) => setIsAddressDialogOpen(open)}
                />
                {isDelete && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <FaTrash className={styles.icon} />
                    </DialogTrigger>
                    <DialogContent className={styles.dialogContent}>
                      <DialogHeader className={styles.dialogHeader}>
                        <DialogTitle className={styles.dialogTitle}>
                          Delete Confirmation
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription className={styles.dialogDescription}>
                        Are you sure you want to delete this address?
                      </DialogDescription>
                      <DialogFooter className={styles.dialogFooter}>
                        <DialogClose asChild>
                          <Button>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="secondary">Delete</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          )}
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
