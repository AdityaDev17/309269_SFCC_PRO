import { render, screen } from "@testing-library/react";
import Label from "../src/components/atomic/Label/Label";

describe("Label Component", () => {
  it("renders the label with correct text", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName.toLowerCase()).toBe("label");
    expect(labelElement).toHaveAttribute("for", "test-input");
  });

  it("applies the correct CSS class", () => {
    render(<Label htmlFor="another-input">Another Label</Label>);

    const labelElement = screen.getByText("Another Label");
    expect(labelElement.className).toContain("Label");
  });
});
