import React from "react";
import { render, screen,act } from "@testing-library/react";
import StatementBanner from "../src/components/molecules/StatementBanner/StatementBanner";


global.IntersectionObserver = jest.fn().mockImplementation((callback: IntersectionObserverCallback) => {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: jest.fn(),
  };
});

describe('StatementBanner Component', () => {
  it('renders the StatementBanner component correctly', () => {
    render(
      <StatementBanner
        imageSrc="test-image.jpg"
        heading="Test Heading"
        subheading="Test Subheading"
        description="Test Description"
      />
    );

    // Check if the image is rendered with the correct src and alt
    const image = screen.getByAltText('');  // Get by alt text
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', '');

    // Check if the heading and subheading are rendered correctly
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test Subheading')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Check if the "VIEW MORE" button is rendered
    expect(screen.getByText('VIEW MORE')).toBeInTheDocument();
  });

  it('calls onClick function when the button is clicked', () => {
    const handleClick = jest.fn();

    render(
      <StatementBanner
        imageSrc="test-image.jpg"
        heading="Test Heading"
        subheading="Test Subheading"
        description="Test Description"
        linkText="VIEW MORE"
      />
    );

    const button = screen.getByText('VIEW MORE');
    button.onclick = handleClick;
    button.click();

    expect(handleClick).toHaveBeenCalled();
  });

})