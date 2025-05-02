import Typography from "../../../components/atomic/Typography/Typography"
import styles from "./ErrorComponent.module.css"

import React from 'react'
import Image from "next/image";
import { Button } from "../../../components/atomic/Button/Button";


interface LayoutProps {
    errImg: string ;
    imgHeight:number;
    imgWidth:number;
    text1?:string;
    text2?:string;
    buttonText?:string
    onButtonClick?:() => void;
  }
  

function ErrorComponent({ errImg,imgHeight, imgWidth, text1, text2, buttonText="TRY AGAIN", onButtonClick}: LayoutProps) {
  return (
    <div className={styles.layout}>
        <Image 
          src={errImg} 
          alt="404" 
          width={imgWidth}         
          height={imgHeight} 
          style={{ marginBottom: "20px" }} 
          loading="eager"
        /> 
        {
          text1 &&
          <div className={styles.text}>
            <Typography type="Label" variant={3} label={text1} fontWeight="regular" color="#4F4B53"/>
          </div>
        }
        {
          text2 &&
          <div className={styles.text}>
              <Typography type="Body" variant={1} label={text2} fontWeight="regular" color="#4F4B53"/>
          </div>
        }
        <Button style={{marginTop:"10px"}} onClick={onButtonClick}>
            <Typography type="Body" variant={3} fontWeight="semibold" label={buttonText}/>
        </Button>
    </div>
  )
}

export default ErrorComponent


/**
 * ## ErrorComponent
 *
 * The ErrorComponent is a flexible UI element used to display error messages or fallback visuals,
 * such as 404 pages or network error screens. It includes an image, optional primary and secondary text,
 * and a call-to-action button.
 *
 * ### Props
 *
 * - **errImg** `(string)`: Path to the image displayed at the top of the component.
 * - **imgHeight** `(number)`: Height of the image in pixels.
 * - **imgWidth** `(number)`: Width of the image in pixels.
 * - **text1** `(string, optional)`: Primary text displayed below the image (e.g., a headline or error title).
 * - **text2** `(string, optional)`: Secondary descriptive text shown below `text1`.
 * - **buttonText** `(string, optional)`: Text for the call-to-action button. Defaults to `"TRY AGAIN"`.
 *
 * ### Component Behavior
 *
 * - Renders an error image followed by optional primary and secondary text.
 * - Displays a button with customizable text, typically used to retry an action or navigate elsewhere.
 * - All text elements use the `Typography` component for consistent styling.
 *
 * ### Internal Styling
 *
 * - Uses CSS modules from `ErrorComponent.module.css` for layout and spacing.
 * - Image is styled with a bottom margin and eager loading for immediate rendering.
 * - Button has top margin and wraps a `Typography` label for visual consistency.
 *
 * ### Usage Example
 *
 * ```tsx
 * import ErrorComponent from "@/components/molecules/ErrorComponent/ErrorComponent";
 *
 * <ErrorComponent
 *   errImg="/assets/404.svg"
 *   imgHeight={300}
 *   imgWidth={300}
 *   text1="Oops! Page not found."
 *   text2="We couldn’t find the page you were looking for."
 *   buttonText="Go Home"
 * />
 * ```
 <img src={errImg} alt="404" style={{marginBottom:"20px"}}/>changed to <Image/>
 */
