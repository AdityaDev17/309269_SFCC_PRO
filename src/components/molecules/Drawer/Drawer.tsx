"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import styles from './Drawer.module.css'

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={styles.DrawerOverlay}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & { side?: 'left' | 'right' }
>(({ children, side = 'left', ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      data-side={side}
      className={styles.DrawerContent}
      {...props}
    >
      <div className={styles.DrawerContentDiv} />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"


const DrawerHeader = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={styles.DrawerHeader}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={styles.DrawerFooter}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={styles.DrawerTitle}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={styles.DrawerDescription}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

/**
 * ## Drawer 
 *
 * The `Drawer` component is a customizable sliding panel that can be used to display content off-canvas, such as navigation menus, notifications, or forms. It can be positioned on either the left or right side of the screen and can include a title, description, and content sections. The drawer can be controlled using triggers, and it supports dynamic scaling of the background.
 *
 * ### Props
 *
 * - **shouldScaleBackground** (`boolean`, optional): Controls whether the background should scale when the drawer is open. Defaults to `true`.
 * 
 * ### Component Behavior
 *
 * - The `Drawer` component consists of a root drawer element, overlay, content, header, footer, and title/description sections.
 * - The `DrawerContent` can be aligned to the left or right side of the screen using the `side` prop.
 * - The `DrawerTrigger` component is used to open the drawer.
 * - The drawer closes when the user interacts with the close button or the overlay background.
 * 
 * ### Example Usage
 *
 * Here's a simple example of how to use the `Drawer` component:
 *
 * ```tsx
 * 
 *       <DrawerTrigger onClick={() => setIsOpen(true)}>
 *         Open Drawer
 *       </DrawerTrigger>
 * 
 *       <Drawer open={isOpen} onOpenChange={setIsOpen}>
 *         <DrawerContent side="left">
 *           <DrawerHeader>
 *             <DrawerTitle>Drawer Title</DrawerTitle>
 *             <DrawerClose onClick={() => setIsOpen(false)} />
 *           </DrawerHeader>
 *           <DrawerDescription>
 *             This is the drawer content description.
 *           </DrawerDescription>
 *           <div>Additional content goes here</div>
 *         </DrawerContent>
 *       </Drawer>
 *     
 * ```
 *
 */
