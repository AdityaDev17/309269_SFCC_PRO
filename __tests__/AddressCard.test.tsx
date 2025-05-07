import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddressCard from "../src/components/organisms/AddressCard/AddressCard";

describe("AddressCard Component", () => {
  const mockItems = [
    { id: "1", title: "Home", description: "123 Main St", isDefault: false },
  ];

  it("renders correctly with default props", () => {
    render(<AddressCard items={[]} variant="address" />);
  });

  it("calls handleRadioChange when radio button is selected", () => {
    const { getByRole } = render(
      <AddressCard items={mockItems} variant="delivery" radioButton={true} />
    );

    const radio = getByRole("radio");
    fireEvent.click(radio); 
  }); 
});
