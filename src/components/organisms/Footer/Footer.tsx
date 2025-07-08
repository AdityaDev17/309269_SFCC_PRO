import Image from "next/image";
import styles from "./Footer.module.css";

import { footerData } from "@/common/constant";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/atomic/Select/Select";
import { Icon } from "../../atomic/Icons/Icons";
import { useTranslations } from "next-intl";
const Footer = () => {
	const t = useTranslations('Footer');
	return (
		<div className={styles.footer}>
			<div className={styles.logoSection}>
				<Image
					className={styles.logo}
					src="/images/SFCCPROWhite.png"
					alt="Next.js logo"
					width={109}
					height={19}
					priority
				/>
			</div>
			<div className={styles.containerSection}>
				<div className={styles.container}>
					{footerData?.map((item) => {
						return (
							<div key={item?.title}>
								<div className={styles.title}>{item?.title}</div>
								<div className={styles.row}>
									{item?.children?.map((subItem) => {
										return (
											<div className={styles.subTitle} key={subItem?.title}>
												<a href={subItem?.link}>{subItem?.title}</a>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
				<div>
					<div style={{ paddingBottom: "15px" }}>{t("change-location")}</div>
					<Select>
						<SelectTrigger
							style={{
								backgroundColor: "#1D1823",
								width: "325px",
								border: "solid",
								borderWidth: "1px",
								borderColor: "#B3B2B5",
								color: "#75757A",
							}}
						>
							<SelectValue placeholder="US" />
						</SelectTrigger>
						<SelectContent
							style={{
								width: "325px",
								borderColor: "#B3B2B5",
								color: "#75757A",
							}}
						>
							<SelectGroup>
								<SelectItem value="US" data-testid="select-item-1">
									{t("country.US")}
								</SelectItem>
								<SelectItem value="UK" data-testid="select-item-2">
									{t("country.UK")}
								</SelectItem>
								<SelectItem value="Canada" data-testid="select-item-2">
									{t("country.Canada")}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className={styles.buttonSection}>
				<div className={styles.buttonContainer}>
					<div>&copy;2024 {t("copyright")}</div>
					<div className={styles.gap}>
						<Icon name="Instagram" />
						<Icon name="Facebook" />
						<Icon name="Radix" />
						<Icon name="Youtube" />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Footer;

/**
 * ## Footer
 *
 * The `Footer` component displays a structured footer layout for a website, featuring navigation
 * links, social media icons, and a country selection dropdown.
 *
 * ### Component Sections
 *
 * - **Logo Section**: Displays the Elenor logo using the Next.js `Image` component.
 * - **Link Groups**: Dynamically renders grouped footer links such as Elenor, Services, and About Us.
 * - **Location Selector**: Provides a dropdown to change the country/location using a custom `Select` component.
 * - **Copyright &
 * Social Icons**: Displays a copyright
 * message and social media icons.
 *
 * ### Behavior
 *
 * - The footer structure is driven by a `footerData` array, where each object contains a `title` and `children`
 *   (with `title` and `link`).
 * - Each footer section renders a group title followed by its corresponding links.
 * - The country selector uses a styled `Select` component from the atomic UI library and updates the selected location.
 * - The footer includes social media icons rendered by the shared `Icon` component.
 *
 * ### Used Components
 *
 * - `Image` from `next/image` for optimized image rendering.
 * - `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectItem` for country selection.
 * - `Icon` for rendering social media icons.
 *
 * ### Styling
 *
 * Custom styles are imported from `Footer.module.css` and applied via `styles.<className>`.
 *
 * ### Example
 *
 * ```tsx
 *
 *
 * export default function Page() {
 *   return (
 *     <div>
 *       <Footer />
 *     </div>
 *   );
 * }
 * ```
 */
