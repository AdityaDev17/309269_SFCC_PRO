"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./login.module.css";

const LoginComponent = ({ showLogo }: { showLogo: boolean }) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobileView = () => {
			setIsMobile(window.innerWidth <= 768);
			console.log(window.innerWidth);
		};

		checkMobileView();
		window.addEventListener("resize", checkMobileView);
		return () => window.removeEventListener("resize", checkMobileView);
	}, []);
	return (
		<>
			{!isMobile && (
				<>
					<div className={styles.backgroundWrapper} />
					<Image
						src="/images/loginPageImg.svg"
						alt="Login Image"
						width={675}
						height={600}
						className={styles.loginImg}
						loading="eager"
					/>
					{showLogo && (
						<Image
							src="/images/Elenor-grey.svg"
							alt="Elenor Logo"
							width={789}
							height={137}
							className={styles.logoImg}
							loading="eager"
						/>
					)}
				</>
			)}
			{isMobile && (
				<Image
					src="/images/Elenor-grey.svg"
					alt="Elenor Logo"
					width={789}
					height={137}
					className={styles.logoImg}
					loading="eager"
				/>
			)}
		</>
	);
};

export default LoginComponent;
