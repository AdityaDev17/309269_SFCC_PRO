import React from "react";
import styles from "./Tile.module.css";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface TileProps {
  label: string;
  href: string;
}

const Tile: React.FC<TileProps> = ({ label, href }) => {
  return (
    <Link href={href} className={styles.tile}>
      <span>{label}</span>
      <ChevronRight size={18} data-testid="chevron-icon"/>
    </Link>
  );
};

export default Tile;

/**
 * ## Tile
 *
 * The `Tile` component is a simple navigational card used to represent account-related actions,
 * like navigating to Personal Information or Order History.
 * It wraps its content inside a `next/link` and displays a label along with a right-facing chevron icon.
 *
 * ### Props
 *
 * - **label** (string, required): The text displayed on the tile.
 *   It typically represents the section or page it links to.
 *
 * - **href** (string, required): The URL path to navigate to when the tile is clicked.
 *
 * ### Component Behavior
 *
 * - The tile is styled using `Tile.module.css` and has an inline layout with the label on the left
 *   and a chevron icon (`ChevronRight`) on the right.
 * - It uses `next/link` for client-side navigation in a Next.js app.
 * - The chevron icon is added for visual affordance, suggesting navigation.
 */
