"use client"

import type React from "react"

import Input from "../../atomic/Input/Input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "../../molecules/Dialog/Dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../atomic/Select/Select";
import styles from "./AddressModal.module.css";
import { Button } from "../../atomic/Button/Button";
import { useState,useEffect } from "react";
import clsx, { ClassValue } from "clsx";
import { states } from "../../../common/constant";
import CheckBox from "../../atomic/CheckBox/CheckBox";

export const cn = (...args: ClassValue[]) => clsx(...args)

type AddressType = {
  firstName: string
  lastName: string
  phone: string
  apartment: string
  building: string
  street: string
  landmark?: string
  city: string
  state: string
  zipcode: string
  isDefault?: boolean
}

type AddressDialogProps = {
  className?: string
  onAddAddress?: (address: AddressType) => void
  onEditAddress?: (address: AddressType) => void
  addressToEdit?: AddressType | null
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function AddressDialog({
  className,
  onAddAddress,
  onEditAddress,
  addressToEdit,
  isOpen,
  onOpenChange,
  trigger,
}: AddressDialogProps) {
  const [isChecked, setIsChecked] = useState(false)
  const [formData, setFormData] = useState<AddressType>({
    firstName: "",
    lastName: "",
    phone: "",
    apartment: "",
    building: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    zipcode: "",
    isDefault: false,
  })

  
  useEffect(() => {
    if (addressToEdit) {
      setFormData(addressToEdit)
      setIsChecked(addressToEdit.isDefault || false)
    } else { 
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        apartment: "",
        building: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        zipcode: "",
        isDefault: false,
      })
      setIsChecked(false)
    }
  }, [addressToEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectState = (value: string) => {
    setFormData((prev) => ({ ...prev, state: value }))
  }

  const handleSubmit = () => {
    const updatedAddress = {
      ...formData,
      isDefault: isChecked,
    }

    if (addressToEdit) {
      onEditAddress?.(updatedAddress)
    } else {
      onAddAddress?.(updatedAddress)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className={cn(styles.DialogContent, styles.AddressDialogContent)}
        overlayClassName={styles.dialogOverlay}
      >
      
        <DialogHeader className={styles.AddressDialogHeader}>
          <DialogTitle className={styles.AddressDialogTitle}>
            {addressToEdit ? "Edit Address" : "Add Address"}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <DialogDescription asChild>
          <div className={styles.ScrollableContent}>
            <div className={styles.MandatoryText}>
              Fields with <span>*</span> sign are mandatory
            </div>

            <fieldset className={styles.Section}>
              <legend>Contact Details:</legend>
              <div className={styles.TwoColumn}>
                <Input placeholder="First Name*" name="firstName" />
                <Input placeholder="Last Name" name="lastName" />
              </div>
              <Input
                placeholder="Phone No.*"
                name="phone"
                type="tel"
                className={styles.PhoneInput}
              />
            </fieldset>

            <fieldset className={styles.Section}>
              <legend>Location Details:</legend>
              <div className={styles.TwoColumn}>
                <Input placeholder="Apartment, Suite, etc.*" name="apartment" />
                <Input placeholder="Building no.*" name="building" />
              </div>
              <div className={styles.StreetRow}>
                <Input
                  placeholder="Street, Locality name*"
                  name="street"
                  className="AddressStreet"
                />
              </div>
              <div className={styles.TwoColumn}>
                <Input placeholder="Landmark" name="landmark" />
                <Input placeholder="City*" name="city" />
              </div>
              <div className={styles.TwoColumn}>
                <div className={styles.SelectOutline}>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="State*" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="ZIP code*" name="zipcode" />
              </div>
            </fieldset>
          </div>
        </DialogDescription>

        <DialogFooter className={styles.AddressDialogFooter}>
          <div className={styles.CheckboxRow}>
            <CheckBox
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(!!checked)}
              id="setDefault"
            />
            <label>Set as Default</label>
          </div>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="secondary" type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
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
 * ---
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
 * ---
 *
 * ### Example Usage:
 *
 * ```tsx
 * import { AddressDialog } from "@/components/sections/addressModal/AddressModal";
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
 * ---
 *
 * ### Accessibility Considerations:
 * - Inherits focus trapping, ARIA roles, and keyboard navigation from Radix Dialog.
 * - Uses semantic HTML elements (`fieldset`, `legend`, `label`) for better screen reader support.
 * - Dialog closes on ESC key or when clicking the Cancel button.
 *
 * ---
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
 * ---
 *
 * ### Props:
 * This component does **not** currently accept props. All configuration is internal.
 *
 * ---
 *
 * ### Future Enhancements:
 * - Add form validation and controlled input states.
 * - Replace hardcoded state list with dynamic API-based data.
 * - Support for address editing by passing initial values via props.
 *
 * ---
 *
 */
