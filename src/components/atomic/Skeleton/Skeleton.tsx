import type React from "react";
import classNames from "classnames";
import styles from "./Skeleton.module.css";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames(styles.Skeleton, className)} {...props} />;
}
export { Skeleton };
