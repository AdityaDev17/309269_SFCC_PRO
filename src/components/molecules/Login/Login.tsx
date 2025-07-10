"use client";
import CheckBox from "@/components/atomic/CheckBox/CheckBox";
import { useState } from "react";
import { Button } from "../../atomic/Button/Button";
import Input from "../../atomic/Input/Input";
import styles from "./Login.module.css";
import { useTranslations } from "next-intl";

interface LoginProps {
	onLoginClicked: (formData: { email: string; password: string }) => void;
	onCreateAccount: () => void;
	errorMessage?: string;
	clearErrorMessage?: () => void;
}

interface ValidationErrors {
	email?: string;
	password?: string;
}

const Login = ({
	onLoginClicked,
	onCreateAccount,
	errorMessage,
	clearErrorMessage,
}: LoginProps) => {
	const t = useTranslations("Login");
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validateForm = (): boolean => {
		const errors: ValidationErrors = {};

		// Email validation
		if (!formData.email.trim()) {
			errors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = "Please enter a valid email address";
		}

		// Password validation
		if (!formData.password.trim()) {
			errors.password = "Password is required";
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (clearErrorMessage) {
			clearErrorMessage(); // ✅ Clear the error as user types
		}
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Clear validation error for this field when user starts typing
		if (validationErrors[name as keyof ValidationErrors]) {
			setValidationErrors(prev => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	const handleLoginClick = async () => {
		// Always validate on submit
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			await onLoginClicked(formData);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className={styles.layout}>
			<div className={styles.header}>{t("welcome")}</div>
			<div>
				<div className={styles.fontColor}>{t("email")}</div>
				<Input
					type="email"
					name="email"
					onChange={handleChange}
					style={{ width: "325px", borderColor: validationErrors.email ? "#dc3545" : "#B3B2B5" }}
				/>
				{validationErrors.email && (
					<p className={styles.fieldError}>{validationErrors.email}</p>
				)}
			</div>
			<div>
				<div className={styles.fontColor}>{t("password")}</div>
				<Input
					type="password"
					name="password"
					onChange={handleChange}
					style={{ width: "325px", borderColor: validationErrors.password ? "#dc3545" : "#B3B2B5" }}
				/>
				{validationErrors.password && (
					<p className={styles.fieldError}>{validationErrors.password}</p>
				)}
			</div>

			{errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}

			<div className={styles.row}>
				<div className={styles.rowGap}>
					<CheckBox data-testid="checkbox" className={styles.checkboxBox} />
					<div className={styles.forgotPassword}>{t("remember-me")}</div>
				</div>
				<div>
					<div className={styles.forgotPassword}>{t("forgot-password")}</div>
				</div>
			</div>
			<Button
				variant="secondary"
				size="lg"
				style={{
					width: "325px",
					color: "#FFFFFF",
					fontSize: "12px",
					fontWeight: "600",
				}}
				onClick={handleLoginClick}
			>
				{isSubmitting ? "LOGGING IN..." : t("login")}
			</Button>
			<div>
				<div className={`${styles.fontColor} ${styles.marginBottom}`}>
					{t("not-yet-registered")}
				</div>
				<Button
					onClick={onCreateAccount}
					variant="secondary"
					size="lg"
					style={{
						width: "325px",
						color: "#FFFFFF",
						fontSize: "12px",
						fontWeight: "600",
					}}
				>
					{t("create-account")}
				</Button>
			</div>
		</div>
	);
};
export default Login;

/**
 * ## Login
 *
 * The Login component is a user authentication form that captures email and password input
 * and optionally includes a "Remember Me" checkbox. It includes primary and secondary action buttons
 * for login and account creation.
 *
 * ### Props
 *
 * - **onLoginClicked** `(function)`: A callback function triggered when the "LOGIN" button is clicked.
 *   Receives the entered email and password as an object:
 *   ```ts
 *   (formData: {
 *     email: string;
 *     password: string;
 *   }) => void
 *   ```
 *
 * ### Component Behavior
 *
 * - Renders an email/password login form using controlled inputs.
 * - The **"LOGIN"** button is disabled until both email and password fields are filled.
 * - Includes a **"Remember Me"** checkbox for user convenience.
 * - Displays a **"Forgot Password?"** link for password recovery (non-functional placeholder).
 * - Provides a **"CREATE ACCOUNT"** button for users who are not yet registered (non-functional placeholder).
 *
 * ### Internal State
 *
 * - `formData`: Object containing `email` and `password`, updated in real-time as the user types.
 *
 * ### Styling
 *
 * - Layout and design are handled via CSS modules (`Login.module.css`).
 * - Button and input styling can be overridden with inline styles as needed.
 *
 * ### Usage Example
 *
 * ```tsx
 *
 * const handleLogin = (credentials) => {
 *   console.log("User logged in with:", credentials);
 * };
 *
 * <Login onLoginClicked={handleLogin} />
 * ```
 */
