"use client";
import { Button } from "@/components/atomic/Button/Button";
import CheckBox from "@/components/atomic/CheckBox/CheckBox";
import Input from "@/components/atomic/Input/Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/atomic/Select/Select";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Accordion as AccordionWrapper,
} from "@/components/molecules/Accordion/AccordionWrapper";
import React, { useState } from "react";

import styles from './Contact.module.css'; 
import Breadcrumbs from '../../../components/atomic/Breadcrumbs/Breadcrumbs';

const ContactInfoPage = () => {
	const [isEditable, setIsEditable] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("+91 9819819000");
	const [email, setEmail] = useState("johnsmith@abc.com");

	const handleEditClick = () => {
		setIsEditable(true);
	};

	const handleCancelClick = () => {
		setEmail("johnsmith@abc.com");
		setPhoneNumber("+91 9819819000");
		setIsEditable(false);
	};

	const handleUpdateClick = () => {
		setIsEditable(false);
	};
	return (
		<div className={styles.pageBackground}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account", href: "/my-account" },
					{ label: "Contact & Preferences" },
				]}
			/>
			<div className={styles.contactPreferences}>
				<h1 className={styles.heading}>Contact Preferences</h1>

				<AccordionWrapper type="multiple">
					<AccordionItem value="track-orders">
						<AccordionTrigger className={styles.accordionTrigger}>
							Track Orders on WhatsApp
						</AccordionTrigger>
						<AccordionContent className={styles.accordionContent}>
							<div className={styles.section}>
								<div className={styles.checkboxWrapper}>
									<CheckBox id="whatsapp-order-checkbox" defaultChecked />
									<label
										className={styles.checkboxContainer}
										htmlFor="whatsapp-order-checkbox"
									>
										Receive order notifications on WhatsApp
									</label>
								</div>

								<div className={styles.notificationRow}>
									<p className={styles.notificationText}>
										WhatsApp notifications are currently being sent to:
									</p>
									<div className={styles.phoneRow}>
										<Input
											type="tel"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											className={styles.phoneInput}
											readOnly={!isEditable}
										/>
										{!isEditable ? (
											<Button
												variant="secondary"
												className={styles.editButton}
												onClick={handleEditClick}
											>
												Edit
											</Button>
										) : (
											<div className={styles.buttonGroup}>
												<Button
													variant="secondary"
													className={styles.updateButton}
													onClick={handleUpdateClick}
												>
													Update
												</Button>
												<Button
													className={styles.cancelButton}
													onClick={handleCancelClick}
												>
													Cancel
												</Button>
											</div>
										)}
									</div>
								</div>

								<div className={styles.checkboxWrapper}>
									<CheckBox id="whatsapp-promos-checkbox" defaultChecked />
									<label
										className={styles.checkboxContainer}
										htmlFor="whatsapp-promos-checkbox"
									>
										I wish to receive promotions & personalized recommendations
										on WhatsApp
									</label>
								</div>

								<label
									htmlFor="notificationFrequency"
									className={styles.selectLabel}
								>
									Notification Frequency
								</label>
								<div className={styles.selectWrapper}>
									<Select defaultValue="weekly">
										<SelectTrigger id="notificationFrequency">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="weekly">Weekly</SelectItem>
											<SelectItem value="daily">Daily</SelectItem>
											<SelectItem value="monthly">Monthly</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="sms-preferences">
						<AccordionTrigger className={styles.accordionTrigger}>
							SMS Preferences
						</AccordionTrigger>
						<AccordionContent className={styles.accordionContent}>
							<div className={styles.section}>
								<div className={styles.notificationRow}>
									<p className={styles.notificationText}>
										SMS notifications are currently being sent to:
									</p>
									<div className={styles.phoneRow}>
										<Input
											type="tel"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											className={styles.phoneInput}
											readOnly={!isEditable}
										/>
										{!isEditable ? (
											<Button
												variant="secondary"
												className={styles.editButton}
												onClick={handleEditClick}
											>
												Edit
											</Button>
										) : (
											<div className={styles.buttonGroup}>
												<Button
													variant="secondary"
													className={styles.updateButton}
													onClick={handleUpdateClick}
												>
													Update
												</Button>
												<Button
													className={styles.cancelButton}
													onClick={handleCancelClick}
												>
													Cancel
												</Button>
											</div>
										)}
									</div>
								</div>

								<div className={styles.checkboxWrapper}>
									<CheckBox id="whatsapp-promos-checkbox" defaultChecked />
									<label
										className={styles.checkboxContainer}
										htmlFor="whatsapp-promos-checkbox"
									>
										I wish to receive promotions & personalized recommendations
										on WhatsApp
									</label>
								</div>

								<label
									htmlFor="notificationFrequency"
									className={styles.selectLabel}
								>
									Notification Frequency
								</label>
								<div className={styles.selectWrapper}>
									<Select defaultValue="weekly">
										<SelectTrigger id="notificationFrequency">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="weekly">Weekly</SelectItem>
											<SelectItem value="daily">Daily</SelectItem>
											<SelectItem value="monthly">Monthly</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="email-preferences">
						<AccordionTrigger className={styles.accordionTrigger}>
							Email Preferences
						</AccordionTrigger>
						<AccordionContent className={styles.accordionContent}>
							<div className={styles.section}>
								<div className={styles.notificationRow}>
									<p className={styles.notificationText}>
										SMS notifications are currently being sent to:
									</p>
									<div className={styles.phoneRow}>
										<Input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className={styles.phoneInput}
											readOnly={!isEditable}
										/>
										{!isEditable ? (
											<Button
												variant="secondary"
												className={styles.editButton}
												onClick={handleEditClick}
											>
												Edit
											</Button>
										) : (
											<div className={styles.buttonGroup}>
												<Button
													variant="secondary"
													className={styles.updateButton}
													onClick={handleUpdateClick}
												>
													Update
												</Button>
												<Button
													className={styles.cancelButton}
													onClick={handleCancelClick}
												>
													Cancel
												</Button>
											</div>
										)}
									</div>
								</div>

								<div className={styles.selectWrapper}>
									<Select defaultValue="weekly">
										<SelectTrigger id="notificationFrequency">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="weekly">Weekly</SelectItem>
											<SelectItem value="daily">Daily</SelectItem>
											<SelectItem value="monthly">Monthly</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</AccordionWrapper>
			</div>
		</div>
	);
};

export default ContactInfoPage;
