import { fireEvent, render, screen } from "@testing-library/react";
import { RadioGroup, RadioGroupItem } from "@/components/atomic/radioGroup/radioGroup";
describe('Radio Group Component', () => {
    test("renders without crashing", () => {
        render(
          <RadioGroup data-testid="radio-group">
            <RadioGroupItem value="option1" data-testid="radio-item-1" />
            <RadioGroupItem value="option2" data-testid="radio-item-2" />
          </RadioGroup>
        );
        const radioGroup = screen.getByTestId("radio-group");
        expect(radioGroup).toBeInTheDocument();
    });
    
    test("selects a radio item when clicked", () => {
        render(
          <RadioGroup>
            <RadioGroupItem value="option1" data-testid="radio-item-1" />
            <RadioGroupItem value="option2" data-testid="radio-item-2" />
          </RadioGroup>
        );
        const radioItem1 = screen.getByTestId("radio-item-1");
        const radioItem2 = screen.getByTestId("radio-item-2");
    
        fireEvent.click(radioItem1);
        expect(radioItem1).toBeChecked();
        expect(radioItem2).not.toBeChecked();
    
        fireEvent.click(radioItem2);
        expect(radioItem2).toBeChecked();
        expect(radioItem1).not.toBeChecked();
    });
})