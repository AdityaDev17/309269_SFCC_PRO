import React, { useEffect, useState } from 'react';

import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
    onQuantityChange: (quantity: number) => void;
    updateQuantity: boolean;
    qty?: number;
}

const QuantitySelector= ({ onQuantityChange, updateQuantity, qty }:QuantitySelectorProps) => {
    const [quantity, setQuantity] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (qty) {
            setQuantity(qty);
        } else {
            setQuantity(1);
        }
    }, [qty]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectNumber = (num:number) => {
        setQuantity(num);
        onQuantityChange(num);
        setIsOpen(false);
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + 1;
            onQuantityChange(newQuantity);
            return newQuantity;
        });
    };

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity > 1) {
                const newQuantity = prevQuantity - 1;
                onQuantityChange(newQuantity);
                return newQuantity;
            }
            return prevQuantity;
        });
    };

    return (
        <div className={styles.container}>
            {updateQuantity ? (
                <div className={styles.content}>
                    <img
                        className={styles.iconButton}
                        onClick={decreaseQuantity}
                        src='/images/minusIcon.svg'
                        alt="Decrease"
                    />
                    <span className={styles.quantityText}>{quantity}</span>
                    <img
                        className={styles.iconButton}
                        onClick={increaseQuantity}
                        src="/images/addIcon.svg"
                        alt="Increase"
                    />
                </div>
            ) : (
                <div className={styles.content} onClick={toggleDropdown}>
                    <span className={styles.quantityText}>{quantity}</span>
                    <img
                        className={styles.downArrowIcon}
                        src="/images/chevron.svg"
                        alt="Chevron down"
                    />
                </div>
            )}

            {isOpen && !updateQuantity && (
                <div className={styles.dropdown}>
                    <div className={styles.dropdownList}>
                        {[...Array(10)].map((_, index) => (
                            <div
                                key={index}
                                className={styles.dropdownItem}
                                onClick={() => selectNumber(index + 1)}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuantitySelector;
