import React from "react";
import { render, screen ,fireEvent} from "@testing-library/react";
import Banner from "../src/components/molecules/Banner/Banner";



describe("Banner Component", () => {
  it("renders correctly with required props", () => {
    render(
      <Banner 
        title="Spring Collection" 
        buttonText="View More" 
        backgroundImage="/test-image.jpg" 
        alignment="center-bottom" 
      />
    );
  });

  it("renders title correctly", () => {
    render(<Banner title="New Arrivals" buttonText="Shop Now" />);
    expect(screen.getByText("New Arrivals")).toBeInTheDocument();
  });

  it("renders button with correct text", () => {
    render(<Banner title="Sale" buttonText="Buy Now" />);
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<Banner title="Sale" buttonText="Buy" subtitle="Limited Time!" />);
    expect(screen.getByText("Limited Time!")).toBeInTheDocument();
  });
  
  it("renders description when provided", () => {
    render(<Banner title="Offer" buttonText="Claim" description="Huge discounts!" />);
    expect(screen.getByText("Huge discounts!")).toBeInTheDocument();
  });
  
  
  it("applies correct alignment styles for 'left-top'", () => {
    render(<Banner title="Aligned" buttonText="Go" alignment="left-top" />);
    const textBox = screen.getByText("Aligned").parentElement;
    expect(textBox).toHaveClass("horizontal-left");
    expect(textBox).toHaveClass("vertical-top");
  });

  it("applies correct alignment styles for 'center-bottom'", () => {
    render(<Banner title="Aligned" buttonText="Go" alignment="center-bottom" />);
    const textBox = screen.getByText("Aligned").parentElement;
    expect(textBox).toHaveClass("horizontal-center");
    expect(textBox).toHaveClass("vertical-bottom");
  });

  it("applies correct alignment styles for 'right-bottom'", () => {
    render(<Banner title="Aligned" buttonText="Go" alignment="right-bottom" />);
    const textBox = screen.getByText("Aligned").parentElement;
    expect(textBox).toHaveClass("horizontal-right");
    expect(textBox).toHaveClass("vertical-bottom");
  });



  it("renders correctly with different alignments", () => {
    const { rerender } = render(<Banner title="Test" buttonText="Click" alignment="left-top" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  
    rerender(<Banner title="Test" buttonText="Click" alignment="right-bottom" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
  

});

it("renders without subtitle and description", () => {
  render(<Banner title="No Subtitle or Description" buttonText="Shop Now" />);
  expect(screen.getByText("No Subtitle or Description")).toBeInTheDocument();
  expect(screen.queryByText("Limited Time!")).not.toBeInTheDocument();
  expect(screen.queryByText("Huge discounts!")).not.toBeInTheDocument();
});

it("renders with only button text", () => {
  render(<Banner title="Only Button" buttonText="Click Here" />);
  expect(screen.getByText("Click Here")).toBeInTheDocument();
  expect(screen.queryByText("Only Button")).toBeInTheDocument();
});


it("navigates to the correct URL when the button is clicked", () => {
  const mockLink = "https://www.example.com";
  
  // Mock window.location.href by using Object.defineProperty
  const location = { href: "" };
  Object.defineProperty(window, 'location', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: location,
  });

  render(<Banner title="Shop Now" buttonText="Go" buttonLink={mockLink} />);
  
  const button = screen.getByText("Go");
  fireEvent.click(button);
  
  // Assert that the location.href is set to the correct URL
  expect(location.href).toBe(mockLink);
});
