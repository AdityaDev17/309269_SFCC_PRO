import React from "react";
import { render } from "@testing-library/react";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";

describe("TypographyBlock Component", () => {
  it("renders correctly with default props", () => {
    render(<ProductCard/>);
  });
  it("renders correctly with default props", () => {
    render(<ProductCard alignment="alignStart"/>);
  });
  it("renders correctly with default props", () => {
    render(<ProductCard alignment="alignEnd"/>);
  });
  
});