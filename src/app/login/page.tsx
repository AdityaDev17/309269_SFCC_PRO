'use client'
import React, { useState } from 'react'
import LoginComponent from './component'
import Login from '../../components/molecules/Login/Login'
import styles from "./login.module.css"
import SignUp from '../../components/molecules/SignUp/SignUp'
import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";

const page = () => {
  const [isLogin, setIsLogin] = useState(true);

  const createAccountHandler = (formData: any) => {
    setIsLogin(false);
  }
  return (
    <div className={styles.container}>
      <Breadcrumbs
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Login", href: "/login" },
        ]}
        breadcrumbSeparator="/slash.svg"
      />
      <div className={styles.loginContainer}>
        {isLogin ? <Login onCreateAccount={createAccountHandler}/> : <SignUp/>}
      </div>
      <LoginComponent showLogo={isLogin}/>
    </div>
  )
}

export default page