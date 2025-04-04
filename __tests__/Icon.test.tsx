import React from "react";
import { render } from "@testing-library/react";
import { Icon} from "@/components/Icons/Icons"

describe("Icon Component", () => {
  it("renders correctly with Wishlist icon", () => {
    const { container } = render(<Icon name="Wishlist" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders correctly with Search icon", () => {
    const { container } = render(<Icon name="Search" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders correctly with Cart icon", () => {
    const { container } = render(<Icon name="Cart" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders correctly with User icon", () => {
    const { container } = render(<Icon name="User" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
