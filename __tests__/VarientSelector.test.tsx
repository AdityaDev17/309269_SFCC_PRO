import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VarientSelector from '@/components/molecules/VarientSelector/VarientSelector';

describe('VarientSelector', () => {
  const mockColors = [
    { hex: '#FF0000', name: 'Red' },
    { hex: '#00FF00', name: 'Green' },
    { hex: '#0000FF', name: 'Blue' },
    { hex: '#FFFF00', name: 'Yellow' },
    { hex: '#FF00FF', name: 'Magenta' },
    { hex: '#00FFFF', name: 'Cyan' } // extra color triggers HoverCard
  ];

  it('renders first 5 colors and +N button for extra', () => {
    const onSelectedMock = jest.fn();
    render(<VarientSelector colors={mockColors} onSelected={onSelectedMock} />);

    // Check visible color circles
    const colorCircles = screen.getAllByTitle(/Red|Green|Blue|Yellow|Magenta/);
    expect(colorCircles).toHaveLength(5);

    // Check "+1" indicator exists for overflow
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('calls onSelected when a visible color is clicked', () => {
    const onSelectedMock = jest.fn();
    render(<VarientSelector colors={mockColors} onSelected={onSelectedMock} />);

    const redCircle = screen.getByTitle('Red');
    fireEvent.click(redCircle);

    expect(onSelectedMock).toHaveBeenCalledWith(mockColors[0]);
  });
});
