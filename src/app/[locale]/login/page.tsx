"use client";
import { GET_CUSTOMER_BASKET, MERGE_BASKET, REGISTER } from "@/common/schema";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import Login from "@/components/molecules/Login/Login";
import SignUp from "@/components/molecules/SignUp/SignUp";
import analytics from "@/lib/analytics";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginComponent from "./component";
import styles from "./login.module.css";

type formDataProps = {
	title: string | null;
	firstName: string;
	lastName: string;
	gender: string | null;
	birthDate: string | null;
	email: string;
	password: string;
	confirmPassword: string;
	agreeToTerms: boolean;
};

const Page = () => {
	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();
	const [loginError, setLoginError] = useState<string | undefined>(undefined);
	const clearLoginError = () => {
		setLoginError(undefined);
	};
	// const [postRegisterMutation] = useMutation(postRegistration);
	const postRegisterMutation = useMutation({
		mutationFn: (input: {
			credential: {
				password: string;
				customer: {
					login: string;
					lastName: string;
					email: string;
					title?: string | null;
					salutation?: string | null;
					gender?: number | null;
					birthday?: string | null;
					firstName?: string | null;
				};
			};
		}) => graphqlRequest(REGISTER, { input }),
		onSuccess: async (data, variables) => {
			loginClickHandler(
				{
					email: variables.credential.customer.email,
					password: variables.credential.password,
				},
				"register",
			);
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

	const loginClickHandler = (
		formData: { email: string; password: string },
		call = "login",
	): Promise<void> => {
		// analytics.identify("xyz-123", () => {
		// 	console.log("do this after identify");
		// });
		return new Promise((resolve, reject) => {
			setLoginError(undefined); // Clear previous error
			let loginSuccess = false; // ✅ flag to track success
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

				.then(async (response) => {
					const data = await response.json();

					if (!response.ok) {
						const errorMessage = data?.message || "Login failed";
						setLoginError(errorMessage);
						reject(new Error(errorMessage));
						return;
					}

					loginSuccess = true;
					Object.entries(data).map(([key, value]) => {
						sessionStorage.setItem(key, String(value));
					});
					analytics.identify(
						sessionStorage.getItem("customer_id") ?? " ",
						() => {
							console.log("do this after identify");
						},
					);
					analytics.track(`user_${call}`, {
						userID: sessionStorage.getItem("customer_id") ?? " ",
						debug_mode: true,
					});
					const customerType = data.idp_access_token ? "registered" : "guest";
					sessionStorage.setItem("customer_type", customerType);
					const expiryTime = Date.now() + data.expires_in * 1000;
					sessionStorage.setItem("sfcc_token_expiry", expiryTime.toString());
				})
				.then(async () => {
					// Stop here if login failed
					if (!loginSuccess) {
						return;
					}
					if (call === "login") {
						try {
							await mergeBasketMutation.mutateAsync();
						} catch (err) {
							console.log(err);
						}
					}

					const response = await graphqlRequest(GET_CUSTOMER_BASKET, {
						customerId: sessionStorage?.getItem("customer_id"),
					});
					const basketId = response?.customerBasketInfo?.baskets?.[0]?.basketId;

					if (basketId) {
						sessionStorage.setItem("basketId", basketId);
					}
					router.push("/");
					resolve();
				})
				.catch((error) => {
					console.error("Login error ", error);
					setLoginError(error.message);
					reject(error); //  Reject on error
				});
		});
	};

	const signUpHandler = (formData: formDataProps) => {
		const { title, gender, firstName, lastName, birthDate, email, password } =
			formData;
		const genderValue =
			gender === "male"
				? 1
				: gender === "female"
					? 0
					: gender === "others"
						? 2
						: 2;

		postRegisterMutation
			.mutateAsync({
				credential: {
					password: `${password}`,
					customer: {
						login: `${email}`,
						lastName: `${lastName}`,
						email: `${email}`,
						title: title?.trim() || null,
						salutation: title?.trim() || null,
						gender: genderValue,
						birthday: birthDate?.trim() || null,
						firstName: `${firstName}`,
					},
				},
			})
			// .then((response) => response.json())
			.then((data) => console.log("Registration Success:", data))
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
						errorMessage={loginError}
						clearErrorMessage={clearLoginError}
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
