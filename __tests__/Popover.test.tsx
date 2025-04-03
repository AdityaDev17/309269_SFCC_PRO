import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Popover, PopoverTrigger, PopoverContent } from "../src/components/Popover/Popover";

describe("Popover Component", () => {
  it("renders the popover trigger", () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText("Open Popover")).toBeInTheDocument();
  });

  it("opens the popover content when the trigger is clicked", async () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const triggerButton = screen.getByText("Open Popover");
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument(); // Should not be visible initially

    await userEvent.click(triggerButton);
    expect(screen.getByText("Popover Content")).toBeInTheDocument(); // Should appear after click
  });

  it("closes the popover when clicking outside", async () => {
    render(
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <button>Open Popover</button>
          </PopoverTrigger>
          <PopoverContent>Popover Content</PopoverContent>
        </Popover>
        <button>Outside Button</button>
      </div>
    );

    const triggerButton = screen.getByText("Open Popover");
    await userEvent.click(triggerButton);
    expect(screen.getByText("Popover Content")).toBeInTheDocument();

    // Click outside to close popover
    await userEvent.click(screen.getByText("Outside Button"));
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
