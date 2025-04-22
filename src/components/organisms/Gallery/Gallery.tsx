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
