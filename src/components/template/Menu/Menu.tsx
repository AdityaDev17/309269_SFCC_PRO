import Typography from "@/components/atomic/Typography/Typography";
import styles from "./Menu.module.css";
import Image from "next/image";
import { X } from 'lucide-react';
import { Button } from "@/components/atomic/button/button";

interface CategoryImageProp {
    productImageUrl: string;
    productName: string;
  }
  
  interface CategoryData {
    categoryName: string;
    subcategory: string[];
  }
  
  interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
    categoryImageData: CategoryImageProp[];
    categoryData: CategoryData[];
  }

const Menu = ({isOpen, onClose, categoryImageData,categoryData }: MenuProps) => {
    const getImageContainerClass = (length: number) => {
        if(length === 2) return styles.oneSecondaryImage;
        if(length === 3) return styles.twoSecondaryImage;
    }
    return (
        <>
            {
                isOpen ? (
                    <div className={styles.overlay}>
                            <section className={styles.overlayContainer}>
                                {/* <div className={getImageContainerClass(categoryImageData.length)}>
                                    {categoryImageData.map(({productImageUrl, productName}, index) => {
                                        return (
                                            <Image key={index} src={productImageUrl} alt={productName} width={325} height={317} className={`image-${index + 1}`}/>
                                        )
                                    })}
                                </div> */}
                                <div className={styles.imageContainer}>
                                    <div className={styles.primaryImage}>
                                        <Image  src={categoryImageData[0].productImageUrl} alt={categoryImageData[0].productName} width={325} height={317}/>
                                    </div>
                                    {
                                        categoryImageData.length > 1 && (
                                            <div className={getImageContainerClass(categoryImageData.length)}>
                                                {
                                                    categoryImageData.map(({productImageUrl, productName}, index) => index !== 0 && <Image key={index}  src={productImageUrl} alt={productName} width={210} height={148}/>)
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                
                                <div className={styles.categoryContainer}>
                                    {categoryData.map(({categoryName, subcategory}, index) => {
                                        return (
                                            <div key={index} className={styles.subcategoryContainer}>
                                                <Typography type="Label" variant={3} label={categoryName} fontWeight="bold"/>
                                                {subcategory.map((subcategoryName, index) => {
                                                    return (
                                                        <Button key={index} variant="link" style={{fontWeight: '500'}}>{subcategoryName}</Button>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                                <X strokeWidth={1} className={styles.closeButton} onClick={onClose}/>
                            </section>
                            <div className={styles.overlayBackground} onClick={onClose}/>
                    </div>
                ) : null
            }
        </>
    )
}

export default Menu;