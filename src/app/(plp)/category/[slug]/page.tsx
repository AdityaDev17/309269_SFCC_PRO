import styles from "./layout.module.css";
import ProductCard from "../../../../components/molecules/ProductCard/ProductCard";
import FilterDialog from "../../../../components/molecules/FilterDialog/FilterDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/atomic/Select/Select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../../components/molecules/Pagination/Pagination";
import { getProductsByCategory } from "@/lib/sfcc/products";
import Breadcrumbs from "../../../../components/atomic/Breadcrumbs/Breadcrumbs";
import { isLargeCard } from "../layoutPattern";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PLPPage({ params }: PageProps) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  // Format slug to readable category name (optional)
  const categoryName = slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/category" },
    { label: categoryName },
  ];
  return (
    <div className={styles.container}>
      <Breadcrumbs breadcrumbItems={breadcrumbItems} />
      {/* Heading for the PLP Page */}
      <h1 className={styles.pageHeading}>{categoryName} Products</h1>

      <div className={styles.topBar}>
        <FilterDialog />
        <Select defaultValue="recent">
          <SelectTrigger variant="sort" className={styles.sortSelectTrigger}>
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently added</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price_low_high">Price: Low to High</SelectItem>
            <SelectItem value="price_high_low">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {products.map((product, index) => {
            return (
              <div
                key={product.id}
                className={
                  isLargeCard(index) ? styles.largeCard : styles.mediumCard
                }
              >
                <ProductCard
                  key={product.id}
                  productImage={product.image}
                  productTitle={product.name}
                  alignment="alignStart"
                  width={"100%"}
                  price="100"
                  currency="$"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination fixedBottom>
          <PaginationContent>
            <PaginationPrevious href="/page/1" />
            <PaginationItem>
              <PaginationLink href="/page/1" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/page/2">2</PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink href="/page/10">10</PaginationLink>
            </PaginationItem>
            <PaginationNext href="/page/2" />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
