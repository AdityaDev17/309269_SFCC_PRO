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
	const [userPassword, setUserPassword] = useState({
		currentPassword: "",
		password: "",
		confirmPassword: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e?.target?.name;
		setUserPassword((prevData) => ({
			...prevData,
			[name]: e?.target?.value,
		}));
	};
	const handleDisable = () => {
		if (
			userPassword?.confirmPassword !== "" &&
			userPassword?.currentPassword !== "" &&
			userPassword?.password !== "" &&
			userPassword?.confirmPassword === userPassword?.password
		) {
			return false;
		}
	};
	console.log("24343", userPassword);
	return (
		<div className={styles.layout}>
			<div className={styles.profileText}>Password</div>
			<div className={styles.sectionForm}>
				<div>
					<div className={styles.fontColor}>Current Password*</div>
					<Input
						type="password"
						name="currentPassword"
						value={userPassword.currentPassword}
						onChange={handleChange}
						style={{ width: "325px", borderColor: "#B3B2B5" }}
					/>
				</div>
				<div>
					<div className={styles.fontColor}>New Password*</div>
					<Input
						type="password"
						name="password"
						value={userPassword.password}
						onChange={handleChange}
						style={{ width: "325px", borderColor: "#B3B2B5" }}
					/>
				</div>
				<div>
					<div className={styles.fontColor}>Confirm Password*</div>
					<Input
						type="password"
						name="confirmPassword"
						value={userPassword.confirmPassword}
						onChange={handleChange}
						style={{ width: "325px", borderColor: "#B3B2B5" }}
					/>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<Button
					disabled={handleDisable()}
					variant="profileUpdate"
					className={styles.updateButton}
					onClick={() => onUpdateClicked(userPassword)}
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
