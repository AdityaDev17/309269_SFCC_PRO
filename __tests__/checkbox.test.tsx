import Checkbox from "../src/components/atomic/Checkbox/Checkbox";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Checkbox Component', () => {
    test("renders without crashing", () => {
        render(<Checkbox data-testid="checkbox"/>);
        const checkbox = screen.getByTestId("checkbox");
        expect(checkbox).toBeInTheDocument();
    });

    test("toggle check state when clicked", () => {
        render(<Checkbox data-testid="checkbox"/>);
        const checkbox = screen.getByTestId("checkbox");
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });
    
    test("matches snapshot", () => {
        const {container} = render(<Checkbox/>)
        expect(container).toMatchSnapshot();
    })
})