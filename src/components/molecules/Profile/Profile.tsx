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
	const [originalData, setOriginalData] = useState(userDetails);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | string,
		name?: keyof UserDetails,
	) => {
		let targetName: keyof UserDetails;
		let value: string;

		if (typeof e === "string" && name) {
			targetName = name;
			value = e;
		} else if ("target" in e && e.target) {
			targetName = e.target.name as keyof UserDetails;
			value = e.target.value;
		} else {
			return;
		}

		setInitailUserDate((prevData) => ({
			...prevData,
			[targetName]: value,
		}));
	};

	useEffect(() => {
		setInitailUserDate(userDetails);
		setOriginalData(userDetails);
	}, [userDetails]);

	// const isDisabled =
	// 	JSON.stringify(userDetails) === JSON.stringify(initialUserData);

	const isDisabled =
		JSON.stringify(originalData) === JSON.stringify(initialUserData);

	return (
		<div className={styles.layout}>
			<div className={styles.profileText}>Profile</div>
			<div className={styles.section}>
				<div className={styles.sectionForm}>
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
								<SelectValue placeholder={initialUserData?.title || "Select"} />
							</SelectTrigger>
							<SelectContent
								style={{
									width: "325px",
									borderColor: "#B3B2B5",
									color: "#75757A",
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
						<div className={styles.fontColor}>Last Name*</div>
						<Input
							type="text"
							name="lastName"
							value={initialUserData?.lastName}
							onChange={handleChange}
							style={{ width: "325px", borderColor: "#B3B2B5" }}
						/>
					</div>
					<div>
						<div className={styles.fontColor}>Birth Date*</div>
						<Input
							type="date"
							name="birthDate"
							value={initialUserData?.birthDate || ""}
							onChange={handleChange}
							style={{ width: "325px", borderColor: "#B3B2B5" }}
						/>
					</div>
				</div>
				<div className={styles.sectionForm}>
					<div>
						<div className={styles.fontColor}>First Name*</div>
						<Input
							type="text"
							name="firstName"
							value={initialUserData?.firstName || ""}
							onChange={handleChange}
							style={{ width: "325px", borderColor: "#B3B2B5" }}
						/>
					</div>
					<div>
						<div className={styles.fontColor}>Gender*</div>
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
								<SelectValue
									placeholder={initialUserData?.gender || "Gender"}
								/>
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
						<div className={styles.fontColor}>Email ID*</div>
						<Input
							type="email"
							name="email"
							value={initialUserData?.email || ""}
							onChange={handleChange}
							disabled
							style={{ width: "325px", borderColor: "#B3B2B5" }}
						/>
					</div>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<Button
					disabled={isDisabled}
					variant="profileUpdate"
					className={styles.updateButton}
					onClick={() => onUpdateClicked(initialUserData)}
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
