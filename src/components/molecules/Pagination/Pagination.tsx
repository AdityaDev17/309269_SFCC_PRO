import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type { ButtonProps } from "../../atomic/Button/Button";
import styles from "./Pagination.module.css";

const Pagination = ({ ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={styles.Pagination}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ ...props }, ref) => (
  <ul ref={ref} className={styles.PaginationContent} {...props} />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} className="" {...props} />);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    data-variant={isActive ? "outline" : "ghost"}
    data-size={size}
    className={styles.PaginationLink}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

// size is 'default' from both next and previous
const PaginationPrevious = ({
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={styles.PaginationPrevious}
    {...props}
  >
    <ChevronLeft
      style={{
        height: "1rem",
        width: "1rem",
      }}
    />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={styles.PaginationNext}
    {...props}
  >
    <ChevronRight
      style={{
        height: "1rem",
        width: "1rem",
      }}
    />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={styles.PaginationEllipsis} {...props}>
    <MoreHorizontal
      style={{
        height: "1rem",
        width: "1rem",
        display: "inline-flex",
      }}
    />
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

/**
 * ## Pagination
 *
 * The `Pagination` component is used for navigating through pages in a paginated UI.
 * It includes navigation links, active page indicators, ellipsis for skipped pages, and next/previous controls.
 *
 * ### Features:
 * - **Accessible Navigation:** Uses `aria-label` and `aria-current` for better accessibility.
 * - **Configurable Styling:** Supports multiple variants for links.
 * - **Modular Components:** `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, etc., allow flexible customization.
 *
 * ### Challenges & Research:
 * - Ensured accessibility by adding ARIA attributes.
 * - Styled pagination links dynamically with variants.
 * - Used `React.forwardRef` to improve composability.
 *
 * ### Example Usage:
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
