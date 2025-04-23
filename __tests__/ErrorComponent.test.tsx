import ErrorComponent from "@/components/molecules/ErrorComponent/ErrorComponent";
import { render, screen } from "@testing-library/react";

describe('Checkbox Component', () => {
    test("renders without crashing", () => {
        render(<ErrorComponent data-testid="errorComponent" errImg="images/magnifyingGlass.svg" imgHeight={205} imgWidth={280}/>);
        const errorComponent = screen.getByTestId("errorComponent");
        expect(errorComponent).toBeInTheDocument();
    });
})