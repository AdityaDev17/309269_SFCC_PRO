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
export default async function ProductDetailsPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = [
    {
      productImage: "/images/product.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency:'$'
    },
    {
      productImage: "/images/product1.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency:'$'
    },
    {
      productImage: "/images/product.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency:'$'
    },
    {
      productImage: "/images/product3.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency:'$'
    },
    {
      productImage: "/images/product1.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency:'$'
    },
    {
      productImage: "/images/product2.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency:'$'
    },
    {
      productImage: "/images/product1.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency:'$'
    },{
      productImage: "/images/product2.svg",
      productTitle: "Product 1",
      bagPrice: "200",
      currency:'$'
    },
  ];
  console.log('33443344',id)
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
      <ProductDetails/>
      <div className={styles.headerFont}>YOU MAY ALSO LIKE</div> 
      <ProductImageCarousel
        productData={products}
        cardsPerRow={4}
        width={295}
        withPagination={true}
        alignment="alignStart"
      />
       {/* <Banner 
        title="Spring Collection" 
        buttonText="View More" 
        backgroundImage="/test-image.jpg" 
        alignment="center-bottom" 
      /> */}
    </section>
  );
}
