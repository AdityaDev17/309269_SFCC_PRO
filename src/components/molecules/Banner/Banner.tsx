"use client"

import type React from "react"
import Image from "next/image";
import styles from "./Banner.module.css"
import Typography from "../../atomic/Typography/Typography"
import { Button } from "../../atomic/Button/Button"
export type alignmentType = "left-top"
| "left-center"
| "left-bottom"
| "center-top"
| "center-center"
| "center-bottom"
| "right-top"
| "right-center"
| "right-bottom"
interface BannerProps {
  title: string
  buttonText?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  alignment?:alignmentType;
  buttonLink?: string
  textColor?: string
  subtitleVariant?: number
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  backgroundImage,
  alignment = "center-center",
  buttonLink = "#",
  textColor = "white",
  subtitleVariant,
}) => {
 
  const [horizontal, vertical] = alignment.split("-")
  const alignmentClass = `${styles[`horizontal-${horizontal}`]} ${styles[`vertical-${vertical}`]}`

  return (
    <div className={styles.wrapper}>
      <section className={styles.bannerContainer}>
        {backgroundImage && (
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Banner"
            className={styles.bannerImage}
            width={1440}
            height={740}
            loading="eager"
  />
        )}
        <div className={`${styles.textBox} ${alignmentClass}`}>
          <Typography type="Headline" variant={2} fontWeight="medium" label={title} color={textColor} />

          {subtitle && <Typography type="Headline" variant={subtitleVariant ?? 2} fontWeight="medium" label={subtitle} color={textColor}/>}

          {description && <Typography type="Body" variant={3} label={description} color={textColor} />}
          
          {buttonText && (
          <div className={styles.buttonContainer}>
            <Button size="sm" onClick={() => (window.location.href = buttonLink)}>
              {buttonText}
            </Button>
          </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Banner





/**
 * ## Banner
 * 
 * The `Banner` component is a customizable banner that displays a title, subtitle, description, 
 * and a button with a background image.
 * 
 * ### Props
 * 
 * - **title** (string): The main heading displayed on the banner.
 * - **buttonText** (string): The text displayed on the button.
 * - **subtitle** (string, optional): A secondary heading that appears below the title.
 * - **description** (string, optional): A short description displayed beneath the subtitle.
 * - **backgroundImage** (string, optional): The URL of the background image for the banner.
 * - **alignment** (string, optional): Controls the text alignment. Available values:
 *   - `left-top`, `left-center`, `left-bottom`
 *   - `center-top`, `center-center`, `center-bottom`
 *   - `right-top`, `right-center`, `right-bottom`
 *   
 *   Defaults to `center-center`.
 * - **buttonLink** (string, optional): The URL to navigate to when the button is clicked.
 *
 * ### Component Behavior
 * 
 * - The banner adjusts its layout based on the `alignment` prop, determining horizontal 
 *   and vertical positioning of the text.
 * - If `backgroundImage` is provided, it sets the banner's background.
 * - Clicking the button navigates the user to `buttonLink`.
 */



