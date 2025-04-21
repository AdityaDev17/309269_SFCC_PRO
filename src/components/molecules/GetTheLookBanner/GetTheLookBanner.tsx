import React, { useEffect, useRef, useState } from 'react';
import Typography from '@/components/atomic/Typography/Typography';
import { Card, CardHeader } from '@/components/atomic/Card/Card';
import styles from './GetTheLookBanner.module.css';
import { Button } from '@/components/atomic/button/button';

const GetTheLookBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.banner}>
      <div className={`${styles.textBlock} ${isVisible ? styles.textAnimate : ''}`}>
        <Typography type="Headline" variant={1} fontWeight="bold" label="GET THE LOOK" />
        <Typography type="Body" variant={2} color="#555" label="As you deserve the best!" />
        <div className={styles.buttonContainer}>
          <Button variant="link" onClick={() => console.log('Link Clicked')}>
            VIEW MORE
          </Button>
        </div>
      </div>

      {/* <div className={styles.cards}>
        <Card className={`${styles.card} ${styles.leftCard} ${isVisible ? styles.inView : ''}`}>
          <CardHeader>
            <img src="/images/carousel-image1.svg" alt="Look 1" />
          </CardHeader>
        </Card>

        <Card className={`${styles.card} ${styles.centerCard} ${isVisible ? styles.inView : ''}`}>
          <CardHeader>
            <img src="/images/carousel-image2.svg" alt="Look 2" />
          </CardHeader>
        </Card>

        <Card className={`${styles.card} ${styles.rightCard} ${isVisible ? styles.inView : ''}`}>
          <CardHeader>
            <img src="/images/carousel-image3.svg" alt="Look 3" />
          </CardHeader>
        </Card>
      </div> */}
    </div>
  );
};

export default GetTheLookBanner;
