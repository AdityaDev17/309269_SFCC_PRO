"use client";

import { GET_CATEGORIES } from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";
interface Subcategory {
	id: string;
	name: string;
	description?: string;
	onlineSubCategoriesCount?: number;
	parentCategoryId?: string;
	c_enableCompare?: boolean;
	c_showInMenu?: boolean;
}

interface Category {
	id: string;
	name: string;
	description?: string;
	onlineSubCategoriesCount?: number;
	parentCategoryId?: string;
	parentCategoryTree?: { id: string; name: string }[];
	c_enableCompare?: boolean;
	c_showInMenu?: boolean;
	subcategories?: {
		data?: {
			categories?: Subcategory[];
		}[];
	};
}

const HeaderWrapper = () => {
	const pathname = usePathname();
	const isHome = pathname === "/";

	const { data } = useQuery({
		queryKey: ["Categories"],
		queryFn: () => graphqlRequest(GET_CATEGORIES, { id: "root" }),
		enabled: true,
	});

	const categoriesData = data?.categories?.categories || [];

	const categories = categoriesData.map((category: Category) => {
		const subcategoryList =
			category.subcategories?.data?.[0]?.categories?.filter(Boolean) || [];

		return {
			name: category.name,
			id:category.id,
			image: [
				{
					productImageUrl: "/images/default-subcategory.jpg",
					productName: category.name,
				},
			],
			subcategory: subcategoryList.length
				? [
						{
							subCategoryName: category.name,
							subcategory: subcategoryList.map((sub) => ({
							name: sub.name,
							id: sub.id,
						})),
						},
					]
				: undefined,
		};
	});
	const headerIcons = [
		{ label: "Search", icon: "/images/search-normal.png" },
		{
			label: "Whishlist",
			icon: "/images/wishlist-normal.png",
			link: "/wishlist",
		},
		{ label: "CartBag", icon: "/images/bag-normal.png" },
		{ label: "Profile", icon: "/images/profile-outline.png" },
	];

	const headerWhiteIcons = [
		{ label: "Search", icon: "/images/searchWhite.png" },
		{
			label: "Whishlist",
			icon: "/images/wishlistWhite.png",
			link: "/wishlist",
		},
		{ label: "CartBag", icon: "/images/catBagWhite.png" },
		{ label: "Profile", icon: "/images/profileWhite.png" },
	];

	return (
		<Header
			isHome={isHome}
			logoImages={{
				default: "/images/SFCCLogo.svg",
				white: "/images/SFCCLogowhite.svg",
			}}
			categories={categories}
			headerIcons={headerIcons}
			headerWhiteIcons={headerWhiteIcons}
		/>
	);
};

export default HeaderWrapper;
