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



/**
 * ## QuantitySelector Component
 *
 * The `QuantitySelector` component allows users to select a quantity either by using 
 * increment and decrement buttons or by selecting a value from a dropdown list. The component 
 * provides a customizable way to handle quantity changes and can be used in situations such as 
 * selecting the quantity of a product in a shopping cart.
 *
 * ### Props:
 * - **`onQuantityChange` (function)**: A callback function that is triggered whenever the quantity 
 *   is updated. It receives the updated quantity as a parameter.
 * 
 * - **`updateQuantity` (boolean)**: A flag that determines the mode of quantity selection:
 *   - `true`: The component will show increment and decrement buttons for updating the quantity.
 *   - `false`: The component will display a dropdown list for selecting a quantity.
 *
 * - **`qty` (number, optional)**: An optional prop for initializing the quantity value. If not provided, 
 *   the default quantity is set to `1`. If provided, the quantity will be initialized to this value.
 * 
 * 
 *
 */
