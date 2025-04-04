import React from "react";
import { render } from "@testing-library/react";
import OrderSummary from "@/components/organisms/OrderSummary/OrderSummary";


describe("TypographyBlock Component", () => {
  it("renders correctly with default props", () => {
    render(<OrderSummary/>);
  });
  it("renders correctly with default props", () => {
    render(<OrderSummary reverseOrder={true}/>);
  });
  it("renders correctly with default props", () => {
    render(<OrderSummary totalRowTop={true} isPaymentImage={false} isButton={false}/>);
  });
});