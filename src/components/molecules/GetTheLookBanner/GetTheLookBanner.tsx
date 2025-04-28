'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './GetTheLookBanner.module.css';
import Typography from '../../atomic/Typography/Typography';
import { Button } from '../../atomic/Button/Button';
import { Card, CardHeader } from '../../atomic/Card/Card';

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
    <div className={styles.wrapper}>
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
        <div className={styles.cards}>
          <Card
            className={`${styles.card} ${styles.leftCard} ${isVisible ? styles.inView : ''}`}
            width="auto"
          >
            <CardHeader>
              <Image
                src="/images/carousel-image3.svg"
                alt="Look 1"
                width={325}
                height={422}
                loading="eager"
              />
            </CardHeader>
          </Card>

          <Card
            className={`${styles.card} ${styles.centerCard} ${isVisible ? styles.inView : ''}`}
            width="auto"
          >
            <CardHeader>
              <Image
                src="/images/lookbanner-img2.svg"
                alt="Look 2"
                width={325}
                height={422}
                loading="eager"
              />
            </CardHeader>
          </Card>

          <Card
            className={`${styles.card} ${styles.rightCard} ${isVisible ? styles.inView : ''}`}
            width="auto"
          >
            <CardHeader>
              <Image
                src="/images/carousel-image6.svg"
                alt="Look 3"
                width={325}
                height={422}
                loading="eager"
              />
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetTheLookBanner;

/**
 * ## GetTheLookBanner
 *
 * The `GetTheLookBanner` component showcases a promotional section with a heading, subheading,
 * call-to-action button, and a trio of styled image cards. It utilizes an intersection observer 
 * to trigger animations when the content scrolls into view.
 *
 * ### Component Behavior
 *
 * - Displays a bold heading ("GET THE LOOK") and subheading text.
 * - Renders a "VIEW MORE" button that triggers a `console.log` event on click.
 * - Shows three image cards styled and positioned using CSS modules.
 * - Uses an intersection observer to add animation classes when 30% of the text section enters the viewport.
 *
 * ### Visual Elements
 *
 * - **Typography**: Used for heading and subheading.
 * - **Button**: A link-styled button for call-to-action.
 * - **Card**: Each image is wrapped inside a styled card component.
 *
 * ### Dependencies
 *
 * - Uses components from the atomic design system: `Typography`, `Button`, and `Card`.
 * - Applies scoped styles from `GetTheLookBanner.module.css`.
 */
