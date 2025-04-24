import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RatingComponent from "../src/components/molecules/Rating/Rating";

describe("RatingComponent", () => {
  test("renders default header text", () => {
    render(<RatingComponent />);
    expect(screen.getByText("Rate and Review")).toBeInTheDocument();
  });

  test("renders custom header", () => {
    render(<RatingComponent header="Your Feedback" />);
    expect(screen.getByText("Your Feedback")).toBeInTheDocument();
  });

  test("renders correct number of stars", () => {
    render(<RatingComponent maxRating={7} />);
    const stars = screen.getAllByRole("button");
    expect(stars.length).toBe(7);
  });

  test("calls onRatingChange on star click", () => {
    const handleRatingChange = jest.fn();
    render(<RatingComponent onRatingChange={handleRatingChange} />);
    const stars = screen.getAllByRole("button");
    fireEvent.click(stars[2]);
    expect(handleRatingChange).toHaveBeenCalledWith(3); // index + 1
  });

  test("triggers handleReview on typing in textarea", () => {
    const handleReview = jest.fn();
    render(<RatingComponent handleReview={handleReview} />);
    const textarea = screen.getByPlaceholderText("Write your review here");
    fireEvent.change(textarea, { target: { value: "Nice product!" } });
    expect(handleReview).toHaveBeenCalledWith("Nice product!");
  });
});
