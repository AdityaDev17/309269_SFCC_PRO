import { render, screen, fireEvent } from "@testing-library/react";
import EditPassword from "../src/components/molecules/EditPassword/EditPassword";

describe("EditPassword Component", () => {
  const mockUpdate = jest.fn();

  beforeEach(() => {
    mockUpdate.mockClear();
  });


  it("disables the button when fields are empty or passwords do not match", () => {
    render(<EditPassword onUpdateClicked={mockUpdate} />);
    const button = screen.getByRole("button", { name: /update/i });
    expect(button).toBeDisabled();
  });


});
