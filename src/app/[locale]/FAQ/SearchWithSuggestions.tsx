"use client";

import type React from "react";

import { Button } from "@/components/atomic/Button/Button";
import Input from "@/components/atomic/Input/Input";
import { Mic, SearchIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

interface FaqItem {
	question: string;
	answer: string;
	id?: string;
	category?: string;
}

interface SearchWithSuggestionsProps {
	placeholder?: string;
	value?: string;
	onChange?: (val: string) => void;
	onClear?: () => void;
	onMicClick?: () => void;
	showMic?: boolean;
	className?: string;
	allFaqItems: FaqItem[];
	onSuggestionClick: (item: FaqItem) => void;
}

const SearchWithSuggestions = ({
	placeholder = "Search...",
	value,
	onChange,
	onClear,
	onMicClick,
	showMic = true,
	className = "",
	allFaqItems = [],
	onSuggestionClick,
}: SearchWithSuggestionsProps) => {
	const [internalValue, setInternalValue] = useState("");
	const [suggestions, setSuggestions] = useState<FaqItem[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const inputValue = value !== undefined ? value : internalValue;

	useEffect(() => {
		if (inputValue.trim().length > 2) {
			const filtered = allFaqItems.filter(
				(item) =>
					item.question.toLowerCase().includes(inputValue.toLowerCase()) ||
					item.answer.toLowerCase().includes(inputValue.toLowerCase()),
			);
			setSuggestions(filtered.slice(0, 5)); // even if it's 0 items
			setShowSuggestions(true); // always true when input length > 2
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	}, [inputValue, allFaqItems]);

	// Close suggestions when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVal = e.target.value;
		if (onChange) {
			onChange(newVal);
		} else {
			setInternalValue(newVal);
		}
	};

	const handleClear = () => {
		if (onClear) onClear();
		else {
			setInternalValue("");
		}
		setSuggestions([]);
		setShowSuggestions(false);
	};

	const handleSuggestionClick = (item: FaqItem) => {
		// Update search input with the selected question
		if (onChange) {
			onChange(item.question);
		} else {
			setInternalValue(item.question);
		}

		// Close suggestions
		setShowSuggestions(false);

		// Call the callback to handle navigation
		onSuggestionClick(item);
	};
	const handleSearch = () => {
		if (inputValue.trim().length > 2) {
			const filtered = allFaqItems.filter(
				(item) =>
					item.question.toLowerCase().includes(inputValue.toLowerCase()) ||
					item.answer.toLowerCase().includes(inputValue.toLowerCase()),
			);
			setSuggestions(filtered.slice(0, 5));
			setShowSuggestions(true);
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	};

	return (
		<div className={`${styles.wrapper} ${className} relative`} ref={wrapperRef}>
			<div className={styles.inputRow}>
				<Button
					className={styles.search}
					aria-label="Search"
					onClick={handleSearch}
				>
					<SearchIcon strokeWidth={1.2} color="grey" />
				</Button>

				<Input
					type="search"
					id="search"
					placeholder={placeholder}
					className={styles.input}
					value={inputValue}
					onChange={handleChange}
					onFocus={() =>
						inputValue.trim().length > 2 &&
						suggestions.length > 0 &&
						setShowSuggestions(true)
					}
				/>

				{inputValue && (
					<Button
						className={styles.cancel}
						aria-label="Clear search"
						onClick={handleClear}
					>
						<X strokeWidth={2} color="grey" />
					</Button>
				)}

				{showMic && (
					<Button
						className={styles.mic}
						aria-label="Voice search"
						onClick={onMicClick}
					>
						<Mic strokeWidth={1.8} color="grey" />
					</Button>
				)}
			</div>

			{/* Search Suggestions */}
			{showSuggestions && (
				<div className={styles.suggestionsWrapper}>
					<div className={styles.suggestionsBox}>
						{suggestions.length > 0 ? (
							<>
								<div className={styles.suggestionsHeader}>
									<p className={styles.suggestionsTitle}>SEARCH SUGGESTION</p>
								</div>
								<ul>
									{suggestions.map((item) => (
										<li key={item.id} className={styles.suggestionItem}>
											<button
												type="button"
												className={styles.suggestionButton}
												onClick={() => handleSuggestionClick(item)}
											>
												<SearchIcon className={styles.suggestionIcon} />
												<span className={styles.suggestionText}>
													{item.question}
												</span>
											</button>
										</li>
									))}
								</ul>
							</>
						) : (
							<>
								<div className={styles.suggestionsHeader}>
									<p className={styles.suggestionsTitle}>SEARCH SUGGESTION</p>
								</div>
								<div className={styles.noResults}>
									<p className={styles.noResultsTitle}>NO RESULTS FOUND</p>
									<p className={styles.noResultsMessage}>
										Please try a different search term.
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchWithSuggestions;
