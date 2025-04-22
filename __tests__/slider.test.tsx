import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../src/components/atomic/Slider/Slider";



describe("Slider Component", () => {

    test("renders without crashing", () => {
        render(<Slider data-testid="slider"/>);
        const sliderElement = screen.getByTestId("slider");
        expect(sliderElement).toBeInTheDocument();
    });
    it('has an initial value of 50', () => {
        render(<Slider />);
        const sliderElement = screen.getByRole('slider');
        expect(sliderElement).toHaveAttribute('aria-valuenow', '50');
      });
      
    
})
