"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "../../atomic/Button/Button";
import Input from "../../atomic/Input/Input";
import styles from "./EditPassword.module.css";

type UserPassword = {
	currentPassword: string;
	password: string;
	confirmPassword: string;
};

interface EditPasswordProps {
	onUpdateClicked: (userPassword: UserPassword) => void;
}

const EditPassword = ({ onUpdateClicked }: EditPasswordProps) => {
	const t = useTranslations("Password");
	const [userPassword, setUserPassword] = useState({
		currentPassword: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<Partial<Record<keyof UserPassword, string>>>({});
	const [passwordStrength, setPasswordStrength] = useState<string[]>([]);

	const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
		const errors: string[] = [];
		
		if (password.length < 8) {
			errors.push("At least 8 characters");
		}
		
		if (!/[a-z]/.test(password)) {
			errors.push("At least one lowercase letter");
		}
		
		if (!/[A-Z]/.test(password)) {
			errors.push("At least one uppercase letter");
		}
		
		if (!/[0-9]/.test(password)) {
			errors.push("At least one number");
		}
		
		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
			errors.push("At least one special character");
		}
		
		return {
			isValid: errors.length === 0,
			errors
		};
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name as keyof UserPassword;
		const value = e.target.value;

		setUserPassword((prev) => ({ ...prev, [name]: value }));

		// Clear the specific error
		setErrors((prev) => ({ ...prev, [name]: "" }));

		// Update unmet requirements for new password field
		if (name === "password") {
			const unmetRequirements = getUnmetRequirements(value);
			setPasswordStrength(unmetRequirements);
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Partial<Record<keyof UserPassword, string>> = {};

		if (!userPassword.currentPassword.trim()) {
			newErrors.currentPassword = "Current password is required";
		}

		// New password validation
		if (!userPassword.password.trim()) {
			newErrors.password = "New password is required";
		} else {
			const unmetRequirements = getUnmetRequirements(userPassword.password);
			if (unmetRequirements.length > 0) {
				newErrors.password = "Password must meet all security requirements";
			}
		}

		// Confirm password validation
		if (!userPassword.confirmPassword.trim()) {
			newErrors.confirmPassword = "Confirm password is required";
		}

		if (
			userPassword.password &&
			userPassword.confirmPassword &&
			userPassword.password !== userPassword.confirmPassword
		) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleUpdate = () => {
		if (!validateForm()) return;
		onUpdateClicked(userPassword);
	};

	const getUnmetRequirements = (password: string): string[] => {
		const unmet: string[] = [];

		if (password.length < 8) {
			unmet.push("At least 8 characters");
		}

		if (!/[a-z]/.test(password)) {
			unmet.push("At least one lowercase letter");
		}

		if (!/[A-Z]/.test(password)) {
			unmet.push("At least one uppercase letter");
		}

		if (!/[0-9]/.test(password)) {
			unmet.push("At least one number");
		}

		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
			unmet.push("At least one special character");
		}

		return unmet;
	};

	return (
		<div className={styles.layout}>
			<div className={styles.profileText}>{t("password-title")}</div>
			<div className={styles.sectionForm}>
				{/* Current Password */}
				<div>
					<div className={styles.fontColor}>{t("current-password")}</div>
					<Input
						type="password"
						name="currentPassword"
						value={userPassword.currentPassword}
						onChange={handleChange}
						className={`${styles.inputField} ${errors.currentPassword ? styles.inputFieldError : ""}`}
					/>
					{errors.currentPassword && (
						<div className={styles.errorText}>{errors.currentPassword}</div>
					)}
				</div>

				{/* New Password */}
				<div>
					<div className={styles.fontColor}>{t("new-password")}</div>
					<Input
						type="password"
						name="password"
						value={userPassword.password}
						onChange={handleChange}
						className={`${styles.inputField} ${errors.password ? styles.inputFieldError : ""}`}
					/>
					{errors.password && (
						<div className={styles.errorText}>{errors.password}</div>
					)}

					{/* Password Requirements - Only show unmet requirements */}
					{userPassword.password && passwordStrength.length > 0 && (
						<div>
							{passwordStrength.map((requirement, index) => (
								<div key={requirement} className={styles.passwordRequirement}>
									<span className={styles.checkmark}>•</span>
									{requirement}
								</div>
							))}
						</div>
					)}
				</div>

				{/* Confirm Password */}
				<div>
					<div className={styles.fontColor}>{t("confirm-password")}</div>
					<Input
						type="password"
						name="confirmPassword"
						value={userPassword.confirmPassword}
						onChange={handleChange}
						className={`${styles.inputField} ${errors.confirmPassword ? styles.inputFieldError : ""}`}
					/>
					{errors.confirmPassword && (
						<div className={styles.errorText}>{errors.confirmPassword}</div>
					)}
				</div>
			</div>

			{/* Update Button */}
			<div className={styles.buttonContainer}>
				<Button
					variant="profileUpdate"
					className={styles.updateButton}
					onClick={handleUpdate}
				>
					{t("update-btn")}
				</Button>
			</div>
		</div>
	);
};

export default EditPassword;

/**
 * ## EditPassword
 *
 * The `EditPassword` component provides a controlled form for users to update their password securely.
 *
 * ### Props
 *
 * - **onUpdateClicked** (function): A callback function triggered on "UPDATE" button click.
 *   It receives the updated password object as its argument.
 *
 * ### Component Behavior
 *
 * - Maintains internal state (`userPassword`) to track current, new, and confirm password fields.
 * - Validates password strength with real-time feedback showing security requirements.
 * - Input fields are password-type and styled using `EditPassword.module.css`.
 *
 * ### Form Fields
 *
 * - **Current Password** (password input)
 * - **New Password** (password input with strength validation)
 * - **Confirm Password** (password input)
 *
 * ### Password Security Requirements
 *
 * - Minimum 8 characters
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 *
 * ### Validation
 *
 * - All fields must be filled.
 * - The new password must meet all security requirements.
 * - The new password and confirm password fields must match.
 *
 * ### Styling
 *
 * - Styles are handled via the `EditPassword.module.css` CSS module.
 */
