import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetTheLookBanner from "@/components/molecules/GetTheLookBanner/GetTheLookBanner";


beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    disconnect() {}
  } as any;
});

describe('GetTheLookBanner Component', () => {
  test('renders the heading text', () => {
    render(<GetTheLookBanner />);
    expect(screen.getByText('GET THE LOOK')).toBeInTheDocument();
  });

  test('renders the subheading text', () => {
    render(<GetTheLookBanner />);
    expect(screen.getByText('As you deserve the best!')).toBeInTheDocument();
  });

  test('renders the view more button', () => {
    render(<GetTheLookBanner />);
    expect(screen.getByRole('button', { name: 'VIEW MORE' })).toBeInTheDocument();
  });

  test('renders all three image cards', () => {
    render(<GetTheLookBanner />);
    expect(screen.getByAltText('Look 1')).toBeInTheDocument();
    expect(screen.getByAltText('Look 2')).toBeInTheDocument();
    expect(screen.getByAltText('Look 3')).toBeInTheDocument();
  });
});

test('adds animation class when in view', () => {
    const observeMock = jest.fn();
    const disconnectMock = jest.fn();
  
    global.IntersectionObserver = class {
      constructor(callback: any) {
        callback([{ isIntersecting: true }]); 
      }
      observe = observeMock;
      disconnect = disconnectMock;
    } as any;
  
    render(<GetTheLookBanner />);
    const textBlock = screen.getByText('GET THE LOOK').parentElement;
  
    expect(textBlock).toHaveClass('textAnimate'); 
  });
  
