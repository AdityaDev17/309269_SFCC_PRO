import React from "react";
import { render } from "@testing-library/react";
import ProductImageCarousel from "../src/components/organisms/ProductImageCarousel/ProductImageCarousel";

const products = [
    {
      productId:'1',
      productImage: "/images/product.svg",
      productTitle: "Product 1",
      productDesc: "View More",
    },
    {
      productId:'1',
      productImage: "/images/product.svg",
      productTitle: "Product 2",
      productDesc: "View More",
    },
    {  productId:'1',
      productImage: "/images/product.svg",
      productTitle: "Product 3",
      productDesc: "View More",
    },
  ];
describe("ProductImageCarousel Component", () => {
  it("renders correctly with default props", () => {
    render(<ProductImageCarousel productData={products} />);
  });
  it("renders correctly with default props", () => {
    render(<ProductImageCarousel productData={products} withPagination={true}/>);
  });
});
