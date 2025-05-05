import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddressDialog } from "../src/components/organisms/AddressForm/AddressModal";

describe("AddressDialog Component", () => {
  beforeEach(() => {
    render(<AddressDialog open={false} onOpenChange={jest.fn()} />);
  });

  it("renders the trigger button", () => {
    expect(screen.getByText("ADD NEW ADDRESS")).toBeInTheDocument();
  });

  it("opens the modal on trigger click", async () => {
    fireEvent.click(screen.getByText("ADD NEW ADDRESS"));
    expect(await screen.findByText("Add Address")).toBeInTheDocument();
    expect(screen.getByText(/Fields with/i)).toBeInTheDocument();
  });

  it("renders all required input fields", async () => {
    fireEvent.click(screen.getByText("ADD NEW ADDRESS"));

    expect(
      await screen.findByPlaceholderText("First Name*")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone No.*")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Apartment, Suite, etc.*")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Building no.*")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Street, Locality name*")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("City*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ZIP code*")).toBeInTheDocument();
    expect(screen.getByText("State*")).toBeInTheDocument();
  });

  it("renders and toggles the checkbox", async () => {
    fireEvent.click(screen.getByText("ADD NEW ADDRESS"));
    const checkbox = await screen.findByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("closes the dialog on cancel click", async () => {
    fireEvent.click(screen.getByText("ADD NEW ADDRESS"));
    expect(await screen.findByText("Add Address")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Add Address")).not.toBeInTheDocument();
    });
  });

  it("keeps dialog open when Save is clicked (no actual form handling)", async () => {
    fireEvent.click(screen.getByText("ADD NEW ADDRESS"));
    fireEvent.click(await screen.findByText("Save"));

    expect(screen.getByText("Add Address")).toBeInTheDocument(); // stays open
  });

  it("shows state options when select is opened", async () => {
    fireEvent.click(screen.getByText("ADD NEW ADDRESS"));
    const trigger = await screen.findByText("State*");
    fireEvent.click(trigger);

    expect(screen.getByText("Maharashtra")).toBeInTheDocument();
    expect(screen.getByText("Delhi")).toBeInTheDocument();
    expect(screen.getByText("Karnataka")).toBeInTheDocument();
  });
});
