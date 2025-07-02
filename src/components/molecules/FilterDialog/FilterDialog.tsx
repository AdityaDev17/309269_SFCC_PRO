"use client";

import { useState } from "react";
import { Button } from "../../atomic/Button/Button";
import CheckBox from "../../atomic/CheckBox/CheckBox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../molecules/Dialog/Dialog";
import styles from "./FilterDialog.module.css";
import { FilterDialogProps } from "@/common/type";



export default function FilterDialog({
	priceFilters,
	colorFilters,
	onApplyFilters,
}: FilterDialogProps) {
	const [activeTab, setActiveTab] = useState("Price");
	const [selectedFilters, setSelectedFilters] = useState<
		Record<string, Set<string>>
	>({});

	const tabs = ["Price", "Color"];

	const toggleFilter = (tab: string, value: string) => {
		setSelectedFilters((prev) => {
			const current = new Set(prev[tab] || []);
			current.has(value) ? current.delete(value) : current.add(value);
			return { ...prev, [tab]: current };
		});
	};

	const clearFilters = () => setSelectedFilters({});
	const applyFilters = () => {
		const selected = Object.fromEntries(
			Object.entries(selectedFilters).map(([k, v]) => [k, Array.from(v)]),
		);
		onApplyFilters(selected);
	};

	const getOptions = () => {
		switch (activeTab) {
			case "Price":
				return priceFilters.map((f) => ({ label: f.label, value: f.value }));
			case "Color":
				return colorFilters.map((color) => ({ label: color, value: color }));
			default:
				return [];
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Filter
				</Button>
			</DialogTrigger>

			<DialogContent className={styles.FilterDialogContent}>
				<DialogHeader className={styles.FilterDialogHeader}>
					<DialogTitle className={styles.FilterDialogTitle}>
						Filters
					</DialogTitle>
				</DialogHeader>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						{tabs.map((tab) => (
							<button
								type="button"
								key={tab}
								className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
								onClick={() => setActiveTab(tab)}
							>
								{tab}
							</button>
						))}
					</div>

					<div className={styles.content}>
						<h3 className={styles.sectionTitle}>{activeTab}</h3>
						<div className={styles.options}>
							{getOptions().map(({ label, value }) => (
								<label
									key={value}
									className={styles.checkboxLabel}
									htmlFor={value}
								>
									<CheckBox
										id={value}
										checked={selectedFilters[activeTab]?.has(value) || false}
										onCheckedChange={() => toggleFilter(activeTab, value)}
									/>
									<span>{label}</span>
								</label>
							))}
						</div>
					</div>
				</div>

				<DialogFooter className={styles.FilterDialogFooter}>
					<Button onClick={clearFilters}>CLEAR FILTERS</Button>
					<DialogClose asChild>
						<Button variant="secondary" onClick={applyFilters}>
							APPLY FILTERS
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
