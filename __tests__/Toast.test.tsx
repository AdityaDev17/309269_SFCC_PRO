import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast, Toaster } from "@/components/molecules/Toast/Toast";
import { ThemeProvider } from "next-themes";

describe("Toaster Component", () => {
  // Test 1: Default rendering of the Toaster
  it("renders correctly with default props", async () => {
    render(<Toaster />);
    const toastElement = await screen.findByRole("alert");
    expect(toastElement).toBeInTheDocument();
  });

  // Test 2: Theme handling - light/dark mode
  it("renders with the correct theme based on context", async () => {
    render(
      <ThemeProvider attribute="class">
        <Toaster />
      </ThemeProvider>
    );

    // Check if the theme class is applied, assuming the theme is light by default
    const toastElement = await screen.findByRole("alert");
    expect(toastElement).toHaveClass("light");
  });

  // Test 3: Custom styles from Toast.module.css
  it("applies custom styles from Toast.module.css", async () => {
    render(<Toaster />);

    // Check if the toast has the correct custom classes
    const toastElement = await screen.findByRole("alert");

    expect(toastElement).toHaveClass("Toast"); // Ensure the main toast class is applied
    expect(toastElement).toHaveClass("ToastDescription"); // Check content class
    expect(toastElement).toHaveClass("ToastActionButton"); // Check action button class
    expect(toastElement).toHaveClass("ToastCancelButton"); // Check close button class
  });

  // Test 4: Close button functionality
  it("renders a close button and it works", async () => {
    render(<Toaster />);
    const closeButton = await screen.findByRole("button");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByRole("alert")).toBeNull();
    });
  });

  it("shows a toast when toast is called", async () => {
    render(<Toaster />);
    toast("Test toast message");
    const toastMessage = await screen.findByText("Test toast message");
    expect(toastMessage).toBeInTheDocument();
  });
});
