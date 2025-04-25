"use client";

import React, { useState } from "react";
import styles from "./wishlist.module.css";
import Typography from "../../components/atomic/Typography/Typography";
import { Button } from "../../components/atomic/Button/Button";
const ButtonList = ({ buttonNames }: { buttonNames: string[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <>
      <div className={styles.filterConainer}>
        <div className={styles.buttonConainer}>
          {buttonNames.map((buttonText, index) => (
            <Button
              key={index}
              style={{ marginRight: "10px" }}
              active={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              onRemove={() => setActiveIndex(-1)}
            >
              <Typography
                type="Body"
                variant={2}
                fontWeight="regular"
                label={buttonText}
              />
            </Button>
          ))}
        </div>
        <div className={styles.clearFilter}>
          <Button style={{ border: "none" }} onClick={() => setActiveIndex(-1)}>
            <Typography
              type={"Body"}
              variant={4}
              fontWeight="semibold"
              label={`CLEAR FILTERS`}
            />
          </Button>
        </div>
      </div>
    </>
  );
};
export default ButtonList;