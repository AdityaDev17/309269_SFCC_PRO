import {
	DELETE_BASKET_ITEM,
	GET_BASKET,
	UPDATE_BASKET_ITEM,
} from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../../components/atomic/Button/Button";
import Input from "../../components/atomic/Input/Input";
import Typography from "../../components/atomic/Typography/Typography";
import CartItemList from "../../components/molecules/CartItemList/CartItemList";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import styles from "./cart.module.css";
import { getBasketDetail, handleDeleteItem, handleUpdateQuantity } from "@/components/organisms/MiniCart/CartFuntions";

type ImageProduct = {
	alt: string;
	link: string;
	title: string;
	disBaseLink: string;
};

export type ImageGroup = {
	images: ImageProduct[];
};

type ProductImage = {
	data: {
		imageGroups: ImageGroup[];
	}[];
};

export type BasketItem = {
	productId: string;
	productName: string;
	quantity: number;
	price: number;
	itemId: string;
	productImage: ProductImage;
};
type CartProps = {
	basketId: string;
};

const Cart = ({ basketId }: CartProps) => {
	// const { data, refetch } = useQuery({
	// 	queryKey: ["GetBasket", basketId],
	// 	queryFn: () => graphqlRequest(GET_BASKET, { basketId: basketId }),
	// 	enabled: !!basketId,
	// });

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["Basket", basketId],
		queryFn: () => getBasketDetail(),
		enabled: !!basketId,
	});
	const CartItems = data?.cartItems ?? [];
	
	  const removeBasketMutations = useMutation({
		mutationFn: (input: { itemId: string }) => handleDeleteItem(input.itemId),
		onSuccess:()=> {console.log("hii"); refetch()},
		retry: 3,
	  });
	
	  const onDeleteItem = async (itemId: string) => {
		console.log("id", itemId);
		try {
		  const response = await removeBasketMutations.mutateAsync({ itemId });
		  console.log("Remove response:", response);
		} catch (error) {
		  console.error("Error removing basket item:", error);
		}
	  };
	
	  const updateBasketMutations = useMutation({
		mutationFn: (input: {
		  itemId: string;
		  quantity: number;
		}) => handleUpdateQuantity(input.itemId, input.quantity),
		onSuccess:()=> refetch(),
		retry: 3,
	  });
	
	  const onUpdateQuantity = async(itemId: string, newQuantity: number) => {
		console.log("id", itemId, newQuantity);
		try {
		  const response = await updateBasketMutations.mutateAsync({
			itemId,
			quantity: newQuantity,
		  });
		  console.log("Update response:", response);
		} catch (error) {
		  console.error("Error updating basket item:", error);
		}
	  };


	/*const CartItems = data?.basketInfo?.productItems?.map((item: BasketItem) => {
		const imageGroups = item?.productImage?.data?.[0]?.imageGroups;
		let productImage = imageGroups?.find((group: ImageGroup) =>
		group.images?.[0]?.link?.includes("/large/"),
		)?.images?.[0]?.link;
		if (!productImage && imageGroups?.length > 0) {
			for (const group of imageGroups) {
				if (group.images?.[0]?.link) {
					productImage = group.images[0].link;
					break;
				}
			}
		}
		
		return {
			id: item?.productId,
			name: item?.productName,
			quantity: item?.quantity,
			price: item?.price,
			currency: data?.basketInfo?.currency,
			productImage: productImage || null,
			itemId: item?.itemId,
		};
	});*/

	// const updateBasketMutation = useMutation({
	// 	mutationFn: (input: {
	// 		basketId: string;
	// 		itemId: string;
	// 		quantity: number;
	// 	}) => graphqlRequest(UPDATE_BASKET_ITEM, { input }),
	// 	retry: 3,
	// });
	// const removeBasketMutation = useMutation({
	// 	mutationFn: (input: { basketId: string; itemId: string }) =>
	// 		graphqlRequest(DELETE_BASKET_ITEM, { input }),
	// 	retry: 3,
	// });

	// const handleUpdateQuantit = async (itemId: string, newQuantity: number) => {
	// 	console.log("id", itemId, newQuantity);
	// 	try {
	// 		const response = await updateBasketMutation.mutateAsync({
	// 			basketId,
	// 			itemId,
	// 			quantity: newQuantity,
	// 		});
	// 		await refetch();
	// 		console.log("Update response:", response);
	// 	} catch (error) {
	// 		console.error("Error updating basket item:", error);
	// 	}
	// };
	// const handleDeleteIte = async (itemId: string) => {
	// 	console.log("id", itemId);
	// 	try {
	// 		const response = await removeBasketMutation.mutateAsync({
	// 			basketId,
	// 			itemId,
	// 		});
	// 		await refetch();
	// 		console.log("Remove response:", response);
	// 	} catch (error) {
	// 		console.error("Error removing basket item:", error);
	// 	}
	// };

	return (
    <section className={styles.componentLayout}>
      <div className={styles.firstLayout}>
        <div className={styles.items}>
          <Typography
            type={"Label"}
            variant={3}
            fontWeight="semibold"
            label={`Items in the Bag (${CartItems?.length} items)`}
          />
        </div>
        <div className={styles.cartItemList}>
          <CartItemList
            cartItems={CartItems}
            isWhiteBackground={true}
            // onUpdateQuantity={handleUpdateQuantity}
            onUpdateQuantity={onUpdateQuantity}
            // onDeleteItem={handleDeleteItem}
            onDeleteItem={onDeleteItem}
          />
        </div>
        <div className={styles.orderSummarySection}>
          <OrderSummary
            totalRowTop={true}
            isButton={false}
            totalAmt={data?.subTotal}
            // currency={data?.basketInfo?.currency}
            subTotal={data?.subTotal}
            buttonText="CONTINUE"
          />
        </div>
        <div className={styles.redeemWrapper}>
          <Typography
            type={"Label"}
            variant={3}
            fontWeight="semibold"
            label="Redeem Points"
          />
          <div className={styles.redeemGrid}>
            <div className={styles.redeemPoints}>
              <Typography
                type={"Body"}
                variant={2}
                fontWeight="semibold"
                label="80 ACCUMULATED POINTS"
              />
              <Typography
                type={"Body"}
                variant={2}
                label="Would you like to redeem your sustainability points? (1 POINT = €1)"
                color="#4F4B53"
              />
              <div>
                <Typography
                  type={"Body"}
                  variant={2}
                  label="Enter points here"
                  color="#4F4B53"
                />
                <div className={styles.inputGrid}>
                  <Input className={styles.input} />
                  <Button variant="secondary">APPLY</Button>
                </div>
              </div>
            </div>
            <div className={styles.redeemImage}>
              <Image
                src={"/images/redeem.png"}
                alt={"redeem"}
                width={113}
                height={125}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Cart;
