import React from "react";
import { render } from "@testing-library/react";
import MiniCart from "@/components/organisms/MiniCart/MiniCart";


describe("TypographyBlock Component", () => {
  it("renders correctly with default props", () => {
    render(<MiniCart cartItems={[]}/>);
  });
});