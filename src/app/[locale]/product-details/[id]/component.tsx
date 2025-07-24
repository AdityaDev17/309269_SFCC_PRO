"use client";
import { productDetails } from "@/common/constant";
import {
	ADD_ITEM_TO_PRODUCTLIST,
	CREATE_CUSTOMER_PRODUCT_LIST,
	GET_CUSTOMER_PRODUCTLIST,
	GET_PRODUCT_DETAILS,
} from "@/common/schema";
import type {
	Colors,
	ImageGroup,
	ProductImage,
	ProductList,
	Promotions,
	Size,
	Values,
	Variants,
	VariationAttributes,
} from "@/common/type";
import { Button } from "@/components/atomic/Button/Button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/atomic/Select/Select";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import Accordion from "@/components/molecules/Accordion/Accordion";
import sonnerToast, { Toaster } from "@/components/molecules/Toast/Toast";
import VarientSelector from "@/components/molecules/VarientSelector/VarientSelector";
import Gallery from "@/components/organisms/Gallery/Gallery";
import { addToBasket } from "@/components/organisms/MiniCart/CartFuntions";
import MiniCart from "@/components/organisms/MiniCart/MiniCart";
import analytics from "@/lib/analytics";
import { useRouter, usePathname  } from "next/navigation";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function ProductDetails() {
	const { id } = useParams() as { id: string };
	const t = useTranslations("ProductDetails");
	const productId = id;
	const [open, setOpen] = useState(false);
	const [targetColor, setTargetColor] = useState("");
	const [targetSize, setTargetSize] = useState("");
	const [sizes, setSizes] = useState<Size[]>([]);
	const [error, setError] = useState("");
	const [promotions, setPromotions] = useState([]);
	const [viewMore, setViewMore] = useState(true);
	const [hasSizeVariations, setHasSizeVariations] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const createCustomerProductList = useMutation({
		mutationFn: (input: { customerId: string; type: string }) =>
			graphqlRequest(CREATE_CUSTOMER_PRODUCT_LIST, { input }),
		retry: 3,
	});
	const addItemToProductList = useMutation({
		mutationFn: (input: ProductList) =>
			graphqlRequest(ADD_ITEM_TO_PRODUCTLIST, { input }),
		retry: 3,
	});

	const { data, isLoading } = useQuery({
		queryKey: ["Product", productId],
		queryFn: () =>
			graphqlRequest(GET_PRODUCT_DETAILS, { productId: productId }),
		enabled: !!productId,
	});

	const galleryImages = data?.productDetails?.c_sanityImages ?? [];
	useEffect(() => {
		if (viewMore) {
			setPromotions(data?.productDetails?.productPromotions?.slice(0, 1));
		} else {
			setPromotions(data?.productDetails?.productPromotions);
		}
	}, [data, viewMore]);

	useEffect(() => {
		const sizeAttr = data?.productDetails?.variationAttributes?.find(
			(item: VariationAttributes) => item?.id === "size",
		);

		const hasValidSizeVariations = sizeAttr?.values?.some(
			(item: Values) => item?.value && item?.value !== null,
		);

		setHasSizeVariations(hasValidSizeVariations || false);

		if (hasValidSizeVariations) {
			const sizes = sizeAttr?.values?.map((item: Values) => {
				const hasMatchingVariant = data?.productDetails?.variants?.some(
					(variant: Variants) =>
						(variant?.variationValues?.color === targetColor || !targetColor) &&
						variant?.variationValues?.size === item?.value,
				);
				return {
					value: item?.value,
					title: item?.name,
					disabled: !hasMatchingVariant,
				};
			});
			setSizes(sizes || []);
		} else {
			setSizes([]);
		}
	}, [data, targetColor]);

	const colors = data?.productDetails?.variationAttributes
		?.filter((item: VariationAttributes) => item?.id === "color")[0]
		?.values?.map((item: Values) => ({
			name: item?.name,
			hex: item?.value,
		}));

	const hasInitialized = useRef(false);

	useEffect(() => {
		if (!hasInitialized.current && colors?.length) {
			colors && setTargetColor(colors[0].hex);
			hasInitialized.current = true;
		}
	}, [colors]);

	// const accordionData = productDetails?.pageMetaTags?.map((item) => ({
	// 	title: item?.id.toUpperCase(),
	// 	desc: item?.value,
	// }));

	const handleSelected = (selected: Colors) => {
		setTargetColor(selected?.hex);
	};

	const addItemToProductLists = async (listId: string, customerId: string) => {
		await addItemToProductList.mutateAsync({
			customerId,
			listId,
			items: {
				productId: productId,
				public: false,
				quantity: 1,
				priority: 1,
				type: "product",
			},
		});
	};

	const handleAddToWishlist = async () => {
		const customerType = sessionStorage.getItem("customer_type") ?? "";
		if (customerType === "guest") {
			router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
			return;
		}

		const customerId = sessionStorage.getItem("customer_id") ?? "";
		const response = await graphqlRequest(GET_CUSTOMER_PRODUCTLIST, {
			customerId,
		});

		const wishlist = response?.customerProductListsInfo?.data?.[0];
		let listId: string;
		let isItemInWishlist: string | undefined;
		if (wishlist) {
			isItemInWishlist = wishlist.customerProductListItems?.find(
				(i: { productId: string }) => i.productId === productId,
			);
			listId = wishlist.id;
		} else {
			const {
				createCustomerProductList: { id },
			} = await createCustomerProductList.mutateAsync({
				customerId,
				type: "wish_list",
			});
			listId = id;
		}

		if (!isItemInWishlist) {
			sonnerToast.success("Added to wishlist", {});
			addItemToProductLists(listId, customerId);
		} else {
			sonnerToast.success("Already in wishlist", {});
		}
	};

	const addToBasketMutation = useMutation({
		mutationFn: ({ productId }: { productId: string }) =>
			addToBasket(productId),
		onSuccess: () => setOpen(true),
		retry: 3,
	});

	const handleAddToBasket = async () => {
		analytics.track("Promo Clicked", {
			category: "Promotion",
			label: "Summer Sale Banner",
			debug_mode: true, // Add this line
		});

		if (hasSizeVariations && !targetSize) {
			setError("Choose any size");
			return;
		}

		setError("");

		let selectedProductId = productId;

		if (data?.productDetails?.variants?.length > 0) {
			const matchedVariant = data?.productDetails?.variants?.find(
				(variant: Variants) => {
					const colorMatch =
						!targetColor || variant?.variationValues?.color === targetColor;
					const sizeMatch =
						!hasSizeVariations ||
						!targetSize ||
						variant?.variationValues?.size === targetSize ||
						variant?.variationValues?.size === null;
					return colorMatch && sizeMatch;
				},
			);

			if (matchedVariant) {
				selectedProductId = matchedVariant.productId;
			}
		}

		const response = await addToBasketMutation.mutateAsync({
			productId: selectedProductId,
		});

		return response;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | string,
		name?: string,
	) => {
		const targetName = typeof e === "string" ? name : e.target.name;
		const value = typeof e === "string" ? e : e.target.value;

		if (!targetName) return;
		setTargetSize(value);
	};

	const handleClickViewMore = () => {
		setViewMore(!viewMore);
	};

	return (
		<section className={styles.componentLayout}>
			<div className={styles.firstLayout}>
				<div className={styles.gallery}>
					{isLoading ? (
						<div className={styles.gallerySkeletonWrapper}>
							<div className={styles.thumbnailSkeletons}>
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton
										key={`skeleton-${Date.now()}-${Math.random()}`}
										className={styles.thumbnailSkeleton}
									/>
								))}
							</div>
							<Skeleton className={styles.mainImageSkeleton} />
						</div>
					) : (
						data?.productDetails?.c_sanityImages != null &&
						galleryImages?.length !== 0 && <Gallery images={galleryImages} />
					)}
				</div>
				{/* <div className={styles.accordion}>
          {isLoading ? (
            <div className={styles.accordionSkeletonWrapper}>
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton
                  key={`skeleton-${Date.now()}-${Math.random()}`}
                  className={styles.accordionSkeleton}
                />
              ))}
            </div>
          ) : (
            <Accordion
              items={accordionData}
              contentStyle={styles.accordionContent}
            />
          )}
        </div> */}
				<div className={styles.productDetails}>
					{isLoading ? (
						<div className={styles.productSkeletonWrapper}>
							<Skeleton className={styles.titleSkeleton} />
							<Skeleton className={styles.priceSkeleton} />

							<div>
								<Skeleton className={styles.descLineSkeleton} />
								<Skeleton className={styles.descLineSkeletonShort} />
							</div>

							<Skeleton className={styles.sizeLabelSkeleton} />

							<div className={styles.sizeGridSkeleton}>
								<Skeleton className={styles.sizeSkeleton} />
								<Skeleton className={styles.sizeSkeleton} />
							</div>

							<Skeleton className={styles.cartButtonSkeleton} />
						</div>
					) : (
						<>
							<div className={styles.title}>{data?.productDetails?.name}</div>
							<div className={styles.price}>
								{data?.productDetails?.currency}&nbsp;
								{data?.productDetails?.price}
							</div>
							<div className={styles.desc}>
								{data?.productDetails?.longDescription}
							</div>
							<ul className={styles.promotions}>
								{promotions?.map((item: Promotions) => {
									return (
										<li className={styles.promotionli} key={item?.promotionId}>
											{item?.calloutMsg}
										</li>
									);
								})}
								<div
									onClick={handleClickViewMore}
									onKeyDown={handleClickViewMore}
									className={styles.more}
								>
									{viewMore ? "View More" : "View Less"}
								</div>
							</ul>
							<div className={styles.varientSection}>
								{colors !== undefined && (
									<VarientSelector
										colors={colors}
										onSelected={handleSelected}
									/>
								)}
							</div>
							<div>
								<div className={styles.error}>
									{error ? "Please choose any size" : "\u00A0"}
								</div>
							</div>
							<div
								className={`${styles.buttonContainer} ${
									hasSizeVariations ? styles.twoChildren : styles.oneChild
								}`}
							>
								<Button onClick={() => handleAddToWishlist()}>
									{t("add-to-wishlist")}
								</Button>
								{hasSizeVariations && (
									<Select onValueChange={(e) => handleChange(e, "title")}>
										<SelectTrigger
											data-testid="select-trigger"
											style={{
												backgroundColor: "#fff",
												border: "solid",
												borderWidth: "1px",
												borderColor: error ? "red" : "#CCCBCE",
												color: "#000",
												fontSize: "12px",
												fontWeight: "600",
												lineHeight: "16px",
											}}
										>
											<SelectValue placeholder={"Size"} />
										</SelectTrigger>
										<SelectContent>
											{sizes?.map((item: Size) => (
												<SelectItem
													value={item?.value}
													key={item?.title}
													disabled={item?.disabled}
												>
													{item?.disabled ? <s>{item?.title}</s> : item?.title}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							</div>
							<Button
								variant="secondary"
								className={styles.cartButton}
								onClick={() => handleAddToBasket()}
							>
								{t("add-to-bag")}
							</Button>
						</>
					)}
				</div>
			</div>

			{open && <MiniCart open={open} onOpenChange={setOpen} />}
			<Toaster />
		</section>
	);
}
