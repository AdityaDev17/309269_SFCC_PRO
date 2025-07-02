"use client";
import { GET_PRODUCT_LIST } from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "../../../../../components/atomic/Breadcrumbs/Breadcrumbs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../../../components/atomic/Select/Select";
import { Skeleton } from "../../../../../components/atomic/Skeleton/Skeleton";
import FilterDialog from "../../../../../components/molecules/FilterDialog/FilterDialog";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../../../../../components/molecules/Pagination/Pagination";
import ProductCard from "../../../../../components/molecules/ProductCard/ProductCard";
import { getProductsByCategory } from "../../../../../lib/sfcc/products";
import { isLargeCard } from "../layoutPattern";
import styles from "./layout.module.css";
import { ProductDetails } from "@/common/type";

export default function PLPPage() {
	const { slug } = useParams() as { slug: string };
	const router = useRouter();

	const getCategoryName = (slug: string) => {
		return slug
			.split("-")
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(" ");
	};

	const [selectedFilters, setSelectedFilters] = useState<{
		price?: string;
		colors?: string;
	}>({});

	const categoryName = getCategoryName(slug);

	const fetchProductList = async () => {
		try {
			const variables = {
				getProductListId: slug,
				price: selectedFilters.price || "",
				colors: selectedFilters.colors || "",
			};

			const response = graphqlRequest(GET_PRODUCT_LIST, variables);
			return response;
		} catch (er) {
			console.log("234", er);
		}
	};
	const { data, error, isLoading } = useQuery({
		queryKey: ["ProductList", slug, selectedFilters],
		queryFn: fetchProductList,
		enabled: !!slug,
	});

	console.log("getProductList", data);
	
	const products: ProductDetails[] = data?.getProductList?.hits || [];
	const refinements = data?.getProductList?.refinements || [];

	const priceFilters =
		refinements.find((r: { attributeId: string }) => r.attributeId === "price")
			?.values || [];

	const colorFilters =
		refinements.find(
			(r: { attributeId: string }) => r.attributeId === "c_color",
		)?.values || [];

	const productCount = products.length;
	// const categoryName = slug
	//  .split("-")
	//  .map((word) => word[0].toUpperCase() + word.slice(1))
	//  .join(" ");
	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: categoryName, href: `/category/${slug}` },
	];
	return (
		<div className={styles.container}>
			<Breadcrumbs breadcrumbItems={breadcrumbItems} />
			{/* Heading for the PLP Page */}
			<h1 className={styles.pageHeading}>
				{categoryName}{" "}
				<small className={styles.productCount}>
					({productCount} {productCount === 1 ? "Product" : "Products"})
				</small>
			</h1>

			<div className={styles.selectBar}>
				<FilterDialog
					priceFilters={priceFilters}
					colorFilters={colorFilters}
					onApplyFilters={(filters) => {
						const rawPrice = filters.Price?.[0];
						const price = rawPrice ?? "";
						const colors = filters.Color?.join("|");
						setSelectedFilters({ price, colors });
					}}
				/>
				<Select defaultValue="recent">
					<SelectTrigger variant="sort" className={styles.sortSelectTrigger}>
						<SelectValue placeholder="Select sort option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="recent">Recently added</SelectItem>
						<SelectItem value="popular">Most Popular</SelectItem>
						<SelectItem value="price_low_high">Price: Low to High</SelectItem>
						<SelectItem value="price_high_low">Price: High to Low</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className={styles.grid}>
				{isLoading
					? Array.from({ length: 26 }).map((_, index) => {
							const isLarge = isLargeCard(index);
							return (
								<div
									key={`skeleton-${Date.now()}-${Math.random()}`}
									className={isLarge ? styles.largeCard : styles.mediumCard}
								>
									
									<Skeleton
										className={
											isLarge
												? styles.skeletonLargeCard
												: styles.skeletonMediumCard
										}
									/>
									<Skeleton className={styles.skeletonTitle} />
									<Skeleton className={styles.skeletonPrice} />
								</div>
							);
						})
					: products.map((product, index) => (
							<div
								key={product.productId}
								className={
									isLargeCard(index) ? styles.largeCard : styles.mediumCard
								}
							>
								<ProductCard
									productId={product.productId}
									productImage={product?.image?.link ?? ""}
									productTitle={product?.productName}
									alignment="alignStart"
									width={"100%"}
									price={product.price}
									currency="$"
									onClick={() => {
										router.push(
											`/product-details/${product.productId}?slug=${encodeURIComponent(slug)}&name=${encodeURIComponent(product.productName)}`,
										);
									}}
								/>
							</div>
						))}
			</div>

			<div className={styles.pagination}>
				<Pagination fixedBottom>
					<PaginationContent>
						<PaginationPrevious href="/page/1" />
						<PaginationItem>
							<PaginationLink href="/page/1" isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/2">2</PaginationLink>
						</PaginationItem>
						<PaginationEllipsis />
						<PaginationItem>
							<PaginationLink href="/page/10">10</PaginationLink>
						</PaginationItem>
						<PaginationNext href="/page/2" />
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
