import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/atomic/Select/Select";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";


describe('Select Component', () => {
    test('render without crashing', () => {
        render(
            <Select>
              <SelectTrigger data-testid="select-trigger">Select an option</SelectTrigger>
              <SelectContent>
                <SelectItem value="option1" data-testid="select-item-1">Option 1</SelectItem>
                <SelectItem value="option2" data-testid="select-item-2">Option 2</SelectItem>
              </SelectContent>
            </Select>
        );
        const select = screen.getByTestId('select-trigger');
        expect(select).toBeInTheDocument();
    });
    test('render without crashing', () => {
        render(
            <Select>
              <SelectTrigger variant="sort" data-testid="select-trigger">Select an option</SelectTrigger>
              <SelectContent>
                <SelectItem value="option1" data-testid="select-item-1">Option 1</SelectItem>
                <SelectItem value="option2" data-testid="select-item-2">Option 2</SelectItem>
              </SelectContent>
            </Select>
        );
        const select = screen.getByTestId('select-trigger');
        expect(select).toBeInTheDocument();
    });
})