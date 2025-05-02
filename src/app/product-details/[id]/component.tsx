"use client";
import styles from "./page.module.css";
import Gallery from "@/components/organisms/Gallery/Gallery";
import { useParams } from "next/navigation";
import Accordion from "@/components/molecules/Accordion/Accordion";
import { Button } from "@/components/atomic/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/atomic/Select/Select";
import { productDetails, colorData, sizes, cartItems } from "@/common/constant";
import VarientSelector from "@/components/molecules/VarientSelector/VarientSelector";
import MiniCart from "../../../components/organisms/MiniCart/MiniCart";
import { useRouter } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();
  const productId = params?.id; 
  const router = useRouter();

  console.log("Product ID:", productId);

  const galleryImages = productDetails?.imageGroups
    .flatMap((group) => group.images)
    .map((image) => image.link);

  const accordionData = productDetails?.pageMetaTags?.map((item) => ({
    title: item?.id.toUpperCase(),
    desc: item?.value,
  }));

  const handleSelected = (selected: any) => {
    console.log("Selectedvarient", selected);
  };

  return (
    <section className={styles.componentLayout}>
      <div className={styles.firstLayout}>
        <div className={styles.gallery}>
          <Gallery images={galleryImages} />
        </div>
        <div className={styles.accordion}>
          <Accordion
            items={accordionData}
            contentStyle={styles.accordionContent}
          />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.title}>{productDetails?.name}</div>
          <div className={styles.price}>
            {productDetails?.currency}&nbsp;{productDetails?.price}
          </div>
          <div className={styles.desc}>{productDetails?.longDescription}</div>
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
                {sizes?.map((item: any) => {
                  return (
                    <SelectItem value={item?.value} key={item?.title}>{item?.title}</SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <MiniCart
                cartItems={cartItems}
                triggerType="button"
                onViewBag={()=>router.push('/cart')}
              />
        </div>
      </div>
    </section>
  );
}
