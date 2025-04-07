import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "@/components/molecules/search/search";

describe('Search Component', () => {
    test("renders input with placeholder", () => {
        render(<Search placeholder="Search here" />);
        expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();
    });

    test("calls onChange when typing", () => {
        const handleChange = jest.fn();
        render(<Search placeholder="Search..." onChange={handleChange} />);
        
        const input = screen.getByPlaceholderText("Search...");
    
        fireEvent.change(input, { target: { value: "test" } });
        expect(handleChange).toHaveBeenCalledWith("test");
    });

    test("updates internal value when value and onChange props are not provided", () => {
        render(<Search placeholder="Type here"/>)
        const input = screen.getByPlaceholderText("Type here") as HTMLInputElement
        fireEvent.change(input, { target: { value: "Hello world" } });
        expect(input.value).toBe("Hello world");


    })

    test("shows clear button when input has value", () => {
        render(<Search value="something" />);
        const clearButton = screen.getByLabelText("Clear search");
        expect(clearButton).toBeInTheDocument();
    });

    test("calls onClear when clear button is clicked", () => {
        const handleClear = jest.fn();
        render(<Search value="abc" onClear={handleClear} />);
        fireEvent.click(screen.getByLabelText("Clear search"));
        expect(handleClear).toHaveBeenCalled();
    });

    test("clears internal value when clear button is clicked and no onClear is provided", () => {
        render(<Search placeholder="Search..." />);
      
        const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
      
        fireEvent.change(input, { target: { value: "test clear" } });
        expect(input.value).toBe("test clear");
      
        const clearBtn = screen.getByLabelText("Clear search");
        fireEvent.click(clearBtn);
      
        expect(input.value).toBe("");
    });

    test("calls onSearch when search icon is clicked", () => {
        const handleSearch = jest.fn();
        render(<Search placeholder="Search..." onSearch={handleSearch} />);
        fireEvent.click(screen.getByLabelText("Search"));
        expect(handleSearch).toHaveBeenCalled();
    });
    
    test("does not show mic button if showMic is false", () => {
        render(<Search placeholder="Search..." showMic={false} />);
        expect(screen.queryByLabelText("Voice search")).not.toBeInTheDocument();
    });
    
    test("calls onMicClick when mic icon is clicked", () => {
        const handleMicClick = jest.fn();
        render(<Search placeholder="Speak..." onMicClick={handleMicClick} />);
        fireEvent.click(screen.getByLabelText("Voice search"));
        expect(handleMicClick).toHaveBeenCalled();
    });
})