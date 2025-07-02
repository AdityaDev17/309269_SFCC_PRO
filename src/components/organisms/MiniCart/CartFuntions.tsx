import {
  ADD_ITEM_TO_BASKET,
  CREATE_CART,
  DELETE_BASKET_ITEM,
  GET_BASKET,
  GET_CUSTOMER_BASKET,
  UPDATE_BASKET_ITEM,
} from "@/common/schema";
import {
  CartItem,
  CartItemResponse,
  Values,
  VariationAttributes,
} from "@/common/type";
import { graphqlRequest } from "@/lib/graphqlRequest";

let cartItems: CartItem[];
let subTotal = "";

const getSize = (values: Values[], size: string) => {
  return values?.find((item) => item.value === size)?.name;
};
const prepareCartItems = (response: CartItemResponse[], currency: string) => {
  cartItems = response?.map((item) => ({
    id: item?.productId,
    name: item?.productName,
    description: "",
    quantity: item?.quantity,
    price: item?.price,
    currency: currency,
    itemId: item?.itemId,
    color: item?.productData?.data?.[0]?.variants?.find(
      (variation) => variation?.productId === item?.productId
    )?.variationValues?.color,
    size: getSize(
      (
        item?.productData?.data?.[0]
          ?.variationAttributes as VariationAttributes[]
      )?.find((attr) => attr.id === "size")?.values ?? [],
      item?.productData?.data?.[0]?.variants?.find(
        (variation) => variation?.productId === item?.productId
      )?.variationValues?.size ?? ""
    ),
    productImage:
      item?.productData?.data?.[0]?.imageGroups?.[0]?.images?.[0]?.link ?? "",
  }));
};

export const getBasketDetail = async () => {
  let basketId = sessionStorage.getItem("basketId");
  if (!basketId) {
    const response = await graphqlRequest(GET_CUSTOMER_BASKET, {
      customerId: sessionStorage?.getItem("customer_id"),
    });
    console.log("Active Basket", response);
    basketId = response?.customerBasketInfo?.baskets?.[0]?.basketId;
    if (basketId) sessionStorage.setItem("basketId", basketId);
  }
  const response = await graphqlRequest(GET_BASKET, { basketId });
  prepareCartItems(
    response?.basketInfo?.productItems,
    response?.basketInfo?.currency
  );
  subTotal = response?.basketInfo?.productSubTotal;
  return { cartItems, subTotal };
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
  } catch (error) {
    console.error("Error removing basket item:", error);
    return error;
  }
};

export const handleUpdateQuantity = async (
  itemId: string,
  newQuantity: number
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
  let basketId = sessionStorage.getItem("basketId");
  if (!basketId) {
    const response = await graphqlRequest(GET_CUSTOMER_BASKET, {
      customerId: sessionStorage?.getItem("customer_id"),
    });
    console.log("Active Basket", response);
    basketId = response?.customerBasketInfo?.baskets?.[0]?.basketId;

    if (!basketId) {
      const response = await graphqlRequest(CREATE_CART, {
        input: {
          items: [{ productId, quantity: 1 }],
        },
      });
      prepareCartItems(
        response?.createCart?.productItems,
        response?.createCart?.currency
      );
      basketId = response?.createCart?.basketId;
      sessionStorage.setItem("basketId", basketId ?? "");
      subTotal = response?.createCart?.productSubTotal;
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
    response?.addToCart?.currency
  );
  subTotal = response?.basketInfo?.productSubTotal;
  return { cartItems, subTotal };
};
