// import { trackCartAbandonment } from "@/GA4/trackCartAbandonment";
import {
	ADD_ITEM_TO_BASKET,
	CREATE_CART,
	DELETE_BASKET_ITEM,
	GET_BASKET,
	GET_CUSTOMER_BASKET,
	UPDATE_BASKET_ITEM,
} from "@/common/schema";
import type {
	CartItem,
	CartItemResponse,
	Values,
	VariationAttributes,
} from "@/common/type";
import analytics from "@/lib/analytics";
import { graphqlRequest } from "@/lib/graphqlRequest";
// components/CartAbandonmentTracker.tsx
import { useEffect } from "react";

interface Props {
	cartItems: CartItem[];
	hasStartedCheckout: boolean;
}

// export const CartAbandonmentTracker = ({
// 	cartItems,
// 	hasStartedCheckout,
// }: Props) => {
// 	useEffect(() => {
// 		const handler = () => {
// 			// if (!hasStartedCheckout) {
// 			sessionStorage.setItem("hello", "trackcart");
// 			const entries = performance.getEntriesByType("navigation");
// 			const navEntry = entries[0] as PerformanceNavigationTiming | undefined;

// 			const navigationType = navEntry?.type;

// 			if (navigationType === "navigate") {
// 				// User is navigating (not closing)
// 				return;
// 			}
// 			trackCartAbandonment(cartItems);
// 			// }
// 		};
// 		window.addEventListener("beforeunload", handler);
// 		return () => window.removeEventListener("beforeunload", handler);
// 	}, [cartItems]);

// 	return <div>tracker</div>;
// };

let cartItems: CartItem[];
let subTotal = "";
let productTotal = "";

const getSize = (values: Values[], size: string) => {
	return values?.find((item) => item.value === size)?.name;
};
const prepareCartItems = (response: CartItemResponse[], currency: string) => {
	console.log("🚀 ~ prepareCartItems ~ response:", response)
	cartItems = response?.map((item) => ({
		id: item?.productId,
		name: item?.productName,
		description: "",
		quantity: item?.quantity,
		price: item?.price,
		priceAfterItemDiscount: item?.priceAfterItemDiscount,
		priceAfterOrderDiscount: item?.priceAfterOrderDiscount,
		showStrikedPrice: item?.price !== item?.priceAfterItemDiscount,
		currency: currency,
		itemId: item?.itemId,
		color: item?.productData?.data?.[0]?.variants?.find(
			(variation) => variation?.productId === item?.productId,
		)?.variationValues?.color,
		size: getSize(
			(
				item?.productData?.data?.[0]
					?.variationAttributes as VariationAttributes[]
			)?.find((attr) => attr.id === "size")?.values ?? [],
			item?.productData?.data?.[0]?.variants?.find(
				(variation) => variation?.productId === item?.productId,
			)?.variationValues?.size ?? "",
		),
		productImage:
			item?.productData?.data?.[0]?.c_sanityImages?.[0] ?? "",
	}));
};

export const getBasketDetail = async () => {
	let basketId = sessionStorage.getItem("basketId");
	if (!basketId) {
		const response = await graphqlRequest(GET_CUSTOMER_BASKET, {
			customerId: sessionStorage?.getItem("customer_id"),
		});
		basketId = response?.customerBasketInfo?.baskets?.[0]?.basketId;
		if (basketId) sessionStorage.setItem("basketId", basketId);
	}
	const response = await graphqlRequest(GET_BASKET, { basketId });
	console.log("🚀 ~ getBasketDetail ~ response:", response);
	prepareCartItems(
		response?.basketInfo?.productItems,
		response?.basketInfo?.currency,
	);
	subTotal = response?.basketInfo?.productSubTotal;
	productTotal = response?.basketInfo?.productTotal;
	// const orderDiscount = response?.basketInfo?.orderPriceAdjustments?.[0];
	const orderDiscount = {
		price: Number.parseFloat(productTotal) - Number.parseFloat(subTotal),
	};
	const basketInfo = response?.basketInfo;
	const couponItems = basketInfo?.couponItems ?? [];
	const orderPriceAdjustments = basketInfo?.orderPriceAdjustments ?? [];
	return {
		cartItems,
		subTotal,
		productTotal,
		orderDiscount,
		couponItems,
		orderPriceAdjustments,
	};
};

export const handleDeleteItem = async (itemId: string) => {
	const basketId = sessionStorage.getItem("basketId") ?? "";
	const input = {
		basketId,
		itemId,
	};
	try {
		const response = await graphqlRequest(DELETE_BASKET_ITEM, { input });
	} catch (error) {
		console.error("Error removing basket item:", error);
		return error;
	}
};

export const handleUpdateQuantity = async (
	itemId: string,
	newQuantity: number,
) => {
	const basketId = sessionStorage.getItem("basketId") ?? "";
	try {
		const response = await graphqlRequest(UPDATE_BASKET_ITEM, {
			input: {
				basketId,
				itemId,
				quantity: newQuantity,
			},
		});
	} catch (error) {
		console.error("Error updating basket item:", error);
	}
};

export const addToBasket = async (productId: string) => {
	let basketId = sessionStorage.getItem("basketId");
	if (!basketId) {
		const response = await graphqlRequest(GET_CUSTOMER_BASKET, {
			customerId: sessionStorage?.getItem("customer_id"),
		});
		basketId = response?.customerBasketInfo?.baskets?.[0]?.basketId;

		if (!basketId) {
			const response = await graphqlRequest(CREATE_CART, {
				input: {
					items: [{ productId, quantity: 1 }],
				},
			});
			prepareCartItems(
				response?.createCart?.productItems,
				response?.createCart?.currency,
			);
			basketId = response?.createCart?.basketId;
			sessionStorage.setItem("basketId", basketId ?? "");
			subTotal = response?.createCart?.productSubTotal;
			analytics.track("add_to_cart", {
				productId: productId,
				cartItems: cartItems,
				userId: sessionStorage.getItem("customer_id") ?? " ",
				basketId: sessionStorage.getItem("basketId") ?? " ",
				debug_mode: true,
			});
			return { cartItems, subTotal };
		}
		sessionStorage.setItem("basketId", basketId ?? "");
	}
	const response = await graphqlRequest(ADD_ITEM_TO_BASKET, {
		input: {
			basketId,
			items: [{ productId, quantity: 1 }],
		},
	});
	prepareCartItems(
		response?.addToCart?.productItems,
		response?.addToCart?.currency,
	);
	subTotal = response?.basketInfo?.productSubTotal;
	analytics.track("add_to_cart", {
		productId: productId,
		cartItems: cartItems,
		userId: sessionStorage.getItem("customer_id") ?? " ",
		basketId: sessionStorage.getItem("basketId") ?? " ",
		debug_mode: true,
	});
	return { cartItems, subTotal };
};
