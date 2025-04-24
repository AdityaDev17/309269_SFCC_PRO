// SignUp.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../src/components/molecules/SignUp/SignUp";

describe("SignUp Component", () => {
  const mockOnProceed = jest.fn();

  beforeEach(() => {
    render(<SignUp onProceed={mockOnProceed} />);
  });

  it("renders the first step correctly", () => {
    expect(screen.getByText("CREATE ACCOUNT")).toBeInTheDocument();
    expect(screen.getByText("Title*")).toBeInTheDocument();
    expect(screen.getByText("Email ID*")).toBeInTheDocument();
    expect(screen.getByText("CONTINUE")).toBeDisabled();
  });

});
