import React from "react";
import { render } from "@testing-library/react";
import ProductCard from "../src/components/molecules/ProductCard/ProductCard";

describe("ProductCard Component", () => {
  it("renders correctly with default props", () => {
    render(<ProductCard productImage={""} productTitle={""}/>);
  });
  it("renders correctly with default props", () => {
    render(<ProductCard alignment="alignStart" productImage={""} productTitle={""}/>);
  });
  it("renders correctly with default props", () => {
    render(<ProductCard alignment="alignEnd" productImage={""} productTitle={""}/>);
  });
  
});