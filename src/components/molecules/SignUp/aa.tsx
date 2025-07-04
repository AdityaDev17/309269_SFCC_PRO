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
		agreeToTerms: "",
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
			agreeToTerms: "",
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

	//  Validation function for Step 2 (Password Screen)
	const validatePasswordStep = () => {
		const newErrors = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			agreeToTerms: "",
		};

		// Validate password
		if (!formData.password.trim()) {
			newErrors.password = "Password is mandatory";
		} else if (!validatePassword(formData.password).isValid) {
			newErrors.password = getPasswordValidationMessage();
		}

		// Validate confirm password
		if (!formData.confirmPassword.trim()) {
			newErrors.confirmPassword = "Confirm Password is mandatory";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		// Validate terms agreement
		if (!formData.agreeToTerms) {
			newErrors.agreeToTerms = "You must agree to the Terms & Conditions";
		}

		setErrors(newErrors);
		return !newErrors.password && !newErrors.confirmPassword && !newErrors.agreeToTerms;
	};

	// Handle continue button click with validation
	const handleContinue = () => {
		if (validateStep()) {
			setpasswordScreen(true);
		}
	};

	// Handle proceed button click with validation
	const handleProceed = () => {
		if (validatePasswordStep()) {
			onProceed(formData);
		}
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
					<div className={styles.fontColor}>Password*</div>
					<Input
						type="password"
						value={formData?.password || ""}
						name="password"
						onChange={handleChange}
						style={{
							width: "325px",
							borderColor: errors.password ? "#FF0000" : "#B3B2B5",
						}}
					/>
					{/*  Error message for Password */}
					{errors.password && (
						<div className={styles.errorMessage}>{errors.password}</div>
					)}
				</div>
				<div>
					<div className={styles.fontColor}>Confirm Password*</div>
					<Input
						type="password"
						value={formData?.confirmPassword || ""}
						name="confirmPassword"
						onChange={handleChange}
						style={{
							width: "325px",
							borderColor: errors.confirmPassword ? "#FF0000" : "#B3B2B5",
						}}
					/>
					{/*  Error message for Confirm Password */}
					{errors.confirmPassword && (
						<div className={styles.errorMessage}>{errors.confirmPassword}</div>
					)}
				</div>
				<div>
					<div className={styles.row}>
						<CheckBox
							data-testid="checkbox"
							style={{ borderColor: "#4F4B53" }}
							checked={formData.agreeToTerms}
							onCheckedChange={(checked: boolean) => {
								setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
								// Clear error when user checks the box
								if (checked && errors.agreeToTerms) {
									setErrors((prev) => ({ ...prev, agreeToTerms: "" }));
								}
							}}
						/>
						<div className={styles.policy}>
							I have read, agreed to T&C & Privacy Policy*
						</div>
					</div>
					{/*  Error message for Terms Agreement */}
					{errors.agreeToTerms && (
						<div className={styles.errorMessage}>{errors.agreeToTerms}</div>
					)}
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
					onClick={handleProceed}
					// Removed disabled prop - button is now always enabled
				>
					PROCEED
				</Button>
			</div>
		</div>
	);
};
export default SignUp;