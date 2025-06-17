"use client";
import { GET_CUSTOMER_BASKET, MERGE_BASKET, REGISTER } from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Breadcrumbs from "../../components/atomic/Breadcrumbs/Breadcrumbs";
import Login from "../../components/molecules/Login/Login";
import SignUp from "../../components/molecules/SignUp/SignUp";
import LoginComponent from "./component";
import styles from "./login.module.css";

type formDataProps = {
	title: string;
	firstName: string;
	lastName: string;
	gender: string;
	birthDate: string;
	email: string;
	password: string;
	confirmPassword: string;
	agreeToTerms: boolean;
};

const Page = () => {
	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();
	// const [postRegisterMutation] = useMutation(postRegistration);
	const postRegisterMutation = useMutation({
		mutationFn: (input: {
			credential: {
				password: string;
				customer: {
					login: string;
					lastName: string;
					email: string;
					title: string;
					salutation: string;
					gender: number;
					birthday: string;
					firstName: string;
				};
			};
		}) => graphqlRequest(REGISTER, { input }),
		onSuccess: async(data, variables) => {
			loginClickHandler({
				email: variables.credential.customer.email,
				password: variables.credential.password,
			},"registration");
		},
		retry: 3,
	});

	const mergeBasketMutation = useMutation({
		mutationFn: () => graphqlRequest(MERGE_BASKET),
		retry: 2,
	});

	const createAccountHandler = () => {
		setIsLogin(false);
	};

	const loginClickHandler = (formData: { email: string; password: string },call:string="login") => {
		// const authResponse = await loginCustomer()
		// console.log("Auth response received:", JSON.stringify(authResponse, null, 2))
		const usid = sessionStorage.getItem("usid")
			? sessionStorage.getItem("usid")
			: "";
		const { email, password } = formData;
		fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
				usid,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				Object.entries(data).map(([key, value]) => {
					sessionStorage.setItem(key, String(value));
				});
				// const response = await graphqlRequest(GET_CUSTOMER_BASKET, {
				//   customerId: data?.customer_id,
				// });
				// console.log("Active Basket", response);
				// sessionStorage.setItem("basketId",response?.customerBasketInfo?.baskets?.[0]?.basketId)
				// router.push("/");
				const expiryTime = Date.now() + data.expires_in * 1000;
				sessionStorage.setItem("sfcc_token_expiry", expiryTime.toString());
				router.push("/");
			})
			.then(async () => {

				if(call==="login"){
					try {
						await mergeBasketMutation.mutateAsync();
					} catch (err) {
						console.log(err);
					}
				}
				
				const response = await graphqlRequest(GET_CUSTOMER_BASKET, {
					customerId: sessionStorage?.getItem("customer_id"),
				});
				console.log("Active Basket", response);
				// sessionStorage.setItem(
				// 	"basketId",
				// 	response?.customerBasketInfo?.baskets?.[0]?.basketId,
				// );
				const basketId = response?.customerBasketInfo?.baskets?.[0]?.basketId;

				if (basketId) {
					sessionStorage.setItem("basketId", basketId);
				} 
			})
			.catch((error) => console.error("Login error ", error));
	};

	const signUpHandler = (formData: formDataProps) => {
		console.log("FormData", formData);
		const { title, gender, firstName, lastName, birthDate, email, password } =
			formData;
		const genderBool = gender === "male" ? 1 : gender === "female" ? 0 : 2;

		postRegisterMutation
			.mutateAsync({
				credential: {
					password: `${password}`,
					customer: {
						login: `${email}`,
						lastName: `${lastName}`,
						email: `${email}`,
						title: `${title}`,
						salutation: `${title}`,
						gender: genderBool,
						birthday: `${birthDate}`,
						firstName: `${firstName}`,
					},
				},
			})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error("Login error ", error));
	};

	return (
		<div className={styles.container}>
			<div className={styles.navigation}>
				<Breadcrumbs
					breadcrumbItems={[
						{ label: "Home", href: "/" },
						{ label: "Login", href: "/login" },
					]}
					breadcrumbSeparator="/slash.svg"
				/>
			</div>
			<div className={styles.loginContainer}>
				{isLogin ? (
					<Login
						onLoginClicked={loginClickHandler}
						onCreateAccount={createAccountHandler}
					/>
				) : (
					<SignUp onProceed={signUpHandler} />
				)}
			</div>
			<LoginComponent showLogo={isLogin} />
		</div>
	);
};

export default Page;
