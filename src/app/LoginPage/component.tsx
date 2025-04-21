import Image from "next/image";
import styles from "./login.module.css"

const LoginComponent = ({showLogo}: any) => {
    return (
        <>
            <div className={styles.container} />
            <Image src="/images/loginPageImg.svg" alt="Login Image" width={675} height={600} className={styles.loginImg}/>
            {showLogo && <Image src="/images/Elenor-grey.svg" alt="Elenor Logo" width={789} height={137} className={styles.logoImg}/>}
        </>
    )
}

export default LoginComponent;