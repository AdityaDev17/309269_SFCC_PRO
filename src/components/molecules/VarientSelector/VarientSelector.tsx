import React, { useState } from "react";
import styles from "./VarientSelector.module.css";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/atomic/HoverCard/HoverCard";

const VarientSelector = ({ colors, onSelected }: any) => {
  const visibleColors = colors.slice(0, 5);
  const remainingCount = colors.length - visibleColors.length;
  const remainingColors = colors.slice(5);
  const [selected, setSelected] = useState(0);

  const handleSelected = (index: any) => {
    onSelected(colors[index]);
    setSelected(index);
  };

  return (
    <>
      <div className={styles.container}>
        {visibleColors.map((color: any, index: any) => (
          <div
            className={
              selected === index ? styles.circleBlack : styles.circleBlackW
            }
            key={index}
          >
            <div
              key={index}
              className={styles.colorCircle}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              onClick={() => handleSelected(index)}
            />
          </div>
        ))}
        {remainingCount != 0 && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className={styles.extraCircle}>+{remainingCount}</div>
            </HoverCardTrigger>
            <HoverCardContent className={styles.content}>
              <div className={styles.container}>
                {remainingColors.map((color: any, index: any) => {
                  const actualIndex = index + 5; // shift index for full list
                  return (
                    <div
                      className={
                        selected === actualIndex
                          ? styles.circleBlack
                          : styles.circleBlackW
                      }
                      key={actualIndex}
                    >
                      <div
                        key={index}
                        className={styles.colorCircle}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        onClick={() => setSelected(actualIndex)}
                      />
                    </div>
                  );
                })}
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <div className={styles.titleColor}>{colors[selected]?.name}</div>
    </>
  );
};

export default VarientSelector;
