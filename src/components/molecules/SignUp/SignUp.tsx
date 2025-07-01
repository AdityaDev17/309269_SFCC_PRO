"use client";
import CheckBox from "@/components/atomic/CheckBox/CheckBox";
import { useState } from "react";
import { Button } from "../../atomic/Button/Button";
import Input from "../../atomic/Input/Input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../atomic/Select/Select";
import styles from "./SignUp.module.css";

type SignUpFormData = {
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

interface SignUpProps {
	onProceed: (formData: SignUpFormData) => void;
}

const SignUp = ({ onProceed }: SignUpProps) => {
	const [passwordScreen, setpasswordScreen] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		firstName: "",
		lastName: "",
		gender: "",
		birthDate: "",
		email: "",
		password: "",
		confirmPassword: "",
		agreeToTerms: false,
	});

	//  Add state for validation errors
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | string,
		name?: string,
	) => {
		const targetName = typeof e === "string" ? name : e.target.name;
		const value = typeof e === "string" ? e : e.target.value;

		if (!targetName) return;

		setFormData((prevData) => ({
			...prevData,
			[targetName]: value,
		}));

		//  Clear validation error when user starts typing
		if (errors[targetName as keyof typeof errors]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[targetName]: "",
			}));
		}
	};

	// NEW: Handle field blur (when user leaves a field)
	const handleBlur = (fieldName: string) => {
		if (fieldName === "firstName" && !formData.firstName.trim()) {
			setErrors((prev) => ({ ...prev, firstName: "First Name is mandatory" }));
		}
		if (fieldName === "lastName" && !formData.lastName.trim()) {
			setErrors((prev) => ({ ...prev, lastName: "Last Name is mandatory" }));
		}
		if (fieldName === "email") {
			if (!formData.email.trim()) {
				setErrors((prev) => ({ ...prev, email: "Email ID is mandatory" }));
			} else if (!isValidEmail(formData.email)) {
				setErrors((prev) => ({
					...prev,
					email: "Please enter a valid email address",
				}));
			}
		}
	};

	//  Email validation function
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	//  Password validation function
	const validatePassword = (password: string) => {
		const minLength = password.length >= 8;
		const hasUppercase = /[A-Z]/.test(password);
		const hasLowercase = /[a-z]/.test(password);
		const hasNumber = /\d/.test(password);
		const hasSpecialChar = /[!@#$%^&*]/.test(password);
		const noWhitespace = !/\s/.test(password);

		return {
			isValid:
				minLength &&
				hasUppercase &&
				hasLowercase &&
				hasNumber &&
				hasSpecialChar &&
				noWhitespace,
			errors: {
				minLength,
				hasUppercase,
				hasLowercase,
				hasNumber,
				hasSpecialChar,
				noWhitespace,
			},
		};
	};

	//  Validation function for Step 1
	const validateStep = () => {
		const newErrors = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		};

		if (!formData.firstName.trim()) {
			newErrors.firstName = "First Name is mandatory";
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last Name is mandatory";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email ID is mandatory";
		} else if (!isValidEmail(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		setErrors(newErrors);
		return !newErrors.firstName && !newErrors.lastName && !newErrors.email;
	};

	//  Updated disable logic for Step 1 (only check mandatory fields)
	const handleDisable = () => {
		return !(
			formData.firstName.trim() &&
			formData.lastName.trim() &&
			formData.email.trim() &&
			isValidEmail(formData.email)
		);
	};

	// Handle continue button click with validation
	const handleContinue = () => {
		if (validateStep()) {
			setpasswordScreen(true);
		}
	};

	//  Password screen validation
	const isPasswordValid = () => {
		if (!formData.password || !formData.confirmPassword) return false;

		const passwordValidation = validatePassword(formData.password);
		const passwordsMatch = formData.password === formData.confirmPassword;

		return (
			passwordValidation.isValid && passwordsMatch && formData.agreeToTerms
		);
	};

	//  Get password validation message
	const getPasswordValidationMessage = () => {
		if (!formData.password) return "";

		const validation = validatePassword(formData.password);
		if (validation.isValid) return "";

		const messages = [];
		if (!validation.errors.minLength) messages.push("• At least 8 characters");
		if (!validation.errors.hasUppercase)
			messages.push("• At least one uppercase letter");
		if (!validation.errors.hasLowercase)
			messages.push("• At least one lowercase letter");
		if (!validation.errors.hasNumber) messages.push("• At least one number");
		if (!validation.errors.hasSpecialChar)
			messages.push("• At least one special character (!@#$%^&*)");
		if (!validation.errors.noWhitespace) messages.push("• No spaces allowed");

		return messages.join("\n");
	};

	return (
		<div className={styles.layout}>
			<div className={styles.header}>CREATE ACCOUNT</div>
			<div
				style={{ display: passwordScreen ? "none" : "grid" }}
				className={styles.layout}
			>
				<div>
					<div className={styles.fontColor}>Title*</div>
					<Select onValueChange={(e) => handleChange(e, "title")}>
						<SelectTrigger
							style={{
								width: "325px",
								border: "solid",
								borderWidth: "1px",
								borderColor: "#B3B2B5",
								color: "#75757A",
							}}
						>
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent
							style={{
								width: "325px",
								color: "#75757A",
								backgroundColor: "white",
								border: "1px solid #B3B2B5",
							}}
						>
							<SelectGroup>
								<SelectItem value="Mr" data-testid="select-item-1">
									Mr
								</SelectItem>
								<SelectItem value="Mrs" data-testid="select-item-2">
									Mrs
								</SelectItem>
								<SelectItem value="Ms" data-testid="select-item-2">
									Ms
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div>
					<div className={styles.fontColor}>First Name*</div>
					<Input
						type="text"
						name="firstName"
						value={formData?.firstName || ""}
						onChange={handleChange}
						onBlur={() => handleBlur("firstName")}
						style={{
							width: "325px",
							borderColor: errors.firstName ? "#FF0000" : "#B3B2B5",
						}}
					/>
					{/*  Error message for First Name */}
					{errors.firstName && (
						<div className={styles.errorMessage}>{errors.firstName}</div>
					)}
				</div>
				<div>
					<div className={styles.fontColor}>Last Name*</div>
					<Input
						type="text"
						name="lastName"
						value={formData?.lastName || ""}
						onChange={handleChange}
						onBlur={() => handleBlur("lastName")}
						style={{
							width: "325px",
							borderColor: errors.lastName ? "#FF0000" : "#B3B2B5",
						}}
					/>
					{/*  Error message for Last Name */}
					{errors.lastName && (
						<div className={styles.errorMessage}>{errors.lastName}</div>
					)}
				</div>
				<div>
					<div className={styles.fontColor}>Gender</div>
					<Select onValueChange={(e) => handleChange(e, "gender")}>
						<SelectTrigger
							style={{
								width: "325px",
								border: "solid",
								borderWidth: "1px",
								borderColor: "#B3B2B5",
								color: "#75757A",
							}}
						>
							<SelectValue placeholder="Gender" />
						</SelectTrigger>
						<SelectContent
							style={{
								width: "325px",
								borderColor: "#B3B2B5",
								color: "#75757A",
							}}
						>
							<SelectGroup>
								<SelectItem value="male" data-testid="select-item-1">
									Male
								</SelectItem>
								<SelectItem value="female" data-testid="select-item-2">
									Female
								</SelectItem>
								<SelectItem value="others" data-testid="select-item-2">
									Others
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div>
					<div className={styles.fontColor}>Birth Date</div>
					<Input
						type="date"
						name="birthDate"
						value={formData?.birthDate || ""}
						onChange={handleChange}
						style={{ width: "325px", borderColor: "#B3B2B5" }}
					/>
				</div>
				<div>
					<div className={styles.fontColor}>Email ID*</div>
					<Input
						type="email"
						name="email"
						value={formData?.email || ""}
						onChange={handleChange}
						onBlur={() => handleBlur("email")}
						style={{
							width: "325px",
							borderColor: errors.email ? "#FF0000" : "#B3B2B5",
						}}
					/>
					{/*  Error message for Email */}
					{errors.email && (
						<div className={styles.errorMessage}>{errors.email}</div>
					)}
				</div>
				<Button
					variant="secondary"
					className={styles.buttonStyle}
					size="lg"
					disabled={handleDisable()}
					style={{
						width: "325px",
						color: "#FFFFFF",
						fontSize: "12px",
						fontWeight: "600",
					}}
					onClick={handleContinue}
				>
					CONTINUE
				</Button>
			</div>
			<div
				style={{ display: passwordScreen ? "grid" : "none" }}
				className={styles.layout}
			>
				<div>
					<div className={styles.fontColor}>Password</div>
					<Input
						type="password"
						value={formData?.password || ""}
						name="password"
						onChange={handleChange}
						style={{
							width: "325px",
							borderColor:
								formData.password &&
								!validatePassword(formData.password).isValid
									? "#FF0000"
									: "#B3B2B5",
						}}
					/>
					{/*  Password validation message */}
					{formData.password &&
						!validatePassword(formData.password).isValid && (
							<div className={styles.errorMessage}>
								{getPasswordValidationMessage()}
							</div>
						)}
				</div>
				<div>
					<div className={styles.fontColor}>Confirm Password</div>
					<Input
						type="password"
						value={formData?.confirmPassword || ""}
						name="confirmPassword"
						onChange={handleChange}
						style={{ width: "325px", borderColor: "#B3B2B5" }}
					/>
					{/*  Confirm password validation message */}
					{formData.confirmPassword &&
						formData.password !== formData.confirmPassword && (
							<div className={styles.errorMessage}>Passwords do not match</div>
						)}
				</div>
				<div className={styles.row}>
					<CheckBox
						data-testid="checkbox"
						style={{ borderColor: "#4F4B53" }}
						checked={formData.agreeToTerms}
						onCheckedChange={(checked: boolean) =>
							setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
						}
					/>
					<div className={styles.policy}>
						I have read, agreed to T&C & Privacy Policy*
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
					onClick={() => onProceed(formData)}
					disabled={
						!isPasswordValid()
					} /* Changed to use isPasswordValid function */
				>
					PROCEED
				</Button>
			</div>
		</div>
	);
};
export default SignUp;

/**
 * ## SignUp
 *
 * The SignUp component is a two-step registration form that collects user information
 * and validates input before proceeding. It features a clean UI and is built using
 * atomic design components such as `Input`, `Select`, `Checkbox`, and `Button`.
 *
 * ### Props
 *
 * - **onProceed** `(function)`: A callback function invoked with the complete form data
 *   once the user submits the form.
 *   ```ts
 *   (formData: {
 *     title: string;
 *     firstName: string;
 *     lastName: string;
 *     gender: string;
 *     birthDate: string;
 *     email: string;
 *     password: string;
 *     confirmPassword: string;
 *     agreeToTerms: boolean;
 *   }) => void
 *   ```
 *
 * ### Component Behavior
 *
 * - Renders a two-step form:
 *   1. **Step 1**: Collects personal details like title, name, gender, birth date, and email.
 *   2. **Step 2**: Prompts for password setup and agreement to terms.
 *
 * - The **"CONTINUE"** button is disabled until all required fields in Step 1 are filled.
 * - The **"PROCEED"** button is disabled until:
 *   - Password and confirm password fields match
 *   - Terms & Conditions checkbox is checked
 *
 * - Form field values are controlled via component state.
 * - Styling is handled via CSS modules (`SignUp.module.css`) and inline overrides.
 *
 * ### Internal State
 *
 * - `formData`: Object containing all field values.
 * - `passwordScreen`: Boolean flag to switch between Step 1 and Step 2.
 *
 * ### Usage Example
 *
 * ```tsx
 *
 * const handleSignUp = (formData) => {
 *   console.log("User submitted form:", formData);
 * };
 *
 * <SignUp onProceed={handleSignUp} />
 * ```
 */
