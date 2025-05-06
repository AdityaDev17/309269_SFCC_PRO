"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import styles from "./FaqAccordion.module.css";

interface FaqItem {
  id?: string
  question: string
  answer: string
  category?: string
}

interface FaqAccordionProps {
  title: string
  icon: React.ReactNode
  items?: FaqItem[]
  isOpen?: boolean
  onToggle?: () => void
  itemRefs?: React.MutableRefObject<Record<string, HTMLDivElement | null>>
}

export function FaqAccordion({ title, icon, items = [], isOpen = false, onToggle, itemRefs }: FaqAccordionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen !== undefined) {
      setInternalIsOpen(isOpen)
    }
  }, [isOpen])

  const toggleAccordion = () => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalIsOpen(!internalIsOpen)
    }
  }

  return (
    <div className={styles.accordionContainer}>
  <button
    className={styles.accordionButton}
    onClick={toggleAccordion}
    aria-expanded={internalIsOpen}
  >
    <div className={styles.accordionTitle }>
      {icon}
      <span className={styles.accordionHeading}>{title}</span>
    </div>
    {internalIsOpen ? <ChevronUp className={styles.chevronIcon} /> : <ChevronDown className={styles.chevronIcon} />}
  </button>

  {internalIsOpen && items.length > 0 && (
    <div className={styles.accordionContent}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.accordionItem}
          ref={
            item.id && itemRefs
              ? (el) => {
                  if (itemRefs.current && item.id) {
                    itemRefs.current[item.id] = el
                  }
                }
              : undefined
          }
        >
          <h3 className={styles.accordionQuestion}>{item.question}</h3>
          <p className={styles.accordionAnswer}>{item.answer}</p>
        </div>
      ))}
    </div>
  )}
</div>

  )
}