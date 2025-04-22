import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/atomic/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import styles from "./page.module.css";
import ProductDetails from "./component";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";
import Banner from "@/components/molecules/Banner/Banner";
import Typography from "@/components/atomic/Typography/Typography";
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = [
    {
      productImage: "/images/product.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency: "$",
    },
    {
      productImage: "/images/product1.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency: "$",
    },
    {
      productImage: "/images/product.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency: "$",
    },
    {
      productImage: "/images/product3.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency: "$",
    },
    {
      productImage: "/images/product1.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency: "$",
    },
    {
      productImage: "/images/product2.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency: "$",
    },
    {
      productImage: "/images/product1.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency: "$",
    },
    {
      productImage: "/images/product2.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency: "$",
    },
  ];
  console.log("getProductId", id);
  return (
    <section className={styles.layout}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Image src="/slash.svg" alt="slash" width={6} height={18} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Image src="/slash.svg" alt="slash" width={6} height={18} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductDetails />
      <section className={styles.productCarouselSection}>
        <Typography
          type="Body"
          variant={1}
          fontWeight="bold"
          color="black"
          label={"YOU MAY ALSO LIKE"}
        />
        <section>
          <ProductImageCarousel
            productData={products}
            cardsPerRow={4}
            width={295}
            withPagination={true}
            alignment="alignStart"
          />
        </section>
      </section>
      <section className={styles.bannerLayout}>
        <Banner
          title="VELVET NUIT SET"
          buttonText="View More"
          description="Sumptuous lipsticks in rich, velvety shades, designed for elegance."
          backgroundImage="/images/productBanner.svg"
          alignment="left-top"
        />
      </section>
    </section>
  );
}
