import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/atomic/button/button";


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
});
