"use client";
import { GET_PRODUCT_LIST } from "@/common/schema";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/atomic/Select/Select";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";
import FilterDialog from "@/components/molecules/FilterDialog/FilterDialog";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/molecules/Pagination/Pagination";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { getProductsByCategory } from "@/lib/sfcc/products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { isLargeCard } from "../layoutPattern";
import styles from "./layout.module.css";
import { useState } from "react";
import { ProductDetails } from "@/common/type";

export default function PLPPage() {
	const [displayedPage, setDisplayedPage] = useState(1);
	const [activePage, setActivePage] = useState(1);
	const { slug } = useParams() as { slug: string };
	const router = useRouter();
	const itemsPerPage = 25;

	const fetchProductList = async () => {
		try {
			const variables = {
				getProductListId: slug,
				limit: itemsPerPage,
				offset: (activePage-1)*itemsPerPage

			};

			const response = graphqlRequest(GET_PRODUCT_LIST, variables);
			return response;
		} catch (er) {
			console.log("234", er);
		}
	};
	const { data, error, isLoading } = useQuery({
		queryKey: ["ProductList", slug, activePage],
		queryFn: fetchProductList,
		enabled: !!slug,
	});
	const totalProducts = data?.getProductList.total || 0;
	const totalPages = Math.ceil(totalProducts / itemsPerPage);

	const products: ProductDetails[] = data?.getProductList?.hits || [];
	// const categoryName = slug
	//  .split("-")
	//  .map((word) => word[0].toUpperCase() + word.slice(1))
	//  .join(" ");
	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Categories", href: "/category" },
		{ label: "Jewellery" },
	];

	const previousPage = function() {
		if(displayedPage === 1) return;
		if(activePage !== displayedPage+1) {
			setDisplayedPage(prevPage => prevPage - 1);
		}
		setActivePage(prevPage => prevPage-1);
	}

	const nextPage = function() {
		if(displayedPage === totalPages-1) return;
		if(activePage !== displayedPage) {
			setDisplayedPage(prevPage => prevPage+1);
		}
		setActivePage(prevPage => prevPage+1);
	}

	const activePageHandler = function(page: number) {
		setActivePage(page);
	}

	return (
		<div className={styles.container}>
			<Breadcrumbs breadcrumbItems={breadcrumbItems} />
			{/* Heading for the PLP Page */}
			<h1 className={styles.pageHeading}>{"Jewellery"} Products</h1>

			<div className={styles.topBar}>
				<FilterDialog />
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
									{/* Product image skeleton with proper height */}
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
									price="100"
									currency="$"
									onClick={() =>
										router.push(`/product-details/${product.productId}`)
									}
								/>
							</div>
						))}
			</div>

			<div className={styles.pagination}>
				<Pagination>
					<PaginationContent>
						<PaginationPrevious onClick={previousPage}/>
						<PaginationItem>
							<PaginationLink isActive={activePage === displayedPage} onClick={() => activePageHandler(displayedPage)}>
								{displayedPage}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink isActive={activePage === displayedPage+1} onClick={() => activePageHandler(displayedPage+1)}>
								{displayedPage+1}
							</PaginationLink>
						</PaginationItem>
						<PaginationNext onClick={nextPage} />
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
