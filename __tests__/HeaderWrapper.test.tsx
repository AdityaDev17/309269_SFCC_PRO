import React from "react";
import { render } from "@testing-library/react";
import HeaderWrapper from "../src/components/organisms/Header/HeaderWrapper";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import { usePathname } from "next/navigation";

describe("HeaderWrapper Component", () => {
  it("renders correctly with default props (home page)", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<HeaderWrapper />);
  });

  it("renders correctly for a non-home page", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");

    render(<HeaderWrapper />);
  });
});
