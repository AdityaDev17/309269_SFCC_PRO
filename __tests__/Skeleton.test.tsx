import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "../src/components/atomic/Skeleton/Skeleton";


describe("Skeleton Component", () => {
  it("renders correctly with default props", () => {
    render(<Skeleton/>);
  });
});
