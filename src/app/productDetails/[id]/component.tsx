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
import { productDetails } from "@/common/constant";
import VarientSelector from "@/components/molecules/VarientSelector/VarientSelector";

export default function ProductDetails() {
  const params = useParams();
  const productId = params?.id;

  console.log("Product ID:", productId);

  const galleryImages = productDetails?.imageGroups
    .flatMap((group) => group.images)
    .map((image) => image.link);

  const accordionData = productDetails?.pageMetaTags?.map((item) => ({
    title: item?.id.toUpperCase(),
    desc: item?.value,
  }));

  const colorData = [
    { hex: "#8B0000", name: "Dark Red" },
    { hex: "#FF0000", name: "Red" },
    { hex: "#FF4040", name: "Coral Red" },
    { hex: "#CD5C5C", name: "Indian Red" },
  ];

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
                SIZE : 10 GM
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1" data-testid="select-item-1">
                  Option 1
                </SelectItem>
                <SelectItem value="option2" data-testid="select-item-2">
                  Option 2
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className={styles.button} variant="secondary">
            ADD TO BAG
          </Button>
        </div>
      </div>
    </section>
  );
}
