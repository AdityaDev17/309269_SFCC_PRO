import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../src/components/molecules/Dialog/Dialog";

import "@testing-library/jest-dom";

const mockText = {
  title: "Confirm Action",
  description: "Are you sure you want to continue?",
  triggerLabel: "Open Dialog",
  footerButton: "Proceed",
};

describe("Dialog component", () => {
  it("renders trigger button and opens dialog on click", async () => {
    render(
      <Dialog>
        <DialogTrigger>
          <button>{mockText.triggerLabel}</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{mockText.title}</DialogTitle>
            <DialogDescription>{mockText.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>{mockText.footerButton}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const triggerBtn = screen.getByText(mockText.triggerLabel);
    expect(triggerBtn).toBeInTheDocument();

    fireEvent.click(triggerBtn);

    expect(await screen.findByText(mockText.title)).toBeInTheDocument();
    expect(screen.getByText(mockText.description)).toBeInTheDocument();
    expect(screen.getByText(mockText.footerButton)).toBeInTheDocument();
  });

  it("closes the dialog on close icon click", async () => {
    render(
      <Dialog>
        <DialogTrigger>
          <button>{mockText.triggerLabel}</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{mockText.title}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText(mockText.triggerLabel));
    expect(await screen.findByText(mockText.title)).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText(mockText.title)).not.toBeInTheDocument();
  });

  it("renders children inside dialog content", async () => {
    const customText = "Custom body text";

    render(
      <Dialog>
        <DialogTrigger>
          <button>{mockText.triggerLabel}</button>
        </DialogTrigger>
        <DialogContent>
          <p>{customText}</p>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText(mockText.triggerLabel));
    expect(await screen.findByText(customText)).toBeInTheDocument();
  });

  it("applies correct aria attributes for accessibility", async () => {
    render(
      <Dialog>
        <DialogTrigger>
          <button>{mockText.triggerLabel}</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{mockText.title}</DialogTitle>
            <DialogDescription>{mockText.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText(mockText.triggerLabel));

    const dialogTitle = await screen.findByText(mockText.title);
    const dialogDesc = screen.getByText(mockText.description);

    expect(dialogTitle.tagName.toLowerCase()).toBe("h2"); // Radix renders title as heading
    expect(dialogDesc).toBeInTheDocument();
  });
});
