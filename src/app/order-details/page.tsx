import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import React from "react";
import styles from "./orderDetails.module.css";
import Details from "./component";

function OrderDetails() {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/shop" },
          { label: "Order History" },
          { label: "Order Details" },
        ]}
        breadcrumbSeparator="/slash.svg"
      />
      <Typography
        type={"Label"}
        variant={3}
        fontWeight="semibold"
        label="ORDER HISTORY"
      />
      <Details />

      {/* <Dialog>
        <DialogTrigger asChild>
          <Button>Delete</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <>
              <Button asChild>
                <DialogClose>Cancel</DialogClose>
              </Button>
              <Button>Confirm</Button>
            </>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      
    </div>
  );
}

export default OrderDetails;
