import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../components/atomic/button/button";

describe("Button Component", () => {
  test("renders button with children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("applies variant and size data attributes", () => {
    render(
      <Button variant="secondary" size="lg">
        Test
      </Button>
    );
    const button = screen.getByText("Test");
    expect(button).toHaveAttribute("data-variant", "secondary");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  test("triggers onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders close icon when active and calls onRemove", () => {
    const handleRemove = jest.fn();
    render(
      <Button active onRemove={handleRemove}>
        Active Button
      </Button>
    );

    const closeIcon = screen.getByTestId("close-icon");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  test("renders an icon when icon prop is provided", () => {
    render(<Button icon={<span data-testid="test-icon"></span>}>Icon</Button>);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });
});
