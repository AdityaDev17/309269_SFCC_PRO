import React from "react";
import { render } from "@testing-library/react";
import CartItemList from "@/components/molecules/CartItemList/CartItemList";

describe("CartItemList Component", () => {
  it("renders correctly with default props", () => {
    render(<CartItemList cartItems={[]}/>);
  });
  it("renders correctly with default props", () => {
    render(<CartItemList cartItems={[]} isWhiteBackground={true}/>);
  });
});