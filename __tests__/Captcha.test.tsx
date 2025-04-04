import React from "react";

import { render, screen,fireEvent } from "@testing-library/react";
import Captcha from "@/components/atomic/Captcha/Captcha";

describe("Captcha Component", () => {
    it("renders correctly", () => {
      render(<Captcha onVerify={() => {}} />);
      expect(screen.getByPlaceholderText(/Enter Captcha/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    });
    
  it("displays correct captcha code", () => {
    render(<Captcha onVerify={() => {}} />);
    const captchaCode = screen.getByText(/[A-Za-z0-9]{6}/);
    expect(captchaCode).toBeInTheDocument();
  });
  it("calls onVerify with correct value when captcha is correct", () => {
    const mockOnVerify = jest.fn();
    render(<Captcha onVerify={mockOnVerify} />);
    
    const captchaCode = screen.getByText(/[A-Za-z0-9]{6}/).textContent;
    const inputField = screen.getByPlaceholderText(/Enter Captcha/i);
    
    fireEvent.change(inputField, { target: { value: captchaCode } });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(mockOnVerify).toHaveBeenCalledWith(true);
  });
  

});