import React, { useState } from "react";
import { Button } from "@/components/atomic/button/button";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./Rating.module.css"
import Textarea from "../../atomic/Textarea/textArea";

type RatingComponentProps = {
  header?: string;
  headerClassName?: string;
  filledStarColor?: string;
  starBorderColor?: string;
  starBgColor?: string;
  maxRating?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  handleReview?: (review: string) => void;
};

const RatingComponent: React.FC<RatingComponentProps> = ({
  header = "Rate and Review",
  headerClassName = styles.header, // default to CSS module class
  maxRating = 5,
  initialRating = 0,
  onRatingChange,
  handleReview,
  filledStarColor = "#000000",   // yellow-400
  starBorderColor = "#a1a1aa",    // gray-400
  starBgColor = "white",
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleReviewChange=(e:any)=>{
    if (handleReview) {
        handleReview(e.target.value);
    }
  }

  return (
    <div className={styles.layout} >
      <div className={`${styles.header} ${headerClassName}`}>{header}</div>
      <div className={styles.rating}>
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < (hoverRating ?? rating);
          const iconStyle = {
            width: "24px",
            height: "24px",
            color: isFilled ? filledStarColor : starBorderColor,
          };

          return (
            <Button
              key={index}
              size="sm"
              style={{
                backgroundColor: starBgColor,
                padding: "10px",
                border: "none",
              }}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(null)}
            >
              {isFilled ? <FaStar style={iconStyle} /> : <FaRegStar style={iconStyle} />}
            </Button>
          );
        })}
      </div>
      <div>
      <Textarea placeholder="Write your review here"  className={styles.textArea} onChange={(e)=>handleReviewChange(e)}/>
      </div>
    </div>
  );
};

export default RatingComponent;

/**
 * ## Rating Component
 * The `RatingComponent` is a reusable UI component that allows users to provide a star-based rating
 * along with an optional text review.
 *
 * ### Props
 *
 * #### `header?: string`
 * Optional header text displayed above the rating stars. Defaults to `"Rate and Review"`.
 *
 * #### `headerClassName?: string`
 * Optional CSS class to customize the header styling. Can be used in combination with module CSS.
 *
 * #### `maxRating?: number`
 * Maximum number of stars to display for rating. Defaults to `5`.
 *
 * #### `initialRating?: number`
 * Initial selected rating (number of stars filled in when the component loads). Defaults to `0`.
 *
 * #### `onRatingChange?: (rating: number) => void`
 * Callback triggered when the user selects a different rating.
 * The selected rating value (1–`maxRating`) is passed as an argument.
 *
 * #### `handleReview?: (review: string) => void`
 * Callback triggered when the user types in the review textarea.
 * The current value of the review is passed as an argument.
 *
 * #### `filledStarColor?: string`
 * Sets the color of the filled star icons. Defaults to black (`#000000`).
 *
 * #### `starBorderColor?: string`
 * Sets the color of the empty (unfilled) star icons. Defaults to gray (`#a1a1aa`).
 *
 * #### `starBgColor?: string`
 * Sets the background color behind each star. Defaults to white.
 *
 * ---
 * ### Example Usage
 * ```tsx
 * <RatingComponent
 *   header="Your Feedback"
 *   initialRating={4}
 *   filledStarColor="#facc15"
 *   starBorderColor="#d1d5db"
 *   starBgColor="#fffbea"
 *   onRatingChange={(rating) => console.log("Rating changed:", rating)}
 *   handleReview={(text) => console.log("Review text:", text)}
 * />
 * ```
 */

