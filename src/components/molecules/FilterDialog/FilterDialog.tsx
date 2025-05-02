"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../molecules/Dialog/Dialog";
import styles from "./FilterDialog.module.css";
import { Button } from "../../atomic/Button/Button";
import { useState } from "react";
import Checkbox from "../../atomic/Checkbox/checkbox";
import { filterTabs, filterOptions } from "../../../common/constant";

const tabs = filterTabs;

export default function PriceFilterDialog() {
  const [activeTab, setActiveTab] = useState("Price");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Set<string>>
  >({});

  const toggleFilter = (tab: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = new Set(prev[tab] || []);
      if (current.has(option)) {
        current.delete(option);
      } else {
        current.add(option);
      }
      return { ...prev, [tab]: current };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const applyFilters = () => {
    console.log("Applied Filters:", selectedFilters);
    // You can hook this into URL search params or API filters later
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className={styles.FilterDialogContent}>
        <DialogHeader className={styles.FilterDialogHeader}>
          <DialogTitle className={styles.FilterDialogTitle}>
            Filters
          </DialogTitle>
          {/* <DialogClose className={styles.closeButton}>
            {" "}
            <X
              style={{
                height: "1rem",
                width: "1rem",
              }}
            />{" "}
          </DialogClose> */}
        </DialogHeader>

        <div className={styles.container}>
          {/* Sidebar Tabs */}
          <div className={styles.sidebar}>
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Right Side Options */}
          <div className={styles.content}>
            <h3 className={styles.sectionTitle}>{activeTab}</h3>
            <div className={styles.options}>
              {filterOptions[activeTab].map((label) => (
                <label key={label} className={styles.checkboxLabel}>
                  <Checkbox
                    checked={selectedFilters[activeTab]?.has(label) || false}
                    onCheckedChange={() => toggleFilter(activeTab, label)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className={styles.FilterDialogFooter}>
          <Button onClick={clearFilters}>CLEAR FILTERS</Button>
          <Button variant="secondary" onClick={applyFilters}>
            APPLY FILTERS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
