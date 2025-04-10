import React from "react";
import { render } from "@testing-library/react";
import ProductImageCarousel from "@/components/organisms/ProductImageCarousel/ProductImageCarousel";

const products = [
    {
      productImage: "/images/product.svg",
      productTitle: "Product 1",
      productDesc: "View More",
    },
    {
      productImage: "/images/product.svg",
      productTitle: "Product 2",
      productDesc: "View More",
    },
    {
      productImage: "/images/product.svg",
      productTitle: "Product 3",
      productDesc: "View More",
    },
  ];
describe("TypographyBlock Component", () => {
  it("renders correctly with default props", () => {
    render(<ProductImageCarousel productData={products} cardsPerRow={3}/>);
  });
});
