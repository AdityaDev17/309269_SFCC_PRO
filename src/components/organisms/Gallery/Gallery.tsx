import React, { useState, useEffect } from 'react';
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import styles from './Gallery.module.css';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setMainImage(images[activeIndex]);
  }, [activeIndex, images]);

  if (isMobile) {
    return (
      <div className={styles.mobileGallery}>
        <ProductCard productImage={mainImage} width="100%"/>

        <div className={styles.dotsContainer}>
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layoutGallery}>
      <div className={styles.thumbnails}>
        {images.map((img, idx) => {
          const isSelected = img === mainImage;
          return (
            <div
              key={idx}
              onMouseEnter={() => setMainImage(img)}
              onClick={() => setMainImage(img)}
              className={`${styles.thumbnailWrapper} ${isSelected ? styles.selected : ''}`}
            >
              <ProductCard productImage={img} width="93px" />
              {isSelected && <div className={styles.overlay} />}
            </div>
          );
        })}
      </div>
      <ProductCard productImage={mainImage} width="42vw"/>
    </div>
  );
};

export default Gallery;

/**
 * ## Gallery
 *
 * A responsive image gallery component that displays a set of images with thumbnail navigation.
 * The component adapts its layout for both mobile and desktop views, allowing users to interact
 * with the gallery by selecting images or thumbnails.
 *
 * ### Props
 *
 * ### `images`
 * - Type: `string[]`
 * - Required: Yes
 * - An array of image URLs that will be displayed in the gallery. Each URL represents a different image.
 * 
 * ### `contentStyle` (optional)
 * - Type: `string`
 * - Optional: Yes
 * - A CSS class to apply custom styles to the content area (used for thumbnails or image details).
 * 
 * ### Usage
 *
 * The **Gallery** component can be used to display a set of images that users can browse through, either by selecting a thumbnail
 * or by navigating through dots (on mobile). It automatically adapts to mobile or desktop views depending on the screen size.
 *
 * ### Example Usage
 *
 * ```tsx
 * <Gallery images={['/image1.jpg', '/image2.jpg', '/image3.jpg']} />
 * ```
 * 
 * This renders a gallery with three images:
 * - On mobile devices, a main image is displayed with clickable dots to navigate between images.
 * - On larger screens, a set of thumbnails appears, and clicking on or hovering over a thumbnail changes the main image.
 *
 * ### Functionality
 *
 * - **Mobile View**: When the screen width is below 768px, the gallery displays a main image with navigation dots. Clicking on a dot updates the main image.
 * - **Desktop View**: On larger screens, the gallery shows thumbnails of all images. Hovering over or clicking a thumbnail changes the main image.
 *
 * The gallery uses `useState` to manage:
 * - The currently displayed main image (`mainImage`).
 * - The active thumbnail index for navigation (`activeIndex`).
 * - The device type (mobile or desktop), based on screen width (`isMobile`).
 * 
 * The gallery component listens for resize events and adapts the layout when the screen size changes.
 */

