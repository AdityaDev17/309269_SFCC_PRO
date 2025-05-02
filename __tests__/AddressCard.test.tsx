import React from "react";
import { render } from "@testing-library/react";
import AddressCard from "../src/components/organisms/AddressCard/AddressCard";

describe("AddressCard Component", () => {
  it("renders correctly with default props", () => {
    render(<AddressCard items={[]} variant={"address"}/>);
  });
});
