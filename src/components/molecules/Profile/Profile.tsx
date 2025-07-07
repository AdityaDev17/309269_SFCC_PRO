"use client";
import { useEffect, useState } from "react";
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
import styles from "./Profile.module.css";

type UserDetails = {
	title: string;
	lastName: string;
	firstName: string;
	birthDate: string;
	gender: string;
	email: string;
};

interface ProfileProps {
	onUpdateClicked: (userDetails: UserDetails) => void;
	userDetails: UserDetails;
}

const Profile = ({ userDetails, onUpdateClicked }: ProfileProps) => {
	const [initialUserData, setInitailUserDate] = useState(userDetails);
	const [errors, setErrors] = useState<Partial<Record<keyof UserDetails, string>>>({});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | string,
		name?: keyof UserDetails,
	) => {
		let targetName: keyof UserDetails;
		let value: string;

		if (typeof e === "string" && name) {
			targetName = name;
			value = e;
		} else if (typeof e === "object" && "target" in e) {
			targetName = e.target.name as keyof UserDetails;
			value = e.target.value;
		} else {
			return;
		}

		setInitailUserDate((prevData) => ({
			...prevData,
			[targetName]: value,
		}));

    setErrors((prev) => ({
      ...prev,
      [targetName]: "",
    }));
  };

	const validateFields = () => {
		const newErrors: Partial<Record<keyof UserDetails, string>> = {};
		if (!initialUserData.title) newErrors.title = "Title is required";
		if (!initialUserData.firstName.trim()) newErrors.firstName = "First Name is required";
		if (!initialUserData.lastName.trim()) newErrors.lastName = "Last Name is required";
		if (!initialUserData.birthDate) newErrors.birthDate = "Birth Date is required";
		if (!initialUserData.gender) newErrors.gender = "Gender is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleUpdateClick = () => {
		if (!validateFields()) return;
		onUpdateClicked(initialUserData);
	};

	return (
		<div className={styles.layout}>
			<div className={styles.profileText}>Profile</div>
			<div className={styles.section}>
				<div className={styles.sectionForm}>
					{/* Title */}
					<div>
						<div className={styles.fontColor}>Title*</div>
						<Select onValueChange={(e) => handleChange(e, "title")}>
							<SelectTrigger
								className={`${styles.selectTrigger} ${errors.title ? styles.selectTriggerError : ""}`}>
								<SelectValue placeholder={initialUserData?.title || "Select"} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="Mr">Mr</SelectItem>
									<SelectItem value="Mrs">Mrs</SelectItem>
									<SelectItem value="Ms">Ms</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.title && <div className={styles.errorText}>{errors.title}</div>}
					</div>

					{/* Last Name */}
					<div>
						<div className={styles.fontColor}>Last Name*</div>
						<Input
							type="text"
							name="lastName"
							value={initialUserData?.lastName}
							onChange={handleChange}
							className={`${styles.inputField} ${errors.lastName ? styles.inputFieldError : ""}`}
						/>
						{errors.lastName && <div className={styles.errorText}>{errors.lastName}</div>}
					</div>

					{/* Birth Date */}
					<div>
						<div className={styles.fontColor}>Birth Date*</div>
						<Input
							type="date"
							name="birthDate"
							value={initialUserData?.birthDate || ""}
							onChange={handleChange}
							className={`${styles.inputField} ${errors.birthDate ? styles.inputFieldError : ""}`}
						/>
						{errors.birthDate && <div className={styles.errorText}>{errors.birthDate}</div>}
					</div>
				</div>
				<div className={styles.sectionForm}>
					{/* First Name */}
					<div>
						<div className={styles.fontColor}>First Name*</div>
						<Input
							type="text"
							name="firstName"
							value={initialUserData?.firstName || ""}
							onChange={handleChange}
							className={`${styles.inputField} ${errors.firstName ? styles.inputFieldError : ""}`}
						/>
						{errors.firstName && <div className={styles.errorText}>{errors.firstName}</div>}
					</div>

					{/* Gender */}
					<div>
						<div className={styles.fontColor}>Gender*</div>
						<Select onValueChange={(e) => handleChange(e, "gender")}>
							<SelectTrigger className={`${styles.selectTrigger} ${errors.gender ? styles.selectTriggerError : ""}`}>
								<SelectValue
									placeholder={initialUserData?.gender || "Gender"}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="male">Male</SelectItem>
									<SelectItem value="female">Female</SelectItem>
									<SelectItem value="others">Others</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.gender && <div className={styles.errorText}>{errors.gender}</div>}
					</div>

					{/* Email */}
					<div>
						<div className={styles.fontColor}>Email ID*</div>
						<Input
							type="email"
							name="email"
							value={initialUserData?.email || ""}
							disabled
							className={styles.inputField}
						/>
					</div>
				</div>
			</div>

			{/* Update Button */}
			<div className={styles.buttonContainer}>
				<Button
					variant="profileUpdate"
					className={styles.updateButton}
					onClick={handleUpdateClick}
				>
					UPDATE
				</Button>
			</div>
		</div>
	);
};

export default Profile;

/**
 * ## Profile
 *
 * The `Profile` component is a controlled form used to display and update a user's profile details,
 * including name, title, birth date, gender, and email.
 *
 * ### Props
 *
 * - **userDetails** (object): The initial user data used to populate the form fields.
 * - **onUpdateClicked** (function): Callback function triggered when the "UPDATE" button is clicked.
 *   Receives the updated user data as its argument.
 *
 * ### Component Behavior
 *
 * - The component maintains internal state (`initialUserData`) to track any modifications made to the form.
 * - The "UPDATE" button is disabled unless there are changes made compared to the original `userDetails`.
 * - Handles both standard input events and custom Select component value changes.
 * - Fields include:
 *   - Title (dropdown: Mr, Mrs, Ms)
 *   - First Name (text)
 *   - Last Name (text)
 *   - Birth Date (date picker)
 *   - Gender (dropdown: Male, Female, Others)
 *   - Email ID (text)
 *
 * - The layout and styles are managed using CSS modules from `Profile.module.css`.
 */
