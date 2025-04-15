/**
 * ---
title: Accordion
description: A customizable accordion component built with Radix UI and styled with CSS Modules.
---

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/molecules/Accordion/Accordion"

# Accordion Component

The `Accordion` is a composable UI element used to toggle visibility of content sections. It's built using [Radix UI's Accordion primitives](https://www.radix-ui.com/primitives/docs/components/accordion) for accessibility and flexibility, and styled using CSS Modules.

---

##  Features

- **Radix Compliant**: Fully accessible and keyboard-friendly.
- **Chevron Icon**: Built-in indicator rotates on open/close.
- **CSS Modules**: Scoped styles for clean and isolated design.
- **Composable API**: Each part (`Item`, `Trigger`, `Content`) is a separate building block.
- **Forwarded Refs**: Works with animation libraries and advanced integrations.

---

## 🔧 Components & Props

### `Accordion`

> The root wrapper for all accordion items.

| Prop           | Type                   | Description                         |
|----------------|------------------------|-------------------------------------|
| `type`         | `"single"` \| `"multiple"` | Controls whether one or multiple items can be open. |
| `collapsible`  | `boolean`              | Allows items to be collapsed.       |

---

### `AccordionItem`

> Container for each accordion entry.

| Prop           | Type    | Description                         |
|----------------|---------|-------------------------------------|
| `value`        | `string`| A unique value identifying the item. |

---

### `AccordionTrigger`

> The button element that toggles the content.

| Prop        | Type         | Description                          |
|-------------|--------------|--------------------------------------|
| `children`  | `ReactNode`  | Title or label for the item.         |

---

### `AccordionContent`

> The content section that is revealed or hidden.

| Prop        | Type         | Description                          |
|-------------|--------------|--------------------------------------|
| `children`  | `ReactNode`  | The content inside the accordion.    |

---

 * ```tsx Accordion Component example
 * "use client";
import {

  Accordion,

  AccordionContent,

  AccordionItem,

  AccordionTrigger,

} from "@/components/molecules/Accordion/Accordion";
import AccordionStyle from "@/components/molecules/Accordion/Accordion.module.css";

import { useEffect } from "react";
  return (
    <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>DONATE TO ENVIRONMENTAL CAUSES</AccordionTrigger>
            <AccordionContent>
              Make a direct impact by allocating your points to support effort
              or organisations working towards a greener future.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>SHOP SUSTAINABLY</AccordionTrigger>
            <AccordionContent>
              Make a direct impact by allocating your points to support effort
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
}
 */

"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./Accordion.module.css";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={styles.AccordionItem}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={styles.AccordionPrimitiveTrigger}
      {...props}
    >
      {children}
      <ChevronDownIcon className={styles.ChevronDownIcon} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={styles.AccordionPrimitiveContent}
    {...props}
  >
    <div className={styles.AccordionContentDiv}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };