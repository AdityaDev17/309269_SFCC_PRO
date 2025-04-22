import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "../src/components/atomic/Input/Input";


describe("Input Component", () => {
  it("should render correctly", () => {
    render(<Input type="password" placeholder="Enter password" />);
    
    const inputElement = screen.getByPlaceholderText("Enter password");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("should display error class when error prop is true", () => {
    render(<Input type="password" placeholder="Enter password" error />);
    
    const inputElement = screen.getByPlaceholderText("Enter password");
    expect(inputElement).toHaveClass("error");
  });

  it("should not have error class when error prop is false", () => {
    render(<Input type="password" placeholder="Enter password" error={false} />);
    
    const inputElement = screen.getByPlaceholderText("Enter password");
    expect(inputElement).not.toHaveClass("error");
  });

  it("should be disabled when disabled prop is set", () => {
    render(<Input type="password" placeholder="Enter password" disabled />);
    
    const inputElement = screen.getByPlaceholderText("Enter password");
    expect(inputElement).toBeDisabled();  
  });

});
