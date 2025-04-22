import Typography from "@/components/atomic/Typography/Typography"
import styles from "./ErrorComponent.module.css"

import React from 'react'
import { Button } from "@/components/atomic/button/button"
import Image from "next/image";


interface LayoutProps {
    errImg?: string ;
    text1?:string;
    text2?:string;
    buttonText?:string
  }
  

function ErrorComponent({ errImg="images/magnifyingGlass.svg",text1="No results found",text2="Please try another search term.",buttonText="TRY AGAIN"}: LayoutProps) {
  return (
    <div className={styles.layout}>
        <img src={errImg} alt="404" style={{marginBottom:"20px"}}/>

        <div className={styles.text}>
            <Typography type="Label" variant={3} label={text1} fontWeight="regular" color="#4F4B53"/>
        </div>
        <div className={styles.text}>
            <Typography type="Body" variant={1} label={text2} fontWeight="regular" color="#4F4B53"/>
        </div>

        <Button style={{marginTop:"10px"}}>
            <Typography type="Body" variant={3} fontWeight="semibold" label={buttonText}/>
        </Button>
    </div>
  )
}

export default ErrorComponent









{/* <Image 
src={errImg} 
alt="404" 
width={280}         
height={205} 
style={{ marginBottom: "20px" }} 
/> */}