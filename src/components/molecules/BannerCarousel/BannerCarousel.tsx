'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from './BannerCarousel.module.css'
import Typography from '../../atomic/Typography/Typography'
import { Button }  from '../../atomic/Button/Button'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '../../atomic/Card/Card'
import { bannerData, CardType } from '../../../common/constant';


const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const currentBanner = bannerData[currentIndex]

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.cardsContainer}>
        {currentBanner.map((card: CardType, index: number) => (
          <Card key={index} className={styles.card} width="100%">
            {card.type === 'text' ? (
              <div className={styles.textCard}>
                <CardHeader>
                  <Typography
                    type="Headline"
                    variant={2}
                    fontWeight="regular"
                    color="black"
                    label={card.title}
                  />
                  <Typography
                    type="Headline"
                    variant={2}
                    fontWeight="regular"
                    color="black"
                    label={card.subtitle}
                  />
                </CardHeader>
                <CardContent>
                  <Typography
                    type="Body"
                    variant={2}
                    fontWeight="regular"
                    color="#555"
                    label={card.description}
                  />
                </CardContent>
                {card.link && (
                  <CardFooter className={styles.buttonContainer}>
                    <Button
                      variant="link"
                      onClick={() => console.log('Link Clicked')}
                    >
                      VIEW MORE
                    </Button>
                  </CardFooter>
                )}
              </div>
            ) : (
              <CardHeader>
                <Image
                  src={card.image ?? '/placeholder.svg'} 
                  alt="Banner"
                  width={440} 
                  height={600} 
                  loading="eager"
                />
              </CardHeader>
            )}
          </Card>
        ))}
      </div>

      <div className={styles.pagination}>
        {bannerData.map((_, index: number) => (
          <div
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerCarousel

/**
 * ## BannerCarousel
 * 
 * The `BannerCarousel` component is a rotating carousel that displays a series of banners with 
 * a mix of text and image cards. It automatically cycles through the banners every 8 seconds.
 * 
 * ### Props
 * - No external props are passed directly to the component.
 * 
 * ### Component Behavior
 * 
 * - The component cycles through a set of banners (`bannerData`) every 8 seconds, showing different 
 *   cards consisting of text and images.
 * - Each banner can contain text with a title, subtitle, description, and a link or it can contain 
 *   images.
 * - The `VIEW MORE` button is only shown for text cards that contain a link.
 * - The carousel will also display pagination dots that correspond to the number of banners.
 * - The current banner's index is tracked and updated as the carousel cycles through the banners.
 */