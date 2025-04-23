import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Textarea from "../src/components/atomic/Textarea/TextArea"; // Adjust import based on your structure

describe("Textarea Component", () => {
  test("renders the textarea component", () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("accepts and displays user input", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "Hello, world!" } });
    expect(textarea).toHaveValue("Hello, world!");
  });

  test("respects the rows prop", () => {
    render(<Textarea rows={4} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("TEXTAREA");
  });

  test("triggers onChange event", () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "New text" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
