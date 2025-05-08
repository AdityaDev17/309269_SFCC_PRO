"use client";
import { usePathname } from "next/navigation";
import styles from "./myAccount.module.css";
import Tile from "../../components/atomic/Tile/Tile";
import Banner from "../../components/molecules/Banner/Banner";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";


const MyAccount = () => {
  return (
    <div className={styles.wrapper}>
      
      <Breadcrumbs
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "My Account" }]}
        breadcrumbSeparator="/slash.svg"
      />

      <Banner
        title="Hello Jenssa!"
        subtitle="Greetings!"
        subtitleVariant={5}
        backgroundImage="/images/myAccount-banner.svg"
        alignment="center-center"
        textColor="black"
      />

        <div className={styles.tilesGrid}>
        <Tile label="Personal Information" href="/my-account/personal-info" />
        <Tile label="Order History" href="/my-account/orders" />
        <Tile label="Payments" href="/my-account/payments" />
        <Tile label="My Subscription" href="/my-account/subscription" />
        <Tile label="Address Book" href="/my-account/address" />
        <Tile label="Contact & Preferences" href="/my-account/contact-info" />
        <Tile label="Log Out" href="/logout" />
        </div>

      
    </div>
  );
};

export default MyAccount;


