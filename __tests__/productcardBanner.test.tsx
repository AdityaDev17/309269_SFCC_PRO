import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCardBanner from '../src/components/molecules/ProductCardBanner/ProductCardBanner';

beforeEach(() => {
  jest.useFakeTimers();


  global.IntersectionObserver = class {
    constructor(callback: any) {
      this.callback = callback;
    }
    callback: any;
    observe = () => {
      this.callback([{ isIntersecting: true }]);
    };
    unobserve = () => {};
    disconnect = () => {};
  } as any;
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('ProductCardBanner Component', () => {
  test('renders the heading text', () => {
    render(<ProductCardBanner />);
    const headingText = screen.getByText(/EMBRACE YOUR\s*INNER GLAMOUR/i);
    expect(headingText).toBeInTheDocument();
  });

  test('renders all product dots when in view', async () => {
    render(<ProductCardBanner />);
    
    
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByTestId('dot-1')).toBeInTheDocument();
      expect(screen.getByTestId('dot-2')).toBeInTheDocument();
      expect(screen.getByTestId('dot-3')).toBeInTheDocument();
    });
  });

  test('shows the correct product card when a dot is clicked', async () => {
    render(<ProductCardBanner />);
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      const dot = screen.getByTestId('dot-1');
      fireEvent.click(dot);
    });

    expect(screen.getByText('TILBURY MATTE REVOLUTION')).toBeInTheDocument();
    expect(screen.getByText('VIEW MORE')).toBeInTheDocument();
  });

  test('closes the product card popup when the close button is clicked', async () => {
    render(<ProductCardBanner />);
    jest.advanceTimersByTime(3000);

    await waitFor(() => fireEvent.click(screen.getByTestId('dot-1')));
    expect(screen.getByText('TILBURY MATTE REVOLUTION')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-button'));

    await waitFor(() =>
      expect(screen.queryByText('TILBURY MATTE REVOLUTION')).not.toBeInTheDocument()
    );
  });

  test('adds animation class to the dots when in view', async () => {
    render(<ProductCardBanner />);
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByTestId('dot-1')).toHaveClass('dotEnter');
      expect(screen.getByTestId('dot-2')).toHaveClass('dotEnter');
      expect(screen.getByTestId('dot-3')).toHaveClass('dotEnter');
    });
  });

})
