'use client'
import React, { useState } from 'react'
import LoginComponent from './component'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/atomic/Breadcrumbs/Breadcrumbs'
import Login from '../../components/molecules/Login/Login'
import styles from "./login.module.css"
import SignUp from '../../components/molecules/SignUp/SignUp'

const page = () => {
  const [isLogin, setIsLogin] = useState(true);

  const createAccountHandler = (formData: any) => {
    setIsLogin(false);
  }
  return (
    <div className={styles.container}>
      <Breadcrumb >
        <BreadcrumbList className={styles.navigation}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Login</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className={styles.loginContainer}>
        {isLogin ? <Login onCreateAccount={createAccountHandler}/> : <SignUp/>}
      </div>
      <LoginComponent showLogo={isLogin}/>
    </div>
  )
}

export default page