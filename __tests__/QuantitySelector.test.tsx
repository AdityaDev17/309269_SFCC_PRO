import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantitySelector from '@/components/atomic/QuantitySelector/QuantitySelector';


const mockOnQuantityChange = jest.fn();

describe('QuantitySelector Component', () => {
  beforeEach(() => {
    mockOnQuantityChange.mockClear();
  });

  it("renders correctly with default props", () => {
    render(<QuantitySelector onQuantityChange={jest.fn()} updateQuantity={false} />);
  });

  it("renders correctly with update quantity", () => {
    render(<QuantitySelector onQuantityChange={jest.fn()} updateQuantity={true} />);
  });

  it('should call selectNumber when a number is clicked in the dropdown', async () => {
    render(<QuantitySelector onQuantityChange={mockOnQuantityChange} updateQuantity={false} qty={3} />);

    const quantityText = screen.getByText('3');
    await userEvent.click(quantityText);
    const dropdownItem = screen.getByText('5');
    await userEvent.click(dropdownItem);
    expect(mockOnQuantityChange).toHaveBeenCalledWith(5);
  });

  it('should call onQuantityChange when the increase button is clicked', async () => {
    render(<QuantitySelector onQuantityChange={mockOnQuantityChange} updateQuantity={true} qty={3} />);

    const increaseButton = screen.getByAltText('Increase');
    await userEvent.click(increaseButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(4);
  });

  it('should call onQuantityChange when the decrease button is clicked and quantity is greater than 1', async () => {
    render(<QuantitySelector onQuantityChange={mockOnQuantityChange} updateQuantity={true} qty={3} />);

    const decreaseButton = screen.getByAltText('Decrease');
    await userEvent.click(decreaseButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(2);
  });

  it('should not decrease the quantity when the decrease button is clicked and quantity is 1', async () => {
    render(<QuantitySelector onQuantityChange={mockOnQuantityChange} updateQuantity={true} qty={1} />);

    const decreaseButton = screen.getByAltText('Decrease');
    await userEvent.click(decreaseButton);

    expect(mockOnQuantityChange).not.toHaveBeenCalled();
  });
});
