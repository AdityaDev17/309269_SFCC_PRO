import Typography from "@/components/atomic/Typography/Typography";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/molecules/Drawer/Drawer";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import Search from "@/components/molecules/Search/Search";
import { SearchIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import {
	productSuggestions,
	searchSuggestions,
} from "../../../common/constant";
import styles from "./Header.module.css";

interface SearchMenuProps {
	keyVal: number;
	searchIcon: string;
	isMobile: boolean;
}

const SearchMenu = ({ keyVal, searchIcon, isMobile }: SearchMenuProps) => {
	const searchMenuHeight = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);
	const [open, setOpen] = useState(false);
	const t = useTranslations("Header");
	useEffect(() => {
		if (!open) return;

		let resizeObserver: ResizeObserver | null = null;

		const timeout = setTimeout(() => {
			const element = searchMenuHeight.current;
			if (!element) return;

			setHeight(element.getBoundingClientRect().height);

			resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					setHeight(entry.contentRect.height);
				}
			});

			resizeObserver.observe(element);
		}, 100);

		return () => {
			clearTimeout(timeout);
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, [open]);

	const closeHandler = () => {
		setOpen(false);
	};
	return (
		<Drawer open={open} onOpenChange={setOpen} side="top" key={keyVal}>
			<DrawerTrigger asChild>
				<Image
					src={searchIcon}
					alt="Open Cart"
					width={20}
					height={20}
					onClick={() => setOpen(true)}
					className={styles.searchLogo}
				/>
			</DrawerTrigger>
			<DrawerContent height={`${height + 26}px`} side="top">
				<DrawerTitle />
				<div ref={searchMenuHeight}>
					<DrawerHeader className={styles.bagHeader}>
						<div className={styles.searchMenuContainer}>
							<div className={styles.searchHeader}>
								{!isMobile && (
									<Image
										src={"/images/SFCCLogo.svg"}
										height={20}
										width={109}
										alt="SFCC LOGO"
									/>
								)}
								<Search />
								{!isMobile && (
									<X
										onClick={closeHandler}
										strokeWidth={2}
										color="grey"
										className={styles.close}
									/>
								)}
							</div>
							<div className={styles.suggestionWrapper}>
								<div className={styles.searchSuggestion}>
									<Typography
										type="Body"
										variant={1}
										label={t("searchSuggestion")}
									/>
									{searchSuggestions.map((suggestion, index) => (
										<Fragment key={suggestion}>
											<p className={styles.searchSuggestionValue}>
												<SearchIcon strokeWidth={1.2} color="grey" />{" "}
												{suggestion}
											</p>
										</Fragment>
									))}
								</div>
								<div className={styles.productSuggestion}>
									<Typography
										type="Body"
										variant={1}
										label={t("productSuggestion")}
									/>
									<div className={styles.productSuggestionWrapper}>
										{productSuggestions.map((suggestion, index) => (
											<ProductCard
												key={suggestion.productId}
												productImage={suggestion.productImage}
												width={"100%"}
												productTitle={suggestion.productTitle}
												alignment="alignStart"
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</DrawerHeader>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default SearchMenu;
