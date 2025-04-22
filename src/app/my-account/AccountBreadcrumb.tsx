"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const pathMap: Record<string, string> = {
  "my-account": "My Account",
  "personal-info": "Personal Information",
  orders: "Order History",
  payments: "Payments",
  subscription: "My Subscription",
  address: "Address Book",
  security: "Privacy & Security",
};

const AccountBreadcrumb = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === pathParts.length - 1;
          const label = pathMap[part] || decodeURIComponent(part);

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AccountBreadcrumb;
