"use client";

import AccountBreadcrumb from "../AccountBreadcrumb";
import Profile from "../../../components/molecules/Profile/Profile";
import EditPassword from "../../../components/molecules/EditPassword/EditPassword";
import styles from "./PersonalInfo.module.css";

export default function PersonalInfoPage() {
  // const mockUserDetails = {
  //   title: "Mr.",
  //   firstName: "Utkarsh",
  //   lastName: "Pai",
  //   birthDate: "1985-12-04",
  //   gender: "Male",
  //   email: "utkarshpai@abc.com",
  // };

  const handleProfileUpdate = (updatedData: any) => {
    console.log("Updated Profile Data:", updatedData);
  };

  const handlePasswordUpdate = (updatedPassword: any) => {
    console.log("Updated Password:", updatedPassword);
  };

  return (
    <div className={styles.wrapper}>
      <AccountBreadcrumb />
      <h2 className={styles.header}>Personal Information</h2>

      <div className={styles.gridLayout}>
        <div className={styles.column}>
          <Profile  onUpdateClicked={handleProfileUpdate} />
        </div>

        
        <div className={styles.divider} />

        <div className={styles.rightColumn}>
          <EditPassword onUpdateClicked={handlePasswordUpdate} />
        </div>
      </div>
    </div>
  );
}
