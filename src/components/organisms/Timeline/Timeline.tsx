"use client";

import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { Button } from "../../atomic/Button/Button";
import Typography from "../../atomic/Typography/Typography";
import styles from "./timeline.module.css";

interface TimelineProps {
	steps: { header: string; text?: string }[];
	currentStep: number;
	complete?: boolean;
}
// {steps,currentStep,complete = false,}
const Timeline = ({ steps, currentStep, complete = false }: TimelineProps) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobileView = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobileView();
		window.addEventListener("resize", checkMobileView);
		return () => window.removeEventListener("resize", checkMobileView);
	}, []);
	if (isMobile) {
		if (currentStep === steps.length) {
			steps = [steps[currentStep - 1]];
		} else {
			steps = [steps[currentStep - 1], steps[steps.length - 1]];
		}
		currentStep = 1;
	}
	return (
		<div className={styles.container}>
			<Typography
				type="Label"
				variant={3}
				fontWeight="semibold"
				label="Shipping Details"
			/>
			<div className={styles.progress}>
				{steps.map((step, i) => {
					const isComplete = i + 1 <= currentStep || complete;

					const itemClass = `${styles.stepItem} ${isComplete ? styles.complete : ""} ${i === 0 ? styles.firstStep : ""}`;
					// styles.stepItem +
					// " " +
					// (isComplete ? styles.complete : "") +
					// " " +
					// (i === 0 ? styles.firstStep : "");

					return (
						<div key={i} className={itemClass}>
							<div className={styles.left}>
								{i !== 0 && <div className={styles.verticalLine} />}
								<div className={styles.step}>
									{isComplete ? <TiTick size={24} /> : i + 1}
								</div>
							</div>
							<div className={styles.statusText}>
								<Typography
									type="Body"
									variant={2}
									fontWeight="semibold"
									label={step.header}
									color="#4F4B53"
								/>
								<Typography
									type="Body"
									variant={3}
									fontWeight="regular"
									label={step.text && step.text}
									color="#4F4B53"
								/>
							</div>
						</div>
					);
				})}
			</div>
			<Button style={{ width: "100%", marginTop: "15px" }}>
				<Typography
					type="Body"
					variant={2}
					fontWeight="regular"
					label="TRACK PACKAGE"
				/>
			</Button>
		</div>
	);
};

export default Timeline;
