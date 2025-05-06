import Typography from "@/components/atomic/Typography/Typography";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/molecules/Drawer/Drawer";
import { X, SearchIcon } from "lucide-react";
import Search from "@/components/molecules/Search/Search";
import {
  searchSuggestions,
  productSuggestions,
} from "../../../common/constant";
import { useState, Fragment, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";

interface SearchMenuProps {
  keyVal: number;
  searchIcon: string;
  isMobile: boolean
}

const SearchMenu = ({ keyVal, searchIcon, isMobile }: SearchMenuProps) => {
  const searchMenuHeight = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
  
    let resizeObserver: ResizeObserver | null = null;
  
    const timeout = setTimeout(() => {
      const element = searchMenuHeight.current;
      if (!element) return;
  
      setHeight(element.getBoundingClientRect().height);
  
      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setHeight(entry.contentRect.height);
        }
      });
  
      resizeObserver.observe(element);
    }, 100);
  
    return () => {
      clearTimeout(timeout);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [open]);
  

  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen} side="top" key={keyVal}>
      <DrawerTrigger asChild>
        <Image
          src={searchIcon}
          alt="Open Cart"
          width={20}
          height={20}
          onClick={() => setOpen(true)}
          className={styles.searchLogo}
        />
      </DrawerTrigger>
      <DrawerContent height={`${height + 26}px`} side="top">
        <DrawerTitle/>
        <div ref={searchMenuHeight}>
        <DrawerHeader className={styles.bagHeader}>
          <div className={styles.searchMenuContainer}>
            <div className={styles.searchHeader}>
              {!isMobile && <Image
                src={"/images/SFCCLogo.svg"}
                height={20}
                width={109}
                alt="SFCC LOGO"
              />}
              <Search/>
              {!isMobile && <X
                onClick={closeHandler}
                strokeWidth={2}
                color="grey"
                className={styles.close}
              />}
            </div>
            <div className={styles.suggestionWrapper}>
              <div className={styles.searchSuggestion}>
                <Typography type="Body" variant={1} label="SEARCH SUGGESTION" />
                {searchSuggestions.map((suggestion, index) => (
                  <Fragment key={index}>
                    <p className={styles.searchSuggestionValue}>
                      <SearchIcon strokeWidth={1.2} color="grey" /> {suggestion}
                    </p>
                  </Fragment>
                ))}
              </div>
              <div className={styles.productSuggestion}>
                <Typography
                  type="Body"
                  variant={1}
                  label="PRODUCT SUGGESTION"
                />
                <div className={styles.productSuggestionWrapper}>
                  {productSuggestions.map((suggestion, index) => (
                    <ProductCard key={index} productImage={suggestion.productImage} width={'100%'} productTitle={suggestion.productTitle} alignment="alignStart" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchMenu;
