"use client";
import { cartItems, colorData, productDetails, sizes } from "@/common/constant";
import { Button } from "@/components/atomic/Button/Button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/atomic/Select/Select";
import Accordion from "@/components/molecules/Accordion/Accordion";
import VarientSelector from "@/components/molecules/VarientSelector/VarientSelector";
import Gallery from "@/components/organisms/Gallery/Gallery";
import { useParams } from "next/navigation";
import MiniCart from "../../../components/organisms/MiniCart/MiniCart";
import styles from "./page.module.css";

export default function ProductDetails() {
	const params = useParams();
	const productId = params?.id;

	console.log("Product ID:", productId);

	const galleryImages = productDetails?.imageGroups
		.flatMap((group) => group.images)
		.map((image) => image.link);

	const accordionData = productDetails?.pageMetaTags?.map((item) => ({
		title: item?.id.toUpperCase(),
		desc: item?.value,
	}));

	type Colors = {
		name: string;
		hex: string;
	};

	const handleSelected = (selected: Colors) => {
		console.log("Selectedvarient", selected);
	};

	return (
		<section className={styles.componentLayout}>
			<div className={styles.firstLayout}>
				<div className={styles.gallery}>
					<Gallery images={galleryImages} />
				</div>
				<div className={styles.accordion}>
					<Accordion
						items={accordionData}
						contentStyle={styles.accordionContent}
					/>
				</div>
				<div className={styles.productDetails}>
					<div className={styles.title}>{productDetails?.name}</div>
					<div className={styles.price}>
						{productDetails?.currency}&nbsp;{productDetails?.price}
					</div>
					<div className={styles.desc}>{productDetails?.longDescription}</div>
					<div className={styles.varientSection}>
						<VarientSelector colors={colorData} onSelected={handleSelected} />
					</div>
					<div className={styles.buttonContainer}>
						<Button>ADD TO WISHLIST</Button>
						<Select>
							<SelectTrigger
								data-testid="select-trigger"
								style={{
									backgroundColor: "#fff",
									border: "solid",
									borderWidth: "1px",
									borderColor: "#CCCBCE",
									color: "#000",
									fontSize: "12px",
									fontWeight: "600",
									lineHeight: "16px",
								}}
							>
								SIZE
							</SelectTrigger>
							<SelectContent>
								{sizes?.map((item) => {
									return (
										<SelectItem value={item?.value} key={item?.title}>
											{item?.title}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
					</div>
					<MiniCart cartItems={cartItems} triggerType="button" />
				</div>
			</div>
		</section>
	);
}
