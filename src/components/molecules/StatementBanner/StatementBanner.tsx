
import React, { useEffect, useRef, useState } from "react";
import styles from './StatementBanner.module.css';
import Typography from "@/components/atomic/Typography/Typography";
import { Button } from "@/components/atomic/button/button";

type StatementBannerProps = {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  heading: string;
  subheading: string;
  description: string;
  linkText?: string;
};

const StatementBanner: React.FC<StatementBannerProps> = ({
  imageSrc,
  imageAlt = '',
  imagePosition = 'left',
  heading,
  subheading,
  description,
  linkText = 'VIEW MORE',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${imagePosition === 'left' ? styles.left : styles.right}`}>
        <div className={styles.imageWrapper}>
          <img src={imageSrc} alt={imageAlt} className={styles.image} />
        </div>
        <div 
          className={`${styles.text} ${isVisible ? styles.visible : ''}`} 
          ref={textRef}
        >
          <Typography
            type="Headline"
            variant={2} // Heading level 1 (headline1)
            fontWeight="semibold"
            color="black"
            label={heading}
          />
          <Typography
            type="Headline"
            variant={2} // Subheading
            fontWeight="semibold"
            color="black"
            label={subheading}
          />
          <Typography
            type="Body"
            variant={2} // Body text
            fontWeight="regular"
            color="#555"
            label={description}
          />
          <div className={styles.buttonContainer}>
            <Button
              variant="link"
              onClick={() => console.log('Link Clicked')}
            >
              {linkText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatementBanner;



/**
 * ## StatementBanner
 * 
 * The `StatementBanner` component displays an image, heading, subheading, description, 
 * and a button. It uses an intersection observer to toggle visibility of the text section 
 * when it comes into view.
 * 
 * ### Props
 * 
 * - **imageSrc** (string): The source URL for the image.
 * - **imageAlt** (string, optional): The alt text for the image. Defaults to an empty string.
 * - **imagePosition** (string, optional): The position of the image (`left` or `right`). Defaults to `left`.
 * - **heading** (string): The main heading.
 * - **subheading** (string): The secondary heading.
 * - **description** (string): The description text.
 * - **linkText** (string, optional): The button text. Defaults to `VIEW MORE`.
 * 
 * ### Component Behavior
 * 
 * - The banner displays the image and text, adjusting the layout based on `imagePosition`.
 * - The text section becomes visible when at least 30% of it is in the viewport.
 * - The button triggers a `console.log` event when clicked.
 */
