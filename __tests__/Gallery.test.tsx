import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Gallery from '@/components/organisms/Gallery/Gallery';

jest.mock('@/components/molecules/ProductCard/ProductCard', () => ({
  __esModule: true,
  default: ({ productImage }: any) => <img src={productImage} alt="product" />,
}));

const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];

describe('Gallery component', () => {
  beforeEach(() => {
    // Default to desktop view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.dispatchEvent(new Event('resize'));
  });

  it('renders main image and thumbnails on desktop', () => {
    render(<Gallery images={images} />);

    // Main image should be the first
    expect(screen.getAllByAltText('product')[0]).toHaveAttribute('src', '/img1.jpg');

    // All thumbnails should be rendered
    const thumbnails = screen.getAllByAltText('product');
    expect(thumbnails).toHaveLength(images.length + 1); // +1 for main image
  });

});
