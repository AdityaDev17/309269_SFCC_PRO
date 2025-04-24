import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Switch from "../src/components/atomic/Switch/Switch";




describe("Switch Component", () => {

    test("renders without crashing", () => {
        render(<Switch data-testid="switch"/>);
        const switchElement = screen.getByTestId("switch");
        expect(switchElement).toBeInTheDocument();
    });
    test("toggle check state when clicked", () => {
        render(<Switch data-testid="switch"/>);
        const switchElement = screen.getByTestId("switch");
        expect(switchElement).not.toBeChecked();
        fireEvent.click(switchElement);
        expect(switchElement).toBeChecked();
    });

});
