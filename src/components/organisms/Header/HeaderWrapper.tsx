"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";

const HeaderWrapper = () => {
	const pathname = usePathname();
	const isHome = pathname === "/";

	//   const categories = [
	//   'MAKEUP',
	//   'SKINCARE',
	//   'FRAGRANCE',
	//   'SUSTAINABILITY',
	//   'SUBSCRIPTION',
	//   'GLAM GUIDE',
	//   'MORE',
	// ];

	const categories = [
		{
			name: "MAKEUP",
			image: [
				{
					productImageUrl: "/images/menuImage1.svg",
					productName: "Lipstick",
				},
			],
			subcategory: [
				{
					subCategoryName: "LIPS",
					subcategory: ["Lipstick", "Liquid Lipstick", "Lip Liner", "Lip Balm"],
				},
				{
					subCategoryName: "EYE",
					subcategory: ["Eyeliner", "Eyebrow", "Eye Shadow", "Mascara"],
				},
				{
					subCategoryName: "COMPLEXION",
					subcategory: ["Blush", "Foundation", "Highlighter"],
				},
			],
		},
		{
			name: "SKINCARE",
			image: [
				{
					productImageUrl: "/images/menuImage1.svg",
					productName: "Lipstick",
				},
			],
			subcategory: [
				{
					subCategoryName: "CLEANSER",
					subcategory: ["Face Wash", "Peels & Scrubs", "Toner"],
				},
				{
					subCategoryName: "MOISTURIZERS",
					subcategory: [
						"Face Moisturizer",
						"Face Oil",
						"Lotion",
						"Night Cream",
					],
				},
				{
					subCategoryName: "SERUMS",
					subcategory: ["Face Serum"],
				},
				{
					subCategoryName: "UV PROTECTION",
					subcategory: ["Sunscreen"],
				},
			],
		},
		{
			name: "FRAGRANCE",
			image: [
				{
					productImageUrl: "/images/menuImage1.svg",
					productName: "Lipstick",
				},
				{
					productImageUrl: "/images/menuImage1.svg",
					productName: "Lipstick",
				},
			],
			subcategory: [
				{
					subCategoryName: "COLLECTIONS",
					subcategory: ["For Men", "For Women"],
				},
			],
		},
		{
			name: "SUSTAINABILITY",
		},
		{
			name: "SUBSCRIPTION",
		},
		{
			name: "GLAM GUIDE",
		},
		{
			name: "MORE",
			image: [
				{
					productImageUrl: "/images/menuImage1.svg",
					productName: "Lipstick",
				},
				{
					productImageUrl: "/images/menuImage1.svg",
					productName: "Lipstick",
				},
				{
					productImageUrl: "/images/menuImage1.svg",
					productName: "Lipstick",
				},
			],
			subcategory: [
				{
					subCategoryName: "HANDBAGS",
					subcategory: ["Top Handles", "Totes", "Mini Bags"],
				},
				{
					subCategoryName: "JEWELLERY",
					subcategory: ["Necklaces", "Rings", "Earrings", "Bracelets"],
				},
				{
					subCategoryName: "GIFT",
					subcategory: ["Festive Hampers", "Pink Teddy", "Earrings"],
				},
			],
		},
	];

	const headerIcons = [
		{ label: "Search", icon: "/images/search-normal.png" },
		{ label: "Whishlist", icon: "/images/wishlist-normal.png" },
		{ label: "CartBag", icon: "/images/bag-normal.png" },
		{ label: "Profile", icon: "/images/profile-outline.png" },
	];

	const headerWhiteIcons = [
		{ label: "Search", icon: "/images/searchWhite.png" },
		{ label: "Whishlist", icon: "/images/wishlistWhite.png" },
		{ label: "CartBag", icon: "/images/catBagWhite.png" },
		{ label: "Profile", icon: "/images/profileWhite.png" },
	];

	return (
		<Header
			isHome={isHome}
			logoImages={{
				default: "/images/SFCCPRO.png",
				white: "/images/SFCCPROWhite.png",
			}}
			categories={categories}
			headerIcons={headerIcons}
			headerWhiteIcons={headerWhiteIcons}
		/>
	);
};

export default HeaderWrapper;
