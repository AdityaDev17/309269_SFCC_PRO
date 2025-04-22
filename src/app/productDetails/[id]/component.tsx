"use client";
import styles from "./page.module.css";
import Gallery from "../../../components/organisms/Gallery/Gallery";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecules/Accordion/Accordion";
import { Button } from "@/components/atomic/button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/atomic/select/select";

export default function ProductDetails() {
  const params = useParams();
  const productId = params?.id; // Will be "8999"

  console.log("Product ID:", productId);

  return (
    <section className={styles.componentLayout}>
      <div className={styles.firstLayout}>
        <div className={styles.gallery}>
          <Gallery
            images={[
              "/images/product1.svg",
              "/images/product2.svg",
              "/images/product.svg",
              "/images/product3.svg",
            ]}
          />
        </div>
        <div className={styles.accordion}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                DONATE TO ENVIRONMENTAL CAUSES
              </AccordionTrigger>
              <AccordionContent>
                <div style={{ textAlign: "justify" }}>
                  Introducing Elenor's Monochrome Gloss Lipstick Collection,
                  where vibrant colour meets irresistible shine for a truly
                  glamorous pout. Made with high-quality ingredients and infused
                  with nourishing oils, our gloss lipstick formula delivers
                  long-lasting hydration and a luscious, glossy finish that
                  lasts all day.
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>SHOP SUSTAINABLY</AccordionTrigger>
              <AccordionContent>
                Introducing Elenor's Monochrome Gloss Lipstick Collection, where
                vibrant colour meets irresistible shine for a truly glamorous
                pout. Made with high-quality ingredients and infused with
                nourishing oils, our gloss lipstick formula delivers
                long-lasting hydration and a luscious, glossy finish that lasts
                all day.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className={styles.productDetails}>
          <div className={styles.title}>
            ELENOR MONOCHROME GLOSS LIPSTICK - P56
          </div>
          <div className={styles.price}>€60</div>
          <div className={styles.desc}>
            Indulge in luxury with our Elenor’s Monochrome Gloss lipstick.
            Crafted from rare botanicals for a rich, glossy finish. Treat your
            lips to elegance.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              paddingBottom: "20px",
            }}
          >
            <Button style={{ color: "#000" }}>ADD TO WISHLIST</Button>
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
          <Button
            className={styles.button}
            style={{ backgroundColor: "#000", color: "#fff" }}
          >
            ADD TO BAG
          </Button>
        </div>
      </div>
    </section>
  );
}
