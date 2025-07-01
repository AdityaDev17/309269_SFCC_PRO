"use client";
import { Button } from "@/components/atomic/Button/Button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/atomic/Select/Select";
import Typography from "@/components/atomic/Typography/Typography";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/molecules/Pagination/Pagination";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./orderHistory.module.css";

import { ORDER_HISTORY } from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";

// import { allOrderData } from "@/common/constant";
import {
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/molecules/Drawer/Drawer";

const Filter = ({ isMobile }: { isMobile: boolean }) => {
	const filters = ["3 Months", "6 Months", "2025", "2024", "2023"];

	return (
		<>
			{isMobile ? (
				<Drawer.Root shouldScaleBackground>
					<DrawerTrigger asChild>
						<div className={styles.mobileFilter}>FILTERS</div>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader className={styles.filterHeader}>
							<DrawerTitle className={styles.title}>FILTERS</DrawerTitle>
							<DrawerClose className={styles.close} asChild>
								<Image
									src="./images/expand.svg"
									alt="Close"
									width={48}
									height={48}
								/>
							</DrawerClose>
						</DrawerHeader>

						<div className={styles.filterList}>
							{filters.map((filter) => (
								<div key={filter} className={styles.filterItem}>
									<span>{filter}</span>
									<ChevronRight size={20} />
								</div>
							))}
						</div>
					</DrawerContent>
				</Drawer.Root>
			) : (
				<div className={styles.filter}>
					<Select>
						<SelectTrigger variant="sort">
							<SelectValue placeholder="Orders in last 3 Months" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Duration</SelectLabel>
								<SelectItem value="3">3 Months</SelectItem>
								<SelectItem value="6">6 Months</SelectItem>
								<SelectItem value="2025">2025</SelectItem>
								<SelectItem value="2024">2024</SelectItem>
								<SelectItem value="2023">2023</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			)}
		</>
	);
};

const ImageGrid = ({
	productData,
}: {
	productData: {
		productId: string;
		productImage: string;
		productTitle: string;
		bagPrice?: string;
		currency?: string;
	}[];
}) => {
	const visibleImages = productData.slice(0, 4);
	const remainingCount = productData.length - 3;
	return (
		<div className={styles.imageGrid}>
			{productData.length === 1 ? (
				<Image
					src={productData[0].productImage}
					alt="product"
					fill
					loading="eager"
				/>
			) : (
				// eslint-disable-next-line react/no-array-index-key
				visibleImages.map((src, index) => {
					// eslint-disable-next-line react/no-array-index-key
					const isOverlay = index === 3 && productData.length > 4;

					return (
						<div key={src.productId} className={styles.imageWrapper}>
							<Image
								src={src.productImage}
								alt="product"
								fill
								style={{ objectFit: "cover" }}
								loading="eager"
							/>
							{isOverlay && (
								<div className={styles.blurOverlay}>
									<div className={styles.circle}>{`+${remainingCount}`}</div>
								</div>
							)}
						</div>
					);
				})
			)}
		</div>
	);
};

const OrderCard = ({
	orderData,
}: {
	orderData: {
		orderId: string;
		price: number;
		orderName: string;
		items: {
			productId: string;
			productImage: string;
			productTitle: string;
			bagPrice?: string;
			currency?: string;
		}[];
	};
}) => {
	const { orderId, price, orderName, items } = orderData;
	const router = useRouter();
	return (
		<div className={styles.orderCard}>
			<ImageGrid productData={items} />
			<div className={styles.orderDetails}>
				<div className={styles.orderDetailsTop}>
					<div className={styles.orderStatus}>
						<Typography
							type="Body"
							variant={3}
							fontWeight="semibold"
							label="Arriving Tomorrow"
						/>
					</div>
					<div className={styles.orderName}>
						<Typography
							type="Label"
							variant={3}
							fontWeight="semibold"
							label={orderName}
						/>
					</div>
					<div className={styles.orderId}>
						<Typography
							type="Body"
							variant={2}
							fontWeight="regular"
							label={`ORDER ID : ${orderId}`}
						/>
					</div>
				</div>
				<div className={styles.orderDetailsBottom}>
					<div className={styles.orderTotal}>
						<Typography
							type="Body"
							variant={3}
							fontWeight="semibold"
							label={`Order Total: $${price}`}
						/>
					</div>
					<Button
						onClick={() => {
							router.push(`/order-details/${orderId}`);
						}}
					>
						<Typography
							type="Body"
							variant={3}
							fontWeight="semibold"
							label="VIEW DETAILS"
						/>
					</Button>
				</div>
			</div>
		</div>
	);
};
const OrderCardContainer = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobileView = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobileView();
		window.addEventListener("resize", checkMobileView);
		setCustomerId(sessionStorage.customer_id);
		return () => window.removeEventListener("resize", checkMobileView);
	}, []);

	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const [customerId, setCustomerId] = useState();
	const { data, isLoading } = useQuery({
		queryKey: ["Orders", currentPage, customerId],
		queryFn: () =>
			graphqlRequest(ORDER_HISTORY, {
				customerId,
				limit: itemsPerPage,
				offset: (currentPage - 1) * itemsPerPage,
			}),
		enabled: !!customerId,
	});

	const totalPages = Math.ceil(data?.getOrderHistory?.total / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentItems = (
		isLoading ? [] : (data?.getOrderHistory?.data ?? [])
	).map((order) => ({
		orderId: order.orderNo,
		price: order.orderTotal,
		orderName: `Order #${order.orderNo}`, // Customize as needed
		items: order.productItems.map((item) => {
			console.log(item.productImage.data[0]?.imageGroups?.[0]?.images[0]?.link);
			return {
				productId: item.productId,
				productTitle: item.productName,
				productImage:
					item.productImage.data[0]?.imageGroups?.[0]?.images[0]?.link,
				currency: order.currency,
			};
		}),
	}));

	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const visiblePages = [];
	if (currentPage === totalPages && totalPages > 1) {
		visiblePages.push(currentPage - 1, currentPage);
	} else {
		visiblePages.push(currentPage, currentPage + 1);
	}
	const goToPage = (page: number) => {
		setCurrentPage(page);
	};
	return (
		<>
			{!isMobile && <Filter isMobile={false} />}
			<div className={styles.orderCardContainer}>
				{currentItems.map((order) => (
					<OrderCard key={order.orderNo} orderData={order} />
				))}
			</div>

			<div className={styles.pageNavigator}>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" onClick={handlePrev} />
						</PaginationItem>

						{visiblePages.map((pgNo) => (
							<PaginationItem key={pgNo}>
								<PaginationLink
									href="#"
									isActive={pgNo === currentPage}
									onClick={(e) => {
										e.preventDefault();
										goToPage(pgNo);
									}}
								>
									{pgNo}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext href="#" onClick={handleNext} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
				{isMobile && <Filter isMobile />}
			</div>
		</>
	);
};

export { OrderCardContainer, Filter };
