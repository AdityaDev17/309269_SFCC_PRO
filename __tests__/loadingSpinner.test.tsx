import LoadingSpinner from "@/components/atomic/loadingSpinner/loadingSpinner";
import { render, screen } from "@testing-library/react";

describe('Loading Spinner Component', () => {
    test('render without crashing', () => {
        render(<LoadingSpinner data-testid="loadingSpinner"/>)
        const loadingSpinner = screen.getByTestId('loadingSpinner');
        expect(loadingSpinner).toBeInTheDocument();
    });
    
    test("applies custom className if provided", () => {
        render(<LoadingSpinner className="custom-class" data-testid="loading-spinner" />);
        const spinner = screen.getByTestId("loading-spinner");
        expect(spinner).toHaveClass("custom-class");
    });
})