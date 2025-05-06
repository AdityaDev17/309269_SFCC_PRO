import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "@/components/molecules/Profile/Profile";

describe("Profile Component", () => {
  const mockUserDetails = {
    title: "Mr",
    firstName: "John",
    lastName: "Doe",
    birthDate: "1990-01-01",
    gender: "male",
    email: "john.doe@example.com"
  };

  const mockOnUpdateClicked = jest.fn();

  beforeEach(() => {
    render(
      <Profile userDetails={mockUserDetails} onUpdateClicked={mockOnUpdateClicked} />
    );
  });

  it("enables update button on change and calls onUpdateClicked on click", () => {
    const firstNameInput = screen.getByDisplayValue("John") as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "Johnny", name: "firstName" } });

    const updateBtn = screen.getByRole("button", { name: /update/i });
    expect(updateBtn).toBeEnabled();

    fireEvent.click(updateBtn);

    expect(mockOnUpdateClicked).toHaveBeenCalledWith({
      ...mockUserDetails,
      firstName: "Johnny"
    });
  });
});
