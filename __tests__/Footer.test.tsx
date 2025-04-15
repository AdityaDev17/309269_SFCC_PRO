import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../src/components/organisms/Footer/Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders logo image", () => {
    const { container } = render(<Footer />);
    const logo = container.querySelector("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("alt", "Next.js logo");
  });

  test("renders all footer section titles", () => {
    render(<Footer />);
    expect(screen.getByText("Elenor")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  test("renders all footer link titles", () => {
    render(<Footer />);
    const links = [
      "Makeup", "SkinCare", "Fragnance", "Gift",
      "Community Profile", "Sustainability", "Refurbish", "Shipping Options", "FAQ",
      "Store Location", "Contact US", "Legal", "Privacy Policy"
    ];
    links.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("renders 'Change Location' and default placeholder", () => {
    render(<Footer />);
    expect(screen.getByText("Change Location")).toBeInTheDocument();
    expect(screen.getByText("US")).toBeInTheDocument();
  });

});
