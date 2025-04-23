"use client";
import styles from "./myAccount.module.css";
import AccountBreadcrumb from "./AccountBreadcrumb";
import Tile from "../../components/atomic/Tile/Tile";
import Banner from "../../components/molecules/Banner/Banner";


const MyAccount = () => {
  return (
    <div className={styles.wrapper}>
      
      <AccountBreadcrumb/>

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
        <Tile label="Privacy & Security" href="/my-account/security" />
        <Tile label="Log Out" href="/logout" />
        </div>

      
    </div>
  );
};

export default MyAccount;


