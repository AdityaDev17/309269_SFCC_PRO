"use client";
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
	const [userPassword, setUserPassword] = useState<UserPassword>({
		currentPassword: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<Partial<Record<keyof UserPassword, string>>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name as keyof UserPassword;
		const value = e.target.value;

		setUserPassword((prev) => ({ ...prev, [name]: value }));

		// Clear the specific error
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const validateForm = (): boolean => {
		const newErrors: Partial<Record<keyof UserPassword, string>> = {};

		if (!userPassword.currentPassword.trim()) newErrors.currentPassword = "Current password is required";
		if (!userPassword.password.trim()) newErrors.password = "New password is required";
		if (!userPassword.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";
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

	return (
		<div className={styles.layout}>
			<div className={styles.profileText}>Password</div>
			<div className={styles.sectionForm}>
				{/* Current Password */}
				<div>
					<div className={styles.fontColor}>Current Password*</div>
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
					<div className={styles.fontColor}>New Password*</div>
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
				</div>

				{/* Confirm Password */}
				<div>
					<div className={styles.fontColor}>Confirm Password*</div>
					<Input
						type="password"
						name="confirmPassword"
						value={userPassword.confirmPassword}
						onChange={handleChange}
						 className={`${styles.inputField} ${errors.confirmPassword? styles.inputFieldError : ""}`}
					/>
					{errors.confirmPassword && (
						<div className={styles.errorText}>{errors.confirmPassword}</div>
					)}
				</div>
			</div>

			{/* Update Button (always enabled) */}
			<div className={styles.buttonContainer}>
				<Button
					variant="profileUpdate"
					className={styles.updateButton}
					onClick={handleUpdate}
				>
					UPDATE
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
 * - Disables the "UPDATE" button unless all fields are filled and the new password matches the confirmation password.
 * - Input fields are password-type and styled using `EditPassword.module.css`.
 *
 * ### Form Fields
 *
 * - **Current Password** (password input)
 * - **New Password** (password input)
 * - **Confirm Password** (password input)
 *
 * ### Validation
 *
 * - All fields must be filled.
 * - The new password and confirm password fields must match.
 *
 * ### Styling
 *
 * - Styles are handled via the `EditPassword.module.css` CSS module.
 */
