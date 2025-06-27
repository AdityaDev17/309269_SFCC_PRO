"use client";
import { productDetails } from "@/common/constant";
import {
  ADD_ITEM_TO_PRODUCTLIST,
  CREATE_CUSTOMER_PRODUCT_LIST,
  GET_CUSTOMER_PRODUCTLIST,
  GET_PRODUCT_DETAILS,
} from "@/common/schema";
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
import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MiniCart from "../../../components/organisms/MiniCart/MiniCart";
import styles from "./page.module.css";

type Size = {
  value: string;
  title: string;
  disabled: boolean;
};

type ProductImage = {
  link: string;
};

type ImageGroup = {
  images: ProductImage[];
};

type Colors = {
  name: string;
  hex: string;
};

type VariationAttributes = {
  id: string;
  name: string;
  values: Values[];
};

type Values = {
  name: string;
  orderable: boolean;
  value: string;
};

type Varinats = {
  orderable: string;
  price: string;
  productId: string;
  variationValues: {
    color: string;
    size: string;
  };
};

type ProductList = {
  customerId: string;
  listId: string;
  items: {
    productId: string;
    quantity: number;
    public: boolean;
    priority: number;
    type: string;
  };
};

type Variant={
	variationValues:{
		color:string;
		size:string;
	}
}

export default function ProductDetails() {
  const { id } = useParams() as { id: string };
  const productId = id;
  const [open, setOpen] = useState(false);
  const [targetColor, setTargetColor] = useState("");
  const [targetSize, setTargetSize] = useState("");
  const [sizes,setSizes]=useState<Size[]>([])

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

  const galleryImages = data?.productDetails?.imageGroups
    ?.flatMap((group: ImageGroup) => group?.images ?? [])
    .map((image: ProductImage) => image?.link);

  

	useEffect(()=>{
	const sizes = data?.productDetails?.variationAttributes
    ?.find((item: VariationAttributes) => item?.id === "size")
    ?.values?.map((item: Values) => {
      const hasMatchingVariant = data?.productDetails?.variants?.some(
        (variant: Varinats) =>
          variant.variationValues?.color === targetColor &&
          variant.variationValues?.size === item?.value
      );

      return {
        value: item?.value,
        title: item?.name,
        disabled: !hasMatchingVariant,
      };
    });
	setSizes(sizes)
	},[data,targetColor])


  const colors = data?.productDetails?.variationAttributes
    ?.filter((item: VariationAttributes) => item?.id === "color")[0]
    ?.values?.map((item: Values) => ({
      name: item?.name,
      hex: item?.value,
    }));

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      colors && setTargetColor(colors[0].hex);
      hasInitialized.current = true;
    }
  }, [colors]);

  const accordionData = productDetails?.pageMetaTags?.map((item) => ({
    title: item?.id.toUpperCase(),
    desc: item?.value,
  }));

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
    const customerId = sessionStorage.getItem("customer_id") ?? "";
    const response = await graphqlRequest(GET_CUSTOMER_PRODUCTLIST, {
      customerId,
    });

    const wishlist = response?.customerProductListsInfo?.data?.[0];
    let listId: string;
    let isItemInWishlist: string | undefined;
    if (wishlist) {
      isItemInWishlist = wishlist.customerProductListItems?.find(
        (i: { productId: string }) => i.productId === productId
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
    const masterId = data?.productDetails?.variants?.find(
      (variant: Varinats) =>
        variant?.variationValues?.color === targetColor &&
        variant?.variationValues?.size === targetSize
    )?.productId;
    const response = await addToBasketMutation.mutateAsync({
      productId: masterId ? masterId : productId,
    });
    return response;
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    name?: string
  ) => {
    const targetName = typeof e === "string" ? name : e.target.name;
    const value = typeof e === "string" ? e : e.target.value;

    if (!targetName) return;
    setTargetSize(value);
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
            data?.productDetails?.imageGroups != null &&
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
              <div className={styles.varientSection}>
                {colors !== undefined && (
                  <VarientSelector
                    colors={colors}
                    onSelected={handleSelected}
                  />
                )}
              </div>
              <div
                className={`${styles.buttonContainer} ${
                  sizes ? styles.twoChildren : styles.oneChild
                }`}
              >
                <Button onClick={() => handleAddToWishlist()}>
                  ADD TO WISHLIST
                </Button>
                {sizes !== undefined && (
                  <Select onValueChange={(e) => handleChange(e, "title")}>
                    <SelectTrigger
                      data-testid="select-trigger"
                      style={{
                        backgroundColor: "#fff",
                        border: "solid",
                        borderWidth: "1px",
                        borderColor: "#CCCBCE",
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
                          {item?.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <Button
                variant="secondary"
                className={styles.cartButton}
				disabled={targetSize===""}
                onClick={() => handleAddToBasket()}
              >
                Add To Bag
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
