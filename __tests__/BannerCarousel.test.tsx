import React from "react";
import { render, screen ,waitFor,fireEvent} from "@testing-library/react";
import BannerCarousel from "@/components/molecules/BannerCarousel/BannerCarousel";
import '@testing-library/jest-dom';

describe('BannerCarousel', () => {
  test('renders the carousel correctly', () => {
    const { container } = render(<BannerCarousel />);

    // Check if the carousel is rendered with the correct elements
    const carouselWrapper = container.querySelector('.carouselWrapper');
    expect(carouselWrapper).toBeInTheDocument();
  });

  test('renders text cards when they are present in the banner data', () => {
    render(<BannerCarousel />);

    // Check if the text from the first text card is rendered
    expect(screen.getByText(/LOVE YOUR/)).toBeInTheDocument();
    expect(screen.getByText(/SKIN ENOUGH/)).toBeInTheDocument();
    expect(screen.getByText(/Skincare reimagined/)).toBeInTheDocument();
  });

  test('renders image cards when they are present in the banner data', () => {
    render(<BannerCarousel />);

    // Check if the images from the banner data are rendered
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('src', '/images/carousel-image1.svg');
  });

  
  test('changes carousel after 8 seconds', async () => {
    jest.useFakeTimers();
    render(<BannerCarousel />);

    // Initial current index should be 0 (first banner)
    expect(screen.getByText('LOVE YOUR')).toBeInTheDocument();

    // Simulate 8 seconds passing
    jest.advanceTimersByTime(8000);

    // Now, it should be the second banner
    await waitFor(() => {
      expect(screen.getByText('FRAGRANCE')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  test('button click works', () => {
    render(<BannerCarousel />);

    // Check if the "VIEW MORE" button is rendered
    const button = screen.getByText('VIEW MORE');
    expect(button).toBeInTheDocument();

    // Simulate button click and check if console logs
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith('Link Clicked');
  });
});
