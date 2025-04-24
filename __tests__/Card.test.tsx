import React from 'react'
import { render } from "@testing-library/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../src/components/atomic/Card/Card';

describe("Card component", () => {
  it("should render Card with default className", () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toHaveClass("Card"); 
  });

  it("should render Card with a custom className", () => {
    const { container } = render(<Card className="custom-class" />);
    expect(container.firstChild).toHaveClass("Card");
    expect(container.firstChild).toHaveClass("custom-class"); 
  });
});

describe("CardHeader component", () => {
  it("should render CardHeader with default className", () => {
    const { container } = render(<CardHeader />);
    expect(container.firstChild).toHaveClass("CardHeader");
  });
});

describe("CardTitle component", () => {
  it("should render CardTitle with default className", () => {
    const { container } = render(<CardTitle />);
    expect(container.firstChild).toHaveClass("CardTitle");
  });

  it("should render CardTitle with custom text", () => {
    const { getByText } = render(<CardTitle>Card Title</CardTitle>);
    expect(getByText("Card Title")).toBeInTheDocument();
  });
});

describe("CardDescription component", () => {
  it("should render CardDescription with default className", () => {
    const { container } = render(<CardDescription />);
    expect(container.firstChild).toHaveClass("CardDescription");
  });

  it("should render CardDescription with custom content", () => {
    const { getByText } = render(<CardDescription>This is a description</CardDescription>);
    expect(getByText("This is a description")).toBeInTheDocument();
  });
});

describe("CardContent component", () => {
  it("should render CardContent with default className", () => {
    const { container } = render(<CardContent />);
    expect(container.firstChild).toHaveClass("CardContent");
  });
});

describe("CardFooter component", () => {
  it("should render CardFooter with default className", () => {
    const { container } = render(<CardFooter />);
    expect(container.firstChild).toHaveClass("CardFooter");
  });
});

