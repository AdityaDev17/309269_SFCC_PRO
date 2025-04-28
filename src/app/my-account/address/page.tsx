"use client"

import { useState } from "react"
import styles from "./Address.module.css"
import AccountBreadcrumb from "../AccountBreadcrumb"
import { Button } from "../../../components/atomic/Button/Button"
import { FaPen, FaTrash } from "react-icons/fa"
import CheckBox from "../../../components/atomic/CheckBox/CheckBox"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../../components/molecules/Dialog/Dialog"
import { AddressDialog } from "../../../components/organisms/AddressForm/AddressModal"
import ErrorComponent from "../../../components/molecules/ErrorComponent/ErrorComponent"
import { addresses } from "../../../common/constant"

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

const AddressPage = () => {
  const [addressesList, setAddresses] = useState<AddressType[]>(addresses)
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [addressToEdit, setAddressToEdit] = useState<AddressType | null>(null)

  const handleToggleDefault = (index: number) => {
    setAddresses((prev) =>
      prev.map((addr, i) => ({
        ...addr,
        isDefault: i === index ? !addr.isDefault : false,
      })),
    )
  }

  const handleDelete = () => {
    if (selectedAddressIndex !== null) {
      setAddresses((prev) => prev.filter((_, i) => i !== selectedAddressIndex))
      setSelectedAddressIndex(null)
    }
  }

  const handleEditClick = (index: number) => {
    setAddressToEdit(addressesList[index])
    setSelectedAddressIndex(index)
    setIsAddressDialogOpen(true)
  }

  const handleAddNewClick = () => {
    setAddressToEdit(null)
    setSelectedAddressIndex(null)
    setIsAddressDialogOpen(true)
  }

  const handleEditAddress = (updatedAddress: AddressType) => {
    if (selectedAddressIndex !== null) {
      setAddresses((prev) => prev.map((address, index) => (index === selectedAddressIndex ? updatedAddress : address)))
      setIsAddressDialogOpen(false)
    }
  }

  const handleAddAddress = (newAddress: AddressType) => {
    setAddresses((prev) => [...prev, newAddress])
    setIsAddressDialogOpen(false)
  }

  return (
    <div className={styles.wrapper}>
      <AccountBreadcrumb />
      <h1 className={styles.title}>ADDRESS BOOK</h1>

      
      {/* <Button variant="secondary" className={styles.addButton} onClick={handleAddNewClick}>
        ADD NEW ADDRESS
      </Button> */}
      {addressesList.length > 0 && (
        <Button variant="secondary" className={styles.addButton} onClick={handleAddNewClick}>
          ADD NEW ADDRESS
        </Button>
      )}

      {/* Address Dialog for both Add and Edit */}
      <AddressDialog
        isOpen={isAddressDialogOpen}
        onOpenChange={setIsAddressDialogOpen}
        addressToEdit={addressToEdit}
        onAddAddress={handleAddAddress}
        onEditAddress={handleEditAddress}
      />

      <div className={styles.cardGrid}>
        {addressesList.length === 0 ? (
          <div className={styles.centerWrapper}>
            <ErrorComponent
              errImg="/images/emptyBook.svg"
              imgHeight={200}
              imgWidth={200}
              text1="No Saved Addresses"
              text2="Save an address for faster checkout."
              buttonText="ADD AN ADDRESS"
              onButtonClick={handleAddNewClick}
            />
          </div>
        ) : (
          addressesList.map((item, index) => (
            <div className={`${styles.card} ${item.isDefault ? styles.defaultCard : ""}`} key={index}>
              <h2 className={styles.name}>
                {item.firstName} {item.lastName}
              </h2>
              <p className={styles.address}>
                {item.apartment}, {item.building}, {item.street}, {item.city}, {item.state}, {item.zipcode}
              </p>
              <p className={styles.phone}>Phone No. {item.phone}</p>

              <div className={styles.actions}>
                <div className={styles.checkbox}>
                  <CheckBox checked={item.isDefault || false} onCheckedChange={() => handleToggleDefault(index)} />
                  <span>{item.isDefault ? "Default" : "Set as Default"}</span>
                </div>
                <div className={styles.iconGroup}>
                  <FaPen className={styles.icon} onClick={() => handleEditClick(index)} />

                  <Dialog>
                    <DialogTrigger asChild>
                      <FaTrash className={styles.icon} onClick={() => setSelectedAddressIndex(index)} />
                    </DialogTrigger>
                    <DialogContent className={styles.dialogContent} overlayClassName={styles.dialogOverlay}>
                      <DialogHeader className={styles.dialogHeader}>
                        <DialogTitle className={styles.dialogTitle}>Delete Confirmation</DialogTitle>
                      </DialogHeader>

                      <DialogDescription className={styles.dialogDescription}>
                        Are you sure you want to delete this address?
                      </DialogDescription>

                      <DialogFooter className={styles.dialogFooter}>
                        <DialogClose asChild>
                          <Button>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="secondary" onClick={handleDelete}>
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AddressPage
