import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductCardBanner.module.css";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import Typography from "../../atomic/Typography/Typography";

const dots = [
  {
    id: 1,
    top: "48%",
    left: "60%",
    productImage: "/images/lipstick.svg",
    productTitle: "TILBURY MATTE REVOLUTION",
    productDesc: "VIEW MORE"
  },
  {
    id: 2,
    top: "35%",
    left: "60%",
    productImage: "/images/lipstick.svg",
    productTitle: "EYELINER MAGIC",
    productDesc: "VIEW MORE"
  },
  {
    id: 3,
    top: "60%",
    left: "65%",
    productImage: "/images/product.svg",
    productTitle: "PERFUME",
    productDesc: "VIEW MORE"
  }
];

const ProductCardBanner = () => {
  const [activeDot, setActiveDot] = useState<number | null>(null);
  const [showDots, setShowDots] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setShowDots(true), 3000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.bannerWrapper} ref={bannerRef}>
      <div className={styles.imageArea}>
        <div className={styles.textBlock}>
          <Typography
            type="Headline"
            variant={1}
            fontWeight="regular"
            color="white"
            label={"EMBRACE YOUR\nINNER GLAMOUR"}
          />
        </div>

        {showDots &&
          dots.map((dot, index) => (
            <div
              key={dot.id}
              data-testid={`dot-${dot.id}`}
              className={`${styles.dot} ${styles.dotEnter}`}
              style={{
                top: dot.top,
                left: dot.left,
                animationDelay: `${index * 0.2}s`
              }}
              onClick={() => setActiveDot(dot.id)}
            />
          ))}

        {activeDot !== null && (
          <div className={styles.productCardPopup}>
            <ProductCard
              productImage={dots[activeDot - 1].productImage}
              productTitle={dots[activeDot - 1].productTitle}
              productDesc={dots[activeDot - 1].productDesc}
              alignment="alignStart"
            />
            <button
              className={styles.closeButton}
              data-testid="close-button"
              onClick={() => setActiveDot(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardBanner;

/**
 * ## ProductCardBanner
 *
 * The `ProductCardBanner` component displays an interactive promotional banner with a background image,
 * animated floating dots, and associated product popups. Each dot is clickable and opens a product card 
 * showing additional information.
 *
 * ### Component Behavior
 *
 * - Uses a background image styled with CSS modules to fully cover the section.
 * - Renders animated dots that float into place once the section scrolls into view (triggered using `IntersectionObserver`).
 * - Clicking a dot shows a corresponding product card popup.
 * - Only one product card can be shown at a time.
 * - Popup includes a close button (`✕`) to hide the product details.
 *
 * ### Visual Elements
 *
 * - **Typography**: Utilized for the main heading using the atomic `Typography` component.
 * - **ProductCard**: Displays product image, title, and description in a popup.
 * - **Animated Dots**: Visually indicate interactive product hotspots over the background image.
 *
 * ### Dependencies
 *
 * - **Typography** component from the atomic design system.
 * - **ProductCard** molecule component.
 * - CSS modules for styling: `ProductCardBanner.module.css`.
 */
