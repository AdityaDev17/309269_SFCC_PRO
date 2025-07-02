// biome-ignore file
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/atomic/Button/Button";
import Typography from "@/components/atomic/Typography/Typography";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/molecules/Drawer/Drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/molecules/NavigationMenu/NavigationMenu";
import MiniCart from "../MiniCart/MiniCart";
import styles from "./Header.module.css";
import SearchMenu from "./SearchMenu";
import { HeaderProps } from "@/common/type";

const getImageContainerClass = (length: number) => {
  if (length === 2) return styles.oneSecondaryImage;
  if (length === 3) return styles.twoSecondaryImage;
};


const Header: React.FC<HeaderProps> = ({
  isHome = false,
  logoImages,
  categories,
  headerIcons,
  headerWhiteIcons,
}) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [subcategoryArr, setSubcategoryArr] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState("");

  const checkMobileView = () => setIsMobile(window.innerWidth <= 768);
  
  useEffect(() => {
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const iconsToRender = isHome ? headerWhiteIcons : headerIcons;

  const handleCartClick = () => setOpen(true);

  const subCatgoryHandler = function(arr: any) {
    if(!arr?.subcategory[0]?.subcategory) return;
    setShowSubCategory(true);
    setSubcategoryArr(arr.subcategory[0].subcategory);
  }

  const handleItemClick=(name:string)=>{
    router.push(`/category/${name}`);
    
    if(!isMobile) {
      setValue("");
    } else {
      setDrawerOpen(false);
    }
  }

  const previousHandler = function() {
    if(showSubCategory) {
      setShowSubCategory(false);
    } else {
      setDrawerOpen(false);
    }
  }

   const handleIconClick=(name:string)=>{
    if(name==='Profile')
    {
      const customerType = sessionStorage.getItem("customer_type");
    if (customerType === "registered") {
      router.push("/my-account");
    } else {
      router.push("/login");
    }
  }
    else if(name==="Whishlist")
    {
      router.push(`/wishlist`)
    }
  }

  return (
    <div className={`${styles.header} ${isHome ? styles.homeHeader : ""}`}>
      <div className={styles.layout}>
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          {isMobile && (
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side="left">
              <DrawerTrigger asChild>
                <Image
                  src={isHome ? "/images/menu_white.svg" : "/images/menu.svg"}
                  alt="Menu"
                  className={styles.pointer}
                  width={24}
                  height={24}
                />
              </DrawerTrigger>
              <DrawerContent side="left">
                <DrawerHeader className={styles.menuheader}>
                  <ChevronLeft size={20} onClick={previousHandler} />
                  <DrawerTitle className={styles.title}>MENU</DrawerTitle>
                  <DrawerClose className={styles.close} asChild>
                    <Image
                      src="/images/expand.svg"
                      alt="Close"
                      width={48}
                      height={48}
                    />
                  </DrawerClose>
                </DrawerHeader>

                <div className={styles.categoryList}>
                  { !showSubCategory ? categories.map((category: any, index) => (
                    <div
                      key={index}
                      className={styles.categoryItem}
                      onClick={() => subCatgoryHandler(category)}
                    >
                      <span>{category.name}</span>
                      <ChevronRight size={20} />
                    </div>
                  ))
                  : subcategoryArr.map((name: any, index: any) => (
                    <div
                      key={index}
                      className={styles.categoryItem}
                      onClick={() => handleItemClick(name)}
                    >
                      <span>{name}</span>
                      <ChevronRight size={20} />
                    </div>
                  ))
                }
                </div>
              </DrawerContent>
            </Drawer>
          )}

          <Link href="/" prefetch>
            <Image
              src={isHome ? logoImages.white : logoImages.default}
              alt="Elenor Logo"
              className={styles.pointer}
              width={100}
              height={20}
            />
          </Link>
        </div>

        {!isMobile && (
          <div
            className={`${styles.categories} ${isHome ? styles.whiteCategories : ""}`}
          >
            {categories.map((category, index) => (
              <div key={index}>
                <NavigationMenu key={index} 
                   value={value === category.name ? category.name : ""}
                  onValueChange={(val) => {
                    setValue(val === value ? "" : val);
                  }}>
                  <NavigationMenuList>
                    <NavigationMenuItem value={category.name}>
                      {category.subcategory && category.image ? (
                        <>
                          <NavigationMenuTrigger>
                            <span className={styles.category}>
                              {category.name}
                            </span>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <section className={styles.overlayContainer}>
                              <div className={styles.imageContainer}>
                                <div className={styles.primaryImage}>
                                  <Image
                                    src={category.image[0].productImageUrl}
                                    alt={category.image[0].productName}
                                    width={325}
                                    height={317}
                                  />
                                </div>
                                {category.image.length > 1 && (
                                  <div
                                    className={getImageContainerClass(
                                      category.image.length
                                    )}
                                  >
                                    {category.image.map(
                                      (
                                        { productImageUrl, productName },
                                        index
                                      ) =>
                                        index !== 0 && (
                                          <Image
                                            key={index}
                                            src={productImageUrl}
                                            alt={productName}
                                            width={210}
                                            height={148}
                                          />
                                        )
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className={styles.categoryContainer}>
                                {category.subcategory.map(
                                  ({ subCategoryName, subcategory }, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className={styles.subcategoryContainer}
                                        
                                      >
                                        <Typography
                                          type="Label"
                                          variant={3}
                                          label={subCategoryName}
                                          fontWeight="bold"
                                        />
                                        {subcategory.map(
                                          (subcategoryName, index) => {
                                            return (
                                              <Button
                                                key={index}
                                                variant="link"
                                                style={{ fontWeight: "500" }}
                                                onClick={()=>handleItemClick(subcategoryName)}
                                              >
                                                {subcategoryName}
                                              </Button>
                                            );
                                          }
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </section>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link href="/SUSTAINABILITY">
                          <span className={styles.category}>
                            {category.name}
                          </span>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            ))}
          </div>
        )}

        <div className={styles.categories}>
          {iconsToRender.map(({ label, icon }, index) => {
            if (label === "CartBag") {
              return (
                <Image
                  key={index}
                  src={icon}
                  alt={label}
                  width={20}
                  height={20}
                  onClick={()=>handleCartClick()}
                  className={styles.headerIcons}
                />
              );
            } else if (label === "Search") {
              return (
                <SearchMenu
                  key={index}
                  isMobile={isMobile}
                  keyVal={index}
                  searchIcon={icon}
                />
              );
            } else {
              return (
                <Image
                  key={index}
                  src={icon}
                  alt={label}
                  width={20}
                  height={20}
                  onClick={()=>handleIconClick(label)}
                  className={styles.headerIcons}
                />
              );
            }
          })}
        </div>
        {open && (
          <MiniCart open={open} onOpenChange={setOpen} />
        )}
      </div>
    </div>
  );
};

export default Header;

/**
 * ## Header
 *
 * The `Header` component is a navigation header used to display the logo, category links, and icons in the navigation bar. It adapts based on the device's screen width, showing a responsive drawer for mobile views and a horizontal layout for larger screens. It also supports dynamic changes for the logo and icons depending on whether the page is the homepage or not.
 *
 * ### Props
 *
 * - **isHome** (`boolean`, optional): Indicates whether the current page is the homepage. Defaults to `false`.
 *   - If `true`, the header will render a different logo and a set of white icons.
 *   - If `false`, it will render the default logo and a different set of icons.
 *
 * - **logoImages** (`object`): Contains the image URLs for the logo in two states:
 *   - **default** (`string`): The URL for the default logo.
 *   - **white** (`string`): The URL for the white logo (used when on the homepage).
 *
 * - **categories** (`array`): An array of strings representing the categories that will be displayed in the navigation bar.
 *
 * - **headerIcons** (`array`): An array of objects containing icons for the header in a non-homepage state. Each object contains:
 *   - **label** (`string`): The label for the icon.
 *   - **icon** (`string`): The URL for the icon image.
 *
 * - **headerWhiteIcons** (`array`): An array of objects containing icons for the header in the homepage state. It has the same structure as `headerIcons`.
 *
 * ### Component Behavior
 *
 * - The component uses a responsive layout:
 *   - For mobile devices (screen width less than 768px), a `Drawer` component is used to display the menu as a sidebar when the menu icon is clicked.
 *   - For larger screens, categories are displayed horizontally, and the icons are shown in a row on the right.
 * - The drawer menu lists categories that users can click to navigate to corresponding pages. The categories are dynamically generated from the `categories` prop.
 * - The `logoImages` prop allows for different logos to be displayed depending on whether the current page is the homepage.
 * - The `iconsToRender` is dynamically set based on whether the page is the homepage or not, determining which set of icons to render.
 * - Clicking on the logo navigates the user to the homepage.
 *
 * ### Example Usage
 *
 * Here's an example of how to use the `Header` component:
 *
 * ```tsx
 *
 *     <Header
 *       isHome={true}
 *       logoImages={logoImages}
 *       categories={exampleCategories}
 *       headerIcons={exampleIcons}
 *       headerWhiteIcons={exampleWhiteIcons}
 *     />
 *
 * ```
 *
 * ### Dynamic Behavior
 * - On mobile devices, clicking the menu icon triggers the opening of the `Drawer`, which shows a list of categories that can be clicked to navigate.
 * - On larger devices, categories are shown as a horizontal list and icons are displayed inline.
 * - The header layout changes based on the `isHome` prop, including displaying a different logo and different icons for the homepage.
 */
