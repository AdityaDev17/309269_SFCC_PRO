import React from "react";
import { render } from "@testing-library/react";
import Price from "@/components/molecules/Price/Price";

describe("TypographyBlock Component", () => {
  it("renders correctly with default props", () => {
    render(<Price price={150} priceAfterDiscount={100} currency={"$"}/>);
  });
});
