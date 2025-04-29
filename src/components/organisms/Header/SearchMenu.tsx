import Typography from "@/components/atomic/Typography/Typography";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/molecules/Drawer/Drawer";
import { X, SearchIcon } from "lucide-react";
import ProductImageCarousel from "../ProductImageCarousel/ProductImageCarousel";
import Search from "@/components/molecules/Search/search";
import {
  searchSuggestions,
  productSuggestions,
} from "../../../common/constant";
import { useState, Fragment } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

interface SearchMenuProps {
  keyVal: number;
  searchIcon: string;
}

const SearchMenu = ({ keyVal, searchIcon }: SearchMenuProps) => {
  const [open, setOpen] = useState(false);

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
      <DrawerContent height="417px" side="top">
        <DrawerHeader className={styles.bagHeader}>
          <div className={styles.bagWrapper}>
            <div className={styles.searchHeader}>
              <Image
                src={"/images/SFCCLogo.svg"}
                height={20}
                width={109}
                alt="SFCC LOGO"
              />
              <Search />
              <X
                onClick={closeHandler}
                strokeWidth={2}
                color="grey"
                className={styles.close}
              />
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
                <ProductImageCarousel
                  width={95}
                  productData={productSuggestions}
                  alignment="alignStart"
                />
              </div>
            </div>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchMenu;
