import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '../src/components/molecules/Pagination/Pagination'

describe("Pagination Component", () => {
  test("renders pagination container", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("highlights active page", () => {
    render(
      <PaginationLink href="#" isActive>
        3
      </PaginationLink>
    );
    expect(screen.getByText("3")).toHaveAttribute("aria-current", "page");
  });

  test("navigates to the correct page when a pagination link is clicked", () => {
    render(<PaginationLink href="/page-2">2</PaginationLink>);

    const link = screen.getByText("2");
    expect(link).toHaveAttribute("href", "/page-2");
  });

  test("calls the onClick handler when pagination link is clicked", () => {
    const handleClick = jest.fn();
    render(
      <PaginationLink href="#" onClick={handleClick}>
        4
      </PaginationLink>
    );

    fireEvent.click(screen.getByText("4"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
