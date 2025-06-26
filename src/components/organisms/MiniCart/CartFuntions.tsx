import {
	ADD_ITEM_TO_BASKET,
	CREATE_CART,
	DELETE_BASKET_ITEM,
	GET_BASKET,
	UPDATE_BASKET_ITEM,
} from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";

interface CartItemResponse {
	itemId: string;
	productName: string;
	quantity: number;
	price: number;
	productImage?: {
		data?: {
			imageGroups?: {
				images?: {
					link?: string;
				}[];
			}[];
		}[];
	};
}
interface CartItems {
	id: string;
	name: string;
	description: string;
	quantity: number;
	price: number;
	currency: string;
	productImage: string;
	itemId: string;
}
let cartItems: CartItems[];
let subTotal = "";
let currency =""
const prepareCartItems = (response: CartItemResponse[], currency: string) => {
	cartItems = response?.map((item) => ({
		id: item?.itemId,
		name: item?.productName,
		description: "",
		quantity: item?.quantity,
		price: item?.price,
		currency: currency,
		itemId: item?.itemId,
		productImage:
			item?.productImage?.data?.[0]?.imageGroups?.[0]?.images?.[0]?.link ?? "",
	}));
};

export const getBasketDetail = async () => {
	const basketId = sessionStorage.getItem("basketId") ?? "";
	const response = await graphqlRequest(GET_BASKET, { basketId });
	prepareCartItems(
		response?.basketInfo?.productItems,
		response?.basketInfo?.currency,
	);
	subTotal = response?.basketInfo?.productSubTotal;
	return { cartItems, subTotal};
};

export const handleDeleteItem = async (itemId: string) => {
	console.log("id", itemId);
	const basketId = sessionStorage.getItem("basketId") ?? "";
	const input = {
		basketId,
		itemId,
	};
	try {
		const response = await graphqlRequest(DELETE_BASKET_ITEM, { input });
		console.log("Remove response:", response);
		// return await getBasketDetail();
		// return "abc";
	} catch (error) {
		console.error("Error removing basket item:", error);
		return error;
	}
};

export const handleUpdateQuantity = async (
	itemId: string,
	newQuantity: number,
) => {
	console.log("id", itemId, newQuantity);
	const basketId = sessionStorage.getItem("basketId") ?? "";
	try {
		const response = await graphqlRequest(UPDATE_BASKET_ITEM, {
			input: {
				basketId,
				itemId,
				quantity: newQuantity,
			},
		});
		console.log("Update response:", response);
	} catch (error) {
		console.error("Error updating basket item:", error);
	}
};

export const addToBasket = async (productId: string) => {
	const basketId = sessionStorage.getItem("basketId");
	if (basketId) {
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
	} else {
		const response = await graphqlRequest(CREATE_CART, {
			input: {
				items: [{ productId, quantity: 1 }],
			},
		});
		prepareCartItems(
			response?.createCart?.productItems,
			response?.createCart?.currency,
		);
		sessionStorage.setItem("basketId", response?.createCart?.basketId ?? "");
		subTotal = response?.createCart?.productSubTotal;
	}
	return { cartItems, subTotal };
};
