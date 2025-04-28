"use client";
import React, { useState } from "react";
import styles from "./orderHistory.module.css";
import { Button } from "@/components/atomic/Button/Button";
import Typography from "@/components/atomic/Typography/Typography";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atomic/Select/Select";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/molecules/Pagination/Pagination";

const Filter = () => {
  return (
    <div className={styles.filter}>
      <Select>
        <SelectTrigger variant="sort">
          <SelectValue placeholder="Orders in last 3 Months" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Duration</SelectLabel>
            <SelectItem value="3">3 Months</SelectItem>
            <SelectItem value="6">6 Months</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const ImageGrid = () => {
  const productData = [1, 2, 3, 4, 5];
  const visibleImages = productData.slice(0, 4);
  const remainingCount = productData.length - 3;
  return (
    <div className={styles.imageGrid}>
      {productData.length === 1 ? (
        <Image src="./images/product.svg" alt="product" fill loading="eager" />
      ) : (
        visibleImages.map((src, index) => {
          const isOverlay = index === 3 && productData.length > 4;

          return (
            <div key={src} className={styles.imageWrapper}>
              <Image
                src="./images/product.svg"
                alt="product"
                fill
                style={{ objectFit: "cover" }}
                loading="eager"
              />
              {isOverlay && (
                <div className={styles.blurOverlay}>+{remainingCount}</div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

const OrderCard = () => {
  return (
    <div className={styles.orderCard}>
      <ImageGrid />
      <div className={styles.orderDetails}>
        <div className={styles.orderDetailsTop}>
          <div className={styles.orderStatus}>
            <Typography
              type="Body"
              variant={3}
              fontWeight="semibold"
              label="Arriving Tomorrow"
            />
          </div>
          <div className={styles.orderName}>
            <Typography
              type="Label"
              variant={3}
              fontWeight="semibold"
              label="Men's Perfume 1, 100ml"
            />
          </div>
          <div className={styles.orderId}>
            <Typography
              type="Body"
              variant={2}
              fontWeight="regular"
              label="ORDER ID : ABCD12345678"
            />
          </div>
        </div>
        <div className={styles.orderDetailsBottom}>
          <div className={styles.orderTotal}>
            <Typography
              type="Body"
              variant={3}
              fontWeight="semibold"
              label="Order Total: $100"
            />
          </div>
          <Button>
            <Typography
              type="Body"
              variant={3}
              fontWeight="semibold"
              label="VIEW DETAILS"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

const OrderCardContainer = () => {
  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const visiblePages = [];
  if (currentPage === totalPages && totalPages > 1) {
    visiblePages.push(currentPage - 1, currentPage);
  } else {
    visiblePages.push(currentPage, currentPage + 1);
  }
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className={styles.orderCardContainer}>
        {currentItems.map((_, idx) => (
          <OrderCard key={idx} />
        ))}
      </div>
      <div className={styles.pageNavigator}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handlePrev} />
            </PaginationItem>

            {visiblePages.map((pgNo) => (
              <PaginationItem key={pgNo}>
                <PaginationLink
                  href="#"
                  isActive={pgNo === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(pgNo);
                  }}
                >
                  {pgNo}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext href="#" onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export { OrderCardContainer, Filter };
