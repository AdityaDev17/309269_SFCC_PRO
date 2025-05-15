"use client";
import { cartItems, colorData, productDetails, sizes } from "@/common/constant";
import { Button } from "@/components/atomic/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/atomic/Select/Select";
import Accordion from "@/components/molecules/Accordion/Accordion";
import VarientSelector from "@/components/molecules/VarientSelector/VarientSelector";
import Gallery from "@/components/organisms/Gallery/Gallery";
import { useParams } from "next/navigation";
import MiniCart from "../../../components/organisms/MiniCart/MiniCart";
import styles from "./page.module.css";
import { gql, useQuery } from "@apollo/client";

export default function ProductDetails() {
  const params = useParams();
  const productId = params?.id;

  const productData = gql`
    query ProductDetails($productDetailsId: String!) {
      productDetails(id: $productDetailsId) {
        name
        currency
        imageGroups {
          images {
            alt
            link
          }
        }
        longDescription
        price
      }
    }
  `;
  const token =
    "eyJ2ZXIiOiIxLjAiLCJqa3UiOiJzbGFzL3Byb2QvenpybF8wMDMiLCJraWQiOiJhOWY5NjIwOC0yNzU2LTQ3NzctODM2YS0zYWNiOWE4MTUxOTAiLCJ0eXAiOiJqd3QiLCJjbHYiOiJKMi4zLjQiLCJhbGciOiJFUzI1NiJ9.eyJhdXQiOiJHVUlEIiwic2NwIjoic2ZjYy5zaG9wcGVyLW15YWNjb3VudC5iYXNrZXRzIGNfbG95YWx0eUluZm9fciBzZmNjLnNob3BwZXItZGlzY292ZXJ5LXNlYXJjaCBzZmNjLnNob3BwZXItbXlhY2NvdW50LmFkZHJlc3NlcyBzZmNjLnNob3BwZXItcHJvZHVjdHMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5ydyBzZmNjLnNob3BwZXItbXlhY2NvdW50LnBheW1lbnRpbnN0cnVtZW50cyBzZmNjLnNob3BwZXItY3VzdG9tZXJzLmxvZ2luIHNmY2Muc2hvcHBlci1zdG9yZXMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5vcmRlcnMgc2ZjYy5zaG9wcGVyLWJhc2tldHMtb3JkZXJzIHNmY2Muc2hvcHBlci1jdXN0b21lcnMucmVnaXN0ZXIgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5hZGRyZXNzZXMucncgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5wcm9kdWN0bGlzdHMucncgc2ZjYy5zaG9wcGVyLXByb2R1Y3RsaXN0cyBzZmNjLnNob3BwZXItcHJvbW90aW9ucyBzZmNjLnNob3BwZXItYmFza2V0cy1vcmRlcnMucncgY19jYW5jZWxvcmRlciBzZmNjLnNob3BwZXItZ2lmdC1jZXJ0aWZpY2F0ZXMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5wYXltZW50aW5zdHJ1bWVudHMucncgc2ZjYy5zaG9wcGVyLXByb2R1Y3Qtc2VhcmNoIHNmY2Muc2hvcHBlci1teWFjY291bnQucHJvZHVjdGxpc3RzIHNmY2Muc2hvcHBlci1jYXRlZ29yaWVzIHNmY2Muc2hvcHBlci1teWFjY291bnQiLCJzdWIiOiJjYy1zbGFzOjp6enJsXzAwMzo6c2NpZDo2ODIyNDc0Mi00ZTZkLTQ1ZTMtYWNmNy0yYjc1ZDVkMmJkYjA6OnVzaWQ6MDBiZDAyN2UtNDgxZC00YWRiLWJjZmQtMDZjYjQxZWEzNWNhIiwiY3R4Ijoic2xhcyIsImlzcyI6InNsYXMvcHJvZC96enJsXzAwMyIsImlzdCI6MSwiZG50IjoiMCIsImF1ZCI6ImNvbW1lcmNlY2xvdWQvcHJvZC96enJsXzAwMyIsIm5iZiI6MTc0NzMwODE5Miwic3R5IjoiVXNlciIsImlzYiI6InVpZG86c2xhczo6dXBuOkd1ZXN0Ojp1aWRuOkd1ZXN0IFVzZXI6OmdjaWQ6ZWZrZGJHeGRhV2wwc1JsZEVWeGNZWXd1cEc6OmNoaWQ6YWNjUHJvIiwiZXhwIjoxNzQ3MzEwMDIyLCJpYXQiOjE3NDczMDgyMjIsImp0aSI6IkMyQzQ5MTE2MTMxNDAtMTg4NTEzNzc3NTI1OTgyOTk5MTQyNzYwNDgxIn0.b2ZEsdLzreXzTXYyWtJ3LZe7HBstEieqx_FXnHiZddz1pkM5y8KFcBlpF3Fz_InGz_DD2HLiD2OG1fOZU1YuSQ";
  const { data } = useQuery(productData, {
    variables: { productDetailsId: productId },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const galleryImages = data?.productDetails?.imageGroups
    .flatMap((group: any) => group?.images)
    .map((image: any) => image?.link);


  const accordionData = productDetails?.pageMetaTags?.map((item) => ({
    title: item?.id.toUpperCase(),
    desc: item?.value,
  }));

  type Colors = {
    name: string;
    hex: string;
  };

  const handleSelected = (selected: Colors) => {
    console.log("Selectedvarient", selected);
  };

  return (
    <section className={styles.componentLayout}>
      <div className={styles.firstLayout}>
        <div className={styles.gallery}>
          {data && galleryImages?.length != 0 && (
            <Gallery images={galleryImages} />
          )}
        </div>
        <div className={styles.accordion}>
          <Accordion
            items={accordionData}
            contentStyle={styles.accordionContent}
          />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.title}>{data?.productDetails?.name}</div>
          <div className={styles.price}>
            {data?.productDetails?.currency}&nbsp;{data?.productDetails?.price}
          </div>
          <div className={styles.desc}>
            {data?.productDetails?.longDescription}
          </div>
          <div className={styles.varientSection}>
            <VarientSelector colors={colorData} onSelected={handleSelected} />
          </div>
          <div className={styles.buttonContainer}>
            <Button>ADD TO WISHLIST</Button>
            <Select>
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
                SIZE
              </SelectTrigger>
              <SelectContent>
                {sizes?.map((item) => {
                  return (
                    <SelectItem value={item?.value} key={item?.title}>
                      {item?.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <MiniCart cartItems={cartItems} triggerType="button" />
        </div>
      </div>
    </section>
  );
}
