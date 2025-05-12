"use client";

import React, { useState } from "react";
import { Button } from "../../components/atomic/Button/Button";
import Typography from "../../components/atomic/Typography/Typography";
import styles from "./wishlist.module.css";
const ButtonList = ({ buttonNames }: { buttonNames: string[] }) => {
	const [activeIndex, setActiveIndex] = useState<number>(-1);

	return (
		<>
			<div className={styles.filterConainer}>
				<div className={styles.buttonConainer}>
					{
						// eslint-disable-next-line react/no-array-index-key
						buttonNames.map((buttonText, index) => (
							<Button
								key={buttonText}
								style={{ marginRight: "10px" }}
								// eslint-disable-next-line react/no-array-index-key
								active={activeIndex === index}
								// eslint-disable-next-line react/no-array-index-key
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
						))
					}
				</div>
				<div className={styles.clearFilter}>
					<Button style={{ border: "none" }} onClick={() => setActiveIndex(-1)}>
						<Typography
							type={"Body"}
							variant={4}
							fontWeight="semibold"
							label={"CLEAR FILTERS"}
						/>
					</Button>
				</div>
			</div>
		</>
	);
};
export default ButtonList;
