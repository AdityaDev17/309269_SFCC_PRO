import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { useRouter } from "next/navigation";
import Tile from "@/components/atomic/Tile/Tile";


jest.mock("next/link", () => {
  return ({ href, children }: any) => <a href={href}>{children}</a>;
});

describe("Tile Component", () => {
  const label = "Personal Information";
  const href = "/my-account/personal-info";

  test("renders the tile with label", () => {
    render(<Tile label={label} href={href} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test("renders with correct href", () => {
    render(<Tile label={label} href={href} />);
    const link = screen.getByRole("link", { name: label });
    expect(link).toHaveAttribute("href", href);
  });

  test("renders ChevronRight icon", () => {
    render(<Tile label={label} href={href} />);
    // Check if SVG element is in the document
    expect(screen.getByTestId("chevron-icon")).toBeInTheDocument();
  });
});
