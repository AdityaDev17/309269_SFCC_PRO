import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Typography from "@/components/atomic/Typography/Typography";
import React from "react";

function page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/shop" },
          { label: "Order History" },
        ]}
        breadcrumbSeparator="/slash.svg"
      />
      <Typography
        type={"Label"}
        variant={3}
        fontWeight="semibold"
        label="ORDER HISTORY"
      />
    </div>
  );
}

export default page;
