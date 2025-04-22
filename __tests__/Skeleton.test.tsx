import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "@/components/atomic/Skeleton/Skeleton";


describe("TypographyBlock Component", () => {
  it("renders correctly with default props", () => {
    render(<Skeleton/>);
  });
});
