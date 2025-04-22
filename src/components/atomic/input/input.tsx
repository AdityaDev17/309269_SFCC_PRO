'use client'
import * as React from "react"
import styles from './Input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPasswordVisible?: (name: string) => void
  error?: boolean 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, onPasswordVisible, error, ...props }, ref) => {
    
    const inputClass = `${styles.Input} ${className} ${error ? styles.error : ''}`;

    
    const isDisabled = props.disabled;
    const isReadonly = props.readOnly;

    return (
      
        <input
          ref={ref}
          type={type}
          className={inputClass}
          disabled={isDisabled}
          readOnly={isReadonly}
          {...props}
        />
        
       
    );
  }
);

Input.displayName = "Input";
export default Input;



/**
* ## Input
*
* The `Input` component is a customizable input field that supports various HTML input attributes.
* It also provides additional features such as error handling and optional password visibility callback.
*
* 
* ### Props:
* 
* - **`onPasswordVisible` (function, optional)**: A callback function triggered when the password visibility changes.
*   It receives the input name as a parameter.
*
* - **`error` (boolean, optional)**: If `true`, the input field applies error styling.
*
* 
* ### Component Behavior:
* - If **`error`** is `true`, the input field will apply error styles.
* - If **`onPasswordVisible`** is provided, it can be used to toggle password visibility for password fields.
* - If **`disabled`** is `true`, the input field will be fully disabled and non-interactive.
* - If **`readOnly`** is `true`, the input field will be uneditable but still selectable.
*
*/